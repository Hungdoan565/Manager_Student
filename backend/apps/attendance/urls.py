from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'sessions', views.AttendanceSessionViewSet)
router.register(r'attendances', views.AttendanceViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

