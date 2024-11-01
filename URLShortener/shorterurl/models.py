from django.db import models
from django.contrib.auth.models import User
import string, random

def generate_short_link():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))

class ShortenedURL(models.Model):
    original_url = models.URLField()
    short_link = models.CharField(max_length=15, unique=True, default=generate_short_link)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name="urls")
    click_count = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.short_link} -> {self.original_url}"
