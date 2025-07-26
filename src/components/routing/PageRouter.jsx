import React, { Suspense, lazy } from 'react'
import { PageLoadingSkeleton } from '../ui/LoadingSpinner'
import { HomePage } from '../pages/HomePage'

// Lazy load heavy components
const OnboardingFlow = lazy(() => import('../onboarding/OnboardingFlow').then(module => ({ default: module.OnboardingFlow })))
const MealPlanDisplay = lazy(() => import('../meal-planning/MealPlanDisplay').then(module => ({ default: module.MealPlanDisplay })))
const RecipeBuilder = lazy(() => import('../recipe/RecipeBuilder').then(module => ({ default: module.RecipeBuilder })))
const GroceryListGenerator = lazy(() => import('../grocery/GroceryList').then(module => ({ default: module.GroceryListGenerator })))
const WeeklyMealPlanner = lazy(() => import('../ui/calendar').then(module => ({ default: module.WeeklyMealPlanner })))
const NutritionTracker = lazy(() => import('../tracking/NutritionTracker').then(module => ({ default: module.NutritionTracker })))
const ProgressDashboard = lazy(() => import('../dashboard/ProgressDashboard').then(module => ({ default: module.ProgressDashboard })))
const EducationalHub = lazy(() => import('../education/EducationalHub').then(module => ({ default: module.EducationalHub })))
const CommunityForum = lazy(() => import('../community/CommunityForum').then(module => ({ default: module.CommunityForum })))
const ActivityTracker = lazy(() => import('../activity/ActivityTracker').then(module => ({ default: module.ActivityTracker })))
const UserProfile = lazy(() => import('../profile/UserProfile').then(module => ({ default: module.UserProfile })))

