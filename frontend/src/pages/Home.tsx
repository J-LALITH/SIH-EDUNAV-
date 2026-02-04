import { Brain, Route, School, Bell } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import HerooSection from "@/components/HeroSection"

const Home = () => {
  const features = [
    {
      title: "Aptitude Assessment",
      description: "Discover your strengths and interests through our comprehensive aptitude tests",
      icon: Brain,
      href: "/aptitude",
    },
    {
      title: "Career Flow",
      description: "Explore detailed career pathways and understand your options step by step",
      icon: Route,
      href: "/career-flow",
    },
    {
      title: "Select College",
      description: "Find and compare government colleges based on your preferences and location",
      icon: School,
      href: "/colleges",
    },
    
  ];

  return (
    <div className="min-h-screen bg-background">
      
      {/* Main Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              Your Career Journey Starts Here
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
              Choose from our three core features to begin your personalized career discovery process.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                gradient={index === 1}
              />
            ))}
          </div>
           <HerooSection></HerooSection>
          {/* Updates Section */}
              <div className="text-center px-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="group w-90 sm:w-auto"
              onClick={() => window.location.href = '/updates'}
            >
              <Bell className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              View Latest Updates
            </Button>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 px-2">
              Stay updated with entrance exams, counseling schedules, and important notifications
            </p>
          </div>
      
        </div>
      </section>
    </div>
  );
};

export default Home;

