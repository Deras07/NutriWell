import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  User, 
  Settings, 
  Crown, 
  Bell, 
  Shield, 
  Eye, 
  Heart, 
  Target, 
  Calendar,
  Award,
  Zap,
  Lock,
  Check,
  Edit,
  Camera,
  Mail,
  Phone,
  MapPin,
  Save,
  X
} from 'lucide-react'

// Mock user data
const mockUserData = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  joinDate: "March 2024",
  plan: "free", // or "premium"
  profileImage: null,
  bio: "Nutrition enthusiast and busy professional trying to maintain a healthy lifestyle.",
  goals: {
    primary: "Weight Management",
    secondary: "Increase Energy",
    target: "Lose 15 lbs"
  },
  preferences: {
    dietaryRestrictions: ["Vegetarian", "Gluten-Free"],
    allergies: ["Nuts"],
    cuisinePreferences: ["Mediterranean", "Asian", "Mexican"],
    mealFrequency: "3 meals + 2 snacks",
    cookingSkill: "Intermediate",
    prepTime: "30-45 minutes"
  },
  settings: {
    notifications: {
      email: true,
      push: true,
      mealReminders: true,
      workoutReminders: false,
      communityUpdates: true,
      weeklyReports: true
    },
    privacy: {
      profileVisibility: "friends",
      activitySharing: false,
      communityPosts: true
    },
    units: {
      weight: "lbs",
      distance: "miles",
      temperature: "fahrenheit"
    }
  },
  stats: {
    streakDays: 15,
    mealsLogged: 124,
    recipesCreated: 8,
    communityPosts: 12,
    achievementsEarned: 7
  }
}

const achievements = [
  { id: 1, name: "First Week", description: "Completed your first week", icon: "🎯", earned: true },
  { id: 2, name: "Meal Logger", description: "Logged 50 meals", icon: "📝", earned: true },
  { id: 3, name: "Community Member", description: "Made your first post", icon: "👥", earned: true },
  { id: 4, name: "Recipe Creator", description: "Created 5 recipes", icon: "👨‍🍳", earned: true },
  { id: 5, name: "Streak Master", description: "7-day logging streak", icon: "🔥", earned: true },
  { id: 6, name: "Health Expert", description: "Read 10 articles", icon: "🧠", earned: true },
  { id: 7, name: "Fitness Enthusiast", description: "Log 20 workouts", icon: "💪", earned: false },
  { id: 8, name: "Social Butterfly", description: "Get 50 likes", icon: "❤️", earned: false }
]

