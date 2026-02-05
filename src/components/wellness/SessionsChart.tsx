import { Card } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { day: "Mon", sessions: 1 },
  { day: "Tue", sessions: 2 },
  { day: "Wed", sessions: 1 },
  { day: "Thu", sessions: 3 },
  { day: "Fri", sessions: 2 },
  { day: "Sat", sessions: 1 },
  { day: "Sun", sessions: 2 },
];

const SessionsChart = () => (
  <Card className="p-4 bg-card/50 border-border/50">
    <div className="mb-2 font-semibold">Sessions This Week</div>
    <ChartContainer config={{ sessions: { label: "Sessions", color: "hsl(var(--chart-2))" } }} className="h-56">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sessions" fill="var(--color-sessions)" radius={[6,6,0,0]} />
      </BarChart>
    </ChartContainer>
  </Card>
);

export default SessionsChart;


