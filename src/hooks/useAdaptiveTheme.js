import { useState, useEffect } from 'react'

export const useAdaptiveTheme = (userMood = 'neutral') => {
  const [timeOfDay, setTimeOfDay] = useState('day')
  const [currentTheme, setCurrentTheme] = useState({})

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours()
      if (hour >= 6 && hour < 12) setTimeOfDay('morning')
      else if (hour >= 12 && hour < 17) setTimeOfDay('afternoon')
      else if (hour >= 17 && hour < 21) setTimeOfDay('evening')
      else setTimeOfDay('night')
    }

    updateTimeOfDay()
    const interval = setInterval(updateTimeOfDay, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const themes = {
      morning: {
        primary: 'from-orange-400 to-yellow-400',
        secondary: 'from-yellow-50 to-orange-50',
        accent: 'from-amber-400 to-orange-400',
        background: 'from-yellow-50 via-orange-50 to-pink-50',
        card: 'bg-white/80 backdrop-blur-sm border-orange-200',
        text: 'text-orange-900',
        mood: userMood === 'energetic' ? 'from-yellow-400 to-orange-500' : 'from-orange-400 to-yellow-400'
      },
      afternoon: {
        primary: 'from-blue-400 to-indigo-400',
        secondary: 'from-blue-50 to-indigo-50',
        accent: 'from-indigo-400 to-blue-400',
        background: 'from-blue-50 via-indigo-50 to-purple-50',
        card: 'bg-white/80 backdrop-blur-sm border-blue-200',
        text: 'text-blue-900',
        mood: userMood === 'motivated' ? 'from-blue-400 to-indigo-500' : 'from-indigo-400 to-blue-400'
      },
      evening: {
        primary: 'from-purple-400 to-pink-400',
        secondary: 'from-purple-50 to-pink-50',
        accent: 'from-pink-400 to-purple-400',
        background: 'from-purple-50 via-pink-50 to-orange-50',
        card: 'bg-white/80 backdrop-blur-sm border-purple-200',
        text: 'text-purple-900',
        mood: userMood === 'happy' ? 'from-pink-400 to-purple-500' : 'from-purple-400 to-pink-400'
      },
      night: {
        primary: 'from-indigo-400 to-purple-400',
        secondary: 'from-indigo-50 to-purple-50',
        accent: 'from-purple-400 to-indigo-400',
        background: 'from-indigo-50 via-purple-50 to-blue-50',
        card: 'bg-white/80 backdrop-blur-sm border-indigo-200',
        text: 'text-indigo-900',
        mood: userMood === 'tired' ? 'from-indigo-400 to-purple-500' : 'from-purple-400 to-indigo-400'
      }
    }

    const moodOverrides = {
      stressed: {
        primary: 'from-red-400 to-orange-400',
        secondary: 'from-red-50 to-orange-50',
        accent: 'from-orange-400 to-red-400',
        background: 'from-red-50 via-orange-50 to-yellow-50',
        card: 'bg-white/80 backdrop-blur-sm border-red-200',
        text: 'text-red-900'
      },
      anxious: {
        primary: 'from-purple-400 to-blue-400',
        secondary: 'from-purple-50 to-blue-50',
        accent: 'from-blue-400 to-purple-400',
        background: 'from-purple-50 via-blue-50 to-indigo-50',
        card: 'bg-white/80 backdrop-blur-sm border-purple-200',
        text: 'text-purple-900'
      },
      happy: {
        primary: 'from-green-400 to-emerald-400',
        secondary: 'from-green-50 to-emerald-50',
        accent: 'from-emerald-400 to-green-400',
        background: 'from-green-50 via-emerald-50 to-teal-50',
        card: 'bg-white/80 backdrop-blur-sm border-green-200',
        text: 'text-green-900'
      }
    }

    const baseTheme = themes[timeOfDay]
    const moodTheme = moodOverrides[userMood]
    
    setCurrentTheme(moodTheme || baseTheme)
  }, [timeOfDay, userMood])

  return {
    theme: currentTheme,
    timeOfDay,
    userMood,
    isDark: timeOfDay === 'night',
    isStressed: userMood === 'stressed' || userMood === 'anxious'
  }
} 