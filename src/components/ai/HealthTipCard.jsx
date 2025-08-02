import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { HealthTip } from '../../constants/nuriModes'
import { 
  Lightbulb, 
  Heart, 
  Zap, 
  Brain, 
  Moon,
  TrendingUp
} from 'lucide-react'



const categoryIcons = {
  nutrition: Heart,
  exercise: Zap,
  mindfulness: Brain,
  sleep: Moon,
  general: Lightbulb
}

const categoryColors = {
  nutrition: 'from-red-50 to-pink-50 border-red-200',
  exercise: 'from-blue-50 to-indigo-50 border-blue-200',
  mindfulness: 'from-purple-50 to-violet-50 border-purple-200',
  sleep: 'from-indigo-50 to-blue-50 border-indigo-200',
  general: 'from-green-50 to-emerald-50 border-green-200'
}

const categoryIconColors = {
  nutrition: 'text-red-600',
  exercise: 'text-blue-600',
  mindfulness: 'text-purple-600',
  sleep: 'text-indigo-600',
  general: 'text-green-600'
}

const HealthTipCard = ({ tip, onDismiss, className = '' }) => {
  const Icon = categoryIcons[tip.category]
  const bgColor = categoryColors[tip.category]
  const iconColor = categoryIconColors[tip.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`w-full ${className}`}
    >
      <Card className={`p-6 bg-gradient-to-br ${bgColor} border-2 shadow-lg hover:shadow-xl transition-all duration-300`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-white shadow-sm`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">{tip.title}</h4>
              <p className="text-sm text-gray-500 capitalize">{tip.category} Tip</p>
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed">
            {tip.content}
          </p>
          
          {/* Action Suggestion */}
          <div className="flex items-center gap-2 pt-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Try this today for better health
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-200/50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>From Nuri</span>
            <span>Daily Tip</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default HealthTipCard 