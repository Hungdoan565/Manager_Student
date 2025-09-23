from django.db import models
from django.utils import timezone
import uuid


class Student(models.Model):
    """Student model"""
    GENDER_CHOICES = [
        ('male', 'Nam'),
        ('female', 'Nữ'),
        ('other', 'Khác'),
    ]

    STATUS_CHOICES = [
        ('active', 'Đang học'),
        ('inactive', 'Nghỉ học'),
        ('graduated', 'Đã tốt nghiệp'),
        ('transferred', 'Chuyển trường'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student_id = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    address = models.TextField(blank=True, null=True)
    parent_name = models.CharField(max_length=100, blank=True, null=True)
    parent_phone = models.CharField(max_length=15, blank=True, null=True)
    parent_email = models.EmailField(blank=True, null=True)
    avatar_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    enrollment_date = models.DateField(default=timezone.now)
    class_obj = models.ForeignKey('core_app.Class', on_delete=models.CASCADE, related_name='students')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'students'
        verbose_name = 'Student'
        verbose_name_plural = 'Students'
        ordering = ['last_name', 'first_name']

    def __str__(self):
        return f"{self.student_id} - {self.get_full_name()}"

    @property
    def get_full_name(self):
        return f"{self.last_name} {self.first_name}"

    @property
    def age(self):
        today = timezone.now().date()
        return today.year - self.date_of_birth.year - ((today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day))

    @property
    def attendance_rate(self):
        """Calculate attendance rate for this student"""
        total_sessions = self.attendances.count()
        if total_sessions == 0:
            return 0
        
        present_count = self.attendances.filter(status='present').count()
        return round((present_count / total_sessions) * 100, 2)

