import { useEffect, useState, useCallback } from "react";
import { wsManager } from "@/lib/websocket";
import type { MetricsUpdate, ActivityFeedItem, LeaderboardEntry } from "@shared/schema";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [metrics, setMetrics] = useState<MetricsUpdate | null>(null);
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const handleMetricsUpdate = useCallback((data: MetricsUpdate) => {
    setMetrics(data);
  }, []);

  const handleActivityFeed = useCallback((data: ActivityFeedItem[]) => {
    setActivityFeed(data);
  }, []);

  const handleLeaderboardUpdate = useCallback((data: LeaderboardEntry[]) => {
    setLeaderboard(data);
  }, []);

  const handleAchievementUnlocked = useCallback((data: any) => {
    // You could show a toast notification here
    console.log("Achievement unlocked:", data);
  }, []);

  useEffect(() => {
    // Subscribe to WebSocket events
    const unsubscribeMetrics = wsManager.subscribe("metrics_update", handleMetricsUpdate);
    const unsubscribeActivity = wsManager.subscribe("activity_feed", handleActivityFeed);
    const unsubscribeLeaderboard = wsManager.subscribe("leaderboard_update", handleLeaderboardUpdate);
    const unsubscribeAchievement = wsManager.subscribe("achievement_unlocked", handleAchievementUnlocked);

    // Check connection status periodically
    const checkConnection = () => {
      setIsConnected(wsManager.isConnected());
    };

    checkConnection();
    const connectionChecker = setInterval(checkConnection, 1000);

    // Cleanup on unmount
    return () => {
      unsubscribeMetrics();
      unsubscribeActivity();
      unsubscribeLeaderboard();
      unsubscribeAchievement();
      clearInterval(connectionChecker);
    };
  }, [handleMetricsUpdate, handleActivityFeed, handleLeaderboardUpdate, handleAchievementUnlocked]);

  const sendMessage = useCallback((type: string, data: any) => {
    wsManager.send({ type: type as any, data });
  }, []);

  return {
    isConnected,
    metrics,
    activityFeed,
    leaderboard,
    sendMessage,
  };
}

// Hook specifically for real-time metrics
export function useRealtimeMetrics() {
  const { metrics, isConnected } = useWebSocket();
  return { metrics, isConnected };
}

// Hook specifically for activity feed
export function useActivityFeed() {
  const { activityFeed, isConnected } = useWebSocket();
  return { activityFeed, isConnected };
}

// Hook specifically for leaderboard
export function useRealtimeLeaderboard() {
  const { leaderboard, isConnected } = useWebSocket();
  return { leaderboard, isConnected };
}
