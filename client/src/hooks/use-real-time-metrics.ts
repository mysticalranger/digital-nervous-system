import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWebSocket } from "./use-websocket";
import type { MetricsUpdate } from "@shared/schema";

export function useRealTimeMetrics() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get real-time updates from WebSocket
  const { metrics: realtimeMetrics, isConnected } = useWebSocket();
  
  // Fetch initial metrics from API
  const { 
    data: initialMetrics, 
    error: apiError, 
    isLoading: apiLoading 
  } = useQuery({
    queryKey: ["/api/metrics"],
    refetchInterval: 30000, // Fallback polling every 30 seconds
    retry: 3,
  });

  // Combined metrics - prefer real-time over API data
  const metrics = realtimeMetrics || initialMetrics;

  // Update loading state
  useEffect(() => {
    if (realtimeMetrics || initialMetrics || apiError) {
      setIsLoading(false);
    } else if (apiLoading) {
      setIsLoading(true);
    }
  }, [realtimeMetrics, initialMetrics, apiError, apiLoading]);

  // Handle errors
  useEffect(() => {
    if (apiError) {
      setError("Failed to fetch metrics");
    } else {
      setError(null);
    }
  }, [apiError]);

  // Simulate metrics updates when not connected (fallback)
  const [simulatedMetrics, setSimulatedMetrics] = useState<MetricsUpdate | null>(null);

  useEffect(() => {
    if (!isConnected && !realtimeMetrics && !apiLoading) {
      const interval = setInterval(() => {
        setSimulatedMetrics(prev => {
          const base = initialMetrics || {
            activeUsers: 24000,
            projectsCreated: 15000,
            karmaPoints: 2800000,
            regionalImpact: 18,
            aiAccuracy: 94,
            timestamp: new Date().toISOString()
          };

          return {
            ...base,
            activeUsers: base.activeUsers + Math.floor(Math.random() * 10),
            projectsCreated: base.projectsCreated + Math.floor(Math.random() * 5),
            karmaPoints: base.karmaPoints + Math.floor(Math.random() * 100),
            timestamp: new Date().toISOString()
          };
        });
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isConnected, realtimeMetrics, apiLoading, initialMetrics]);

  // Final metrics selection with fallback chain
  const finalMetrics = metrics || simulatedMetrics || {
    activeUsers: 24000,
    projectsCreated: 15000,
    karmaPoints: 2800000,
    regionalImpact: 18,
    aiAccuracy: 94,
    timestamp: new Date().toISOString()
  };

  // Utility functions for metrics formatting
  const formatMetrics = useCallback((metrics: MetricsUpdate) => {
    return {
      ...metrics,
      formattedActiveUsers: `${(metrics.activeUsers / 1000).toFixed(0)}K+`,
      formattedProjectsCreated: `${(metrics.projectsCreated / 1000).toFixed(0)}K+`,
      formattedKarmaPoints: `${(metrics.karmaPoints / 1000000).toFixed(1)}M`,
      formattedRegionalImpact: `${metrics.regionalImpact}`,
      formattedAiAccuracy: `${metrics.aiAccuracy}%`
    };
  }, []);

  // Performance indicators
  const getPerformanceIndicators = useCallback((current: MetricsUpdate, previous?: MetricsUpdate) => {
    if (!previous) return null;

    return {
      activeUsersChange: current.activeUsers - previous.activeUsers,
      projectsChange: current.projectsCreated - previous.projectsCreated,
      karmaChange: current.karmaPoints - previous.karmaPoints,
      accuracyChange: current.aiAccuracy - previous.aiAccuracy
    };
  }, []);

  // Health status based on metrics
  const getHealthStatus = useCallback((metrics: MetricsUpdate) => {
    const now = new Date();
    const metricsTime = new Date(metrics.timestamp);
    const ageInMinutes = (now.getTime() - metricsTime.getTime()) / (1000 * 60);

    if (ageInMinutes > 10) return "stale";
    if (metrics.aiAccuracy < 90) return "warning";
    if (!isConnected) return "offline";
    return "healthy";
  }, [isConnected]);

  return {
    metrics: finalMetrics,
    formattedMetrics: formatMetrics(finalMetrics),
    isLoading: isLoading && !finalMetrics,
    error,
    isConnected,
    healthStatus: getHealthStatus(finalMetrics),
    getPerformanceIndicators,
    
    // Additional utility methods
    refreshMetrics: () => {
      // This would trigger a manual refresh if needed
      window.location.reload();
    },
    
    // Real-time status indicators
    isRealTime: !!realtimeMetrics,
    lastUpdated: finalMetrics.timestamp,
    dataSource: realtimeMetrics ? 'websocket' : initialMetrics ? 'api' : 'fallback'
  };
}

// Hook for specific metric tracking
export function useMetricTracker(metricName: keyof MetricsUpdate) {
  const { metrics, isLoading } = useRealTimeMetrics();
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    if (metrics && !isLoading) {
      const value = metrics[metricName] as number;
      if (typeof value === 'number') {
        setHistory(prev => [...prev.slice(-20), value]); // Keep last 20 values
      }
    }
  }, [metrics, metricName, isLoading]);

  const trend = history.length >= 2 ? 
    (history[history.length - 1] > history[history.length - 2] ? 'up' : 'down') : 
    'stable';

  return {
    currentValue: metrics ? metrics[metricName] : null,
    history,
    trend,
    isLoading
  };
}

// Hook for metrics comparison
export function useMetricsComparison(timeframe: 'hour' | 'day' | 'week' = 'day') {
  const { metrics } = useRealTimeMetrics();
  const [baseline, setBaseline] = useState<MetricsUpdate | null>(null);

  useEffect(() => {
    // In a real implementation, this would fetch historical data
    // For now, we'll simulate baseline metrics
    if (metrics && !baseline) {
      const multiplier = timeframe === 'hour' ? 0.95 : timeframe === 'day' ? 0.85 : 0.7;
      setBaseline({
        ...metrics,
        activeUsers: Math.floor(metrics.activeUsers * multiplier),
        projectsCreated: Math.floor(metrics.projectsCreated * multiplier),
        karmaPoints: Math.floor(metrics.karmaPoints * multiplier),
        aiAccuracy: Math.max(85, metrics.aiAccuracy - 5),
        timestamp: new Date(Date.now() - (timeframe === 'hour' ? 3600000 : timeframe === 'day' ? 86400000 : 604800000)).toISOString()
      });
    }
  }, [metrics, baseline, timeframe]);

  const comparison = metrics && baseline ? {
    activeUsersGrowth: ((metrics.activeUsers - baseline.activeUsers) / baseline.activeUsers * 100),
    projectsGrowth: ((metrics.projectsCreated - baseline.projectsCreated) / baseline.projectsCreated * 100),
    karmaGrowth: ((metrics.karmaPoints - baseline.karmaPoints) / baseline.karmaPoints * 100),
    accuracyChange: (metrics.aiAccuracy - baseline.aiAccuracy)
  } : null;

  return {
    current: metrics,
    baseline,
    comparison,
    timeframe
  };
}
