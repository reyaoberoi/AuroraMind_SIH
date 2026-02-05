import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const ChatbotPreview = () => {
  return (
    <Card className="p-4 bg-card/50 border-border/50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Chatbot</h3>
        <Button variant="ghost" size="sm" asChild>
          <a href="/chatbot">Open</a>
        </Button>
      </div>
      <div className="flex-1 space-y-2 text-sm">
        <div className="self-start max-w-[80%] bg-muted/40 p-3 rounded-lg">Need a quick grounding exercise?</div>
        <div className="self-end max-w-[80%] bg-neon-purple/20 text-foreground p-3 rounded-lg">Yes, please.</div>
        <div className="self-start max-w-[80%] bg-muted/40 p-3 rounded-lg">Try 4-7-8 breathing: inhale 4s, hold 7s, exhale 8s.</div>
      </div>
    </Card>
  );
};


