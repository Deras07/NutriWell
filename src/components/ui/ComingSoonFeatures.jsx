import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Sparkles, Zap, Brain, Heart, Moon, Leaf, TrendingUp, Clock, Sun, Eye, Shield, Activity, Target, Wind, Utensils, Droplets, Calendar, Flame, Users, X } from 'lucide-react'

const ComingSoonFeatures = () => {
  const [waitlistCount, setWaitlistCount] = useState(0)
  const [showWaitlistForm, setShowWaitlistForm] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  // Load waitlist count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('nutriwell-waitlist-count')
    if (savedCount) {
      setWaitlistCount(parseInt(savedCount))
    }
  }, [])

  const features = [
    {
      title: "Circadian Rhythm Eating",
      subtitle: "Timing meals to your body's clock for optimal energy.",
      emoji: "⏰",
      gradient: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      title: "Micronutrient Synergy",
      subtitle: "Which vitamins & minerals work better together.",
      emoji: "💊",
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      title: "Anti-Inflammatory Plans",
      subtitle: "Personalized meal plans based on genetic markers.",
      emoji: "🧬",
      gradient: "from-red-400 to-orange-400",
      bgGradient: "from-red-50 to-orange-50"
    },
    {
      title: "Gut Microbiome Diversity",
      subtitle: "Scoring through food variety analysis.",
      emoji: "🦠",
      gradient: "from-green-400 to-emerald-400",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      title: "Cognitive Performance",
      subtitle: "Foods for focus and clarity enhancement.",
      emoji: "🧠",
      gradient: "from-indigo-400 to-purple-400",
      bgGradient: "from-indigo-50 to-purple-50"
    },
    {
      title: "Seasonal Mood Support",
      subtitle: "Light-supporting nutrients for mood disorders.",
      emoji: "☀️",
      gradient: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-50 to-orange-50"
    },
    {
      title: "Hormone Balancing",
      subtitle: "Nutrition for different life stages and cycles.",
      emoji: "⚖️",
      gradient: "from-pink-400 to-rose-400",
      bgGradient: "from-pink-50 to-rose-50"
    },
    {
      title: "Food Sensitivity Tracking",
      subtitle: "Using symptoms to identify trigger foods.",
      emoji: "🔍",
      gradient: "from-amber-400 to-yellow-400",
      bgGradient: "from-amber-50 to-yellow-50"
    },
    {
      title: "Athletic Recovery",
      subtitle: "Sport-specific training and recovery nutrition.",
      emoji: "🏃",
      gradient: "from-blue-400 to-teal-400",
      bgGradient: "from-blue-50 to-teal-50"
    },
    {
      title: "Stress-Eating Intervention",
      subtitle: "Healthier coping strategies and alternatives.",
      emoji: "🧘",
      gradient: "from-green-400 to-blue-400",
      bgGradient: "from-green-50 to-blue-50"
    },
    {
      title: "Sleep Quality Optimization",
      subtitle: "Evening meal composition for better rest.",
      emoji: "😴",
      gradient: "from-slate-400 to-blue-400",
      bgGradient: "from-slate-50 to-blue-50"
    },
    {
      title: "Longevity Nutrition",
      subtitle: "Inspired by Blue Zones for longer life.",
      emoji: "🌿",
      gradient: "from-teal-400 to-green-400",
      bgGradient: "from-teal-50 to-green-50"
    },
    {
      title: "Environmental Detox",
      subtitle: "Detox-supporting foods for toxin mitigation.",
      emoji: "🌱",
      gradient: "from-emerald-400 to-green-400",
      bgGradient: "from-emerald-50 to-green-50"
    },
    {
      title: "Social Eating Support",
      subtitle: "Restaurant pre-planning for anxiety relief.",
      emoji: "👥",
      gradient: "from-violet-400 to-purple-400",
      bgGradient: "from-violet-50 to-purple-50"
    },
    {
      title: "Intermittent Fasting",
      subtitle: "Personalization by metabolic type.",
      emoji: "⏱️",
      gradient: "from-orange-400 to-red-400",
      bgGradient: "from-orange-50 to-red-50"
    },
    {
      title: "Menstrual Cycle Syncing",
      subtitle: "Nutrition syncing for hormonal balance.",
      emoji: "🌸",
      gradient: "from-pink-400 to-purple-400",
      bgGradient: "from-pink-50 to-purple-50"
    },
    {
      title: "Brain Fog Elimination",
      subtitle: "Elimination diet protocols for clarity.",
      emoji: "🌤️",
      gradient: "from-cyan-400 to-blue-400",
      bgGradient: "from-cyan-50 to-blue-50"
    },
    {
      title: "Addiction Recovery",
      subtitle: "Nutritional support per substance type.",
      emoji: "💪",
      gradient: "from-gray-400 to-slate-400",
      bgGradient: "from-gray-50 to-slate-50"
    },
    {
      title: "Climate Adaptation",
      subtitle: "Nutrition for extreme weather resilience.",
      emoji: "🌡️",
      gradient: "from-red-400 to-yellow-400",
      bgGradient: "from-red-50 to-yellow-50"
    },
    {
      title: "Digital Eye Strain Relief",
      subtitle: "Targeted nutrients for screen protection.",
      emoji: "👁️",
      gradient: "from-blue-400 to-indigo-400",
      bgGradient: "from-blue-50 to-indigo-50"
    }
  ]

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault()
    if (waitlistCount >= 80) return

    setIsSubmitting(true)
    
    // Enhanced validation
    const trimmedName = formData.name.trim()
    const trimmedEmail = formData.email.trim().toLowerCase()
    
    if (!trimmedName) {
      setToastMessage('Please enter your name.')
      setShowToast(true)
      setIsSubmitting(false)
      return
    }
    
    if (!trimmedEmail) {
      setToastMessage('Please enter your email address.')
      setShowToast(true)
      setIsSubmitting(false)
      return
    }
    
    // More robust email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(trimmedEmail)) {
      setToastMessage('Please enter a valid email address.')
      setShowToast(true)
      setIsSubmitting(false)
      return
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Save to localStorage (in production, this would be an API call)
    const waitlistUsers = JSON.parse(localStorage.getItem('nutriwell-waitlist') || '[]')
    
    // Check if email already exists (case-insensitive)
    if (waitlistUsers.some(user => user.email.toLowerCase() === trimmedEmail)) {
      setToastMessage('This email is already on the waitlist.')
      setShowToast(true)
      setIsSubmitting(false)
      return
    }
    
    const newUser = {
      name: trimmedName,
      email: trimmedEmail,
      timestamp: Date.now()
    }

    waitlistUsers.push(newUser)
    localStorage.setItem('nutriwell-waitlist', JSON.stringify(waitlistUsers))
    
    const newCount = waitlistUsers.length
    setWaitlistCount(newCount)
    localStorage.setItem('nutriwell-waitlist-count', newCount.toString())

    setFormData({ name: '', email: '' })
    setShowWaitlistForm(false)
    setIsSubmitting(false)
    setToastMessage('🎉 You\'re on the list! Early bird perks coming soon.')
    setShowToast(true)
  }

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  const isWaitlistFull = waitlistCount >= 80

  return (
    <section className="py-16 bg-gradient-to-br from-muted via-white to-featurePeach overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brandStart/10 to-brandEnd/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-brandStart animate-pulse" />
            <span className="text-brandStart font-semibold">Coming Soon</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent mb-4">
            The Future of Personalized Health
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building something extraordinary. Get ready for cutting-edge features that will transform how you think about nutrition and wellness.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="block md:hidden">
            {/* Gradient fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex-shrink-0 w-72 group cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className={`
                    relative h-full p-4 rounded-xl border border-gray-200 
                    bg-gradient-to-br ${feature.bgGradient} 
                    transition-all duration-300 
                    hover:border-brandStart hover:shadow-xl 
                    overflow-hidden min-h-[140px]
                  `}>
                    {/* Coming Soon Badge */}
                    <div className="absolute top-3 right-3 flex items-center space-x-1">
                      <Lock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full">
                        🔒 Coming Soon
                      </span>
                    </div>

                    {/* Emoji */}
                    <div className="text-3xl mb-3">
                      {feature.emoji}
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 pr-16 leading-tight">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className={`
                  relative h-full p-4 rounded-xl border border-gray-200 
                  bg-gradient-to-br ${feature.bgGradient} 
                  transition-all duration-300 
                  hover:border-brandStart hover:shadow-xl 
                  overflow-hidden min-h-[140px]
                `}>
                  {/* Coming Soon Badge */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full">
                      🔒 Coming Soon
                    </span>
                  </div>

                  {/* Emoji */}
                  <div className="text-3xl mb-3">
                    {feature.emoji}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2 pr-16 leading-tight">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-brandStart/5 to-brandEnd/5 rounded-2xl border border-brandStart/20">
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                ✨ Want early access?
              </h4>
              <p className="text-gray-600 text-sm">
                Join our insider group — first 80 users get exclusive previews
                {waitlistCount > 0 && (
                  <div className="mt-2 space-y-2">
                    <span className={`block font-semibold text-sm ${
                      waitlistCount >= 70 ? 'text-orange-600' : 
                      waitlistCount >= 50 ? 'text-amber-600' : 
                      'text-brandStart'
                    }`}>
                      {waitlistCount}/80 spots filled
                      {waitlistCount >= 70 && ' • Almost full!'}
                      {waitlistCount >= 75 && ' • Hurry up!'}
                    </span>
                    
                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          waitlistCount >= 70 ? 'bg-orange-500' : 
                          waitlistCount >= 50 ? 'bg-amber-500' : 
                          'bg-gradient-to-r from-brandStart to-brandEnd'
                        }`}
                        style={{ width: `${Math.min((waitlistCount / 80) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </p>
            </div>
            
            <motion.button
              onClick={() => !isWaitlistFull && setShowWaitlistForm(true)}
              disabled={isWaitlistFull}
              className={`
                px-6 py-3 font-semibold rounded-xl shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:-translate-y-1 hover:scale-105
                whitespace-nowrap group
                ${isWaitlistFull 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-gradient-to-r from-brandStart to-brandEnd text-white'
                }
              `}
              whileHover={!isWaitlistFull ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isWaitlistFull ? { scale: 0.95 } : {}}
            >
              <span className="flex items-center space-x-2">
                <span>
                  {isWaitlistFull ? 'Waitlist Full – Stay Tuned!' : 'Join Waitlist'}
                </span>
                {!isWaitlistFull && (
                  <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                )}
                {isWaitlistFull && (
                  <Lock className="w-4 h-4" />
                )}
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Waitlist Form Modal */}
      <AnimatePresence>
        {showWaitlistForm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowWaitlistForm(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">
                  <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent">
                    Join Early Access
                  </span>
                </h3>
                <button
                  onClick={() => setShowWaitlistForm(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brandStart focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brandStart focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-brandStart to-brandEnd text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02, y: -1 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Joining...</span>
                      </span>
                    ) : (
                      'Join Waitlist'
                    )}
                  </motion.button>
                </div>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Be the first to access advanced nutrition features. No spam, ever.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            className="fixed top-6 right-6 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 max-w-sm"
            initial={{ opacity: 0, y: -50, x: 50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {toastMessage.includes('🎉') ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">🎉</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">⚠️</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {toastMessage}
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ComingSoonFeatures 