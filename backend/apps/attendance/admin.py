from django.contrib import admin
from .models import AttendanceSession, Attendance


@admin.register(AttendanceSession)
class AttendanceSessionAdmin(admin.ModelAdmin):
    """Attendance Session Admin"""
    list_display = ('class_obj', 'subject', 'date', 'start_time', 'attendance_count', 'total_students', 'attendance_rate', 'created_by')
    list_filter = ('date', 'class_obj', 'subject', 'created_by', 'created_at')
    search_fields = ('class_obj__name', 'subject__name', 'notes')
    ordering = ('-date', '-start_time')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Thông tin buổi học', {
            'fields': ('class_obj', 'subject', 'date', 'start_time', 'end_time')
        }),
        ('Khác', {
            'fields': ('notes', 'created_by', 'created_at', 'updated_at')
        }),
    )
    
    def attendance_count(self, obj):
        return obj.attendance_count
    attendance_count.short_description = 'Số có mặt'
    
    def total_students(self, obj):
        return obj.total_students
    total_students.short_description = 'Tổng số sinh viên'
    
    def attendance_rate(self, obj):
        return f"{obj.attendance_rate}%"
    attendance_rate.short_description = 'Tỷ lệ điểm danh'


@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    """Attendance Admin"""
    list_display = ('student', 'session', 'status', 'check_in_time', 'created_at')
    list_filter = ('status', 'session__date', 'session__class_obj', 'created_at')
    search_fields = ('student__student_id', 'student__first_name', 'student__last_name', 'notes')
    ordering = ('-session__date', 'student__last_name')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Thông tin điểm danh', {
            'fields': ('session', 'student', 'status', 'check_in_time')
        }),
        ('Khác', {
            'fields': ('notes', 'created_at', 'updated_at')
        }),
    )

