import { Heart, Thermometer, Activity, Clock } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const VisitDetails = () => {
  const vitals = [
    { label: "Blood Pressure", value: "120/80", icon: Heart, status: "normal" },
    { label: "Temperature", value: "98.6°F", icon: Thermometer, status: "normal" },
    { label: "Heart Rate", value: "72 bpm", icon: Activity, status: "normal" },
    { label: "Last Visit", value: "2 weeks ago", icon: Clock, status: "info" },
  ];

  return (
    <DashboardCard gradient="pink" className="col-span-1">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-medical-pink-foreground mb-3">Visit Details</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" alt="Michael Chen" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-medical-pink-foreground">Michael Chen</div>
            <div className="text-sm text-medical-pink-foreground/70">Video Call • 10:15 AM</div>
          </div>
        </div>
        
        <Badge className="bg-white/20 text-medical-pink-foreground hover:bg-white/30 mb-4">
          Hypertension Follow-up
        </Badge>
      </div>
      
      <div className="space-y-3">
        {vitals.map((vital, index) => {
          const IconComponent = vital.icon;
          
          return (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <IconComponent className="h-3 w-3 text-medical-pink-foreground" />
                </div>
                <span className="text-xs text-medical-pink-foreground/80">
                  {vital.label}
                </span>
              </div>
              <span className="text-xs font-medium text-medical-pink-foreground">
                {vital.value}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 pt-3 border-t border-white/20">
        <div className="text-xs text-medical-pink-foreground/80">
          <strong>Notes:</strong> Patient responding well to medication. 
          Continue current treatment plan.
        </div>
      </div>
    </DashboardCard>
  );
};