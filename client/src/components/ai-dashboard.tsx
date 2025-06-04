import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useRealTimeMetrics } from "@/hooks/use-real-time-metrics";

export default function AiDashboard() {
  const [projectDescription, setProjectDescription] = useState("");
  const [targetRegion, setTargetRegion] = useState("All India");
  const [aiComplexity, setAiComplexity] = useState("Basic NLP");
  const { toast } = useToast();
  const { metrics } = useRealTimeMetrics();

  // Fetch AI models
  const { data: aiModels } = useQuery({
    queryKey: ["/api/ai-models"],
  });

  // Project generation mutation
  const generateProjectMutation = useMutation({
    mutationFn: async (data: { description: string; targetRegion: string; aiComplexity: string }) => {
      const response = await apiRequest("POST", "/api/ai/generate-project", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Project Generated Successfully!",
        description: `${data.title} - Cultural Score: ${data.culturalScore}%`,
      });
    },
    onError: () => {
      toast({
        title: "Generation Failed",
        description: "Failed to generate project with AI",
        variant: "destructive",
      });
    },
  });

  const handleGenerate = () => {
    if (!projectDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide a project description",
        variant: "destructive",
      });
      return;
    }

    generateProjectMutation.mutate({
      description: projectDescription,
      targetRegion,
      aiComplexity,
    });
  };

  const regionalLanguages = [
    { name: "Hindi (हिंदी)", percentage: 34, color: "from-[hsl(var(--cyber-cyan))] to-[hsl(var(--royal-purple))]" },
    { name: "English", percentage: 28, color: "from-[hsl(var(--vibrant-orange))] to-yellow-400" },
    { name: "Tamil (தமிழ்)", percentage: 18, color: "from-green-400 to-cyan-400" },
    { name: "Telugu (తెలుగు)", percentage: 12, color: "from-[hsl(var(--royal-purple))] to-pink-400" },
    { name: "Bengali (বাংলা)", percentage: 8, color: "from-blue-400 to-[hsl(var(--cyber-cyan))]" },
  ];

  return (
    <section id="dashboard" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-5xl font-bold mb-6">
            Real-Time <span className="gradient-text">Intelligence Dashboard</span>
          </h3>
          <p className="text-xl text-gray-300">
            Monitor your AI ecosystem's performance with culturally-aware analytics
          </p>
        </motion.div>

        {/* Main Dashboard Interface */}
        <motion.div 
          className="holographic-card p-8 rounded-2xl mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h4 className="text-2xl font-bold mb-2">Welcome back, Developer</h4>
              <p className="text-gray-400">
                Your digital swadeshi impact: 
                <span className="text-[hsl(var(--cyber-cyan))] font-semibold ml-1">
                  {metrics?.aiAccuracy || 94}% engagement
                </span>
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="glass-morphism hover:bg-white hover:bg-opacity-20">
                <i className="fas fa-download mr-2"></i>Export Data
              </Button>
              <Button className="interactive-button">
                <i className="fas fa-plus mr-2"></i>New Project
              </Button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            <motion.div 
              className="dashboard-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ 
                scale: 1.03,
                rotateY: 2,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-lg font-semibold">Active Projects</h5>
                <i className="fas fa-project-diagram text-[hsl(var(--cyber-cyan))]"></i>
              </div>
              <div className="text-3xl font-bold text-[hsl(var(--cyber-cyan))] mb-2">
                {metrics?.projectsCreated ? Math.floor(metrics.projectsCreated / 1000) : 12}
              </div>
              <div className="text-sm text-green-400">+23% from last month</div>
            </motion.div>
            
            <motion.div 
              className="dashboard-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-lg font-semibold">Karma Score</h5>
                <i className="fas fa-star text-[hsl(var(--royal-purple))]"></i>
              </div>
              <div className="text-3xl font-bold text-[hsl(var(--royal-purple))] mb-2">
                {metrics?.karmaPoints ? Math.floor(metrics.karmaPoints / 1000) : 8942}
              </div>
              <div className="text-sm text-green-400">+15% this week</div>
            </motion.div>
            
            <motion.div 
              className="dashboard-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-lg font-semibold">Regional Impact</h5>
                <i className="fas fa-globe-asia text-[hsl(var(--vibrant-orange))]"></i>
              </div>
              <div className="text-3xl font-bold text-[hsl(var(--vibrant-orange))] mb-2">
                {metrics?.regionalImpact || 18}
              </div>
              <div className="text-sm text-gray-400">states reached</div>
            </motion.div>
            
            <motion.div 
              className="dashboard-card"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h5 className="text-lg font-semibold">Community Rank</h5>
                <i className="fas fa-trophy text-yellow-400"></i>
              </div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">#47</div>
              <div className="text-sm text-green-400">↑12 positions</div>
            </motion.div>
          </div>

          {/* Interactive Charts Area */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Model Performance Chart */}
            <Card className="glass-morphism border-[hsl(var(--border))]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-chart-line text-[hsl(var(--cyber-cyan))] mr-3"></i>
                  AI Model Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400" 
                  alt="Interactive data visualization dashboard" 
                  className="rounded-lg w-full h-48 object-cover mb-4" 
                />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Accuracy: <span className="text-green-400 font-semibold">{metrics?.aiAccuracy || 97}%</span>
                  </span>
                  <span className="text-gray-400">
                    Latency: <span className="text-blue-400 font-semibold">24ms</span>
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Regional Language Usage */}
            <Card className="glass-morphism border-[hsl(var(--border))]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <i className="fas fa-language text-[hsl(var(--royal-purple))] mr-3"></i>
                  Regional Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalLanguages.map((lang, index) => (
                    <motion.div 
                      key={lang.name}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{lang.name}</span>
                        <span className="font-semibold">{lang.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <motion.div 
                          className={`bg-gradient-to-r ${lang.color} h-2 rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Project Generation Interface */}
        <motion.div 
          className="holographic-card p-8 rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h4 className="text-2xl font-bold mb-6 flex items-center">
            <i className="fas fa-magic text-[hsl(var(--vibrant-orange))] mr-3"></i>
            AI Project Generator
          </h4>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Describe your vision</label>
                  <Textarea 
                    className="futuristic-input resize-none" 
                    rows={4} 
                    placeholder="e.g., Create a rural education platform that adapts to local dialects and cultural contexts..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Region</label>
                    <Select value={targetRegion} onValueChange={setTargetRegion}>
                      <SelectTrigger className="futuristic-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <SelectItem value="All India">All India</SelectItem>
                        <SelectItem value="North India">North India</SelectItem>
                        <SelectItem value="South India">South India</SelectItem>
                        <SelectItem value="East India">East India</SelectItem>
                        <SelectItem value="West India">West India</SelectItem>
                        <SelectItem value="Northeast India">Northeast India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">AI Complexity</label>
                    <Select value={aiComplexity} onValueChange={setAiComplexity}>
                      <SelectTrigger className="futuristic-input">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                        <SelectItem value="Basic NLP">Basic NLP</SelectItem>
                        <SelectItem value="Advanced ML">Advanced ML</SelectItem>
                        <SelectItem value="Deep Learning">Deep Learning</SelectItem>
                        <SelectItem value="Neural Networks">Neural Networks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center space-y-4">
              <Button 
                className="interactive-button text-lg py-4"
                onClick={handleGenerate}
                disabled={generateProjectMutation.isPending}
              >
                {generateProjectMutation.isPending ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Generating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-robot mr-2"></i>
                    Generate with Jarvis
                  </>
                )}
              </Button>
              
              <div className="text-center text-sm text-gray-400">
                <i className="fas fa-clock mr-1"></i>
                Avg. generation time: 2.3 seconds
              </div>
              
              <div className="glass-morphism p-3 rounded-lg text-center">
                <div className="text-xs text-gray-400 mb-1">Cultural Context Score</div>
                <div className="text-lg font-bold text-green-400">96%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
