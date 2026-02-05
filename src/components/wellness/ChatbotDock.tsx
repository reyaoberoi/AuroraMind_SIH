import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Mic, MicOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ChatbotDock = () => {
  const [open, setOpen] = useState(true);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<{from:'ai'|'me'; text:string}>>([
    { from: 'ai', text: 'Hey! I\'m here to help. How are you feeling today?' }
  ]);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SR: any = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const r = new SR();
      r.lang = 'en-US';
      r.continuous = false;
      r.interimResults = false;
      r.onresult = (e: any) => {
        const transcript = e.results[0][0].transcript;
        setText((prev) => (prev ? prev + ' ' : '') + transcript);
      };
      r.onend = () => setListening(false);
      recognitionRef.current = r;
    }
  }, []);

  const toggleMic = () => {
    const r = recognitionRef.current;
    if (!r) return;
    if (listening) {
      r.stop();
      setListening(false);
    } else {
      try { r.start(); setListening(true); } catch {}
    }
  };

  return (
    <div className="fixed right-6 bottom-6 z-40">
      {!open && (
        <Button onClick={()=>setOpen(true)} className="rounded-full h-16 w-16 shadow-2xl bg-gradient-to-br from-neon-purple to-neon-teal hover:opacity-90">
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      {open && (
        <Card className="w-[360px] h-[500px] shadow-2xl rounded-3xl overflow-hidden bg-white">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="font-semibold">Supportive AI</div>
            <Button size="icon" variant="ghost" onClick={()=>setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 space-y-2 h-[360px] overflow-y-auto bg-gradient-to-b from-white to-purple-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`${m.from==='ai'?'self-start bg-purple-50':'self-end bg-purple-100'} max-w-[80%] p-2 rounded-lg text-sm`}>{m.text}</div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <Button size="icon" variant={listening? 'default':'outline'} onClick={toggleMic} className="rounded-full">
              {listening ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Type or speak..." />
            <Button onClick={()=>{ if(!text) return; setMessages([...messages,{from:'me',text}]); setText(""); }}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};


