from rest_framework_jwt.views import obtain_jwt_token

from django.urls import path
from . import views

urlpatterns = [
    path('token/', obtain_jwt_token)
]