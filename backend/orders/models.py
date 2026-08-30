from django.db import models
from recipes.models import Recipe

class Order(models.Model):
    STATUS = [('REQUESTED','REQUESTED'),('VALIDATING','VALIDATING'),('CONFIRMED','CONFIRMED'),('PREPARING','PREPARING'),('COMPLETED','COMPLETED'),('FAILED','FAILED')]
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=100, default='Walk-in')
    status = models.CharField(max_length=20, choices=STATUS, default='REQUESTED')
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return f"Order {self.id} - {self.status}"