export const UserProfile = ({ userPlan = 'free' }) => {
  const [userData, setUserData] = useState(mockUserData)
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [editedData, setEditedData] = useState(userData)

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Heart },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'subscription', label: 'Subscription', icon: Crown }
  ]

  const handleSaveProfile = () => {
    setUserData(editedData)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const handleNotificationChange = (key, value) => {
    if (userPlan === 'free' && key !== 'email') {
      setShowUpgradeModal(true)
      return
    }
    setEditedData({
      ...editedData,
      settings: {
        ...editedData.settings,
        notifications: {
          ...editedData.settings.notifications,
          [key]: value
        }
      }
    })
  }

  const UpgradeModal = () => {
    if (!showUpgradeModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-charcoal mb-2">Premium Feature</h3>
            <p className="text-gray-600 mb-6">
              Upgrade to Premium to access advanced settings and customization options.
            </p>
            
            <div className="bg-gradient-to-r from-sage-50 to-coral-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-charcoal mb-2">Premium Profile Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Advanced notification controls</li>
                <li>• Enhanced privacy settings</li>
                <li>• Detailed analytics and insights</li>
                <li>• Priority customer support</li>
                <li>• Custom goal tracking</li>
                <li>• Export your data</li>
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

  const ProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-sage-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </div>
              {isEditing && (
                <button className="absolute -bottom-2 -right-2 bg-white border-2 border-gray-300 rounded-full p-2 hover:bg-gray-50">
                  <Camera className="h-4 w-4 text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-charcoal">{userData.name}</h2>
                  <p className="text-gray-600">Member since {userData.joinDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={userData.plan === 'premium' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' : 'bg-gray-100 text-gray-700'}>
                    <Crown className="h-3 w-3 mr-1" />
                    {userData.plan === 'premium' ? 'Premium' : 'Free Plan'}
                  </Badge>
                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveProfile} className="bg-sage-500 hover:bg-sage-600 text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline">
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Bio */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={editedData.bio}
                    onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                ) : (
                  <p className="text-gray-700">{userData.bio}</p>
                )}
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedData.email}
                      onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                      icon={Mail}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4" />
                      {userData.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editedData.phone}
                      onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                      icon={Phone}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4" />
                      {userData.phone}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  {isEditing ? (
                    <Input
                      value={editedData.location}
                      onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                      icon={MapPin}
                    />
                  ) : (
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4" />
                      {userData.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-sage-600">{userData.stats.streakDays}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-teal-600">{userData.stats.mealsLogged}</div>
            <div className="text-sm text-gray-600">Meals Logged</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-coral-600">{userData.stats.recipesCreated}</div>
            <div className="text-sm text-gray-600">Recipes Created</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{userData.stats.communityPosts}</div>
            <div className="text-sm text-gray-600">Community Posts</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-600">{userData.stats.achievementsEarned}</div>
            <div className="text-sm text-gray-600">Achievements</div>
          </CardContent>
        </Card>
      </div>

      {/* Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-sage-500" />
            Health Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
              {isEditing ? (
                <select
                  value={editedData.goals.primary}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    goals: { ...editedData.goals, primary: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                >
                  <option>Weight Management</option>
                  <option>Muscle Gain</option>
                  <option>Improve Energy</option>
                  <option>General Health</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.goals.primary}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Goal</label>
              {isEditing ? (
                <select
                  value={editedData.goals.secondary}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    goals: { ...editedData.goals, secondary: e.target.value }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                >
                  <option>Increase Energy</option>
                  <option>Better Sleep</option>
                  <option>Reduce Stress</option>
                  <option>Improve Digestion</option>
                </select>
              ) : (
                <p className="text-gray-700">{userData.goals.secondary}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
              {isEditing ? (
                <Input
                  value={editedData.goals.target}
                  onChange={(e) => setEditedData({
                    ...editedData,
                    goals: { ...editedData.goals, target: e.target.value }
                  })}
                  placeholder="e.g., Lose 15 lbs"
                />
              ) : (
                <p className="text-gray-700">{userData.goals.target}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const PreferencesTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Dietary Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
            <div className="flex flex-wrap gap-2">
              {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Paleo"].map((restriction) => (
                <Badge
                  key={restriction}
                  variant={userData.preferences.dietaryRestrictions.includes(restriction) ? "default" : "outline"}
                  className="cursor-pointer"
                >
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
            <div className="flex flex-wrap gap-2">
              {userData.preferences.allergies.map((allergy) => (
                <Badge key={allergy} className="bg-red-100 text-red-700">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Cuisines</label>
            <div className="flex flex-wrap gap-2">
              {userData.preferences.cuisinePreferences.map((cuisine) => (
                <Badge key={cuisine} variant="outline">
                  {cuisine}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meal Frequency</label>
              <p className="text-gray-700">{userData.preferences.mealFrequency}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cooking Skill</label>
              <p className="text-gray-700">{userData.preferences.cookingSkill}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prep Time</label>
              <p className="text-gray-700">{userData.preferences.prepTime}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const SettingsTab = () => (
    <div className="space-y-6">
      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-sage-500" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(userData.settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="font-medium text-charcoal capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {(key !== 'email' && userPlan === 'free') && (
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <Crown className="h-3 w-3" />
                    Premium
                  </div>
                )}
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                  disabled={key !== 'email' && userPlan === 'free'}
                />
                <div className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                  value ? 'peer-checked:bg-sage-500' : ''
                } ${key !== 'email' && userPlan === 'free' ? 'opacity-50 cursor-not-allowed' : ''}`}></div>
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-sage-500" />
            Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
            <select
              value={userData.settings.privacy.profileVisibility}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Units */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement Units</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                <option value="lbs">Pounds (lbs)</option>
                <option value="kg">Kilograms (kg)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                <option value="miles">Miles</option>
                <option value="km">Kilometers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Temperature</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent">
                <option value="fahrenheit">Fahrenheit (°F)</option>
                <option value="celsius">Celsius (°C)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const AchievementsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-charcoal mb-2">Your Achievements</h3>
        <p className="text-gray-600">
          {achievements.filter(a => a.earned).length} of {achievements.length} achievements unlocked
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className={`text-center ${achievement.earned ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200' : 'opacity-60'}`}>
            <CardContent className="p-4">
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold text-charcoal mb-1">{achievement.name}</h4>
              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
              {achievement.earned ? (
                <Badge className="bg-amber-500 text-white">
                  <Check className="h-3 w-3 mr-1" />
                  Earned
                </Badge>
              ) : (
                <Badge variant="outline">
                  <Lock className="h-3 w-3 mr-1" />
                  Locked
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const SubscriptionTab = () => (
    <div className="space-y-6">
      <Card className={userData.plan === 'premium' ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200' : ''}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            {userData.plan === 'premium' ? 'Premium Subscription' : 'Upgrade to Premium'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userData.plan === 'premium' ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-charcoal">Premium Plan</h3>
                  <p className="text-gray-600">Next billing: April 15, 2024</p>
                </div>
                <Badge className="bg-amber-500 text-white">Active</Badge>
              </div>
              <Button variant="outline">Manage Subscription</Button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-charcoal mb-4">Free Plan</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Basic nutrition tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Simple meal planning
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Community browsing
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Advanced analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      Wearable integration
                    </li>
                  </ul>
                </div>
                
                <div className="border-2 border-amber-300 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                  <h3 className="font-semibold text-charcoal mb-2">Premium Plan</h3>
                  <div className="text-3xl font-bold text-charcoal mb-1">$9.99<span className="text-lg text-gray-600">/month</span></div>
                  <p className="text-sm text-gray-600 mb-4">or $99/year (2 months free)</p>
                  
                  <ul className="space-y-2 text-sm text-gray-600 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Everything in Free
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Advanced nutrition analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Wearable device integration
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Custom meal plans
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Community participation
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Premium
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />
      case 'preferences':
        return <PreferencesTab />
      case 'settings':
        return <SettingsTab />
      case 'achievements':
        return <AchievementsTab />
      case 'subscription':
        return <SubscriptionTab />
      default:
        return <ProfileTab />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            Profile & Settings
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Manage your account, preferences, and subscription settings.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-sage-500 text-sage-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                  {tab.id === 'subscription' && userData.plan === 'free' && (
                    <Crown className="h-3 w-3 text-amber-500" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderActiveTab()}
      </div>

      <UpgradeModal />
    </div>
  )
} 