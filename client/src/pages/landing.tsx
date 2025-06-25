// filepath: client/src/pages/landing.tsx
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import Footer from "@/components/footer";
import { useRealTimeMetrics } from "@/hooks/use-real-time-metrics";

export default function LandingPage() {
  const { metrics, isLoading } = useRealTimeMetrics(); // This can be removed if HeroSection no longer uses it or uses defaults.

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <HeroSection metrics={metrics} isLoading={isLoading} />
        {/* Quick Features Preview Section and other sections have been removed */}
      </main>
      <Footer />
    </div>
  );
}