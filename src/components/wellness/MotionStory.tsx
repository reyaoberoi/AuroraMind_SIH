import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const steps = [
  { title: "Breathe", text: "Try a quick 4-7-8 calming breath.", color: "from-purple-200 to-pink-200" },
  { title: "Reflect", text: "Name one thought and let it pass.", color: "from-teal-200 to-cyan-200" },
  { title: "Act", text: "Pick one small action for today.", color: "from-blue-200 to-indigo-200" },
];

export const MotionStory = () => {
  const [index, setIndex] = useState(0);
  const s = steps[index];
  const next = () => setIndex((i)=> (i+1)%steps.length);
  const prev = () => setIndex((i)=> (i-1+steps.length)%steps.length);

  return (
    <Card className="col-span-4 overflow-hidden p-0">
      <div className={`h-40 md:h-48 w-full bg-gradient-to-r ${s.color} transition-all duration-500`} />
      <div className="p-5 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">AuroraMind Story</div>
          <h3 className="text-xl font-semibold">{s.title}</h3>
          <p className="text-sm text-muted-foreground">{s.text}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={prev}>Back</Button>
          <Button onClick={next}>Next</Button>
        </div>
      </div>
    </Card>
  );
};


