import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  LogOut, 
  LogIn, 
  Menu, 
  X,
  Zap,
  Activity,
  Award,
  Mic,
  BarChart3,
  CreditCard,
  Key,
  Users
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

const NavLink = ({ href, children, icon: Icon }: { 
  href: string; 
  children: React.ReactNode; 
  icon?: any;
}) => {
  const [location] = useLocation();
  const isActive = location === href;
  
  return (
    <Link href={href}>
      <motion.div
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
          isActive 
            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30 shadow-lg' 
            : 'text-gray-300 hover:text-white hover:bg-white/10 border border-transparent'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </motion.div>
    </Link>
  );
};

export default function FuturisticNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });
  
  const isAuthenticated = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/gamification', label: 'Rewards', icon: Award },
    { href: '/voice-assistant', label: 'Voice AI', icon: Mic },
    { href: '/cultural-pulse', label: 'Live Pulse', icon: Activity },
    { href: '/payment', label: 'Credits', icon: CreditCard },
    { href: '/api-management', label: 'API Keys', icon: Key },
    { href: '/community', label: 'Community', icon: Users }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Brain className="h-8 w-8 text-purple-400" />
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Nervous System
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {!isLoading && isAuthenticated && navigationItems.map((item) => (
              <NavLink key={item.href} href={item.href} icon={item.icon}>
                {item.label}
              </NavLink>
            ))}
            
            {!isAuthenticated && (
              <NavLink href="/contact">Contact</NavLink>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!isLoading && (
              isAuthenticated ? (
                <Button 
                  onClick={() => window.location.href = '/api/logout'}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-400/50 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button 
                  onClick={() => window.location.href = '/api/login'}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0 shadow-lg"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-white/10"
          >
            <div className="space-y-2">
              {!isLoading && isAuthenticated && navigationItems.map((item) => (
                <NavLink key={item.href} href={item.href} icon={item.icon}>
                  {item.label}
                </NavLink>
              ))}
              
              {!isAuthenticated && (
                <NavLink href="/contact">Contact</NavLink>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}