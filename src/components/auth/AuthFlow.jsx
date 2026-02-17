import React, { useState, useEffect } from 'react'
import { usePrivy, useLogin } from '@privy-io/react-auth'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthFlow() {
  const { ready, authenticated, user, logout } = usePrivy()
  const { login } = useLogin()
  const [currentStep, setCurrentStep] = useState('welcome')
  const [isLoading, setIsLoading] = useState(false)
  const [userProfile, setUserProfile] = useState({
    displayName: '',
    age: '',
    fitnessGoals: '',
    dietaryPreferences: [],
    activityLevel: ''
  })

  // Reset to welcome step when user logs out
  useEffect(() => {
    if (!authenticated) {
      setCurrentStep('welcome')
      setUserProfile({
        displayName: '',
        age: '',
        fitnessGoals: '',
        dietaryPreferences: [],
        activityLevel: ''
      })
    }
  }, [authenticated])

  const handleLogin = async (method) => {
    setIsLoading(true)
    try {
      await login({
        loginMethod: method,
        onSuccess: () => {
          console.log(`✅ ${method} login successful`)
          setCurrentStep('onboarding')
        },
        onError: (error) => {
          console.error(`❌ ${method} login failed:`, error)
          setIsLoading(false)
        }
      })
    } catch (error) {
      console.error(`❌ ${method} login error:`, error)
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
      setCurrentStep('welcome')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateProfile = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleOnboardingComplete = () => {
    setCurrentStep('dashboard')
    // Here you would typically save the user profile to your database
    console.log('User profile:', userProfile)
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E8B4B8] mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Loading NutriWell</h2>
          <p className="text-gray-600">Setting up your wellness journey...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
      <AnimatePresence mode="wait">
        {currentStep === 'welcome' && (
          <WelcomeStep 
            key="welcome"
            onLogin={handleLogin}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'onboarding' && (
          <OnboardingStep
            key="onboarding"
            userProfile={userProfile}
            updateProfile={updateProfile}
            onComplete={handleOnboardingComplete}
          />
        )}

        {currentStep === 'dashboard' && (
          <DashboardStep
            key="dashboard"
            user={user}
            userProfile={userProfile}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Welcome Step Component
function WelcomeStep({ onLogin, isLoading }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center justify-center min-h-screen p-6"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Welcome to NutriWell</h1>
          <p className="text-gray-600">Your personalized journey to better health starts here</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onLogin('email')}
            disabled={isLoading}
            className="w-full bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            📧 Continue with Email
          </button>

          <button
            onClick={() => onLogin('sms')}
            disabled={isLoading}
            className="w-full bg-[#EED6D3] hover:bg-[#E8C5C2] text-[#2C2C2C] font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            📱 Continue with SMS
          </button>

          <button
            onClick={() => onLogin('wallet')}
            disabled={isLoading}
            className="w-full bg-[#E8D5C4] hover:bg-[#D4C5B4] text-[#2C2C2C] font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            🪙 Connect Wallet
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['google', 'twitter', 'discord', 'github'].map((provider) => (
              <button
                key={provider}
                onClick={() => onLogin(provider)}
                disabled={isLoading}
                className="bg-white border-2 border-gray-300 hover:border-[#E8B4B8] text-[#2C2C2C] font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="mt-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E8B4B8] mx-auto"></div>
            <p className="text-sm text-gray-500 mt-2">Setting up your account...</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// Onboarding Step Component
function OnboardingStep({ userProfile, updateProfile, onComplete }) {
  const [currentPage, setCurrentPage] = useState(0)
  
  const onboardingPages = [
    {
      title: "What's your name?",
      subtitle: "Let's personalize your experience",
      field: "displayName",
      type: "text",
      placeholder: "Enter your name"
    },
    {
      title: "How old are you?",
      subtitle: "This helps us tailor recommendations",
      field: "age",
      type: "number",
      placeholder: "Enter your age"
    },
    {
      title: "What are your fitness goals?",
      subtitle: "Select all that apply",
      field: "fitnessGoals",
      type: "multiSelect",
      options: ["Weight Loss", "Muscle Gain", "Better Health", "Athletic Performance", "Stress Relief"]
    },
    {
      title: "Any dietary preferences?",
      subtitle: "We'll customize your meal plans",
      field: "dietaryPreferences",
      type: "multiSelect",
      options: ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo", "None"]
    },
    {
      title: "What's your activity level?",
      subtitle: "This affects your nutrition needs",
      field: "activityLevel",
      type: "select",
      options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"]
    }
  ]

  const currentPageData = onboardingPages[currentPage]
  const isLastPage = currentPage === onboardingPages.length - 1

  const handleNext = () => {
    if (currentPage < onboardingPages.length - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const renderField = () => {
    const { field, type, placeholder, options } = currentPageData

    switch (type) {
      case 'text':
      case 'number':
        return (
          <input
            type={type}
            value={userProfile[field] || ''}
            onChange={(e) => updateProfile(field, e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#E8B4B8] focus:outline-none text-lg"
          />
        )
      
      case 'select':
        return (
          <select
            value={userProfile[field] || ''}
            onChange={(e) => updateProfile(field, e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#E8B4B8] focus:outline-none text-lg"
          >
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )
      
      case 'multiSelect':
        return (
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={userProfile[field]?.includes(option) || false}
                  onChange={(e) => {
                    const current = userProfile[field] || []
                    if (e.target.checked) {
                      updateProfile(field, [...current, option])
                    } else {
                      updateProfile(field, current.filter(item => item !== option))
                    }
                  }}
                  className="w-5 h-5 text-[#E8B4B8] border-gray-300 rounded focus:ring-[#E8B4B8]"
                />
                <span className="text-lg">{option}</span>
              </label>
            ))}
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex items-center justify-center min-h-screen p-6"
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentPage + 1} of {onboardingPages.length}</span>
            <span>{Math.round(((currentPage + 1) / onboardingPages.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#E8B4B8] to-[#EED6D3] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPage + 1) / onboardingPages.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Page Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
            {currentPageData.title}
          </h2>
          <p className="text-gray-600">{currentPageData.subtitle}</p>
        </div>

        <div className="mb-8">
          {renderField()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentPage === 0}
            className="px-6 py-3 text-[#2C2C2C] font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
          >
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="px-8 py-3 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            {isLastPage ? 'Complete Setup' : 'Next'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// Dashboard Step Component
function DashboardStep({ user, userProfile, onLogout }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen p-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2C2C2C]">
                  Welcome back, {userProfile.displayName || 'User'}!
                </h1>
                <p className="text-gray-600">Ready to continue your wellness journey?</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-[#2C2C2C] font-medium rounded-xl transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* User Profile Summary */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-6 mb-6">
          <h2 className="text-xl font-bold text-[#2C2C2C] mb-4">Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Display Name</p>
              <p className="font-semibold">{userProfile.displayName || 'Not set'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Age</p>
              <p className="font-semibold">{userProfile.age || 'Not set'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Fitness Goals</p>
              <p className="font-semibold">
                {userProfile.fitnessGoals?.length > 0 
                  ? userProfile.fitnessGoals.join(', ') 
                  : 'Not set'
                }
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Activity Level</p>
              <p className="font-semibold">{userProfile.activityLevel || 'Not set'}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">Track Progress</h3>
            <p className="text-gray-600 text-sm mb-4">Monitor your health metrics and goals</p>
            <button className="px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200">
              Get Started
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🍽️</span>
            </div>
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">Meal Planning</h3>
            <p className="text-gray-600 text-sm mb-4">Get personalized meal recommendations</p>
            <button className="px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200">
              Plan Meals
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-6 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-[#2C2C2C] mb-2">Chat with Nuri</h3>
            <p className="text-gray-600 text-sm mb-4">Get AI-powered health advice</p>
            <button className="px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
