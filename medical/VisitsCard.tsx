import { Activity, Calendar } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

export const VisitsCard = () => {
  const chartData = [
    { time: "9:00", visits: 3 },
    { time: "10:00", visits: 7 },
    { time: "11:00", visits: 5 },
    { time: "12:00", visits: 9 },
    { time: "13:00", visits: 4 },
    { time: "14:00", visits: 8 },
    { time: "15:00", visits: 6 },
    { time: "16:00", visits: 10 },
  ];

  const maxVisits = Math.max(...chartData.map(d => d.visits));

  return (
    <DashboardCard gradient="pink" className="col-span-2">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-medical-pink-foreground">Visits Summary</h3>
          <p className="text-medical-pink-foreground/70 text-sm">Today's appointments</p>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
          <Activity className="h-6 w-6 text-medical-pink-foreground" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="text-2xl font-bold text-medical-pink-foreground">52 visits</div>
        
        <div className="h-24 flex items-end justify-between gap-2">
          {chartData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div 
                className="bg-white/30 rounded-t-md min-h-1 w-full transition-all duration-300 hover:bg-white/50"
                style={{ height: `${(data.visits / maxVisits) * 100}%` }}
              />
              <span className="text-xs text-medical-pink-foreground/80">{data.time}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 text-sm text-medical-pink-foreground/80">
          <Calendar className="h-4 w-4" />
          <span>Peak hours: 12:00 - 16:00</span>
        </div>
      </div>
    </DashboardCard>
  );
};