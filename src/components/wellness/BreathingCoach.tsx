import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const phases = [
  { label: "Inhale", seconds: 4 },
  { label: "Hold", seconds: 7 },
  { label: "Exhale", seconds: 8 },
];

const BreathingCoach = () => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(phases[0].seconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      setTimeLeft((t) => {
        if (t > 1) return t - 1;
        const next = (phaseIndex + 1) % phases.length;
        setPhaseIndex(next);
        return phases[next].seconds;
      });
    };
    intervalRef.current = window.setInterval(tick, 1000);
    speak(`${phases[phaseIndex].label}`);
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phaseIndex]);

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95; u.pitch = 1;
      window.speechSynthesis.speak(u);
    } catch {}
  };

  const toggle = () => setRunning((r) => !r);
  const reset = () => { setRunning(false); setPhaseIndex(0); setTimeLeft(phases[0].seconds); };

  return (
    <Card className="p-4 bg-card/50 border-border/50">
      <div className="flex items-center justify-between mb-3">
        <div className="font-semibold">Breathing Coach</div>
        <div className="text-xs text-muted-foreground">4-7-8 method</div>
      </div>
      <div className="h-36 flex flex-col items-center justify-center">
        <div className="text-3xl font-bold mb-1">{phases[phaseIndex].label}</div>
        <div className="text-5xl font-mono">{timeLeft}s</div>
      </div>
      <div className="flex gap-2">
        <Button onClick={toggle}>{running ? 'Pause' : 'Start'}</Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </div>
    </Card>
  );
};

export default BreathingCoach;


