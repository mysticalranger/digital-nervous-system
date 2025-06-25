// filepath: client/src/pages/features-page.tsx
import Navigation from "@/components/navigation";
import FeaturesSection from "@/components/features-section"; // Ensure this is the correct, lean component
import Footer from "@/components/footer";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow pt-20"> {/* Adjust pt-20 if nav height changes */}
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
}