from rest_framework.decorators import api_view

from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
# careers/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from .models import Stream, Branch, CareerPath
from .serializers import StreamSerializer, BranchSerializer, CareerPathSerializer

# -----------------
# Get All Streams (with nested branches + career paths)
# -----------------
def streams_list(request):
    if request.method == "GET":
        streams = Stream.objects.prefetch_related("branches__career_path").all()
        serializer = StreamSerializer(streams, many=True)
        return JsonResponse(serializer.data, safe=False)

# -----------------
# Get All Branches
# -----------------
def branches_list(request):
    if request.method == "GET":
        branches = Branch.objects.select_related("career_path").all()
        serializer = BranchSerializer(branches, many=True)
        return JsonResponse(serializer.data, safe=False)

# -----------------
# Get All Career Paths
# -----------------
def career_paths_list(request):
    if request.method == "GET":
        paths = CareerPath.objects.all()
        serializer = CareerPathSerializer(paths, many=True)
        return JsonResponse(serializer.data, safe=False)







# Autocomplete for college name
@api_view(['GET'])
def autocomplete_college(request):
    q = request.GET.get('q', '').strip()
    if q:
        colleges = College.objects.filter(name__icontains=q)[:10]
        serializer = CollegeSerializer(colleges, many=True)
        return Response(serializer.data)
    return Response([])

# Fetch all locations that have colleges
@api_view(['GET'])
def get_locations_with_colleges(request):
    locations = College.objects.values_list('location', flat=True).distinct()
    location_list = [{"id": idx + 1, "name": loc} for idx, loc in enumerate(locations)]
    return Response(location_list)

# Fetch colleges by name (search box)
@api_view(['POST'])
def search_college_by_name(request):
    name = request.data.get('name', '').strip()
    if not name:
        return Response({"error": "Please enter a college name"}, status=status.HTTP_400_BAD_REQUEST)

    colleges = College.objects.filter(name__icontains=name)
    if not colleges.exists():
        return Response({"error": "No colleges found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CollegeSerializer(colleges, many=True)
    return Response(serializer.data)

# Fetch colleges by location (dropdown)
@api_view(['POST'])
def search_college_by_location(request):
    location = request.data.get('location', '').strip()
    if not location:
        return Response({"error": "Please select a location"}, status=status.HTTP_400_BAD_REQUEST)

    colleges = College.objects.filter(location__iexact=location)
    if not colleges.exists():
        return Response({"error": "No colleges found in this location"}, status=status.HTTP_404_NOT_FOUND)

    serializer = CollegeSerializer(colleges, many=True)
    return Response(serializer.data)


# careers/views.py


