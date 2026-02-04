import { Button } from "@/components/ui/button";
import { ArrowRight, Bot } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import aiIcon from "@/assets/ai-icon.png";

const HerooSection = () => {
  return (
    <section className="relative ">
      
      
      


          {/* AI Assistant Badge */}
          <div className="fixed bottom-10 left-30 z-50">
            <div className="bg-card shadow-elevated rounded-full p-4 cursor-pointer hover:shadow-feature transition-smooth">
              <img src={aiIcon} alt="AI Assistant" className="h-12 w-12" />
            </div>
          </div>
       
      
    </section>
  );
};

export default HerooSection;