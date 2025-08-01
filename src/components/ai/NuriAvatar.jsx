import React from 'react'
import { motion } from 'framer-motion'

const NuriAvatar = ({ size = 'md', mood = 'friendly', animate = true }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  }

  const containerVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      }
    },
    pulse: {
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  }

  const circleVariants = {
    friendly: {
      fill: "url(#gradient-friendly)",
      animate: {
        scale: [1, 1.02, 1],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
    },
    thinking: {
      fill: "url(#gradient-thinking)",
      animate: {
        rotate: [0, 5, -5, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }
    },
    excited: {
      fill: "url(#gradient-excited)",
      animate: {
        scale: [1, 1.1, 1],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }
    }
  }

  return (
    <motion.div 
      className={`${sizes[size]} relative flex items-center justify-center`}
      variants={containerVariants}
      initial="initial"
      animate={animate ? ["animate", "pulse"] : "animate"}
    >
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <linearGradient id="gradient-friendly" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gradient-thinking" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="gradient-excited" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="gradient-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Main avatar circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          variants={circleVariants[mood]}
          animate="animate"
          fill={circleVariants[mood].fill}
        />
        
        {/* Glow overlay */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#gradient-glow)"
        />
        
        {/* Face features */}
        {/* Eyes */}
        <circle cx="38" cy="40" r="3" fill="white" />
        <circle cx="62" cy="40" r="3" fill="white" />
        <circle cx="38" cy="41" r="1.5" fill="#1F2937" />
        <circle cx="62" cy="41" r="1.5" fill="#1F2937" />
        
        {/* Nose */}
        <circle cx="50" cy="48" r="1" fill="rgba(255,255,255,0.4)" />
        
        {/* Mouth - changes based on mood */}
        {mood === 'friendly' && (
          <path 
            d="M 42 58 Q 50 66 58 58" 
            stroke="white" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
        )}
        {mood === 'thinking' && (
          <circle cx="50" cy="58" r="1.5" fill="white" />
        )}
        {mood === 'excited' && (
          <ellipse cx="50" cy="60" rx="6" ry="4" fill="white" />
        )}
        
        {/* Cheek highlights */}
        <circle cx="32" cy="52" r="2" fill="rgba(255,255,255,0.3)" />
        <circle cx="68" cy="52" r="2" fill="rgba(255,255,255,0.3)" />
      </svg>
      
      {/* Floating particles around avatar */}
      {animate && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brandStart rounded-full"
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 30}%`,
              }}
              animate={{
                y: [-5, -15, -5],
                opacity: [0.3, 0.8, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default NuriAvatar