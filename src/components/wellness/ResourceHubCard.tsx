import { WellnessCard } from "./WellnessCard";
import { BookOpen, Headphones, Zap, Heart, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  { icon: Headphones, name: "Guided Meditation", duration: "10 min", color: "text-neon-purple" },
  { icon: Zap, name: "Breathing Exercise", duration: "5 min", color: "text-neon-teal" },
  { icon: Heart, name: "Stress Relief", duration: "15 min", color: "text-neon-pink" },
  { icon: Play, name: "Sleep Stories", duration: "20 min", color: "text-neon-blue" },
];

export const ResourceHubCard = () => {
  return (
    <WellnessCard glowColor="purple" className="col-span-2">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-5 w-5 text-neon-purple" />
        <h3 className="text-lg font-semibold text-foreground">Resource Hub</h3>
      </div>
      
      <div className="space-y-3">
        {resources.map((resource, index) => (
          <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-card/50 hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3">
              <resource.icon className={`h-5 w-5 ${resource.color}`} />
              <div>
                <p className="text-sm font-medium text-foreground">{resource.name}</p>
                <p className="text-xs text-muted-foreground">{resource.duration}</p>
              </div>
            </div>
            <Button size="sm" variant="ghost" className="text-neon-purple hover:text-neon-purple hover:bg-neon-purple/10">
              Start
            </Button>
          </div>
        ))}
      </div>
    </WellnessCard>
  );
};