import React, { useState, useEffect } from 'react'
import { useAuth } from '../../providers/PrivyProvider'

export default function UserProfileManager() {
  const { user, dbUser, updateUserProfile, loading, error } = useAuth()
  const [profile, setProfile] = useState({
    display_name: '',
    age: '',
    fitness_goals: [],
    dietary_preferences: [],
    activity_level: '',
    height: '',
    weight: '',
    target_weight: '',
    medical_conditions: [],
    allergies: [],
    preferred_cuisine: [],
    meal_prep_time: '',
    budget_range: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  // Load existing profile data
  useEffect(() => {
    if (dbUser) {
      setProfile({
        display_name: dbUser.display_name || '',
        age: dbUser.age || '',
        fitness_goals: dbUser.fitness_goals || [],
        dietary_preferences: dbUser.dietary_preferences || [],
        activity_level: dbUser.activity_level || '',
        height: dbUser.height || '',
        weight: dbUser.weight || '',
        target_weight: dbUser.target_weight || '',
        medical_conditions: dbUser.medical_conditions || [],
        allergies: dbUser.allergies || [],
        preferred_cuisine: dbUser.preferred_cuisine || [],
        meal_prep_time: dbUser.meal_prep_time || '',
        budget_range: dbUser.budget_range || ''
      })
    }
  }, [dbUser])

  const handleProfileUpdate = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = async () => {
    if (!user) return
    
    setSaveLoading(true)
    try {
      await updateUserProfile(profile)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setSaveLoading(false)
    }
  }

  const handleCancel = () => {
    // Reset to original values
    if (dbUser) {
      setProfile({
        display_name: dbUser.display_name || '',
        age: dbUser.age || '',
        fitness_goals: dbUser.fitness_goals || [],
        dietary_preferences: dbUser.dietary_preferences || [],
        activity_level: dbUser.activity_level || '',
        height: dbUser.height || '',
        weight: dbUser.weight || '',
        target_weight: dbUser.target_weight || '',
        medical_conditions: dbUser.medical_conditions || [],
        allergies: dbUser.allergies || [],
        preferred_cuisine: dbUser.preferred_cuisine || [],
        meal_prep_time: dbUser.meal_prep_time || '',
        budget_range: dbUser.budget_range || ''
      })
    }
    setIsEditing(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E8B4B8]"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading profile: {error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border-2 border-[#E8B4B8] p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#2C2C2C]">Profile Settings</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-[#2C2C2C] font-medium rounded-lg transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saveLoading}
              className="px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              {saveLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#2C2C2C] border-b border-gray-200 pb-2">
            Basic Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              value={profile.display_name}
              onChange={(e) => handleProfileUpdate('display_name', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => handleProfileUpdate('age', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={profile.height}
              onChange={(e) => handleProfileUpdate('height', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Weight (kg)
            </label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) => handleProfileUpdate('weight', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Weight (kg)
            </label>
            <input
              type="number"
              value={profile.target_weight}
              onChange={(e) => handleProfileUpdate('target_weight', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            />
          </div>
        </div>

        {/* Health & Preferences */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#2C2C2C] border-b border-gray-200 pb-2">
            Health & Preferences
          </h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Activity Level
            </label>
            <select
              value={profile.activity_level}
              onChange={(e) => handleProfileUpdate('activity_level', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            >
              <option value="">Select activity level</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly_active">Lightly Active</option>
              <option value="moderately_active">Moderately Active</option>
              <option value="very_active">Very Active</option>
              <option value="extremely_active">Extremely Active</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fitness Goals
            </label>
            <div className="space-y-2">
              {['Weight Loss', 'Muscle Gain', 'Better Health', 'Athletic Performance', 'Stress Relief'].map((goal) => (
                <label key={goal} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.fitness_goals?.includes(goal) || false}
                    onChange={(e) => {
                      const current = profile.fitness_goals || []
                      if (e.target.checked) {
                        handleProfileUpdate('fitness_goals', [...current, goal])
                      } else {
                        handleProfileUpdate('fitness_goals', current.filter(item => item !== goal))
                      }
                    }}
                    disabled={!isEditing}
                    className="w-4 h-4 text-[#E8B4B8] border-gray-300 rounded focus:ring-[#E8B4B8] disabled:opacity-50"
                  />
                  <span className="text-sm">{goal}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Preferences
            </label>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'None'].map((pref) => (
                <label key={pref} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.dietary_preferences?.includes(pref) || false}
                    onChange={(e) => {
                      const current = profile.dietary_preferences || []
                      if (e.target.checked) {
                        handleProfileUpdate('dietary_preferences', [...current, pref])
                      } else {
                        handleProfileUpdate('dietary_preferences', current.filter(item => item !== pref))
                      }
                    }}
                    disabled={!isEditing}
                    className="w-4 h-4 text-[#E8B4B8] border-gray-300 rounded focus:ring-[#E8B4B8] disabled:opacity-50"
                  />
                  <span className="text-sm">{pref}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meal Prep Time
            </label>
            <select
              value={profile.meal_prep_time}
              onChange={(e) => handleProfileUpdate('meal_prep_time', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            >
              <option value="">Select prep time</option>
              <option value="15_min">15 minutes or less</option>
              <option value="30_min">30 minutes or less</option>
              <option value="1_hour">1 hour or less</option>
              <option value="2_hours">2 hours or less</option>
              <option value="unlimited">Unlimited time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              value={profile.budget_range}
              onChange={(e) => handleProfileUpdate('budget_range', e.target.value)}
              disabled={!isEditing}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50"
            >
              <option value="">Select budget range</option>
              <option value="budget">Budget-friendly</option>
              <option value="moderate">Moderate</option>
              <option value="premium">Premium</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>
      </div>

      {/* Medical Information */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-[#2C2C2C] border-b border-gray-200 pb-2 mb-4">
          Medical Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Medical Conditions
            </label>
            <textarea
              value={profile.medical_conditions?.join(', ') || ''}
              onChange={(e) => handleProfileUpdate('medical_conditions', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
              disabled={!isEditing}
              placeholder="Enter medical conditions separated by commas"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50 h-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies
            </label>
            <textarea
              value={profile.allergies?.join(', ') || ''}
              onChange={(e) => handleProfileUpdate('allergies', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
              disabled={!isEditing}
              placeholder="Enter allergies separated by commas"
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#E8B4B8] focus:outline-none disabled:bg-gray-50 h-20"
            />
          </div>
        </div>
      </div>

      {/* Success Message */}
      {!isEditing && dbUser && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">
            ✅ Profile saved successfully! Your preferences are being used to personalize your experience.
          </p>
        </div>
      )}
    </div>
  )
}
