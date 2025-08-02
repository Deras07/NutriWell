import React from 'react'
import { motion } from 'framer-motion'

const TypingIndicator = ({ isTyping, theme = 'default' }) => {
  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.5 },
    animate: (i) => ({
      scale: [0.8, 1.2, 0.8],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut"
      }
    })
  }

  const themes = {
    default: 'bg-gray-400',
    morning: 'bg-orange-400',
    afternoon: 'bg-blue-400',
    evening: 'bg-purple-400',
    night: 'bg-indigo-400',
    stressed: 'bg-red-400',
    anxious: 'bg-purple-400',
    happy: 'bg-green-400'
  }

  const dotColor = themes[theme] || themes.default

  if (!isTyping) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center gap-1 p-3 bg-gray-100 rounded-2xl max-w-xs"
    >
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            custom={i}
            variants={dotVariants}
            initial="initial"
            animate="animate"
            className={`w-2 h-2 rounded-full ${dotColor}`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-2">Nuri is typing...</span>
    </motion.div>
  )
}

export default TypingIndicator 