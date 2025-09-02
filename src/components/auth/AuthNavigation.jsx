import React, { useState } from 'react'
import { useAuth } from '../../providers/PrivyProvider'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthNavigation() {
  const { ready, authenticated, user, dbUser, logout } = useAuth()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      setShowProfileMenu(false)
      setShowMobileMenu(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!ready) {
    return (
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#E8B4B8]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center">
                <span className="text-lg">🌱</span>
              </div>
              <span className="ml-3 text-xl font-bold text-[#2C2C2C]">NutriWell</span>
            </div>
            <div className="animate-pulse bg-gray-200 h-8 w-32 rounded"></div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-[#E8B4B8]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center">
              <span className="text-lg">🌱</span>
            </div>
            <span className="ml-3 text-xl font-bold text-[#2C2C2C]">NutriWell</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {authenticated ? (
              <>
                <a href="#dashboard" className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium">
                  Dashboard
                </a>
                <a href="#progress" className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium">
                  Progress
                </a>
                <a href="#meals" className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium">
                  Meal Plans
                </a>
                <a href="#chat" className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium">
                  Chat with Nuri
                </a>
                
                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">
                        {dbUser?.display_name?.charAt(0)?.toUpperCase() || user?.email?.address?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span>{dbUser?.display_name || user?.email?.address?.split('@')[0] || 'User'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border-2 border-[#E8B4B8] py-2"
                      >
                        <a
                          href="#profile"
                          className="block px-4 py-2 text-sm text-[#2C2C2C] hover:bg-[#E8B4B8]/10 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          👤 Profile Settings
                        </a>
                        <a
                          href="#preferences"
                          className="block px-4 py-2 text-sm text-[#2C2C2C] hover:bg-[#E8B4B8]/10 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          ⚙️ Preferences
                        </a>
                        <a
                          href="#subscription"
                          className="block px-4 py-2 text-sm text-[#2C2C2C] hover:bg-[#E8B4B8]/10 transition-colors"
                          onClick={() => setShowProfileMenu(false)}
                        >
                          💎 Subscription
                        </a>
                        <div className="border-t border-gray-200 my-1"></div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          🚪 Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <a href="#features" className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium">
                  Features
                </a>
                <a href="#pricing" className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium">
                  Pricing
                </a>
                <a href="#about" className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium">
                  About
                </a>
                <button className="px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200">
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {showMobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-[#E8B4B8]/20"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {authenticated ? (
                  <>
                    <a
                      href="#dashboard"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      📊 Dashboard
                    </a>
                    <a
                      href="#progress"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      📈 Progress
                    </a>
                    <a
                      href="#meals"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      🍽️ Meal Plans
                    </a>
                    <a
                      href="#chat"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      💬 Chat with Nuri
                    </a>
                    <a
                      href="#profile"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      👤 Profile Settings
                    </a>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
                    >
                      🚪 Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="#features"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      ✨ Features
                    </a>
                    <a
                      href="#pricing"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      💰 Pricing
                    </a>
                    <a
                      href="#about"
                      className="block px-3 py-2 text-[#2C2C2C] hover:text-[#E8B4B8] transition-colors font-medium"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      ℹ️ About
                    </a>
                    <button className="w-full mt-3 px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200">
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close profile menu */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </nav>
  )
}
