import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input, NumberInput } from '../ui/input'
import { Badge } from '../ui/badge'
import { 
  CalorieBarChart, 
  WeightProgressChart, 
  GoalCompletionDonut,
  WaterIntakeVisual 
} from '../ui/charts'

export const ProgressDashboard = ({ userPlan = 'free', className = '' }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days')
  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('water-intake')
    return saved ? JSON.parse(saved) : { current: 0, goal: 2000 }
  })
  const [weightData, setWeightData] = useState(() => {
    const saved = localStorage.getItem('weight-data')
    return saved ? JSON.parse(saved) : []
  })
  const [newWeight, setNewWeight] = useState('')
  const [showWeightModal, setShowWeightModal] = useState(false)

  // Get nutrition logs for dashboard
  const [nutritionLogs, setNutritionLogs] = useState(() => {
    const saved = localStorage.getItem('nutrition-logs')
    return saved ? JSON.parse(saved) : {}
  })

  // Save water intake to localStorage
  useEffect(() => {
    localStorage.setItem('water-intake', JSON.stringify(waterIntake))
  }, [waterIntake])

  // Save weight data to localStorage
  useEffect(() => {
    localStorage.setItem('weight-data', JSON.stringify(weightData))
  }, [weightData])

  const addWater = (amount) => {
    setWaterIntake(prev => ({
      ...prev,
      current: Math.min(prev.current + amount, prev.goal * 1.5) // Allow 150% of goal
    }))
  }

  const resetWater = () => {
    setWaterIntake(prev => ({ ...prev, current: 0 }))
  }

  const addWeightEntry = () => {
    if (newWeight && !isNaN(newWeight)) {
      const entry = {
        date: new Date().toISOString().split('T')[0],
        weight: parseFloat(newWeight),
        timestamp: new Date().toISOString()
      }
      setWeightData(prev => [...prev, entry].slice(-30)) // Keep last 30 entries
      setNewWeight('')
      setShowWeightModal(false)
    }
  }

  // Calculate dashboard metrics
  const getWeeklyCalorieData = () => {
    const last7Days = []
    const today = new Date()
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      
      const dayLogs = nutritionLogs[dateStr] || {}
      const allMeals = [
        ...(dayLogs.breakfast || []),
        ...(dayLogs.lunch || []),
        ...(dayLogs.dinner || []),
        ...(dayLogs.snacks || [])
      ]
      
      const totalCalories = allMeals.reduce((sum, item) => sum + item.calories, 0)
      
      last7Days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        calories: totalCalories,
        goal: 2000 // Should come from user settings
      })
    }
    
    return last7Days
  }

  const getDashboardStats = () => {
    const weekData = getWeeklyCalorieData()
    const totalDaysLogged = weekData.filter(day => day.calories > 0).length
    const avgCalories = weekData.reduce((sum, day) => sum + day.calories, 0) / 7
    const goalsHit = weekData.filter(day => Math.abs(day.calories - day.goal) <= 200).length
    
    return {
      streak: totalDaysLogged,
      avgCalories: Math.round(avgCalories),
      goalsHit,
      totalDays: 7
    }
  }

  const stats = getDashboardStats()
  const weeklyData = getWeeklyCalorieData()

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Progress Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Track your nutrition journey and celebrate your progress
        </p>
        {userPlan === 'free' && (
          <div className="mt-4">
            <Badge variant="warning" size="large">
              Free Plan: Basic metrics and 7-day history
            </Badge>
          </div>
        )}
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Current Streak"
          value={`${stats.streak} days`}
          icon="🔥"
          description="Days with logged meals"
          color="text-orange-600"
        />
        <StatCard
          title="Avg Daily Calories"
          value={stats.avgCalories}
          icon="📊"
          description="This week's average"
          color="text-blue-600"
        />
        <StatCard
          title="Goals Hit"
          value={`${stats.goalsHit}/${stats.totalDays}`}
          icon="🎯"
          description="Days on target"
          color="text-green-600"
        />
        <StatCard
          title="Weight Entries"
          value={weightData.length}
          icon="⚖️"
          description="Total logged"
          color="text-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Calorie Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Weekly Calorie Trends</span>
                {userPlan === 'premium' && (
                  <select
                    value={selectedTimeframe}
                    onChange={(e) => setSelectedTimeframe(e.target.value)}
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="7days">7 Days</option>
                    <option value="30days">30 Days</option>
                    <option value="3months">3 Months</option>
                    <option value="1year">1 Year</option>
                  </select>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <CalorieBarChart weekData={weeklyData} />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Average: {stats.avgCalories} calories per day
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Weight Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Weight Progress</span>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => setShowWeightModal(true)}
                >
                  + Add Weight
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {weightData.length > 0 ? (
                <div className="h-64">
                  <WeightProgressChart weightData={weightData.slice(-10)} />
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-4">⚖️</div>
                    <p className="mb-4">No weight data yet</p>
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowWeightModal(true)}
                    >
                      Log Your First Weight
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Premium Features Preview */}
          {userPlan === 'free' && (
            <Card className="border-accent-coral/20 bg-accent-coral/5">
              <CardHeader>
                <CardTitle>Unlock Advanced Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg opacity-60">
                    <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded mb-2 flex items-center justify-center">
                      <span className="text-gray-500">Macro Trends Chart</span>
                    </div>
                    <p className="text-sm font-medium">Detailed Macro Analysis</p>
                    <Badge variant="primary" size="small" className="mt-1">Premium</Badge>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg opacity-60">
                    <div className="h-32 bg-gradient-to-br from-green-100 to-yellow-100 rounded mb-2 flex items-center justify-center">
                      <span className="text-gray-500">Nutrient Breakdown</span>
                    </div>
                    <p className="text-sm font-medium">Micronutrient Tracking</p>
                    <Badge variant="primary" size="small" className="mt-1">Premium</Badge>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <Button variant="primary" className="bg-accent-coral hover:bg-accent-coral/90">
                    Upgrade to Premium - $29/month
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Water Intake Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Hydration</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <WaterIntakeVisual 
                current={waterIntake.current}
                goal={waterIntake.goal}
                className="mb-4"
              />
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => addWater(250)}
                >
                  +250ml
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => addWater(500)}
                >
                  +500ml
                </Button>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => addWater(1000)}
                >
                  +1L
                </Button>
              </div>
              
              <Button
                variant="tertiary"
                size="small"
                onClick={resetWater}
                className="text-xs"
              >
                Reset Today
              </Button>
            </CardContent>
          </Card>

          {/* Goal Completion */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="h-32 mb-4">
                <GoalCompletionDonut completed={stats.goalsHit} total={stats.totalDays} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Calorie Goals Hit:</span>
                  <span className="font-medium">{stats.goalsHit}/{stats.totalDays}</span>
                </div>
                <div className="flex justify-between">
                  <span>Days Logged:</span>
                  <span className="font-medium">{stats.streak}/{stats.totalDays}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievement Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <AchievementBadge
                  icon="🥇"
                  title="First Entry"
                  description="Logged your first meal"
                  achieved={stats.streak > 0}
                />
                <AchievementBadge
                  icon="🔥"
                  title="3-Day Streak"
                  description="Logged meals for 3 days straight"
                  achieved={stats.streak >= 3}
                />
                <AchievementBadge
                  icon="🎯"
                  title="Goal Achiever"
                  description="Hit calorie goal 5 times"
                  achieved={stats.goalsHit >= 5}
                />
                <AchievementBadge
                  icon="💧"
                  title="Hydration Hero"
                  description="Reach daily water goal"
                  achieved={waterIntake.current >= waterIntake.goal}
                />
              </div>
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-800">✓ Consistency</div>
                  <div className="text-green-600">
                    {stats.streak > 0 ? `Great job logging ${stats.streak} days!` : 'Start logging to track progress'}
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-800">📊 Average Intake</div>
                  <div className="text-blue-600">
                    {stats.avgCalories > 0 ? `${stats.avgCalories} calories per day` : 'No data yet'}
                  </div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="font-medium text-purple-800">🎯 Goal Achievement</div>
                  <div className="text-purple-600">
                    {Math.round((stats.goalsHit / stats.totalDays) * 100)}% success rate this week
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weight Entry Modal */}
      {showWeightModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Log Your Weight</h3>
              <p className="text-gray-600">Track your weight progress over time</p>
            </div>
            
            <div className="mb-6">
              <NumberInput
                label="Weight (kg)"
                value={newWeight}
                onChange={setNewWeight}
                min={30}
                max={300}
                step={0.1}
                placeholder="Enter your current weight"
              />
            </div>

            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                onClick={() => setShowWeightModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={addWeightEntry}
                className="flex-1"
                disabled={!newWeight}
              >
                Add Weight
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const StatCard = ({ title, value, icon, description, color = 'text-gray-600' }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          <div className="text-3xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

const AchievementBadge = ({ icon, title, description, achieved }) => {
  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
      achieved ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
    }`}>
      <div className={`text-2xl ${achieved ? '' : 'grayscale opacity-50'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className={`font-medium ${achieved ? 'text-green-800' : 'text-gray-600'}`}>
          {title}
        </div>
        <div className={`text-sm ${achieved ? 'text-green-600' : 'text-gray-500'}`}>
          {description}
        </div>
      </div>
      {achieved && (
        <div className="text-green-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  )
}
