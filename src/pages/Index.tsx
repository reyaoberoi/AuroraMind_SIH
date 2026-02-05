import { WellnessSidebar } from "@/components/wellness/WellnessSidebar";
import { WellnessHeader } from "@/components/wellness/WellnessHeader";
import { StatsCard } from "@/components/wellness/StatsCard";
import { BookSessionCard } from "@/components/wellness/BookSessionCard";
import { ResourceHubCard } from "@/components/wellness/ResourceHubCard";
import { TimelineWidget } from "@/components/wellness/TimelineWidget";
import { AnimatedBackground } from "@/components/wellness/AnimatedBackground";
import { CounselorsList } from "@/components/wellness/CounselorsList";
// removed CalendarPreview
// Chat preview remains disabled; re-enable floating chatbot dock
// import { ChatbotPreview } from "@/components/wellness/ChatbotPreview";
import { ChatbotDock } from "@/components/wellness/ChatbotDock";
import { MotionStory } from "@/components/wellness/MotionStory";
import BreathingCoach from "@/components/wellness/BreathingCoach";
import QuickActions from "@/components/wellness/QuickActions";
import JournalQuick from "@/components/wellness/JournalQuick";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-bg-gradient relative overflow-hidden">
      <AnimatedBackground />
      <ChatbotDock />
      
      {/* Left Sidebar */}
      <WellnessSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <WellnessHeader />
        
        {/* Dashboard Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Stats Row (4 equal cards across) */}
            <div className="col-span-12 grid grid-cols-12 gap-6">
              <div className="col-span-12 md:col-span-3"><StatsCard title="AI Sessions" value={12} change="+3 this week" glowColor="purple" type="ai" /></div>
              <div className="col-span-12 md:col-span-3"><StatsCard title="Wellness Score" value="85%" change="+12% this month" glowColor="teal" type="score" /></div>
              <div className="col-span-12 md:col-span-3"><StatsCard title="Resources Used" value={47} change="+8 this week" glowColor="blue" type="resources" /></div>
              <div className="col-span-12 md:col-span-3"><StatsCard title="Peer Connections" value={23} change="+5 new" glowColor="pink" type="connections" /></div>
            </div>

            {/* Row 1 */}
            <div className="col-span-12 md:col-span-8"><BookSessionCard className="col-span-12" /></div>
            <div className="col-span-12 md:col-span-4"><BreathingCoach /></div>

            {/* Row 2 */}
            <div className="col-span-12 md:col-span-8"><ResourceHubCard /></div>
            <div className="col-span-12 md:col-span-4"><CounselorsList /></div>

            {/* Row 3 */}
            <div className="col-span-12 md:col-span-4"><MotionStory /></div>
            <div className="col-span-12 md:col-span-4"><JournalQuick /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
