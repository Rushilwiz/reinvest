from . import views

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('charity/<int:pk>', views.CharityViewSet.as_view({'get': 'retrieve'})),
    path('charity/', views.CharityViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('stock/<uuid:pk>', views.StockViewSet.as_view({'get': 'retrieve'})),
    path('stock/', views.StockViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('profile/create', views.UserProfileCreate.as_view()),
    path('profile/', views.UserProfileDetail.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
