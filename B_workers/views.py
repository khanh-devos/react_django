from django.shortcuts import render
from . import serializers as seris
from . import models
from django.contrib.auth.models import User
from django.contrib.auth import logout

from rest_framework import viewsets, generics, mixins, status, serializers
from rest_framework.decorators import APIView
from rest_framework.response import Response

from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import TokenAuthentication

from django.shortcuts import get_object_or_404




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = seris.UserSerializer
    
#----------------------------------------#
# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = seris.RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)     #check username unique
        
        #check email unique
        new_email = request.data.get('email') 
        if User.objects.filter(email=new_email).exists():
            raise serializers.ValidationError({
                'email': 'this email is used already by other'
            })
        
        user = serializer.save()
        
        #login(request, user)         #this lasts forever => Token has expired time
        #create Token inside Response' cookies
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': seris.UserSerializer(user, 
                        context=self.get_serializer_context() ).data,
            'token': str(refresh.access_token), 
        })
    
    
#----------------------------------------#
# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = seris.LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data = request.data)
    serializer.is_valid(raise_exception=True)
    
    user = serializer.validated_data

    #create Token inside Response' cookies
    refresh = RefreshToken.for_user(user)
    
    return Response({
      'user': seris.UserSerializer(user, 
                    context=self.get_serializer_context() ).data,
      'token': str(refresh.access_token), 
    })    
    
    
#------
#Token API
class TokenAPI(generics.RetrieveAPIView):
    serializer_class = seris.TokenSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
    
    
#--------------------
#Logout 
class LogoutAPI(generics.GenericAPIView):
  def get(self, request, *args, **kwargs):
    logout(request)
    
    return Response(status=status.HTTP_200_OK)
       
    
    
#-----------------------
#Change Password
class ChangePasswordAPI(generics.UpdateAPIView):
    
  """
  An endpoint for changing password.
  """
  model = User
  serializer_class = seris.ChangePasswordSerializer
  permission_classes = [IsAuthenticated]
  
  def get_object(self, queryset=None):
    obj = self.request.user
    return obj
  
  def update(self, request, *args, **kwargs):
    self.object = self.get_object()
    serializer = self.get_serializer(data = request.data)

    if serializer.is_valid():
      # Check old password
      old_password = serializer.data.get("old_password")
      
      if not self.object.check_password(old_password):
        return Response({
            "detail": ["Wrong old password."]
        }, status=status.HTTP_400_BAD_REQUEST)
        
      # set_password also hashes the password that the user will get
      new_password = serializer.data.get("new_password")
      self.object.set_password(new_password)
      self.object.save()
      
      #create Token inside Response' cookies
      refresh = RefreshToken.for_user(self.object)
      
      response = {
        'user': seris.UserSerializer(self.object, 
                    context=self.get_serializer_context() ).data,
        'token': str(refresh.access_token), 
      }

      return Response(response)

    return Response(serializer.errors, 
                    status=status.HTTP_400_BAD_REQUEST)
        
    
        