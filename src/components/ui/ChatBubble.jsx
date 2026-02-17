import React from 'react'
import { motion } from 'framer-motion'

/**
 * ChatBubble Component - Organic Rounded Chat Interface
 * 
 * Features:
 * - Incoming messages: light-gray background with backdrop blur
 * - Outgoing messages: pastel-sage background with white text
 * - Bounce/scale entrance animation for each new bubble
 * - Organic rounded design (rounded-2xl)
 * - WCAG AA contrast compliance
 */
export default function ChatBubble({ 
  children, 
  from = 'nuri', 
  timestamp,
  className = '' 
}) {
  const isNuri = from === 'nuri'
  const bg = isNuri 
    ? 'bg-white/60 backdrop-blur-xs border border-white/40' 
    : 'bg-sage/70 text-white border border-sage/50'
  
  const textColor = isNuri ? 'text-gray-800' : 'text-white'

  return (
    <motion.div
      className={`max-w-xs p-3 ${bg} rounded-2xl mb-2 shadow-sm ${className}`}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        duration: 0.4
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className={`text-sm leading-relaxed ${textColor}`}>
        {children}
      </div>
      {timestamp && (
        <div className={`text-xs mt-1 ${isNuri ? 'text-gray-500' : 'text-white/70'}`}>
          {timestamp}
        </div>
      )}
    </motion.div>
  )
} 