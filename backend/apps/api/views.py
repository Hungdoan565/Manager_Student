from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
import csv
import uuid
from django.db.models import Subquery, Count
from django.db import IntegrityError, transaction
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

    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request):
        qs = self.get_queryset()
        class_id = request.query_params.get('class_id')
        if class_id:
            qs = qs.filter(class_fk_id=class_id)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="students_export.csv"'
        writer = csv.writer(response)
        writer.writerow(['student_code','full_name','email','class_id','phone','is_active'])
        for row in qs.values_list('student_code','full_name','email','class_fk_id','phone','is_active'):
            writer.writerow(row)
        return response

    @action(detail=False, methods=['post'], url_path='import')
    def import_csv(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'detail': 'Thiếu file CSV (multipart/form-data, field name: file).'}, status=400)
        decoded = file.read().decode('utf-8').splitlines()
        reader = csv.DictReader(decoded)
        created = 0
        rows = []
        for r in reader:
            try:
                rows.append(Student(
                    id=uuid.uuid4(),
                    student_code=r.get('student_code'),
                    full_name=r.get('full_name'),
                    email=r.get('email') or None,
                    class_fk_id=r.get('class_id') or None,
                    phone=r.get('phone') or None,
                    is_active=(r.get('is_active','true').lower() == 'true')
                ))
            except Exception:
                continue
        if rows:
            # Ignore conflicts on unique student_code
            Student.objects.bulk_create(rows, ignore_conflicts=True)
            created = len(rows)
        return Response({'created': created})

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        expand_param = request.query_params.get('expand') or ''
        expand = set([e.strip() for e in expand_param.split(',') if e.strip()])
        if not expand:
            return response
        data = response.data
        items = data['results'] if isinstance(data, dict) and 'results' in data else data
        if not isinstance(items, list):
            return response
        if 'class' in expand:
            class_ids = {str(it.get('class_id')) for it in items if it.get('class_id')}
            c_map = {str(c['id']): c for c in Class.objects.filter(id__in=class_ids).values('id','name','grade')}
            for it in items:
                it['class'] = c_map.get(str(it.get('class_id')))
        response.data = data
        return response

    def get_queryset(self):
        qs = super().get_queryset()
        # Optimize when expand class
        expand_param = self.request.query_params.get('expand') or ''
        if 'class' in expand_param:
            qs = qs.select_related('class_fk')
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
            return qs.filter(class_fk_id__in=Subquery(teacher_class_ids))
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

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        expand_param = request.query_params.get('expand') or ''
        expand = set([e.strip() for e in expand_param.split(',') if e.strip()])
        if not expand:
            return response
        data = response.data
        items = data['results'] if isinstance(data, dict) and 'results' in data else data
        if not isinstance(items, list):
            return response
        if 'teacher' in expand:
            teacher_ids = {str(it.get('teacher_id')) for it in items if it.get('teacher_id')}
            t_map = {str(p['id']): p for p in Profile.objects.filter(id__in=teacher_ids).values('id','email','full_name')}
            for it in items:
                it['teacher'] = t_map.get(str(it.get('teacher_id')))
        response.data = data
        return response

    @action(detail=False, methods=['get'], url_path='export')
    def export(self, request):
        qs = self.get_queryset()
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="classes_export.csv"'
        writer = csv.writer(response)
        writer.writerow(['id','name','grade','description','max_students','teacher_id','academic_year_id','is_active'])
        for row in qs.values_list('id','name','grade','description','max_students','teacher_id','academic_year_id','is_active'):
            writer.writerow(row)
        return response

    @action(detail=False, methods=['post'], url_path='import')
    def import_csv(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({'detail': 'Thiếu file CSV (multipart/form-data, field name: file).'}, status=400)
        try:
            decoded_lines = file.read().decode('utf-8').splitlines()
        except UnicodeDecodeError:
            return Response({'detail': 'File phải là CSV với encoding UTF-8.'}, status=400)
        reader = csv.DictReader(decoded_lines)
        rows = []
        for r in reader:
            name = (r.get('name') or '').strip()
            if not name:
                continue
            grade = (r.get('grade') or '').strip() or None
            description = (r.get('description') or '').strip() or None
            max_students_val = r.get('max_students')
            try:
                max_students = int(max_students_val) if max_students_val not in (None, '') else None
            except ValueError:
                max_students = None
            teacher_id = (r.get('teacher_id') or '').strip() or None
            academic_year_id = (r.get('academic_year_id') or '').strip() or None
            is_active = (r.get('is_active', 'true').strip().lower() == 'true')
            rows.append(Class(
                id=uuid.uuid4(),
                name=name,
                grade=grade,
                description=description,
                max_students=max_students,
                teacher_id=teacher_id,
                academic_year_id=academic_year_id,
                is_active=is_active,
            ))
        created = 0
        if rows:
            Class.objects.bulk_create(rows, ignore_conflicts=True)
            created = len(rows)
        return Response({'created': created})

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
        students_qs = Student.objects.filter(class_fk_id=pk)
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
            student_class_ids = stu_qs.values_list('class_fk_id', flat=True)
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

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        expand_param = request.query_params.get('expand') or ''
        expand = set([e.strip() for e in expand_param.split(',') if e.strip()])
        if not expand:
            return response
        data = response.data
        items = data['results'] if isinstance(data, dict) and 'results' in data else data
        if not isinstance(items, list):
            return response
        student_ids = {str(it.get('student_id')) for it in items if it.get('student_id')}
        class_ids = {str(it.get('class_id')) for it in items if it.get('class_id')}
        s_map = {}
        c_map = {}
        if 'student' in expand and student_ids:
            s_map = {str(s['id']): s for s in Student.objects.filter(id__in=student_ids).values('id', 'full_name', 'student_code', 'email')}
        if 'class' in expand and class_ids:
            c_map = {str(c['id']): c for c in Class.objects.filter(id__in=class_ids).values('id', 'name', 'grade')}
        for it in items:
            if 'student' in expand:
                it['student'] = s_map.get(str(it.get('student_id')))
            if 'class' in expand:
                it['class'] = c_map.get(str(it.get('class_id')))
        response.data = data
        return response

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            with transaction.atomic():
                self.perform_create(serializer)
        except IntegrityError as e:
            # Unique constraint violation: same (student_id, class_id, date)
            return Response({'detail': 'Bản ghi điểm danh cho sinh viên này trong ngày đã tồn tại.'}, status=409)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=201, headers=headers)

    @action(detail=False, methods=['get'], url_path='reports')
    def reports(self, request):
        # Summary report
        qs = self.get_queryset()
        class_id = request.query_params.get('class_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if class_id:
            qs = qs.filter(class_fk_id=class_id)
        if start_date:
            qs = qs.filter(date__gte=start_date)
        if end_date:
            qs = qs.filter(date__lte=end_date)
        status = request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
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

    @action(detail=False, methods=['get'], url_path='reports/timeseries')
    def reports_timeseries(self, request):
        from datetime import timedelta
        qs = self.get_queryset()
        class_id = request.query_params.get('class_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if class_id:
            qs = qs.filter(class_fk_id=class_id)
        if start_date:
            qs = qs.filter(date__gte=start_date)
        if end_date:
            qs = qs.filter(date__lte=end_date)
        status = request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        # Aggregate by date + status
        agg = qs.values('date', 'status').annotate(count=Count('id'))
        # Build index
        data_map = {}
        for row in agg:
            d = str(row['date'])
            st = row['status']
            data_map.setdefault(d, {'date': d, 'present': 0, 'absent': 0, 'late': 0, 'excused': 0})
            data_map[d][st] = row['count']
        # Fill missing dates if range provided
        if start_date and end_date:
            from datetime import date as date_cls
            sd = date_cls.fromisoformat(start_date)
            ed = date_cls.fromisoformat(end_date)
            cur = sd
            while cur <= ed:
                key = str(cur)
                data_map.setdefault(key, {'date': key, 'present': 0, 'absent': 0, 'late': 0, 'excused': 0})
                cur = cur + timedelta(days=1)
        series = [data_map[k] for k in sorted(data_map.keys())]
        return Response(series)

    @action(detail=False, methods=['get'], url_path='reports/export')
    def reports_export(self, request):
        # CSV export of raw records within filters
        qs = self.get_queryset()
        class_id = request.query_params.get('class_id')
        start_date = request.query_params.get('start_date')
        end_date = request.query_params.get('end_date')
        if class_id:
            qs = qs.filter(class_fk_id=class_id)
        if start_date:
            qs = qs.filter(date__gte=start_date)
        if end_date:
            qs = qs.filter(date__lte=end_date)
        status = request.query_params.get('status')
        if status:
            qs = qs.filter(status=status)
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="attendance_export.csv"'
        writer = csv.writer(response)
        writer.writerow(['date', 'class_id', 'student_id', 'status', 'notes'])
        for rec in qs.values_list('date', 'class_fk_id', 'student_fk_id', 'status', 'notes'):
            writer.writerow(rec)
        return response

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
            qs = qs.filter(class_fk_id__in=Subquery(teacher_class_ids))
        elif role == 'student' and (sub or email):
            stu_qs = Student.objects.all()
            if sub:
                stu_qs = stu_qs.filter(user_id=sub)
            elif email:
                stu_qs = stu_qs.filter(email=email)
            student_ids = stu_qs.values_list('id', flat=True)
            qs = qs.filter(student_fk_id__in=Subquery(student_ids))
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
            qs = qs.filter(student_fk_id=student_id)
        if class_id:
            qs = qs.filter(class_fk_id=class_id)
        if date:
            qs = qs.filter(date=date)
        if status:
            qs = qs.filter(status=status)

        # Optimize when expanding related entities
        expand_param = self.request.query_params.get('expand') or ''
        if 'student' in expand_param or 'class' in expand_param:
            qs = qs.select_related('student_fk', 'class_fk')
        return qs
