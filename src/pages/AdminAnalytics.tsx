import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, BarChart, Bar } from "recharts";

const userData = [
  { t: '10:00', active: 12 }, { t: '10:05', active: 18 }, { t: '10:10', active: 22 }, { t: '10:15', active: 15 },
  { t: '10:20', active: 28 }, { t: '10:25', active: 25 }, { t: '10:30', active: 31 },
];

const sessionsByType = [
  { name: 'AI Studio', count: 120 },
  { name: 'Chatbot', count: 240 },
  { name: 'Care Connect', count: 80 },
  { name: 'Music', count: 160 },
];

const AdminAnalytics = () => {
  return (
    <div className="flex min-h-screen bg-bg-gradient">
      <WellnessSidebar />
      <div className="flex-1 flex flex-col">
        <WellnessHeader />
        <div className="p-6 grid grid-cols-12 gap-6">
          <Card className="col-span-12 lg:col-span-8 p-4 bg-card/50 border-border/50 flex flex-col">
            <div className="font-semibold mb-2">Active Users (Realtime)</div>
            <ChartContainer config={{ active: { label: 'Active', color: 'hsl(270 80% 50%)' } }} className="h-72">
              <LineChart data={userData}>
                <XAxis dataKey="t" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="active" stroke="var(--color-active)" strokeWidth={2} dot={false} />
              </LineChart>
            </ChartContainer>
          </Card>

          <Card className="col-span-12 lg:col-span-4 p-4 bg-card/50 border-border/50 flex flex-col">
            <div className="font-semibold mb-2">Sessions by Feature</div>
            <ChartContainer config={{ count: { label: 'Count', color: 'hsl(160 80% 45%)' } }} className="h-72">
              <BarChart data={sessionsByType}>
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="var(--color-count)" />
              </BarChart>
            </ChartContainer>
          </Card>

          <Card className="col-span-12 p-4 bg-card/50 border-border/50">
            <div className="font-semibold mb-2">Notes</div>
            <div className="text-sm text-muted-foreground">This is a demo with mocked data. Hook to your analytics source or websockets for true realtime.</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;


