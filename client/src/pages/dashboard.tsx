import Navigation from "@/components/navigation";
import AiDashboard from "@/components/ai-dashboard";
import Footer from "@/components/footer";
import { useWebSocket } from "@/hooks/use-websocket";

export default function Dashboard() {
  useWebSocket();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20">
        {/* ONLY include AiDashboard, not all the other sections */}
        <AiDashboard />
      </main>
      <Footer />
    </div>
  );
}
