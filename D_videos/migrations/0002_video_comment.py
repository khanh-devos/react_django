# Generated by Django 4.0.1 on 2022-03-06 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('D_videos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='video',
            name='comment',
            field=models.CharField(default='idea', max_length=1000, null=True),
        ),
    ]
