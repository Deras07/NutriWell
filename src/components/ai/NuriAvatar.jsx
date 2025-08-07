import React from 'react'

const NuriAvatar = ({ size = 'md', mood = 'friendly', animate = true }) => {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16', 
    lg: 'w-20 h-20',
    xl: 'w-24 h-24'
  }

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'excited':
        return 'bg-yellow-400'
      case 'thinking':
        return 'bg-blue-400'
      case 'friendly':
      default:
        return 'bg-green-400'
    }
  }

  return (
    <div className={`${sizes[size]} ${getMoodColor(mood)} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
      🌱
    </div>
  )
}

export default NuriAvatar