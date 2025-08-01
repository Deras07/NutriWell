import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import { AuthProvider, useAuth } from '../PrivyProvider'

// Mock Privy
jest.mock('@privy-io/react-auth', () => ({
  PrivyProvider: ({ children }) => children,
  usePrivy: jest.fn(),
  useLogin: () => ({ login: jest.fn() }),
  useLogout: () => ({ logout: jest.fn() })
}))

// Mock Viem
jest.mock('viem/chains', () => ({
  mainnet: { id: 1, name: 'Ethereum' }
}))

// Mock Supabase
jest.mock('../../lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ data: null, error: { code: 'PGRST116' } })),
      insert: jest.fn(() => Promise.resolve({ data: mockUser, error: null }))
    }))
  },
  dbHelpers: {
    getUserById: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn()
  }
}))

// Mock Auth helpers
jest.mock('../../lib/mockAuth', () => ({
  mockDbHelpers: {},
  mockDbUser: {
    id: 'mock-user',
    email: 'mock@test.com',
    display_name: 'Mock User'
  }
}))

const mockUser = {
  id: 'test-user-123',
  email: 'test@example.com',
  display_name: 'Test User',
  onboarding_completed: false
}

// Test component to access auth context
function TestComponent() {
  const auth = useAuth()
  return (
    <div>
      <div data-testid="is-authenticated">{auth.isAuthenticated ? 'true' : 'false'}</div>
      <div data-testid="loading">{auth.loading ? 'true' : 'false'}</div>
      <div data-testid="user-email">{auth.dbUser?.email || 'no-email'}</div>
      <div data-testid="error">{auth.error || 'no-error'}</div>
    </div>
  )
}

describe('AuthProvider', () => {
  let mockUsePrivy

  beforeEach(() => {
    jest.clearAllMocks()
    const { usePrivy } = require('@privy-io/react-auth')
    mockUsePrivy = usePrivy
  })

  test('provides unauthenticated state when user is not logged in', () => {
    mockUsePrivy.mockReturnValue({
      ready: true,
      authenticated: false,
      user: null,
      logout: jest.fn()
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('is-authenticated')).toHaveTextContent('false')
    expect(screen.getByTestId('user-email')).toHaveTextContent('no-email')
  })

  test('provides authenticated state when user is logged in', async () => {
    const mockDbHelpers = require('../../lib/supabase').dbHelpers
    mockDbHelpers.getUserById.mockResolvedValue(null)
    mockDbHelpers.createUser.mockResolvedValue(mockUser)

    mockUsePrivy.mockReturnValue({
      ready: true,
      authenticated: true,
      user: {
        id: 'test-user-123',
        email: { address: 'test@example.com' }
      },
      logout: jest.fn()
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for async user sync
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true')
    })
    
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com')
  })

  test('handles loading state', () => {
    mockUsePrivy.mockReturnValue({
      ready: false,
      authenticated: false,
      user: null,
      logout: jest.fn()
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('loading')).toHaveTextContent('true')
  })

  test('falls back to mock mode when database is unavailable', async () => {
    const mockDbHelpers = require('../../lib/supabase').dbHelpers
    mockDbHelpers.getUserById.mockRejectedValue(new Error('Database unavailable'))

    mockUsePrivy.mockReturnValue({
      ready: true,
      authenticated: true,
      user: {
        id: 'test-user-123',
        email: { address: 'test@example.com' }
      },
      logout: jest.fn()
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Wait for fallback to mock mode
    await waitFor(() => {
      expect(screen.getByTestId('is-authenticated')).toHaveTextContent('true')
    })
    
    expect(screen.getByTestId('user-email')).toHaveTextContent('test@example.com')
  })

  test('throws error when useAuth is used outside of AuthProvider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = jest.fn()

    expect(() => {
      render(<TestComponent />)
    }).toThrow('useAuth must be used within AuthProvider')

    console.error = originalError
  })
})