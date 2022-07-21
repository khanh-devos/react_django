from django.db import models
from django.contrib.auth.models import User

import datetime
from django.utils import timezone

#date = datetime.datetime.now()
date = timezone.now()


class Order(models.Model):
    owner = models.ForeignKey(User, related_name="sales",
                              on_delete=models.CASCADE,
                              null=True)

    owner_name = models.CharField(max_length=100, null=True)

    order_no = models.CharField(max_length=100, null=False)

    category = models.CharField(max_length=100, null=False)
    type = models.CharField(max_length=100, null=False)
    name = models.CharField(max_length=100)  # white coffee

    extras = models.JSONField(null=True)
    sizes_prices = models.JSONField(null=True)

    unit_price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    total_price = models.PositiveIntegerField()

    created_year = models.CharField(max_length=10,
                                    default=date.strftime("%Y"))
    created_month = models.CharField(max_length=10,
                                     default=date.strftime("%m"))
    created_date = models.CharField(max_length=10,
                                    default=date.strftime("%d"))
    created_time = models.CharField(max_length=10,
                                    default=date.strftime("%X"))

    def __str__(self):
        return f'order {self.order_no} {self.name}'

    def save(self, *args, **kwargs):
        self.owner_name = self.owner

        # We need to call again to update the time every saving
        date = timezone.now()
        self.created_year = date.strftime("%Y")
        self.created_month = date.strftime("%m")
        self.created_date = date.strftime("%d")
        self.created_time = date.strftime("%X")

        super().save(*args, **kwargs)

    class Meta:
        db_table = 'b1_orders_order'
        managed = False
