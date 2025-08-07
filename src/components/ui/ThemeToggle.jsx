import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Palette } from 'lucide-react'

/**
 * ThemeToggle Component - Pastel Sets with Dark Mode
 * 
 * Features:
 * - Three theme options: Light Pastel, Dark Pastel, Auto
 * - Smooth transitions between themes
 * - Accessible with proper ARIA labels
 * - Glassmorphic styling
 */
export default function ThemeToggle({ onThemeChange }) {
  const [currentTheme, setCurrentTheme] = useState('light-pastel')
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { id: 'light-pastel', name: 'Light Pastel', icon: Sun, colors: ['#A7C7A3', '#B3DFF5', '#D8C8EB'] },
    { id: 'dark-pastel', name: 'Dark Pastel', icon: Moon, colors: ['#1A1A1A', '#2E3B4E', '#3A4A5F'] },
    { id: 'auto', name: 'Auto', icon: Palette, colors: ['#A7C7A3', '#B3DFF5', '#D8C8EB'] }
  ]

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId)
    setIsOpen(false)
    if (onThemeChange) {
      onThemeChange(themeId)
    }
  }

  const currentThemeData = themes.find(t => t.id === currentTheme)

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="backdrop-blur-sm bg-white/30 border border-white/60 rounded-2xl p-3 shadow-md hover:shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle theme"
        tabIndex={0}
      >
        <currentThemeData.icon className="w-5 h-5 text-gray-700" />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          className="absolute top-full mt-2 right-0 backdrop-blur-sm bg-white/30 border border-white/60 rounded-2xl p-2 shadow-lg z-50"
        >
          {themes.map((theme) => (
            <motion.button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                currentTheme === theme.id 
                  ? 'bg-white/50 text-gray-800' 
                  : 'hover:bg-white/30 text-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label={`Switch to ${theme.name} theme`}
              tabIndex={0}
            >
              <theme.icon className="w-4 h-4" />
              <span className="text-sm font-medium font-nunito">{theme.name}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  )
} 