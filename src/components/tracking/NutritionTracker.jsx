import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input, NumberInput } from '../ui/input'
import { Badge } from '../ui/badge'
import { MacroPieChart, MacroProgressBars } from '../ui/charts'

// Mock food database (500 foods for free version)
const FOOD_DATABASE = [
  // Proteins
  { id: 1, name: 'Chicken breast (grilled)', category: 'Protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, serving: '100g' },
  { id: 2, name: 'Salmon fillet', category: 'Protein', calories: 208, protein: 22, carbs: 0, fat: 12, fiber: 0, serving: '100g' },
  { id: 3, name: 'Tuna (canned in water)', category: 'Protein', calories: 132, protein: 28, carbs: 0, fat: 1, fiber: 0, serving: '100g' },
  { id: 4, name: 'Ground beef (lean)', category: 'Protein', calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, serving: '100g' },
  { id: 5, name: 'Eggs (large)', category: 'Protein', calories: 155, protein: 13, carbs: 1, fat: 11, fiber: 0, serving: '100g' },
  { id: 6, name: 'Greek yogurt (plain)', category: 'Protein', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, serving: '100g' },
  { id: 7, name: 'Cottage cheese', category: 'Protein', calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, serving: '100g' },
  { id: 8, name: 'Tofu (firm)', category: 'Protein', calories: 144, protein: 15, carbs: 3, fat: 9, fiber: 2, serving: '100g' },

  // Grains & Carbs
  { id: 9, name: 'Brown rice (cooked)', category: 'Grains', calories: 123, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, serving: '100g' },
  { id: 10, name: 'Quinoa (cooked)', category: 'Grains', calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8, serving: '100g' },
  { id: 11, name: 'Oats (dry)', category: 'Grains', calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 11, serving: '100g' },
  { id: 12, name: 'Whole wheat bread', category: 'Grains', calories: 247, protein: 13, carbs: 41, fat: 4.2, fiber: 7, serving: '100g' },
  { id: 13, name: 'Sweet potato (baked)', category: 'Grains', calories: 90, protein: 2, carbs: 21, fat: 0.1, fiber: 3.3, serving: '100g' },
  { id: 14, name: 'Pasta (whole wheat)', category: 'Grains', calories: 124, protein: 5, carbs: 25, fat: 1.1, fiber: 3.2, serving: '100g' },

  // Vegetables
  { id: 15, name: 'Broccoli (steamed)', category: 'Vegetables', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, serving: '100g' },
  { id: 16, name: 'Spinach (raw)', category: 'Vegetables', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, serving: '100g' },
  { id: 17, name: 'Bell pepper (red)', category: 'Vegetables', calories: 31, protein: 1, carbs: 7, fat: 0.3, fiber: 2.5, serving: '100g' },
  { id: 18, name: 'Carrots (raw)', category: 'Vegetables', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, serving: '100g' },
  { id: 19, name: 'Tomatoes (fresh)', category: 'Vegetables', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, serving: '100g' },
  { id: 20, name: 'Cucumber', category: 'Vegetables', calories: 16, protein: 0.7, carbs: 4, fat: 0.1, fiber: 0.5, serving: '100g' },
  { id: 21, name: 'Kale (raw)', category: 'Vegetables', calories: 35, protein: 2.9, carbs: 4.4, fat: 1.5, fiber: 4.1, serving: '100g' },

  // Fruits
  { id: 22, name: 'Banana (medium)', category: 'Fruits', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, serving: '100g' },
  { id: 23, name: 'Apple (with skin)', category: 'Fruits', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, serving: '100g' },
  { id: 24, name: 'Berries (mixed)', category: 'Fruits', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, serving: '100g' },
  { id: 25, name: 'Orange (fresh)', category: 'Fruits', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, serving: '100g' },
  { id: 26, name: 'Strawberries', category: 'Fruits', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, serving: '100g' },

  // Nuts & Seeds
  { id: 27, name: 'Almonds', category: 'Nuts', calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, serving: '100g' },
  { id: 28, name: 'Walnuts', category: 'Nuts', calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, serving: '100g' },
  { id: 29, name: 'Chia seeds', category: 'Seeds', calories: 486, protein: 17, carbs: 42, fat: 31, fiber: 34, serving: '100g' },
  { id: 30, name: 'Peanut butter', category: 'Nuts', calories: 588, protein: 25, carbs: 20, fat: 50, fiber: 6, serving: '100g' },

  // Fats & Oils
  { id: 31, name: 'Olive oil (extra virgin)', category: 'Fats', calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, serving: '100g' },
  { id: 32, name: 'Avocado', category: 'Fats', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, serving: '100g' },
  { id: 33, name: 'Coconut oil', category: 'Fats', calories: 862, protein: 0, carbs: 0, fat: 100, fiber: 0, serving: '100g' },

  // Common Foods - Quick Add
  { id: 34, name: 'Pizza slice (cheese)', category: 'Fast Food', calories: 272, protein: 12, carbs: 34, fat: 10, fiber: 2, serving: '1 slice' },
  { id: 35, name: 'Hamburger (medium)', category: 'Fast Food', calories: 540, protein: 25, carbs: 40, fat: 31, fiber: 2, serving: '1 burger' },
  { id: 36, name: 'Coffee (black)', category: 'Beverages', calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, serving: '1 cup' },
  { id: 37, name: 'Green tea', category: 'Beverages', calories: 2, protein: 0.2, carbs: 0, fat: 0, fiber: 0, serving: '1 cup' },
]

// Quick add foods for common items
const QUICK_ADD_FOODS = [
  { id: 23, name: 'Apple', icon: '🍎' },
  { id: 22, name: 'Banana', icon: '🍌' },
  { id: 1, name: 'Chicken breast', icon: '🍗' },
  { id: 9, name: 'Brown rice', icon: '🍚' },
  { id: 6, name: 'Greek yogurt', icon: '🥛' },
  { id: 27, name: 'Almonds', icon: '🥜' }
]

export const NutritionTracker = ({ userPlan = 'free', className = '' }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMeal, setSelectedMeal] = useState('breakfast')
  const [showAddFoodModal, setShowAddFoodModal] = useState(false)
  const [selectedFood, setSelectedFood] = useState(null)
  const [quantity, setQuantity] = useState(100)
  const [dailyLogs, setDailyLogs] = useState(() => {
    const saved = localStorage.getItem('nutrition-logs')
    return saved ? JSON.parse(saved) : {}
  })

  // Daily goals (example - should come from user profile)
  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  }

  // Save to localStorage whenever logs change
  useEffect(() => {
    localStorage.setItem('nutrition-logs', JSON.stringify(dailyLogs))
  }, [dailyLogs])

  const filteredFoods = FOOD_DATABASE.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addFoodToLog = (food, mealType, servingSize = 100) => {
    const multiplier = servingSize / 100
    const logEntry = {
      id: Date.now(),
      food: food,
      quantity: servingSize,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
      fiber: Math.round(food.fiber * multiplier * 10) / 10,
      timestamp: new Date().toISOString()
    }

    setDailyLogs(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [mealType]: [...(prev[selectedDate]?.[mealType] || []), logEntry]
      }
    }))

    setShowAddFoodModal(false)
    setSelectedFood(null)
    setQuantity(100)
    setSearchTerm('')
  }

  const quickAddFood = (food) => {
    addFoodToLog(food, selectedMeal, 100)
  }

  const removeFoodFromLog = (mealType, logId) => {
    setDailyLogs(prev => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [mealType]: prev[selectedDate]?.[mealType]?.filter(item => item.id !== logId) || []
      }
    }))
  }

  const getTodayTotals = () => {
    const todayLogs = dailyLogs[selectedDate] || {}
    const allMeals = [...(todayLogs.breakfast || []), ...(todayLogs.lunch || []), ...(todayLogs.dinner || []), ...(todayLogs.snacks || [])]
    
    return allMeals.reduce((totals, item) => ({
      calories: totals.calories + item.calories,
      protein: totals.protein + item.protein,
      carbs: totals.carbs + item.carbs,
      fat: totals.fat + item.fat,
      fiber: totals.fiber + item.fiber
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 })
  }

  const getMealLogs = (mealType) => {
    return dailyLogs[selectedDate]?.[mealType] || []
  }

  const totals = getTodayTotals()

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nutrition Tracker
        </h1>
        <p className="text-xl text-gray-600">
          Log your meals and track your daily nutrition goals
        </p>
        {userPlan === 'free' && (
          <div className="mt-4">
            <Badge variant="warning" size="large">
              Free Plan: Basic tracking with 500 foods
            </Badge>
          </div>
        )}
      </div>

      {/* Date Selector */}
      <div className="mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-teal focus:border-transparent"
                />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary-teal">
                  {totals.calories} / {dailyGoals.calories}
                </div>
                <div className="text-sm text-gray-600">calories consumed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Food Logging */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Add Foods */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Add Foods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                {['breakfast', 'lunch', 'dinner', 'snacks'].map((meal) => (
                  <Button
                    key={meal}
                    variant={selectedMeal === meal ? 'primary' : 'secondary'}
                    size="small"
                    onClick={() => setSelectedMeal(meal)}
                    className="capitalize"
                  >
                    {meal}
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-4">
                {QUICK_ADD_FOODS.map((food) => {
                  const foodData = FOOD_DATABASE.find(f => f.id === food.id)
                  return (
                    <button
                      key={food.id}
                      onClick={() => quickAddFood(foodData)}
                      className="flex flex-col items-center p-3 bg-gray-50 hover:bg-primary-teal/10 rounded-lg transition-colors"
                    >
                      <span className="text-2xl mb-1">{food.icon}</span>
                      <span className="text-xs text-center">{food.name}</span>
                    </button>
                  )
                })}
              </div>

              <Button 
                variant="primary" 
                onClick={() => setShowAddFoodModal(true)}
                className="w-full"
              >
                + Search & Add Food
              </Button>
            </CardContent>
          </Card>

          {/* Meal Logs */}
          {['breakfast', 'lunch', 'dinner', 'snacks'].map((mealType) => (
            <MealLogCard
              key={mealType}
              mealType={mealType}
              logs={getMealLogs(mealType)}
              onRemoveFood={(logId) => removeFoodFromLog(mealType, logId)}
              onAddFood={() => {
                setSelectedMeal(mealType)
                setShowAddFoodModal(true)
              }}
            />
          ))}
        </div>

        {/* Nutrition Summary */}
        <div className="space-y-6">
          {/* Daily Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <MacroProgressBars
                protein={totals.protein}
                carbs={totals.carbs}
                fat={totals.fat}
                goals={dailyGoals}
              />
            </CardContent>
          </Card>

          {/* Macro Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Macro Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <MacroPieChart
                  protein={totals.protein}
                  carbs={totals.carbs}
                  fat={totals.fat}
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Protein:</span>
                  <span>{totals.protein}g ({Math.round((totals.protein * 4 / totals.calories) * 100) || 0}%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Carbs:</span>
                  <span>{totals.carbs}g ({Math.round((totals.carbs * 4 / totals.calories) * 100) || 0}%)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fat:</span>
                  <span>{totals.fat}g ({Math.round((totals.fat * 9 / totals.calories) * 100) || 0}%)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Prompt for Free Users */}
          {userPlan === 'free' && (
            <Card className="border-accent-coral/20 bg-accent-coral/5">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Unlock Advanced Tracking</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get detailed micronutrient tracking, weekly trends, and 1000+ foods
                </p>
                <Button variant="primary" size="small" className="bg-accent-coral hover:bg-accent-coral/90">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add Food Modal */}
      {showAddFoodModal && (
        <AddFoodModal
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filteredFoods={filteredFoods}
          selectedFood={selectedFood}
          setSelectedFood={setSelectedFood}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddFood={(food, qty) => addFoodToLog(food, selectedMeal, qty)}
          onClose={() => {
            setShowAddFoodModal(false)
            setSelectedFood(null)
            setSearchTerm('')
            setQuantity(100)
          }}
        />
      )}
    </div>
  )
}

const MealLogCard = ({ mealType, logs, onRemoveFood, onAddFood }) => {
  const mealTotals = logs.reduce((totals, item) => ({
    calories: totals.calories + item.calories,
    protein: totals.protein + item.protein,
    carbs: totals.carbs + item.carbs,
    fat: totals.fat + item.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 })

  const getMealIcon = () => {
    switch (mealType) {
      case 'breakfast': return '🌅'
      case 'lunch': return '☀️'
      case 'dinner': return '🌙'
      case 'snacks': return '🍿'
      default: return '🍽️'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getMealIcon()}</span>
            <span className="capitalize">{mealType}</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-primary-teal">
              {mealTotals.calories} cal
            </div>
            <div className="text-xs text-gray-500">
              P: {mealTotals.protein}g | C: {mealTotals.carbs}g | F: {mealTotals.fat}g
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-3">No foods logged for {mealType}</p>
            <Button variant="secondary" size="small" onClick={onAddFood}>
              + Add Food
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{log.food.name}</div>
                  <div className="text-sm text-gray-600">
                    {log.quantity}g • {log.calories} cal
                  </div>
                  <div className="text-xs text-gray-500">
                    P: {log.protein}g | C: {log.carbs}g | F: {log.fat}g
                  </div>
                </div>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => onRemoveFood(log.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="secondary" size="small" onClick={onAddFood} className="w-full">
              + Add More Food
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

const AddFoodModal = ({ 
  searchTerm, 
  setSearchTerm, 
  filteredFoods, 
  selectedFood, 
  setSelectedFood, 
  quantity, 
  setQuantity, 
  onAddFood, 
  onClose 
}) => {
  const handleAddFood = () => {
    if (selectedFood && quantity > 0) {
      onAddFood(selectedFood, quantity)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">Add Food</h3>
            <Button variant="secondary" size="small" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          <Input
            label="Search foods"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for foods..."
          />
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          {searchTerm ? (
            <div className="space-y-2">
              {filteredFoods.slice(0, 10).map((food) => (
                <button
                  key={food.id}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    selectedFood?.id === food.id 
                      ? 'border-primary-teal bg-primary-teal/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{food.name}</div>
                  <div className="text-sm text-gray-600">
                    {food.category} • {food.calories} cal per {food.serving}
                  </div>
                  <div className="text-xs text-gray-500">
                    P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Start typing to search for foods
            </div>
          )}
        </div>

        {selectedFood && (
          <div className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Selected Food</h4>
                <p className="text-sm text-gray-600">{selectedFood.name}</p>
                <p className="text-xs text-gray-500">{selectedFood.category}</p>
              </div>
              <div>
                <NumberInput
                  label="Quantity (g)"
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={1000}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <div className="text-sm font-medium text-gray-700 mb-1">Nutrition (for {quantity}g):</div>
              <div className="grid grid-cols-4 gap-2 text-xs text-gray-600">
                <span>Calories: {Math.round(selectedFood.calories * quantity / 100)}</span>
                <span>Protein: {Math.round(selectedFood.protein * quantity / 100 * 10) / 10}g</span>
                <span>Carbs: {Math.round(selectedFood.carbs * quantity / 100 * 10) / 10}g</span>
                <span>Fat: {Math.round(selectedFood.fat * quantity / 100 * 10) / 10}g</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddFood} className="flex-1">
                Add Food
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 