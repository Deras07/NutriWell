import React, { useState } from 'react'
import { Button } from '../ui/button'

export const Header = ({ 
  logo,
  navigation = [],
  userProfile = null,
  onAuthAction,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)

  return (
    <header className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              {logo || (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="font-bold text-xl text-gray-900">NutriWell</span>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick || (() => {})}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    item.active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {userProfile ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-gray-700">{userProfile.name}</span>
                  <svg className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</a>
                    <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</a>
                    <hr className="my-1" />
                    <button 
                      onClick={() => onAuthAction?.('logout')}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Button 
                  variant="tertiary" 
                  size="small"
                  onClick={() => onAuthAction?.('login')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => onAuthAction?.('signup')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick || (() => {})}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  item.active
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Auth Actions */}
          <div className="border-t border-gray-200 pt-4 pb-3">
            {userProfile ? (
              <div className="px-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-base font-medium text-gray-800">{userProfile.name}</div>
                    <div className="text-sm text-gray-500">{userProfile.email}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <a href="#profile" className="block text-gray-700 hover:text-blue-600">Profile</a>
                  <a href="#settings" className="block text-gray-700 hover:text-blue-600">Settings</a>
                  <button 
                    onClick={() => onAuthAction?.('logout')}
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 space-y-3">
                <Button 
                  variant="tertiary" 
                  size="medium"
                  className="w-full"
                  onClick={() => onAuthAction?.('login')}
                >
                  Sign In
                </Button>
                <Button 
                  variant="primary" 
                  size="medium"
                  className="w-full"
                  onClick={() => onAuthAction?.('signup')}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
} 