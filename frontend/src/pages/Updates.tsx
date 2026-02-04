import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Clock, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";

const Updates = () => {
  const updates = [
    {
      id: 1,
      title: "JEE Main 2024 Registration Extended",
      description: "Registration deadline for JEE Main 2024 has been extended to October 30, 2024. Don't miss this opportunity!",
      type: "exam",
      priority: "high",
      date: "2024-10-15",
      status: "active",
      action: "Register Now"
    },
    {
      id: 2,
      title: "NEET Counseling Round 2 Results",
      description: "NEET counseling round 2 results have been announced. Check your allotment status on the official website.",
      type: "counseling",
      priority: "medium",
      date: "2024-10-12",
      status: "completed",
      action: "Check Results"
    },
    {
      id: 3,
      title: "JSEA Counseling Schedule Released",
      description: "Tamil Nadu Engineering Admissions counseling schedule for 2024 has been released. Important dates inside.",
      type: "counseling",
      priority: "high",
      date: "2024-10-10",
      status: "active",
      action: "View Schedule"
    },
    {
      id: 4,
      title: "New Scholarship Applications Open",
      description: "Multiple scholarship applications are now open for engineering students. Apply before the deadline.",
      type: "scholarship",
      priority: "medium",
      date: "2024-10-08",
      status: "active",
      action: "Apply Now"
    },
    {
      id: 5,
      title: "VITEEE 2025 Notification Released",
      description: "VIT University has released the notification for VITEEE 2025. Registration starts from November 1, 2024.",
      type: "exam",
      priority: "low",
      date: "2024-10-05",
      status: "upcoming",
      action: "View Details"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "completed": return "secondary";
      case "upcoming": return "outline";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "exam": return "📝";
      case "counseling": return "🎓";
      case "scholarship": return "💰";
      default: return "📢";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Bell className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Latest Updates</h1>
          <p className="text-muted-foreground">Stay informed about entrance exams, counseling schedules, and important notifications</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-primary p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-hero p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-sm text-muted-foreground">Active Deadlines</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-subtle p-3 rounded-full border border-primary">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Recently Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Updates List */}
        <div className="space-y-6">
          {updates.map((update) => (
            <Card key={update.id} className="shadow-card hover:shadow-elevated transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{getTypeIcon(update.type)}</span>
                    <div className="flex-1">
                      <CardTitle className="text-foreground mb-2">{update.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {update.description}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2 ml-4">
                    <Badge variant={getPriorityColor(update.priority) as any}>
                      {update.priority.charAt(0).toUpperCase() + update.priority.slice(1)} Priority
                    </Badge>
                    <Badge variant={getStatusColor(update.status) as any}>
                      {update.status.charAt(0).toUpperCase() + update.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(update.date)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="capitalize">{update.type}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    {update.action}
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="feature">
              <Bell className="mr-2 h-4 w-4" />
              Subscribe to Notifications
            </Button>
            <Button variant="outline">
              View All Exam Calendars
            </Button>
            <Button variant="outline">
              Download Updates App
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updates;