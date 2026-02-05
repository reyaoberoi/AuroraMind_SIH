import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Counselor = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  slots: string[];
};

const COUNSELORS: Counselor[] = [
  { id: 1, name: "Dr. Meera Sharma", specialty: "Anxiety, Stress", rating: 4.8, slots: ["Mon 10:00", "Wed 14:00", "Fri 11:30"] },
  { id: 2, name: "Dr. Arjun Rao", specialty: "Depression, Sleep", rating: 4.7, slots: ["Tue 16:00", "Thu 09:30"] },
  { id: 3, name: "Ms. Nisha Patel", specialty: "Relationship, Adjustment", rating: 4.6, slots: ["Daily 18:00 (online)"] },
];

export const CounselorsList = () => {
  const [selected, setSelected] = useState<Counselor | null>(null);

  return (
    <Card className="p-4 bg-card/50 border-border/50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Counselors</h3>
        <Button variant="ghost" size="sm" asChild>
          <a href="/counselling">See all</a>
        </Button>
      </div>
      <div className="space-y-3">
        {COUNSELORS.map((c) => (
          <div key={c.id} className="flex items-center justify-between">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.specialty} · ⭐ {c.rating}</div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" onClick={() => setSelected(c)}>Details</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selected?.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Specialty: {selected?.specialty}</p>
                  <p className="text-sm">Available slots:</p>
                  <div className="flex flex-wrap gap-2">
                    {selected?.slots.map((s, idx) => (
                      <Button key={idx} variant="secondary" size="sm">{s}</Button>
                    ))}
                  </div>
                  <Button className="mt-2 w-full">Book session</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </Card>
  );
};


