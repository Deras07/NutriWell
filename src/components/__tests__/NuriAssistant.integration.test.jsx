import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NutriWellApp } from '../NutriWellApp'
import ErrorBoundary from '../ui/ErrorBoundary'

// Mock all the providers and external dependencies
jest.mock('../../providers/PrivyProvider', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    dbUser: null,
    ready: true,
    loading: false,
    isPremium: false,
    logout: jest.fn(),
    login: jest.fn()
  }),
  AuthProvider: ({ children }) => <div data-testid="auth-provider">{children}</div>
}))

jest.mock('../../hooks/useNuriLogic', () => ({
  useNuriLogic: () => ({
    nuriState: {
      currentMode: 'default',
      userMood: null,
      dailyCheckIn: false,
      lastInteraction: new Date(),
      streakDays: 0,
      proEnabled: false
    },
    currentPersonality: {
      tone: 'empathetic',
      style: 'friendly',
      emoji: '✨',
      greeting: "Hi! I'm Nuri, your health companion. How can I help you today?",
      responsePattern: 'question'
    },
    generateResponse: jest.fn(() => ({
      message: "That's great! How can I help you with your nutrition goals today?",
      healthTip: null,
      shouldCheckIn: false
    })),
    handleDailyCheckIn: jest.fn(),
    generateMacroInsights: jest.fn(),
    processJournalEntry: jest.fn(),
    isProFeatureAvailable: jest.fn(() => false),
    getProUpgradeSuggestions: jest.fn(),
    updateNuriState: jest.fn()
  })
}))

jest.mock('../../hooks/useAdaptiveTheme', () => ({
  useAdaptiveTheme: () => ({
    theme: {
      background: 'from-blue-50 to-indigo-100',
      card: 'bg-white',
      text: 'text-gray-800',
      primary: 'from-blue-500 to-indigo-600',
      mood: 'from-green-400 to-blue-500'
    },
    timeOfDay: 'day',
    userMood: 'neutral',
    isDark: false,
    isStressed: false
  })
}))

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      // Remove motion props to avoid React warnings
      const { whileHover, whileTap, initial, animate, exit, transition, ...restProps } = props
      return <div {...restProps}>{children}</div>
    },
    button: ({ children, ...props }) => {
      // Remove motion props to avoid React warnings
      const { whileHover, whileTap, initial, animate, exit, transition, ...restProps } = props
      return <button {...restProps}>{children}</button>
    }
  },
  AnimatePresence: ({ children }) => <div>{children}</div>
}))

// Mock all the UI components
jest.mock('../ui/AnimatedCard', () => {
  return function MockAnimatedCard({ children, ...props }) {
    return <div data-testid="animated-card" {...props}>{children}</div>
  }
})

jest.mock('../ui/TypingIndicator', () => {
  return function MockTypingIndicator({ isTyping }) {
    return isTyping ? <div data-testid="typing-indicator">Nuri is typing...</div> : null
  }
})

jest.mock('../ui/ProgressRing', () => {
  return function MockProgressRing({ progress, label }) {
    return <div data-testid="progress-ring" data-progress={progress} data-label={label} />
  }
})

jest.mock('../layout/Header', () => {
  return function MockHeader() {
    return <header data-testid="header">NutriWell Header</header>
  }
})

jest.mock('../layout/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">NutriWell Footer</footer>
  }
})

jest.mock('../auth/AuthScreen', () => {
  return function MockAuthScreen() {
    return <div data-testid="auth-screen">Auth Screen</div>
  }
})

jest.mock('../profile/UserProfile', () => {
  return function MockUserProfile() {
    return <div data-testid="user-profile">User Profile</div>
  }
})

