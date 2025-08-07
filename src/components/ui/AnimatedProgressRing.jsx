import React from 'react'
import { motion } from 'framer-motion'

const AnimatedProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = 'gradient',
  label = '',
  showParticles = false,
  className = ''
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const getGradientId = () => `gradient-${Math.random().toString(36).substr(2, 9)}`

  const getColorConfig = () => {
    switch (color) {
      case 'protein':
        return {
          gradient: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
          fallback: '#ef4444'
        }
      case 'carbs':
        return {
          gradient: 'linear-gradient(135deg, #f59e0b 0%, #eab308 100%)',
          fallback: '#f59e0b'
        }
      case 'fats':
        return {
          gradient: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
          fallback: '#8b5cf6'
        }
      case 'success':
        return {
          gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          fallback: '#10b981'
        }
      case 'warning':
        return {
          gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          fallback: '#f59e0b'
        }
      case 'gradient':
      default:
        return {
          gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)',
          fallback: '#6366f1'
        }
    }
  }

  const colorConfig = getColorConfig()
  const gradientId = getGradientId()

  return (
    <div className={`relative ${className}`}>
      <motion.svg
        width={size}
        height={size}
        className="transform -rotate-90"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            filter: 'drop-shadow(0 4px 8px rgba(99, 102, 241, 0.3))'
          }}
        />

        {/* Center Content */}
        <foreignObject x={size / 4} y={size / 4} width={size / 2} height={size / 2}>
          <div className="flex flex-col items-center justify-center h-full">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.div>
            {label && (
              <motion.div
                className="text-xs text-gray-600 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
              >
                {label}
              </motion.div>
            )}
          </div>
        </foreignObject>
      </motion.svg>

      {/* Particle Effects on Completion */}
      {showParticles && progress >= 100 && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-brandStart to-brandEnd rounded-full"
              initial={{ 
                opacity: 0,
                scale: 0,
                x: size / 2,
                y: size / 2
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: size / 2 + Math.cos((i * 60) * Math.PI / 180) * 80,
                y: size / 2 + Math.sin((i * 60) * Math.PI / 180) * 80
              }}
              transition={{ 
                duration: 1,
                delay: i * 0.1,
                ease: 'easeOut'
              }}
            />
          ))}
        </div>
      )}

      {/* Pulsing Ring Effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-brandStart/20"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </div>
  )
}

export default AnimatedProgressRing 