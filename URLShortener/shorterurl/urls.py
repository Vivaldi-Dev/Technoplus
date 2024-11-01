from django.urls import path
from .views import ShortenURL, RedirectURL, URLStats

urlpatterns = [
    path('shorten', ShortenURL.as_view(), name='shorten_url'),
    path('shorten/<str:short_link>', RedirectURL.as_view(), name='redirect_url'),
    path('stats/<str:short_link>', URLStats.as_view(), name='url_stats'),
]
