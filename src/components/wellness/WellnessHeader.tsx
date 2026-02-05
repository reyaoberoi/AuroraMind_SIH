import { Bell, Settings, User, UsersRound, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const WellnessHeader = () => {
  const [theme, setTheme] = useState<'light'|'dark'>(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') as 'light'|'dark'|null : null;
    if (stored) return stored;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });
  useEffect(()=>{
    document.documentElement.classList.toggle('dark', theme==='dark');
    try { localStorage.setItem('theme', theme); } catch {}
  },[theme]);
  return (
    <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Good evening, from AuroraMind
        </h1>
        <p className="text-muted-foreground text-sm">
          Your journey to inner light continues. How are you feeling today?
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative hover:text-neon-purple">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-neon-pink text-neon-pink-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
            2
          </span>
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-neon-purple" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">
          {theme==='dark' ? <Sun className="h-5 w-5"/> : <Moon className="h-5 w-5"/>}
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-neon-purple" asChild>
          <a href="/community" aria-label="Community">
            <UsersRound className="h-5 w-5" />
          </a>
        </Button>
        
        <Button variant="ghost" size="icon" className="hover:text-neon-purple">
          <Settings className="h-5 w-5" />
        </Button>
        
        <Avatar className="h-9 w-9 border border-neon-purple/30">
          <AvatarImage src="/placeholder.svg" alt="Alex" />
          <AvatarFallback className="bg-neon-purple/20 text-neon-purple">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};