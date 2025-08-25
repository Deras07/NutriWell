import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles, Leaf, Heart, Sun, Target, Zap, MessageCircle, Plus, Camera, Search, Trophy, Users, Calendar, TrendingUp, Droplets, Apple, Utensils, Coffee, ChefHat, BarChart3, ShoppingCart, Clock, Star } from 'lucide-react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const NuriAssistant = () => {
  const [showEmojiCards, setShowEmojiCards] = useState(false)
  const [userMood, setUserMood] = useState(null)
  const [chatStarted, setChatStarted] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [showNutritionDashboard, setShowNutritionDashboard] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')

  const [nuriExpression, setNuriExpression] = useState('happy')
  const [isBlinking, setIsBlinking] = useState(false)

  // Conversational onboarding flow state
  const [onboardingData, setOnboardingData] = useState({
    age: '',
    biologicalSex: '',
    height: '',
    weight: '',
    mainGoal: '',
    activityLevel: '',
    eatingStyle: [],
    mealsPerDay: '',
    waterIntake: '',
    allergies: '',
    digestion: ''
  })
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showThinkingAnimation, setShowThinkingAnimation] = useState(false)
  const [onboardingComplete, setOnboardingComplete] = useState(false)

  // Results reveal state
  const [showResults, setShowResults] = useState(false)
  const [currentResultSection, setCurrentResultSection] = useState(0)
  const [resultsData, setResultsData] = useState(null)

  // Premium upsell state
  const [showPremiumUpsell, setShowPremiumUpsell] = useState(false)
  const [currentPremiumStep, setCurrentPremiumStep] = useState(0)
  const [showSneakPeek, setShowSneakPeek] = useState(false)
  const [premiumChoice, setPremiumChoice] = useState(null)
  
  // Navigation state
  const [currentView, setCurrentView] = useState('dashboard') // 'dashboard', 'services', 'chat', 'profile'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [timePeriod, setTimePeriod] = useState('week') // 'week', 'month', 'quarter'

  // Onboarding questions flow
  const onboardingQuestions = [
    {
      id: 'welcome',
      type: 'welcome',
      message: "Hey there, ☀️ I'm Nuri — your nutrition buddy! I'll guide you to discover what your body really needs 🌱 Ready for your free health blueprint?",
      options: ['Yes!']
    },
    {
      id: 'intro',
      type: 'message',
      message: "Awesome! We'll keep it simple and fun. Just a few quick questions to unlock your personalized results 🧠🍎"
    },
    {
      id: 'age',
      type: 'input',
      message: "How old are you? (This helps me understand your energy needs 🧬)",
      field: 'age',
      placeholder: 'Enter your age'
    },
    {
      id: 'biologicalSex',
      type: 'select',
      message: "And what's your biological sex or hormonal profile? (Just choosing one helps tailor your results!)",
      field: 'biologicalSex',
      options: ['Female', 'Male', 'Intersex', 'Prefer not to say', 'Custom']
    },
    {
      id: 'height',
      type: 'input',
      message: "Great! Now, how tall are you in cm or feet/inches?",
      field: 'height',
      placeholder: 'e.g., 170 cm or 5\'7"'
    },
    {
      id: 'weight',
      type: 'input',
      message: "What's your current weight?",
      field: 'weight',
      placeholder: 'e.g., 70 kg or 154 lbs'
    },
    {
      id: 'mainGoal',
      type: 'select',
      message: "Let's align this with your goals 🌟 What's your main focus right now?",
      field: 'mainGoal',
      options: ['Lose fat', 'Build muscle', 'Maintain health', 'Improve energy', 'Heal chronic issues']
    },
    {
      id: 'activityLevel',
      type: 'select',
      message: "How active are you on most days?",
      field: 'activityLevel',
      options: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Athlete']
    },
    {
      id: 'eatingStyle',
      type: 'multiSelect',
      message: "Do you currently follow any of these eating styles?",
      field: 'eatingStyle',
      options: ['Vegetarian', 'Vegan', 'Keto', 'Intermittent Fasting', 'I just eat normally']
    },
    {
      id: 'mealsPerDay',
      type: 'select',
      message: "How often do you eat per day, on average?",
      field: 'mealsPerDay',
      options: ['2 meals', '3 meals', '3+ snacks', 'I skip meals sometimes']
    },
    {
      id: 'waterIntake',
      type: 'select',
      message: "How much water do you drink daily?",
      field: 'waterIntake',
      options: ['<1L', '1–2L', '2–3L', '>3L', 'Not sure']
    },
    {
      id: 'allergies',
      type: 'input',
      message: "Any allergies or foods you avoid?",
      field: 'allergies',
      placeholder: 'e.g., nuts, dairy, gluten, or "none"'
    },
    {
      id: 'digestion',
      type: 'select',
      message: "How's your digestion usually?",
      field: 'digestion',
      options: ['Smooth', 'Sometimes bloated', 'Constipation', 'Loose stools', 'No idea']
    },
    {
      id: 'processing',
      type: 'processing',
      message: "Perfect! I've crunched the numbers and matched it to real health science 🔬 Give me 3 seconds… 🚀"
    }
  ]



  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 8000)
    return () => clearInterval(blinkInterval)
  }, [])



  const handleMoodSelection = (mood) => {
    setUserMood(mood)
    setShowEmojiCards(false)
    setChatStarted(true)
  }

  // Onboarding flow handlers
  const handleOnboardingStart = () => {
    setShowOnboarding(true)
    setCurrentQuestion(0)
    setOnboardingComplete(false)
  }

  const handleOnboardingAnswer = (answer) => {
    const currentQ = onboardingQuestions[currentQuestion]
    
    if (currentQ.type === 'multiSelect') {
      const currentValues = onboardingData[currentQ.field] || []
      const newValues = currentValues.includes(answer) 
        ? currentValues.filter(item => item !== answer)
        : [...currentValues, answer]
      
      setOnboardingData(prev => ({
        ...prev,
        [currentQ.field]: newValues
      }))
    } else {
      setOnboardingData(prev => ({
        ...prev,
        [currentQ.field]: answer
      }))
    }

    // Move to next question
    setTimeout(() => {
      if (currentQuestion < onboardingQuestions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        // Processing animation
        setShowThinkingAnimation(true)
        setTimeout(() => {
          const results = generateResults(onboardingData)
          setResultsData(results)
          setOnboardingComplete(true)
          setShowThinkingAnimation(false)
          setShowResults(true)
          setShowOnboarding(false)
        }, 3000)
      }
    }, 500)
  }

  const handleInputSubmit = (value) => {
    handleOnboardingAnswer(value)
  }

  const getCurrentQuestion = () => {
    return onboardingQuestions[currentQuestion]
  }

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / onboardingQuestions.length) * 100
  }

  // Generate personalized results based on onboarding data
  const generateResults = (userData) => {
    const age = parseInt(userData.age) || 30
    const weight = parseFloat(userData.weight) || 70
    const height = parseFloat(userData.height) || 170
    const activityLevel = userData.activityLevel || 'Moderately Active'
    const mainGoal = userData.mainGoal || 'Maintain health'

    // Calculate BMR using Mifflin-St Jeor Equation
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5
    let tdee = bmr * 1.2 // Sedentary base

    // Adjust for activity level
    switch (activityLevel) {
      case 'Lightly Active': tdee = bmr * 1.375; break
      case 'Moderately Active': tdee = bmr * 1.55; break
      case 'Very Active': tdee = bmr * 1.725; break
      case 'Athlete': tdee = bmr * 1.9; break
    }

    // Adjust for goals
    switch (mainGoal) {
      case 'Lose fat': tdee *= 0.85; break
      case 'Build muscle': tdee *= 1.1; break
    }

    // Calculate macros
    const protein = weight * 2.2 // 1g per lb
    const fat = (tdee * 0.25) / 9 // 25% of calories
    const carbs = (tdee - (protein * 4) - (fat * 9)) / 4

    // Calculate hydration
    const waterNeeds = weight * 0.033 // 33ml per kg

    return {
      calories: Math.round(tdee),
      macros: {
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat)
      },
      hydration: {
        dailyGoal: Math.round(waterNeeds * 100) / 100,
        reminders: ['7:00 AM', '10:00 AM', '12:00 PM', '3:00 PM', '6:00 PM', '8:00 PM']
      },
      mealTiming: {
        breakfast: '8:00 AM',
        lunch: '12:30 PM',
        dinner: '6:00 PM',
        snacks: ['10:30 AM', '3:30 PM']
      },
      foodCompatibility: {
        green: ['Salmon', 'Berries', 'Spinach', 'Quinoa', 'Avocado', 'Greek Yogurt'],
        yellow: ['Cheese', 'White Bread', 'Bananas', 'Pasta', 'Nuts'],
        red: ['Processed Meats', 'Fried Foods', 'Soda', 'Candy', 'White Sugar']
      }
    }
  }

  // Results sections with Nuri's scripted messages
  const resultsSections = [
    {
      id: 'macros',
      title: 'Macro Breakdown',
      icon: '🍽️',
      nuriMessage: "Based on your profile, here's your personalized macro balance! I've matched this to trusted science from Health Canada, MyPlate, and the NIH 🧬",
      premiumHook: "This is your foundation — Premium unlocks dynamic targets based on sleep, stress, and training recovery 💪"
    },
    {
      id: 'hydration',
      title: 'Hydration Needs',
      icon: '💧',
      nuriMessage: "Your body is mostly water 💧 Here's how much YOU need to thrive — calculated from your weight, age, and activity!",
      premiumHook: "Premium adapts hydration to your sleep, caffeine intake, and climate ☀️🌧️"
    },
    {
      id: 'timing',
      title: 'Meal Timing',
      icon: '⏰',
      nuriMessage: "Let's sync your meals with your natural rhythm. Meal timing affects energy, focus, and fat storage! ⏳",
      premiumHook: "Premium gives you meal timing based on circadian rhythm and workout schedules 🧘‍♂️⏰"
    },
    {
      id: 'compatibility',
      title: 'Food Compatibility',
      icon: '🛑',
      nuriMessage: "Not every 'healthy' food fits everyone. Here's your personalized food compatibility — simplified with science ❤️💡",
      premiumHook: "Premium unlocks 47 more insights — including inflammation triggers, gut reactions, and food synergy for your body type."
    }
  ]

  // Premium benefits with Nuri's scripted messages
  const premiumBenefits = [
    {
      id: 'micronutrients',
      title: '🔬 Micronutrient Analysis',
      icon: '🔬',
      nuriMessage: "Discover your unique needs for vitamins like D, B12, and iron — based on science from the NIH & Health Canada!",
      description: "Personalized vitamin and mineral recommendations",
      visual: 'radar-chart',
      tooltip: "Low in magnesium? Let's fix that.",
      backedBy: "NIH & Health Canada"
    },
    {
      id: 'hormonal',
      title: '🤰 Hormonal Health Tracking',
      icon: '🤰',
      nuriMessage: "Optimize your cycle, stress hormones, and thyroid-supportive nutrients — especially important if you're managing energy or weight.",
      description: "Cycle-aware nutrition and hormone optimization",
      visual: 'hormone-chart',
      tooltip: "Add cycle data for deeper analysis",
      backedBy: "PHAC & NIH"
    },
    {
      id: 'inflammation',
      title: '🧬 Inflammation & Gut Insights',
      icon: '🧬',
      nuriMessage: "Gut health affects everything. Let's check foods that may be causing inflammation — and find swaps that soothe.",
      description: "Inflammation-trigger identification and gut health",
      visual: 'gut-chart',
      tooltip: "Log gut symptoms for advanced results",
      backedBy: "NHS & CDC"
    },
    {
      id: 'meal-planning',
      title: '🍱 Smart Meal Planning',
      icon: '🍱',
      nuriMessage: "Premium gives you daily meal guides that adjust with your lifestyle — and support your unique macros, goals, and sensitivities.",
      description: "Adaptive meal plans with lifestyle integration",
      visual: 'meal-carousel',
      tooltip: "Vegetarian mode, Anti-inflammatory, Quick meals",
      backedBy: "USDA MyPlate & Health Canada"
    },
    {
      id: 'adaptive',
      title: '🔁 Adaptive Health Engine',
      icon: '🔁',
      nuriMessage: "Your body changes — Premium adapts. Whether you slept 4 hours or crushed a workout, we update your daily needs in real time.",
      description: "Real-time nutrition adjustments based on daily factors",
      visual: 'gauge-recalc',
      tooltip: "Auto-adjusts based on sleep, activity, stress and hydration",
      backedBy: "Real-time health data integration"
    }
  ]

  const emojiCards = [
    { emoji: "😴", label: "Terrible", value: "terrible" },
    { emoji: "😐", label: "Not great", value: "not-great" },
    { emoji: "😊", label: "Pretty good", value: "pretty-good" },
    { emoji: "😄", label: "Great!", value: "great" }
  ]

  // Nutrition data
  const nutritionData = {
    calories: { current: 1200, goal: 2000, unit: 'kcal' },
    protein: { current: 65, goal: 120, unit: 'g' },
    carbs: { current: 150, goal: 250, unit: 'g' },
    fat: { current: 45, goal: 65, unit: 'g' },
    water: { current: 6, goal: 8, unit: 'glasses' }
  }

  // Wellness data structure
  const wellnessData = {
    sleep: [7.2, 8.1, 6.5, 7.8, 8.3, 7.1, 7.9],
    activity: [65, 78, 45, 82, 71, 88, 76],
    nutrition: [85, 72, 91, 68, 79, 84, 77]
  }

  // Wellness chart data
  const wellnessChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Sleep Quality',
        data: wellnessData.sleep,
        borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#6B7280',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        fill: true,
      },
      {
        label: 'Activity Level',
        data: wellnessData.activity,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#4CAF50',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        fill: true,
      },
      {
        label: 'Nutrition Score',
        data: wellnessData.nutrition,
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#2D2D2D',
          font: {
            size: 14,
            weight: '600',
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 24,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.98)',
        titleColor: '#2D2D2D',
        bodyColor: '#2D2D2D',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: '600',
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
      },
    },
    scales: {
      x: {
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
        },
        ticks: {
          color: '#6C757D',
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      y: {
        grid: {
          color: '#E5E7EB',
          drawBorder: false,
        },
        ticks: {
          color: '#6C757D',
          font: {
            size: 12,
            weight: '500',
          },
        },
        min: 0,
        max: 100,
      },
    },
    elements: {
      point: {
        radius: 6,
        hoverRadius: 8,
        borderWidth: 2,
        borderColor: '#FFFFFF',
      },
      line: {
        tension: 0.4,
        borderWidth: 3,
      },
    },
  }

  // Recent foods
  const recentFoods = [
    { name: 'Oatmeal', calories: 150, icon: '🥣' },
    { name: 'Chicken Salad', calories: 320, icon: '🥗' },
    { name: 'Apple', calories: 95, icon: '🍎' },
    { name: 'Greek Yogurt', calories: 130, icon: '🥛' }
  ]

  // Achievement badges
  const achievements = [
    { name: 'Hydration Hero', icon: '💧', earned: true },
    { name: 'Protein Power', icon: '💪', earned: true },
    { name: 'Veggie Master', icon: '🥬', earned: false },
    { name: 'Meal Planner', icon: '📅', earned: true }
  ]

  // Community challenges
  const challenges = [
    { title: '7-Day Hydration', participants: 234, progress: 85 },
    { title: 'Protein Week', participants: 156, progress: 60 },
    { title: 'Veggie Challenge', participants: 89, progress: 30 }
  ]



  const onboardingSteps = [
    {
      title: "Welcome to Nutriwell!",
      description: "Let's set up your personalized nutrition journey",
      icon: "🌱"
    },
    {
      title: "Your Goals",
      description: "What's your main nutrition goal?",
      icon: "🎯"
    },
    {
      title: "Dietary Preferences",
      description: "Any allergies or dietary restrictions?",
      icon: "🥗"
    },
    {
      title: "Activity Level",
      description: "How active are you on a typical day?",
      icon: "🏃‍♀️"
    }
  ]

  const handleOnboardingNext = () => {
    if (onboardingStep < onboardingSteps.length - 1) {
      setOnboardingStep(onboardingStep + 1)
    } else {
      setShowOnboarding(false)
      setShowNutritionDashboard(true)
    }
  }

  const handleOnboardingSkip = () => {
    setShowOnboarding(false)
    setShowNutritionDashboard(true)
  }

  const ProgressRing = ({ progress, size = 60, strokeWidth = 6, color = "#4ADE80" }) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (progress / 100) * circumference

    return (
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#374151"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="opacity-30"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold text-white">{Math.round(progress)}%</span>
        </div>

        {/* Mobile Bottom Drawer for Sidebar Content */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-white/30 shadow-lg">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[16px] font-medium text-[#2D2D2D]">Today's Progress</h3>
              <button className="p-2 rounded-lg text-[#6C757D] hover:bg-[#F8F9FA] transition-colors duration-200">
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>
            
            {/* Mobile Progress Cards */}
                          <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 border border-white/30 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-4 h-4 text-orange-500" />
                    <span className="text-[12px] font-medium text-[#2D2D2D]">Energy</span>
                  </div>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-medium">Moderate</span>
                </div>
                
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 border border-white/30 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-lg">😊</div>
                    <span className="text-[12px] font-medium text-[#2D2D2D]">Mood</span>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">High</span>
                </div>
                
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 border border-white/30 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-4 h-4 text-pink-500" />
                    <span className="text-[12px] font-medium text-[#2D2D2D]">Focus</span>
                  </div>
                  <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs font-medium">Low</span>
                </div>
              </div>
          </div>
        </div>
      </div>
    )
  }

  // Premium upsell handlers
  const handlePremiumIntro = () => {
    setShowPremiumUpsell(true)
    setCurrentPremiumStep(0)
  }

  const handlePremiumChoice = (choice) => {
    setPremiumChoice(choice)
    if (choice === 'sneak-peek') {
      setShowSneakPeek(true)
    } else {
      // Handle direct upgrade
      console.log('User chose direct upgrade')
    }
  }

  const handleNextPremiumStep = () => {
    if (currentPremiumStep < premiumBenefits.length - 1) {
      setCurrentPremiumStep(prev => prev + 1)
    } else {
      // Show decision modal
      setCurrentPremiumStep('decision')
    }
  }

  const handleSneakPeekComplete = () => {
    setShowSneakPeek(false)
    setCurrentPremiumStep('decision')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">


      {/* Responsive Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-white/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4CAF50] to-green-600 rounded-full flex items-center justify-center shadow-md">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#2D2D2D] tracking-tight">Nutriwell</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                { id: 'services', label: 'Services', icon: '🛠️' },
                { id: 'chat', label: 'Chat', icon: '💬' },
                { id: 'profile', label: 'Profile', icon: '👤' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setCurrentView(tab.id)}
                  className={`px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    currentView === tab.id
                      ? 'bg-[#4CAF50] text-white shadow-md'
                      : 'text-[#6C757D] hover:text-[#2D2D2D] hover:bg-[#F8F9FA]'
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span className="text-sm hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2D2D2D] hover:bg-[#F8F9FA] transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <div className={`w-5 h-0.5 bg-current transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-current mt-1 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-current mt-1 transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/30 shadow-lg"
            >
              <nav className="px-4 py-4 space-y-2">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                  { id: 'services', label: 'Services', icon: '🛠️' },
                  { id: 'chat', label: 'Chat', icon: '💬' },
                  { id: 'profile', label: 'Profile', icon: '👤' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setCurrentView(tab.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-3 text-left ${
                      currentView === tab.id
                        ? 'bg-[#4CAF50] text-white shadow-md'
                        : 'text-[#6C757D] hover:text-[#2D2D2D] hover:bg-[#F8F9FA]'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="text-base">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



      {/* Conversational Onboarding Flow */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-lg w-full border border-white/30">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-white/70 mb-2">
                  <span>Step {currentQuestion + 1} of {onboardingQuestions.length}</span>
                  <span>{Math.round(getProgressPercentage())}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <motion.div 
                    className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${getProgressPercentage()}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Nuri Chat Bubble */}
              <motion.div 
                className="flex items-start gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* Nuri Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white text-xl">
                    🌱
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-green-300/50 animate-pulse"></div>
                </div>
                
                {/* Chat Message */}
                <div className="flex-1">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <p className="text-gray-800 text-lg leading-relaxed">
                      {getCurrentQuestion()?.message}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* User Response Options */}
              <AnimatePresence mode="wait">
                {getCurrentQuestion()?.type === 'welcome' && (
                  <motion.div
                    key="welcome"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={() => handleOnboardingAnswer('Yes!')}
                      className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Yes!
                    </button>
                  </motion.div>
                )}

                {getCurrentQuestion()?.type === 'message' && (
                  <motion.div
                    key="message"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={() => handleOnboardingAnswer('Continue')}
                      className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {getCurrentQuestion()?.type === 'input' && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <input
                      type="text"
                      placeholder={getCurrentQuestion()?.placeholder}
                      className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleInputSubmit(e.target.value)
                          e.target.value = ''
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.querySelector('input[type="text"]')
                        if (input?.value) {
                          handleInputSubmit(input.value)
                          input.value = ''
                        }
                      }}
                      className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
                    >
                      Next
                    </button>
                  </motion.div>
                )}

                {getCurrentQuestion()?.type === 'select' && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    {getCurrentQuestion()?.options?.map((option, index) => (
                      <motion.button
                        key={option}
                        onClick={() => handleOnboardingAnswer(option)}
                        className="w-full bg-white/80 backdrop-blur-sm rounded-xl p-4 text-left text-gray-800 hover:bg-white/90 transition-all duration-300 border border-white/50"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                      </motion.button>
                    ))}
                  </motion.div>
                )}

                {getCurrentQuestion()?.type === 'multiSelect' && (
                  <motion.div
                    key="multiSelect"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-3"
                  >
                    {getCurrentQuestion()?.options?.map((option, index) => (
                      <motion.button
                        key={option}
                        onClick={() => handleOnboardingAnswer(option)}
                        className={`w-full backdrop-blur-sm rounded-xl p-4 text-left transition-all duration-300 border ${
                          (onboardingData[getCurrentQuestion()?.field] || []).includes(option)
                            ? 'bg-green-400/80 text-white border-green-300'
                            : 'bg-white/80 text-gray-800 border-white/50 hover:bg-white/90'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {option}
                        {(onboardingData[getCurrentQuestion()?.field] || []).includes(option) && (
                          <span className="float-right">✓</span>
                        )}
                      </motion.button>
                    ))}
                    <button
                      onClick={() => handleOnboardingAnswer('Continue')}
                      className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 mt-4"
                    >
                      Continue
                    </button>
                  </motion.div>
                )}

                {getCurrentQuestion()?.type === 'processing' && (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full"
                      />
                    </div>
                    <p className="text-white/80 text-lg">Processing your personalized results...</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Reveal Interface */}
      <AnimatePresence>
        {showResults && resultsData && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-4xl w-full border border-white/30 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.h1 
                  className="text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Your Personalized Results 🌟
                </motion.h1>
                <motion.p 
                  className="text-white/80 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Based on your unique profile, here's what your body needs
                </motion.p>
              </div>

              {/* Results Sections */}
              <div className="space-y-8">
                {resultsSections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.2 }}
                  >
                    {/* Section Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{section.icon}</div>
                      <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                    </div>

                    {/* Nuri Message */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white text-lg">
                          🌱
                        </div>
                        <div className="absolute inset-0 rounded-full border-2 border-green-300/50 animate-pulse"></div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
                          <p className="text-gray-800 text-lg leading-relaxed">
                            {section.nuriMessage}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section Content */}
                    {section.id === 'macros' && (
                      <div className="space-y-6">
                        {/* Macro Chart */}
                        <div className="flex justify-center">
                          <div className="relative w-48 h-48">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle
                                cx="96"
                                cy="96"
                                r="80"
                                fill="none"
                                stroke="#FCD34D"
                                strokeWidth="16"
                                strokeDasharray={`${2 * Math.PI * 80 * 0.4} ${2 * Math.PI * 80}`}
                                strokeDashoffset="0"
                              />
                              <circle
                                cx="96"
                                cy="96"
                                r="80"
                                fill="none"
                                stroke="#3B82F6"
                                strokeWidth="16"
                                strokeDasharray={`${2 * Math.PI * 80 * 0.35} ${2 * Math.PI * 80}`}
                                strokeDashoffset={`-${2 * Math.PI * 80 * 0.4}`}
                              />
                              <circle
                                cx="96"
                                cy="96"
                                r="80"
                                fill="none"
                                stroke="#EC4899"
                                strokeWidth="16"
                                strokeDasharray={`${2 * Math.PI * 80 * 0.25} ${2 * Math.PI * 80}`}
                                strokeDashoffset={`-${2 * Math.PI * 80 * 0.75}`}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white">{resultsData.calories}</div>
                                <div className="text-white/70 text-sm">calories</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Macro Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-yellow-400/20 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-300">{resultsData.macros.carbs}g</div>
                            <div className="text-white/80">🍚 Carbs</div>
                            <div className="text-white/60 text-sm">Quick energy fuel</div>
                          </div>
                          <div className="bg-blue-400/20 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-blue-300">{resultsData.macros.protein}g</div>
                            <div className="text-white/80">🥩 Protein</div>
                            <div className="text-white/60 text-sm">Muscle-building blocks</div>
                          </div>
                          <div className="bg-pink-400/20 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-pink-300">{resultsData.macros.fat}g</div>
                            <div className="text-white/80">🥑 Fats</div>
                            <div className="text-white/60 text-sm">Hormone & brain support</div>
                          </div>
                        </div>

                        {/* Example Foods */}
                        <div className="bg-white/10 rounded-xl p-4">
                          <h3 className="text-white font-semibold mb-3">Example Foods</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                            <div>
                              <div className="text-yellow-300 font-medium">Protein:</div>
                              <div className="text-white/70">Chicken breast, lentils, tofu</div>
                            </div>
                            <div>
                              <div className="text-blue-300 font-medium">Carbs:</div>
                              <div className="text-white/70">Rice, oats, sweet potato</div>
                            </div>
                            <div>
                              <div className="text-pink-300 font-medium">Fats:</div>
                              <div className="text-white/70">Avocado, olive oil, almonds</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'hydration' && (
                      <div className="space-y-6">
                        {/* Water Bottle Animation */}
                        <div className="flex justify-center">
                          <div className="relative w-32 h-48 bg-white/20 rounded-2xl border-4 border-white/30">
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 bg-blue-400/60 rounded-b-xl"
                              initial={{ height: 0 }}
                              animate={{ height: `${(resultsData.hydration.dailyGoal / 3) * 100}%` }}
                              transition={{ duration: 2, delay: 0.5 }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-white">{resultsData.hydration.dailyGoal}L</div>
                                <div className="text-white/70 text-sm">daily goal</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hydration Reminders */}
                        <div className="bg-white/10 rounded-xl p-4">
                          <h3 className="text-white font-semibold mb-3">💧 Hydration Reminders</h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {resultsData.hydration.reminders.map((time, index) => (
                              <div key={index} className="bg-blue-400/20 rounded-lg p-2 text-center">
                                <div className="text-blue-300 font-medium">{time}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Benefits */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">✨</div>
                            <div className="text-white font-medium">Glowing skin</div>
                          </div>
                          <div className="bg-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">🔋</div>
                            <div className="text-white font-medium">Stable energy</div>
                          </div>
                          <div className="bg-white/10 rounded-xl p-4 text-center">
                            <div className="text-2xl mb-2">🧠</div>
                            <div className="text-white font-medium">Clearer focus</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'timing' && (
                      <div className="space-y-6">
                        {/* Meal Timing Grid */}
                        <div className="bg-white/10 rounded-xl p-4">
                          <h3 className="text-white font-semibold mb-4">⏰ Your Optimal Meal Schedule</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">🌅</div>
                                <div>
                                  <div className="text-white font-medium">Breakfast</div>
                                  <div className="text-white/60 text-sm">Start your day right</div>
                                </div>
                              </div>
                              <div className="text-white font-bold">{resultsData.mealTiming.breakfast}</div>
                            </div>
                            <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">☀️</div>
                                <div>
                                  <div className="text-white font-medium">Lunch</div>
                                  <div className="text-white/60 text-sm">Midday fuel</div>
                                </div>
                              </div>
                              <div className="text-white font-bold">{resultsData.mealTiming.lunch}</div>
                            </div>
                            <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">🌙</div>
                                <div>
                                  <div className="text-white font-medium">Dinner</div>
                                  <div className="text-white/60 text-sm">Light evening meal</div>
                                </div>
                              </div>
                              <div className="text-white font-bold">{resultsData.mealTiming.dinner}</div>
                            </div>
                          </div>
                        </div>

                        {/* Portion Guide */}
                        <div className="bg-white/10 rounded-xl p-4">
                          <h3 className="text-white font-semibold mb-3">👐 Portion Guide</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-3xl mb-2">🤲</div>
                              <div className="text-white font-medium">1 palm = protein</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl mb-2">👊</div>
                              <div className="text-white font-medium">1 fist = carbs</div>
                            </div>
                            <div className="text-center">
                              <div className="text-3xl mb-2">👍</div>
                              <div className="text-white font-medium">1 thumb = fat</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 'compatibility' && (
                      <div className="space-y-6">
                        {/* Traffic Light Chart */}
                        <div className="space-y-4">
                          <div className="bg-green-400/20 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="text-2xl">🟢</div>
                              <div className="text-white font-semibold">Best for your goals</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {resultsData.foodCompatibility.green.map((food, index) => (
                                <div key={index} className="bg-green-400/30 rounded-lg p-2 text-center text-white">
                                  {food}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-yellow-400/20 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="text-2xl">🟡</div>
                              <div className="text-white font-semibold">Okay in moderation</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {resultsData.foodCompatibility.yellow.map((food, index) => (
                                <div key={index} className="bg-yellow-400/30 rounded-lg p-2 text-center text-white">
                                  {food}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-red-400/20 rounded-xl p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="text-2xl">🔴</div>
                              <div className="text-white font-semibold">Limit due to your profile</div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {resultsData.foodCompatibility.red.map((food, index) => (
                                <div key={index} className="bg-red-400/30 rounded-lg p-2 text-center text-white">
                                  {food}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Swap Suggestions */}
                        <div className="bg-white/10 rounded-xl p-4">
                          <h3 className="text-white font-semibold mb-3">💡 Smart Swaps</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3">
                              <div className="text-red-400">❌</div>
                              <div className="text-white/70">Soda</div>
                              <div className="text-white/50">→</div>
                              <div className="text-green-400">✅</div>
                              <div className="text-white/70">Sparkling water + lime</div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-red-400">❌</div>
                              <div className="text-white/70">White rice</div>
                              <div className="text-white/50">→</div>
                              <div className="text-green-400">✅</div>
                              <div className="text-white/70">Quinoa or lentils</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Premium Hook */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-300/30">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">💎</div>
                        <div>
                          <p className="text-white/90 text-lg">{section.premiumHook}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Final CTA */}
              <motion.div 
                className="mt-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-300/30 mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">This is just the beginning! 🌟</h3>
                  <p className="text-white/90 text-lg mb-4">
                    Your body deserves the full picture. Premium unlocks:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="text-green-400">✅</div>
                      <div className="text-white">In-depth micronutrient analysis</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-green-400">🧬</div>
                      <div className="text-white">Gut & inflammation compatibility</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-green-400">🧘</div>
                      <div className="text-white">Smart meal plans + food tracking</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-green-400">🔄</div>
                      <div className="text-white">Adaptive daily recalculations</div>
                    </div>
                  </div>
                  <motion.button
                    onClick={handlePremiumIntro}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ✨ See My Full Health Blueprint (Upgrade to Premium)
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Upsell Interface */}
      <AnimatePresence>
        {showPremiumUpsell && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-4xl w-full border border-white/30 max-h-[90vh] overflow-y-auto">
              {/* Premium Intro */}
              {currentPremiumStep === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl">
                        🌱
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-purple-300/50 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <motion.h1 
                    className="text-4xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    💡 What Premium Unlocks for You
                  </motion.h1>
                  
                  <motion.div 
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-gray-800 text-xl leading-relaxed">
                      Hey there! You've already got an amazing foundation. But your health deserves the full story — tailored just for YOU!
                    </p>
                  </motion.div>

                  <motion.button
                    onClick={handleNextPremiumStep}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Discover Premium Benefits ✨
                  </motion.button>
                </motion.div>
              )}

              {/* Premium Benefits Walkthrough */}
              {typeof currentPremiumStep === 'number' && currentPremiumStep > 0 && currentPremiumStep < premiumBenefits.length && (
                <motion.div
                  key={currentPremiumStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="space-y-6"
                >
                  {/* Progress Indicator */}
                  <div className="flex justify-center mb-6">
                    <div className="flex space-x-2">
                      {premiumBenefits.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full ${
                            index <= currentPremiumStep ? 'bg-purple-400' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Current Benefit */}
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{premiumBenefits[currentPremiumStep].icon}</div>
                    <h2 className="text-3xl font-bold text-white mb-4">{premiumBenefits[currentPremiumStep].title}</h2>
                  </div>

                  {/* Nuri Message */}
                  <div className="flex items-start gap-4 mb-8">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white text-lg">
                        🌱
                      </div>
                      <div className="absolute inset-0 rounded-full border-2 border-purple-300/50 animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6">
                        <p className="text-gray-800 text-lg leading-relaxed">
                          {premiumBenefits[currentPremiumStep].nuriMessage}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Representation */}
                  <div className="bg-white/10 rounded-2xl p-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📊</div>
                      <h3 className="text-white font-semibold text-xl mb-2">
                        {premiumBenefits[currentPremiumStep].description}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {premiumBenefits[currentPremiumStep].tooltip}
                      </p>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-white/80 text-sm">Backed by:</div>
                      <div className="text-white font-medium">{premiumBenefits[currentPremiumStep].backedBy}</div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentPremiumStep(prev => Math.max(0, prev - 1))}
                      className="px-6 py-3 text-white/70 hover:text-white transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextPremiumStep}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300"
                    >
                      {currentPremiumStep === premiumBenefits.length - 1 ? 'See Options' : 'Next'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Decision Modal */}
              {currentPremiumStep === 'decision' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-8"
                >
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white mb-4">Choose Your Path 🌟</h2>
                    <p className="text-white/80 text-lg">
                      Backed by leading public health sources like Health Canada, NIH, CDC, and USDA.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Option A: Direct Upgrade */}
                    <motion.div
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-300/30"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-4xl mb-4">🔓</div>
                      <h3 className="text-2xl font-bold text-white mb-4">Unlock My Full Blueprint</h3>
                      <p className="text-white/80 mb-6">
                        Get complete access to all premium features and personalized insights.
                      </p>
                      <button
                        onClick={() => handlePremiumChoice('upgrade')}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Start Premium – 7 Days Free
                      </button>
                      <p className="text-white/60 text-sm mt-3">Cancel anytime. No risk. All insight.</p>
                    </motion.div>

                    {/* Option B: Sneak Peek */}
                    <motion.div
                      className="bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-2xl p-6 border border-blue-300/30"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-4xl mb-4">👀</div>
                      <h3 className="text-2xl font-bold text-white mb-4">Show Me a Sneak Peek First</h3>
                      <p className="text-white/80 mb-6">
                        Preview premium insights with sample data to see what you're missing.
                      </p>
                      <button
                        onClick={() => handlePremiumChoice('sneak-peek')}
                        className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white px-6 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                      >
                        Preview Premium Insights
                      </button>
                      <p className="text-white/60 text-sm mt-3">See what you're missing, then decide.</p>
                    </motion.div>
                  </div>

                  {/* Trust Logos */}
                  <div className="flex justify-center items-center gap-6 mt-8">
                    <div className="text-white/40 text-sm">Trusted by:</div>
                    <div className="flex gap-4">
                      <div className="text-white/40 text-xs">Health Canada</div>
                      <div className="text-white/40 text-xs">NIH</div>
                      <div className="text-white/40 text-xs">CDC</div>
                      <div className="text-white/40 text-xs">USDA</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sneak Peek Modal */}
      <AnimatePresence>
        {showSneakPeek && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-4xl w-full border border-white/30 max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">🔬 Sneak Peek: Micronutrient Analysis</h2>
                <p className="text-white/80 text-lg">
                  Here's what Premium insights look like for your unique profile
                </p>
              </div>

              {/* Blurred Content Preview */}
              <div className="space-y-6">
                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">🔬</div>
                    <div>
                      <h3 className="text-white font-semibold text-xl">Your Vitamin D Status</h3>
                      <p className="text-white/70">Based on your location and lifestyle</p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-r from-red-400 to-yellow-400 h-4 rounded-full mb-2">
                      <div className="bg-gradient-to-r from-yellow-400 to-green-400 h-4 rounded-full w-3/4"></div>
                    </div>
                    <div className="flex justify-between text-white/70 text-sm">
                      <span>Low</span>
                      <span>Optimal</span>
                      <span>High</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-400/20 rounded-xl">
                    <p className="text-white text-sm">
                      💡 <strong>Premium Insight:</strong> Your vitamin D levels are suboptimal. 
                      Consider adding fatty fish 2x/week and 15 minutes of sun exposure daily.
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl">🧬</div>
                    <div>
                      <h3 className="text-white font-semibold text-xl">Inflammation Triggers</h3>
                      <p className="text-white/70">Foods that may cause inflammation for you</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-400/20 rounded-lg p-3 text-center">
                      <div className="text-red-400 font-medium">Avoid</div>
                      <div className="text-white/70 text-sm">Processed meats</div>
                    </div>
                    <div className="bg-green-400/20 rounded-lg p-3 text-center">
                      <div className="text-green-400 font-medium">Great for you</div>
                      <div className="text-white/70 text-sm">Salmon, berries</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-300/30">
                  <h3 className="text-[#2D2D2D] font-bold text-xl mb-4">✨ This is just a preview!</h3>
                  <p className="text-[#2D2D2D]/80 mb-6">
                    Premium gives you 47+ more insights like this, plus real-time adjustments 
                    based on your daily health data.
                  </p>
                  <button
                    onClick={handleSneakPeekComplete}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Unlock Full Premium Access
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout - Full Width */}
      <div className="flex min-h-screen pt-16 md:pt-20 relative z-10">
        
        {/* Left Floating Badge - Hidden on Mobile */}
        <div className="fixed top-16 left-6 z-50 hidden md:block">
          <motion.div 
            className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-gray-200"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-[#2D2D2D] font-medium">Nuri is here</span>
              <Leaf className="w-4 h-4 text-[#4CAF50]" />
            </div>
          </motion.div>
        </div>

        {/* Right Floating Onboarding Button - Hidden on Mobile */}
        <div className="fixed top-16 right-6 z-50 hidden md:block">
          <motion.button
            onClick={handleOnboardingStart}
            className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-gray-200 text-[#2D2D2D] font-medium hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-[#2D2D2D]">Start Chat with Nuri</span>
            </div>
          </motion.button>
        </div>

        {/* Center Column - Main Content */}
        <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-6 md:pt-10 pb-32 relative z-20 max-w-7xl mx-auto">
          
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <>
              <div className="text-center mb-8">
                <h1 className="text-[24px] sm:text-[28px] font-semibold mb-4 flex items-center justify-center gap-3 text-[#2D2D2D] leading-tight">
                  Your Daily Wellness Hub
                  <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-[#4CAF50]" />
                </h1>
                <p className="text-[14px] sm:text-[16px] text-[#6C757D] mb-8 leading-relaxed px-4">
                  Track your nutrition, mood, and progress with Nuri
                </p>
                

              </div>

          {/* 🌱 CUTE NURI CHARACTER */}
          <div className="relative mb-8 flex justify-center">
            <motion.div
              className="relative nuri-avatar"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: '120px',
                height: '120px',
                filter: 'drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))'
              }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 via-teal-400/20 to-green-400/20 rounded-full blur-xl animate-pulse-glow"></div>
              
              {/* Cute Nuri character */}
              <div className="relative w-full h-full bg-gradient-to-b from-green-300 to-green-600 rounded-full shadow-xl border-4 border-white/20">
                {/* Cute face */}
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex gap-4">
                  {/* Left eye */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <motion.div 
                      className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"
                      animate={{ 
                        scale: isBlinking ? 0 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                  {/* Right eye */}
                  <div className="relative">
                    <div className="w-3 h-3 bg-black rounded-full"></div>
                    <motion.div 
                      className="absolute top-0.5 left-0.5 w-1 h-1 bg-white rounded-full"
                      animate={{ 
                        scale: isBlinking ? 0 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Happy smile */}
                <motion.div 
                  className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-6 h-2 border-b-2 border-black rounded-full"
                  animate={{
                    scaleY: nuriExpression === 'happy' ? 1.2 : nuriExpression === 'thoughtful' ? 0.8 : 1,
                    rotate: nuriExpression === 'happy' ? 3 : nuriExpression === 'thoughtful' ? -1 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />

                {/* Cute pink cheeks */}
                <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-pink-300/80 rounded-full blur-sm"></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-pink-300/80 rounded-full blur-sm"></div>

                {/* Simple leaf crown */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    className="w-4 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full transform rotate-12"
                    animate={{ rotate: [12, 8, 12] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="w-4 h-6 bg-gradient-to-b from-green-400 to-green-600 rounded-full transform -rotate-12 absolute top-0 left-0"
                    animate={{ rotate: [-12, -8, -12] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  />
                </div>

                {/* Gentle sparkles */}
                <div className="absolute inset-0">
                  {Array.from({ length: 3 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>



          {/* Elegant Nuri Chat Bubble */}
          <motion.div 
            className="w-full max-w-lg mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative">
              {/* Chat bubble tail */}
              <div className="absolute left-4 top-6 w-4 h-4 bg-white/90 border border-white/30 transform rotate-45 backdrop-blur-[25px]"></div>
              
              {/* Main chat bubble */}
              <div className="nuri-chat-bubble bg-white/90 backdrop-blur-[25px] border border-white/30 rounded-[20px] p-6 ml-8 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50 flex-shrink-0">
                    <div className="text-lg">🌱</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#2D2D2D] text-[16px] leading-relaxed font-medium">
                      Good morning! 😊 I'm Nuri, your personal nutrition assistant. Let's start with a few quick questions to personalize your plan!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Premium Quick Actions */}
          <motion.div 
            className="w-full max-w-6xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="section-header text-center mb-12">
              <h2 className="section-title text-[28px] sm:text-[32px] font-bold text-[#2D2D2D] mb-4 leading-tight">Smart Wellness Actions</h2>
              <p className="section-subtitle text-[16px] text-[#6C757D] leading-relaxed max-w-2xl mx-auto">AI-powered insights to optimize your health journey with personalized recommendations</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[20px] p-[1px]">
                  <div className="h-full w-full bg-white/95 backdrop-blur-[10px] rounded-[19px] p-6 relative overflow-hidden">
                    {/* Top gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7]"></div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-200">
                        <Apple className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-[#2D2D2D] font-semibold text-lg mb-2">Smart Meal Log</h4>
                      <p className="text-[#6C757D] text-sm mb-3">AI-powered nutrition tracking</p>
                      
                      {/* Progress indicator */}
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full w-3/4 transition-all duration-300"></div>
                      </div>
                      <span className="text-xs text-[#6C757D]">75% today's goal</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[20px] p-[1px]">
                  <div className="h-full w-full bg-white/95 backdrop-blur-[10px] rounded-[19px] p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7]"></div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-200">
                        <div className="text-2xl">😊</div>
                      </div>
                      <h4 className="text-[#2D2D2D] font-semibold text-lg mb-2">Mood Tracker</h4>
                      <p className="text-[#6C757D] text-sm mb-3">AI emotional insights</p>
                      
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full w-4/5 transition-all duration-300"></div>
                      </div>
                      <span className="text-xs text-[#6C757D]">Feeling Great!</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[20px] p-[1px]">
                  <div className="h-full w-full bg-white/95 backdrop-blur-[10px] rounded-[19px] p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7]"></div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-200">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-[#2D2D2D] font-semibold text-lg mb-2">Chat with Nuri</h4>
                      <p className="text-[#6C757D] text-sm mb-3">24/7 AI wellness coach</p>
                      
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-[#4CAF50] to-green-600 h-2 rounded-full w-full transition-all duration-300"></div>
                      </div>
                      <span className="text-xs text-[#6C757D]">Always available</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[20px] p-[1px]">
                  <div className="h-full w-full bg-white/95 backdrop-blur-[10px] rounded-[19px] p-6 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7]"></div>
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-200">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-[#2D2D2D] font-semibold text-lg mb-2">Progress Analytics</h4>
                      <p className="text-[#6C757D] text-sm mb-3">Advanced health metrics</p>
                      
                      <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full w-5/6 transition-all duration-300"></div>
                      </div>
                      <span className="text-xs text-[#6C757D]">+12% this week</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Revolutionary AI Wellness Analytics */}
          <motion.div 
            className="w-full max-w-7xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="section-header text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#4CAF50]/20 to-green-100/80 rounded-full px-4 py-2 mb-6">
                <span className="text-sm">✨</span>
                <span className="text-sm font-medium text-[#4CAF50]">AI Insights</span>
              </div>
              <h2 className="section-title text-[32px] sm:text-[36px] font-bold text-[#2D2D2D] mb-4 leading-tight">Your Wellness Journey</h2>
              <p className="section-subtitle text-[16px] text-[#6C757D] leading-relaxed max-w-3xl mx-auto mb-8">Advanced analytics powered by machine learning to track your health progress</p>
              
              {/* Premium Time Period Selector */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-lg p-[1px]">
                    <div className="bg-white/95 backdrop-blur-md rounded-[7px] p-1">
                      <div className="flex">
                        {[
                          { id: 'week', label: 'This Week', icon: '📅' },
                          { id: 'month', label: 'This Month', icon: '📆' },
                          { id: 'quarter', label: 'This Quarter', icon: '📊' }
                        ].map((period) => (
                          <button
                            key={period.id}
                            onClick={() => setTimePeriod(period.id)}
                            className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                              timePeriod === period.id
                                ? 'bg-gradient-to-r from-[#4CAF50] to-green-600 text-white shadow-lg transform scale-105'
                                : 'text-[#6C757D] hover:text-[#2D2D2D] hover:bg-white/50'
                            }`}
                          >
                            <span className="text-base">{period.icon}</span>
                            <span>{period.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium Chart Container */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[24px] p-[1px]">
                <div className="h-full w-full bg-white/95 backdrop-blur-[20px] rounded-[23px] p-8 relative overflow-hidden">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(76,175,80,0.3) 1px, transparent 0)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  {/* Chart */}
                  <div className="relative z-10">
                    <div className="h-[350px] sm:h-[450px] lg:h-[550px]">
                      <Line data={wellnessChartData} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            <motion.div 
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
            >
              <div className="stats-card bg-white/90 backdrop-blur-md rounded-xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3F51B5] to-[#5C6BC0] rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-2xl">😴</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D2D2D] text-lg">Sleep Quality</h4>
                    <p className="text-sm text-[#6C757D]">Improving trend</p>
                  </div>
                </div>
                <div className="stat-number text-3xl font-bold text-[#3F51B5] mb-3">7.5 hrs</div>
                <p className="text-sm text-[#6C757D]">+15% from last week</p>
              </div>

              <div className="stats-card bg-white/90 backdrop-blur-md rounded-xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4CAF50] to-[#81C784] rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-2xl">🏃</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D2D2D] text-lg">Activity Level</h4>
                    <p className="text-sm text-[#6C757D]">Peak performance</p>
                  </div>
                </div>
                <div className="stat-number text-3xl font-bold text-[#4CAF50] mb-3">8,542</div>
                <p className="text-sm text-[#6C757D]">steps today</p>
              </div>

              <div className="stats-card bg-white/90 backdrop-blur-md rounded-xl p-8 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF9800] to-[#FFB74D] rounded-xl flex items-center justify-center shadow-lg">
                    <div className="text-2xl">🥗</div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2D2D2D] text-lg">Nutrition Score</h4>
                    <p className="text-sm text-[#6C757D]">Excellent balance</p>
                  </div>
                </div>
                <div className="stat-number text-3xl font-bold text-[#FF9800] mb-3">92/100</div>
                <p className="text-sm text-[#6C757D]">Personal best!</p>
              </div>
            </motion.div>
          </motion.div>

            </>
          )}

          {/* Services View */}
          {currentView === 'services' && (
            <div className="w-full max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-[24px] sm:text-[28px] font-semibold mb-4 text-[#2D2D2D] leading-tight">Premium Wellness Tools</h1>
                <p className="text-[14px] sm:text-[16px] text-[#6C757D] leading-relaxed px-4">
                  Unlock personalized nutrition guidance with our premium features
                </p>
              </div>

              {/* Premium Feature Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                {/* Recipe Generator Pro */}
                <motion.div 
                  className="bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-md">
                      <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[16px] sm:text-xl font-bold text-[#2D2D2D]">Recipe Generator Pro</h3>
                      <p className="text-[#6C757D] text-[12px] sm:text-sm">AI creates custom recipes</p>
                    </div>
                  </div>
                  <p className="text-[#6C757D] text-[12px] sm:text-sm mb-4">Get personalized recipes that match your dietary preferences and nutritional goals.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-500 text-[12px] sm:text-sm font-medium">✨ AI-Powered</span>
                    <motion.button
                      className="bg-[#4CAF50] hover:bg-[#28A745] text-white px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try Free
                    </motion.button>
                  </div>
                </motion.div>

                {/* Health Insights Dashboard */}
                <motion.div 
                  className="bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-[16px] sm:text-xl font-bold text-[#2D2D2D]">Health Insights</h3>
                      <p className="text-[#6C757D] text-[12px] sm:text-sm">Advanced analytics</p>
                    </div>
                  </div>
                  <p className="text-[#6C757D] text-[12px] sm:text-sm mb-4">Discover correlations between food, mood, energy, and sleep.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-500 text-[12px] sm:text-sm font-medium">📊 Analytics</span>
                    <motion.button
                      className="bg-[#4CAF50] hover:bg-[#28A745] text-white px-3 sm:px-4 py-2 rounded-lg text-[12px] sm:text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try Free
                    </motion.button>
                  </div>
                </motion.div>

                {/* Personal Nutrition Coach - Featured */}
                <motion.div 
                  className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-[#4CAF50]/20 to-green-100/80 backdrop-blur-md rounded-xl p-4 sm:p-6 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border-2 border-[#4CAF50]/30 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-200"
                  whileHover={{ y: -2, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#4CAF50] to-green-600 rounded-xl flex items-center justify-center shadow-md">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[16px] sm:text-xl font-bold text-[#2D2D2D]">Personal Coach</h3>
                        <span className="bg-[#4CAF50] text-white text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium">Popular</span>
                      </div>
                      <p className="text-[#6C757D] text-[12px] sm:text-sm">Real-time chat with nutritionists</p>
                    </div>
                  </div>
                  <p className="text-[#6C757D] text-[12px] sm:text-sm mb-4">Get personalized meal plans and real-time guidance from certified nutritionists.</p>
                  <motion.button
                    className="w-full bg-[#4CAF50] hover:bg-[#28A745] text-white px-4 py-3 rounded-lg text-[14px] sm:text-[16px] font-medium shadow-md hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Start Free Trial (7 days)
                  </motion.button>
                </motion.div>
              </div>
            </div>
          )}

          {/* Chat View */}
          {currentView === 'chat' && (
            <div className="w-full max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-[24px] sm:text-[28px] font-semibold mb-4 text-[#2D2D2D] leading-tight">Chat with Nuri</h1>
                <p className="text-[14px] sm:text-[16px] text-[#6C757D] leading-relaxed px-4">
                  Get personalized nutrition advice and guidance
                </p>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/30">
                <MessageCircle className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
                <h3 className="text-[18px] sm:text-[20px] font-medium text-[#2D2D2D] mb-2">Coming Soon</h3>
                <p className="text-[14px] sm:text-[16px] text-[#6C757D]">Chat functionality will be available soon!</p>
              </div>
            </div>
          )}

          {/* Profile View */}
          {currentView === 'profile' && (
            <div className="w-full max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <h1 className="text-[24px] sm:text-[28px] font-semibold mb-4 text-[#2D2D2D] leading-tight">Your Profile</h1>
                <p className="text-[14px] sm:text-[16px] text-[#6C757D] leading-relaxed px-4">
                  Manage your account and preferences
                </p>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/30">
                <Users className="w-16 h-16 text-[#4CAF50] mx-auto mb-4" />
                <h3 className="text-[18px] sm:text-[20px] font-medium text-[#2D2D2D] mb-2">Profile Settings</h3>
                <p className="text-[#6C757D] text-[14px] sm:text-[16px]">Profile management coming soon!</p>
              </div>
            </div>
          )}

          {/* Premium Features Teaser with Glassmorphism */}
          <motion.div 
            className="max-w-4xl w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="bg-gradient-to-r from-purple-200/30 to-pink-200/30 backdrop-blur-md rounded-3xl p-4 mb-6 inline-block border border-white/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-300" />
                <span className="text-sm font-medium text-white">Premium Features</span>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-3">Transform Your Health Journey</h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Unlock personalized nutrition guidance with our premium features designed for your unique health journey.
            </p>

            {/* Premium Feature Cards with Stunning Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Recipe Generator Pro */}
              <motion.div 
                className="relative group cursor-pointer"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '0s'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[24px] p-[1px]">
                  <div className="h-full w-full bg-white/15 backdrop-blur-[20px] rounded-[23px] p-8 relative overflow-hidden">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    
                    {/* Pastel glass icon container - Warm Coral */}
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400/30 to-red-500/20 backdrop-blur-[10px] rounded-[18px] flex items-center justify-center shadow-lg mb-5 border border-white/20 group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                      <ChefHat className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Premium badge */}
                    <div className="bg-yellow-400/20 backdrop-blur-[10px] border border-yellow-400/30 rounded-lg px-3 py-1 text-xs font-semibold text-yellow-700/90 inline-block mb-4">
                      ✨ AI-Powered
                    </div>
                    
                    {/* Enhanced typography */}
                    <h3 className="text-[22px] font-bold text-white/90 mb-3 leading-tight tracking-tight" style={{textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'}}>
                      Recipe Generator Pro
                    </h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed font-medium">
                      AI creates custom recipes based on your ingredients
                    </p>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      Get personalized recipes that match your dietary preferences, available ingredients, and nutritional goals.
                    </p>
                    
                    {/* Premium glassmorphism button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-[#4CAF50]/90 to-green-600/80 backdrop-blur-[10px] border border-white/20 rounded-xl py-3 px-6 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:shadow-xl"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Health Insights Dashboard */}
              <motion.div 
                className="relative group cursor-pointer"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '3s'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[24px] p-[1px]">
                  <div className="h-full w-full bg-white/15 backdrop-blur-[20px] rounded-[23px] p-8 relative overflow-hidden">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    
                    {/* Pastel glass icon container - Soft Purple */}
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-500/20 backdrop-blur-[10px] rounded-[18px] flex items-center justify-center shadow-lg mb-5 border border-white/20 group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Premium badge */}
                    <div className="bg-blue-400/20 backdrop-blur-[10px] border border-blue-400/30 rounded-lg px-3 py-1 text-xs font-semibold text-blue-700/90 inline-block mb-4">
                      📊 Advanced Analytics
                    </div>
                    
                    {/* Enhanced typography */}
                    <h3 className="text-[22px] font-bold text-white/90 mb-3 leading-tight tracking-tight" style={{textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'}}>
                      Health Insights Dashboard
                    </h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed font-medium">
                      Advanced analytics & correlations
                    </p>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      Discover correlations between food, mood, energy, sleep, and biomarkers with detailed analytics.
                    </p>
                    
                    {/* Premium glassmorphism button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-[#4CAF50]/90 to-green-600/80 backdrop-blur-[10px] border border-white/20 rounded-xl py-3 px-6 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:shadow-xl"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Personal Nutrition Coach */}
              <motion.div 
                className="relative group cursor-pointer"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '1.5s'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[24px] p-[1px]">
                  <div className="h-full w-full bg-white/15 backdrop-blur-[20px] rounded-[23px] p-8 relative overflow-hidden">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    
                    {/* Pastel glass icon container - Fresh Mint */}
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400/30 to-teal-500/20 backdrop-blur-[10px] rounded-[18px] flex items-center justify-center shadow-lg mb-5 border border-white/20 group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Premium badge */}
                    <div className="bg-green-400/20 backdrop-blur-[10px] border border-green-400/30 rounded-lg px-3 py-1 text-xs font-semibold text-green-700/90 inline-block mb-4">
                      👨‍⚕️ Expert Guidance
                    </div>
                    
                    {/* Enhanced typography */}
                    <h3 className="text-[22px] font-bold text-white/90 mb-3 leading-tight tracking-tight" style={{textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'}}>
                      Personal Nutrition Coach
                    </h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed font-medium">
                      Real-time chat with certified nutritionists
                    </p>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      Get personalized meal plans and real-time guidance from certified nutritionists.
                    </p>
                    
                    {/* Premium glassmorphism button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-[#4CAF50]/90 to-green-600/80 backdrop-blur-[10px] border border-white/20 rounded-xl py-3 px-6 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:shadow-xl"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Smart Grocery Assistant */}
              <motion.div 
                className="relative group cursor-pointer"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                style={{
                  animation: 'float 6s ease-in-out infinite',
                  animationDelay: '4.5s'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[24px] p-[1px]">
                  <div className="h-full w-full bg-white/15 backdrop-blur-[20px] rounded-[23px] p-8 relative overflow-hidden">
                    {/* Top gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    
                    {/* Pastel glass icon container - Sunny Yellow */}
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-500/20 backdrop-blur-[10px] rounded-[18px] flex items-center justify-center shadow-lg mb-5 border border-white/20 group-hover:scale-110 group-hover:rotate-5 transition-all duration-300">
                      <ShoppingCart className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Premium badge */}
                    <div className="bg-yellow-400/20 backdrop-blur-[10px] border border-yellow-400/30 rounded-lg px-3 py-1 text-xs font-semibold text-yellow-700/90 inline-block mb-4">
                      🛒 Smart Lists
                    </div>
                    
                    {/* Enhanced typography */}
                    <h3 className="text-[22px] font-bold text-white/90 mb-3 leading-tight tracking-tight" style={{textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'}}>
                      Smart Grocery Assistant
                    </h3>
                    <p className="text-white/80 text-sm mb-4 leading-relaxed font-medium">
                      AI-generated shopping lists & local prices
                    </p>
                    <p className="text-white/70 text-sm mb-6 leading-relaxed">
                      Get smart shopping lists based on your goals, dietary restrictions, and local store prices.
                    </p>
                    
                    {/* Premium glassmorphism button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-[#4CAF50]/90 to-green-600/80 backdrop-blur-[10px] border border-white/20 rounded-xl py-3 px-6 text-white font-semibold text-sm shadow-lg transition-all duration-300 hover:shadow-xl"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Enhanced Social Proof Section with Glassmorphism */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4CAF50] via-[#81C784] to-[#A5D6A7] rounded-[28px] p-[1px]">
                <div className="h-full w-full bg-white/12 backdrop-blur-[25px] rounded-[27px] p-10 relative overflow-hidden">
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
                      backgroundSize: '30px 30px'
                    }}></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <h3 className="text-[28px] font-bold text-white/90 mb-3 leading-tight" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
                      Join 10,000+ users transforming their health
                    </h3>
                    <p className="text-white/80 text-lg mb-8 font-medium">Limited time: Premium features 40% off</p>
                    
                    {/* Enhanced User Testimonials */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-white/15 backdrop-blur-[15px] rounded-2xl p-6 text-center border border-white/20 shadow-lg">
                        <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-2 border-white/30">
                          <span className="text-white font-bold text-lg">A</span>
                        </div>
                        <p className="text-white/90 text-sm mb-3 font-medium">"Ana is healthier than ever"</p>
                        <div className="flex justify-center gap-1">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />)}
                        </div>
                      </div>
                      
                      <div className="bg-white/15 backdrop-blur-[15px] rounded-2xl p-6 text-center border border-white/20 shadow-lg">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-2 border-white/30">
                          <span className="text-white font-bold text-lg">M</span>
                        </div>
                        <p className="text-white/90 text-sm mb-3 font-medium">"Lost 15lbs in 3 months"</p>
                        <div className="flex justify-center gap-1">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />)}
                        </div>
                      </div>
                      
                      <div className="bg-white/15 backdrop-blur-[15px] rounded-2xl p-6 text-center border border-white/20 shadow-lg">
                        <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-2 border-white/30">
                          <span className="text-white font-bold text-lg">J</span>
                        </div>
                        <p className="text-white/90 text-sm mb-3 font-medium">"Energy levels through the roof!"</p>
                        <div className="flex justify-center gap-1">
                          {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-300 fill-current" />)}
                        </div>
                      </div>
                    </div>

                    {/* Premium Glassmorphism CTA Button */}
                    <motion.button
                      className="bg-gradient-to-r from-[#4CAF50]/90 to-green-600/80 backdrop-blur-[15px] border border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 hover:shadow-3xl"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      🚀 Start Free Trial (3 days)
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>











      </div>
    </div>
  )
}

export default NuriAssistant