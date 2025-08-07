import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Sparkles, Leaf, Heart, Sun, Target, Zap, MessageCircle, Plus, Camera, Search, Trophy, Users, Calendar, TrendingUp, Droplets, Apple, Utensils, Coffee, ChefHat, BarChart3, ShoppingCart, Clock, Star } from 'lucide-react'

const NuriAssistant = () => {
  const [showEmojiCards, setShowEmojiCards] = useState(false)
  const [userMood, setUserMood] = useState(null)
  const [chatStarted, setChatStarted] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [onboardingStep, setOnboardingStep] = useState(0)
  const [showNutritionDashboard, setShowNutritionDashboard] = useState(false)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [nuriExpression, setNuriExpression] = useState('happy')
  const [isBlinking, setIsBlinking] = useState(false)

  // Track cursor for eye movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 8000)
    return () => clearInterval(blinkInterval)
  }, [])

  // Calculate eye movement based on cursor position
  const calculateEyeMovement = () => {
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    const deltaX = (cursorPosition.x - centerX) / centerX
    const deltaY = (cursorPosition.y - centerY) / centerY
    return {
      x: Math.max(-3, Math.min(3, deltaX * 3)),
      y: Math.max(-2, Math.min(2, deltaY * 2))
    }
  }

  const eyeMovement = calculateEyeMovement()

  const handleMoodSelection = (mood) => {
    setUserMood(mood)
    setShowEmojiCards(false)
    setChatStarted(true)
  }

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

  // Floating bokeh particles
  const bokehParticles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20, // 20px to 60px
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 20 + 30
  }))

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
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 🌿 ANIMATED BACKGROUND */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, #E8F5E8 0%, #2D5016 100%)'
        }}
      >
        {/* Independent breathing effect */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            scale: [1, 1.008, 1],
            rotate: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }}
        />
        
        {/* Gentle floating movement */}
        <motion.div
          className="absolute inset-0"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Floating bokeh particles */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        {bokehParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full blur-sm bg-gradient-to-br from-pink-300/30 to-coral-300/20"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`
            }}
            animate={{
              y: [0, -30, -60],
              x: [0, 10, -10],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating Food Icons */}
      <div className="fixed inset-0 z-5 pointer-events-none">
        {[
          { icon: '🍎', x: 10, y: 20, size: 24, delay: 0 },
          { icon: '🥕', x: 85, y: 15, size: 20, delay: 2 },
          { icon: '🥑', x: 20, y: 80, size: 28, delay: 4 },
          { icon: '🥦', x: 75, y: 75, size: 22, delay: 6 },
          { icon: '🍓', x: 90, y: 60, size: 18, delay: 8 },
          { icon: '🥬', x: 5, y: 60, size: 26, delay: 10 }
        ].map((food, index) => (
          <motion.div
            key={index}
            className="absolute text-2xl opacity-30"
            style={{
              left: `${food.x}%`,
              top: `${food.y}%`,
              fontSize: `${food.size}px`
            }}
            animate={{
              y: [0, -20, -40],
              x: [0, 5, -5],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 8,
              delay: food.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {food.icon}
          </motion.div>
        ))}
      </div>

      {/* Onboarding Flow */}
      <AnimatePresence>
        {showOnboarding && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 max-w-md w-full border border-white/30">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{onboardingSteps[onboardingStep].icon}</div>
                <h2 className="text-2xl font-bold text-white mb-2">{onboardingSteps[onboardingStep].title}</h2>
                <p className="text-white/80 text-lg">{onboardingSteps[onboardingStep].description}</p>
              </div>
              
              {/* Progress indicator */}
              <div className="flex justify-center mb-6">
                {onboardingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full mx-1 ${
                      index <= onboardingStep ? 'bg-green-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={handleOnboardingSkip}
                  className="flex-1 px-4 py-3 text-white/70 hover:text-white transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={handleOnboardingNext}
                  className="flex-1 bg-gradient-to-r from-green-400 to-teal-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                >
                  {onboardingStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Layout - 3 Columns */}
      <div className="flex min-h-screen pt-10 relative z-10">
        
        {/* Left Floating Badge */}
        <div className="fixed top-16 left-6 z-50">
          <motion.div 
            className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-white/30"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-white font-medium">Nuri is here</span>
              <Leaf className="w-4 h-4 text-green-300" />
            </div>
          </motion.div>
        </div>

        {/* Right Floating Onboarding Button */}
        <div className="fixed top-16 right-6 z-50">
          <motion.button
            onClick={() => setShowOnboarding(true)}
            className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg border border-white/30 text-white font-medium hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Get Started</span>
            </div>
          </motion.button>
        </div>

        {/* Center Column - Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pt-10 pb-20 relative z-20">
          
          {/* 🤖 3D NURI CHARACTER */}
          <div className="relative mb-8">
            <motion.div
              className="relative"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Smaller 3D Nuri character */}
              <div className="relative w-64 h-64">
                {/* Pear-shaped body with gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-green-300 to-green-700 rounded-full transform scale-y-110 shadow-2xl">
                  {/* Expressive face with interactive eyes */}
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex gap-8">
                    {/* Left eye with cursor following */}
                    <div className="relative">
                      <div className="w-5 h-5 bg-black rounded-full shadow-lg"></div>
                      <motion.div 
                        className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ 
                          x: eyeMovement.x,
                          y: eyeMovement.y,
                          scale: isBlinking ? 0 : 1
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                    {/* Right eye with cursor following */}
                    <div className="relative">
                      <div className="w-5 h-5 bg-black rounded-full shadow-lg"></div>
                      <motion.div 
                        className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full"
                        animate={{ 
                          x: eyeMovement.x,
                          y: eyeMovement.y,
                          scale: isBlinking ? 0 : 1
                        }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    </div>
                  </div>

                  {/* Dynamic smile based on expression */}
                  <motion.div 
                    className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-10 h-3 border-b-4 border-black rounded-full"
                    animate={{
                      scaleY: nuriExpression === 'happy' ? 1.2 : nuriExpression === 'thoughtful' ? 0.8 : 1,
                      rotate: nuriExpression === 'happy' ? 5 : nuriExpression === 'thoughtful' ? -2 : 0
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Pink cheeks with glow */}
                  <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-pink-300/60 rounded-full blur-sm shadow-lg"></div>
                  <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-pink-300/60 rounded-full blur-sm shadow-lg"></div>

                  {/* Two detailed leaves with sway animation */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <motion.div
                      className="w-6 h-10 bg-gradient-to-b from-green-500 to-green-700 rounded-full transform rotate-12 shadow-lg"
                      animate={{ rotate: [12, 8, 12] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="w-6 h-10 bg-gradient-to-b from-green-500 to-green-700 rounded-full transform -rotate-12 absolute top-0 left-0 shadow-lg"
                      animate={{ rotate: [-12, -8, -12] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                  </div>

                  {/* Sparkle particles around Nuri */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 6 }, (_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-lg"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          delay: i * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Welcome Heading with Gradient Text */}
          <div className="text-center mb-8">
            <motion.h1 
              className="text-5xl font-bold mb-4 flex items-center justify-center gap-3"
              style={{
                background: 'linear-gradient(135deg, #4ADE80, #0EA5E9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Welcome to Nutriwell
              <Leaf className="w-8 h-8 text-green-400" />
            </motion.h1>
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I'm Nuri, your AI wellness assistant. Let's start your journey to better health together!
            </motion.p>
            
            <motion.button
              className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-3 mx-auto group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onClick={() => setShowNutritionDashboard(true)}
            >
              <MessageCircle className="w-6 h-6" />
              Start Chat with Nuri
            </motion.button>
          </div>

          {/* Nuri Chat Bubble with Glassmorphism */}
          <motion.div 
            className="max-w-md w-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-green-200 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-green-300 rounded-full flex items-center justify-center">
                  <div className="text-lg">🌱</div>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/30 max-w-xs">
                <p className="text-white/90 text-lg leading-relaxed">
                  Good morning! 😊 I'm Nuri, your personal nutrition assistant. Let's start with a few quick questions to personalize your plan!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            className="max-w-md w-full mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-xl font-semibold text-white mb-4 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-3">
                  <Camera className="w-6 h-6 text-green-300" />
                  <span className="text-white font-medium">Log Food</span>
                </div>
              </motion.button>
              
              <motion.button
                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-blue-300" />
                  <span className="text-white font-medium">Search Foods</span>
                </div>
              </motion.button>
            </div>
          </motion.div>

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

            {/* Premium Feature Cards with Enhanced Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Recipe Generator Pro */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <ChefHat className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Recipe Generator Pro</h3>
                      <p className="text-white/70 text-sm">AI creates custom recipes based on your ingredients</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4">Get personalized recipes that match your dietary preferences, available ingredients, and nutritional goals.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-300 text-sm font-medium">✨ AI-Powered</span>
                    <motion.button
                      className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Health Insights Dashboard */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Health Insights Dashboard</h3>
                      <p className="text-white/70 text-sm">Advanced analytics & correlations</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4">Discover correlations between food, mood, energy, sleep, and biomarkers with detailed analytics.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-300 text-sm font-medium">📊 Advanced Analytics</span>
                    <motion.button
                      className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Personal Nutrition Coach */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Personal Nutrition Coach</h3>
                      <p className="text-white/70 text-sm">Real-time chat with certified nutritionists</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4">Get personalized meal plans and real-time guidance from certified nutritionists.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-green-300 text-sm font-medium">👨‍⚕️ Expert Guidance</span>
                    <motion.button
                      className="bg-gradient-to-r from-green-400 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Smart Grocery Assistant */}
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                whileHover={{ y: -8, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Smart Grocery Assistant</h3>
                      <p className="text-white/70 text-sm">AI-generated shopping lists & local prices</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm mb-4">Get smart shopping lists based on your goals, dietary restrictions, and local store prices.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-yellow-300 text-sm font-medium">🛒 Smart Lists</span>
                    <motion.button
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Free (3 days)
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Proof & FOMO Elements */}
            <motion.div 
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-3xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">Join 10,000+ users transforming their health</h3>
                <p className="text-white/80 text-sm">Limited time: Premium features 40% off</p>
              </div>
              
              {/* User testimonials */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <p className="text-white/90 text-sm">"Ana is healthier than ever"</p>
                  <div className="flex justify-center mt-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">M</span>
                  </div>
                  <p className="text-white/90 text-sm">"Lost 15lbs in 3 months"</p>
                  <div className="flex justify-center mt-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">J</span>
                  </div>
                  <p className="text-white/90 text-sm">"Energy levels through the roof!"</p>
                  <div className="flex justify-center mt-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />)}
                  </div>
                </div>
              </div>

              {/* Floating Action Button */}
              <motion.button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 mx-auto block"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 Start Free Trial (3 days)
              </motion.button>
            </motion.div>
          </motion.div>

        </div>

        {/* Right Sidebar with Glassmorphism */}
        <motion.div 
          className="w-80 bg-white/10 backdrop-blur-md border-l border-white/20 p-6 overflow-y-auto sticky top-0 h-screen relative z-30"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          
          {/* Today's Progress */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="w-6 h-6 text-yellow-300" />
              <h3 className="text-xl font-semibold text-white">Today's Progress</h3>
            </div>
            <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-3 mb-4 border border-blue-400/30">
              <p className="text-blue-200 text-xs font-medium">📊 Example Data</p>
              <p className="text-blue-100 text-xs">This shows how your dashboard will look once you start tracking</p>
            </div>
            <p className="text-sm text-white/70 mb-6">Your wellness journey</p>
            
            <div className="space-y-4">
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6 text-orange-400" />
                    <span className="text-white">Energy Level</span>
                  </div>
                  <span className="bg-orange-200/30 text-orange-200 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Moderate</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">😊</div>
                    <span className="text-white">Mood</span>
                  </div>
                  <span className="bg-blue-200/30 text-blue-200 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">High</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/20 hover:scale-105 transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="w-6 h-6 text-pink-300" />
                    <span className="text-white">Focus</span>
                  </div>
                  <span className="bg-pink-200/30 text-pink-200 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">Low</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Today's Nutrition Dashboard */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">Today's Nutrition</h3>
            
            <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-3 mb-4 border border-green-400/30">
              <p className="text-green-200 text-xs font-medium">📊 Example Data</p>
              <p className="text-green-100 text-xs">This shows how your nutrition tracking will look once you start logging meals</p>
            </div>
            
            <div className="space-y-4">
              {/* Calories */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Apple className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Calories</span>
                  </div>
                  <span className="text-white/70 text-sm">{nutritionData.calories.current}/{nutritionData.calories.goal} {nutritionData.calories.unit}</span>
                </div>
                <ProgressRing progress={(nutritionData.calories.current / nutritionData.calories.goal) * 100} color="#4ADE80" />
              </div>

              {/* Macros */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-orange-400 text-sm font-medium">Protein</div>
                    <div className="text-white text-lg font-bold">{nutritionData.protein.current}g</div>
                    <div className="text-white/50 text-xs">{nutritionData.protein.goal}g goal</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-blue-400 text-sm font-medium">Carbs</div>
                    <div className="text-white text-lg font-bold">{nutritionData.carbs.current}g</div>
                    <div className="text-white/50 text-xs">{nutritionData.carbs.goal}g goal</div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="text-center">
                    <div className="text-yellow-400 text-sm font-medium">Fat</div>
                    <div className="text-white text-lg font-bold">{nutritionData.fat.current}g</div>
                    <div className="text-white/50 text-xs">{nutritionData.fat.goal}g goal</div>
                  </div>
                </div>
              </div>

              {/* Water Intake */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-medium">Water Intake</span>
                  </div>
                  <span className="text-white/70 text-sm">{nutritionData.water.current}/{nutritionData.water.goal} {nutritionData.water.unit}</span>
                </div>
                <ProgressRing progress={(nutritionData.water.current / nutritionData.water.goal) * 100} color="#3B82F6" />
              </div>
            </div>
          </div>

          {/* Quick Log Recent Foods */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Foods</h3>
            <div className="space-y-3">
              {recentFoods.map((food, index) => (
                <motion.button
                  key={index}
                  className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 hover:scale-105 transition-all duration-300 text-left"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{food.icon}</span>
                      <div>
                        <div className="text-white font-medium">{food.name}</div>
                        <div className="text-white/60 text-sm">{food.calories} kcal</div>
                      </div>
                    </div>
                    <Plus className="w-5 h-5 text-white/60" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-md rounded-2xl p-4 border ${
                    achievement.earned 
                      ? 'bg-white/20 border-white/30' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{achievement.icon}</div>
                    <div className={`text-sm font-medium ${
                      achievement.earned ? 'text-white' : 'text-white/50'
                    }`}>
                      {achievement.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Community Challenges */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Community Challenges</h3>
            <div className="space-y-3">
              {challenges.map((challenge, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium">{challenge.title}</div>
                    <div className="text-white/60 text-sm">{challenge.participants} participants</div>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-teal-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${challenge.progress}%` }}
                    />
                  </div>
                  <div className="text-white/60 text-xs mt-1">{challenge.progress}% complete</div>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  )
}

export default NuriAssistant