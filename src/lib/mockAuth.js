// Mock authentication system for development/testing
// This allows the app to work without a properly configured database

export const mockAuth = {
  user: null,
  isAuthenticated: false,
  
  async login() {
    // Simulate login - this should be populated with real user data
    this.user = {
      id: 'mock-user-123',
      email: null, // Will be set from actual authentication
      phone: null,
      wallet: null
    }
    this.isAuthenticated = true
    return this.user
  },
  
  async logout() {
    this.user = null
    this.isAuthenticated = false
  }
}

const DEFAULT_MOCK_USER = {
  id: 'mock-user-123',
  email: '',
  display_name: '',
  onboarding_completed: false,
  onboarding_step: 0,
  subscription_tier: 'free',
  preferences: {
    units: 'metric',
    theme: 'light',
    notifications: true,
    privacy_level: 'private'
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

// Get user data from localStorage or default
const getStoredMockUser = (userId = 'mock-user-123') => {
  try {
    const stored = localStorage.getItem(`nutriwell_user_${userId}`)
    return stored ? { ...DEFAULT_MOCK_USER, ...JSON.parse(stored), id: userId } : { ...DEFAULT_MOCK_USER, id: userId }
  } catch {
    return { ...DEFAULT_MOCK_USER, id: userId }
  }
}

// Store user data in localStorage
const setStoredMockUser = (userData) => {
  try {
    const userId = userData.id || 'mock-user-123'
    localStorage.setItem(`nutriwell_user_${userId}`, JSON.stringify(userData))
    console.log('Stored user data for:', userId, userData)
  } catch (error) {
    console.warn('Failed to store mock user data:', error)
  }
}

export const mockDbUser = getStoredMockUser()

export const mockDbHelpers = {
  async createUser(userData) {
    console.log('Mock: Creating user', userData)
    const newUser = { 
      ...DEFAULT_MOCK_USER, 
      ...userData,
      email: userData.email || '',
      display_name: userData.display_name || userData.email?.split('@')[0] || ''
    }
    setStoredMockUser(newUser)
    return newUser
  },

  async getUserById(id) {
    console.log('Mock: Getting user by ID', id)
    return getStoredMockUser(id)
  },

  async updateUser(id, updates) {
    console.log('Mock: Updating user', id, updates)
    const updatedUser = { 
      ...getStoredMockUser(id), 
      ...updates, 
      id: id,
      updated_at: new Date().toISOString() 
    }
    setStoredMockUser(updatedUser)
    console.log('Mock: User updated and persisted', updatedUser)
    return updatedUser
  }
}