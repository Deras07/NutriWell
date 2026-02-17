import React from 'react'
import { AuthProvider } from './src/providers/PrivyProvider'
import AppWithAuth from './src/components/auth/AppWithAuth'
import './App.css'

function App() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only fixed top-2 left-2 bg-white px-3 py-2 rounded shadow-soft z-[var(--z-tooltip)]">
        Skip to content
      </a>
      
      <AuthProvider>
        <AppWithAuth />
      </AuthProvider>
    </>
  )
}

export default App
