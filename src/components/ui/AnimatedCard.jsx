import React from 'react'
import { motion } from 'framer-motion'

const AnimatedCard = ({ 
  children, 
  className = '', 
  onClick, 
  hover = true, 
  shimmer = false,
  glow = false,
  tilt = true,
  delay = 0,
  duration = 0.3
}) => {
  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      rotateX: 0,
      rotateY: 0
    },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: hover ? {
      y: -8,
      scale: 1.02,
      rotateX: 2,
      rotateY: 2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    } : {},
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  }

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const glowVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl ${className}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Shimmer Effect */}
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      )}

      {/* Glow Effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-xl"
          variants={glowVariants}
          initial="initial"
          animate="animate"
        />
      )}

      {/* Glass Morphism Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default AnimatedCard 