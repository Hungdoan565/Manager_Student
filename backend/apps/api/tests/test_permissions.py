from django.test import TestCase
from rest_framework.test import APIRequestFactory
from rest_framework import permissions
from apps.api.permissions import IsTeacherOrReadOnly

class DummyView:
    permission_classes = [IsTeacherOrReadOnly]

class PermissionTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_read_allowed_for_authenticated_any_role(self):
        request = self.factory.get('/api/students/')
        request.user = type('U', (), {'is_authenticated': True})()
        request.auth = {'claims': {'role': 'student'}}
        perm = IsTeacherOrReadOnly()
        self.assertTrue(perm.has_permission(request, DummyView()))

    def test_write_denied_for_student(self):
        request = self.factory.post('/api/students/', {})
        request.user = type('U', (), {'is_authenticated': True, 'is_staff': False})()
        request.auth = {'claims': {'role': 'student'}}
        perm = IsTeacherOrReadOnly()
        self.assertFalse(perm.has_permission(request, DummyView()))

    def test_write_allowed_for_teacher(self):
        request = self.factory.post('/api/students/', {})
        request.user = type('U', (), {'is_authenticated': True, 'is_staff': False})()
        request.auth = {'claims': {'role': 'teacher'}}
        perm = IsTeacherOrReadOnly()
        self.assertTrue(perm.has_permission(request, DummyView()))
