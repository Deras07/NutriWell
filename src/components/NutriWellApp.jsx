import React, { useState } from 'react'
import { useAuth } from '../providers/PrivyProvider'
import { AuthScreen } from './auth/AuthScreen'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { UserProfile } from './profile/UserProfile'
import NutritionWizard from './nutrition/NutritionWizard'

export const NutriWellApp = () => {
  const { 
    isAuthenticated, 
    dbUser, 
    ready, 
    loading,
    isPremium,
    logout,
    login
  } = useAuth()
  
  const [currentPage, setCurrentPage] = useState('nutrition-wizard')

  // Show loading screen while auth is initializing
  if (!ready || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-sage/10 via-secondary-white to-accent-coral/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-teal mx-auto mb-4"></div>
          <p className="text-text-light">Loading NutriWell...</p>
        </div>
      </div>
    )
  }

  // Get user plan from database
  const userPlan = dbUser?.subscription_tier || 'free'

  const navigation = [
    { label: 'Nutrition Calculator', href: '#nutrition-wizard', active: currentPage === 'nutrition-wizard', onClick: () => handleNavigation('nutrition-wizard') }
  ]

  const handleNavigation = (page) => {
    setCurrentPage(page)
  }

  const handleAuthAction = async (action) => {
    if (action === 'logout') {
      logout()
    } else if (action === 'login') {
      try {
        await login()
      } catch (error) {
        console.error('Login error:', error)
        alert('Sign-in failed. Please try again.')
      }
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        // Require authentication for profile
        if (!isAuthenticated) {
          return <AuthScreen />
        }
        return <UserProfile userPlan={userPlan} dbUser={dbUser} />

      case 'nutrition-wizard':
      default:
        return <NutritionWizard />
    }
  }

  return (
    <div className="min-h-screen bg-secondary-white">
      <Header 
        navigation={navigation.map(item => ({
          ...item,
          onClick: () => handleNavigation(item.href.replace('#', ''))
        }))}
        userProfile={dbUser ? { 
          name: dbUser.display_name || dbUser.email || 'User', 
          avatar: dbUser.avatar_url,
          plan: userPlan 
        } : null}
        onAuthAction={handleAuthAction}
        onLogoClick={() => handleNavigation('nutrition-wizard')}
        onNavigate={handleNavigation}
      />
      
      <main>
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  )
}