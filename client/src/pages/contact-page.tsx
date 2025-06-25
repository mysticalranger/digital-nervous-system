// filepath: client/src/pages/contact-page.tsx
import { useState } from 'react';
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
      variant: "default",
    });
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="holographic-card p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-2xl"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">Get In Touch</h1>
            <p className="text-lg text-gray-300">We'd love to hear from you. Send us a message!</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="futuristic-input"
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="futuristic-input"
                required
              />
            </div>
            <div>
              <Label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 ml-1">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your thoughts, questions, or brilliant ideas..."
                className="futuristic-input min-h-[120px] resize-none"
                required
              />
            </div>
            <div>
              <Button
                type="submit"
                className="interactive-button w-full text-lg py-3 mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-transparent border-t-white rounded-full mr-2"
                  />
                ) : null}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}