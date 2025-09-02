import React from 'react'
import NuriAssistant from './src/components/ai/NuriAssistant'
// import { AuthProvider } from './src/providers/PrivyProvider'
import './App.css'

function App() {
  return (
    <>
      {/* Skip Link for Accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only fixed top-2 left-2 bg-white px-3 py-2 rounded shadow-soft z-[var(--z-tooltip)]">
        Skip to content
      </a>
      
      {/* <AuthProvider> */}
        <NuriAssistant />
      {/* </AuthProvider> */}
    </>
  )
}

export default App
