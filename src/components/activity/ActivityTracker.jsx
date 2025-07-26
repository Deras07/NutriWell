import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  CalorieBarChart, 
  WeightProgressChart,
  MacroProgressBars
} from '../ui/charts'
import { 
  Activity, 
  Heart, 
  Zap, 
  Target, 
  Clock, 
  Flame, 
  Trophy, 
  Plus,
  Watch,
  Smartphone,
  Wifi,
  WifiOff,
  Crown,
  Lock,
  TrendingUp,
  Calendar,
  Play,
  Pause,
  Square
} from 'lucide-react'

// Mock data for activities
const mockActivities = [
  {
    id: 1,
    name: "Morning Run",
    type: "Cardio",
    duration: 45,
    calories: 320,
    steps: 4500,
    date: new Date().toISOString().split('T')[0],
    time: "07:30 AM",
    source: "manual"
  },
  {
    id: 2,
    name: "Weight Training",
    type: "Strength",
    duration: 60,
    calories: 280,
    steps: 800,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: "06:00 PM",
    source: "apple_watch"
  },
  {
    id: 3,
    name: "Yoga Session",
    type: "Flexibility",
    duration: 30,
    calories: 120,
    steps: 200,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    time: "08:00 AM",
    source: "fitbit"
  }
]

const activityTypes = [
  { name: "Walking", icon: "🚶", calories: 4, category: "Cardio" },
  { name: "Running", icon: "🏃", calories: 10, category: "Cardio" },
  { name: "Cycling", icon: "🚴", calories: 8, category: "Cardio" },
  { name: "Swimming", icon: "🏊", calories: 11, category: "Cardio" },
  { name: "Weight Training", icon: "🏋️", calories: 6, category: "Strength" },
  { name: "Yoga", icon: "🧘", calories: 3, category: "Flexibility" },
  { name: "Dance", icon: "💃", calories: 5, category: "Cardio" },
  { name: "Rock Climbing", icon: "🧗", calories: 9, category: "Strength" }
]

const deviceConnections = [
  { name: "Apple Watch", icon: Watch, connected: true, color: "text-blue-500" },
  { name: "Fitbit", icon: Activity, connected: false, color: "text-green-500" },
  { name: "Garmin", icon: Watch, connected: false, color: "text-red-500" },
  { name: "Phone App", icon: Smartphone, connected: true, color: "text-purple-500" }
]

