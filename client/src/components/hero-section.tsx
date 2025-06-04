import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import type { MetricsUpdate } from "@shared/schema";

interface HeroSectionProps {
  metrics?: MetricsUpdate;
  isLoading: boolean;
}

export default function HeroSection({ metrics, isLoading }: HeroSectionProps) {
  const defaultMetrics = {
    activeUsers: 24000,
    projectsCreated: 15000,
    karmaPoints: 2800000,
  };

  const displayMetrics = metrics || defaultMetrics;

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            India's <span className="gradient-text">AI-Powered</span> Digital Nervous System
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Experience the future of culturally-conscious AI development. Build, deploy, and scale solutions 
            that understand India's diverse landscape through vernacular architecture and community-driven algorithms.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button className="interactive-button text-lg px-8 py-4">
              <i className="fas fa-rocket mr-2"></i>
              Start Building
            </Button>
            <Button 
              variant="outline" 
              className="glass-morphism px-8 py-4 text-lg hover:bg-white hover:bg-opacity-20 transition-all duration-300"
            >
              <i className="fas fa-play mr-2"></i>
              Watch Demo
            </Button>
          </div>

          {/* Real-time metrics display */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <motion.div 
              className="metric-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl font-bold text-[hsl(var(--cyber-cyan))]">
                {isLoading ? (
                  <div className="loading-pulse">Loading...</div>
                ) : (
                  `${(displayMetrics.activeUsers / 1000).toFixed(0)}K+`
                )}
              </div>
              <div className="text-sm text-gray-400">Active Developers</div>
            </motion.div>
            
            <motion.div 
              className="metric-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl font-bold text-[hsl(var(--royal-purple))]">
                {isLoading ? (
                  <div className="loading-pulse">Loading...</div>
                ) : (
                  `${(displayMetrics.projectsCreated / 1000).toFixed(0)}K+`
                )}
              </div>
              <div className="text-sm text-gray-400">Projects Created</div>
            </motion.div>
            
            <motion.div 
              className="metric-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-2xl font-bold text-[hsl(var(--vibrant-orange))]">
                {isLoading ? (
                  <div className="loading-pulse">Loading...</div>
                ) : (
                  `${(displayMetrics.karmaPoints / 1000000).toFixed(1)}M`
                )}
              </div>
              <div className="text-sm text-gray-400">Karma Points</div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="relative float-animation"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Futuristic holographic interface mockup */}
          <div className="holographic-card rounded-2xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Futuristic AI interface" 
              className="w-full h-auto" 
            />
            
            {/* Floating UI elements */}
            <motion.div 
              className="absolute top-4 right-4 glass-morphism p-3 rounded-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <i className="fas fa-brain text-[hsl(var(--cyber-cyan))] text-xl mr-2"></i>
              <span className="text-sm font-semibold">Jarvis-For-Bharat Online</span>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-4 left-4 glass-morphism p-3 rounded-lg"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">22 Regional Models Active</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
