from django.conf import settings

from django.contrib.auth.models import User
from django.contrib.auth.backends import ModelBackend

from django.contrib.auth.hashers import check_password

from django.contrib import messages
from django.contrib.messages.api import MessageFailure
from django.shortcuts import render, redirect


class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        
        try:
            try:
                user = User.objects.get(email = username)
            except:
                user = User.objects.get(username = username)
                
        except User.DoesNotExist:
            return
        
        #If no exception occur
        else:
            if user.check_password(password):
                return user
                
        return None