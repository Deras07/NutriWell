import { useState } from 'react'

export const useUserState = () => {
  const [userPlan, setUserPlan] = useState('free') // 'free' or 'premium'
  const [onboardingData, setOnboardingData] = useState(null)

  const handleOnboardingComplete = (data) => {
    setOnboardingData(data)
    // Auto-navigate would be handled by parent component
  }

  const handleGetFullPlan = () => {
    // Logic for getting full plan would be implemented here
    console.log('Getting full plan...')
  }

  const upgradeUser = () => {
    setUserPlan('premium')
  }

  const downgradeUser = () => {
    setUserPlan('free')
  }

  return {
    userPlan,
    onboardingData,
    handleOnboardingComplete,
    handleGetFullPlan,
    upgradeUser,
    downgradeUser,
    setUserPlan
  }
} 