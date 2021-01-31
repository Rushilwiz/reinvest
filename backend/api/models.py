from django.contrib.auth.models import User
from django.db import models

from PIL import Image

# Create your models here.

class Charity (models.Model):
    ein = models.CharField(primary_key=True, max_length=50)
    name = models.CharField(max_length=50, blank=True, null=True)
    sub_name = models.CharField(max_length=50, blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    state = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Charities"

    def __str__(self):
        return self.name

class Profile (models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    charity = models.OneToOneField(Charity, blank=True, null=True, on_delete=models.DO_NOTHING)
    nickname = models.CharField(max_length=20, blank=True, null=True)
    profile_pic = models.ImageField(default='default.jpg', upload_to='profile_pics')
    percentage = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f'{self.user.username}\'s profile'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        img = Image.open(self.profile_pic.path)

        if img.height > 300 or img.width > 300:
            size = (300, 300)
            img.thumbnail(size)
            img.save(self.profile_pic.path)

    class Meta:
        verbose_name_plural = "Profiles"

class Stock (models.Model):
    user = models.ForeignKey(Profile, related_name='stocks', on_delete=models.CASCADE)
    ticker = models.CharField(max_length=5, blank=True, null=True)
    buy_price = models.DecimalField(max_digits=9, decimal_places=2)
    quantity = models.DecimalField(max_digits=9, decimal_places=2)
    uuid = models.UUIDField(primary_key=True, unique=True)

    class Meta:
        verbose_name_plural = "Stocks"

    def __str__(self):
        return f'{self.user.user.username}\'s Stock: {self.ticker} @ {self.buy_price}'

