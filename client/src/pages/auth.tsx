import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from "wouter";
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // We'll style this with futuristic-input
import { Label } from '@/components/ui/label';
import { User, Lock, Mail, LogIn, UserPlus } from 'lucide-react'; // Using lucide-react icons

// Helper for API calls
const authenticateUser = async ({ endpoint, data }: { endpoint: string, data: any }) => {
  return apiRequest(`/api/auth/${endpoint}`, 'POST', data);
};

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess: (data: any) => {
      // Assuming token and user info are returned
      // Store token (e.g., localStorage) and update user state (e.g., context/zustand)
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      queryClient.invalidateQueries({ queryKey: ['userProfile'] }); // Example: invalidate user profile query

      toast({
        title: isLogin ? "Login Successful" : "Registration Successful",
        description: `Welcome back, ${data.user.username}!`,
        variant: "default",
      });
      navigate('/'); // Navigate to dashboard or home
    },
    onError: (error: any) => {
      toast({
        title: "Authentication Failed",
        description: error.message || (isLogin ? "Invalid credentials." : "Could not create account."),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? 'login' : 'register';
    const data = isLogin ? { username, password } : { username, email, password, region: 'India', language: 'en' }; // Added default region/language for register
    mutation.mutate({ endpoint, data });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring", stiffness: 120 } },
    exit: { opacity: 0, y: -50, scale: 0.9, transition: { duration: 0.3 } },
  };

  const inputFieldVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: (i: number) => ({ delay: i * 0.1 + 0.2, type: "spring", stiffness: 150 })
  };

  useEffect(() => {
    // If user is already logged in and visits /auth, redirect to dashboard
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(var(--deep-space))] via-[hsl(var(--dark-navy))] to-[hsl(var(--deep-space))] p-4 relative overflow-hidden">
      {/* Background futuristic elements - example */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10 animate-pulse"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, hsl(var(--cyber-cyan)) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, Math.random() * 50 - 25, 0],
            y: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      
      <motion.div
        className="holographic-card p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-md z-10"
        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold gradient-text mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {isLogin ? 'Welcome Back' : 'Join the Future'}
          </motion.h1>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {isLogin ? 'Access your Digital Nervous System.' : 'Create your account to begin.'}
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={isLogin ? 'login' : 'signup'}
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <motion.div variants={inputFieldVariants} initial="initial" animate="animate" custom={0}>
              <Label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--cyber-cyan))] w-5 h-5" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="digital_pioneer"
                  className="futuristic-input pl-10"
                  required
                />
              </div>
            </motion.div>

            {!isLogin && (
              <motion.div variants={inputFieldVariants} initial="initial" animate="animate" custom={1}>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--cyber-cyan))] w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pioneer@swameshtra.ai"
                    className="futuristic-input pl-10"
                    required
                  />
                </div>
              </motion.div>
            )}

            <motion.div variants={inputFieldVariants} initial="initial" animate="animate" custom={isLogin ? 1 : 2}>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[hsl(var(--cyber-cyan))] w-5 h-5" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="●●●●●●●●"
                  className="futuristic-input pl-10"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={inputFieldVariants} initial="initial" animate="animate" custom={isLogin ? 2 : 3}>
              <Button
                type="submit"
                className="interactive-button w-full text-lg py-3 mt-2"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-transparent border-t-white rounded-full mr-2"
                  />
                ) : (isLogin ? <LogIn className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />)}
                {mutation.isPending ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
              </Button>
            </motion.div>
          </motion.form>
        </AnimatePresence>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-sm text-gray-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold text-[hsl(var(--cyber-cyan))] hover:text-[hsl(var(--vibrant-orange))] transition-colors ml-1 p-0 h-auto"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </Button>
          </p>
        </motion.div>
      </motion.div>
      <Link href="/" className="absolute top-6 left-6 text-gray-400 hover:text-[hsl(var(--cyber-cyan))] transition-colors z-20">
        &larr; Back to Home
      </Link>
    </div>
  );
}