from rest_framework import serializers
from .models import *

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = College
        fields = ['id', 'name', 'location', 'no_of_seats', 'established',]

# careers/serializers.py


class CareerPathSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerPath
        fields = ["subjects", "jobs", "higher_studies", "entrepreneurship", "placements"]

class BranchSerializer(serializers.ModelSerializer):
    career_path = CareerPathSerializer(read_only=True)

    class Meta:
        model = Branch
        fields = ["id", "name", "description", "career_path"]

class StreamSerializer(serializers.ModelSerializer):
    branches = BranchSerializer(many=True, read_only=True)

    class Meta:
        model = Stream
        fields = ["id", "name", "description", "icon", "color", "branches"]
