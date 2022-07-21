from django.db import models


# Create your models here.


class EVideo(models.Model):
    name = models.CharField(max_length=100, null=True, default="video")
    content = models.FileField(default='static/videos/Dragostea.mp3',
                               upload_to=f'static/videos/')
    
    comment = models.CharField(max_length=1000, null=True, default="idea")

    def __str__(self):
        return f"video {self.name}"
