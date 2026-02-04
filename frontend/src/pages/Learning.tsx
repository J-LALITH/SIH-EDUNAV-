import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Youtube, FileText, Trophy, ExternalLink } from "lucide-react";

const Learning = () => {
  const [selectedClass, setSelectedClass] = useState("");

  const entranceExams = [
    {
      id: "jee",
      name: "JEE Main & Advanced",
      description: "Joint Entrance Examination for Engineering",
      icon: "🏗️",
      subjects: ["Physics", "Chemistry", "Mathematics"],
      resources: {
        books: ["HC Verma Physics", "NCERT Mathematics", "OP Tandon Chemistry"],
        videos: ["Physics Wallah JEE", "Unacademy JEE", "BYJU'S JEE"],
        papers: "15 Years Solved Papers",
        mockTests: "50+ Mock Tests Available"
      }
    },
    {
      id: "neet",
      name: "NEET",
      description: "National Eligibility cum Entrance Test for Medical",
      icon: "🩺",
      subjects: ["Physics", "Chemistry", "Biology"],
      resources: {
        books: ["NCERT Biology", "Physical Chemistry", "Objective Physics"],
        videos: ["Physics Wallah NEET", "Aakash NEET", "Vedantu NEET"],
        papers: "20 Years Question Bank",
        mockTests: "100+ Mock Tests Available"
      }
    },
    {
      id: "viteee",
      name: "VITEEE",
      description: "VIT Engineering Entrance Examination",
      icon: "🎓",
      subjects: ["Physics", "Chemistry", "Mathematics", "English"],
      resources: {
        books: ["VIT Specific Guides", "NCERT Books", "Previous Year Papers"],
        videos: ["VIT Preparation Videos", "Subject-wise tutorials"],
        papers: "10 Years Solved Papers",
        mockTests: "25+ Mock Tests Available"
      }
    }
  ];

  const classResources = {
    "10": {
      subjects: ["Mathematics", "Science", "English", "Social Studies"],
      youtubeVideos: [
        { title: "Class 10 Mathematics - Complete Course", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "BYJU'S Class 10" },
        { title: "Science Class 10 - Full Syllabus", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Vedantu 10th" },
        { title: "English Grammar for Class 10", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Unacademy Class 10" },
        { title: "Social Studies Class 10 Complete", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "BYJU'S Class 10" }
      ],
      textbooks: ["NCERT Mathematics", "NCERT Science", "NCERT Social Studies"],
      samplePapers: "Board Exam Papers 2020-2024"
    },
    "11": {
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      youtubeVideos: [
        { title: "Physics Class 11 - Mechanics", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Physics Wallah" },
        { title: "Chemistry Class 11 - Organic Chemistry", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Vedantu 11th" },
        { title: "Mathematics Class 11 - Trigonometry", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "BYJU'S 11th" },
        { title: "Biology Class 11 - Cell Structure", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Physics Wallah" }
      ],
      textbooks: ["NCERT Physics", "NCERT Chemistry", "NCERT Mathematics"],
      samplePapers: "Board + Competitive Exam Papers"
    },
    "12": {
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
      youtubeVideos: [
        { title: "Physics Class 12 - Electromagnetic Induction", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Physics Wallah 12th" },
        { title: "Chemistry Class 12 - Coordination Compounds", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Unacademy 12th" },
        { title: "Mathematics Class 12 - Calculus", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "BYJU'S 12th" },
        { title: "Biology Class 12 - Genetics", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", channel: "Physics Wallah 12th" }
      ],
      textbooks: ["NCERT Complete Set", "Reference Books"],
      samplePapers: "Board Papers + JEE/NEET Practice"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Learning Resources</h1>
          <p className="text-muted-foreground">Access curated study materials, videos, and practice tests</p>
        </div>

        {/* Class Selection */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Select Your Class</CardTitle>
            <CardDescription>Choose your current class to get personalized resources</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full md:w-80">
                <SelectValue placeholder="Select Class (1-12)" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    Class {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Class-specific Resources */}
        {selectedClass && classResources[selectedClass as keyof typeof classResources] && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Class {selectedClass} Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* YouTube Videos */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center">
                    <Youtube className="h-5 w-5 text-red-500 mr-2" />
                    <CardTitle className="text-lg">YouTube Study Videos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {classResources[selectedClass as keyof typeof classResources].youtubeVideos.map((video, index) => (
                      <div key={index} className="p-3 bg-background rounded border border-border hover:border-primary/50 transition-smooth">
                        <a 
                          href={video.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 mr-2">
                              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-smooth line-clamp-2">
                                {video.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">{video.channel}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-smooth flex-shrink-0" />
                          </div>
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Textbooks */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 text-primary mr-2" />
                    <CardTitle className="text-lg">Textbooks</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {classResources[selectedClass as keyof typeof classResources].textbooks.map((book, index) => (
                      <div key={index} className="p-2 bg-background rounded border border-border">
                        <span className="text-sm font-medium text-foreground">{book}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sample Papers */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-primary mr-2" />
                    <CardTitle className="text-lg">Sample Papers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-2 bg-background rounded border border-border">
                    <span className="text-sm font-medium text-foreground">
                      {classResources[selectedClass as keyof typeof classResources].samplePapers}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Download Papers
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Entrance Exams Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Major Entrance Exams</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {entranceExams.map((exam) => (
              <Card key={exam.id} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{exam.icon}</span>
                    <div>
                      <CardTitle className="text-foreground">{exam.name}</CardTitle>
                      <CardDescription>{exam.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {exam.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Resources Available:</h4>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">📚 Books: {exam.resources.books.length}+ recommended</p>
                      <p className="text-muted-foreground">🎥 Video Lectures: {exam.resources.videos.length}+ channels</p>
                      <p className="text-muted-foreground">📝 {exam.resources.papers}</p>
                      <p className="text-muted-foreground">🎯 {exam.resources.mockTests}</p>
                    </div>
                  </div>
                  <Button variant="feature" className="w-full">
                    <Trophy className="mr-2 h-4 w-4" />
                    Start Preparation
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;