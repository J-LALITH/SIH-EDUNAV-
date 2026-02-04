from django.contrib import admin
from .models import *

@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = ("name", "location", "no_of_seats")
    search_fields = ("name", "location")
# careers/admin.py


admin.site.register(Stream)
admin.site.register(Branch)
admin.site.register(CareerPath)
