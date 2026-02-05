import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export const CalendarPreview = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Card className="p-4 bg-card/50 border-border/50">
      <h3 className="font-semibold mb-3">Calendar</h3>
      <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
    </Card>
  );
};


