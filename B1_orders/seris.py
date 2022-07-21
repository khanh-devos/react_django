from rest_framework import serializers
from . import models as mod

class OrderSerializer(serializers.ModelSerializer):
    class Meta():
        model = mod.Order
        fields = "__all__"
    
    
    
    