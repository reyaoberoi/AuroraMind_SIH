import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardCard } from "./DashboardCard";

export const CalendarWidget = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
  const days = [];
  
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <DashboardCard className="col-span-1">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground">Calendar</h3>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mb-3">
          <div className="font-medium text-foreground">
            {monthNames[currentMonth]} {currentYear}
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground p-1">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={`
                text-center text-sm p-1 rounded cursor-pointer transition-colors
                ${day === null ? '' : 'hover:bg-muted'}
                ${day === currentDate ? 'bg-medical-blue text-medical-blue-foreground font-semibold' : ''}
                ${day !== null && day !== currentDate ? 'text-foreground' : ''}
              `}
            >
              {day}
            </div>
          ))}
        </div>
        
        <Button className="w-full mt-4 bg-medical-purple text-medical-purple-foreground hover:bg-medical-purple/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
    </DashboardCard>
  );
};