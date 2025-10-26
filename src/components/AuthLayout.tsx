import React from "react";
import { motion } from "framer-motion";
import loyaltyBackgroundTransparent from '@/assets/loyalty-background.svg'


interface AuthLayoutProps {
  children: React.ReactNode;
  backgroundImage: string;
}

export default function AuthLayout({ children, backgroundImage }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image positioned at bottom */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-full object-cover object-bottom blur-sm"
        />
      </div>
      
      {/* Multi-layered Gradient Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/60 via-purple-900/50 to-slate-900/60" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-900/30 via-transparent to-blue-900/30" />
      
      {/* Sophisticated Animated Pattern Overlay */}
      <div className="absolute inset-0 z-20 opacity-20">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>


      {/* Loyalty Logo Background Icon */}
      <img 
        src={loyaltyBackgroundTransparent} 
        alt="" 
        className="absolute z-10 bottom-0 right-0 w-[90vh] h-[90vh] pointer-events-none"
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-30 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-40 overflow-hidden">
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-20 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [-15, 15, -15],
            x: [15, -15, 15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
}