import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FloatingNotification {
  id: string;
  type: 'achievement' | 'challenge' | 'social' | 'streak' | 'limited_offer' | 'bonus';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  duration?: number;
  actionText?: string;
  actionUrl?: string;
  emoji?: string;
}

export default function FloatingNotifications() {
  const [activeNotifications, setActiveNotifications] = useState<FloatingNotification[]>([]);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);
  const queryClient = useQueryClient();

  // Fetch notifications with high frequency to trigger checking behavior
  const { data: notifications = [] } = useQuery({
    queryKey: ['/api/engagement/notifications', 1],
    refetchInterval: 10000, // Check every 10 seconds for new notifications
  });

  // Generate random engagement notifications to maintain user attention
  useEffect(() => {
    const generateRandomNotification = () => {
      const notificationTypes = [
        {
          type: 'limited_offer',
          title: 'Limited Time Offer!',
          message: 'Free premium AI features for the next 30 minutes',
          priority: 'high',
          duration: 8000,
          actionText: 'Claim Now',
          emoji: '⚡'
        },
        {
          type: 'social',
          title: 'Community Activity',
          message: '12 developers are currently working on cultural AI projects',
          priority: 'medium',
          duration: 6000,
          actionText: 'Join Them',
          emoji: '👥'
        },
        {
          type: 'streak',
          title: 'Streak Alert!',
          message: 'Complete today\'s challenge to maintain your streak',
          priority: 'high',
          duration: 7000,
          actionText: 'Continue',
          emoji: '🔥'
        },
        {
          type: 'achievement',
          title: 'New Badge Available!',
          message: 'You\'re 2 challenges away from "Cultural Expert"',
          priority: 'medium',
          duration: 5000,
          actionText: 'View Progress',
          emoji: '🏆'
        },
        {
          type: 'bonus',
          title: 'Surprise Bonus!',
          message: 'Complete any challenge now for 2x points',
          priority: 'high',
          duration: 10000,
          actionText: 'Start Challenge',
          emoji: '💎'
        }
      ];

      const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const notification: FloatingNotification = {
        ...randomNotification,
        id: `floating-${Date.now()}-${Math.random()}`,
        priority: randomNotification.priority as 'low' | 'medium' | 'high'
      };

      setActiveNotifications(prev => [...prev, notification]);

      // Auto-remove notification after duration
      setTimeout(() => {
        setActiveNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, notification.duration || 5000);
    };

    // Show first notification after 10 seconds
    const initialTimer = setTimeout(generateRandomNotification, 10000);

    // Then show notifications at random intervals to create variable reward schedule
    const scheduleNextNotification = () => {
      const randomInterval = Math.random() * 60000 + 30000; // 30s to 1.5min
      setTimeout(() => {
        generateRandomNotification();
        scheduleNextNotification();
      }, randomInterval);
    };

    scheduleNextNotification();

    return () => {
      clearTimeout(initialTimer);
    };
  }, []);

  const dismissNotification = (id: string) => {
    setActiveNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationAction = (notification: FloatingNotification) => {
    // Track engagement and show success feedback
    queryClient.invalidateQueries({ queryKey: ['/api/engagement/challenges'] });
    dismissNotification(notification.id);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <>
      {/* Floating Notification Bell */}
      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => setShowNotificationCenter(!showNotificationCenter)}
          className="relative glass-morphism rounded-full p-3 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={notifications.length > 0 ? { 
            boxShadow: ['0 0 20px rgba(79, 209, 197, 0.3)', '0 0 30px rgba(79, 209, 197, 0.6)', '0 0 20px rgba(79, 209, 197, 0.3)']
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔔
          </motion.div>
          
          {notifications.length > 0 && (
            <motion.div
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {notifications.length}
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Floating Notifications */}
      <div className="fixed top-20 right-6 z-40 space-y-3 max-w-sm">
        <AnimatePresence>
          {activeNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                stiffness: 500, 
                damping: 30,
                delay: index * 0.1 
              }}
              className={`glass-morphism rounded-xl p-4 border-l-4 ${getPriorityColor(notification.priority)} shadow-2xl`}
              whileHover={{ scale: 1.02, x: -5 }}
            >
              <div className="flex items-start space-x-3">
                <motion.div 
                  className="text-2xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {notification.emoji}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-white text-sm truncate">
                      {notification.title}
                    </h4>
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <p className="text-gray-300 text-xs mb-3 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      className={`text-xs ${
                        notification.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                        notification.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {notification.priority.toUpperCase()}
                    </Badge>
                    
                    {notification.actionText && (
                      <Button
                        size="sm"
                        onClick={() => handleNotificationAction(notification)}
                        className="text-xs px-3 py-1 h-auto interactive-button"
                      >
                        <span>{notification.actionText}</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Urgency progress bar */}
              <motion.div
                className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden"
                initial={{ width: "100%" }}
              >
                <motion.div
                  className={`h-full ${
                    notification.priority === 'high' ? 'bg-red-500' :
                    notification.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}
                  animate={{ width: 0 }}
                  transition={{ 
                    duration: (notification.duration || 5000) / 1000,
                    ease: "linear"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Notification Center Dropdown */}
      <AnimatePresence>
        {showNotificationCenter && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-20 right-6 z-40 w-80 glass-morphism rounded-xl border border-cyan-500/20 shadow-2xl"
          >
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold text-white">Notifications</h3>
              <p className="text-xs text-gray-400">Stay updated with your progress</p>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🎯
                  </motion.div>
                  <p className="mt-2 text-sm">You're all caught up!</p>
                  <p className="text-xs">Complete challenges to earn rewards</p>
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  {notifications.slice(0, 5).map((notif: any, index: number) => (
                    <motion.div
                      key={notif.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-lg">
                          {notif.type === 'streak' ? '🔥' :
                           notif.type === 'achievement' ? '🏆' :
                           notif.type === 'social' ? '👥' :
                           notif.type === 'limited_offer' ? '⚡' : '📢'}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white text-sm">
                            {notif.title}
                          </h4>
                          <p className="text-gray-300 text-xs">
                            {notif.message}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {new Date(notif.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-700">
              <Button 
                className="w-full interactive-button text-sm"
                onClick={() => setShowNotificationCenter(false)}
              >
                <span>View All Activity</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}