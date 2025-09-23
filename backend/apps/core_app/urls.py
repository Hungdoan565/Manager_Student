from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HealthView

router = DefaultRouter()
# Students endpoints will be mounted from apps.api.urls

urlpatterns = [
    path('health/', HealthView.as_view(), name='health'),
]
