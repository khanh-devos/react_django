from django.urls import path, include
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("", views.UserViewSet, basename='workers')


urlpatterns = [
    path('workers', include(router.urls)),
    
    path('api/register/', views.RegisterAPI.as_view()),
    
    path('api/login/', views.LoginAPI.as_view()),
    
    path('api/logout/', views.LogoutAPI.as_view()),
    path('api/token/', views.TokenAPI.as_view()),
    
    path('api/password/change', views.ChangePasswordAPI.as_view()),
    
    
    
]