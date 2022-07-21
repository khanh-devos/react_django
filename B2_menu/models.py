from django.db import models
from django.contrib.auth.models import User

from django.utils.translation import gettext_lazy as _

import datetime
nowDay = datetime.datetime.now()
myMonth = f'{"{:02d}".format(nowDay.month)}'

CATEGORY = {
    'BEVERAGE': [
        'Coffee', 'Juice', 'Milk Tea', 'Other'
    ],

    'FOOD': ['Bread', 'Ice Cream', 'Other'],
}

EXTRAS = {
    "iced": {"extra price": "0", "default": "False"},
    "hot": {"extra price": "0", "default": "False"},
    "bubbled": {"extra price": 0.5, "default": "False"},
    "jelly": {"extra price": 0.5, "default": "False"},
    "chia nut": {"extra price": 1, "default": "False"},
}

SIZES_PRICEs = {
    "normal": {"price": 10, "default": "True"},
    "large": {"price": 20, "default": "False"}
}


def formatPrice(price):
    # convert price
    if "," not in str(price) and len(str(price)) > 3:
        rev = "".join(reversed(str(price)))
        res = ""
        while len(rev) > 3:
            part = rev[:3]
            rev = rev[3:]
            res += part + ","

            if len(rev) > 3:
                continue
            else:
                res += rev

        return "".join(reversed(res))
    else:
        return price


# Create your models here.
class Item(models.Model):

    category = models.CharField(max_length=100, null=False)
    type = models.CharField(max_length=100, null=False)

    name = models.CharField(max_length=100,
                            unique=True,
                            error_messages={
                                "unique": _("this name already is used."),
                            },)  # white coffee

    # like dict of 2 keys: iced, hot:
    # { 'iced': {'extra price': 0, 'default': False},
    #  'hot': {'extra price': 0, 'default': False}, }
    extras = models.JSONField(null=True)

    # like a dict for choosing
    sizes_prices = models.JSONField(null=True)

    img = models.ImageField(default='static/images/addimage.png',
                            upload_to=f'static/images/')

    def __str__(self):
        return f"{self.name} ({self.type})"

    def save(self, *args, **kwargs):
        #super().save(*args, **kwargs)

        # Add id into extras.details for React requirement
        id_added_details = []
        for i, v in enumerate(self.extras["details"]):
            id_added_item = v

            # Format price
            #id_added_item.update({"price": formatPrice(v["price"])})

            id_added_item.update({"id": i})
            id_added_details.append(id_added_item)

        self.extras = {"details": id_added_details}

        # add id for sizes_prices
        id_added_sizes_prices = []
        for i, v in enumerate(self.sizes_prices["details"]):
            id_added_item = v
            # Format price
            #id_added_item.update({"price": formatPrice(v["price"])})

            id_added_item.update({"id": i})
            id_added_sizes_prices.append(id_added_item)

        self.sizes_prices = {"details": id_added_sizes_prices}
        super().save(*args, **kwargs)
