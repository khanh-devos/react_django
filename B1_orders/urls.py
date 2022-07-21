from django.urls import path, include
from . import views

from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register("api/orders", views.OrderViewSet, basename='orders')



urlpatterns = [
    path('', include(router.urls)),
    
    path('api/orders/last', views.FinalOrderSet.as_view()),
    
    #by method with url varibale
    path('api/sortOrders/<int:number>', views.sortOrders),
    
    #For plotting graph
    path('api/orders/plotting/<str:year>/<str:month>', views.plotting),
    
]