import os
import uuid
import sys

# Force local SQLite DB for safe smoke run
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
DB_PATH = os.path.join(BASE_DIR, 'db.local.sqlite3')
# Ensure `backend/` is on sys.path so `sms_backend` can be imported
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

os.environ['DATABASE_URL'] = f'sqlite:///{DB_PATH.replace("\\", "/")}'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sms_backend.settings')

import django

django.setup()

from rest_framework.test import APIRequestFactory, force_authenticate
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.api.views import StudentViewSet, ClassViewSet, AttendanceViewSet
from apps.api.models import Class, Student, Attendance


def main():
    # Seed minimal data
    cls = Class.objects.create(
        id=uuid.uuid4(),
        name='SMOKE_CLASS',
        grade='10',
        is_active=True,
    )
    Student.objects.create(
        id=uuid.uuid4(),
        student_code=f'SMK{uuid.uuid4().hex[:8]}',
        full_name='Smoke Test',
        class_fk=cls,
        is_active=True,
    )

    factory = APIRequestFactory()

    # Students export
    req = factory.get('/api/students/export')
    user_obj = type('U', (), {'is_authenticated': True, 'is_staff': True})()
    force_authenticate(req, user=user_obj, token={'claims': {'role': 'admin'}})
    view = StudentViewSet.as_view({'get': 'export'})
    resp = view(req)
    if hasattr(resp, 'render'):
        resp.render()
    body_len = len(getattr(resp, 'content', b''))
    print('students_export', resp.status_code, body_len)

    # Classes export
    req2 = factory.get('/api/classes/export')
    force_authenticate(req2, user=user_obj, token={'claims': {'role': 'admin'}})
    view2 = ClassViewSet.as_view({'get': 'export'})
    resp2 = view2(req2)
    if hasattr(resp2, 'render'):
        resp2.render()
    body_len2 = len(getattr(resp2, 'content', b''))
    print('classes_export', resp2.status_code, body_len2)

    # Attendance create
    from datetime import date, timedelta
    att_data = {
        'student_id': str(Student.objects.first().id),
        'class_id': str(Class.objects.first().id),
        'date': str(date.today()),
        'status': 'present',
        'notes': 'smoke',
    }
    req3 = factory.post('/api/attendance/', att_data, format='json')
    force_authenticate(req3, user=user_obj, token={'claims': {'role': 'teacher'}})
    view3 = AttendanceViewSet.as_view({'post': 'create'})
    resp3 = view3(req3)
    print('attendance_create', resp3.status_code)

    # Attendance list with expand
    req4 = factory.get('/api/attendance/?expand=student,class')
    force_authenticate(req4, user=user_obj, token={'claims': {'role': 'admin'}})
    view4 = AttendanceViewSet.as_view({'get': 'list'})
    resp4 = view4(req4)
    if hasattr(resp4, 'render'):
        resp4.render()
    print('attendance_list', resp4.status_code)

    # Reports summary
    cls_id = str(Class.objects.first().id)
    sd = str(date.today() - timedelta(days=7))
    ed = str(date.today())
    req5 = factory.get(f'/api/attendance/reports?class_id={cls_id}&start_date={sd}&end_date={ed}')
    force_authenticate(req5, user=user_obj, token={'claims': {'role': 'admin'}})
    view5 = AttendanceViewSet.as_view({'get': 'reports'})
    resp5 = view5(req5)
    if hasattr(resp5, 'render'):
        resp5.render()
    print('attendance_reports', resp5.status_code)

    # Reports timeseries
    req6 = factory.get(f'/api/attendance/reports/timeseries?class_id={cls_id}&start_date={sd}&end_date={ed}')
    force_authenticate(req6, user=user_obj, token={'claims': {'role': 'admin'}})
    view6 = AttendanceViewSet.as_view({'get': 'reports_timeseries'})
    resp6 = view6(req6)
    if hasattr(resp6, 'render'):
        resp6.render()
    print('attendance_timeseries', resp6.status_code)

    # Reports export CSV
    req7 = factory.get(f'/api/attendance/reports/export?class_id={cls_id}&start_date={sd}&end_date={ed}')
    force_authenticate(req7, user=user_obj, token={'claims': {'role': 'admin'}})
    view7 = AttendanceViewSet.as_view({'get': 'reports_export'})
    resp7 = view7(req7)
    if hasattr(resp7, 'render'):
        resp7.render()
    print('attendance_export', resp7.status_code, len(getattr(resp7, 'content', b'')))

    # Classes import CSV
    csv_classes = 'name,grade,description,max_students,teacher_id,academic_year_id,is_active\nIMP_CLASS,10,desc,35,,,true\n'.encode('utf-8')
    upload1 = SimpleUploadedFile('classes.csv', csv_classes, content_type='text/csv')
    req8 = factory.post('/api/classes/import', {'file': upload1}, format='multipart')
    force_authenticate(req8, user=user_obj, token={'claims': {'role': 'admin'}})
    view8 = ClassViewSet.as_view({'post': 'import_csv'})
    resp8 = view8(req8)
    if hasattr(resp8, 'render'):
        resp8.render()
    print('classes_import', resp8.status_code)

    # Students import CSV
    cls_id_str = str(Class.objects.first().id)
    csv_students = f'student_code,full_name,email,class_id,phone,is_active\nIMP001,Import Student,imp@example.com,{cls_id_str},,true\n'.encode('utf-8')
    upload2 = SimpleUploadedFile('students.csv', csv_students, content_type='text/csv')
    req9 = factory.post('/api/students/import', {'file': upload2}, format='multipart')
    force_authenticate(req9, user=user_obj, token={'claims': {'role': 'admin'}})
    view9 = StudentViewSet.as_view({'post': 'import_csv'})
    resp9 = view9(req9)
    if hasattr(resp9, 'render'):
        resp9.render()
    print('students_import', resp9.status_code)


if __name__ == '__main__':
    main()