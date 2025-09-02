import React, { useState } from 'react'
import { usePrivy, useLogin } from '@privy-io/react-auth'

export default function AuthTest() {
  const { ready, authenticated, user, logout } = usePrivy()
  const { login } = useLogin()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (method) => {
    setIsLoading(true)
    try {
      await login({
        loginMethod: method,
        onSuccess: () => {
          console.log(`✅ ${method} login successful`)
        },
        onError: (error) => {
          console.error(`❌ ${method} login failed:`, error)
        }
      })
    } catch (error) {
      console.error(`❌ ${method} login error:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E8B4B8] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Privy...</p>
        </div>
      </div>
    )
  }

  if (authenticated && user) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border-2 border-[#E8B4B8]">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#2C2C2C]">
          Welcome to NutriWell! 🎉
        </h2>
        
        <div className="space-y-4 mb-6">
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

        <button
          onClick={logout}
          className="w-full bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border-2 border-[#E8B4B8]">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#2C2C2C]">
        Welcome to NutriWell 🌱
      </h2>
      
      <p className="text-center text-gray-600 mb-8">
        Choose your preferred way to sign in
      </p>

      <div className="space-y-3">
        {/* Email Login */}
        <button
          onClick={() => handleLogin('email')}
          disabled={isLoading}
          className="w-full bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          📧 Continue with Email
        </button>

        {/* SMS Login */}
        <button
          onClick={() => handleLogin('sms')}
          disabled={isLoading}
          className="w-full bg-[#EED6D3] hover:bg-[#E8C5C2] text-[#2C2C2C] font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          📱 Continue with SMS
        </button>

        {/* Wallet Login */}
        <button
          onClick={() => handleLogin('wallet')}
          disabled={isLoading}
          className="w-full bg-[#E8D5C4] hover:bg-[#D4C5B4] text-[#2C2C2C] font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          🪙 Connect Wallet
        </button>

        {/* Social Logins */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-center text-sm text-gray-500 mb-3">Or continue with</p>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleLogin('google')}
              disabled={isLoading}
              className="bg-white border-2 border-gray-300 hover:border-gray-400 text-[#2C2C2C] font-medium py-2 px-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <span className="text-red-500">G</span>oogle
            </button>
            
            <button
              onClick={() => handleLogin('twitter')}
              disabled={isLoading}
              className="bg-white border-2 border-gray-300 hover:border-gray-400 text-[#2C2C2C] font-medium py-2 px-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <span className="text-blue-400">T</span>witter
            </button>
            
            <button
              onClick={() => handleLogin('discord')}
              disabled={isLoading}
              className="bg-white border-2 border-gray-300 hover:border-gray-400 text-[#2C2C2C] font-medium py-2 px-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <span className="text-indigo-500">D</span>iscord
            </button>
            
            <button
              onClick={() => handleLogin('github')}
              disabled={isLoading}
              className="bg-white border-2 border-gray-300 hover:border-gray-400 text-[#2C2C2C] font-medium py-2 px-3 rounded-lg transition-colors disabled:opacity-50"
            >
              <span className="text-gray-800">G</span>itHub
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#E8B4B8] mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Setting up authentication...</p>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  )
}
