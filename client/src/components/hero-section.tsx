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
          className="text-center lg:text-left relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Floating particles background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() > 0.5 ? 20 : -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
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
              className="metric-card relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="text-2xl font-bold text-[hsl(var(--cyber-cyan))]"
                  animate={isLoading ? {} : { 
                    textShadow: ['0 0 10px rgba(79, 209, 197, 0.5)', '0 0 20px rgba(79, 209, 197, 0.8)', '0 0 10px rgba(79, 209, 197, 0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {isLoading ? (
                    <motion.div 
                      className="loading-pulse"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Loading...
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      {`${(displayMetrics.activeUsers / 1000).toFixed(0)}K+`}
                    </motion.span>
                  )}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">Active Developers</div>
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 1 }}
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="metric-card relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="text-2xl font-bold text-[hsl(var(--royal-purple))]"
                  animate={isLoading ? {} : { 
                    textShadow: ['0 0 10px rgba(168, 85, 247, 0.5)', '0 0 20px rgba(168, 85, 247, 0.8)', '0 0 10px rgba(168, 85, 247, 0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {isLoading ? (
                    <motion.div 
                      className="loading-pulse"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    >
                      Loading...
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1 }}
                    >
                      {`${(displayMetrics.projectsCreated / 1000).toFixed(0)}K+`}
                    </motion.span>
                  )}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">Projects Created</div>
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 1.2 }}
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="metric-card relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 3,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="text-2xl font-bold text-[hsl(var(--vibrant-orange))]"
                  animate={isLoading ? {} : { 
                    textShadow: ['0 0 10px rgba(251, 146, 60, 0.5)', '0 0 20px rgba(251, 146, 60, 0.8)', '0 0 10px rgba(251, 146, 60, 0.5)']
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {isLoading ? (
                    <motion.div 
                      className="loading-pulse"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                    >
                      Loading...
                    </motion.div>
                  ) : (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                    >
                      {`${(displayMetrics.karmaPoints / 1000000).toFixed(1)}M`}
                    </motion.span>
                  )}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">Karma Points</div>
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.2, delay: 1.4 }}
                />
              </div>
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
