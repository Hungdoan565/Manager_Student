from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    """Student Admin"""
    list_display = ('student_id', 'get_full_name', 'class_obj', 'gender', 'status', 'enrollment_date')
    list_filter = ('gender', 'status', 'class_obj', 'enrollment_date', 'created_at')
    search_fields = ('student_id', 'first_name', 'last_name', 'email', 'parent_name')
    ordering = ('last_name', 'first_name')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Thông tin cá nhân', {
            'fields': ('student_id', 'first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'gender', 'avatar_url')
        }),
        ('Thông tin lớp học', {
            'fields': ('class_obj', 'enrollment_date', 'status')
        }),
        ('Thông tin phụ huynh', {
            'fields': ('parent_name', 'parent_phone', 'parent_email')
        }),
        ('Khác', {
            'fields': ('address', 'notes', 'created_at', 'updated_at')
        }),
    )
    
    def get_full_name(self, obj):
        return obj.get_full_name
    get_full_name.short_description = 'Họ và tên'

