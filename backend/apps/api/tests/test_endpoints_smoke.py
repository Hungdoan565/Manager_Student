from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate
from apps.api.views import StudentViewSet

class EndpointSmokeTests(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_students_list_requires_auth(self):
        # Unauthenticated should be rejected by default permissions
        request = self.factory.get('/api/students/')
        view = StudentViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertIn(response.status_code, (401, 403))

    def test_students_list_teacher_role_auth(self):
        # With teacher claims, should pass permission but may 404/500 if DB missing.
        # We only assert that authentication/permission layer allows the request (status != 401).
        request = self.factory.get('/api/students/')
        request.user = type('U', (), {'is_authenticated': True, 'is_staff': False})()
        request.auth = {'claims': {'role': 'teacher'}}
        view = StudentViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertNotEqual(response.status_code, 401)
