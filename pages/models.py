from django.db import models

# Create your models here.
class Location(models.Model):
    
    address = models.CharField(max_length= 255)
    coordinates = models.CharField(max_length= 255)
   