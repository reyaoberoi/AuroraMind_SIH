import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { Card } from "@/components/ui/card";
import { useMemo, useState } from "react";

const Blog = () => {
  const [type, setType] = useState<'all'|'article'|'video'|'podcast'>('all');
  const [category, setCategory] = useState<'all'|'mindfulness'|'stress'|'sleep'|'study'>('all');
  const items = useMemo(()=>[
    { id: 1, title: 'Deep Breathing 101', type: 'article', category: 'mindfulness' },
    { id: 2, title: 'Study Burnout - What to do', type: 'video', category: 'stress' },
    { id: 3, title: 'Sleep Hygiene Basics', type: 'article', category: 'sleep' },
    { id: 4, title: 'Body Scan Meditation', type: 'podcast', category: 'mindfulness' },
  ],[]);
  const filtered = items.filter(i=> (type==='all'||i.type===type) && (category==='all'||i.category===category));

  return (
    <div className="flex min-h-screen bg-bg-gradient">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <div className="p-6">
          <div className="mb-4 flex flex-wrap gap-3">
            <select value={type} onChange={(e)=>setType(e.target.value as any)} className="h-9 rounded-md border border-border/50 bg-white/70 px-2 text-sm">
              <option value="all">All types</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="podcast">Podcasts</option>
            </select>
            <select value={category} onChange={(e)=>setCategory(e.target.value as any)} className="h-9 rounded-md border border-border/50 bg-white/70 px-2 text-sm">
              <option value="all">All categories</option>
              <option value="mindfulness">Mindfulness</option>
              <option value="stress">Stress</option>
              <option value="sleep">Sleep</option>
              <option value="study">Study</option>
            </select>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{item.type} • {item.category}</div>
                <h3 className="font-semibold mt-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">Short description about coping skills, mindfulness, or campus resources.</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;


