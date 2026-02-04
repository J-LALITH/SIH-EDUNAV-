from django.db import models

class College(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    no_of_seats = models.PositiveIntegerField()
    established = models.CharField(max_length=10, blank=True, null=True)
     # False for Private, True for Government

    def __str__(self):
        return self.name
# careers/models.py


class Stream(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.CharField(max_length=50, default="Code")  # match lucide-react icon name
    color = models.CharField(max_length=100, default="bg-gradient-primary")

    def __str__(self):
        return self.name


class Branch(models.Model):
    stream = models.ForeignKey(Stream, related_name="branches", on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    description = models.TextField()

    def __str__(self):
        return f"{self.stream.name} - {self.name}"


class CareerPath(models.Model):
    branch = models.OneToOneField(Branch, related_name="career_path", on_delete=models.CASCADE)
    subjects = models.JSONField(default=list)  # ["Programming", "AI", ...]
    jobs = models.JSONField(default=list)      # ["Software Engineer", ...]
    higher_studies = models.JSONField(default=list)
    entrepreneurship = models.JSONField(default=list)
    placements = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Career Path - {self.branch.name}"