import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { generateText, setGeminiApiKey, setOpenAiApiKey, setHuggingFaceApiKey } from "@/lib/ai";

const Chatbot = () => {
  const [messages, setMessages] = useState<Array<{role:'ai'|'user', text:string}>>([{ role:'ai', text:"Hi! I'm your supportive AI. How can I help you today?" }]);
  const [input, setInput] = useState("");
  const send = async () => {
    if(!input.trim()) return;
    const user = input.trim();
    setInput("");
    setMessages((m)=>[...m, {role:'user', text:user}]);
    try {
      if (/^AIza[0-9A-Za-z-_]{35}$/.test(user)) { setGeminiApiKey(user); setMessages((m)=>[...m, {role:'ai', text:'Gemini API key saved. Now ask me anything.'}]); return; }
      if (/^sk-/.test(user)) { setOpenAiApiKey(user); setMessages((m)=>[...m, {role:'ai', text:'OpenAI API key saved. Now ask me anything.'}]); return; }
      if (/^hf_/.test(user)) { setHuggingFaceApiKey(user); setMessages((m)=>[...m, {role:'ai', text:'HuggingFace API key saved. Now ask me anything.'}]); return; }
      const reply = await generateText("You are a kind, concise student support assistant.", user);
      setMessages((m)=>[...m, {role:'ai', text: reply || "I'm here for you."}]);
    } catch (e: any) {
      setMessages((m)=>[...m, {role:'ai', text: e?.message || "I'm having trouble connecting to AI right now."}]);
    }
  };

  const ideas = [
    "I’m overwhelmed by exam prep; plan a 7‑day study schedule.",
    "Pulled an all‑nighter; suggest a recovery plan and sleep tips.",
    "Anxious about viva/project reviews; calming steps please.",
    "Procrastinated all week; help with tiny wins today.",
    "Group project conflict; script to resolve it.",
    "Social media distraction; 14‑day detox plan.",
    "Homesick on campus; grounding routines.",
    "Failed a test; reframe and comeback plan.",
    "Placement season stress; daily prep + self‑care.",
  ];

  const [aiReady, setAiReady] = useState(false);
  useEffect(()=>{
    try {
      const env = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
      const ls = localStorage.getItem('GEMINI_API_KEY') || '';
      const ss = sessionStorage.getItem('GEMINI_API_KEY') || '';
      setAiReady(Boolean(env || ls || ss));
    } catch { setAiReady(false); }
  }, [messages]);

  return (
    <div className="flex min-h-screen bg-bg-gradient">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <div className="p-6 grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <Card className="p-4 h-[70vh] flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 text-sm">
                {messages.map((m, i)=> (
                  <div key={i} className={m.role==='ai'?"self-start max-w-[70%] bg-muted/40 p-3 rounded-lg":"self-end max-w-[70%] bg-neon-purple/20 border border-neon-purple/30 p-3 rounded-lg"}>{m.text}</div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <Input placeholder="Type a message..." value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ send(); } }} />
                <Button onClick={send}>Send</Button>
              </div>
            </Card>
          </div>
          <div className="col-span-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Prompt ideas</h3>
                <span className={aiReady?"text-xs rounded-full bg-emerald-100 text-emerald-700 px-2 py-0.5":"text-xs rounded-full bg-amber-100 text-amber-700 px-2 py-0.5"}>{aiReady?"AI Connected":"AI Not Connected"}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {ideas.map((t,i)=>(
                  <button key={i} onClick={()=>setInput(t)} className="text-xs rounded-full border border-border/50 px-3 py-1 bg-white/70 hover:bg-white">{t}</button>
                ))}
              </div>
              {!aiReady && (
                <div className="text-xs text-muted-foreground mt-3">Paste your API key into the chat box and press Send to save it for this browser.</div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;


