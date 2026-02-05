import { Clock, User, Video, MessageCircle } from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    type: "Clinic Visit",
    time: "09:30 AM",
    status: "Waiting",
    avatar: "/placeholder.svg",
    condition: "stable"
  },
  {
    id: 2,
    name: "Michael Chen",
    type: "Video Call",
    time: "10:15 AM", 
    status: "In Progress",
    avatar: "/placeholder.svg",
    condition: "fair"
  },
  {
    id: 3,
    name: "Emily Davis",
    type: "Chat",
    time: "11:00 AM",
    status: "Scheduled",
    avatar: "/placeholder.svg",
    condition: "stable"
  },
  {
    id: 4,
    name: "Robert Wilson",
    type: "Clinic Visit",
    time: "11:45 AM",
    status: "Scheduled",
    avatar: "/placeholder.svg",
    condition: "critical"
  },
  {
    id: 5,
    name: "Lisa Anderson",
    type: "Video Call",
    time: "02:30 PM",
    status: "Scheduled",
    avatar: "/placeholder.svg",
    condition: "stable"
  },
];

const getVisitIcon = (type: string) => {
  switch (type) {
    case "Video Call":
      return Video;
    case "Chat":
      return MessageCircle;
    default:
      return User;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "In Progress":
      return "bg-medical-green text-medical-green-foreground";
    case "Waiting":
      return "bg-medical-yellow text-medical-yellow-foreground";
    default:
      return "bg-medical-blue text-medical-blue-foreground";
  }
};

const getConditionColor = (condition: string) => {
  switch (condition) {
    case "stable":
      return "bg-status-stable";
    case "fair":
      return "bg-status-fair";
    case "critical":
      return "bg-status-critical";
    default:
      return "bg-status-stable";
  }
};

export const PatientsList = () => {
  return (
    <DashboardCard className="col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Patient's List</h3>
        <div className="text-sm text-muted-foreground">Today, {new Date().toLocaleDateString()}</div>
      </div>
      
      <div className="space-y-3">
        {patients.map((patient) => {
          const VisitIcon = getVisitIcon(patient.type);
          
          return (
            <div 
              key={patient.id} 
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={patient.avatar} alt={patient.name} />
                    <AvatarFallback>
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getConditionColor(patient.condition)}`} />
                </div>
                
                <div>
                  <div className="font-medium text-foreground">{patient.name}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <VisitIcon className="h-3 w-3" />
                    <span>{patient.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(patient.status)}>
                  {patient.status}
                </Badge>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{patient.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardCard>
  );
};