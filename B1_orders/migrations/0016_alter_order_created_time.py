# Generated by Django 4.0.1 on 2022-03-06 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('B1_orders', '0015_alter_order_created_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='created_time',
            field=models.CharField(default='07:24:39', max_length=10),
        ),
    ]
