import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient?: boolean;
}


// FeatureCard.jsx
const FeatureCard = ({ title, description, icon: Icon, href, gradient = false }: FeatureCardProps) => {
  return (
    <Card className={`group cursor-pointer transition-smooth hover:shadow-feature transform hover:scale-105 ${
      gradient ? 'bg-gradient-subtle border border-border' : ''
    }`}>
      <CardHeader className="text-center pb-4">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
          gradient ? 'bg-gradient-primary' : 'bg-primary'
        }`}>
          <Icon className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        <CardDescription className="text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Button 
          variant="feature" 
          size="lg" 
          className="w-full"
          onClick={() => window.location.href = href}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;