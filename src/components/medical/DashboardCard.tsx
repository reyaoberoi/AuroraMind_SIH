import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: ReactNode;
  className?: string;
  gradient?: "yellow" | "pink" | "green" | "blue" | "purple";
}

export const DashboardCard = ({ children, className, gradient }: DashboardCardProps) => {
  const gradientClasses = {
    yellow: "bg-gradient-yellow",
    pink: "bg-gradient-pink", 
    green: "bg-gradient-green",
    blue: "bg-gradient-blue",
    purple: "bg-gradient-purple",
  };

  return (
    <div className={cn(
      "rounded-xl p-6 shadow-card transition-all duration-300 hover:shadow-soft hover:scale-[1.02]",
      gradient ? gradientClasses[gradient] : "bg-card",
      className
    )}>
      {children}
    </div>
  );
};