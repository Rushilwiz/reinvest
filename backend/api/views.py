from django.shortcuts import render, get_object_or_404
from django.http import QueryDict

from math import ceil

import robin_stocks as r

import os

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
        login = r.login(os.getenv("ROBINHOOD_USER"), os.getenv("ROBINHOOD_PASS"))
        order = r.order_buy_market(symbol=serializer.data['ticker'], quantity=serializer.data['quantity'])
        stonks = r.build_holdings()
        for key, value in stonks.items():
            if Stock.objects.filter(uuid=value['id']).count() != 1:
                stock = Stock.objects.create(user=request.user.profile, quantity=ceil(float(value['quantity'])), ticker=key, buy_price=value['price'], uuid=value['id'])
        
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

class FetchRobinhoodStocks(APIView):
    def get(self, request, format=None):
        login = r.login(os.getenv("ROBINHOOD_USER"), os.getenv("ROBINHOOD_PASS"))
        stonks = r.build_holdings()
        for key, value in stonks.items():
            if Stock.objects.filter(uuid=value['id']).count() != 1:
                stock = Stock.objects.create(user=request.user.profile, quantity=ceil(float(value['quantity'])), ticker=key, buy_price=value['price'], uuid=value['id'])
        queryset = request.user.profile.stocks.all()
        serializer = StockSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
            
class BuyRobinhoodStock(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, format=None):
        login = r.login(os.getenv("ROBINHOOD_USER"), os.getenv("ROBINHOOD_PASS"))
        stonks = r.build_holdings()
        for key, value in stonks.items():
            print(key)
            print(value)
        return Response(stonks)