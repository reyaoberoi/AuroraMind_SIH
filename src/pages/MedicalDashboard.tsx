import { Sidebar as MedicalSidebar } from "@/components/medical/Sidebar";
import { DashboardHeader } from "@/components/medical/DashboardHeader";
import { PatientsCard } from "@/components/medical/PatientsCard";
import { VisitsCard } from "@/components/medical/VisitsCard";
import { ConditionsCard } from "@/components/medical/ConditionsCard";
import { SessionsCard } from "@/components/medical/SessionsCard";
import { PatientsList } from "@/components/medical/PatientsList";
import { VisitDetails } from "@/components/medical/VisitDetails";
import { CalendarWidget as MedCalendar } from "@/components/medical/Calendar";
import { Timeline } from "@/components/medical/Timeline";

const MedicalDashboard = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <MedicalSidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="p-6 grid grid-cols-12 gap-6">
          {/* Stats row */}
          <div className="col-span-9 grid grid-cols-4 gap-6">
            <PatientsCard />
            <VisitsCard />
            <ConditionsCard />
            <SessionsCard />
          </div>
          <div className="col-span-3 space-y-6">
            <MedCalendar />
          </div>

          {/* List and details */}
          <div className="col-span-9 grid grid-cols-3 gap-6">
            <PatientsList />
            <VisitDetails />
          </div>

          {/* Timeline */}
          <div className="col-span-3">
            <Timeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalDashboard;


