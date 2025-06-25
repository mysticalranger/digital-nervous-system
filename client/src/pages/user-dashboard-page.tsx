// filepath: client/src/pages/user-dashboard-page.tsx
import Navigation from "@/components/navigation";
import AiDashboard from "@/components/ai-dashboard"; // Ensure this is the lean section component
import Footer from "@/components/footer";
import { useWebSocket } from "@/hooks/use-websocket";

export default function UserDashboardPage() {
  useWebSocket(); // If AiDashboard itself needs it

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20"> {/* Adjust pt-20 if nav height changes */}
        <AiDashboard />
      </main>
      <Footer />
    </div>
  );
}