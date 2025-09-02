import React, { useState } from 'react'
import { usePrivy, useLogin } from '@privy-io/react-auth'
import { motion, AnimatePresence } from 'framer-motion'

export default function SimpleAuth() {
  const { ready, authenticated, user, logout } = usePrivy()
  const { login } = useLogin()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState(null)

  const handleLogin = async (method) => {
    setIsLoading(true)
    setSelectedMethod(method)
    
    try {
      await login({
        loginMethod: method,
        onSuccess: () => {
          console.log(`✅ ${method} login successful`)
        },
        onError: (error) => {
          console.error(`❌ ${method} login failed:`, error)
          setIsLoading(false)
          setSelectedMethod(null)
        }
      })
    } catch (error) {
      console.error(`❌ ${method} login error:`, error)
      setIsLoading(false)
      setSelectedMethod(null)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#E8B4B8] mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">Loading NutriWell</h2>
          <p className="text-gray-600">Setting up your wellness journey...</p>
        </div>
      </div>
    )
  }

  if (authenticated && user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-8"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎉</span>
            </div>
            <h2 className="text-2xl font-bold text-[#2C2C2C] mb-2">
              Welcome to NutriWell!
            </h2>
            <p className="text-gray-600">
              You're successfully signed in and ready to start your wellness journey.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">User ID</p>
              <p className="font-mono text-sm break-all">{user.id}</p>
            </div>

            {user.email && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-mono text-sm">{user.email.address}</p>
              </div>
            )}

            {user.phoneNumber && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-mono text-sm">{user.phoneNumber.number}</p>
              </div>
            )}

            {user.wallet && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Wallet Address</p>
                <p className="font-mono text-sm break-all">{user.wallet.address}</p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              🚀 Go to Dashboard
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full bg-gray-100 hover:bg-gray-200 text-[#2C2C2C] font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              🚪 Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-8"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🌱</span>
          </div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] mb-2">Welcome to NutriWell</h1>
          <p className="text-gray-600">Sign in to start your personalized wellness journey</p>
        </div>

        <div className="space-y-4">
          {/* Primary Login Methods */}
          <button
            onClick={() => handleLogin('email')}
            disabled={isLoading}
            className="w-full bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-3"
          >
            {selectedMethod === 'email' && isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <span>📧</span>
            )}
            <span>Continue with Email</span>
          </button>

          <button
            onClick={() => handleLogin('sms')}
            disabled={isLoading}
            className="w-full bg-[#EED6D3] hover:bg-[#E8C5C2] text-[#2C2C2C] font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-3"
          >
            {selectedMethod === 'sms' && isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#E8B4B8]"></div>
            ) : (
              <span>📱</span>
            )}
            <span>Continue with SMS</span>
          </button>

          <button
            onClick={() => handleLogin('wallet')}
            disabled={isLoading}
            className="w-full bg-[#E8D5C4] hover:bg-[#D4C5B4] text-[#2C2C2C] font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-3"
          >
            {selectedMethod === 'wallet' && isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#E8B4B8]"></div>
            ) : (
              <span>🪙</span>
            )}
            <span>Connect Wallet</span>
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Methods */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'google', label: 'Google', icon: '🔍' },
              { key: 'twitter', label: 'Twitter', icon: '🐦' },
              { key: 'discord', label: 'Discord', icon: '🎮' },
              { key: 'github', label: 'GitHub', icon: '💻' }
            ].map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => handleLogin(key)}
                disabled={isLoading}
                className="bg-white border-2 border-gray-300 hover:border-[#E8B4B8] text-[#2C2C2C] font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
              >
                {selectedMethod === key && isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#E8B4B8]"></div>
                ) : (
                  <span>{icon}</span>
                )}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Setting up your account...
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-400">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </motion.div>
    </div>
  )
}
