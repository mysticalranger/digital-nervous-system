import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "./ui/button";

// Check that these Link components have the correct behavior
// For example, fix the NavLink component:
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <Link href={href}>
      <span className={`cursor-pointer hover:text-[hsl(var(--cyber-cyan))] transition-colors ${
        isActive ? "text-[hsl(var(--cyber-cyan))] font-semibold" : ""
      }`}>
        {children}
      </span>
    </Link>
  );
};

export default function Navigation() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isScrolled, setIsScrolled] = useState(false);
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    queryClient.clear();
    navigate('/auth', { replace: true });
  };

  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4 bg-[hsl(var(--dark-navy))] bg-opacity-80 backdrop-blur-lg shadow-xl" : "py-6 bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center space-x-3 cursor-pointer">
            {/* Assuming a Logo or Brand name might go here */}
            <img src="/placeholder-logo.svg" alt="Logo" className="h-8 w-auto" /> 
            <span className="text-xl font-bold gradient-text">Digital Swameshtra</span>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/features">Features</NavLink>
          {isAuthenticated && <NavLink href="/dashboard">Dashboard</NavLink>}
          {isAuthenticated && <NavLink href="/analytics">Analytics</NavLink>}
          {isAuthenticated && <NavLink href="/gamification">Rewards</NavLink>}
          {isAuthenticated && <NavLink href="/voice-assistant">Voice AI</NavLink>}
          {isAuthenticated && <NavLink href="/cultural-pulse">Live Pulse</NavLink>}
          {isAuthenticated && <NavLink href="/payment">Credits</NavLink>}
          {isAuthenticated && <NavLink href="/community">Community</NavLink>}
          <NavLink href="/contact">Contact</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="futuristic-input text-sm h-10 w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
            </SelectContent>
          </Select>
          {isAuthenticated ? (
            <Button variant="outline" onClick={handleLogout} className="futuristic-button border-[hsl(var(--cyber-cyan))] hover:bg-[hsl(var(--cyber-cyan))] hover:text-black">
              Logout
            </Button>
          ) : (
            <Link href="/auth">
              <Button className="futuristic-button bg-gradient-to-r from-[hsl(var(--cyber-cyan))] to-[hsl(var(--royal-purple))] hover:opacity-90">
                Login / Register
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
