from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Profile, AcademicYear, Class, Subject, Schedule


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """Custom User Admin"""
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_staff', 'created_at')
    list_filter = ('is_active', 'is_staff', 'is_superuser', 'created_at')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'phone', 'avatar_url')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined', 'created_at', 'updated_at')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    """Profile Admin"""
    list_display = ('user', 'role', 'department', 'employee_id', 'created_at')
    list_filter = ('role', 'department', 'created_at')
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'employee_id')
    ordering = ('-created_at',)


@admin.register(AcademicYear)
class AcademicYearAdmin(admin.ModelAdmin):
    """Academic Year Admin"""
    list_display = ('name', 'start_date', 'end_date', 'is_current', 'created_at')
    list_filter = ('is_current', 'start_date', 'end_date')
    search_fields = ('name', 'description')
    ordering = ('-start_date',)


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    """Class Admin"""
    list_display = ('name', 'grade', 'academic_year', 'teacher', 'room', 'student_count', 'is_active')
    list_filter = ('grade', 'academic_year', 'teacher', 'is_active', 'created_at')
    search_fields = ('name', 'teacher__first_name', 'teacher__last_name', 'room')
    ordering = ('grade', 'name')
    
    def student_count(self, obj):
        return obj.student_count
    student_count.short_description = 'Số sinh viên'


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    """Subject Admin"""
    list_display = ('code', 'name', 'credits', 'is_active', 'created_at')
    list_filter = ('is_active', 'credits', 'created_at')
    search_fields = ('code', 'name', 'description')
    ordering = ('code',)


@admin.register(Schedule)
class ScheduleAdmin(admin.ModelAdmin):
    """Schedule Admin"""
    list_display = ('class_obj', 'subject', 'day_of_week', 'period', 'start_time', 'end_time', 'room', 'is_active')
    list_filter = ('day_of_week', 'period', 'subject', 'is_active', 'created_at')
    search_fields = ('class_obj__name', 'subject__name', 'room')
    ordering = ('day_of_week', 'period')
