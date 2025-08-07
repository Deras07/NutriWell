import React from 'react'

/**
 * GlassCard Component - Pastel Futurism Design System
 * 
 * Product Overview:
 * - App name: Nutriwell – a nutrition assistant powered by Nuri, an AI nutrition coach
 * - Free version: scripted Q&A, macro recommendations, activity suggestions, explanatory read-outs
 * - Content sourced from Health Canada, Canada's Food Guide, WHO, USDA, etc.
 * 
 * Design Requirements:
 * - Glassmorphic card with backdrop blur and transparency
 * - Hover micro-interactions with scale and glow effects
 * - Pastel-futuristic aesthetic (Apple Health meets Studio Ghibli)
 */
export default function GlassCard({ children, className = '', onClick, disabled = false }) {
  return (
    <div
      className={`
        glass-card
        backdrop-blur-xs
        bg-white/30
        rounded-2xl
        shadow-lg
        border border-white/20
        p-5
        transition-all duration-200 ease-out
        ${!disabled && 'hover:scale-[1.02] hover:shadow-xl hover:shadow-white/30'}
        ${onClick && !disabled ? 'cursor-pointer' : ''}
        ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
        ${className}
      `}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  )
} 