import React, { useState } from 'react'
import { useAuth } from '../../providers/PrivyProvider'
import { Button } from '../ui/button'

export function AuthScreen() {
  const { login, ready } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    console.log('🔴 AuthScreen: handleLogin called', { ready, loading })
    
    if (!ready) {
      console.log('🔴 AuthScreen: Not ready, returning early')
      return
    }
    
    try {
      setLoading(true)
      console.log('🔴 AuthScreen: Starting login process...')
      await login()
      console.log('🔴 AuthScreen: Login completed successfully')
    } catch (error) {
      console.error('🔴 AuthScreen: Login error:', error)
      // Show user-friendly error message
      alert('Sign-in failed. Please try again.')
    } finally {
      setLoading(false)
      console.log('🔴 AuthScreen: Login process finished, loading set to false')
    }
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo and branding */}
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NutriWell</h1>
            <p className="text-lg text-gray-600">Your Personal Nutrition Companion</p>
          </div>

          {/* Features preview */}
          <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 mb-8">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Get Started with NutriWell
                </h2>
                <p className="text-gray-600">
                  Track nutrition, plan meals, and achieve your health goals
                </p>
              </div>

              {/* Feature highlights */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Nutrition Tracking</h3>
                    <p className="text-sm text-gray-600">Log meals and track your daily nutrition intake</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Meal Planning</h3>
                    <p className="text-sm text-gray-600">Plan your weekly meals and generate shopping lists</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Progress Tracking</h3>
                    <p className="text-sm text-gray-600">Monitor your health goals and see your progress</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="h-4 w-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Recipe Builder</h3>
                    <p className="text-sm text-gray-600">Create and save your favorite healthy recipes</p>
                  </div>
                </div>
              </div>

              {/* Login button */}
              <div className="mt-8">
                <Button
                  onClick={(e) => {
                    console.log('🔴 AuthScreen: Button clicked!', e)
                    e.preventDefault()
                    e.stopPropagation()
                    handleLogin()
                  }}
                  loading={loading}
                  disabled={!ready}
                  className="w-full"
                  size="large"
                >
                  Get Started - Sign In
                </Button>
              </div>

              {/* Login methods info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Sign in with your preferred method:
                </p>
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Email</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>SMS</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Wallet</span>
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                  Your data is encrypted and secure.
                </p>
              </div>
            </div>
          </div>

          {/* Additional info */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              ✨ <strong>Free to get started</strong> - Premium features available
            </p>
            <p className="text-xs text-gray-500">
              Join thousands of users improving their health with NutriWell
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}