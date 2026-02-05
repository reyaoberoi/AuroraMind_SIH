import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Sparkles, Languages } from "lucide-react";
import { generateText } from "@/lib/ai";

const AIStudio = () => {
  const [listening, setListening] = useState(false);
  const [journal, setJournal] = useState("");
  const [language, setLanguage] = useState<string>('en-US');
  const [ideas] = useState<string[]>([
    'Summarize my week and suggest 3 habits to try',
    'Create an affirmation set for study stress',
    'Turn my journal into an action plan for tomorrow',
  ]);
  const [sentiment, setSentiment] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const r = new SR();
      r.lang = language;
      r.continuous = false;
      r.interimResults = false;
      r.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setJournal((prev) => (prev ? prev + ' ' : '') + transcript);
      };
      r.onend = () => setListening(false);
      recognitionRef.current = r;
    }
  }, [language]);

  const toggleMic = () => {
    const r = recognitionRef.current;
    if (!r) return;
    if (listening) { r.stop(); setListening(false); } else { try { r.start(); setListening(true); } catch {} }
  };

  // tiny heuristic sentiment
  const analyze = () => {
    const text = journal.toLowerCase();
    const pos = ['good','great','calm','proud','relaxed','happy'];
    const neg = ['sad','anxious','angry','tired','worried','stress'];
    let score = 0;
    pos.forEach(w=>{ if(text.includes(w)) score++; });
    neg.forEach(w=>{ if(text.includes(w)) score--; });
    setSentiment(score > 0 ? 'Positive' : score < 0 ? 'Negative' : 'Neutral');
  };

  return (
    <div className="flex min-h-screen bg-bg-gradient">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <div className="p-6 grid grid-cols-12 gap-6">
          <Card className="col-span-12 md:col-span-7 p-4 bg-card/50 border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="font-semibold flex items-center gap-2"><Sparkles className="h-4 w-4 text-neon-purple"/> Voice Journal</div>
              <div className="flex items-center gap-2">
                <select
                  aria-label="Language"
                  value={language}
                  onChange={(e)=>setLanguage(e.target.value)}
                  className="h-9 rounded-md border border-border/50 bg-white/80 px-2 text-sm"
                >
                  <option value="en-US">English</option>
                  <option value="hi-IN">Hindi</option>
                  <option value="ur-PK">Urdu</option>
                  <option value="mr-IN">Marathi</option>
                  <option value="bn-IN">Bengali</option>
                  <option value="kn-IN">Kannada</option>
                  <option value="ta-IN">Tamil</option>
                  <option value="te-IN">Telugu</option>
                  <option value="gu-IN">Gujarati</option>
                  <option value="ml-IN">Malayalam</option>
                </select>
                <Button size="icon" variant={listening? 'default':'outline'} onClick={toggleMic} className="rounded-full" aria-label="Toggle microphone">
                {listening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <textarea value={journal} onChange={(e)=>setJournal(e.target.value)} className="w-full h-64 rounded-md border border-border/50 bg-white/60 p-3" placeholder="Speak or type your thoughts..."/>
            <div className="mt-3 flex gap-2">
              <Button onClick={analyze}>Analyze Sentiment</Button>
              <Button variant="secondary" onClick={async()=>{
                try {
                  const text = await generateText('Rewrite user text as encouraging, specific action steps.', journal || 'I feel stressed about exams');
                  setJournal((prev)=> (prev? prev+"\n\n":"") + text);
                } catch (e:any) {
                  setJournal((prev)=> (prev? prev+"\n\n":"") + (e?.message || 'AI error'));
                }
              }}>AI Coach</Button>
              <div className="ml-auto flex flex-wrap gap-2">
                {ideas.map((t,i)=>(<button key={i} onClick={()=>setJournal((p)=> (p? p+"\n\n":"")+t)} className="text-xs rounded-full border border-border/50 px-2 py-1 bg-white/70 hover:bg-white">{t}</button>))}
              </div>
              {sentiment && <div className="text-sm text-muted-foreground">Detected: <span className="font-medium">{sentiment}</span></div>}
            </div>
          </Card>

          <Card className="col-span-12 md:col-span-5 p-4 bg-card/50 border-border/50">
            <div className="font-semibold mb-3">Ideas</div>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
              <li>Auto-generate affirmations based on your journal</li>
              <li>One-click breathing coach with haptics</li>
              <li>Session summary and action items</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIStudio;


