import './App.css'
import { NutriWellApp } from './src/components/NutriWellApp'
import { AuthProvider } from './src/providers/PrivyProvider'

function App() {
  return (
    <AuthProvider>
      <NutriWellApp />
    </AuthProvider>
  )
}

export default App
