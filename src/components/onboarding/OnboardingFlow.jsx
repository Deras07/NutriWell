import React, { useState } from 'react'
import { Wizard } from '../ui/wizard'
import { 
  AgeStep, 
  WeightStep, 
  HeightStep, 
  DietaryPreferencesStep, 
  HealthGoalsStep 
} from './OnboardingSteps'

export const OnboardingFlow = ({ onComplete, className = '' }) => {
  const [isCompleted, setIsCompleted] = useState(false)

  const steps = [
    {
      label: 'Age',
      title: 'Tell us about yourself',
      description: 'Let\'s start with some basic information to personalize your nutrition plan',
      component: AgeStep
    },
    {
      label: 'Weight',
      title: 'Your current weight',
      description: 'This helps us calculate your daily caloric and nutritional needs',
      component: WeightStep
    },
    {
      label: 'Height',
      title: 'Your height',
      description: 'Combined with weight, this gives us your Body Mass Index (BMI)',
      component: HeightStep
    },
    {
      label: 'Diet',
      title: 'Dietary preferences',
      description: 'Any dietary restrictions or preferences we should know about?',
      component: DietaryPreferencesStep
    },
    {
      label: 'Goals',
      title: 'Your health goals',
      description: 'What would you like to achieve with your nutrition plan?',
      component: HealthGoalsStep
    }
  ]

  const handleComplete = (data) => {
    setIsCompleted(true)
    
    // Calculate BMI and daily calories (simplified calculation)
    const weightKg = data.step1.weightUnit === 'kg' 
      ? data.step1.weight 
      : data.step1.weight * 0.453592
    
    const heightCm = data.step2.heightUnit === 'cm' 
      ? data.step2.height 
      : data.step2.height
    
    const bmi = (weightKg / ((heightCm / 100) ** 2)).toFixed(1)
    
    // Basic calorie calculation (Harris-Benedict equation simplified)
    const baseCalories = data.step0.age > 30 ? 1800 : 2000
    const adjustedCalories = Math.round(baseCalories + (data.step0.age < 25 ? 200 : 0))

    const processedData = {
      ...data,
      calculatedBMI: bmi,
      dailyCalories: adjustedCalories,
      completedAt: new Date().toISOString()
    }

    console.log('Onboarding completed:', processedData)
    onComplete?.(processedData)
  }

  const handleStepChange = (stepIndex, data) => {
    console.log(`Step ${stepIndex} data:`, data)
  }

  if (isCompleted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Assessment Complete!
        </h2>
        <p className="text-gray-600 mb-8">
          We're creating your personalized meal plan based on your preferences...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-teal"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Get Your Free Nutrition Plan
        </h1>
        <p className="text-xl text-gray-600">
          Answer 5 quick questions to receive a personalized one-day meal plan
        </p>
      </div>

      <Wizard
        steps={steps}
        onComplete={handleComplete}
        onStepChange={handleStepChange}
        showStepNumbers={true}
        allowStepSkipping={false}
      />
    </div>
  )
} 