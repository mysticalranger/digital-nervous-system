import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import AiDashboard from "@/components/ai-dashboard";
import CommunitySection from "@/components/community-section";
import Footer from "@/components/footer";
import { useWebSocket } from "@/hooks/use-websocket";
import { useRealTimeMetrics } from "@/hooks/use-real-time-metrics";

export default function Dashboard() {
  // Initialize WebSocket connection for real-time updates
  useWebSocket();
  
  // Initialize real-time metrics
  const { metrics, isLoading } = useRealTimeMetrics();

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection metrics={metrics} isLoading={isLoading} />
      <FeaturesSection />
      <AiDashboard />
      <CommunitySection />
      <Footer />
    </div>
  );
}
