import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, Users, GraduationCap, Search, Award } from "lucide-react";

const Scholarships = () => {
  const [searchCollege, setSearchCollege] = useState("");
  const [isSearched, setIsSearched] = useState(false);

  // Mock scholarship data
  const eligibleScholarships = [
    {
      id: 1,
      name: "First graduation scholarship(FG)",
      provider: "Government of India",
      amount: "₹20,000 - ₹40,000",
      eligibility: "80%+ marks, Family income < ₹5 Lakhs,nobody should get graduate",
      
      type: "Merit-based",
      
    },
    {
      id: 2,
      name: "National Scholarship Portal",
      provider: "Ministry of Education",
      amount: "₹10,000 - ₹50,000",
      eligibility: "75%+ marks, Minority community",
      deadline: "15th November 2024",
      type: "Need-based",
      applicants: "1,00,000+"
    },
    {
      id: 3,
      name: "INSPIRE Scholarship",
      provider: "Department of Science & Technology",
      amount: "₹80,000 per year",
      eligibility: "Top 1% in Class XII, Science stream",
      deadline: "30th September 2024",
      type: "Merit-based",
      applicants: "10,000+"
    }
  ];

  const collegeScholarships = [
    {
      id: 1,
      name: "University of Kashmir",
      
      amount: "₹1,00,000",
      eligibility: "j&s Entrance Exam Top 1000",
      deadline: "20th August 2024"
    },
    {
      id: 2,
      name: "Cluster University of Srinagar",
      
      amount: "₹50,000",
      eligibility: "JSEA Top 500 ranks",
      deadline: "15th September 2024"
    },
    {
      id: 3,
      name: "Govt. Degree College, Poonch",
      
      amount: "₹75,000",
      eligibility: " Top 1000 rank in JSEA",
      deadline: "10th July 2024"
    },
    {
      id: 4,
      name: "Govt. Degree College, Kathua",
     
      amount: "₹40,000",
      eligibility: "95%+ in Class XII",
      deadline: "25th August 2024"
    }
  ];

  const handleCollegeSearch = () => {
    if (searchCollege.trim()) {
      setIsSearched(true);
    }
  };

  const getStatusColor = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays < 0) return "destructive";
    if (diffDays < 7) return "destructive";
    if (diffDays < 30) return "default";
    return "secondary";
  };

  const getStatusText = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays < 7) return "Urgent";
    if (diffDays < 30) return "Soon";
    return "Open";
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Award className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Scholarship Information</h1>
          <p className="text-muted-foreground">Discover scholarships you're eligible for and explore college-specific opportunities</p>
        </div>

        {/* Eligible Scholarships Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Scholarships You're Eligible For</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {eligibleScholarships.map((scholarship) => (
              <Card key={scholarship.id} className="shadow-card hover:shadow-elevated transition-smooth">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-foreground mb-2">{scholarship.name}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {scholarship.provider}
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={getStatusColor(scholarship.deadline) as any}
                      className="ml-2"
                    >
                      {getStatusText(scholarship.deadline)}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{scholarship.amount}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{scholarship.eligibility}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Deadline: {scholarship.deadline}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{scholarship.applicants} applicants</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className="text-xs">
                      {scholarship.type}
                    </Badge>
                    <Button variant="feature" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* College-specific Search */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Search College-Specific Scholarships</CardTitle>
            <CardDescription>Find scholarships offered by specific colleges and universities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter college name (e.g., IIT Madras, Anna University)"
                value={searchCollege}
                onChange={(e) => setSearchCollege(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleCollegeSearch()}
              />
              <Button onClick={handleCollegeSearch} variant="feature">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* College Scholarships Results */}
        {(isSearched || !searchCollege) && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {isSearched ? `Scholarships from ${searchCollege}` : "Popular College Scholarships"}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {collegeScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="shadow-card hover:shadow-elevated transition-smooth">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-foreground text-lg">{scholarship.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">
                          
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={getStatusColor(scholarship.deadline) as any}
                      >
                        {getStatusText(scholarship.deadline)}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-foreground">{scholarship.amount}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{scholarship.eligibility}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Deadline: {scholarship.deadline}</span>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isSearched && searchCollege && (
          <div className="text-center py-16">
            <Search className="h-20 w-20 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground mb-2">
              Enter a college name to search for scholarships
            </p>
            <p className="text-sm text-muted-foreground">
              We'll show you all available scholarships from that institution
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scholarships;