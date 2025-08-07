import React from 'react'
import { motion } from 'framer-motion'

/**
 * NuriAvatar Component - Ethereal, Minimalist AI Assistant
 * 
 * Features:
 * - Large, translucent, pastel-colored orb
 * - Soft, blurred facial features (emoji-like, minimalistic)
 * - Gentle aura that radiates outwards
 * - Calm, gentle expression avoiding uncanny valley
 * - Apple-like sleekness with glassmorphism effect
 */
export default function NuriAvatar({ 
  size = 'md', 
  isListening = false, 
  isSpeaking = false,
  reaction = 'neutral',
  className = '' 
}) {
  const sizeClasses = {
    sm: 'w-10 h-10',    // 40px
    md: 'w-12 h-12',    // 48px
    lg: 'w-14 h-14',    // 56px
    xl: 'w-16 h-16'     // 64px
  }

  return (
    <motion.div
      className={`relative ${sizeClasses[size]} ${className}`}
      whileHover={{ scale: 1.02 }}
      animate={{ 
        rotate: isListening ? [0, 0.5, -0.5, 0] : 0,
        scale: isSpeaking ? [1, 1.005, 1] : 1
      }}
      transition={{ 
        repeat: isListening ? Infinity : 0, 
        duration: isListening ? 6 : 0.3,
        repeatType: isSpeaking ? "reverse" : "loop"
      }}
      aria-label="Nuri avatar"
      role="img"
    >
      {/* Soft, Luminous Aura - Radiates Outwards */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-100/40 to-teal-50/30 blur-xl animate-pulse"></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-lg"></div>
      
      {/* Main Avatar - Large, Translucent, Pastel-Colored Orb */}
      <div className="relative w-full h-full">
        {/* Glassmorphism Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-50/60 to-teal-100/40 backdrop-blur-sm border border-teal-200/30 shadow-sm"></div>
        
        {/* Central Orb - Translucent with Soft Edges */}
        <div className="relative w-full h-full bg-gradient-to-br from-teal-50/80 to-teal-100/60 rounded-full overflow-hidden backdrop-blur-sm">
          
          {/* Soft, Blurred Facial Features - Emoji-like, Minimalistic */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Eyes - Two Horizontally Aligned, Blurred, Dark Oval Shapes */}
            <div className="flex items-center gap-4 mb-2">
              {/* Left Eye */}
              <div className="w-2.5 h-1.5 bg-teal-800/60 rounded-full blur-sm"></div>
              
              {/* Right Eye */}
              <div className="w-2.5 h-1.5 bg-teal-800/60 rounded-full blur-sm"></div>
            </div>
            
            {/* Mouth - Smaller, Horizontally Elongated, Blurred Dark Shape */}
            <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-teal-800/50 rounded-full blur-sm"></div>
            
            {/* Subtle Glow Inside */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent"></div>
          </div>
        </div>
        
        {/* Enhanced Aura - Soft, Luminous, Fading into Background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-100/20 to-transparent blur-2xl animate-pulse"></div>
        <div className="absolute inset-0 rounded-full shadow-[0_0_20px_8px_rgba(78,177,174,0.15)]"></div>
      </div>
    </motion.div>
  )
} 