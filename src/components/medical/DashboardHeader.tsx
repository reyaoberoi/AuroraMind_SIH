import { Bell, Settings, User, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const DashboardHeader = () => {
  return (
    <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Good morning, Dr. Olivia
        </h1>
        <p className="text-muted-foreground text-sm">
          Here's what's happening with your patients today
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-medical-pink text-medical-pink-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href="/community" aria-label="Community">
            <UsersRound className="h-5 w-5" />
          </a>
        </Button>
        
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-9 w-9">
          <AvatarImage src="/placeholder.svg" alt="Dr. Olivia" />
          <AvatarFallback className="bg-medical-purple text-medical-purple-foreground">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};