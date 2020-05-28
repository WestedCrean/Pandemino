from django.contrib.auth.models import User, Group
from PandeminoApp.models import Taco
from rest_framework import serializers


class TacoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Taco
        fields = ["meat", "taste"]


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "groups"]


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]
