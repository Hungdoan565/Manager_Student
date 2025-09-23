from django.db import models
import uuid

class Student(models.Model):
    """Unmanaged model mapping to Supabase 'students' table.
    This lets DRF use Django ORM without creating migrations.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.UUIDField(null=True, blank=True, db_index=True)
    student_code = models.CharField(max_length=64)
    full_name = models.CharField(max_length=255)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=16, null=True, blank=True)
    phone = models.CharField(max_length=32, null=True, blank=True)
    email = models.EmailField(null=True, blank=True, db_index=True)
    address = models.TextField(null=True, blank=True)
    emergency_contact = models.CharField(max_length=255, null=True, blank=True)
    emergency_phone = models.CharField(max_length=32, null=True, blank=True)
    class_id = models.UUIDField(null=True, blank=True, db_index=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'students'
        ordering = ['-created_at']

class Class(models.Model):
    """Unmanaged model mapping to Supabase 'classes' table."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, db_index=True)
    grade = models.CharField(max_length=64, null=True, blank=True)
    max_students = models.IntegerField(null=True, blank=True)
    teacher_id = models.UUIDField(null=True, blank=True, db_index=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'classes'
        ordering = ['name']

class Attendance(models.Model):
    """Unmanaged model mapping to Supabase 'attendance' table."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    student_id = models.UUIDField(db_index=True)
    class_id = models.UUIDField(db_index=True)
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
