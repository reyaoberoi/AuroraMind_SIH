import { 
  LayoutDashboard, 
  Brain, 
  Calendar, 
  BookOpen, 
  Users, 
  Activity, 
  BarChart3, 
  Shield, 
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const menuItems = [
  { icon: LayoutDashboard, label: "Homepage", to: "/" },
  { icon: Activity, label: "Mood To Music", to: "/music" },
  { icon: Users, label: "Care Connect", to: "/counselling" },
  { icon: Brain, label: "Rant It Out", to: "/chatbot" },
  { icon: BookOpen, label: "Blog", to: "/blog" },
  // Calendar removed
  // { icon: Calendar, label: "Calendar", to: "/calendar" },
  { icon: Brain, label: "Aura Sense", to: "/ai" },
  { icon: Users, label: "Community", to: "/community" },
  { icon: BarChart3, label: "Admin Analytics", to: "/admin" },
  { icon: Shield, label: "Privacy Center", to: "/" },
  // Settings temporarily disabled (removed secondary login page)
  { icon: Settings, label: "Settings", to: "/settings" },
];

export const WellnessSidebar = () => {
  const location = useLocation();
  const hiddenOnPaths = ["/login"];
  if (hiddenOnPaths.includes(location.pathname)) return null;
  return (
    <div className="bg-sidebar-dark text-sidebar-dark-foreground w-64 min-h-screen p-6 border-r border-border/50">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neon-purple">AuroraMind</h2>
        <p className="text-xs text-sidebar-dark-foreground/70">Your inner light</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <NavLink key={index} to={item.to} className={({ isActive }) => cn("block", isActive && "") }>
            {({ isActive }) => (
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 text-sidebar-dark-foreground hover:bg-sidebar-item-hover hover:text-neon-purple transition-all duration-200",
                  isActive && "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};