import React, { useState, useEffect } from 'react'
import { useAuth } from '../../providers/PrivyProvider'
import { Button } from '../ui/button'
import { Input, NumberInput } from '../ui/input'
import { Select, Checkbox } from '../ui/select'
import { Textarea } from '../ui/textarea'

const ONBOARDING_STEPS = [
  { id: 1, title: 'Personal Information', description: 'Tell us about yourself' },
  { id: 2, title: 'Health Metrics', description: 'Your current measurements' },
  { id: 3, title: 'Goals & Preferences', description: 'What do you want to achieve?' },
  { id: 4, title: 'Dietary Information', description: 'Your dietary needs and preferences' },
  { id: 5, title: 'Activity Level', description: 'How active are you?' }
]

const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: 'Sedentary - Little to no exercise' },
  { value: 'lightly_active', label: 'Lightly Active - Light exercise 1-3 days/week' },
  { value: 'moderately_active', label: 'Moderately Active - Moderate exercise 3-5 days/week' },
  { value: 'very_active', label: 'Very Active - Hard exercise 6-7 days/week' },
  { value: 'super_active', label: 'Super Active - Very hard exercise, physical job' }
]

const PRIMARY_GOALS = [
  { value: 'lose_weight', label: 'Lose Weight' },
  { value: 'gain_weight', label: 'Gain Weight' },
  { value: 'maintain_weight', label: 'Maintain Weight' },
  { value: 'build_muscle', label: 'Build Muscle' },
  { value: 'improve_health', label: 'Improve Overall Health' }
]

const DIETARY_RESTRICTIONS = [
  'vegetarian', 'vegan', 'pescatarian', 'gluten_free', 'dairy_free', 'nut_free',
  'soy_free', 'egg_free', 'shellfish_free', 'low_carb', 'keto', 'paleo', 'mediterranean'
]

const COMMON_ALLERGIES = [
  'peanuts', 'tree_nuts', 'dairy', 'eggs', 'soy', 'wheat', 'fish', 'shellfish', 'sesame'
]

