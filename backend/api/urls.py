
from . import views
# careers/urls.py

from rest_framework.routers import DefaultRouter
from .views import *


# careers/urls.py
from django.urls import path




urlpatterns = [
    path("college/autocomplete/", views.autocomplete_college, name="college-autocomplete"),
    path("locations/", views.get_locations_with_colleges, name="get-locations"),
    path("college/search/name/", views.search_college_by_name, name="college-search-name"),
    path("college/search/location/", views.search_college_by_location, name="college-search-location"),
    path("streams/", views.streams_list, name="streams"),
    path("branches/", views.branches_list, name="branches"),
    path("career-paths/", views.career_paths_list, name="career-paths"),
]


