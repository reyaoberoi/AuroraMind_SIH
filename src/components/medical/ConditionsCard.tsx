import { Heart, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

export const ConditionsCard = () => {
  const conditions = [
    { label: "Stable", count: 89, color: "status-stable", icon: CheckCircle2 },
    { label: "Fair", count: 23, color: "status-fair", icon: Heart },
    { label: "Critical", count: 5, color: "status-critical", icon: AlertTriangle },
  ];

  const total = conditions.reduce((sum, condition) => sum + condition.count, 0);

  return (
    <DashboardCard gradient="green" className="col-span-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-medical-green-foreground">By Condition</h3>
          <p className="text-medical-green-foreground/70 text-sm">Patient status</p>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
          <Heart className="h-6 w-6 text-medical-green-foreground" />
        </div>
      </div>
      
      <div className="space-y-3">
        {conditions.map((condition, index) => {
          const percentage = (condition.count / total) * 100;
          const IconComponent = condition.icon;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-medical-green-foreground" />
                  <span className="text-sm font-medium text-medical-green-foreground">
                    {condition.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-medical-green-foreground">
                  {condition.count}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white/60 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
};