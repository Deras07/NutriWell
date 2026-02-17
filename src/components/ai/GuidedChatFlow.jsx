import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import GlassCard from '../ui/GlassCard'
import { 
  ArrowRight, 
  ArrowLeft,
  Heart,
  Zap,
  Target,
  Coffee,
  Droplets,
  MessageCircle,
  CheckCircle
} from 'lucide-react'

const GuidedChatFlow = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const steps = [
    {
      id: 'greeting',
      title: '👋 Welcome!',
      message: "Hi there! I'm Nuri, your health companion. Let's do a quick check-in so I can understand your needs today. Sound good?",
      options: [
        { id: 'start', label: "Let's go", icon: ArrowRight, color: 'from-green-500 to-emerald-500' },
        { id: 'later', label: "Maybe later", icon: Coffee, color: 'from-gray-500 to-slate-500' }
      ]
    },
    {
      id: 'mood',
      title: '😊 How are you feeling?',
      message: "How are you feeling right now?",
      options: [
        { id: 'energized', label: "Energized ⚡", icon: Zap, color: 'from-yellow-500 to-orange-500' },
        { id: 'okay', label: "Just okay 😌", icon: Heart, color: 'from-blue-500 to-indigo-500' },
        { id: 'tired', label: "Tired 😴", icon: Coffee, color: 'from-gray-500 to-slate-500' },
        { id: 'stressed', label: "Stressed 😣", icon: Target, color: 'from-red-500 to-pink-500' },
        { id: 'sick', label: "Sick 🤒", icon: Heart, color: 'from-purple-500 to-violet-500' }
      ]
    },
    {
      id: 'eating',
      title: '🍽️ Eating Habits',
      message: "How would you describe your eating habits lately?",
      options: [
        { id: 'balanced', label: "I eat regularly and balanced", icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
        { id: 'skip_meals', label: "I often skip meals", icon: Coffee, color: 'from-orange-500 to-red-500' },
        { id: 'snack_more', label: "I snack more than I should", icon: Target, color: 'from-yellow-500 to-amber-500' },
        { id: 'diet', label: "I'm trying a diet (low-carb, etc.)", icon: Heart, color: 'from-blue-500 to-indigo-500' }
      ]
    },
    {
      id: 'activity',
      title: '🏃‍♂️ Activity Level',
      message: "What's your usual activity level?",
      options: [
        { id: 'very_active', label: "Very active", icon: Zap, color: 'from-green-500 to-emerald-500' },
        { id: 'moderately_active', label: "Moderately active", icon: Target, color: 'from-blue-500 to-indigo-500' },
        { id: 'sedentary', label: "Sedentary (mostly sitting)", icon: Coffee, color: 'from-gray-500 to-slate-500' },
        { id: 'varies', label: "Varies day to day", icon: Heart, color: 'from-purple-500 to-violet-500' }
      ]
    },
    {
      id: 'goals',
      title: '🔄 Health Goals',
      message: "What are you currently working toward?",
      options: [
        { id: 'lose_weight', label: "Lose weight", icon: Target, color: 'from-red-500 to-pink-500' },
        { id: 'gain_muscle', label: "Gain muscle", icon: Zap, color: 'from-blue-500 to-indigo-500' },
        { id: 'maintain', label: "Maintain my health", icon: Heart, color: 'from-green-500 to-emerald-500' },
        { id: 'energy', label: "Improve energy", icon: Zap, color: 'from-yellow-500 to-orange-500' },
        { id: 'condition', label: "Manage a health condition", icon: Heart, color: 'from-purple-500 to-violet-500' }
      ]
    },
    {
      id: 'hydration',
      title: '🌊 Hydration Check',
      message: "Quick check — how much water do you usually drink?",
      options: [
        { id: '8_plus', label: "8+ cups a day 💧💧", icon: Droplets, color: 'from-blue-500 to-indigo-500' },
        { id: '4_7', label: "4–7 cups", icon: Droplets, color: 'from-cyan-500 to-blue-500' },
        { id: 'less_4', label: "Less than 4 cups", icon: Coffee, color: 'from-orange-500 to-red-500' },
        { id: 'not_sure', label: "Not sure", icon: Target, color: 'from-gray-500 to-slate-500' }
      ]
    },
    {
      id: 'additional',
      title: '🎯 Anything else?',
      message: "Anything else I should know about you? This could be allergies, lifestyle, menstrual cycle, etc.",
      options: [
        { id: 'yes', label: "Yes", icon: MessageCircle, color: 'from-blue-500 to-indigo-500' },
        { id: 'no', label: "No, I'm good", icon: CheckCircle, color: 'from-green-500 to-emerald-500' }
      ]
    }
  ]

  const currentStepData = steps[currentStep]

  const handleOptionSelect = (optionId) => {
    setAnswers(prev => ({ ...prev, [currentStepData.id]: optionId }))
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      // Complete the flow
      const finalAnswers = { ...answers, [currentStepData.id]: optionId }
      setShowResults(true)
      onComplete?.(finalAnswers)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const calculateResults = (answers) => {
    // Simple calculation based on answers
    let calories = 2000 // Base calories
    let protein = 25 // Base protein %
    let carbs = 50 // Base carbs %
    let fats = 25 // Base fats %

    // Adjust based on activity level
    if (answers.activity === 'very_active') {
      calories = 2500
      protein = 30
      carbs = 45
      fats = 25
    } else if (answers.activity === 'sedentary') {
      calories = 1800
      protein = 25
      carbs = 55
      fats = 20
    }

    // Adjust based on goals
    if (answers.goals === 'lose_weight') {
      calories -= 300
      protein = 30
      carbs = 40
      fats = 30
    } else if (answers.goals === 'gain_muscle') {
      calories += 300
      protein = 30
      carbs = 45
      fats = 25
    }

    return {
      calories: Math.round(calories),
      protein: Math.round((calories * protein / 100) / 4),
      carbs: Math.round((calories * carbs / 100) / 4),
      fats: Math.round((calories * fats / 100) / 9)
    }
  }

  if (showResults) {
    const results = calculateResults(answers)
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <GlassCard className="mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Personalized Plan</h2>
            <p className="text-gray-600">Based on your responses, here's what we recommend:</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Daily Calories</h3>
              <p className="text-2xl font-bold text-blue-600">{results.calories}</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Protein</h3>
              <p className="text-2xl font-bold text-green-600">{results.protein}g</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Carbs</h3>
              <p className="text-2xl font-bold text-yellow-600">{results.carbs}g</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Fats</h3>
              <p className="text-2xl font-bold text-purple-600">{results.fats}g</p>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">💡 Insight</h3>
            <p className="text-gray-600 text-sm">
              Based on your answers, your focus should be on balanced meals with moderate protein to support energy and recovery.
            </p>
          </div>
        </GlassCard>

        {/* Premium Features Teaser */}
        <GlassCard shimmer={true}>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">🚀 Unlock Premium Features</h3>
            <p className="text-gray-600 mb-4">Get personalized meal plans, advanced tracking, and unlimited AI conversations.</p>
            <Button className="bg-gradient-to-r from-brandStart to-brandEnd text-white">
              Upgrade to Pro
            </Button>
          </div>
        </GlassCard>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-gray-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-brandStart to-brandEnd h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <GlassCard>
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{currentStepData.title}</h2>
          <p className="text-gray-600 text-lg">{currentStepData.message}</p>
        </div>

        <div className="space-y-3">
          {currentStepData.options.map((option) => (
            <motion.button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                answers[currentStepData.id] === option.id
                  ? 'border-brandStart bg-gradient-to-r from-brandStart/10 to-brandEnd/10'
                  : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${option.color} rounded-full flex items-center justify-center`}>
                  <option.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-800">{option.label}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {currentStep > 0 && (
          <div className="mt-6 flex justify-between">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Button
              onClick={onSkip}
              variant="ghost"
              className="text-gray-500"
            >
              Skip for now
            </Button>
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}

export default GuidedChatFlow 