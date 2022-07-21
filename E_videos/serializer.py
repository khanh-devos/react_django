from rest_framework import serializers
from . import models as mod


class EVideoSerializer(serializers.ModelSerializer):

    class Meta():
        model = mod.EVideo
        fields = ('__all__')
