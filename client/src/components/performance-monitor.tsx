import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  networkLatency: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
      
      // Memory usage (if available)
      const memoryUsage = (performance as any).memory ? 
        (performance as any).memory.usedJSHeapSize / 1024 / 1024 : 0;

      // Simple network latency test
      const start = performance.now();
      fetch('/api/metrics').then(() => {
        const networkLatency = performance.now() - start;
        
        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          memoryUsage: Math.round(memoryUsage * 100) / 100,
          networkLatency: Math.round(networkLatency)
        });
      });
    };

    measurePerformance();

    // Show performance monitor in development or with special key combination
    const showPerformanceMonitor = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', showPerformanceMonitor);
    return () => window.removeEventListener('keydown', showPerformanceMonitor);
  }, [isVisible]);

  if (!isVisible || !metrics) return null;

  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return 'text-green-400';
    if (value <= thresholds[1]) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-4 z-50 glass-morphism rounded-lg p-4 border border-cyan-500/20 text-xs"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-cyan-400">Performance Monitor</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        <div className={`flex justify-between ${getPerformanceColor(metrics.loadTime, [2000, 4000])}`}>
          <span>Load Time:</span>
          <span>{metrics.loadTime}ms</span>
        </div>
        <div className={`flex justify-between ${getPerformanceColor(metrics.renderTime, [100, 300])}`}>
          <span>Render Time:</span>
          <span>{metrics.renderTime}ms</span>
        </div>
        <div className={`flex justify-between ${getPerformanceColor(metrics.memoryUsage, [50, 100])}`}>
          <span>Memory:</span>
          <span>{metrics.memoryUsage}MB</span>
        </div>
        <div className={`flex justify-between ${getPerformanceColor(metrics.networkLatency, [200, 500])}`}>
          <span>Network:</span>
          <span>{metrics.networkLatency}ms</span>
        </div>
      </div>
      
      <div className="mt-2 text-gray-500 text-xs">
        Ctrl+Shift+P to toggle
      </div>
    </motion.div>
  );
}