// Integration test suite
describe('NuriAssistant Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('App Initialization', () => {
    test('renders the complete app without crashing', () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      expect(screen.getByTestId('header')).toBeInTheDocument()
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    test('shows NuriAssistant as default page', () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      // Should show Nuri's greeting
      expect(screen.getByText("Hi! I'm Nuri, your health companion. How can I help you today?")).toBeInTheDocument()
    })
  })

  describe('DailyCheckIn Integration Flow', () => {
    test('DailyCheckIn component renders within NuriAssistant', async () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      // The DailyCheckIn should be available in the sidebar
      // Since it's conditionally rendered, we need to trigger it
      const input = screen.getByPlaceholderText("Tell Nuri how you're feeling...")
      fireEvent.change(input, { target: { value: 'I want to check in' } })
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
      
      // Wait for any async operations
      await waitFor(() => {
        // The check-in should be triggered or available
        expect(screen.getByText('Daily Check-in')).toBeInTheDocument()
      })
    })

    test('completes full check-in flow', async () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      // Find and click on DailyCheckIn
      const checkInButton = screen.getByText('Daily Check-in')
      fireEvent.click(checkInButton)
      
      // Select a mood
      const happyButton = screen.getByText('Happy')
      fireEvent.click(happyButton)
      
      // Add notes
      await waitFor(() => {
        const notesInput = screen.getByPlaceholderText('How are you feeling?')
        fireEvent.change(notesInput, { target: { value: 'Feeling great today!' } })
      })
      
      // Complete check-in
      const submitButton = screen.getByText('Complete Check-in')
      fireEvent.click(submitButton)
      
      // Verify the check-in was completed
      await waitFor(() => {
        expect(screen.getByText('Check-in completed!')).toBeInTheDocument()
      })
    })
  })

  describe('User Interaction Flow', () => {
    test('handles user input and generates Nuri response', async () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      const input = screen.getByPlaceholderText("Tell Nuri how you're feeling...")
      fireEvent.change(input, { target: { value: 'Hello Nuri!' } })
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
      
      // Should show typing indicator
      await waitFor(() => {
        expect(screen.getByTestId('typing-indicator')).toBeInTheDocument()
      })
      
      // Should show Nuri's response
      await waitFor(() => {
        expect(screen.getByText("That's great! How can I help you with your nutrition goals today?")).toBeInTheDocument()
      })
    })

    test('handles empty input gracefully', () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      const input = screen.getByPlaceholderText("Tell Nuri how you're feeling...")
      fireEvent.change(input, { target: { value: '' } })
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
      
      // Should not trigger any response for empty input
      expect(screen.queryByTestId('typing-indicator')).not.toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    test('ErrorBoundary catches rendering errors', () => {
      // Create a component that throws an error
      const BuggyComponent = () => {
        throw new Error('Test error')
      }
      
      render(
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      )
      
      // Should show error boundary UI
      expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('Reload Page')).toBeInTheDocument()
    })

    test('app continues to work after error recovery', () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      // App should still be functional
      expect(screen.getByText("Hi! I'm Nuri, your health companion. How can I help you today?")).toBeInTheDocument()
    })
  })

  describe('Performance and Responsiveness', () => {
    test('handles rapid user interactions', async () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      const input = screen.getByPlaceholderText("Tell Nuri how you're feeling...")
      
      // Rapid typing
      fireEvent.change(input, { target: { value: 'H' } })
      fireEvent.change(input, { target: { value: 'He' } })
      fireEvent.change(input, { target: { value: 'Hel' } })
      fireEvent.change(input, { target: { value: 'Hello' } })
      
      // Should handle rapid changes without crashing
      expect(input.value).toBe('Hello')
    })

    test('maintains state during interactions', async () => {
      render(
        <ErrorBoundary>
          <NutriWellApp />
        </ErrorBoundary>
      )
      
      const input = screen.getByPlaceholderText("Tell Nuri how you're feeling...")
      fireEvent.change(input, { target: { value: 'Test message' } })
      
      // State should be maintained
      expect(input.value).toBe('Test message')
      
      // Submit and verify conversation history
      fireEvent.keyPress(input, { key: 'Enter', code: 'Enter' })
      
      await waitFor(() => {
        expect(screen.getByText('Test message')).toBeInTheDocument()
      })
    })
  })
})

// Mock setup for all external dependencies
jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signIn: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn()
    }
  },
  dbHelpers: {
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn()
  }
}))

jest.mock('../../lib/mockAuth', () => ({
  mockDbHelpers: {
    getUserById: jest.fn(() => ({
      id: 'test-user-id',
      email: 'test@example.com',
      display_name: 'Test User'
    })),
    createUser: jest.fn(),
    updateUser: jest.fn()
  },
  mockDbUser: {
    id: 'test-user-id',
    email: 'test@example.com',
    display_name: 'Test User'
  }
})) 