import { Clock, Video, MessageSquare, Building } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

export const SessionsCard = () => {
  const sessions = [
    { type: "Clinic", duration: "4h 32m", icon: Building, color: "text-medical-blue-foreground" },
    { type: "Video Call", duration: "2h 18m", icon: Video, color: "text-medical-blue-foreground" },
    { type: "In-Chat", duration: "1h 45m", icon: MessageSquare, color: "text-medical-blue-foreground" },
  ];

  return (
    <DashboardCard gradient="blue" className="col-span-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-medical-blue-foreground">Sessions</h3>
          <p className="text-medical-blue-foreground/70 text-sm">Today's duration</p>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
          <Clock className="h-6 w-6 text-medical-blue-foreground" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="text-2xl font-bold text-medical-blue-foreground">8h 35m</div>
        
        <div className="space-y-3">
          {sessions.map((session, index) => {
            const IconComponent = session.icon;
            
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <IconComponent className={`h-4 w-4 ${session.color}`} />
                  </div>
                  <span className="text-sm font-medium text-medical-blue-foreground">
                    {session.type}
                  </span>
                </div>
                <span className="text-sm font-semibold text-medical-blue-foreground">
                  {session.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardCard>
  );
};