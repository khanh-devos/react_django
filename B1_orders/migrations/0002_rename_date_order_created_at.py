# Generated by Django 4.0.1 on 2022-01-25 10:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('B1_orders', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='date',
            new_name='created_at',
        ),
    ]