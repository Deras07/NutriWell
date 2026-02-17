import { useState } from 'react'

export const useAppNavigation = (initialPage = 'home') => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleNavigation = (page) => {
    setCurrentPage(page)
    // Close upgrade modal when navigating
    if (showUpgradeModal) {
      setShowUpgradeModal(false)
    }
  }

  const handleAuthAction = (action) => {
    console.log('Auth action:', action)
    // TODO: Implement authentication logic
    // For now, just navigate to onboarding for sign up
    if (action === 'signup') {
      handleNavigation('onboarding')
    }
  }

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

  return {
    currentPage,
    showUpgradeModal,
    setShowUpgradeModal,
    handleNavigation,
    handleAuthAction,
    navigation
  }
} 