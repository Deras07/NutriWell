import React from 'react'
import { motion } from 'framer-motion'

/**
 * PlantStepper Component - Nutrition Journey Visualization
 * 
 * Features:
 * - Visualizes user's nutrition journey as seed → sprout → plant → leaf
 * - Animated plant growth icons with scale and color changes
 * - Pastel vine line connecting steps
 * - Progress-based animations
 * - Pastel-futuristic aesthetic
 */
const steps = [
  { label: 'Assessment', icon: '🌱', activeIcon: '🌱', color: 'sage' },
  { label: 'Goal-Setting', icon: '🌿', activeIcon: '🌿', color: 'misty' },
  { label: 'Plan', icon: '🌳', activeIcon: '🌳', color: 'lavender' },
  { label: 'Track', icon: '🍃', activeIcon: '🍃', color: 'blush' }
]

export default function PlantStepper({ current = 0 }) {
  return (
    <div className="w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-6 text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2 font-nunito">
          🌱 Your Nutrition Journey
        </h3>
        <p className="text-gray-600 text-sm font-nunito">
          Track your progress through personalized nutrition guidance
        </p>
      </motion.div>

      <div className="flex justify-between items-center relative py-8">
        {/* Vine Path */}
        <div className="absolute inset-x-0 top-1/2 h-0.5 w-full">
          <svg className="w-full h-2" viewBox="0 0 100 2">
            <motion.path
              d="M5 1 Q25 0.5, 50 1 Q75 1.5, 95 1"
              stroke="#A7C7A3"
              strokeWidth="2"
              fill="none"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </svg>
        </div>

        {steps.map((step, index) => {
          const isActive = index === current
          const isCompleted = index < current
          const isUpcoming = index > current
          
          const iconColor = isActive 
            ? `text-${step.color}` 
            : isCompleted 
              ? `text-${step.color}/80` 
              : 'text-gray-400'
          
          const bgColor = isActive 
            ? `bg-${step.color}/20` 
            : isCompleted 
              ? `bg-${step.color}/10` 
              : 'bg-gray-100'

          return (
            <div key={index} className="flex flex-col items-center text-center relative z-10">
              <motion.div
                className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center border-2 ${
                  isActive ? `border-${step.color}/40` : 'border-gray-200'
                } shadow-md`}
                animate={isActive ? { 
                  scale: [1, 1.1, 1], 
                  rotate: [0, 5, -5, 0] 
                } : {}}
                transition={{ 
                  repeat: isActive ? Infinity : 0, 
                  duration: 3,
                  ease: 'easeInOut'
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className={`text-xl ${iconColor}`}>
                  {isActive ? step.activeIcon : step.icon}
                </span>
              </motion.div>
              
              <motion.span 
                className={`text-sm font-medium mt-2 font-nunito ${
                  isActive ? 'text-gray-800' : 'text-gray-600'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {step.label}
              </motion.span>
              
              {/* Progress indicator */}
              {isCompleted && (
                <motion.div
                  className="absolute top-0 right-0 w-4 h-4 bg-sage rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
} 