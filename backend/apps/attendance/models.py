from django.db import models
from django.utils import timezone
import uuid


class AttendanceSession(models.Model):
    """Attendance Session model"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    class_obj = models.ForeignKey('core_app.Class', on_delete=models.CASCADE, related_name='attendance_sessions')
    subject = models.ForeignKey('core_app.Subject', on_delete=models.CASCADE, related_name='attendance_sessions')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey('core_app.User', on_delete=models.CASCADE, related_name='created_sessions')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'attendance_sessions'
        verbose_name = 'Attendance Session'
        verbose_name_plural = 'Attendance Sessions'
        unique_together = ['class_obj', 'date', 'start_time']
        ordering = ['-date', '-start_time']

    def __str__(self):
        return f"{self.class_obj.name} - {self.date} - {self.start_time}"

    @property
    def attendance_count(self):
        return self.attendances.filter(status='present').count()

    @property
    def total_students(self):
        return self.class_obj.student_count

    @property
    def attendance_rate(self):
        if self.total_students == 0:
            return 0
        return round((self.attendance_count / self.total_students) * 100, 2)


class Attendance(models.Model):
    """Individual Student Attendance model"""
    STATUS_CHOICES = [
        ('present', 'Có mặt'),
        ('absent', 'Vắng mặt'),
        ('late', 'Đi muộn'),
        ('excused', 'Nghỉ có phép'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    session = models.ForeignKey(AttendanceSession, on_delete=models.CASCADE, related_name='attendances')
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='attendances')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='present')
    check_in_time = models.DateTimeField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'attendances'
        verbose_name = 'Attendance'
        verbose_name_plural = 'Attendances'
        unique_together = ['session', 'student']
        ordering = ['student__last_name', 'student__first_name']

    def __str__(self):
        return f"{self.student.get_full_name} - {self.session.date} - {self.get_status_display()}"

    def save(self, *args, **kwargs):
        if self.status == 'present' and not self.check_in_time:
            self.check_in_time = timezone.now()
        super().save(*args, **kwargs)

