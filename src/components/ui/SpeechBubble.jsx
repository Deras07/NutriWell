import React from 'react'
import { motion } from 'framer-motion'

const SpeechBubble = ({
  message,
  type = 'nuri',
  animated = true,
  className = ''
}) => {
  const bubbleStyles = {
    nuri: {
      backgroundColor: 'linear-gradient(135deg, #f8faff 0%, #ffffff 100%)',
      borderColor: '#0ea5e9',
      textColor: '#1e293b',
      shadow: '0 4px 12px rgba(0,0,0,0.08)'
    },
    user: {
      backgroundColor: 'linear-gradient(135deg, #fef3c7 0%, #ffffff 100%)',
      borderColor: '#f59e0b',
      textColor: '#92400e',
      shadow: '0 4px 12px rgba(0,0,0,0.08)'
    }
  }

  const currentStyle = bubbleStyles[type] || bubbleStyles.nuri

  return (
    <motion.div
      className={`relative min-w-[280px] max-w-[400px] ${className}`}
      initial={animated ? { opacity: 0, scale: 0.8, y: 10 } : {}}
      animate={animated ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Speech bubble - LARGER and more visually appealing */}
      <div
        className="relative p-4 md:p-5 rounded-2xl border-2 shadow-lg"
        style={{
          background: currentStyle.backgroundColor,
          borderColor: currentStyle.borderColor,
          boxShadow: currentStyle.shadow,
          borderRadius: '16px'
        }}
      >
        {/* Message text - BETTER TYPOGRAPHY */}
        <p
          className="text-sm md:text-base leading-relaxed font-medium"
          style={{
            color: currentStyle.textColor,
            lineHeight: '1.4'
          }}
        >
          {message}
        </p>

        {/* Personality elements - sparkle icons */}
        {type === 'nuri' && (
          <div className="absolute -top-1 -right-1">
            <span className="text-xs">⭐</span>
          </div>
        )}

        {/* Speech bubble tail */}
        <div
          className="absolute bottom-0 left-4 w-4 h-4 transform rotate-45"
          style={{
            background: currentStyle.backgroundColor.includes('gradient')
              ? '#f8faff'
              : currentStyle.backgroundColor,
            borderRight: `2px solid ${currentStyle.borderColor}`,
            borderBottom: `2px solid ${currentStyle.borderColor}`
          }}
        />
      </div>

      {/* Optional typing indicator */}
      {type === 'nuri' && animated && (
        <motion.div
          className="flex gap-1 mt-2 ml-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: dot * 0.2
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default SpeechBubble 