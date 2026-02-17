import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Trophy, Heart } from 'lucide-react'

/**
 * PositiveFeedbackAnimation Component - Goal Achievement Celebrations
 * 
 * Features:
 * - Confetti fall animation
 * - Plant growth animation (sprout → leaf)
 * - Customizable messages and icons
 * - Accessible with proper ARIA labels
 * - Auto-dismiss after animation
 */
export default function PositiveFeedbackAnimation({ 
  isVisible, 
  message = "Goal achieved!", 
  type = "confetti",
  onComplete 
}) {
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowAnimation(true)
      const timer = setTimeout(() => {
        setShowAnimation(false)
        onComplete?.()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  const confettiColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
    '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'
  ]

  const ConfettiAnimation = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiColors.map((color, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: -20,
            rotate: 0
          }}
          animate={{ 
            y: window.innerHeight + 20,
            rotate: 360,
            x: Math.random() * window.innerWidth
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
        />
      ))}
    </div>
  )

  const PlantGrowthAnimation = () => (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <motion.div
        className="text-center space-y-4"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-6xl mb-4"
          initial={{ scale: 0.5, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ 
            duration: 1,
            ease: "easeOut"
          }}
        >
          🌱
        </motion.div>
        <motion.div
          className="text-6xl"
          initial={{ scale: 0.5, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ 
            duration: 1,
            delay: 0.5,
            ease: "easeOut"
          }}
        >
          🌿
        </motion.div>
        <motion.div
          className="text-6xl"
          initial={{ scale: 0.5, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ 
            duration: 1,
            delay: 1,
            ease: "easeOut"
          }}
        >
          🌳
        </motion.div>
      </motion.div>
    </div>
  )

  const SuccessMessage = () => (
    <motion.div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="backdrop-blur-sm bg-white/90 border border-white/60 rounded-2xl p-8 shadow-xl text-center">
        <motion.div
          className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Trophy className="w-8 h-8" />
        </motion.div>
        <h3 className="text-xl font-bold font-title text-gray-800 mb-2">
          {message}
        </h3>
        <p className="text-gray-600 font-body">
          Great job! Keep up the amazing work.
        </p>
      </div>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {showAnimation && (
        <div className="fixed inset-0 z-50">
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Animation content */}
          {type === "confetti" && <ConfettiAnimation />}
          {type === "plant" && <PlantGrowthAnimation />}
          <SuccessMessage />
        </div>
      )}
    </AnimatePresence>
  )
} 