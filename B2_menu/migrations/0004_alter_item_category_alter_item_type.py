# Generated by Django 4.0.1 on 2022-01-26 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('B2_menu', '0003_rename_other_item_delete_bread_delete_coffee_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='category',
            field=models.CharField(choices=[('Beverage', 'Beverage'), ('Food', 'Food')], default='Beverage', max_length=100),
        ),
        migrations.AlterField(
            model_name='item',
            name='type',
            field=models.CharField(choices=[('Coffee', 'Coffee'), ('Juice', 'Juice'), ('MilkTea', 'Milk Tea'), ('Other', 'Other')], default='Coffee', max_length=100),
        ),
    ]