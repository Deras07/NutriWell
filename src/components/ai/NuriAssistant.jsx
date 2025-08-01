import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import FloatingInput from '../ui/FloatingInput'
import FloatingSelect from '../ui/FloatingSelect'
import NuriAvatar from './NuriAvatar'
import { 
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  Zap, 
  Target, 
  TrendingUp,
  Calculator,
  Download,
  Share2,
  RefreshCw
} from 'lucide-react'

const NuriAssistant = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [nuriMood, setNuriMood] = useState('friendly')
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: ''
  })
  const [results, setResults] = useState(null)

  // Nuri's conversation messages for each step
  const nuriMessages = [
    {
      text: "Hi there! I'm Nuri, your personal nutrition assistant. 🌟",
      subtext: "Let's create a personalized nutrition plan that fits your lifestyle perfectly!",
      mood: "excited"
    },
    {
      text: `Nice to meet you${formData.name ? `, ${formData.name}` : ''}! What's your name?`,
      subtext: "I'd love to get to know you better so I can create the perfect plan for you.",
      mood: "friendly"
    },
    {
      text: `Great ${formData.name}! Now, could you tell me a bit about yourself?`,
      subtext: "I need some basic information to calculate your unique nutritional needs.",
      mood: "thinking"
    },
    {
      text: "Perfect! How active would you say you are?",
      subtext: "This helps me understand how many calories your body burns daily.",
      mood: "friendly"
    },
    {
      text: "Almost there! What's your main health goal right now?",
      subtext: "Whether it's losing weight, building muscle, or just staying healthy - I've got you covered!",
      mood: "excited"
    },
    {
      text: "Fantastic! Let me crunch the numbers and create your personalized plan...",
      subtext: "Using science-backed formulas to calculate your perfect nutrition targets.",
      mood: "thinking"
    },
    {
      text: `Here's your personalized nutrition plan, ${formData.name}!`,
      subtext: "These recommendations are tailored specifically for your goals and lifestyle.",
      mood: "excited"
    }
  ]

  // Step navigation
  const nextStep = () => {
    if (currentStep === 5) {
      calculateResults()
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 6))
    }
  }
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Update Nuri's mood based on current step
  useEffect(() => {
    if (nuriMessages[currentStep]) {
      setNuriMood(nuriMessages[currentStep].mood)
    }
  }, [currentStep])

  // All calculation logic preserved from original NutritionWizard
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

  const calculateTargetCalories = () => {
    const dailyCalories = calculateDailyCalories()
    switch (formData.goal) {
      case 'lose': 
        return Math.round(dailyCalories - 500) // 1 lb/week loss
      case 'gain': 
        return Math.round(dailyCalories + 500) // 1 lb/week gain
      case 'muscle':
        return Math.round(dailyCalories + 300) // Moderate surplus for muscle building
      case 'maintain':
      case 'energy':
      case 'health':
      default: 
        return dailyCalories // Maintenance calories
    }
  }

  const calculateMacros = () => {
    const targetCalories = calculateTargetCalories()
    
    // Health Canada & RDA macro percentage breakdowns
    let proteinPercent, carbPercent, fatPercent
    
    switch (formData.goal) {
      case 'lose':
        proteinPercent = 30
        carbPercent = 40
        fatPercent = 30
        break
      case 'muscle':
        proteinPercent = 30
        carbPercent = 45
        fatPercent = 25
        break
      default:
        proteinPercent = 25
        carbPercent = 50
        fatPercent = 25
        break
    }

    const proteinGrams = Math.round((targetCalories * proteinPercent / 100) / 4)
    const fatGrams = Math.round((targetCalories * fatPercent / 100) / 9)
    const carbGrams = Math.round((targetCalories * carbPercent / 100) / 4)

    return {
      protein: { grams: proteinGrams, percent: proteinPercent, calories: proteinGrams * 4 },
      fat: { grams: fatGrams, percent: fatPercent, calories: fatGrams * 9 },
      carbs: { grams: carbGrams, percent: carbPercent, calories: carbGrams * 4 }
    }
  }

  const calculateResults = async () => {
    setIsCalculating(true)
    setNuriMood('thinking')
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000))
    
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
      gain: `To gain weight healthily, aim for ~${target} calories daily.`,
      muscle: `To build muscle effectively, aim for ~${target} calories daily with adequate protein.`,
      energy: `To improve your energy levels, aim for ~${target} calories daily with balanced nutrition.`,
      health: `To optimize your overall health, aim for ~${target} calories daily with nutrient-dense foods.`
    }

    return `At ${age} with a ${activityText[activityLevel]}, you burn approximately ${daily} calories per day. ${goalText[goal] || goalText.maintain}`
  }

  // Check if current step is valid to proceed
  const canProceed = () => {
    switch (currentStep) {
      case 0: return true // Welcome
      case 1: return formData.name.trim() !== '' // Name
      case 2: return formData.age && formData.gender && formData.height && formData.weight // Demographics
      case 3: return formData.activityLevel !== '' // Activity
      case 4: return formData.goal !== '' // Goal
      case 5: return true // Calculate
      default: return false
    }
  }

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Nuri Avatar - Fixed Position */}
        <motion.div 
          className="fixed top-8 left-8 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <NuriAvatar size="lg" mood={nuriMood} animate={true} />
        </motion.div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i <= currentStep 
                      ? 'bg-gradient-to-r from-brandStart to-brandEnd' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-gray-500">
            Step {currentStep + 1} of 7
          </p>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="flex justify-center"
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )

  function renderStepContent() {
    const message = nuriMessages[currentStep]
    
    return (
      <Card className="w-full max-w-2xl p-8 bg-white/95 backdrop-blur-sm shadow-xl border-0">
        {/* Nuri's Message */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
            {message?.text}
          </h2>
          {message?.subtext && (
            <p className="text-gray-600 text-lg">
              {message.subtext}
            </p>
          )}
        </motion.div>

        {/* Step Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {renderCurrentStep()}
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={nextStep}
            disabled={!canProceed() || isCalculating}
            className="flex items-center gap-2 bg-gradient-to-r from-brandStart to-brandEnd hover:from-brandEnd hover:to-brandStart text-white px-6 py-3 rounded-xl"
          >
            {currentStep === 5 ? (
              isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Calculating...
                </>
              ) : (
                <>
                  Calculate
                  <Calculator className="w-4 h-4" />
                </>
              )
            ) : currentStep === 6 ? (
              'Start Over'
            ) : (
              <>
                Continue
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </motion.div>
      </Card>
    )
  }

  function renderCurrentStep() {
    switch (currentStep) {
      case 0: // Welcome
        return (
          <div className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-featureMint rounded-xl">
                <Calculator className="w-8 h-8 text-brandStart mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Precise Calculations</h3>
                <p className="text-sm text-gray-600">Science-based formulas for accurate results</p>
              </div>
              <div className="p-6 bg-featureLavender rounded-xl">
                <Target className="w-8 h-8 text-brandStart mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Personal Targets</h3>
                <p className="text-sm text-gray-600">Customized to your goals and lifestyle</p>
              </div>
              <div className="p-6 bg-featurePeach rounded-xl">
                <TrendingUp className="w-8 h-8 text-brandStart mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Easy to Follow</h3>
                <p className="text-sm text-gray-600">Simple, actionable recommendations</p>
              </div>
            </div>
          </div>
        )

      case 1: // Name
        return (
          <div className="space-y-6">
            <FloatingInput
              label="Your Name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Enter your first name"
              className="text-lg"
            />
          </div>
        )

      case 2: // Demographics
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput
              label="Age"
              type="number"
              value={formData.age}
              onChange={(e) => updateFormData('age', e.target.value)}
              placeholder="25"
            />
            
            <FloatingSelect
              label="Biological Sex"
              value={formData.gender}
              onChange={(value) => updateFormData('gender', value)}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' }
              ]}
              placeholder="Select sex"
            />
            
            <FloatingInput
              label="Height (cm)"
              type="number"
              value={formData.height}
              onChange={(e) => updateFormData('height', e.target.value)}
              placeholder="170"
            />
            
            <FloatingInput
              label="Weight (kg)"
              type="number"
              value={formData.weight}
              onChange={(e) => updateFormData('weight', e.target.value)}
              placeholder="70"
            />
          </div>
        )

      case 3: // Activity Level
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise', icon: '🪑' },
              { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week', icon: '🚶‍♀️' },
              { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week', icon: '🏃‍♀️' },
              { value: 'active', label: 'Active', desc: 'Hard exercise 6-7 days/week', icon: '💪' },
              { value: 'very_active', label: 'Very Active', desc: 'Very hard exercise, sports', icon: '🏋️‍♀️' }
            ].map(activity => (
              <button
                key={activity.value}
                onClick={() => updateFormData('activityLevel', activity.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  formData.activityLevel === activity.value 
                    ? 'border-brandStart bg-gradient-to-br from-brandStart/10 to-brandEnd/10 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800">{activity.label}</div>
                    <div className="text-sm text-gray-600">{activity.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )

      case 4: // Goals
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        )

      case 5: // Processing
        return (
          <div className="text-center py-8">
            <div className="animate-pulse text-6xl mb-4">🧮</div>
            <p className="text-lg text-gray-600">Hang tight! I'm calculating your personalized nutrition plan...</p>
          </div>
        )

      case 6: // Results
        return results ? (
          <div className="space-y-6">
            {/* Personal Summary */}
            <div className="text-center p-6 bg-gradient-to-r from-brandStart/10 to-brandEnd/10 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Perfect! Here's what I found for you:
              </h3>
              <p className="text-gray-700 leading-relaxed">{results.personalSummary}</p>
            </div>

            {/* Calorie & Macro Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Calories */}
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="text-center">
                  <Zap className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">Daily Calories</h4>
                  <div className="text-3xl font-bold text-blue-900">{results.targetCalories}</div>
                  <p className="text-sm text-blue-700 mt-1">per day</p>
                </div>
              </Card>

              {/* Goal Badge */}
              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="text-center">
                  <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-green-800 mb-2">Your Goal</h4>
                  <div className="text-xl font-bold text-green-900 capitalize">
                    {formData.goal === 'lose' ? 'Weight Loss' :
                     formData.goal === 'gain' ? 'Weight Gain' :
                     formData.goal === 'muscle' ? 'Build Muscle' :
                     formData.goal === 'energy' ? 'Improve Energy' :
                     formData.goal === 'health' ? 'Overall Health' :
                     'Maintain Weight'}
                  </div>
                </div>
              </Card>
            </div>

            {/* Macronutrients */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-center">
                <h5 className="font-semibold text-red-800 mb-2">Protein</h5>
                <div className="text-2xl font-bold text-red-900">{results.macros.protein.grams}g</div>
                <div className="text-sm text-red-700">{results.macros.protein.percent}%</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 text-center">
                <h5 className="font-semibold text-yellow-800 mb-2">Carbs</h5>
                <div className="text-2xl font-bold text-yellow-900">{results.macros.carbs.grams}g</div>
                <div className="text-sm text-yellow-700">{results.macros.carbs.percent}%</div>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-center">
                <h5 className="font-semibold text-purple-800 mb-2">Fats</h5>
                <div className="text-2xl font-bold text-purple-900">{results.macros.fat.grams}g</div>
                <div className="text-sm text-purple-700">{results.macros.fat.percent}%</div>
              </Card>
            </div>

            {/* Nuri's Insight */}
            <div className="p-6 bg-gradient-to-r from-brandStart/10 to-brandEnd/10 rounded-xl border border-brandStart/20">
              <div className="flex items-start gap-4">
                <NuriAvatar size="sm" mood="excited" animate={false} />
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Nuri's Insight:</h4>
                  <p className="text-gray-700 leading-relaxed">
                    This nutrition plan gives your body the perfect fuel it needs! 
                    {formData.goal === 'muscle' && " Focus on hitting that protein target to support muscle growth."}
                    {formData.goal === 'lose' && " The higher protein will help preserve muscle while you lose fat."}
                    {formData.goal === 'energy' && " These balanced macros will keep your energy steady throughout the day."}
                    {formData.goal === 'health' && " This balanced approach supports overall wellness and vitality."}
                    {(formData.goal === 'maintain' || formData.goal === 'gain') && " This balanced plan supports your goals while maintaining optimal health."}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 pt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Save Plan
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button 
                onClick={() => {
                  setCurrentStep(0)
                  setFormData({
                    name: '',
                    age: '',
                    gender: '',
                    height: '',
                    weight: '',
                    activityLevel: '',
                    goal: ''
                  })
                  setResults(null)
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-brandStart to-brandEnd text-white"
              >
                <RefreshCw className="w-4 h-4" />
                Start Over
              </Button>
            </div>
          </div>
        ) : null

      default:
        return null
    }
  }
}

export default NuriAssistant