import { Users, TrendingUp, UserPlus } from "lucide-react";
import { DashboardCard } from "./DashboardCard";

export const PatientsCard = () => {
  return (
    <DashboardCard gradient="yellow" className="col-span-1">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-medical-yellow-foreground">Patients</h3>
          <p className="text-medical-yellow-foreground/70 text-sm">Total registered</p>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
          <Users className="h-6 w-6 text-medical-yellow-foreground" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-3xl font-bold text-medical-yellow-foreground">1,247</div>
          <div className="flex items-center gap-2 text-sm text-medical-yellow-foreground/80">
            <TrendingUp className="h-4 w-4" />
            <span>+12% from last month</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <UserPlus className="h-4 w-4 text-medical-yellow-foreground" />
            <span className="text-sm text-medical-yellow-foreground/80">New this week: 23</span>
          </div>
        </div>
      </div>
    </DashboardCard>
  );
};