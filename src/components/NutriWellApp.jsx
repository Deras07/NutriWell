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
    { label: 'Home', href: '#home', active: currentPage === 'home' },
    { label: 'Get Plan', href: '#onboarding', active: currentPage === 'onboarding' },
    { label: 'Meal Planning', href: '#meal-planning', active: currentPage === 'meal-planning' },
    { label: 'Recipe Builder', href: '#recipes', active: currentPage === 'recipes' },
    { label: 'Grocery Lists', href: '#grocery', active: currentPage === 'grocery' },
    { label: 'Nutrition Tracker', href: '#tracker', active: currentPage === 'tracker' },
    { label: 'Dashboard', href: '#dashboard', active: currentPage === 'dashboard' },
    { label: 'Learn', href: '#education', active: currentPage === 'education' },
    { label: 'Community', href: '#community', active: currentPage === 'community' },
    { label: 'Activity', href: '#activity', active: currentPage === 'activity' },
    { label: 'Profile', href: '#profile', active: currentPage === 'profile' }
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
          <OnboardingFlow 
            onComplete={handleOnboardingComplete}
            className="py-12"
          />
        )
      
      case 'meal-plan-results':
        return (
          <MealPlanDisplay 
            userData={onboardingData}
            onGetFullPlan={handleGetFullPlan}
            className="py-12"
          />
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
                // Free version - redirect to grocery list generator
                <div className="text-center">
                  <Card className="max-w-2xl mx-auto">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Meal Planning Available in Premium
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Get access to weekly meal planning, drag-and-drop calendar, 
                        and custom recipe scheduling with our Premium plan.
                      </p>
                      <div className="space-y-4">
                        <Button 
                          variant="primary" 
                          size="large"
                          onClick={() => setShowUpgradeModal(true)}
                        >
                          Upgrade to Premium - $29/month
                        </Button>
                        <div className="text-sm text-gray-500">
                          Or try our <button 
                            onClick={() => setCurrentPage('grocery')}
                            className="text-primary-teal hover:underline"
                          >
                            free meal plan generator
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <WeeklyMealPlanner />
              )}
            </div>
          </div>
        )
      
      case 'recipes':
        return (
          <div className="py-12">
            <RecipeBuilder userPlan={userPlan} />
          </div>
        )
      
      case 'grocery':
        return (
          <div className="py-12">
            <GroceryListGenerator userPlan={userPlan} />
          </div>
        )

      case 'tracker':
        return (
          <div className="py-12">
            <NutritionTracker userPlan={userPlan} />
          </div>
        )

      case 'dashboard':
        return (
          <div className="py-12">
            <ProgressDashboard userPlan={userPlan} />
          </div>
        )

      case 'education':
        return (
          <div className="py-12">
            <EducationalHub userPlan={userPlan} />
          </div>
        )

      case 'community':
        return (
          <div className="py-12">
            <CommunityForum userPlan={userPlan} />
          </div>
        )

      case 'activity':
        return (
          <div className="py-12">
            <ActivityTracker userPlan={userPlan} />
          </div>
        )

      case 'profile':
        return (
          <div className="py-12">
            <UserProfile userPlan={userPlan} />
          </div>
        )
      
      default:
        return (
          <div>
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary-sage/20 via-secondary-white to-primary-teal/20 py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center animate-fade-in">
                  <h1 className="font-heading text-5xl md:text-6xl font-bold text-text-dark mb-6">
                    Your Complete Nutrition
                    <span className="bg-gradient-to-r from-primary-teal to-accent-coral bg-clip-text text-transparent"> Planning Platform</span>
                  </h1>
                  <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
                    From personalized meal plans to grocery lists and recipe building - 
                    everything you need for healthy eating in one place.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      variant="primary" 
                      size="large" 
                      className="bg-gradient-to-r from-primary-teal to-primary-sage hover:from-primary-sage hover:to-primary-teal"
                      onClick={() => setCurrentPage('onboarding')}
                    >
                      Get Your Free Plan
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="large"
                      onClick={() => setCurrentPage('recipes')}
                    >
                      Try Recipe Builder
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="font-heading text-4xl font-bold text-text-dark mb-4">
                    Everything You Need for Healthy Eating
                  </h2>
                  <p className="text-xl text-text-light max-w-2xl mx-auto">
                    Complete nutrition planning tools designed for busy lifestyles
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FeatureCard
                    icon={
                      <svg className="w-8 h-8 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    }
                    title="Personalized Plans"
                    description="Get customized meal plans based on your goals, preferences, and lifestyle"
                    onClick={() => setCurrentPage('onboarding')}
                  />
                  
                  <FeatureCard
                    icon={
                      <svg className="w-8 h-8 text-primary-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M8 19l8-8M8 19H5a2 2 0 01-2-2v-6a2 2 0 012-2h3m5 8h7a2 2 0 002-2v-6a2 2 0 00-2-2h-7m-5-4v2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    }
                    title="Recipe Builder"
                    description="Create custom recipes with automatic nutrition calculations and ingredient database"
                    onClick={() => setCurrentPage('recipes')}
                  />
                  
                  <FeatureCard
                    icon={
                      <svg className="w-8 h-8 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12H3m18 0l-3-3m3 3l-3 3" />
                      </svg>
                    }
                    title="Smart Grocery Lists"
                    description="Organized shopping lists categorized by food groups with print functionality"
                    onClick={() => setCurrentPage('grocery')}
                  />
                  
                  <FeatureCard
                    icon={
                      <svg className="w-8 h-8 text-accent-golden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M8 19l8-8M8 19H5a2 2 0 01-2-2v-6a2 2 0 012-2h3m5 8h7a2 2 0 002-2v-6a2 2 0 00-2-2h-7m-5-4v2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    }
                    title="Weekly Planning"
                    description="Calendar-based meal planning with drag-and-drop functionality (Premium)"
                    onClick={() => setCurrentPage('meal-planning')}
                  />
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