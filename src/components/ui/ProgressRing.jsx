import React from 'react'
import { motion } from 'framer-motion'

const ProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = 'blue',
  label,
  showPercentage = true,
  animated = true
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const colors = {
    blue: 'stroke-blue-500',
    green: 'stroke-green-500',
    red: 'stroke-red-500',
    yellow: 'stroke-yellow-500',
    purple: 'stroke-purple-500',
    orange: 'stroke-orange-500'
  }

  const strokeColor = colors[color] || colors.blue

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className={strokeColor}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={animated ? { strokeDashoffset: circumference } : {}}
          animate={animated ? { strokeDashoffset } : {}}
          transition={{
            duration: 1.5,
            ease: "easeInOut"
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute flex flex-col items-center justify-center">
        {showPercentage && (
          <motion.div
            initial={animated ? { scale: 0, opacity: 0 } : {}}
            animate={animated ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-2xl font-bold text-gray-800"
          >
            {Math.round(progress)}%
          </motion.div>
        )}
        {label && (
          <motion.div
            initial={animated ? { y: 10, opacity: 0 } : {}}
            animate={animated ? { y: 0, opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-sm text-gray-600 text-center mt-1"
          >
            {label}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ProgressRing 