import { useQuery } from "@tanstack/react-query";

interface Metrics {
  activeUsers: number;
  projectsToday: number;
  totalUsers: number;
  totalProjects: number;
  aiAccuracy?: number;
  karmaPoints?: number;
  projectsCreated?: number;
}

export function useRealTimeMetrics() {
  const { data: metrics, isLoading, error } = useQuery({
    queryKey: ["/api/metrics"],
    queryFn: async () => {
      const response = await fetch("/api/metrics");
      if (!response.ok) {
        throw new Error("Failed to fetch metrics");
      }
      return response.json();
    },
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
    staleTime: 1000, // Consider data stale after 1 second
  });

  // Provide default values if data is not available
  const defaultMetrics: Metrics = {
    activeUsers: 0,
    projectsToday: 0,
    totalUsers: 0,
    totalProjects: 0,
    aiAccuracy: 94,
    karmaPoints: 0,
    projectsCreated: 0,
  };

  return {
    metrics: metrics || defaultMetrics,
    isLoading,
    error,
  };
}

// Export for backwards compatibility
export { useRealTimeMetrics as useRealtimeMetrics };