export const ActivityTracker = ({ userPlan = 'free' }) => {
  const [activities, setActivities] = useState(mockActivities)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [isTracking, setIsTracking] = useState(false)
  const [trackingDuration, setTrackingDuration] = useState(0)
  const [selectedActivityType, setSelectedActivityType] = useState('')
  const [newActivity, setNewActivity] = useState({
    name: '',
    type: '',
    duration: '',
    calories: '',
    notes: ''
  })

  // Mock tracking timer
  useEffect(() => {
    let interval
    if (isTracking) {
      interval = setInterval(() => {
        setTrackingDuration(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTracking])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const calculateTotalCalories = () => {
    return activities.reduce((total, activity) => total + activity.calories, 0)
  }

  const calculateTotalSteps = () => {
    return activities.reduce((total, activity) => total + activity.steps, 0)
  }

  const handleStartTracking = () => {
    if (userPlan === 'free') {
      setShowUpgradeModal(true)
      return
    }
    setIsTracking(true)
    setTrackingDuration(0)
  }

  const handleStopTracking = () => {
    setIsTracking(false)
    setShowAddModal(true)
  }

  const handleAddActivity = () => {
    if (userPlan === 'free') {
      setShowUpgradeModal(true)
      return
    }
    setShowAddModal(true)
  }

  const handleSaveActivity = () => {
    const activity = {
      id: activities.length + 1,
      ...newActivity,
      duration: parseInt(newActivity.duration) || trackingDuration / 60,
      calories: parseInt(newActivity.calories) || 0,
      steps: Math.floor((parseInt(newActivity.duration) || trackingDuration / 60) * 100),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      source: "manual"
    }
    
    setActivities([activity, ...activities])
    setNewActivity({ name: '', type: '', duration: '', calories: '', notes: '' })
    setShowAddModal(false)
    setTrackingDuration(0)
  }

  const handleDeviceConnect = (deviceName) => {
    if (userPlan === 'free') {
      setShowUpgradeModal(true)
    }
  }

  const AddActivityModal = () => {
    if (!showAddModal) {return null}

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-charcoal mb-4">Add Activity</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
              <select
                value={newActivity.type}
                onChange={(e) => {
                  const selectedType = activityTypes.find(type => type.name === e.target.value)
                  setNewActivity({
                    ...newActivity,
                    type: e.target.value,
                    name: e.target.value
                  })
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              >
                <option value="">Select an activity</option>
                {activityTypes.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.icon} {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Activity Name</label>
              <Input
                placeholder="e.g., Morning Run"
                value={newActivity.name}
                onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <Input
                  type="number"
                  placeholder={trackingDuration > 0 ? Math.floor(trackingDuration / 60).toString() : "30"}
                  value={newActivity.duration}
                  onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calories Burned</label>
                <Input
                  type="number"
                  placeholder="200"
                  value={newActivity.calories}
                  onChange={(e) => setNewActivity({ ...newActivity, calories: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                placeholder="How did you feel? Any observations..."
                value={newActivity.notes}
                onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent resize-none"
                rows="3"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowAddModal(false)
                setTrackingDuration(0)
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveActivity}
              className="flex-1 bg-gradient-to-r from-sage-500 to-teal-500 hover:from-sage-600 hover:to-teal-600 text-white"
              disabled={!newActivity.name || !newActivity.type}
            >
              Save Activity
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const UpgradeModal = () => {
    if (!showUpgradeModal) {return null}

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-charcoal mb-2">Unlock Activity Tracking!</h3>
            <p className="text-gray-600 mb-6">
              Upgrade to Premium to track your activities, connect wearables, and get detailed insights.
            </p>
            
            <div className="bg-gradient-to-r from-sage-50 to-coral-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-charcoal mb-2">Premium Activity Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Real-time activity tracking</li>
                <li>• Wearable device integration</li>
                <li>• Detailed analytics and trends</li>
                <li>• Custom workout plans</li>
                <li>• Heart rate monitoring</li>
                <li>• Achievement badges and goals</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1"
              >
                Maybe Later
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-sage-500 to-teal-500 hover:from-sage-600 hover:to-teal-600 text-white"
                onClick={() => setShowUpgradeModal(false)}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            Activity Tracker
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your physical activities, monitor your progress, and connect your favorite fitness devices.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">{calculateTotalCalories()}</div>
              <div className="text-sm text-gray-600">Calories Burned</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">{calculateTotalSteps()}</div>
              <div className="text-sm text-gray-600">Total Steps</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">{activities.length}</div>
              <div className="text-sm text-gray-600">Activities</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">7</div>
              <div className="text-sm text-gray-600">Streak Days</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Activity Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-sage-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {/* Live Tracking */}
                  <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                    {isTracking ? (
                      <div>
                        <div className="text-3xl font-bold text-green-500 mb-2">
                          {formatTime(trackingDuration)}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">Activity in progress</div>
                        <Button
                          onClick={handleStopTracking}
                          variant="outline"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Square className="h-4 w-4 mr-2" />
                          Stop & Save
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Play className="h-12 w-12 text-sage-500 mx-auto mb-2" />
                        <div className="text-sm font-medium text-charcoal mb-2">Start Live Tracking</div>
                        <Button
                          onClick={handleStartTracking}
                          className={`bg-gradient-to-r from-sage-500 to-teal-500 hover:from-sage-600 hover:to-teal-600 text-white ${
                            userPlan === 'free' ? 'opacity-75' : ''
                          }`}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start
                          {userPlan === 'free' && <Lock className="h-4 w-4 ml-2" />}
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Manual Entry */}
                  <div className="text-center p-4 border-2 border-dashed border-gray-200 rounded-lg">
                    <Plus className="h-12 w-12 text-teal-500 mx-auto mb-2" />
                    <div className="text-sm font-medium text-charcoal mb-2">Add Activity</div>
                    <Button
                      onClick={handleAddActivity}
                      variant="outline"
                      className={`border-teal-300 text-teal-600 hover:bg-teal-50 ${
                        userPlan === 'free' ? 'opacity-75' : ''
                      }`}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Manual
                      {userPlan === 'free' && <Lock className="h-4 w-4 ml-2" />}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-sage-500" />
                    Recent Activities
                  </span>
                  {userPlan === 'premium' && (
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.slice(0, userPlan === 'free' ? 2 : 5).map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-12 h-12 bg-gradient-to-r from-sage-100 to-teal-100 rounded-full flex items-center justify-center">
                        <Activity className="h-6 w-6 text-sage-600" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-charcoal">{activity.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                          {activity.source !== 'manual' && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">
                              <Watch className="h-3 w-3 mr-1" />
                              {activity.source.replace('_', ' ')}
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {activity.duration} min • {activity.calories} cal • {activity.date} at {activity.time}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-charcoal">{activity.calories}</div>
                        <div className="text-sm text-gray-600">calories</div>
                      </div>
                    </div>
                  ))}

                  {userPlan === 'free' && activities.length > 2 && (
                    <div className="text-center p-4 border-2 border-dashed border-amber-200 rounded-lg bg-amber-50">
                      <Lock className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-sm text-amber-700 mb-2">
                        View all {activities.length} activities with Premium
                      </p>
                      <Button
                        onClick={() => setShowUpgradeModal(true)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                      >
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analytics Preview */}
            {userPlan === 'premium' ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-sage-500" />
                    Weekly Activity Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalorieBarChart />
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    Detailed Analytics Available in Premium
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get comprehensive charts, trends, and insights about your activity patterns.
                  </p>
                  <Button 
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-gradient-to-r from-sage-500 to-teal-500 hover:from-sage-600 hover:to-teal-600 text-white"
                  >
                    <Crown className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Device Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Watch className="h-5 w-5 text-sage-500" />
                  Connected Devices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {deviceConnections.map((device) => (
                  <div key={device.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <device.icon className={`h-5 w-5 ${device.color}`} />
                      <span className="font-medium text-charcoal">{device.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {device.connected ? (
                        <Badge className="bg-green-100 text-green-700">
                          <Wifi className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => handleDeviceConnect(device.name)}
                          variant="outline"
                          size="sm"
                          className={userPlan === 'free' ? 'opacity-60' : ''}
                        >
                          {userPlan === 'free' ? (
                            <>
                              <Lock className="h-3 w-3 mr-1" />
                              Premium
                            </>
                          ) : (
                            <>
                              <WifiOff className="h-3 w-3 mr-1" />
                              Connect
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                
                {userPlan === 'free' && (
                  <div className="text-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700">
                      Connect unlimited devices with Premium
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Activity Types */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-sage-500" />
                  Quick Add
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {activityTypes.slice(0, 6).map((type) => (
                    <button
                      key={type.name}
                      onClick={handleAddActivity}
                      className={`p-3 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors ${
                        userPlan === 'free' ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="text-2xl mb-1">{type.icon}</div>
                      <div className="text-xs font-medium text-charcoal">{type.name}</div>
                      <div className="text-xs text-gray-500">{type.calories} cal/min</div>
                      {userPlan === 'free' && (
                        <Lock className="h-3 w-3 mx-auto mt-1 text-gray-400" />
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-sage-500" />
                  Today's Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Steps</span>
                    <span>{calculateTotalSteps()}/10,000</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sage-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((calculateTotalSteps() / 10000) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories</span>
                    <span>{calculateTotalCalories()}/500</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-coral-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((calculateTotalCalories() / 500) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Active Minutes</span>
                    <span>{activities.reduce((total, activity) => total + activity.duration, 0)}/60</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((activities.reduce((total, activity) => total + activity.duration, 0) / 60) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <AddActivityModal />
      <UpgradeModal />
    </div>
  )
} 