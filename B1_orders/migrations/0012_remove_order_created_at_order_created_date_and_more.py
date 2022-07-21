# Generated by Django 4.0.1 on 2022-02-07 05:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('B1_orders', '0011_alter_order_order_no'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='created_at',
        ),
        migrations.AddField(
            model_name='order',
            name='created_date',
            field=models.CharField(default='07', max_length=10),
        ),
        migrations.AddField(
            model_name='order',
            name='created_month',
            field=models.CharField(default='02', max_length=10),
        ),
        migrations.AddField(
            model_name='order',
            name='created_time',
            field=models.CharField(default='05:32:27', max_length=10),
        ),
        migrations.AddField(
            model_name='order',
            name='created_year',
            field=models.CharField(default='2022', max_length=10),
        ),
    ]
