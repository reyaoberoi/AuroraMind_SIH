import { WellnessCard } from "./WellnessCard";
import { Video, Phone, Shield, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props = { className?: string };

export const BookSessionCard = ({ className }: Props) => {
  const floatingDecor = useMemo(
    () => (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-6 -left-6 h-40 w-40 rounded-full bg-neon-teal/20 blur-3xl animate-pulse" />
        <div className="absolute -bottom-8 -right-10 h-52 w-52 rounded-full bg-neon-purple/20 blur-3xl animate-pulse" style={{ animationDelay: "1.2s" }} />
      </div>
    ),
    []
  );
  return (
    <WellnessCard glowColor="cyan" className={cn("relative col-span-2 bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md", className)}>
      {floatingDecor}
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Shield className="h-5 w-5 text-neon-cyan" />
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          Book Confidential Session
          <Sparkles className="h-4 w-4 text-neon-purple" />
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 relative z-10">
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 border-neon-teal/30 hover:bg-neon-teal/10 hover:border-neon-teal"
        >
          <Video className="h-6 w-6 text-neon-teal" />
          <span className="text-sm font-medium">Video Call</span>
          <span className="text-xs text-muted-foreground">Available now</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 border-neon-blue/30 hover:bg-neon-blue/10 hover:border-neon-blue"
        >
          <Phone className="h-6 w-6 text-neon-blue" />
          <span className="text-sm font-medium">Phone Call</span>
          <span className="text-xs text-muted-foreground">Next: 15 min</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 border-neon-purple/30 hover:bg-neon-purple/10 hover:border-neon-purple"
        >
          <span className="h-6 w-6 rounded-full bg-neon-purple/40" />
          <span className="text-sm font-medium">Chat Session</span>
          <span className="text-xs text-muted-foreground">Text-based support</span>
        </Button>
        <Button 
          variant="outline" 
          className="h-auto p-4 flex flex-col items-center gap-2 border-neon-cyan/30 hover:bg-neon-cyan/10 hover:border-neon-cyan"
        >
          <span className="h-6 w-6 rounded-full bg-neon-cyan/40" />
          <span className="text-sm font-medium">In‑person</span>
          <span className="text-xs text-muted-foreground">Nearby clinics</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-muted-foreground relative z-10">
        <Clock className="h-4 w-4" />
        <span>End-to-end encrypted • Anonymous • HIPAA compliant</span>
      </div>
    </WellnessCard>
  );
};