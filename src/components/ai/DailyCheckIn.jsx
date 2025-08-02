import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { UserMood, MOOD_RESPONSES } from '../../constants/nuriModes'
import { 
  Heart, 
  Zap, 
  Coffee, 
  Smile, 
  Meh, 
  Frown, 
  Activity,
  MessageCircle
} from 'lucide-react'



const moodOptions = [
  { value: 'energetic', label: 'Energetic', icon: Zap, color: 'from-yellow-400 to-orange-500' },
  { value: 'happy', label: 'Happy', icon: Smile, color: 'from-green-400 to-emerald-500' },
  { value: 'motivated', label: 'Motivated', icon: Activity, color: 'from-blue-400 to-indigo-500' },
  { value: 'neutral', label: 'Neutral', icon: Meh, color: 'from-gray-400 to-slate-500' },
  { value: 'tired', label: 'Tired', icon: Coffee, color: 'from-amber-400 to-yellow-500' },
  { value: 'stressed', label: 'Stressed', icon: Frown, color: 'from-red-400 to-pink-500' },
  { value: 'anxious', label: 'Anxious', icon: Heart, color: 'from-purple-400 to-violet-500' }
]

const DailyCheckIn = ({ onComplete, onSkip, streakDays = 0 }) => {
  const [selectedMood, setSelectedMood] = useState(null)
  const [notes, setNotes] = useState('')
  const [showNotes, setShowNotes] = useState(false)

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood)
    setShowNotes(true)
  }

  const handleComplete = () => {
    if (selectedMood) {
      onComplete(selectedMood, notes.trim() || undefined)
    }
  }

  const selectedMoodResponse = selectedMood ? MOOD_RESPONSES[selectedMood] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-md mx-auto"
    >
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-semibold text-gray-800">Daily Check-in</h3>
          </div>
          <p className="text-gray-600">
            {streakDays > 0 
              ? `Great job! You're on a ${streakDays}-day streak.` 
              : "Let's start your day with a quick check-in."
            }
          </p>
        </div>

        {/* Mood Selection */}
        {!showNotes && (
          <div className="space-y-4">
            <p className="text-center text-gray-700 mb-4">
              How are you feeling today?
            </p>
            <div className="grid grid-cols-2 gap-3">
              {moodOptions.map((mood) => {
                const Icon = mood.icon
                return (
                  <motion.button
                    key={mood.value}
                    onClick={() => handleMoodSelect(mood.value)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      selectedMood === mood.value
                        ? 'border-blue-500 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`p-2 rounded-full bg-gradient-to-br ${mood.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{mood.label}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        )}

        {/* Notes Section */}
        {showNotes && selectedMoodResponse && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {/* Mood Response */}
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <p className="text-gray-700 font-medium mb-2">
                {selectedMoodResponse.encouragement}
              </p>
              {selectedMoodResponse.suggestions && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Today you might try:</p>
                  <ul className="space-y-1">
                    {selectedMoodResponse.suggestions.slice(0, 2).map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Optional Notes */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Any thoughts to share? (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How are you feeling about your health goals today?"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNotes(false)
                  setSelectedMood(null)
                  setNotes('')
                }}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
              >
                Complete Check-in
              </Button>
            </div>
          </motion.div>
        )}

        {/* Skip Option */}
        {!showNotes && (
          <div className="text-center pt-4">
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip for today
            </button>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

export default DailyCheckIn 