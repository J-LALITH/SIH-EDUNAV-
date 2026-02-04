import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ArrowLeft } from "lucide-react";
import api from "../api/axios"; // ✅ central axios instance
import { Book,Stethoscope, BookOpen, Atom, Cpu, Briefcase, GraduationCap } from "lucide-react";


const ICONS = {
  Code: Cpu,
  Beaker: Atom,
  TrendingUp: Briefcase,
  medical:Stethoscope,
  book: BookOpen,
  default: Book, // fallback if not found
};


const CareerFlow = () => {
  const [streams, setStreams] = useState([]);
  const [selectedStream, setSelectedStream] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch streams with nested branches on mount
  useEffect(() => {
    api.get("/streams/")
      .then((res) => {
        console.log("Streams data:", res.data);
        setStreams(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching streams:", err);
        setError("Failed to load streams.");
        setLoading(false);
      });
  }, []);

  const streamBranches = selectedStream
    ? streams.find((s) => s.id === selectedStream)?.branches || []
    : [];

  const branchData = selectedBranch
    ? streamBranches.find((b) => b.id === selectedBranch)
    : null;

  const careerPath = branchData?.career_path || null;

  // Loading/Error states
  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Career Flowchart View
  if (selectedBranch && careerPath) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => setSelectedBranch(null)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Branches
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Career Flowchart</h1>
            <p className="text-muted-foreground font-bold">{branchData?.name}</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Subjects */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {careerPath.subjects?.map((s, idx) => (
                    <div key={idx} className="bg-gradient-subtle p-3 rounded-lg border border-border">
                      <p className="font-medium text-foreground">{s}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Careers */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-primary">Career Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Job Opportunities</h4>
                  {careerPath.jobs?.map((j, idx) => (
                    <p key={idx} className="text-muted-foreground">• {j}</p>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Higher Studies</h4>
                  {careerPath.higher_studies?.map((h, idx) => (
                    <p key={idx} className="text-muted-foreground">• {h}</p>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Entrepreneurship</h4>
                  {careerPath.entrepreneurship?.map((e, idx) => (
                    <p key={idx} className="text-muted-foreground">• {e}</p>
                  ))}
                </div>
                <div className="p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                  <h4 className="font-semibold mb-2">Placement Statistics</h4>
                  <p>{careerPath.placements}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Branches View
  if (selectedStream) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <Button variant="ghost" onClick={() => setSelectedStream(null)} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Streams
          </Button>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Program</h1>
            <p className="text-muted-foreground">Choose your specialization</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streamBranches.map((b) => (
              <Card
                key={b.id}
                className="cursor-pointer hover:shadow-feature transition-smooth transform hover:scale-105"
                onClick={() => setSelectedBranch(b.id)}
              >
                <CardHeader>
                  <CardTitle className="text-foreground">{b.name}</CardTitle>
                  <CardDescription>{b.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    View Career Path <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Streams View
  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground mb-4">Stream</h1>
          <p className="text-muted-foreground text-lg">Explore detailed career pathways</p>
        </div>
<div className="grid md:grid-cols-3 gap-8">
  {streams.map((stream) => {
    const IconComponent = ICONS[stream.icon] || ICONS.default;
    return (
      <Card
        key={stream.id}
        className="cursor-pointer hover:shadow-feature transition-smooth transform hover:scale-105"
        onClick={() => setSelectedStream(stream.id)}
      >
        <CardHeader className="text-center">
          <div
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${stream.color}`}
          >
            <IconComponent className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-xl text-foreground">{stream.name}</CardTitle>
          <CardDescription>{stream.description}</CardDescription>
        </CardHeader>
      </Card>
    );
  })}
</div>



      </div>
    </div>
  );
};

export default CareerFlow;

