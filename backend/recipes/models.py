from django.db import models
from ingredients.models import Ingredient

class Recipe(models.Model):
    name = models.CharField(max_length=100)
    is_custom = models.BooleanField(default=False)
    created_by = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='items')
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.FloatField()
    def __str__(self): return f"{self.recipe.name} - {self.ingredient.name}"