from django.contrib import admin
from.models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id','recipe','customer_name','status','created_at')
    list_filter = ('status',)