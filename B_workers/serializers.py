from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework import serializers
from django.contrib.auth.hashers import check_password



class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    
    
#---------------------
# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        
        #Hide the password
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
                    validated_data['username'], 
                    validated_data['email'], 
                    validated_data['password']
                )

        return user

#-----
#login
class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()
  
  def validate(self, data):
    user = authenticate(**data)
    
    if user and user.is_active:
      return user
    
    elif User.objects.filter(username=data.get('username')).exists():
      raise serializers.ValidationError("Incorrect password")

    raise serializers.ValidationError("Incorrect username or email")

    

#----------
# get User by Token
class TokenSerializer(serializers.ModelSerializer):
  class Meta():
    model = User
    fields = ('id', 'username', 'email')


#---------
#change password
class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
  
#---------
#forget password
#class ResetPassSerializer





    
        

