import React from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Calendar, 
  AlertTriangle, 
  Globe, 
  Brain,
  Sparkles
} from 'lucide-react'

/**
 * PremiumFeaturesCarousel Component - Advanced Features Showcase
 * 
 * Features:
 * - 2x2 grid layout for premium features
 * - Scrollable carousel with smooth animations
 * - Accessible with proper ARIA labels
 * - Glassmorphic styling with hover effects
 * - Fade-in animations for each feature
 */
export default function PremiumFeaturesCarousel() {
  const features = [
    {
      id: 'chronic-illness',
      title: 'Chronic Illness Support',
      description: 'Personalized nutrition guidance for managing chronic conditions',
      icon: Heart,
      color: 'from-red-400 to-pink-400',
      bgColor: 'from-red-100/80 to-pink-100/60',
      borderColor: 'border-red-200/50'
    },
    {
      id: 'menstrual-cycle',
      title: 'Menstrual Cycle Adaptation',
      description: 'Nutrition recommendations that adapt to your cycle phases',
      icon: Calendar,
      color: 'from-purple-400 to-indigo-400',
      bgColor: 'from-purple-100/80 to-indigo-100/60',
      borderColor: 'border-purple-200/50'
    },
    {
      id: 'allergy-aware',
      title: 'Allergy-Aware Meals',
      description: 'Smart meal suggestions that respect your dietary restrictions',
      icon: AlertTriangle,
      color: 'from-yellow-400 to-orange-400',
      bgColor: 'from-yellow-100/80 to-orange-100/60',
      borderColor: 'border-yellow-200/50'
    },
    {
      id: 'cultural-food',
      title: 'Cultural Food Guidance',
      description: 'Nutrition advice that honors your cultural food traditions',
      icon: Globe,
      color: 'from-blue-400 to-cyan-400',
      bgColor: 'from-blue-100/80 to-cyan-100/60',
      borderColor: 'border-blue-200/50'
    },
    {
      id: 'mood-nutrition',
      title: 'Mood-Nutrition Tracking',
      description: 'Connect your food choices with your emotional wellbeing',
      icon: Brain,
      color: 'from-green-400 to-emerald-400',
      bgColor: 'from-green-100/80 to-emerald-100/60',
      borderColor: 'border-green-200/50'
    },
    {
      id: 'ai-insights',
      title: 'AI-Powered Insights',
      description: 'Advanced analytics and personalized recommendations',
      icon: Sparkles,
      color: 'from-violet-400 to-purple-400',
      bgColor: 'from-violet-100/80 to-purple-100/60',
      borderColor: 'border-violet-200/50'
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold font-body"
        >
          <Sparkles className="w-4 h-4" />
          Premium Features
        </motion.div>
        <h2 className="text-3xl font-bold font-title text-gray-800">
          Advanced Nutrition Support
        </h2>
        <p className="text-lg font-body text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Unlock personalized nutrition guidance with our premium features designed for your unique health journey.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.3 + index * 0.1, 
              duration: 0.5,
              ease: 'easeOut'
            }}
            whileHover={{ 
              scale: 1.02, 
              y: -4,
              transition: { duration: 0.2 }
            }}
            className={`backdrop-blur-sm bg-gradient-to-br ${feature.bgColor} border ${feature.borderColor} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            aria-label={`Learn more about ${feature.title}`}
            tabIndex={0}
          >
            <div className="space-y-4">
              {/* Icon */}
              <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold font-body text-gray-800 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm font-body text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
              
              {/* Learn More Link */}
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                <span>Learn more</span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center space-y-4"
      >
        <motion.button
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold font-body shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, shadow: '0 0 12px #d8c8eb50' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Upgrade to premium"
          tabIndex={0}
        >
          Upgrade to Premium
        </motion.button>
        <p className="text-sm font-body text-gray-500">
          Start with our free features and upgrade when you're ready
        </p>
      </motion.div>
    </motion.div>
  )
} 