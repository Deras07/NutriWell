import React, { useState } from 'react'
import { useAuth } from '../../providers/PrivyProvider'
import SimpleAuth from './SimpleAuth'
import AuthNavigation from './AuthNavigation'
import UserProfileManager from './UserProfileManager'
import NuriAssistant from '../ai/NuriAssistant'
import LandingPage from './LandingPage'

export default function AppWithAuth() {
  const { ready, authenticated, user, dbUser, loading } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  if (!ready || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E8B4B8] mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Loading NutriWell</h2>
            <p className="text-gray-600">Setting up your wellness journey...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show landing page if not authenticated and auth not requested
  if (!authenticated && !showAuth) {
    return <LandingPage onGetStarted={() => setShowAuth(true)} />
  }

  // Show authentication flow if not authenticated but auth requested
  if (!authenticated && showAuth) {
    return <SimpleAuth />
  }

  // User is authenticated - show main app
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
      <AuthNavigation />
      
      {/* Main App Content */}
      <div className="pt-6">
        <NuriAssistant />
      </div>
    </div>
  )
}

// Alternative component that shows profile management
export function ProfilePage() {
  const { ready, authenticated, loading } = useAuth()

  if (!ready || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E8B4B8] mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Loading Profile</h2>
            <p className="text-gray-600">Please wait...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your profile</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200"
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
      <AuthNavigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UserProfileManager />
      </div>
    </div>
  )
}
