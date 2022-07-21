from django.shortcuts import render

from rest_framework import viewsets, permissions, status, serializers
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser

from . import models as mod
from . import seris


# Create your views here.
class ItemVS(viewsets.ModelViewSet):
    queryset = mod.Item.objects.all()
    serializer_class = seris.ItemSerializer

    parser_classes = [MultiPartParser, FormParser]

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,

    ]

    def perform_create(self, serializer):
        # print(serializer)
        serializer.save()

    def perform_update(self, serializer):
        print(self.request.user)
        if self.request.user.username == "k2":
            serializer.save()
        else:
            raise serializers.ValidationError({
                "detail": "not right user: update failed"
            })

    def perform_destroy(self, serializer):
        try:
            serializer.delete()
        except:
            print("cannot delete !")


class CreateMenuItem(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = seris.ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
