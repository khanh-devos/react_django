# Generated by Django 4.0.1 on 2022-02-06 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('B1_orders', '0009_alter_order_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_no',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
