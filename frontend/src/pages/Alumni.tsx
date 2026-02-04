import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkedinIcon, MapPin, Briefcase, GraduationCap, ExternalLink, Users } from "lucide-react";

const Alumni = () => {
  const [searchCollege, setSearchCollege] = useState("");
  const [alumniResults, setAlumniResults] = useState<any[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  // Mock alumni data
  const mockAlumni = [
    {
      id: 1,
      name: "Rajesh Kumar",
      graduationYear: "2018",
      degree: "B.Tech Computer Science",
      currentRole: "Senior Software Engineer",
      company: "Google",
      location: "Bangalore, India",
      linkedinUrl: "#",
      profileImage: "",
      experience: "5+ years"
    },
    {
      id: 2,
      name: "Priya Sharma",
      graduationYear: "2016", 
      degree: "B.Tech Electronics",
      currentRole: "Product Manager",
      company: "Microsoft",
      location: "Hyderabad, India",
      linkedinUrl: "#",
      profileImage: "",
      experience: "7+ years"
    },
    {
      id: 3,
      name: "Arjun Patel",
      graduationYear: "2019",
      degree: "B.Tech Mechanical",
      currentRole: "Design Engineer",
      company: "Tesla",
      location: "San Francisco, USA",
      linkedinUrl: "#",
      profileImage: "",
      experience: "4+ years"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      graduationYear: "2017",
      degree: "B.Com Finance",
      currentRole: "Investment Analyst",
      company: "Goldman Sachs",
      location: "Mumbai, India", 
      linkedinUrl: "#",
      profileImage: "",
      experience: "6+ years"
    }
  ];

  const handleSearch = () => {
    if (searchCollege.trim()) {
      setAlumniResults(mockAlumni);
      setIsSearched(true);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Users className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Alumni Network</h1>
          <p className="text-muted-foreground">Connect with alumni for guidance, mentorship, and career insights</p>
        </div>

        {/* Search Section */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Find Alumni</CardTitle>
            <CardDescription>Enter your college name to connect with alumni from your institution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                placeholder="Enter college name (e.g., IIT Madras, Anna University)"
                value={searchCollege}
                onChange={(e) => setSearchCollege(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} variant="feature">
                Search Alumni
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alumni Results */}
        {isSearched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Alumni from {searchCollege}
              </h2>
              <Badge variant="secondary" className="text-sm">
                {alumniResults.length} profiles found
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alumniResults.map((alumni) => (
                <Card key={alumni.id} className="shadow-card hover:shadow-elevated transition-smooth">
                  <CardHeader className="pb-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={alumni.profileImage} />
                        <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">
                          {getInitials(alumni.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-foreground truncate">
                          {alumni.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Class of {alumni.graduationYear}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {alumni.degree}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Briefcase className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm">
                            {alumni.currentRole}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {alumni.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          {alumni.location}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          {alumni.experience} experience
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => window.open(alumni.linkedinUrl, '_blank')}
                      >
                        <LinkedinIcon className="mr-2 h-4 w-4 text-blue-600" />
                        Connect on LinkedIn
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {alumniResults.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
                  No alumni profiles found for "{searchCollege}"
                </p>
                <p className="text-sm text-muted-foreground">
                  Try searching with a different college name or check the spelling
                </p>
              </div>
            )}
          </div>
        )}

        {!isSearched && (
          <div className="text-center py-16">
            <LinkedinIcon className="h-20 w-20 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground mb-2">
              Search for alumni from your college
            </p>
            <p className="text-sm text-muted-foreground">
              Enter your college name above to find and connect with alumni on LinkedIn
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alumni;