import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: "fas fa-robot",
    title: "Jarvis-For-Bharat",
    description: "Auto-generate India-first solutions using deep cultural context understanding and real-time regulatory intelligence across all 22 regional languages.",
    gradient: "from-[hsl(var(--vibrant-orange))] to-[hsl(var(--cyber-cyan))]",
    capabilities: [
      "22 Regional sentiment pattern analysis",
      "Predictive regulatory change detection",
      "UPI-first monetization strategies"
    ]
  },
  {
    icon: "fas fa-award",
    title: "Karma Engine",
    description: "Transform social impact into tangible rewards through dynamic difficulty adjustment and community-validated achievement protocols.",
    gradient: "from-[hsl(var(--royal-purple))] to-[hsl(var(--cyber-cyan))]",
    capabilities: [
      "Addiction-weighted achievement scaling",
      "Community validation consensus",
      "Festival-aware reward distribution"
    ]
  },
  {
    icon: "fas fa-language",
    title: "Multi-Lingual AI",
    description: "Deploy AI solutions in 22+ Indian languages with cultural context awareness and regional sentiment analysis.",
    gradient: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--royal-purple))]",
  },
  {
    icon: "fas fa-chart-line",
    title: "Real-Time Analytics",
    description: "Monitor your AI performance with live dashboards and predictive insights tailored for Indian markets.",
    gradient: "from-[hsl(var(--royal-purple))] to-[hsl(var(--vibrant-orange))]",
  },
  {
    icon: "fas fa-shield-alt",
    title: "Regulatory Compliance",
    description: "Built-in compliance with PDPL, GST, and RBI regulations. Auto-update with changing policies.",
    gradient: "from-[hsl(var(--vibrant-orange))] to-[hsl(var(--cyber-cyan))]",
  },
  {
    icon: "fas fa-mobile-alt",
    title: "UPI-First Integration",
    description: "Seamless payment integration with UPI, digital wallets, and regional banking systems.",
    gradient: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--royal-purple))]",
  }
];

const additionalFeatures = [
  {
    icon: "fas fa-language",
    title: "Vernacular Architecture",
    description: "Self-aware systems that adapt to regional linguistic patterns and cultural contexts"
  },
  {
    icon: "fas fa-users",
    title: "Community Symbiosis",
    description: "Algorithm-community integration that creates addictive, value-driven engagement loops"
  },
  {
    icon: "fas fa-sync-alt",
    title: "Self-Evolution",
    description: "Autonomous feature proposal and deployment using cultural entropy analysis"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl font-bold mb-6">
            Core <span className="gradient-text">Neural Components</span>
          </h3>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionary AI systems designed specifically for India's diverse technological and cultural landscape
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="holographic-card p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mr-4`}>
                      <i className={`${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <h4 className="text-2xl font-bold">{feature.title}</h4>
                  </div>
                  
                  <p className="text-gray-300 mb-6">
                    {feature.description}
                  </p>
                  
                  {feature.capabilities && (
                    <div className="space-y-3 mb-6">
                      {feature.capabilities.map((capability, idx) => (
                        <div key={idx} className="flex items-center text-sm">
                          <i className="fas fa-check-circle text-green-400 mr-3"></i>
                          <span>{capability}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {index === 0 && (
                    <div className="mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                        alt="Interactive dashboard with data visualization" 
                        className="w-full h-48 object-cover rounded-xl mb-6" 
                      />
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Regional Sentiment Analysis</span>
                          <div className="w-32 h-2 bg-gray-700 rounded-full">
                            <div className="progress-bar w-24 h-2 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">Regulatory Prediction</span>
                          <div className="w-32 h-2 bg-gray-700 rounded-full">
                            <div className="progress-bar w-28 h-2 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300">UPI Integration Score</span>
                          <div className="w-32 h-2 bg-gray-700 rounded-full">
                            <div className="progress-bar w-30 h-2 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                        alt="Modern collaborative tech workspace" 
                        className="w-full h-48 object-cover rounded-xl mb-6" 
                      />
                      <div className="bg-white bg-opacity-5 p-4 rounded-lg mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span>Current Karma Level</span>
                          <span className="text-[hsl(var(--royal-purple))] font-semibold">Level 7</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div className="progress-bar h-3 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button className={`w-full bg-gradient-to-r ${feature.gradient} py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}>
                    {index === 0 ? "Experience Jarvis Demo" : "View Karma Dashboard"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-morphism p-6 rounded-xl text-center hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <i className={`${feature.icon} text-4xl text-[hsl(var(--cyber-cyan))] mb-4`}></i>
              <h5 className="text-xl font-semibold mb-3">{feature.title}</h5>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {features.slice(2).map((feature, index) => (
            <motion.div
              key={feature.title}
              className="glass-morphism p-8 rounded-2xl hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                <i className={`${feature.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 mb-4">{feature.description}</p>
              <button className="text-[hsl(var(--cyber-cyan))] hover:text-[hsl(var(--royal-purple))] transition-colors">
                Learn More <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
