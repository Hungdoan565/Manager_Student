from rest_framework import serializers
from .models import Student, Class, Attendance

class StudentSerializer(serializers.ModelSerializer):
    class_id = serializers.UUIDField(source='class_fk_id', allow_null=True, required=False)

    class Meta:
        model = Student
        fields = ['id','user_id','student_code','full_name','date_of_birth','gender','phone','email','address','emergency_contact','emergency_phone','class_id','is_active','created_at','updated_at']

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

    def validate_max_students(self, value):
        if value is None:
            return value
        if value < 1 or value > 100:
            raise serializers.ValidationError('max_students phải nằm trong khoảng 1..100')
        return value

class AttendanceSerializer(serializers.ModelSerializer):
    student_id = serializers.UUIDField(source='student_fk_id')
    class_id = serializers.UUIDField(source='class_fk_id')

    class Meta:
        model = Attendance
        fields = ['id','student_id','class_id','subject_id','date','status','notes','teacher_id','created_at','updated_at']
