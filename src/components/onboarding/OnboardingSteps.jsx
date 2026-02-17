import React, { useState } from 'react'
import { Input, NumberInput } from '../ui/input'
import { Checkbox, Radio } from '../ui/select'
import { StepNavigation } from '../ui/wizard'

// Step 1: Age Input
export const AgeStep = ({ onNext, onPrevious, data, isFirstStep, isLastStep }) => {
  const [age, setAge] = useState(data.age || 25)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (age < 16 || age > 100) {
      setError('Please enter an age between 16 and 100')
      return
    }
    setError('')
    onNext({ age })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      <div className="max-w-sm mx-auto">
        <NumberInput
          label="What's your age?"
          value={age}
          onChange={setAge}
          min={16}
          max={100}
          step={1}
          error={error}
          helpText="Your age helps us calculate your nutritional needs"
        />
      </div>

      <StepNavigation
        onNext={handleNext}
        onPrevious={onPrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        nextDisabled={!!error}
      />
    </div>
  )
}

// Step 2: Weight Input
export const WeightStep = ({ onNext, onPrevious, data, isFirstStep, isLastStep }) => {
  const [weight, setWeight] = useState(data.weight || 70)
  const [unit, setUnit] = useState(data.weightUnit || 'kg')
  const [error, setError] = useState('')

  const handleNext = () => {
    const minWeight = unit === 'kg' ? 30 : 66
    const maxWeight = unit === 'kg' ? 300 : 660
    
    if (weight < minWeight || weight > maxWeight) {
      setError(`Please enter a weight between ${minWeight} and ${maxWeight} ${unit}`)
      return
    }
    setError('')
    onNext({ weight, weightUnit: unit })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
      </div>

      <div className="max-w-sm mx-auto space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <NumberInput
              label="What's your current weight?"
              value={weight}
              onChange={setWeight}
              min={unit === 'kg' ? 30 : 66}
              max={unit === 'kg' ? 300 : 660}
              step={unit === 'kg' ? 0.5 : 1}
              error={error}
            />
          </div>
          <div className="w-20 pt-8">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          This helps us calculate your daily caloric needs
        </p>
      </div>

      <StepNavigation
        onNext={handleNext}
        onPrevious={onPrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        nextDisabled={!!error}
      />
    </div>
  )
}

// Step 3: Height Input
export const HeightStep = ({ onNext, onPrevious, data, isFirstStep, isLastStep }) => {
  const [height, setHeight] = useState(data.height || 170)
  const [feet, setFeet] = useState(data.feet || 5)
  const [inches, setInches] = useState(data.inches || 7)
  const [unit, setUnit] = useState(data.heightUnit || 'cm')
  const [error, setError] = useState('')

  const handleNext = () => {
    let validHeight = false
    
    if (unit === 'cm') {
      validHeight = height >= 120 && height <= 250
      if (!validHeight) {
        setError('Please enter a height between 120 and 250 cm')
        return
      }
    } else {
      validHeight = feet >= 3 && feet <= 8 && inches >= 0 && inches < 12
      if (!validHeight) {
        setError('Please enter a valid height')
        return
      }
    }
    
    setError('')
    onNext({ 
      height: unit === 'cm' ? height : (feet * 12 + inches) * 2.54, 
      feet, 
      inches, 
      heightUnit: unit 
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-accent-coral/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 3v10a2 2 0 002 2h6a2 2 0 002-2V7M7 7h10" />
          </svg>
        </div>
      </div>

      <div className="max-w-sm mx-auto space-y-4">
        <div className="flex gap-2 items-end">
          {unit === 'cm' ? (
            <div className="flex-1">
              <NumberInput
                label="What's your height?"
                value={height}
                onChange={setHeight}
                min={120}
                max={250}
                step={1}
                error={error}
              />
            </div>
          ) : (
            <>
              <div className="flex-1">
                <NumberInput
                  label="Feet"
                  value={feet}
                  onChange={setFeet}
                  min={3}
                  max={8}
                  step={1}
                />
              </div>
              <div className="flex-1">
                <NumberInput
                  label="Inches"
                  value={inches}
                  onChange={setInches}
                  min={0}
                  max={11}
                  step={1}
                />
              </div>
            </>
          )}
          <div className="w-20">
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent"
            >
              <option value="cm">cm</option>
              <option value="ft">ft/in</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-gray-500 text-center">
          Used to calculate your Body Mass Index (BMI)
        </p>
      </div>

      <StepNavigation
        onNext={handleNext}
        onPrevious={onPrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        nextDisabled={!!error}
      />
    </div>
  )
}

// Step 4: Dietary Preferences
export const DietaryPreferencesStep = ({ onNext, onPrevious, data, isFirstStep, isLastStep }) => {
  const [preferences, setPreferences] = useState(data.dietaryPreferences || [])

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
    { id: 'vegan', label: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', label: 'Gluten-Free', icon: '🌾' },
    { id: 'dairy-free', label: 'Dairy-Free', icon: '🥛' },
    { id: 'keto', label: 'Keto', icon: '🥑' },
    { id: 'paleo', label: 'Paleo', icon: '🥩' },
    { id: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
    { id: 'low-sodium', label: 'Low-Sodium', icon: '🧂' }
  ]

  const handlePreferenceChange = (preferenceId, checked) => {
    setPreferences(prev => 
      checked 
        ? [...prev, preferenceId]
        : prev.filter(p => p !== preferenceId)
    )
  }

  const handleNext = () => {
    onNext({ dietaryPreferences: preferences })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-accent-golden/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent-golden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          {dietaryOptions.map((option) => (
            <label
              key={option.id}
              className={`
                relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all
                ${preferences.includes(option.id) 
                  ? 'border-primary-teal bg-primary-teal/5 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <input
                type="checkbox"
                checked={preferences.includes(option.id)}
                onChange={(e) => handlePreferenceChange(option.id, e.target.checked)}
                className="absolute top-2 right-2 h-4 w-4 text-primary-teal focus:ring-primary-teal border-gray-300 rounded"
              />
              <span className="text-2xl mb-1">{option.icon}</span>
              <span className="text-sm font-medium text-center">{option.label}</span>
            </label>
          ))}
        </div>
        <p className="text-sm text-gray-500 text-center mt-4">
          Select any dietary preferences or restrictions (optional)
        </p>
      </div>

      <StepNavigation
        onNext={handleNext}
        onPrevious={onPrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  )
}

// Step 5: Health Goals
export const HealthGoalsStep = ({ onNext, onPrevious, data, isFirstStep, isLastStep }) => {
  const [goal, setGoal] = useState(data.healthGoal || '')

  const healthGoals = [
    {
      id: 'balanced',
      title: 'Balanced Diet',
      description: 'Maintain a well-rounded, nutritious eating pattern',
      icon: '⚖️'
    },
    {
      id: 'wellness',
      title: 'General Wellness',
      description: 'Focus on overall health and energy levels',
      icon: '✨'
    },
    {
      id: 'maintain',
      title: 'Maintain Weight',
      description: 'Keep current weight with healthy nutrition',
      icon: '🎯'
    }
  ]

  const handleNext = () => {
    if (!goal) {return}
    onNext({ healthGoal: goal })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-3">
        {healthGoals.map((goalOption) => (
          <label
            key={goalOption.id}
            className={`
              block p-4 border-2 rounded-xl cursor-pointer transition-all
              ${goal === goalOption.id 
                ? 'border-primary-teal bg-primary-teal/5 shadow-md' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <input
                type="radio"
                name="healthGoal"
                value={goalOption.id}
                checked={goal === goalOption.id}
                onChange={(e) => setGoal(e.target.value)}
                className="mt-1 h-4 w-4 text-primary-teal focus:ring-primary-teal border-gray-300"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{goalOption.icon}</span>
                  <h3 className="font-medium text-gray-900">{goalOption.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">{goalOption.description}</p>
              </div>
            </div>
          </label>
        ))}
        <p className="text-sm text-gray-500 text-center mt-4">
          This helps us tailor your meal recommendations
        </p>
      </div>

      <StepNavigation
        onNext={handleNext}
        onPrevious={onPrevious}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        nextDisabled={!goal}
        finalText="Create My Plan"
      />
    </div>
  )
} 