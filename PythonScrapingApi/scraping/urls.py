from django.urls import path
from . import views

urlpatterns = [
    path('scrap-events/<str:keyword>/', views.scrap, name='scrap'),
]