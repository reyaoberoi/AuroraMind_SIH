import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const JournalQuick = () => {
  const [text, setText] = useState("");
  const [sentiment, setSentiment] = useState<string | null>(null);

  const analyze = () => {
    const t = text.toLowerCase();
    const pos = ['good','great','calm','proud','relaxed','happy'];
    const neg = ['sad','anxious','angry','tired','worried','stress'];
    let score = 0; pos.forEach(w=>{ if(t.includes(w)) score++; }); neg.forEach(w=>{ if(t.includes(w)) score--; });
    setSentiment(score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral');
  };

  return (
    <Card className="p-4 bg-card/50 border-border/50">
      <div className="font-semibold mb-2">Quick Journal</div>
      <textarea value={text} onChange={(e)=>setText(e.target.value)} className="w-full h-28 rounded-md border border-border/50 bg-white/60 p-2" placeholder="How are you feeling right now?"/>
      <div className="mt-2 flex items-center gap-2">
        <Button onClick={analyze}>Analyze</Button>
        {sentiment && <span className="text-sm text-muted-foreground">{sentiment}</span>}
      </div>
    </Card>
  );
};

export default JournalQuick;


