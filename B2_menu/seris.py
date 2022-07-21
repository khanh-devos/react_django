from rest_framework import serializers
from . import models as mod

class ItemSerializer(serializers.ModelSerializer):
    
    
    class Meta():
        model = mod.Item
        fields = ('__all__')
        


