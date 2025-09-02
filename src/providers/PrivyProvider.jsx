import { PrivyProvider, usePrivy, useLogin, useLogout } from '@privy-io/react-auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { mainnet } from 'viem/chains'
import { supabase, dbHelpers } from '../lib/supabase'
import { mockDbHelpers, mockDbUser } from '../lib/mockAuth'

// Auth context for combining Privy with Supabase
const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

// Inner component that uses Privy hooks
function AuthProviderInner({ children }) {
  const { ready, authenticated, user, logout: privyLogout } = usePrivy()
  const { login } = useLogin()
  const [dbUser, setDbUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Sync Privy user with Supabase database
  useEffect(() => {
    async function syncUser() {
      console.log('🟣 PrivyProvider: syncUser called', { ready, authenticated, user: user?.id })
      
      if (!ready) {
        console.log('🟣 PrivyProvider: Not ready, returning early')
        return
      }
      
      setLoading(true)
      setError(null)

      try {
        if (authenticated && user) {
          console.log('🟣 PrivyProvider: User authenticated, syncing with database', user.id)
          
          let userData = null
          const useMockMode = false // Change to true if database is unavailable
          
          if (useMockMode) {
            console.log('🟣 PrivyProvider: Using mock mode')
            // Use mock mode when database is unavailable
            userData = await mockDbHelpers.getUserById(user.id)
            // If this is a new user, create them with proper email
            if (!userData.email && user.email?.address) {
              userData = await mockDbHelpers.createUser({
                id: user.id,
                email: user.email.address,
                display_name: user.email.address.split('@')[0]
              })
            }
          } else {
            console.log('🟣 PrivyProvider: Using database mode')
            // Normal database mode
            userData = await dbHelpers.getUserById(user.id)
            if (!userData) {
              console.log('🟣 PrivyProvider: Creating new user in database')
              // Create new user in database
              userData = await dbHelpers.createUser({
                id: user.id,
                email: user.email?.address || '',
                display_name: user.email?.address?.split('@')[0] || 'User'
              })
            }
          }

          console.log('🟣 PrivyProvider: Setting user data', userData)
          setDbUser(userData)
        } else {
          console.log('🟣 PrivyProvider: User not authenticated, clearing dbUser')
          setDbUser(null)
        }
      } catch (err) {
        console.error('🟣 PrivyProvider: Error syncing user:', err)
        setError(err.message)
        // Fallback to mock mode
        if (authenticated && user) {
          console.log('🟣 PrivyProvider: Falling back to mock mode')
          const userData = await mockDbHelpers.getUserById(user.id)
          setDbUser(userData)
        }
      } finally {
        setLoading(false)
        console.log('🟣 PrivyProvider: syncUser completed')
      }
    }

    syncUser()
  }, [ready, authenticated, user?.id])

  const logout = async () => {
    try {
      console.log('🟣 PrivyProvider: Starting logout...')
      await privyLogout()
      setDbUser(null)
      console.log('🟣 PrivyProvider: Logout completed')
    } catch (error) {
      console.error('🟣 PrivyProvider: Logout error:', error)
    }
  }

  const updateUserProfile = async (updates) => {
    if (!user || !dbUser) {
      throw new Error('User not authenticated')
    }

    try {
      setLoading(true)
      let updatedUser
      
      try {
        updatedUser = await dbHelpers.updateUser(user.id, {
          ...updates,
          updated_at: new Date().toISOString()
        })
      } catch (dbError) {
        console.warn('Database update failed, using mock update:', dbError)
        // Fallback to mock update for development
        updatedUser = await mockDbHelpers.updateUser(user.id, updates)
      }
      
      console.log('PrivyProvider - setting updated user:', updatedUser)
      setDbUser(updatedUser)
      return updatedUser
    } catch (err) {
      console.error('Error updating user profile:', err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const value = {
    // Privy auth state
    ready,
    authenticated,
    user,
    login,
    logout,
    
    // Database user state
    dbUser,
    loading,
    error,
    
    // Helper functions
    updateUserProfile,
    
    // Computed values
    isAuthenticated: ready && authenticated && user && dbUser,
    isPremium: dbUser?.subscription_tier === 'premium'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Main provider component
export function AuthProvider({ children }) {
  const appId = 'cmdf0y8n9016ajr0mip04tin3'
  
  return (
    <PrivyProvider
      appId={appId}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#E8B4B8', // Using your app's pastel coral color
          showWalletLoginFirst: false,
          logo: 'https://your-logo-url.com/logo.png' // Add your app logo URL here
        },
        loginMethods: [
          'email',
          'sms', 
          'wallet',
          'google',
          'twitter',
          'discord',
          'github'
        ],
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // Create wallet for users who don't have one
          noPromptOnSignature: true
        },
        supportedChains: [
          mainnet,
          // Add more chains as needed
        ],
        defaultChain: mainnet,
        // Email and SMS configuration
        emailLogin: {
          requireVerification: true,
          showWalletOnboardingAfterLogin: true
        },
        // SMS configuration
        smsLogin: {
          requireVerification: true,
          showWalletOnboardingAfterLogin: true
        },
        // Social login configuration
        socialLogins: {
          google: {
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || '', // Add your Google OAuth client ID
          },
          twitter: {
            clientId: process.env.REACT_APP_TWITTER_CLIENT_ID || '', // Add your Twitter OAuth client ID
          },
          discord: {
            clientId: process.env.REACT_APP_DISCORD_CLIENT_ID || '', // Add your Discord OAuth client ID
          },
          github: {
            clientId: process.env.REACT_APP_GITHUB_CLIENT_ID || '', // Add your GitHub OAuth client ID
          }
        },
        // Wallet configuration
        walletConnect: {
          projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || '', // Add your WalletConnect project ID
        }
      }}
    >
      <AuthProviderInner>
        {children}
      </AuthProviderInner>
    </PrivyProvider>
  )
}