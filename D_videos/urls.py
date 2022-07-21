from django.urls import path, include
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("api/video", views.VideoVS, basename='item')
router.register("api/combine", views.CombineVideoVS, basename='combine')


urlpatterns = [
    path('', include(router.urls)),
    
]