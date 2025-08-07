import React from 'react'
import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

/**
 * FeaturesCarousel Component - Premium Features Showcase
 * 
 * Features:
 * - Swiper.js integration with responsive breakpoints
 * - Glass-card styling with pastel accent borders
 * - Slide-in animation: fade-up + slight translateX
 * - Disabled autoplay and loop for controlled experience
 * - Pastel-futuristic aesthetic
 */
export default function FeaturesCarousel({ features = [] }) {
  // Default features if none provided
  const defaultFeatures = [
    {
      title: "Personalized Meal Plans",
      desc: "AI-generated nutrition plans tailored to your goals and preferences",
      icon: "🍽️",
      color: "border-sage/30"
    },
    {
      title: "Macro Tracking",
      desc: "Advanced nutrition tracking with detailed macro breakdowns",
      icon: "📊",
      color: "border-misty/30"
    },
    {
      title: "Recipe Database",
      desc: "Access to thousands of healthy recipes with nutrition info",
      icon: "📖",
      color: "border-lavender/30"
    },
    {
      title: "Progress Analytics",
      desc: "Detailed insights and progress tracking over time",
      icon: "📈",
      color: "border-blush/30"
    }
  ]

  const carouselFeatures = features.length > 0 ? features : defaultFeatures

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 font-nunito">
          🌟 Premium Features
        </h3>
        <p className="text-gray-600 text-sm font-nunito">
          Unlock advanced nutrition guidance and personalized insights
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {carouselFeatures.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 0.4, 
              ease: 'easeOut' 
            }}
            whileHover={{ y: -4 }}
          >
            <GlassCard className={`border ${feature.color} p-4 h-full transition-all duration-300`}>
              <div className="text-center">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2 font-nunito">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed font-nunito">
                  {feature.desc}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 