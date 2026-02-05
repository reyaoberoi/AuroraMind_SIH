import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuickActions = () => (
  <Card className="p-4 bg-card/50 border-border/50">
    <div className="font-semibold mb-3">Quick Actions</div>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <Button asChild><a href="/counselling">Book Session</a></Button>
      <Button asChild variant="secondary"><a href="/music">Open Music</a></Button>
      <Button asChild variant="outline"><a href="/ai">AI Studio</a></Button>
      <Button asChild variant="ghost"><a href="/chatbot">Chatbot</a></Button>
      <Button asChild variant="outline"><a href="/blog">Resources</a></Button>
      <Button onClick={()=>{ localStorage.clear(); sessionStorage.clear(); location.reload(); }}>Logout</Button>
    </div>
  </Card>
);

export default QuickActions;


