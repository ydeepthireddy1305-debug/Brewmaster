from django.db import models

class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, default='general')
    stock_quantity = models.FloatField(default=100)
    unit = models.CharField(max_length=20, default='ml')
    def __str__(self): return self.name