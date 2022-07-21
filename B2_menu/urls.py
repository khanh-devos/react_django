from django.urls import path, include
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("api/item", views.ItemVS, basename='item')



urlpatterns = [
    path('', include(router.urls)),
    path('api/item/create', views.CreateMenuItem.as_view(), name='createMenuItem'),
    
]