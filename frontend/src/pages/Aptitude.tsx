import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Brain, ArrowRight, CheckCircle } from "lucide-react";

const Aptitude = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What type of activities do you enjoy most?",
      options: [
        { value: "analytical", label: "Solving complex problems and analyzing data" },
        { value: "creative", label: "Creative writing, designing, and artistic activities" },
        { value: "people", label: "Working with people and helping others" },
        { value: "technical", label: "Building things and working with technology" }
      ]
    },
    {
      id: 2,
      question: "Which subject area interests you the most?",
      options: [
        { value: "science", label: "Science and Mathematics" },
        { value: "humanities", label: "Literature, History, and Social Sciences" },
        { value: "commerce", label: "Business, Economics, and Finance" },
        { value: "arts", label: "Fine Arts and Creative Studies" }
      ]
    },
    {
      id: 3,
      question: "What kind of work environment appeals to you?",
      options: [
        { value: "research", label: "Research labs and academic institutions" },
        { value: "corporate", label: "Corporate offices and business environments" },
        { value: "creative", label: "Studios, agencies, and creative spaces" },
        { value: "field", label: "Field work and hands-on environments" }
      ]
    },
    {
      id: 4,
      question: "Which skill do you feel strongest at?",
      options: [
        { value: "problem-solving", label: "Problem-solving and logical thinking" },
        { value: "communication", label: "Communication and empathy" },
        { value: "leadership", label: "Leadership and decision-making" },
        { value: "innovation", label: "Innovation and designing new ideas" }
      ]
    },
    {
      id: 5,
      question: "What motivates you the most in a career?",
      options: [
        { value: "discovery", label: "Discovering new knowledge and inventions" },
        { value: "impact", label: "Making a difference in people’s lives" },
        { value: "growth", label: "Business growth and financial success" },
        { value: "expression", label: "Expressing creativity and imagination" }
      ]
    }
  ];

  const recommendations = {
    btech: {
      stream: "B.Tech/B.E",
      description: "Your analytical mindset and technical interest make you well-suited for engineering.",
      careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Electrical Engineer"]
    },
    bsc: {
      stream: "B.Sc",
      description: "Your love for science and discovery makes you fit for pure sciences.",
      careers: ["Research Scientist", "Biologist", "Chemist", "Data Analyst"]
    },
    bcom: {
      stream: "B.Com",
      description: "Your business acumen points towards commerce streams.",
      careers: ["Accountant", "Financial Analyst", "Auditor", "Banking Professional"]
    },
    bba: {
      stream: "BBA",
      description: "Your leadership and management interests point to business administration.",
      careers: ["Business Manager", "Marketing Executive", "HR Specialist", "Entrepreneur"]
    },
    ba: {
      stream: "BA",
      description: "Your interest in people, society and culture makes humanities a good fit.",
      careers: ["Psychologist", "Journalist", "Teacher", "Social Worker"]
    },
    bfa: {
      stream: "BFA",
      description: "Your creativity and artistic talent suggest arts and design streams.",
      careers: ["Graphic Designer", "Animator", "Fashion Designer", "Interior Designer"]
    }
  };

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateResults = () => {
    // Track scores for each specific stream
    const scores = { btech: 0, bsc: 0, bcom: 0, bba: 0, ba: 0, bfa: 0 };

    Object.values(answers).forEach(answer => {
      // Science-related → B.Tech or B.Sc
      if (["analytical", "technical", "science", "problem-solving"].includes(answer)) {
        scores.btech++;
      }
      if (["research", "discovery"].includes(answer)) {
        scores.bsc++;
      }

      // Commerce-related → B.Com or BBA
      if (["commerce", "corporate"].includes(answer)) {
        scores.bcom++;
      }
      if (["leadership", "growth"].includes(answer)) {
        scores.bba++;
      }

      // Humanities → BA
      if (["people", "humanities", "field", "communication", "impact"].includes(answer)) {
        scores.ba++;
      }

      // Arts → BFA
      if (["creative", "arts", "innovation", "expression"].includes(answer)) {
        scores.bfa++;
      }
    });

    // Pick the highest scoring single stream
    const topStream = Object.entries(scores).reduce((a, b) =>
      a[1] >= b[1] ? a : b
    )[0];

    return recommendations[topStream as keyof typeof recommendations];
  };

  if (showResults) {
    const result = calculateResults();
    return (
      <div className="min-h-screen bg-gradient-subtle py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-feature">
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-3xl text-foreground">Your Aptitude Results</CardTitle>
              <CardDescription>Based on your responses, here's our recommendation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-gradient-primary rounded-lg text-primary-foreground">
                <h3 className="text-2xl font-bold mb-2">Recommended Stream</h3>
                <p className="text-3xl font-bold">{result.stream}</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-foreground">Why this stream?</h4>
                <p className="text-muted-foreground">{result.description}</p>
                
                <h4 className="text-xl font-semibold text-foreground">Potential Career Paths</h4>
                <div className="grid grid-cols-2 gap-3">
                  {result.careers.map((career, index) => (
                    <div key={index} className="bg-card p-3 rounded-lg border border-border">
                      <p className="font-medium text-foreground">{career}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                variant="hero" 
                size="lg" 
                className="w-full"
              >
                Explore Career Flow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Aptitude Assessment</h1>
          <p className="text-muted-foreground">Discover your strengths and find the perfect career path</p>
        </div>

        <Card className="shadow-feature">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Question {currentQuestion + 1} of {questions.length}</CardTitle>
              <span className="text-sm text-muted-foreground">
                {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
              </span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="w-full" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">
              {questions[currentQuestion].question}
            </h3>
            
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary transition-smooth">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-foreground cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button
              onClick={handleNext}
              disabled={!answers[currentQuestion]}
              variant="feature"
              size="lg"
              className="w-full"
            >
              {currentQuestion === questions.length - 1 ? "Get Results" : "Next Question"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Aptitude;
