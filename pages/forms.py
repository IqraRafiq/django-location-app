from .models import *
from django.forms import ModelForm

class LocationForm(ModelForm):

    class Meta:
        model = Location
        fields = ["address", "coordinates"]

    def save(self, commit=True):

        loc = super().save(commit=False)
        if commit:
            loc.save()
        return loc
