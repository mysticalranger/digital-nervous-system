import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { Twitter, Github, Linkedin, Brain, Play, CalendarDays } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: "Platform",
      links: [
        "Getting Started",
        "Documentation", 
        "API Reference",
        "Tutorials",
        "Examples"
      ]
    },
    {
      title: "Community",
      links: [
        "Discord Server",
        "GitHub Discussions",
        "Developer Forum",
        "Regional Meetups",
        "Contribution Guide"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Bug Reports",
        "Feature Requests",
        "Status Page"
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
    { icon: <Github className="h-5 w-5" />, href: "#", name: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", name: "LinkedIn" }
  ];

  return (
    <footer id="contact" className="py-16 px-6 border-t border-[hsl(var(--border))]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--vibrant-orange))] to-[hsl(var(--cyber-cyan))] rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white text-xl"></i>
              </div>
              <Link href="/">
                <a className="flex items-center space-x-2 group">
                  <Brain className="h-8 w-8 text-[hsl(var(--cyber-cyan))] group-hover:animate-pulse" /> {/* Replaced fas fa-brain */}
                  <span className="text-2xl font-bold gradient-text">Digital Swameshtra</span>
                </a>
              </Link>
            </div>
            <p className="text-gray-400 mb-6">
              Building India's AI-powered digital nervous system through culturally-conscious development.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 glass-morphism rounded-lg flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (sectionIndex + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h6 className="text-lg font-semibold mb-4">{section.title}</h6>
              <ul className="space-y-3 text-gray-400">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="hover:text-[hsl(var(--cyber-cyan))] transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="pt-8 border-t border-[hsl(var(--border))]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Digital Swameshtra. Made with ❤️ for India's digital future.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-[hsl(var(--cyber-cyan))] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[hsl(var(--cyber-cyan))] transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-[hsl(var(--cyber-cyan))] transition-colors">Code of Conduct</a>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-4xl font-bold mb-6">
            Ready to Build the <span className="gradient-text">Future</span>?
          </h4>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join thousands of developers creating India's next generation of AI-powered solutions. Start your journey today.
          </p>
          
          <img 
            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
            alt="Modern innovation workspace with advanced technology setup" 
            className="w-full h-64 object-cover rounded-2xl mb-8" 
          />
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button 
              className="interactive-button text-lg px-10 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="mr-2 h-4 w-4" /> {/* Replaced fas fa-play */}
              Start Building Now
            </motion.button>
            <motion.button 
              className="glass-morphism px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CalendarDays className="mr-2 h-4 w-4" /> {/* Replaced fas fa-calendar */}
              Schedule Demo
            </motion.button>
          </div>
          
          <p className="text-gray-400 mt-6">
            Free to start • No credit card required • Join 150K+ developers
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
