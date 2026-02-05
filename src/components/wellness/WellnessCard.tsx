import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface WellnessCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "purple" | "teal" | "blue" | "pink" | "cyan";
}

export const WellnessCard = ({ children, className, glowColor }: WellnessCardProps) => {
  const glowClasses = {
    purple: "shadow-neon-purple border-neon-purple/30 hover:shadow-neon-purple",
    teal: "shadow-neon-teal border-neon-teal/30 hover:shadow-neon-teal",
    blue: "shadow-neon-blue border-neon-blue/30 hover:shadow-neon-blue",
    pink: "shadow-neon-pink border-neon-pink/30 hover:shadow-neon-pink",
    cyan: "shadow-neon-cyan border-neon-cyan/30 hover:shadow-neon-cyan",
  };

  return (
    <div className={cn(
      "bg-card-gradient backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
      glowColor ? glowClasses[glowColor] : "border-border shadow-card",
      className
    )}>
      {children}
    </div>
  );
};