export const AuthenticatedOnboarding = ({ onComplete }) => {
  const { dbUser, updateUserProfile, loading } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    display_name: '',
    date_of_birth: '',
    gender: '',
    
    // Health Metrics
    height_cm: '',
    weight_kg: '',
    
    // Goals & Preferences
    primary_goal: '',
    target_weight_kg: '',
    activity_level: '',
    
    // Dietary Information
    dietary_restrictions: [],
    allergies: [],
    disliked_foods: '',
    
    // Preferences
    preferences: {
      units: 'metric',
      theme: 'light',
      notifications: true,
      privacy_level: 'private'
    }
  })
  
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  // Helper function to format date for input field
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return ''
      return date.toISOString().split('T')[0]
    } catch {
      return ''
    }
  }

  // Load existing data when component mounts or user data changes
  useEffect(() => {
    if (dbUser) {
      // Set current step based on onboarding progress
      if (dbUser.onboarding_step > 0) {
        setCurrentStep(dbUser.onboarding_step)
      }
      
      // Always load existing user data to avoid garbled fields
      setFormData(prev => ({
        ...prev,
        display_name: dbUser.display_name || '',
        date_of_birth: formatDateForInput(dbUser.date_of_birth),
        gender: dbUser.gender || '',
        height_cm: dbUser.height_cm || '',
        weight_kg: dbUser.weight_kg || '',
        primary_goal: dbUser.primary_goal || '',
        target_weight_kg: dbUser.target_weight_kg || '',
        activity_level: dbUser.activity_level || '',
        dietary_restrictions: Array.isArray(dbUser.dietary_restrictions) ? dbUser.dietary_restrictions : [],
        allergies: Array.isArray(dbUser.allergies) ? dbUser.allergies : [],
        disliked_foods: Array.isArray(dbUser.disliked_foods) ? dbUser.disliked_foods.join(', ') : (dbUser.disliked_foods || ''),
        preferences: { 
          ...prev.preferences, 
          ...(dbUser.preferences || {})
        }
      }))
    }
  }, [dbUser])

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  const updatePreference = (key, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [key]: value }
    }))
  }

  const toggleArrayField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }))
  }

  const validateStep = (step) => {
    const newErrors = {}

    switch (step) {
      case 1:
        if (!formData.display_name) newErrors.display_name = 'Display name is required'
        if (!formData.gender) newErrors.gender = 'Please select your gender'
        break
      
      case 2:
        if (!formData.height_cm || formData.height_cm < 100 || formData.height_cm > 250) {
          newErrors.height_cm = 'Please enter a valid height (100-250 cm)'
        }
        if (!formData.weight_kg || formData.weight_kg < 30 || formData.weight_kg > 300) {
          newErrors.weight_kg = 'Please enter a valid weight (30-300 kg)'
        }
        break
      
      case 3:
        if (!formData.primary_goal) newErrors.primary_goal = 'Please select your primary goal'
        if (!formData.activity_level) newErrors.activity_level = 'Please select your activity level'
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const calculateCalorieGoal = () => {
    if (!formData.weight_kg || !formData.height_cm || !formData.gender || !formData.activity_level) {
      return 2000 // Default
    }

    // Simplified BMR calculation (Mifflin-St Jeor Equation)
    let bmr
    if (formData.gender === 'male') {
      bmr = (10 * formData.weight_kg) + (6.25 * formData.height_cm) - (5 * 25) + 5 // Using age 25 as default
    } else {
      bmr = (10 * formData.weight_kg) + (6.25 * formData.height_cm) - (5 * 25) - 161
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      super_active: 1.9
    }

    const tdee = bmr * (activityMultipliers[formData.activity_level] || 1.2)

    // Adjust based on goal
    switch (formData.primary_goal) {
      case 'lose_weight': return Math.round(tdee - 500) // 500 calorie deficit
      case 'gain_weight': return Math.round(tdee + 500) // 500 calorie surplus
      case 'build_muscle': return Math.round(tdee + 300) // 300 calorie surplus
      default: return Math.round(tdee) // Maintain weight
    }
  }

  const nextStep = async () => {
    if (!validateStep(currentStep)) return

    if (currentStep < ONBOARDING_STEPS.length) {
      setCurrentStep(currentStep + 1)
      
      // Save progress to database
      try {
        await updateUserProfile({
          onboarding_step: currentStep + 1,
          ...getStepData(currentStep)
        })
      } catch (error) {
        console.error('Error saving onboarding progress:', error)
      }
    } else {
      // Complete onboarding
      await completeOnboarding()
    }
  }

  const getStepData = (step) => {
    switch (step) {
      case 1:
        return {
          display_name: formData.display_name,
          date_of_birth: formData.date_of_birth || null,
          gender: formData.gender
        }
      case 2:
        return {
          height_cm: parseInt(formData.height_cm),
          weight_kg: parseFloat(formData.weight_kg)
        }
      case 3:
        return {
          primary_goal: formData.primary_goal,
          target_weight_kg: formData.target_weight_kg ? parseFloat(formData.target_weight_kg) : null,
          activity_level: formData.activity_level,
          daily_calorie_goal: calculateCalorieGoal()
        }
      case 4:
        return {
          dietary_restrictions: formData.dietary_restrictions,
          allergies: formData.allergies,
          disliked_foods: formData.disliked_foods ? formData.disliked_foods.split(',').map(s => s.trim()) : []
        }
      case 5:
        return {
          preferences: formData.preferences
        }
      default:
        return {}
    }
  }

  const completeOnboarding = async () => {
    setSaving(true)
    try {
      const allData = ONBOARDING_STEPS.reduce((acc, step) => ({
        ...acc,
        ...getStepData(step.id)
      }), {})

      const updateData = {
        ...allData,
        onboarding_completed: true,
        onboarding_step: 0,
        daily_calorie_goal: calculateCalorieGoal()
      }
      
      console.log('Completing onboarding with data:', updateData)
      const updatedUser = await updateUserProfile(updateData)
      console.log('Updated user after onboarding:', updatedUser)
      
      // Call completion callback after successful update
      onComplete?.()
    } catch (error) {
      console.error('Error completing onboarding:', error)
      setErrors({ submit: 'Failed to save your information. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <Input
              label="Display Name"
              value={formData.display_name}
              onChange={(e) => updateField('display_name', e.target.value)}
              error={errors.display_name}
              placeholder="How should we call you?"
              required
            />
            
            <Input
              label="Date of Birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => updateField('date_of_birth', e.target.value)}
              helpText="Optional - helps us provide better recommendations"
            />
            
            <Select
              label="Gender"
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer_not_to_say', label: 'Prefer not to say' }
              ]}
              value={formData.gender}
              onChange={(value) => updateField('gender', value)}
              error={errors.gender}
              required
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <NumberInput
              label="Height (cm)"
              value={formData.height_cm}
              onChange={(value) => updateField('height_cm', value)}
              min={100}
              max={250}
              error={errors.height_cm}
              helpText="Your height in centimeters"
              required
            />
            
            <NumberInput
              label="Weight (kg)"
              value={formData.weight_kg}
              onChange={(value) => updateField('weight_kg', value)}
              min={30}
              max={300}
              step={0.1}
              error={errors.weight_kg}
              helpText="Your current weight in kilograms"
              required
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Select
              label="Primary Goal"
              options={PRIMARY_GOALS}
              value={formData.primary_goal}
              onChange={(value) => updateField('primary_goal', value)}
              error={errors.primary_goal}
              required
            />
            
            {(formData.primary_goal === 'lose_weight' || formData.primary_goal === 'gain_weight') && (
              <NumberInput
                label="Target Weight (kg)"
                value={formData.target_weight_kg}
                onChange={(value) => updateField('target_weight_kg', value)}
                min={30}
                max={300}
                step={0.1}
                helpText="What weight would you like to reach?"
              />
            )}
            
            <Select
              label="Activity Level"
              options={ACTIVITY_LEVELS}
              value={formData.activity_level}
              onChange={(value) => updateField('activity_level', value)}
              error={errors.activity_level}
              helpText="This helps us calculate your daily calorie needs"
              required
            />
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dietary Restrictions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {DIETARY_RESTRICTIONS.map((restriction) => (
                  <Checkbox
                    key={restriction}
                    label={restriction.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    checked={formData.dietary_restrictions.includes(restriction)}
                    onChange={() => toggleArrayField('dietary_restrictions', restriction)}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Food Allergies
              </label>
              <div className="grid grid-cols-2 gap-2">
                {COMMON_ALLERGIES.map((allergy) => (
                  <Checkbox
                    key={allergy}
                    label={allergy.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    checked={formData.allergies.includes(allergy)}
                    onChange={() => toggleArrayField('allergies', allergy)}
                  />
                ))}
              </div>
            </div>
            
            <Textarea
              label="Disliked Foods"
              value={formData.disliked_foods}
              onChange={(e) => updateField('disliked_foods', e.target.value)}
              placeholder="List any foods you dislike or prefer to avoid (comma-separated)"
              helpText="Optional - helps us personalize your meal recommendations"
              rows={3}
            />
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">App Preferences</h3>
              
              <div className="space-y-4">
                <Select
                  label="Units"
                  options={[
                    { value: 'metric', label: 'Metric (kg, cm, etc.)' },
                    { value: 'imperial', label: 'Imperial (lbs, ft, etc.)' }
                  ]}
                  value={formData.preferences.units}
                  onChange={(value) => updatePreference('units', value)}
                />
                
                <Select
                  label="Theme"
                  options={[
                    { value: 'light', label: 'Light Mode' },
                    { value: 'dark', label: 'Dark Mode' },
                    { value: 'auto', label: 'Auto (System)' }
                  ]}
                  value={formData.preferences.theme}
                  onChange={(value) => updatePreference('theme', value)}
                />
                
                <Checkbox
                  label="Enable Notifications"
                  checked={formData.preferences.notifications}
                  onChange={(e) => updatePreference('notifications', e.target.checked)}
                />
                
                <Select
                  label="Privacy Level"
                  options={[
                    { value: 'private', label: 'Private - Only I can see my data' },
                    { value: 'friends', label: 'Friends - Friends can see some data' },
                    { value: 'public', label: 'Public - Anyone can see public data' }
                  ]}
                  value={formData.preferences.privacy_level}
                  onChange={(value) => updatePreference('privacy_level', value)}
                />
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Your Daily Calorie Goal</h4>
              <p className="text-blue-800">
                Based on your information, we recommend <strong>{calculateCalorieGoal()} calories per day</strong> to achieve your goal.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
            <span className="text-sm text-gray-600">{currentStep} of {ONBOARDING_STEPS.length}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / ONBOARDING_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {ONBOARDING_STEPS[currentStep - 1]?.title}
            </h2>
            <p className="text-gray-600 mt-1">
              {ONBOARDING_STEPS[currentStep - 1]?.description}
            </p>
          </div>

          {renderStep()}

          {errors.submit && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.submit}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="secondary"
            onClick={previousStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          <Button
            onClick={nextStep}
            loading={saving}
            disabled={loading}
          >
            {currentStep === ONBOARDING_STEPS.length ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}