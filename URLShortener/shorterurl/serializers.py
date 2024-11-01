from rest_framework import serializers
from .models import ShortenedURL

class ShortenURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedURL
        fields = ['original_url', 'short_link', 'owner']
        extra_kwargs = {'short_link': {'required': False}}

class URLStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedURL
        fields = ['short_link', 'click_count']
