from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        print("I WAS CALLED!")
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        profile = models.Profile.objects.create(user=user)
        profile.save()

        return user

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stock
        fields = ('ticker', 'buy_price', 'quantity', 'uuid')

class StockCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Stock
        fields = ('ticker', 'quantity',)

class CharitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Charity
        fields = ('ein', 'name', 'sub_name', 'city', 'state')

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    charity = CharitySerializer()
    stocks = StockSerializer(many=True)
    
    class Meta:
        model = models.Profile
        fields = ('user', 'charity', 'nickname', 'profile_pic', 'percentage', 'stocks')