export const PageRouter = ({ 
  currentPage, 
  userPlan, 
  onboardingData, 
  onNavigate, 
  onShowUpgrade,
  onOnboardingComplete,
  onGetFullPlan,
  dbUser
}) => {
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={onNavigate}
            onShowUpgrade={onShowUpgrade}
            userPlan={userPlan}
          />
        )

      case 'onboarding':
        return (
          <div className="min-h-screen bg-gradient-to-br from-secondary-mint via-secondary-white to-secondary-peach">
            <div className="max-w-4xl mx-auto px-4 py-12">
                             <Suspense fallback={<PageLoadingSkeleton variant="onboarding" />}>
                 <OnboardingFlow 
                   onComplete={onOnboardingComplete}
                 />
               </Suspense>
            </div>
          </div>
        )

      case 'meal-planning':
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary-sage/10 via-secondary-white to-accent-lime/10 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-16 h-16 bg-primary-sage/20 rounded-full animate-float"></div>
              <div className="absolute top-1/4 right-20 w-12 h-12 bg-accent-lime/30 rounded-full animate-bounce-gentle"></div>
              <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-primary-sage/15 rounded-full animate-pulse-slow"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
              {userPlan === 'free' ? (
                <div className="text-center animate-slide-up">
                  <div className="inline-flex items-center space-x-2 bg-primary-sage/10 px-4 py-2 rounded-full mb-4">
                    <span className="text-2xl animate-bounce-gentle">🗓️</span>
                    <span className="text-primary-sage font-medium">Weekly Meal Planning</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                    Upgrade for
                    <span className="bg-gradient-to-r from-primary-sage to-accent-lime bg-clip-text text-transparent"> Weekly Planning</span>
                  </h1>
                  <p className="text-xl text-text-light max-w-2xl mx-auto mb-8">
                    Get access to interactive weekly meal calendars, advanced planning tools, and unlimited recipe variations
                  </p>
                  <button 
                    onClick={() => onShowUpgrade(true)}
                    className="bg-gradient-to-r from-primary-sage to-primary-teal text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 mb-12"
                  >
                    Unlock Premium Planning
                  </button>
                </div>
              ) : (
                                 <Suspense fallback={<PageLoadingSkeleton />}>
                   <WeeklyMealPlanner onPlanUpdate={() => {}} />
                 </Suspense>
              )}
            </div>
          </div>
        )

      case 'recipes':
        return (
          <div className="min-h-screen bg-gradient-to-br from-secondary-mint via-secondary-white to-secondary-peach overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-20 left-10 w-16 h-16 bg-primary-sage/20 rounded-full animate-float"></div>
              <div className="absolute top-1/4 right-20 w-12 h-12 bg-accent-lime/30 rounded-full animate-bounce-gentle"></div>
              <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-primary-sage/15 rounded-full animate-pulse-slow"></div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
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
                <Suspense fallback={<PageLoadingSkeleton variant="recipes" />}>
                  <RecipeBuilder userPlan={userPlan} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      case 'grocery':
        return (
          <div className="min-h-screen bg-gradient-to-br from-secondary-peach via-secondary-white to-secondary-mint">
            <div className="max-w-7xl mx-auto px-4 py-12">
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
                <Suspense fallback={<PageLoadingSkeleton />}>
                  <GroceryListGenerator userPlan={userPlan} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      case 'tracker':
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary-teal/10 via-secondary-white to-accent-golden/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
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
                <Suspense fallback={<PageLoadingSkeleton variant="nutrition" />}>
                  <NutritionTracker userPlan={userPlan} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      case 'dashboard':
        return (
          <div className="min-h-screen bg-gradient-to-br from-accent-golden/10 via-secondary-white to-primary-sage/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-accent-golden/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">📈</span>
                  <span className="text-accent-golden font-medium">Progress Dashboard</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Your Nutrition
                  <span className="bg-gradient-to-r from-accent-golden to-primary-sage bg-clip-text text-transparent"> Journey</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Comprehensive view of your health and nutrition progress
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Suspense fallback={<PageLoadingSkeleton variant="dashboard" />}>
                  <ProgressDashboard userPlan={userPlan} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      case 'education':
        return (
          <div className="min-h-screen bg-gradient-to-br from-info/10 via-secondary-white to-primary-teal/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-info/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">🎓</span>
                  <span className="text-info font-medium">Educational Hub</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Learn About
                  <span className="bg-gradient-to-r from-info to-primary-teal bg-clip-text text-transparent"> Nutrition</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Evidence-based nutrition education and resources
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Suspense fallback={<PageLoadingSkeleton variant="education" />}>
                  <EducationalHub userPlan={userPlan} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      case 'community':
        return (
          <div className="min-h-screen bg-gradient-to-br from-success/10 via-secondary-white to-primary-sage/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-success/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">👥</span>
                  <span className="text-success font-medium">Community Forum</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Join Our
                  <span className="bg-gradient-to-r from-success to-primary-sage bg-clip-text text-transparent"> Community</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Connect with others on their nutrition journey
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Suspense fallback={<PageLoadingSkeleton variant="community" />}>
                  <CommunityForum userPlan={userPlan} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      case 'activity':
        return (
          <div className="min-h-screen bg-gradient-to-br from-warning/10 via-secondary-white to-accent-orange/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-warning/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">🏃‍♂️</span>
                  <span className="text-warning font-medium">Activity Tracker</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Track Your
                  <span className="bg-gradient-to-r from-warning to-accent-orange bg-clip-text text-transparent"> Activity</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Monitor your physical activity and exercise goals
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Suspense fallback={<PageLoadingSkeleton variant="activity" />}>
                  <ActivityTracker userPlan={userPlan} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="min-h-screen bg-gradient-to-br from-primary-sage/10 via-secondary-white to-primary-teal/10">
            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="text-center mb-12 animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-primary-sage/10 px-4 py-2 rounded-full mb-4">
                  <span className="text-2xl animate-bounce-gentle">👤</span>
                  <span className="text-primary-sage font-medium">User Profile</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
                  Your
                  <span className="bg-gradient-to-r from-primary-sage to-primary-teal bg-clip-text text-transparent"> Profile</span>
                </h1>
                <p className="text-xl text-text-light max-w-2xl mx-auto">
                  Manage your account settings and preferences
                </p>
              </div>
              <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Suspense fallback={<PageLoadingSkeleton variant="profile" />}>
                  <UserProfile userPlan={userPlan} dbUser={dbUser} />
                </Suspense>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <HomePage 
            onNavigate={onNavigate}
            onShowUpgrade={onShowUpgrade}
            userPlan={userPlan}
          />
        )
    }
  }

  return renderPage()
} 