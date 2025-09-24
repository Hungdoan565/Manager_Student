from django.db import models
import uuid

class Student(models.Model):
    """Student table managed by Django, mapped to Supabase Postgres.
    Uses ForeignKey to Class for better querying.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(null=True, blank=True, db_index=True)
    student_code = models.CharField(max_length=64, unique=True)
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=16, null=True, blank=True)
    phone = models.CharField(max_length=32, null=True, blank=True)
    email = models.EmailField(null=True, blank=True, db_index=True)
    address = models.TextField(null=True, blank=True)
    emergency_contact = models.CharField(max_length=255, null=True, blank=True)
    emergency_phone = models.CharField(max_length=32, null=True, blank=True)
    class_fk = models.ForeignKey('Class', null=True, blank=True, db_column='class_id', on_delete=models.PROTECT, related_name='students')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'students'
        ordering = ['-created_at']

class Class(models.Model):
    """Model mapping to Supabase 'classes' table (includes optional fields used by FE)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, db_index=True)
    grade = models.CharField(max_length=64, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    max_students = models.IntegerField(null=True, blank=True)
    teacher_id = models.UUIDField(null=True, blank=True, db_index=True)
    academic_year_id = models.UUIDField(null=True, blank=True, db_index=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'classes'
        ordering = ['name']

class Attendance(models.Model):
    """Attendance table managed by Django using FKs for better relations."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student_fk = models.ForeignKey('Student', db_column='student_id', on_delete=models.PROTECT, related_name='attendance')
    class_fk = models.ForeignKey('Class', db_column='class_id', on_delete=models.PROTECT, related_name='attendance')
    subject_id = models.UUIDField(null=True, blank=True)
    date = models.DateField(db_index=True)
    status = models.CharField(max_length=16, db_index=True)  # present, absent, late, excused
    notes = models.TextField(null=True, blank=True)
    teacher_id = models.UUIDField(null=True, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'attendance'
        ordering = ['-date', '-created_at']
        constraints = [
            models.UniqueConstraint(fields=['student_fk', 'class_fk', 'date'], name='uniq_attendance_student_class_date')
        ]
