import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  BarChart3, 
  GraduationCap, 
  FileText, 
  MessageCircle, 
  CreditCard, 
  FolderOpen, 
  Settings, 
  LogOut 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/hooks/auth";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Calendar, label: "Schedule" },
  { icon: Users, label: "Patients" },
  { icon: BarChart3, label: "Statistics & Reports" },
  { icon: GraduationCap, label: "Education" },
  { icon: FileText, label: "My Articles" },
  { icon: MessageCircle, label: "Chats & Calls" },
  { icon: CreditCard, label: "Billing" },
  { icon: FolderOpen, label: "Documents Base" },
  { icon: Settings, label: "Settings" },
];

export const Sidebar = () => {
  const { logout } = useAuth();
  return (
    <div className="bg-sidebar-dark text-sidebar-dark-foreground w-64 min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-medical-blue">MedCare</h2>
        <p className="text-xs text-sidebar-dark-foreground/70">Dashboard</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <NavLink key={index} to="/" className={({ isActive }) => cn("block") }>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3 text-sidebar-dark-foreground hover:bg-sidebar-item-hover hover:text-sidebar-dark-foreground",
                item.active && "bg-medical-blue text-medical-blue-foreground hover:bg-medical-blue/90"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          </NavLink>
        ))}
      </nav>
      
      <div className="mt-auto pt-8">
        <Button
          onClick={logout}
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-dark-foreground hover:bg-sidebar-item-hover hover:text-sidebar-dark-foreground"
        >
          <LogOut className="h-5 w-5" />
          Log out
        </Button>
      </div>
    </div>
  );
};