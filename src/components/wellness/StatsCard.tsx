import { WellnessCard } from "./WellnessCard";
import { Brain, TrendingUp, BookOpen, Users } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  glowColor: "purple" | "teal" | "blue" | "pink";
  type: "ai" | "score" | "resources" | "connections";
}

export const StatsCard = ({ title, value, change, glowColor, type }: StatsCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "ai":
        return <Brain className="h-6 w-6 text-neon-purple" />;
      case "score":
        return <TrendingUp className="h-6 w-6 text-neon-teal" />;
      case "resources":
        return <BookOpen className="h-6 w-6 text-neon-blue" />;
      case "connections":
        return <Users className="h-6 w-6 text-neon-pink" />;
    }
  };

  return (
    <WellnessCard glowColor={glowColor} className="col-span-1">
      <div className="flex items-center justify-between mb-3">
        {getIcon()}
        <span className="text-xs text-muted-foreground">{change}</span>
      </div>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-bold text-foreground">{value}</p>
      </div>
    </WellnessCard>
  );
};