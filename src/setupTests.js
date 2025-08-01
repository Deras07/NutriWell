import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  
  observe() {
    return null
  }
  
  disconnect() {
    return null
  }
  
  unobserve() {
    return null
  }
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Suppress console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Mock Privy
jest.mock('@privy-io/react-auth', () => ({
  PrivyProvider: ({ children }) => children,
  usePrivy: () => ({
    ready: true,
    authenticated: false,
    user: null,
    logout: jest.fn()
  }),
  useLogin: () => ({
    login: jest.fn()
  }),
  useLogout: () => ({
    logout: jest.fn()
  })
}))

// Mock Supabase
jest.mock('./lib/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ data: [], error: null })),
      insert: jest.fn(() => Promise.resolve({ data: [], error: null })),
      update: jest.fn(() => Promise.resolve({ data: [], error: null })),
      delete: jest.fn(() => Promise.resolve({ data: [], error: null }))
    }))
  },
  dbHelpers: {
    getUserById: jest.fn(() => Promise.resolve(null)),
    createUser: jest.fn(() => Promise.resolve({ id: 'test-user', email: 'test@test.com' })),
    updateUser: jest.fn(() => Promise.resolve({ id: 'test-user', email: 'test@test.com' }))
  }
}))

// Mock Chart.js
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="line-chart">Chart</div>,
  Doughnut: () => <div data-testid="doughnut-chart">Chart</div>,
  Bar: () => <div data-testid="bar-chart">Chart</div>
})) 