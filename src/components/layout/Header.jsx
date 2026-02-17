import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button'

export const Header = ({ 
  logo = null,
  navigation = [],
  userProfile = null,
  onAuthAction,
  onLogoClick,
  onNavigate,
  className = ''
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const headerRef = useRef(null)

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setActiveDropdown(null)
        setIsProfileOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    const handleCloseDropdowns = () => {
      setActiveDropdown(null)
      setIsMobileMenuOpen(false)
      setIsProfileOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('closeDropdowns', handleCloseDropdowns)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('closeDropdowns', handleCloseDropdowns)
    }
  }, [])

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen)
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index)
  }

  return (
    <header ref={headerRef} className={`bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          {/* Logo - Left Side */}
          <div className="flex items-center justify-start">
            <div className="flex-shrink-0">
              {logo || (
                <button 
                  onClick={onLogoClick}
                  className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200 cursor-pointer group"
                  aria-label="Go to home page"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-sage to-primary-teal rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary-teal to-accent-coral bg-clip-text text-transparent group-hover:from-accent-coral group-hover:to-primary-sage transition-colors duration-200">NutriWell</span>
                </button>
              )}
            </div>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:block">
            <div className="flex items-center justify-center space-x-8">
              {navigation.map((item, index) => (
                <div key={index} className="relative">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => toggleDropdown(index)}
                        className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                          item.active
                            ? 'text-primary-teal bg-primary-sage/10 shadow-sm'
                            : 'text-gray-700 hover:text-primary-teal hover:bg-primary-sage/5'
                        }`}
                      >
                        <span>{item.label}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeDropdown === index && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                          {item.dropdown.map((dropdownItem, dropdownIndex) => (
                            <button
                              key={dropdownIndex}
                              onClick={() => {
                                dropdownItem.onClick?.()
                                setActiveDropdown(null)
                                setIsProfileOpen(false)
                                setIsMobileMenuOpen(false)
                              }}
                              className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:text-primary-teal hover:bg-primary-sage/5 transition-colors duration-200"
                            >
                              {dropdownItem.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        item.onClick?.()
                        setActiveDropdown(null)
                        setIsProfileOpen(false)
                        setIsMobileMenuOpen(false)
                      }}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        item.active
                          ? 'text-primary-teal bg-primary-sage/10 shadow-sm'
                          : 'text-gray-700 hover:text-primary-teal hover:bg-primary-sage/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Desktop Actions - Right Side */}
          <div className="hidden md:flex items-center justify-end space-x-4">
            {userProfile ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {userProfile.avatar ? (
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-teal to-accent-coral flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {userProfile.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{userProfile.name}</span>
                  <div className="flex items-center space-x-1">
                    {userProfile.plan === 'premium' && (
                      <span className="text-xs bg-gradient-to-r from-accent-golden to-accent-lime text-white px-2 py-0.5 rounded-full font-medium">
                        Pro
                      </span>
                    )}
                    <svg className={`w-4 h-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{userProfile.plan} Plan</p>
                    </div>
                    <button 
                      onClick={() => {
                        onNavigate?.('profile')
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Profile & Settings
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate?.('dashboard')
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dashboard
                    </button>
                    {userProfile.plan === 'free' && (
                      <button 
                        onClick={() => {
                          // Trigger upgrade modal
                          setIsProfileOpen(false)
                          // You might want to add an onUpgrade prop to handle this
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-accent-golden hover:bg-accent-golden/5 transition-colors"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Upgrade to Pro
                      </button>
                    )}
                    <hr className="my-2" />
                    <button 
                      onClick={() => {
                        onAuthAction?.('logout')
                        setIsProfileOpen(false)
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
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
                  onClick={(e) => {
                    console.log('🟢 Header: Sign In button clicked!', e)
                    e.preventDefault()
                    e.stopPropagation()
                    onAuthAction?.('login')
                  }}
                >
                  Sign In
                </Button>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={(e) => {
                    console.log('🟢 Header: Get Started button clicked!', e)
                    e.preventDefault()
                    e.stopPropagation()
                    onAuthAction?.('signup')
                  }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button - Right Side */}
          <div className="md:hidden flex justify-end">
            <button
              onClick={toggleMobileMenu}
              className="p-3 rounded-xl text-text-charcoal hover:text-primary-teal hover:bg-primary-sage/5 transition-all duration-200 shadow-sm"
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
              <div key={index}>
                {item.dropdown ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`flex w-full items-center justify-between px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                        item.active
                          ? 'text-primary-teal bg-primary-sage/10'
                          : 'text-gray-700 hover:text-primary-teal hover:bg-primary-sage/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          activeDropdown === index ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === index && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.dropdown.map((dropdownItem, dropdownIndex) => (
                          <button
                            key={dropdownIndex}
                            onClick={() => {
                              dropdownItem.onClick?.()
                              setActiveDropdown(null)
                              setIsMobileMenuOpen(false)
                            }}
                            className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-primary-teal hover:bg-primary-sage/5 rounded-md transition-colors"
                          >
                            {dropdownItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      item.onClick?.()
                      setIsMobileMenuOpen(false)
                    }}
                    className={`block w-full text-left px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                      item.active
                        ? 'text-primary-teal bg-primary-sage/10'
                        : 'text-gray-700 hover:text-primary-teal hover:bg-primary-sage/5'
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Mobile Auth Actions */}
          <div className="border-t border-gray-200 pt-4 pb-3">
            {userProfile ? (
              <div className="px-4">
                <div className="flex items-center space-x-3 mb-3">
                  {userProfile.avatar ? (
                    <img
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-teal to-accent-coral flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {userProfile.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="text-base font-medium text-gray-800">{userProfile.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{userProfile.plan} Plan</div>
                  </div>
                  {userProfile.plan === 'premium' && (
                    <span className="text-xs bg-gradient-to-r from-accent-golden to-accent-lime text-white px-2 py-1 rounded-full font-medium">
                      Pro
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      onNavigate?.('profile')
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left text-gray-700 hover:text-primary-teal transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile & Settings
                  </button>
                  <button 
                    onClick={() => {
                      onNavigate?.('dashboard')
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left text-gray-700 hover:text-primary-teal transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Dashboard
                  </button>
                  {userProfile.plan === 'free' && (
                    <button 
                      onClick={() => {
                        // Trigger upgrade modal
                        setIsMobileMenuOpen(false)
                      }}
                      className="flex items-center w-full text-left text-accent-golden hover:text-accent-golden/80 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Upgrade to Pro
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      onAuthAction?.('logout')
                      setIsMobileMenuOpen(false)
                    }}
                    className="flex items-center w-full text-left text-gray-700 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
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