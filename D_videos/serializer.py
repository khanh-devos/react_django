from rest_framework import serializers
from . import models as mod


class VideoSerializer(serializers.ModelSerializer):

    class Meta():
        model = mod.Video
        fields = ('__all__')


class DVideoSerializer(serializers.ModelSerializer):

    class Meta():
        model = mod.DVideo
        fields = ('__all__')