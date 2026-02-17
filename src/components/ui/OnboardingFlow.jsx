import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, Camera, Target, Heart, SkipForward } from 'lucide-react'

/**
 * OnboardingFlow Component - 3-Step Introduction
 * 
 * Features:
 * - 3-step onboarding: Meet Nuri, Log Meal, Set Goal
 * - Progress tracker with animations
 * - Skip functionality
 * - Accessible with proper ARIA labels
 * - Glassmorphic styling
 */
export default function OnboardingFlow({ onComplete, onSkip }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    mealPhoto: null,
    goal: ''
  })

  const steps = [
    {
      id: 0,
      title: "Meet Nuri",
      subtitle: "Your AI wellness assistant",
      description: "Hi! I'm Nuri, your personalized nutrition companion. I'm here to help you achieve your health goals through smart, science-backed guidance.",
      icon: Heart,
      color: "from-purple-400 to-pink-400"
    },
    {
      id: 1,
      title: "Log Your First Meal",
      subtitle: "Start your nutrition journey",
      description: "Take a photo of your meal or describe what you're eating. I'll help you understand its nutritional value and how it fits into your goals.",
      icon: Camera,
      color: "from-blue-400 to-cyan-400"
    },
    {
      id: 2,
      title: "Set Your Goal",
      subtitle: "What do you want to achieve?",
      description: "Choose your primary health goal. I'll personalize your experience and recommendations based on what matters most to you.",
      icon: Target,
      color: "from-green-400 to-emerald-400"
    }
  ]

  const goals = [
    { id: 'energy', label: 'Gain Energy', icon: '⚡', description: 'Feel more energetic throughout the day' },
    { id: 'symptoms', label: 'Reduce Symptoms', icon: '🌿', description: 'Manage health symptoms through nutrition' },
    { id: 'weight', label: 'Weight Management', icon: '⚖️', description: 'Maintain or achieve healthy weight' },
    { id: 'performance', label: 'Better Performance', icon: '🏃', description: 'Improve athletic or mental performance' }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete?.(formData)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onSkip?.()
  }

  const handleGoalSelect = (goalId) => {
    setFormData(prev => ({ ...prev, goal: goalId }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
              <Heart className="w-12 h-12" />
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-title text-gray-800">Meet Nuri</h2>
              <p className="text-lg font-body text-gray-600 leading-relaxed max-w-md mx-auto">
                Hi! I'm Nuri, your personalized nutrition companion. I'm here to help you achieve your health goals through smart, science-backed guidance.
              </p>
            </div>
          </motion.div>
        )

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                <Camera className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold font-title text-gray-800">Log Your First Meal</h2>
              <p className="text-lg font-body text-gray-600 leading-relaxed">
                Take a photo of your meal or describe what you're eating. I'll help you understand its nutritional value.
              </p>
            </div>
            
            <div className="space-y-4">
              <motion.button
                className="w-full backdrop-blur-sm bg-white/30 border border-white/60 rounded-2xl p-6 hover:bg-white/40 transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Take photo of meal"
                tabIndex={0}
              >
                <div className="flex items-center justify-center gap-3">
                  <Camera className="w-6 h-6 text-gray-600" />
                  <span className="font-medium font-body text-gray-700">Take Photo</span>
                </div>
              </motion.button>
              
              <motion.button
                className="w-full backdrop-blur-sm bg-white/30 border border-white/60 rounded-2xl p-6 hover:bg-white/40 transition-all duration-300 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-label="Describe meal manually"
                tabIndex={0}
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-2xl">✍️</span>
                  <span className="font-medium font-body text-gray-700">Describe Manually</span>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-3xl shadow-lg">
                <Target className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-bold font-title text-gray-800">Set Your Goal</h2>
              <p className="text-lg font-body text-gray-600 leading-relaxed">
                Choose your primary health goal. I'll personalize your experience based on what matters most to you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {goals.map((goal) => (
                <motion.button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id)}
                  className={`backdrop-blur-sm border rounded-2xl p-4 text-left transition-all duration-300 shadow-md hover:shadow-lg ${
                    formData.goal === goal.id
                      ? 'bg-white/50 border-purple-300 shadow-[0_0_12px_#d8c8eb50]'
                      : 'bg-white/30 border-white/60 hover:bg-white/40'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Select goal: ${goal.label}`}
                  tabIndex={0}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{goal.icon}</span>
                    <div>
                      <h3 className="font-semibold font-body text-gray-800 mb-1">{goal.label}</h3>
                      <p className="text-sm font-body text-gray-600">{goal.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-sm bg-white/30 border border-white/60 rounded-2xl p-8 max-w-md w-full shadow-xl"
      >
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep ? 'bg-purple-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <motion.button
            onClick={handleSkip}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            whileHover={{ scale: 1.05 }}
            aria-label="Skip onboarding"
            tabIndex={0}
          >
            <SkipForward className="w-4 h-4" />
            Skip
          </motion.button>
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <motion.button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/30'
            }`}
            whileHover={currentStep > 0 ? { scale: 1.05 } : {}}
            aria-label="Previous step"
            tabIndex={currentStep === 0 ? -1 : 0}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={currentStep === steps.length - 1 ? "Complete onboarding" : "Next step"}
            tabIndex={0}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
} 