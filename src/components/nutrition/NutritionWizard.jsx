import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import FloatingInput from '../ui/FloatingInput'
import FloatingSelect from '../ui/FloatingSelect'
import ComingSoonFeatures from '../ui/ComingSoonFeatures'
import { ChevronLeft, ChevronRight, Calculator, Target, TrendingUp, Download, Share2, ChevronDown, ChevronUp, BookOpen, Lightbulb, Utensils, Loader2, Zap, Brain, Heart, RefreshCw, Save } from 'lucide-react'

const NutritionWizard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: ''
  })
  const [results, setResults] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})
  const [isCalculating, setIsCalculating] = useState(false)

  // Toggle accordion sections
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Step navigation
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    const { age, gender, height, weight } = formData
    const ageNum = parseInt(age)
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (gender === 'male') {
      return 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      return 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }
  }

  // Calculate daily calories based on activity level
  const calculateDailyCalories = () => {
    const bmr = calculateBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    return Math.round(bmr * activityMultipliers[formData.activityLevel])
  }

  // Calculate target calories based on goal
  const calculateTargetCalories = () => {
    const dailyCalories = calculateDailyCalories()
    switch (formData.goal) {
      case 'lose': return Math.round(dailyCalories - 500) // 1 lb/week loss
      case 'maintain': return dailyCalories
      case 'gain': return Math.round(dailyCalories + 500) // 1 lb/week gain
      default: return dailyCalories
    }
  }

  // Calculate macronutrient targets
  const calculateMacros = () => {
    const targetCalories = calculateTargetCalories()
    
    // Standard macro split (can be adjusted based on goals)
    const proteinPercent = formData.goal === 'lose' ? 30 : 25
    const fatPercent = 25
    const carbPercent = 100 - proteinPercent - fatPercent

    const proteinGrams = Math.round((targetCalories * proteinPercent / 100) / 4)
    const fatGrams = Math.round((targetCalories * fatPercent / 100) / 9)
    const carbGrams = Math.round((targetCalories * carbPercent / 100) / 4)

    return {
      protein: { grams: proteinGrams, percent: proteinPercent, calories: proteinGrams * 4 },
      fat: { grams: fatGrams, percent: fatPercent, calories: fatGrams * 9 },
      carbs: { grams: carbGrams, percent: carbPercent, calories: carbGrams * 4 }
    }
  }

  // Process form and calculate results
  const calculateResults = async () => {
    setIsCalculating(true)
    
    // Add a slight delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const bmr = Math.round(calculateBMR())
    const dailyCalories = calculateDailyCalories()
    const targetCalories = calculateTargetCalories()
    const macros = calculateMacros()

    const resultsData = {
      bmr,
      dailyCalories,
      targetCalories,
      macros,
      personalSummary: generatePersonalSummary(dailyCalories, targetCalories)
    }

    setResults(resultsData)
    setIsCalculating(false)
    nextStep()
  }

  // Generate personalized summary
  const generatePersonalSummary = (daily, target) => {
    const { age, activityLevel, goal } = formData
    const activityText = {
      sedentary: 'sedentary lifestyle',
      light: 'lightly active',
      moderate: 'moderately active', 
      active: 'active lifestyle',
      very_active: 'very active lifestyle'
    }
    
    const goalText = {
      lose: `To lose weight healthily, aim for ~${target} calories daily.`,
      maintain: `To maintain your current weight, aim for ~${target} calories daily.`,
      gain: `To gain weight healthily, aim for ~${target} calories daily.`
    }

    return `At ${age} with a ${activityText[activityLevel]}, you burn approximately ${daily} calories per day. ${goalText[goal]}`
  }

  // Macro Pie Chart Component
  const MacroPieChart = ({ macros }) => {
    const { protein, fat, carbs } = macros
    const total = protein.percent + fat.percent + carbs.percent
    
    const proteinAngle = (protein.percent / total) * 360
    const fatAngle = (fat.percent / total) * 360
    const carbsAngle = (carbs.percent / total) * 360

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Protein slice */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="#10B981"
            strokeWidth="20"
            strokeDasharray={`${proteinAngle * 0.628} 251.2`}
            strokeDashoffset="0"
            className="transition-all duration-300 hover:stroke-width-22"
          />
          {/* Fat slice */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="20"
            strokeDasharray={`${fatAngle * 0.628} 251.2`}
            strokeDashoffset={`-${proteinAngle * 0.628}`}
            className="transition-all duration-300 hover:stroke-width-22"
          />
          {/* Carbs slice */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="20"
            strokeDasharray={`${carbsAngle * 0.628} 251.2`}
            strokeDashoffset={`-${(proteinAngle + fatAngle) * 0.628}`}
            className="transition-all duration-300 hover:stroke-width-22"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700">Macros</div>
            <div className="text-sm text-gray-500">Daily Split</div>
          </div>
        </div>
      </div>
    )
  }

  // Expandable Info Section Component
  const ExpandableSection = ({ id, title, children, icon: Icon }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-blue-600 mr-3" />
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        {expandedSections[id] ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>
      {expandedSections[id] && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  )

  // Step components
  const steps = [
    // Step 0: Welcome Screen
    <motion.div 
      className="text-center max-w-2xl mx-auto rounded-2xl backdrop-blur-md bg-white/95 p-8 shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="text-6xl mr-2 animate-bounce-gentle">🎯</div>
          <motion.div
            className="text-2xl"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>
        </div>
        <motion.h1 
          className="text-4xl font-semibold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent">
            Your Personalized Nutrition Guide
          </span>
        </motion.h1>
        
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="text-lg font-medium text-brandStart mb-2">
            What you'll get:
          </p>
          <p className="text-lg text-gray-600">
            Science-backed <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent font-semibold">daily needs</span>, personalized to your goals.
          </p>
        </motion.div>
        
        <motion.p 
          className="text-xl text-gray-600 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          We'll help you find your personalized nutrition needs — in under 60 seconds.
        </motion.p>
        <motion.p 
          className="text-lg text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Get your <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent font-semibold">calorie needs</span>, <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent font-semibold">macro targets</span>, and personalized recommendations.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
        <motion.div 
          className="p-6 bg-featureMint rounded-xl cursor-pointer group overflow-hidden min-h-[200px] flex flex-col items-center justify-center text-center border border-transparent hover:border-brandStart/20 transition-all duration-300"
          whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Calculator className="w-8 h-8 text-brandStart mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="font-semibold text-gray-800 mb-3 leading-tight text-base max-w-[90%] mx-auto">Precise Calculations</h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[90%] mx-auto">Science-based formulas for accurate results</p>
        </motion.div>
        <motion.div 
          className="p-6 bg-featureLavender rounded-xl cursor-pointer group overflow-hidden min-h-[200px] flex flex-col items-center justify-center text-center border border-transparent hover:border-brandStart/20 transition-all duration-300"
          whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Target className="w-8 h-8 text-brandStart mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="font-semibold text-gray-800 mb-3 leading-tight text-base max-w-[90%] mx-auto">Personal Targets</h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[90%] mx-auto">Customized to your goals and lifestyle</p>
        </motion.div>
        <motion.div 
          className="p-6 bg-featurePeach rounded-xl cursor-pointer group overflow-hidden min-h-[200px] flex flex-col items-center justify-center text-center border border-transparent hover:border-brandStart/20 transition-all duration-300"
          whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <TrendingUp className="w-8 h-8 text-brandStart mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
          <h3 className="font-semibold text-gray-800 mb-3 leading-tight text-base max-w-[90%] mx-auto">Easy to Follow</h3>
          <p className="text-sm text-gray-600 leading-relaxed max-w-[90%] mx-auto">Simple, actionable recommendations</p>
        </motion.div>
      </div>

      <motion.button
        onClick={nextStep}
        className="bg-gradient-to-r from-brandStart to-brandEnd hover:from-brandEnd hover:to-brandStart text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        Get Started <ChevronRight className="w-5 h-5 ml-2" />
      </motion.button>
    </motion.div>,

    // Step 1: User Input Form
    <motion.div 
      className="max-w-2xl mx-auto rounded-2xl backdrop-blur-md bg-white/95 p-8 shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-2">
          <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent">
            Tell Us About Yourself
          </span>
        </h2>
        <p className="text-gray-600">We'll use this information to calculate your personalized nutrition needs.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
        <div className="animate-slide-up mb-4" style={{animationDelay: '0.2s'}}>
          <FloatingInput
            label="Age"
            name="age"
            type="number"
            placeholder="25"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            className="transition-all duration-200 hover:scale-105"
          />
        </div>

        <div className="animate-slide-up mb-4" style={{animationDelay: '0.3s'}}>
          <FloatingSelect
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={(value) => updateFormData('gender', value)}
            placeholder="Select gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]}
            className="transition-all duration-200 hover:scale-105"
          />
        </div>

        <div className="animate-slide-up mb-4" style={{animationDelay: '0.4s'}}>
          <FloatingInput
            label="Height (cm)"
            name="height"
            type="number"
            placeholder="175"
            value={formData.height}
            onChange={(e) => updateFormData('height', e.target.value)}
            className="transition-all duration-200 hover:scale-105"
          />
        </div>

        <div className="animate-slide-up mb-4" style={{animationDelay: '0.5s'}}>
          <FloatingInput
            label="Weight (kg)"
            name="weight"
            type="number"
            placeholder="70"
            value={formData.weight}
            onChange={(e) => updateFormData('weight', e.target.value)}
            className="transition-all duration-200 hover:scale-105"
          />
        </div>

        <div className="md:col-span-2 mb-6">
          <FloatingSelect
            label="Activity Level"
            name="activityLevel"
            value={formData.activityLevel}
            onChange={(value) => updateFormData('activityLevel', value)}
            placeholder="Select your activity level"
            options={[
              { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
              { value: 'light', label: 'Lightly Active (light exercise 1-3 days/week)' },
              { value: 'moderate', label: 'Moderately Active (moderate exercise 3-5 days/week)' },
              { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
              { value: 'very_active', label: 'Very Active (very hard exercise, physical job)' }
            ]}
            className="transition-all duration-200 hover:scale-105"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-4">What's Your Primary Goal?</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
            {[
              { value: 'lose', label: 'Lose Weight', emoji: '📉', color: 'from-red-50 to-red-100 border-red-200 hover:border-red-300' },
              { value: 'maintain', label: 'Maintain Weight', emoji: '⚖️', color: 'from-green-50 to-green-100 border-green-200 hover:border-green-300' },
              { value: 'gain', label: 'Gain Weight', emoji: '📈', color: 'from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300' },
              { value: 'muscle', label: 'Build Muscle', emoji: '💪', color: 'from-purple-50 to-purple-100 border-purple-200 hover:border-purple-300' },
              { value: 'energy', label: 'Improve Energy', emoji: '⚡', color: 'from-yellow-50 to-yellow-100 border-yellow-200 hover:border-yellow-300' },
              { value: 'health', label: 'Overall Health', emoji: '🌟', color: 'from-teal-50 to-teal-100 border-teal-200 hover:border-teal-300' }
            ].map(goal => (
              <button
                key={goal.value}
                onClick={() => updateFormData('goal', goal.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-md bg-gradient-to-br ${
                  formData.goal === goal.value 
                    ? 'border-brandStart bg-gradient-to-br from-brandStart/10 to-brandEnd/10 shadow-lg scale-105' 
                    : goal.color
                }`}
              >
                <div className="text-2xl mb-2">{goal.emoji}</div>
                <div className="font-semibold text-sm text-gray-800">{goal.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <motion.button
          onClick={prevStep}
          className="flex items-center px-6 py-3 text-gray-600 hover:text-brandStart transition-colors duration-200 font-medium"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </motion.button>
        <motion.button
          onClick={calculateResults}
          disabled={!formData.age || !formData.gender || !formData.height || !formData.weight || !formData.activityLevel || !formData.goal || isCalculating}
          className="bg-gradient-to-r from-brandStart to-brandEnd hover:from-brandEnd hover:to-brandStart text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCalculating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculating...
            </>
          ) : (
            <>
              Calculate Results 
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </motion.button>
      </div>
    </motion.div>,

    // Step 2: Results Display
    results && (
      <motion.div 
        className="max-w-4xl mx-auto rounded-2xl backdrop-blur-md bg-white/95 p-8 shadow-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-2">
            <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent">
              Your Personalized Results
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {results.personalSummary}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Numbers */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 rounded-2xl border-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">⚡️ Daily Calorie Target</h3>
                    <p className="text-sm text-blue-600">For your {formData.goal} goal</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-700">
                    {results.targetCalories}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-200 text-blue-800">
                    Target
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200 rounded-2xl border-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">🧠 BMR (Base Metabolic Rate)</h3>
                    <p className="text-sm text-green-600">Calories burned at rest</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-700">
                    {results.bmr}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-200 text-green-800">
                    Base Rate
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 rounded-2xl border-2 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-out"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-800">🥗 Daily Energy Expenditure</h3>
                    <p className="text-sm text-purple-600">Including activity</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-700">
                    {results.dailyCalories}
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-200 text-purple-800">
                    Total
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Macro Chart */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Macronutrient Targets
            </h3>
            <MacroPieChart macros={results.macros} />
            
            <div className="mt-6 space-y-3">
              {[
                { key: 'protein', label: 'Protein', emoji: '🥩', color: 'text-green-600' },
                { key: 'carbs', label: 'Carbohydrates', emoji: '🍞', color: 'text-blue-600' },
                { key: 'fat', label: 'Fats', emoji: '🥑', color: 'text-yellow-600' }
              ].map(macro => (
                <div key={macro.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{macro.emoji}</span>
                    <span className="font-medium">{macro.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{results.macros[macro.key].grams}g</div>
                    <div className={`text-sm ${macro.color}`}>
                      {results.macros[macro.key].percent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          className="flex justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.button
            onClick={prevStep}
            className="flex items-center px-6 py-3 text-gray-600 hover:text-brandStart transition-colors duration-200 font-medium"
            whileHover={{ x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </motion.button>
          
          <div className="flex gap-3">
            <motion.button
              onClick={() => setCurrentStep(0)}
              className="flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Start Over
            </motion.button>
            <motion.button
              className="flex items-center px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 font-medium rounded-xl transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Save className="w-4 h-4 mr-2" /> Save My Plan
            </motion.button>
            <motion.button
              onClick={nextStep}
              className="bg-gradient-to-r from-brandStart to-brandEnd hover:from-brandEnd hover:to-brandStart text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-white to-white bg-clip-text group-hover:from-yellow-200 group-hover:to-white transition-all duration-300">
                Learn More
              </span>
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    ),

    // Step 3: Educational Content & Tips
    <motion.div 
      className="max-w-4xl mx-auto rounded-2xl backdrop-blur-md bg-white/95 p-8 shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-4">
          <span className="bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent">
            Learn More About Nutrition
          </span>
        </h2>
        <p className="text-lg text-gray-600">
          Understanding your numbers is just the beginning. Here's everything you need to succeed.
        </p>
      </motion.div>

      {/* Quick Tips Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
          Quick Tips for Success
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: '🥩',
              title: 'Include protein at every meal',
              description: 'Protein helps build muscle and keeps you feeling full longer.'
            },
            {
              icon: '🌿',
              title: 'Aim for fiber with every plate', 
              description: 'Fiber supports digestion and helps regulate blood sugar levels.'
            },
            {
              icon: '💧',
              title: 'Drink more water than you think you need',
              description: 'Proper hydration supports metabolism and can reduce hunger.'
            }
          ].map((tip, index) => (
            <Card key={index} className="p-4 bg-gradient-to-br from-gray-50 to-white">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Expandable Educational Sections */}
      <div className="space-y-4 mb-8">
        <ExpandableSection 
          id="what-numbers-mean" 
          title="What do these numbers mean?"
          icon={Calculator}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">BMR (Basal Metabolic Rate)</h4>
              <p className="text-gray-600">
                This is the number of calories your body burns at rest just to maintain basic functions like breathing, 
                circulation, and cell production. Think of it as your body's minimum energy requirement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Daily Calorie Needs</h4>
              <p className="text-gray-600">
                This includes your BMR plus the calories you burn through daily activities and exercise. 
                It represents your total energy expenditure on a typical day.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Macronutrients</h4>
              <p className="text-gray-600">
                Protein builds and repairs tissues, carbohydrates provide energy for your brain and muscles, 
                and fats support hormone production and nutrient absorption. Each plays a crucial role in your health.
              </p>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection 
          id="build-meals" 
          title="How to build meals that match your targets"
          icon={Utensils}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">The Plate Method</h4>
              <p className="text-gray-600 mb-3">
                Fill half your plate with vegetables, one quarter with lean protein, and one quarter with whole grains or starchy vegetables.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-1">🥬</div>
                  <div className="text-sm font-medium">50% Vegetables</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl mb-1">🍗</div>
                  <div className="text-sm font-medium">25% Protein</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mb-1">🍚</div>
                  <div className="text-sm font-medium">25% Carbs</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Portion Guides</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Protein: Palm-sized portion (3-4 oz)</li>
                <li>• Carbs: Cupped hand portion (1/2 - 1 cup)</li>
                <li>• Fats: Thumb-sized portion (1-2 tbsp)</li>
                <li>• Vegetables: As much as you want!</li>
              </ul>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection 
          id="why-numbers-matter" 
          title="Why these numbers matter"
          icon={Target}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Sustainable Results</h4>
              <p className="text-gray-600">
                Understanding your calorie needs helps you make changes that you can stick with long-term. 
                Extreme restrictions often lead to rebounds and aren't sustainable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Individual Needs</h4>
              <p className="text-gray-600">
                Your age, gender, size, and activity level all influence your nutritional needs. 
                Generic recommendations don't account for your unique circumstances.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Balanced Approach</h4>
              <p className="text-gray-600">
                Focusing on all three macronutrients ensures your body gets what it needs to function optimally 
                while working toward your goals.
              </p>
            </div>
          </div>
        </ExpandableSection>
      </div>

      {/* Educational Articles */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
          Recommended Reading
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "What are macronutrients?",
              description: "Learn the basics of protein, carbs, and fats and why your body needs all three.",
              readTime: "3 min read",
              category: "Basics"
            },
            {
              title: "How to balance your meals",
              description: "Simple strategies for creating nutritious, satisfying meals that support your goals.",
              readTime: "5 min read", 
              category: "Meal Planning"
            },
            {
              title: "Adjusting calories over time",
              description: "When and how to modify your calorie intake as your body and goals change.",
              readTime: "4 min read",
              category: "Advanced"
            }
          ].map((article, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {article.category}
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{article.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{article.description}</p>
              <div className="text-xs text-gray-500">{article.readTime}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="tertiary" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Results
        </Button>
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setCurrentStep(0)}>
            Start Over
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" /> Save Guide
          </Button>
        </div>
      </div>
    </motion.div>
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted via-white to-featurePeach py-10 px-6">
      {/* Progress Indicator */}
      <motion.div 
        className="max-w-2xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-4">
          {[0, 1, 2, 3].map((step) => (
            <motion.div
              key={step}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: step <= currentStep ? 1.2 : 0.8,
                backgroundColor: step <= currentStep ? '#37c8b4' : '#e5e7eb'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-3 h-3 rounded-full"
            />
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-sm font-semibold text-gray-600">
            Step {currentStep + 1} of 4
          </span>
        </div>
      </motion.div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="max-w-2xl mx-auto px-6"
        >
          {steps[currentStep]}
        </motion.div>
      </AnimatePresence>
      
      {/* Coming Soon Features - Show after completing at least step 2 */}
      {currentStep >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ComingSoonFeatures />
        </motion.div>
      )}
    </div>
  )
}

export default NutritionWizard 