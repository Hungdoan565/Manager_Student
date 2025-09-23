from rest_framework import permissions
from apps.core_app.models import Profile


def get_role_from_request(request):
    # Prefer role from DB (profiles table) via sub (auth user id) or email
    claims = None
    if isinstance(request.auth, dict):
        claims = request.auth.get('claims')
    role_db = None
    profile = None
    if claims:
        sub = claims.get('sub')
        email = claims.get('email') or claims.get('user_metadata', {}).get('email')
        # Try by id first (supabase auth user id)
        try:
            if sub:
                profile = Profile.objects.filter(id=sub).only('role').first()
        except Exception:
            profile = None
        if not profile and email:
            try:
                profile = Profile.objects.filter(email=email).only('role').first()
            except Exception:
                profile = None
        if profile:
            role_db = profile.role
    # Fallback to claims role
    role_claim = None
    if claims:
        role_claim = claims.get('role') or claims.get('user_metadata', {}).get('role')
    return role_db or role_claim


class IsTeacher(permissions.BasePermission):
    def has_permission(self, request, view):
        role = get_role_from_request(request)
        return role in ('teacher', 'admin', 'manager')


class IsStudent(permissions.BasePermission):
    def has_permission(self, request, view):
        role = get_role_from_request(request)
        return role == 'student'


class IsTeacherOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return IsTeacher().has_permission(request, view)
