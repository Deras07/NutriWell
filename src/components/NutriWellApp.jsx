import React, { useState } from 'react'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { OnboardingFlow } from './onboarding/OnboardingFlow'
import { MealPlanDisplay } from './meal-planning/MealPlanDisplay'
import { RecipeBuilder } from './recipe/RecipeBuilder'
import { GroceryListGenerator } from './grocery/GroceryList'
import { WeeklyMealPlanner } from './ui/calendar'
import { NutritionTracker } from './tracking/NutritionTracker'
import { ProgressDashboard } from './dashboard/ProgressDashboard'
import { EducationalHub } from './education/EducationalHub'
import { CommunityForum } from './community/CommunityForum'
import { ActivityTracker } from './activity/ActivityTracker'
import { UserProfile } from './profile/UserProfile'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { FeatureCard } from './ui/card'

export const NutriWellApp = () => {
  const [currentPage, setCurrentPage] = useState('home')
  const [userPlan, setUserPlan] = useState('free') // 'free' or 'premium'
  const [onboardingData, setOnboardingData] = useState(null)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const navigation = [
    { label: 'Home', href: '#home', active: currentPage === 'home', onClick: () => handleNavigation('home') },
    { label: 'Get Plan', href: '#onboarding', active: currentPage === 'onboarding', onClick: () => handleNavigation('onboarding') },
    { 
      label: 'Meal Planning', 
      href: '#meal-planning', 
      active: ['meal-planning', 'recipes', 'grocery'].includes(currentPage),
      onClick: () => handleNavigation('meal-planning'),
      dropdown: [
        { label: 'Weekly Planner', onClick: () => handleNavigation('meal-planning') },
        { label: 'Recipe Builder', onClick: () => handleNavigation('recipes') },
        { label: 'Grocery Lists', onClick: () => handleNavigation('grocery') }
      ]
    },
    { label: 'Nutrition Tracker', href: '#tracker', active: currentPage === 'tracker', onClick: () => handleNavigation('tracker') },
    { label: 'Dashboard', href: '#dashboard', active: currentPage === 'dashboard', onClick: () => handleNavigation('dashboard') },
    { label: 'Profile', href: '#profile', active: currentPage === 'profile', onClick: () => handleNavigation('profile') },
    {
      label: 'More',
      active: ['education', 'community', 'activity'].includes(currentPage),
      dropdown: [
        { label: 'Learn', onClick: () => handleNavigation('education') },
        { label: 'Community', onClick: () => handleNavigation('community') },
        { label: 'Activity', onClick: () => handleNavigation('activity') }
      ]
    }
  ]

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  const handleAuthAction = (action) => {
    if (action === 'signup') {
      setCurrentPage('onboarding')
    } else {
      console.log(`Auth action: ${action}`)
    }
  }

  const handleOnboardingComplete = (data) => {
    setOnboardingData(data)
    setCurrentPage('meal-plan-results')
  }

  const handleGetFullPlan = () => {
    setShowUpgradeModal(true)
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'onboarding':
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary-sage/10 via-secondary-white to-accent-coral/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-primary-sage/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">🎯</span>
                  <span className="text-primary-sage font-medium">Personalization</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Build Your
                  <span className="bg-gradient-to-r from-primary-sage to-accent-coral bg-clip-text text-transparent"> Perfect Plan</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Let's create a personalized nutrition plan tailored to your goals
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <OnboardingFlow 
                  onComplete={handleOnboardingComplete}
                />
              </div>
            </div>
          </div>
        )
      
      case 'meal-plan-results':
        return (
          <div className="min-h-screen bg-gradient-to-br from-accent-golden/10 via-secondary-white to-primary-sage/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-accent-golden/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">🎉</span>
                  <span className="text-accent-golden font-medium">Your Plan Ready</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Your Personalized
                  <span className="bg-gradient-to-r from-accent-golden to-primary-sage bg-clip-text text-transparent"> Meal Plan</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Here's your customized nutrition plan based on your preferences
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <MealPlanDisplay 
                  userData={onboardingData}
                  onGetFullPlan={handleGetFullPlan}
                />
              </div>
            </div>
          </div>
        )
      
      case 'meal-planning':
        return (
          <div className="py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Weekly Meal Planning
                </h1>
                <p className="text-xl text-gray-600">
                  Plan your meals for the week ahead
                </p>
                {userPlan === 'free' && (
                  <div className="mt-4">
                    <Badge variant="warning" size="large">
                      Free Plan: Basic meal planning only
                    </Badge>
                  </div>
                )}
              </div>
              
              {userPlan === 'free' ? (
                // Enhanced Free version with engaging visual upgrade section
                <div className="min-h-screen bg-gradient-to-br from-secondary-mint via-secondary-white to-secondary-peach">
                  <div className="max-w-6xl mx-auto px-4 py-12">
                    
                    {/* Header Section */}
                    <div className="text-center mb-12 animate-slide-up">
                      <div className="inline-flex items-center space-x-2 bg-accent-coral/10 px-4 py-2 rounded-full mb-4">
                        <span className="text-2xl animate-bounce-gentle">🍽️</span>
                        <span className="text-accent-coral font-medium">Meal Planning Hub</span>
                      </div>
                      <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                        Plan Your Perfect Week
                      </h1>
                      <p className="text-xl text-text-light max-w-2xl mx-auto">
                        Transform your nutrition journey with intelligent meal planning
                      </p>
                    </div>

                    {/* Feature Preview Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                      <div className="group hover:scale-105 transition-transform duration-300">
                        <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-sage to-primary-teal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow">
                              <span className="text-2xl">📅</span>
                            </div>
                            <h3 className="font-heading font-bold text-lg mb-2">Weekly Calendar</h3>
                            <p className="text-text-light text-sm">Drag & drop meal planning with smart scheduling</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="group hover:scale-105 transition-transform duration-300">
                        <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-accent-coral to-accent-orange rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow">
                              <span className="text-2xl">🤖</span>
                            </div>
                            <h3 className="font-heading font-bold text-lg mb-2">AI Suggestions</h3>
                            <p className="text-text-light text-sm">Personalized meal recommendations based on your goals</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="group hover:scale-105 transition-transform duration-300">
                        <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl">
                          <CardContent className="p-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-accent-golden to-accent-lime rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow">
                              <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="font-heading font-bold text-lg mb-2">Nutrition Tracking</h3>
                            <p className="text-text-light text-sm">Automatic macro calculations and progress monitoring</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Premium Upgrade Section */}
                    <div className="relative overflow-hidden">
                      <Card className="bg-gradient-to-r from-primary-sage via-primary-teal to-accent-coral p-8 md:p-12 border-0 shadow-2xl animate-gradient bg-[length:400%_400%]">
                        <div className="relative z-10">
                          <div className="grid lg:grid-cols-2 gap-8 items-center">
                            {/* Left side - Content */}
                            <div className="text-white">
                              <div className="flex items-center space-x-2 mb-4">
                                <span className="text-3xl animate-float">✨</span>
                                <Badge className="bg-white/20 text-white border-white/30">Premium Feature</Badge>
                              </div>
                              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                                Unlock Your Full Potential
                              </h2>
                              <p className="text-white/90 text-lg mb-6">
                                Join thousands who've transformed their nutrition with our premium meal planning tools.
                              </p>
                              
                              <ul className="space-y-3 mb-8">
                                {[
                                  "🗓️ Interactive weekly meal calendar",
                                  "🎯 AI-powered nutrition optimization", 
                                  "🛒 Auto-generated shopping lists",
                                  "👨‍🍳 500+ chef-created recipes",
                                  "📱 Mobile app & offline access"
                                ].map((feature, index) => (
                                  <li key={index} className="flex items-center space-x-2 text-white/95 animate-slide-right" style={{animationDelay: `${index * 0.1}s`}}>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                  size="large"
                                  onClick={() => setShowUpgradeModal(true)}
                                  className="bg-white text-primary-teal hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                                >
                                  Start Premium - $29/mo
                                </Button>
                                <button 
                                  onClick={() => setCurrentPage('grocery')}
                                  className="text-white/90 hover:text-white underline underline-offset-4 transition-colors"
                                >
                                  Try free meal generator →
                                </button>
                              </div>
                            </div>
                            
                            {/* Right side - Visual mockup */}
                            <div className="relative">
                              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-white/80 text-sm mb-4">📅 Your Weekly Plan Preview</div>
                                <div className="grid grid-cols-7 gap-1 mb-4">
                                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                    <div key={i} className="text-center text-white/70 text-xs py-2">{day}</div>
                                  ))}
                                </div>
                                <div className="space-y-2">
                                  {['🥗 Caesar Salad', '🍝 Pasta Primavera', '🥘 Buddha Bowl'].map((meal, i) => (
                                    <div key={i} className="bg-white/20 rounded-lg p-2 text-white/90 text-sm animate-pulse-slow" style={{animationDelay: `${i * 0.3}s`}}>
                                      {meal}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Floating elements */}
                              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent-orange rounded-full animate-bounce-gentle"></div>
                              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-lime rounded-full animate-float"></div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Background decoration */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-1"></div>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                <WeeklyMealPlanner />
              )}
            </div>
          </div>
        )
      
      case 'recipes':
        return (
          <div className="min-h-screen bg-gradient-to-br from-secondary-mint via-secondary-white to-secondary-peach overflow-hidden relative">
            {/* Floating background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-16 h-16 bg-primary-sage/20 rounded-full animate-float"></div>
              <div className="absolute top-1/4 right-20 w-12 h-12 bg-accent-lime/30 rounded-full animate-bounce-gentle"></div>
              <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-primary-sage/15 rounded-full animate-pulse-slow"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-primary-sage/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">👨‍🍳</span>
                  <span className="text-primary-sage font-medium">Recipe Builder</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Create Custom
                  <span className="bg-gradient-to-r from-primary-sage to-accent-lime bg-clip-text text-transparent"> Recipes</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Build personalized recipes with automatic nutrition calculations
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <RecipeBuilder userPlan={userPlan} />
              </div>
            </div>
          </div>
        )
      
      case 'grocery':
        return (
          <div className="min-h-screen bg-gradient-to-br from-secondary-peach via-secondary-white to-secondary-mint">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-accent-coral/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">🛒</span>
                  <span className="text-accent-coral font-medium">Smart Shopping</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Organized
                  <span className="bg-gradient-to-r from-accent-coral to-accent-orange bg-clip-text text-transparent"> Grocery Lists</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Generate smart shopping lists categorized by food groups
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <GroceryListGenerator userPlan={userPlan} />
              </div>
            </div>
          </div>
        )

      case 'tracker':
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary-teal/10 via-secondary-white to-accent-golden/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-primary-teal/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">📊</span>
                  <span className="text-primary-teal font-medium">Nutrition Tracking</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Track Your
                  <span className="bg-gradient-to-r from-primary-teal to-accent-golden bg-clip-text text-transparent"> Progress</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Monitor your daily nutrition goals with detailed insights
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <NutritionTracker userPlan={userPlan} />
              </div>
            </div>
          </div>
        )

      case 'dashboard':
        return (
          <div className="min-h-screen bg-gradient-to-br from-accent-golden/10 via-secondary-white to-primary-sage/10 overflow-hidden relative">
            {/* Floating background elements */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-32 right-16 w-14 h-14 bg-accent-golden/20 rounded-full animate-float"></div>
              <div className="absolute bottom-40 left-16 w-18 h-18 bg-primary-sage/25 rounded-full animate-bounce-gentle"></div>
              <div className="absolute top-1/2 right-1/3 w-10 h-10 bg-accent-golden/15 rounded-full animate-pulse-slow"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-accent-golden/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">📈</span>
                  <span className="text-accent-golden font-medium">Progress Dashboard</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Your Health
                  <span className="bg-gradient-to-r from-accent-golden to-primary-sage bg-clip-text text-transparent"> Journey</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Comprehensive overview of your nutrition and wellness progress
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <ProgressDashboard userPlan={userPlan} />
              </div>
            </div>
          </div>
        )

      case 'education':
        return (
          <div className="min-h-screen bg-gradient-to-br from-info/10 via-secondary-white to-primary-teal/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-info/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">📚</span>
                  <span className="text-info font-medium">Educational Hub</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Learn &
                  <span className="bg-gradient-to-r from-info to-primary-teal bg-clip-text text-transparent"> Grow</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Expand your nutrition knowledge with expert-curated content
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <EducationalHub userPlan={userPlan} />
              </div>
            </div>
          </div>
        )

      case 'community':
        return (
          <div className="min-h-screen bg-gradient-to-br from-accent-lime/10 via-secondary-white to-primary-sage/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-accent-lime/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">👥</span>
                  <span className="text-accent-lime font-medium">Community</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Connect &
                  <span className="bg-gradient-to-r from-accent-lime to-primary-sage bg-clip-text text-transparent"> Share</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Join a supportive community of health-conscious individuals
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <CommunityForum userPlan={userPlan} />
              </div>
            </div>
          </div>
        )

      case 'activity':
        return (
          <div className="min-h-screen bg-gradient-to-br from-warning/10 via-secondary-white to-accent-orange/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-warning/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">🏃‍♀️</span>
                  <span className="text-warning font-medium">Activity Tracker</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Stay
                  <span className="bg-gradient-to-r from-warning to-accent-orange bg-clip-text text-transparent"> Active</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Monitor your physical activity and fitness goals
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <ActivityTracker userPlan={userPlan} />
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="min-h-screen bg-gradient-to-br from-accent-coral/10 via-secondary-white to-primary-teal/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              {/* Header Section */}
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-accent-coral/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">👤</span>
                  <span className="text-accent-coral font-medium">Your Profile</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Personal
                  <span className="bg-gradient-to-r from-accent-coral to-primary-teal bg-clip-text text-transparent"> Settings</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Manage your account, preferences, and nutrition goals
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <UserProfile userPlan={userPlan} />
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div>
            {/* Enhanced Hero Section */}
            <section className="relative min-h-screen bg-gradient-to-br from-secondary-mint via-secondary-white to-secondary-peach overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-20 h-20 bg-accent-coral/20 rounded-full animate-float"></div>
                <div className="absolute top-40 right-16 w-16 h-16 bg-primary-sage/30 rounded-full animate-bounce-gentle"></div>
                <div className="absolute bottom-40 left-20 w-12 h-12 bg-accent-golden/25 rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-teal/20 rounded-full animate-float"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-sage/10 to-accent-coral/10 rounded-full blur-3xl animate-pulse-slow"></div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                  
                  {/* Left side - Main content */}
                  <div className="text-center lg:text-left">
                    <div className="animate-slide-up">
                      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-coral/20 to-primary-sage/20 px-4 py-2 rounded-full mb-6">
                        <span className="text-2xl animate-wiggle">🌟</span>
                        <span className="text-primary-teal font-semibold">AI-Powered Nutrition</span>
                      </div>
                      
                      <h1 className="font-heading text-6xl md:text-7xl font-bold text-text-dark mb-6 leading-tight">
                        Transform Your
                        <br />
                        <span className="bg-gradient-to-r from-primary-teal via-accent-coral to-accent-golden bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
                          Nutrition Journey
                        </span>
                      </h1>
                      
                      <p className="text-xl md:text-2xl text-text-light max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                        From personalized meal plans to smart grocery lists — everything you need for 
                        <span className="text-accent-coral font-semibold"> healthy eating</span> in one intelligent platform.
                      </p>
                      
                      {/* Stats */}
                      <div className="flex flex-wrap justify-center lg:justify-start gap-8 mb-8">
                        <div className="text-center animate-slide-right" style={{animationDelay: '0.2s'}}>
                          <div className="text-3xl font-bold text-primary-teal">50k+</div>
                          <div className="text-sm text-text-light">Happy Users</div>
                        </div>
                        <div className="text-center animate-slide-right" style={{animationDelay: '0.4s'}}>
                          <div className="text-3xl font-bold text-accent-coral">500+</div>
                          <div className="text-sm text-text-light">Recipes</div>
                        </div>
                        <div className="text-center animate-slide-right" style={{animationDelay: '0.6s'}}>
                          <div className="text-3xl font-bold text-accent-golden">95%</div>
                          <div className="text-sm text-text-light">Success Rate</div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                        <Button 
                          size="large" 
                          className="bg-gradient-to-r from-primary-teal to-accent-coral hover:from-accent-coral hover:to-primary-teal text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                          onClick={() => setCurrentPage('onboarding')}
                        >
                          <span className="flex items-center space-x-2">
                            <span>Start Free Plan</span>
                            <span className="text-xl">🚀</span>
                          </span>
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="large"
                          className="border-2 border-primary-sage text-primary-sage hover:bg-primary-sage hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300"
                          onClick={() => setCurrentPage('recipes')}
                        >
                          Explore Recipes →
                        </Button>
                      </div>
                      
                      {/* Trust indicators */}
                      <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-text-light">
                        <span className="flex items-center space-x-1">
                          <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                          <span>4.9/5 rating</span>
                        </span>
                        <span>•</span>
                        <span>No credit card required</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right side - Visual elements */}
                  <div className="relative">
                    <div className="animate-slide-left">
                      {/* Main dashboard mockup */}
                      <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-gray-100">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-4">📊 Your Nutrition Dashboard</div>
                        
                        {/* Progress rings */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-sage to-accent-lime rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-slow">
                              <span className="text-white font-bold text-sm">85%</span>
                            </div>
                            <div className="text-xs text-gray-600">Protein</div>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-accent-coral to-accent-orange rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-slow" style={{animationDelay: '0.2s'}}>
                              <span className="text-white font-bold text-sm">92%</span>
                            </div>
                            <div className="text-xs text-gray-600">Carbs</div>
                          </div>
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-primary-teal to-accent-golden rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse-slow" style={{animationDelay: '0.4s'}}>
                              <span className="text-white font-bold text-sm">78%</span>
                            </div>
                            <div className="text-xs text-gray-600">Fats</div>
                          </div>
                        </div>
                        
                        {/* Meal cards */}
                        <div className="space-y-3">
                          {[
                            { meal: '🥗 Garden Salad', time: '12:30 PM', cals: '245 cal' },
                            { meal: '🍗 Grilled Chicken', time: '7:00 PM', cals: '380 cal' },
                            { meal: '🥤 Green Smoothie', time: '3:00 PM', cals: '180 cal' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl animate-slide-up" style={{animationDelay: `${0.6 + i * 0.2}s`}}>
                              <div className="flex items-center space-x-3">
                                <span className="text-lg">{item.meal.split(' ')[0]}</span>
                                <div>
                                  <div className="text-sm font-medium">{item.meal.substring(2)}</div>
                                  <div className="text-xs text-gray-500">{item.time}</div>
                                </div>
                              </div>
                              <Badge className="bg-primary-sage/10 text-primary-sage">{item.cals}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Floating cards */}
                      <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 animate-float">
                        <div className="text-xs text-gray-600 mb-1">Weekly Goal</div>
                        <div className="text-lg font-bold text-primary-teal">🎯 87% Complete</div>
                      </div>
                      
                      <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100 animate-bounce-gentle">
                        <div className="text-xs text-gray-600 mb-1">Next Meal</div>
                        <div className="text-sm font-bold text-accent-coral">🍎 Apple & Nuts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Enhanced Features Section */}
            <section className="py-20 bg-gradient-to-b from-secondary-white to-secondary-mint/30">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-slide-up">
                  <div className="inline-flex items-center space-x-2 bg-accent-coral/10 px-4 py-2 rounded-full mb-6">
                    <span className="text-2xl animate-bounce-gentle">🚀</span>
                    <span className="text-accent-coral font-medium">Powerful Features</span>
                  </div>
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4">
                    Everything You Need for
                    <span className="bg-gradient-to-r from-primary-teal to-accent-coral bg-clip-text text-transparent"> Healthy Eating</span>
                  </h2>
                  <p className="text-xl text-text-light max-w-2xl mx-auto">
                    Complete nutrition planning tools designed for busy lifestyles
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Enhanced Feature Cards */}
                  <div className="group hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.1s'}}>
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:bg-gradient-to-br group-hover:from-primary-teal/5 group-hover:to-accent-coral/5">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-teal to-primary-teal-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl">📋</span>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-3 text-text-dark group-hover:text-primary-teal transition-colors">
                          Personalized Plans
                        </h3>
                        <p className="text-text-light text-sm leading-relaxed mb-4">
                          Get customized meal plans based on your goals, preferences, and lifestyle
                        </p>
                        <Button 
                          variant="secondary" 
                          size="small"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary-teal/10 text-primary-teal hover:bg-primary-teal hover:text-white"
                          onClick={() => setCurrentPage('onboarding')}
                        >
                          Try Now →
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="group hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:bg-gradient-to-br group-hover:from-primary-sage/5 group-hover:to-accent-lime/5">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-sage to-accent-lime rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl">👨‍🍳</span>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-3 text-text-dark group-hover:text-primary-sage transition-colors">
                          Recipe Builder
                        </h3>
                        <p className="text-text-light text-sm leading-relaxed mb-4">
                          Create custom recipes with automatic nutrition calculations and ingredient database
                        </p>
                        <Button 
                          variant="secondary" 
                          size="small"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-primary-sage/10 text-primary-sage hover:bg-primary-sage hover:text-white"
                          onClick={() => setCurrentPage('recipes')}
                        >
                          Build Recipe →
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="group hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.3s'}}>
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:bg-gradient-to-br group-hover:from-accent-coral/5 group-hover:to-accent-orange/5">
                      <CardContent className="p-6 text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-accent-coral to-accent-orange rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl">🛒</span>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-3 text-text-dark group-hover:text-accent-coral transition-colors">
                          Smart Grocery Lists
                        </h3>
                        <p className="text-text-light text-sm leading-relaxed mb-4">
                          Organized shopping lists categorized by food groups with print functionality
                        </p>
                        <Button 
                          variant="secondary" 
                          size="small"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent-coral/10 text-accent-coral hover:bg-accent-coral hover:text-white"
                          onClick={() => setCurrentPage('grocery')}
                        >
                          Generate List →
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="group hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: '0.4s'}}>
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group-hover:bg-gradient-to-br group-hover:from-accent-golden/5 group-hover:to-accent-lime/5">
                      <CardContent className="p-6 text-center relative">
                        <Badge className="absolute top-2 right-2 bg-accent-golden text-white text-xs px-2 py-1">Premium</Badge>
                        <div className="w-16 h-16 bg-gradient-to-r from-accent-golden to-accent-lime rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse-slow group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl">📅</span>
                        </div>
                        <h3 className="font-heading font-bold text-lg mb-3 text-text-dark group-hover:text-accent-golden transition-colors">
                          Weekly Planning
                        </h3>
                        <p className="text-text-light text-sm leading-relaxed mb-4">
                          Calendar-based meal planning with drag-and-drop functionality
                        </p>
                        <Button 
                          variant="secondary" 
                          size="small"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent-golden/10 text-accent-golden hover:bg-accent-golden hover:text-white"
                          onClick={() => setCurrentPage('meal-planning')}
                        >
                          Plan Week →
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Additional features grid */}
                <div className="mt-16 grid md:grid-cols-3 gap-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-info to-primary-teal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
                      <span className="text-white text-xl">📊</span>
                    </div>
                    <h4 className="font-semibold text-text-dark mb-2">Nutrition Tracking</h4>
                    <p className="text-sm text-text-light">Monitor your daily nutrition goals with detailed analytics</p>
                  </div>
                  
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-success to-primary-sage rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
                      <span className="text-white text-xl">🤖</span>
                    </div>
                    <h4 className="font-semibold text-text-dark mb-2">AI Recommendations</h4>
                    <p className="text-sm text-text-light">Smart suggestions based on your preferences and goals</p>
                  </div>
                  
                  <div className="text-center group hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-warning to-accent-golden rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce-gentle">
                      <span className="text-white text-xl">📱</span>
                    </div>
                    <h4 className="font-semibold text-text-dark mb-2">Mobile Ready</h4>
                    <p className="text-sm text-text-light">Access your plans anywhere with our responsive design</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="font-heading text-4xl font-bold text-text-dark mb-4">
                    Choose Your Plan
                  </h2>
                  <p className="text-xl text-text-light">
                    Start free, upgrade when you're ready for more features
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Free Plan */}
                  <Card className="relative">
                    <CardHeader>
                      <CardTitle className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Free Plan</div>
                        <div className="text-3xl font-bold text-primary-teal mt-2">$0</div>
                        <div className="text-gray-600">Forever</div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>One-day personalized meal plan</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>5 pre-designed meal plans</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Basic grocery lists</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>3 recipes per month</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>100 basic ingredients</span>
                        </li>
                      </ul>
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => setCurrentPage('onboarding')}
                      >
                        Get Started Free
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Premium Plan */}
                  <Card className="relative border-primary-teal border-2">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge variant="primary" size="large">Most Popular</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-center">
                        <div className="text-2xl font-bold text-gray-900">Premium Plan</div>
                        <div className="text-3xl font-bold text-primary-teal mt-2">$29</div>
                        <div className="text-gray-600">per month</div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Everything in Free, plus:</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>7-day detailed meal plans</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Weekly calendar planning</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Unlimited recipes</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>500+ ingredients database</span>
                        </li>
                        <li className="flex items-center">
                          <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Shopping lists with price estimates</span>
                        </li>
                      </ul>
                      <Button 
                        variant="primary" 
                        className="w-full bg-gradient-to-r from-primary-teal to-primary-sage"
                        onClick={() => setShowUpgradeModal(true)}
                      >
                        Upgrade to Premium
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-secondary-white">
      <Header 
        navigation={navigation.map(item => ({
          ...item,
          onClick: () => handleNavigation(item.href.replace('#', ''))
        }))}
        onAuthAction={handleAuthAction}
        userProfile={userPlan === 'premium' ? { name: 'John Doe', avatar: '/avatar.jpg' } : null}
      />

      <main>
        {renderPage()}
      </main>

      <Footer
        links={[
          { label: 'About', href: '#about' },
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Support', href: '#support' },
          { label: 'Blog', href: '#blog' },
          { label: 'Contact', href: '#contact' },
        ]}
        contactInfo={{
          email: 'hello@nutriwell.com',
          phone: '+1 (555) 123-4567',
          address: 'Toronto, ON, Canada'
        }}
        socialLinks={[
          {
            href: '#twitter',
            label: 'Twitter',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            )
          },
          {
            href: '#instagram',
            label: 'Instagram',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.807.875 1.297 2.026 1.297 3.323 0 1.297-.49 2.448-1.297 3.323-.875.807-2.026 1.297-3.323 1.297z"/>
              </svg>
            )
          }
        ]}
      />

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-teal to-primary-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Upgrade to Premium
              </h3>
              <p className="text-gray-600 mb-6">
                Get unlimited access to all features including weekly meal planning, 
                unlimited recipes, and advanced nutrition tracking for just $29/month.
              </p>
              <div className="space-y-3">
                <Button 
                  variant="primary" 
                  className="w-full bg-gradient-to-r from-primary-teal to-primary-sage"
                  onClick={() => {
                    setUserPlan('premium')
                    setShowUpgradeModal(false)
                    alert('Welcome to Premium! 🎉')
                  }}
                >
                  Start Premium Trial - $29/month
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full"
                  onClick={() => setShowUpgradeModal(false)}
                >
                  Maybe Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 