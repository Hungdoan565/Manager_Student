from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import uuid


class User(AbstractUser):
    """Custom User model extending Django's AbstractUser"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.email} - {self.get_full_name()}"


class Profile(models.Model):
    """User Profile model"""
    ROLE_CHOICES = [
        ('teacher', 'Giáo viên'),
        ('admin', 'Quản trị viên'),
        ('manager', 'Quản lý'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='teacher')
    department = models.CharField(max_length=100, blank=True, null=True)
    employee_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'profiles'
        verbose_name = 'Profile'
        verbose_name_plural = 'Profiles'

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.get_role_display()}"


class AcademicYear(models.Model):
    """Academic Year model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    is_current = models.BooleanField(default=False)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'academic_years'
        verbose_name = 'Academic Year'
        verbose_name_plural = 'Academic Years'
        ordering = ['-start_date']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # Ensure only one academic year is current
        if self.is_current:
            AcademicYear.objects.filter(is_current=True).update(is_current=False)
        super().save(*args, **kwargs)


class Class(models.Model):
    """Class model"""
    GRADE_CHOICES = [
        ('1', 'Lớp 1'),
        ('2', 'Lớp 2'),
        ('3', 'Lớp 3'),
        ('4', 'Lớp 4'),
        ('5', 'Lớp 5'),
        ('6', 'Lớp 6'),
        ('7', 'Lớp 7'),
        ('8', 'Lớp 8'),
        ('9', 'Lớp 9'),
        ('10', 'Lớp 10'),
        ('11', 'Lớp 11'),
        ('12', 'Lớp 12'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    grade = models.CharField(max_length=2, choices=GRADE_CHOICES)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE, related_name='classes')
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='taught_classes')
    room = models.CharField(max_length=50, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    max_students = models.PositiveIntegerField(default=40)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'classes'
        verbose_name = 'Class'
        verbose_name_plural = 'Classes'
        unique_together = ['name', 'academic_year']
        ordering = ['grade', 'name']

    def __str__(self):
        return f"{self.name} - {self.get_grade_display()}"

    @property
    def student_count(self):
        return self.students.count()

    @property
    def attendance_rate(self):
        """Calculate average attendance rate for this class"""
        total_sessions = self.attendance_sessions.count()
        if total_sessions == 0:
            return 0
        
        total_attendance = 0
        for session in self.attendance_sessions.all():
            total_attendance += session.attendance_count
        
        return round((total_attendance / (total_sessions * self.student_count)) * 100, 2) if self.student_count > 0 else 0


class Subject(models.Model):
    """Subject model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True, null=True)
    credits = models.PositiveIntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'subjects'
        verbose_name = 'Subject'
        verbose_name_plural = 'Subjects'
        ordering = ['name']

    def __str__(self):
        return f"{self.code} - {self.name}"


class Schedule(models.Model):
    """Schedule model"""
    DAY_CHOICES = [
        ('monday', 'Thứ 2'),
        ('tuesday', 'Thứ 3'),
        ('wednesday', 'Thứ 4'),
        ('thursday', 'Thứ 5'),
        ('friday', 'Thứ 6'),
        ('saturday', 'Thứ 7'),
        ('sunday', 'Chủ nhật'),
    ]

    PERIOD_CHOICES = [
        ('1', 'Tiết 1'),
        ('2', 'Tiết 2'),
        ('3', 'Tiết 3'),
        ('4', 'Tiết 4'),
        ('5', 'Tiết 5'),
        ('6', 'Tiết 6'),
        ('7', 'Tiết 7'),
        ('8', 'Tiết 8'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class_obj = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='schedules')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='schedules')
    day_of_week = models.CharField(max_length=10, choices=DAY_CHOICES)
    period = models.CharField(max_length=2, choices=PERIOD_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    room = models.CharField(max_length=50, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'schedules'
        verbose_name = 'Schedule'
        verbose_name_plural = 'Schedules'
        unique_together = ['class_obj', 'day_of_week', 'period']
        ordering = ['day_of_week', 'period']

    def __str__(self):
        return f"{self.class_obj.name} - {self.subject.name} - {self.get_day_of_week_display()} {self.get_period_display()}"
