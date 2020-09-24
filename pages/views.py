from django.shortcuts import render , redirect
from django.http import HttpResponse
from django.views.generic import View ,FormView
from .forms import *
import json
from django.core.serializers.json import DjangoJSONEncoder
from django.conf import settings

# def index(request):

#     return render(request, 'pages/index.html')

class index(FormView):
    template_name = 'pages/index.html'
    form_class = LocationForm
    success_url = '/'
    def get_context_data(self, **kwargs):
    
        context = super(index, self).get_context_data(**kwargs)
        context['API_KEY'] = settings.GOOGLE_MAPS_API_KEY

        return context

    def form_valid(self, form):
        form.save()
        return super(index, self).form_valid(form)