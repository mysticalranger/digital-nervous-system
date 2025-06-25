// filepath: client/src/pages/community-page.tsx
import Navigation from "@/components/navigation";
import CommunitySection from "@/components/community-section"; // Ensure this is the lean section component
import Footer from "@/components/footer";
import { useWebSocket } from "@/hooks/use-websocket";

export default function CommunityPage() {
  useWebSocket(); // If CommunitySection itself needs it

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20"> {/* Adjust pt-20 if nav height changes */}
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}