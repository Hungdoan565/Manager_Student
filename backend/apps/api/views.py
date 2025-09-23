from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Subquery, Count
from .models import Student, Class
from .serializers import StudentSerializer, ClassSerializer, AttendanceSerializer
from .permissions import IsTeacherOrReadOnly, IsTeacher, get_role_from_request
from apps.core_app.models import Profile
from .models import Attendance

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsTeacherOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['full_name', 'student_code', 'email']
    ordering_fields = ['created_at', 'full_name', 'student_code']
    ordering = ['-created_at']

    def get_queryset(self):
        qs = super().get_queryset()
        role = get_role_from_request(self.request)
        if role in ('admin', 'manager'):
            return qs
        # Try resolve profile for id/email
        claims = (self.request.auth or {}).get('claims') if isinstance(self.request.auth, dict) else None
        sub = claims.get('sub') if claims else None
        email = (claims.get('email') or (claims.get('user_metadata', {}) if claims else {}).get('email')) if claims else None
        profile = None
        if sub:
            profile = Profile.objects.filter(id=sub).only('id', 'email', 'role').first()
        if not profile and email:
            profile = Profile.objects.filter(email=email).only('id', 'email', 'role').first()
        if role == 'teacher' and profile:
            teacher_class_ids = Class.objects.filter(teacher_id=profile.id).values_list('id', flat=True)
            return qs.filter(class_id__in=Subquery(teacher_class_ids))
        if role == 'student' and (profile or email or sub):
            # Prefer user_id match; fallback to email
            if sub:
                return qs.filter(user_id=sub)
            student_email = profile.email if profile else email
            return qs.filter(email=student_email)
        # Unknown role: deny by default
        return qs.none()

class ClassViewSet(viewsets.ModelViewSet):
    queryset = Class.objects.filter(is_active=True)
    serializer_class = ClassSerializer
    permission_classes = [IsTeacherOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'grade']
    ordering_fields = ['name', 'grade', 'created_at']
    ordering = ['name']

    @action(detail=True, methods=['get'], url_path='students')
    def students(self, request, pk=None):
        # Return students of this class respecting role restrictions
        base_qs = self.get_queryset()
        cls = base_qs.filter(pk=pk).first()
        if not cls:
            return Response({'detail': 'Not found.'}, status=404)
        role = get_role_from_request(request)
        if role == 'teacher':
            # ensure teacher owns this class
            claims = (request.auth or {}).get('claims') if isinstance(request.auth, dict) else None
            sub = claims.get('sub') if claims else None
            email = (claims.get('email') or (claims.get('user_metadata', {}) if claims else {}).get('email')) if claims else None
            profile = None
            if sub:
                profile = Profile.objects.filter(id=sub).only('id').first()
            if not profile and email:
                profile = Profile.objects.filter(email=email).only('id').first()
            if not profile or cls.teacher_id != profile.id:
                return Response({'detail': 'Forbidden.'}, status=403)
        elif role not in ('admin', 'manager', 'student'):
            return Response({'detail': 'Forbidden.'}, status=403)
        # Query students
        students_qs = Student.objects.filter(class_id=pk)
        data = StudentSerializer(students_qs, many=True).data
        return Response(data)

    def get_queryset(self):
        qs = super().get_queryset()
        role = get_role_from_request(self.request)
        if role in ('admin', 'manager'):
            return qs
        claims = (self.request.auth or {}).get('claims') if isinstance(self.request.auth, dict) else None
        sub = claims.get('sub') if claims else None
        email = (claims.get('email') or (claims.get('user_metadata', {}) if claims else {}).get('email')) if claims else None
        profile = None
        if sub:
            profile = Profile.objects.filter(id=sub).only('id', 'email', 'role').first()
        if not profile and email:
            profile = Profile.objects.filter(email=email).only('id', 'email', 'role').first()
        if role == 'teacher' and profile:
            return qs.filter(teacher_id=profile.id)
        if role == 'student' and (sub or email):
            # Classes that have at least one student belonging to this user
            stu_qs = Student.objects.all()
            if sub:
                stu_qs = stu_qs.filter(user_id=sub)
            elif email:
                stu_qs = stu_qs.filter(email=email)
            student_class_ids = stu_qs.values_list('class_id', flat=True)
            return qs.filter(id__in=Subquery(student_class_ids))
        return qs.none()

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsTeacherOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['status', 'notes']
    ordering_fields = ['date', 'created_at']
    ordering = ['-date']

    @action(detail=False, methods=['get'], url_path='reports')
    def reports(self, request):
        # Query restricted by role
        qs = self.get_queryset()
        class_id = request.query_params.get('class_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if class_id:
            qs = qs.filter(class_id=class_id)
        if start_date:
            qs = qs.filter(date__gte=start_date)
        if end_date:
            qs = qs.filter(date__lte=end_date)
        total = qs.count()
        by_status = qs.values('status').annotate(count=Count('id'))
        status_map = {s['status']: s['count'] for s in by_status}
        present = status_map.get('present', 0) + status_map.get('late', 0)
        rate = (present / total * 100.0) if total else 0.0
        return Response({
            'total': total,
            'present': status_map.get('present', 0),
            'absent': status_map.get('absent', 0),
            'late': status_map.get('late', 0),
            'excused': status_map.get('excused', 0),
            'attendance_rate': round(rate, 2),
        })

    def get_queryset(self):
        qs = super().get_queryset()
        # Role-based restriction
        role = get_role_from_request(self.request)
        claims = (self.request.auth or {}).get('claims') if isinstance(self.request.auth, dict) else None
        sub = claims.get('sub') if claims else None
        email = (claims.get('email') or (claims.get('user_metadata', {}) if claims else {}).get('email')) if claims else None
        profile = None
        if sub:
            profile = Profile.objects.filter(id=sub).only('id', 'email', 'role').first()
        if not profile and email:
            profile = Profile.objects.filter(email=email).only('id', 'email', 'role').first()
        if role == 'teacher' and profile:
            teacher_class_ids = Class.objects.filter(teacher_id=profile.id).values_list('id', flat=True)
            qs = qs.filter(class_id__in=Subquery(teacher_class_ids))
        elif role == 'student' and (sub or email):
            stu_qs = Student.objects.all()
            if sub:
                stu_qs = stu_qs.filter(user_id=sub)
            elif email:
                stu_qs = stu_qs.filter(email=email)
            student_ids = stu_qs.values_list('id', flat=True)
            qs = qs.filter(student_id__in=Subquery(student_ids))
        elif role in ('admin', 'manager'):
            pass
        else:
            qs = qs.none()

        # Query param filters
        student_id = self.request.query_params.get('student_id')
        class_id = self.request.query_params.get('class_id')
        date = self.request.query_params.get('date')
        status = self.request.query_params.get('status')
        if student_id:
            qs = qs.filter(student_id=student_id)
        if class_id:
            qs = qs.filter(class_id=class_id)
        if date:
            qs = qs.filter(date=date)
        if status:
            qs = qs.filter(status=status)
        return qs
