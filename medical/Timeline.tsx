import { Clock, User, Video, Coffee, Calendar } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

const timelineEvents = [
  {
    time: "09:30",
    title: "Sarah Johnson",
    type: "Clinic Visit",
    icon: User,
    status: "current"
  },
  {
    time: "10:15",
    title: "Michael Chen",
    type: "Video Call",
    icon: Video,
    status: "current"
  },
  {
    time: "11:00",
    title: "Coffee Break",
    type: "Break",
    icon: Coffee,
    status: "upcoming"
  },
  {
    time: "11:45",
    title: "Robert Wilson",
    type: "Clinic Visit", 
    icon: User,
    status: "upcoming"
  },
  {
    time: "14:30",
    title: "Lisa Anderson",
    type: "Video Call",
    icon: Video,
    status: "upcoming"
  },
  {
    time: "15:15",
    title: "Team Meeting",
    type: "Meeting",
    icon: Calendar,
    status: "upcoming"
  },
];

export const Timeline = () => {
  return (
    <DashboardCard className="col-span-1">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">Today's Timeline</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {timelineEvents.map((event, index) => {
          const IconComponent = event.icon;
          const isActive = event.status === "current";
          
          return (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`
                  p-2 rounded-lg transition-colors
                  ${isActive 
                    ? 'bg-medical-blue text-medical-blue-foreground' 
                    : 'bg-muted text-muted-foreground'
                  }
                `}>
                  <IconComponent className="h-4 w-4" />
                </div>
                {index < timelineEvents.length - 1 && (
                  <div className="w-px h-6 bg-border mt-2" />
                )}
              </div>
              
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`
                    text-sm font-medium
                    ${isActive ? 'text-foreground' : 'text-muted-foreground'}
                  `}>
                    {event.time}
                  </span>
                  {isActive && (
                    <div className="w-2 h-2 bg-medical-green rounded-full animate-pulse" />
                  )}
                </div>
                <div className={`
                  font-medium text-sm
                  ${isActive ? 'text-foreground' : 'text-muted-foreground'}
                `}>
                  {event.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {event.type}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
};