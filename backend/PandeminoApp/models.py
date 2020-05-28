from django.db import models

# Create your models here.


class User(models.Model):
    email = models.CharField(max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)


class Taco(models.Model):
    meat = models.CharField(max_length=30)
    taste = models.CharField(max_length=30)
