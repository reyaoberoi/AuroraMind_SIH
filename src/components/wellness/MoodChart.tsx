import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", mood: 62 },
  { day: "Tue", mood: 54 },
  { day: "Wed", mood: 71 },
  { day: "Thu", mood: 66 },
  { day: "Fri", mood: 78 },
  { day: "Sat", mood: 82 },
  { day: "Sun", mood: 74 },
];

export const MoodChart = () => {
  return (
    <Card className="p-4 bg-card/50 border-border/50">
      <div className="mb-2 font-semibold">Mood Tracker</div>
      <ChartContainer
        config={{ mood: { label: "Mood", color: "hsl(var(--chart-1))" } }}
        className="h-56"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis domain={[0, 100]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="mood" stroke="var(--color-mood)" strokeWidth={2} dot={false} />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </Card>
  );
};

export default MoodChart;


