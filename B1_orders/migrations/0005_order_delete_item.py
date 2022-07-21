# Generated by Django 4.0.1 on 2022-02-02 03:53

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('B1_orders', '0004_item_total_price'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_no', models.CharField(max_length=100)),
                ('category', models.CharField(max_length=100)),
                ('type', models.CharField(max_length=100)),
                ('name', models.CharField(max_length=100)),
                ('extras', models.JSONField(null=True)),
                ('sizes_prices', models.JSONField(null=True)),
                ('unit_price', models.PositiveIntegerField()),
                ('quantity', models.PositiveIntegerField()),
                ('total_price', models.PositiveIntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('worker', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Item',
        ),
    ]
