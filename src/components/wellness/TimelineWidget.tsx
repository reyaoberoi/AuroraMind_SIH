import { WellnessCard } from "./WellnessCard";
import { Clock, Video, Brain, Users, Activity } from "lucide-react";

const events = [
  { time: "18:30", title: "AI Check-in", icon: Brain, color: "text-neon-purple" },
  { time: "19:00", title: "Group Therapy", icon: Users, color: "text-neon-teal" },
  { time: "20:15", title: "Mindfulness Session", icon: Activity, color: "text-neon-blue" },
  { time: "21:00", title: "Video Call - Dr. Sarah", icon: Video, color: "text-neon-pink" },
];

export const TimelineWidget = () => {
  return (
    <WellnessCard glowColor="blue" className="h-fit">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-neon-blue" />
        <h3 className="text-lg font-semibold text-foreground">Today's Timeline</h3>
      </div>
      
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-card flex items-center justify-center border border-border/50">
                <event.icon className={`h-4 w-4 ${event.color}`} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </WellnessCard>
  );
};