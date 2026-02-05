import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// NOTE: This utility file (`utils.ts`) and `ai.ts` seem to have been merged.
// For clarity, I'm keeping the AI-related functions in a file named `ai.ts`.

function getKeys(): { geminiKey: string; openaiKey: string; hfKey: string } {
  const envGemini = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  const envOpenAI = (import.meta as any).env?.VITE_OPENAI_API_KEY || "";
  const envHF = (import.meta as any).env?.VITE_HF_API_KEY || "";
  const lsGemini = typeof localStorage !== 'undefined' ? localStorage.getItem('GEMINI_API_KEY') || '' : '';
  const ssGemini = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('GEMINI_API_KEY') || '' : '';
  const lsOpenAI = typeof localStorage !== 'undefined' ? localStorage.getItem('OPENAI_API_KEY') || '' : '';
  const ssOpenAI = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('OPENAI_API_KEY') || '' : '';
  const lsHF = typeof localStorage !== 'undefined' ? localStorage.getItem('HUGGINGFACE_API_KEY') || '' : '';
  const ssHF = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('HUGGINGFACE_API_KEY') || '' : '';
  return { 
    geminiKey: envGemini || lsGemini || ssGemini, 
    openaiKey: envOpenAI || lsOpenAI || ssOpenAI, 
    hfKey: envHF || lsHF || ssHF 
  };
}

export function setGeminiApiKey(key: string) {
  try { localStorage.setItem('GEMINI_API_KEY', key); } catch {}
}

export function setOpenAiApiKey(key: string) {
  try { localStorage.setItem('OPENAI_API_KEY', key); } catch {}
}

export function setHuggingFaceApiKey(key: string) {
  try { localStorage.setItem('HUGGINGFACE_API_KEY', key); } catch {}
}

export async function generateText(systemPrompt: string, userPrompt: string): Promise<string> {
  const { geminiKey, openaiKey, hfKey } = getKeys();

  // Prefer HuggingFace if configured
  if (hfKey && /^hf_/.test(hfKey)) {
    const model = (import.meta as any).env?.VITE_HF_MODEL || 'google/gemma-2-9b-it';
    const url = `https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`;
    const payload = {
      inputs: `${systemPrompt}\n\nUser: ${userPrompt}\nAssistant:`,
      parameters: {
        max_new_tokens: 256,
        temperature: 0.7,
        return_full_text: false
      }
    } as const;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${hfKey}` },
      body: JSON.stringify(payload)
    });
    const raw = await res.text();
    if (!res.ok) {
      let reason = raw; try { const j = JSON.parse(raw); reason = j?.error || raw; } catch {}
      throw new Error(reason || `HF request failed (${res.status})`);
    }
    let data: any = {}; try { data = JSON.parse(raw); } catch {}
    // HF text-generation returns array of objects with generated_text
    const text = Array.isArray(data) ? (data[0]?.generated_text || '') : (data?.generated_text || '');
    if (!text) throw new Error('AI returned no content.');
    return text;
  }

  // If an OpenAI-style key is present, use OpenAI Chat Completions
  if (openaiKey && /^sk-/.test(openaiKey)) {
    const url = 'https://api.openai.com/v1/chat/completions';
    const body = {
      model: (import.meta as any).env?.VITE_OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    } as const;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${openaiKey}` },
      body: JSON.stringify(body)
    });
    const raw = await res.text();
    if (!res.ok) {
      let reason = raw; try { const j = JSON.parse(raw); reason = j?.error?.message || raw; } catch {}
      throw new Error(reason || `AI request failed (${res.status})`);
    }
    let data: any = {}; try { data = JSON.parse(raw); } catch {}
    const text = data?.choices?.[0]?.message?.content || '';
    if (!text) throw new Error('AI returned no content.');
    return text;
  }

  // Fallback to Gemini
  const API_KEY = geminiKey;
  if (!API_KEY) {
    throw new Error("Missing API key. Add VITE_GEMINI_API_KEY or VITE_OPENAI_API_KEY in .env, or save a key in the chat.");
  }
  
  const base = `https://generativelanguage.googleapis.com/v1beta/models`;
  const modelPrimary = 'gemini-1.5-flash-latest';
  const modelFallback = 'gemini-1.5-flash';
  const urlPrimary = `${base}/${modelPrimary}:generateContent?key=${encodeURIComponent(API_KEY)}`;
  const urlFallback = `${base}/${modelFallback}:generateContent?key=${encodeURIComponent(API_KEY)}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { text: systemPrompt + "\n\n" + userPrompt }
        ]
      }
    ]
  } as const;

  let res = await fetch(urlPrimary, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  let raw = await res.text();
  if (!res.ok) {
    // Try fallback model version
    res = await fetch(urlFallback, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    raw = await res.text();
    if (!res.ok) {
      let reason2 = raw;
      try { const j = JSON.parse(raw); reason2 = j?.error?.message || raw; } catch {}
      throw new Error(reason2 || `AI request failed (${res.status})`);
    }
  }

  let data: any = {};
  try { data = JSON.parse(raw); } catch {}

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  if (!text) {
    throw new Error("AI returned no content. Check your API key and quota.");
  }

  return text;
}