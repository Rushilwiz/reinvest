from django.shortcuts import render, get_object_or_404
from django.http import QueryDict

from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response

from .models import *
from .serializers import *

class CharityViewSet(ModelViewSet):
    queryset = models.Charity.objects.all()
    serializer_class = CharitySerializer

class StockViewSet(ModelViewSet):
    queryset = ''
    serializer_class = StockSerializer

    def list(self, request, *args, **kwargs):
        queryset = request.user.profile.stocks.all()
        serializer = StockSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None, *args, **kwargs):
        queryset = request.user.profile.stocks.filter(uuid=pk)
        if queryset.count() != 1:
            return Response({"message": "Stock not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = StockSerializer(queryset.first())
        return Response(serializer.data, status=status.HTTP_200_OK)
    

    def create(self, request, *args, **kwargs):
        data = QueryDict.copy(request.data)
        data.update({'user': request.user})
        serializer = StockCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileDetail(APIView):
    def get(self, request, format=None):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserProfileCreate(CreateAPIView):
    model = User
    permission_classes = [permissions.AllowAny]
    serializer_class = UserCreateSerializer