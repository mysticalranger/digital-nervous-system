import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Navigation() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    // Add language change effect
    document.body.style.opacity = "0.8";
    setTimeout(() => {
      document.body.style.opacity = "1";
      console.log("Language changed to:", value);
    }, 300);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-morphism">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--vibrant-orange))] to-[hsl(var(--cyber-cyan))] rounded-lg flex items-center justify-center">
              <i className="fas fa-brain text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold gradient-text">Digital Swameshtra</h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("features")}
              className="hover:text-[hsl(var(--cyber-cyan))] transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("dashboard")}
              className="hover:text-[hsl(var(--cyber-cyan))] transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection("community")}
              className="hover:text-[hsl(var(--cyber-cyan))] transition-colors"
            >
              Community
            </button>
            <button 
              onClick={() => scrollToSection("contact")}
              className="hover:text-[hsl(var(--cyber-cyan))] transition-colors"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="bg-white bg-opacity-5 border border-white border-opacity-20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--cyber-cyan))]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
                <SelectItem value="ta">தமிழ்</SelectItem>
                <SelectItem value="te">తెలుగు</SelectItem>
                <SelectItem value="bn">বাংলা</SelectItem>
              </SelectContent>
            </Select>
            <Button className="interactive-button pulse-glow">
              Join Ecosystem
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
