from django.shortcuts import render

from django.shortcuts import redirect, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ShortenedURL
from .serializers import ShortenURLSerializer, URLStatsSerializer

class ShortenURL(APIView):
    def post(self, request):
        serializer = ShortenURLSerializer(data=request.data)
        if serializer.is_valid():
            short_link = request.data.get('short_link')
            if short_link:
                if ShortenedURL.objects.filter(short_link=short_link).exists():
                    return Response({"error": "Custom short link already taken."}, status=status.HTTP_400_BAD_REQUEST)
                serializer.save(short_link=short_link)
            else:
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RedirectURL(APIView):
    def get(self, request, short_link):
        url_entry = get_object_or_404(ShortenedURL, short_link=short_link)
        url_entry.click_count += 1
        url_entry.save()
        return redirect(url_entry.original_url)

class URLStats(APIView):
    def get(self, request, short_link):
        url_entry = get_object_or_404(ShortenedURL, short_link=short_link)
        serializer = URLStatsSerializer(url_entry)
        return Response(serializer.data)
