import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { searchFoods, commonFoods, mealCategories, getFoodById } from '../../data/foodDatabase';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const NutritionTracker = ({ userPlan = 'free' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dailyLog, setDailyLog] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customFood, setCustomFood] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    serving: ''
  });
  const [dailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 67
  });
  const [waterIntake, setWaterIntake] = useState(0);
  const [waterGoal] = useState(2000); // 2L in ml

  // Search foods as user types
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = searchFoods(searchQuery, userPlan === 'free' ? 5 : 10);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, userPlan]);

  // Calculate daily totals
  const dailyTotals = dailyLog.reduce((totals, entry) => ({
    calories: totals.calories + entry.calories,
    protein: totals.protein + entry.protein,
    carbs: totals.carbs + entry.carbs,
    fat: totals.fat + entry.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  // Add food to daily log
  const addFood = (food, meal = selectedMeal) => {
    const logEntry = {
      id: Date.now(),
      ...food,
      meal,
      timestamp: new Date().toISOString()
    };
    setDailyLog([...dailyLog, logEntry]);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Add custom food
  const addCustomFood = () => {
    if (!customFood.name || !customFood.calories) return;
    
    const food = {
      name: customFood.name,
      calories: parseFloat(customFood.calories) || 0,
      protein: parseFloat(customFood.protein) || 0,
      carbs: parseFloat(customFood.carbs) || 0,
      fat: parseFloat(customFood.fat) || 0,
      serving: customFood.serving || '1 serving'
    };
    
    addFood(food);
    setCustomFood({ name: '', calories: '', protein: '', carbs: '', fat: '', serving: '' });
    setShowCustomForm(false);
  };

  // Remove food from log
  const removeFood = (id) => {
    setDailyLog(dailyLog.filter(entry => entry.id !== id));
  };

  // Add water
  const addWater = (amount) => {
    setWaterIntake(prev => Math.min(prev + amount, waterGoal * 1.5));
  };

  // Macro distribution chart data
  const macroChartData = {
    labels: ['Carbs', 'Protein', 'Fat'],
    datasets: [{
      data: [dailyTotals.carbs * 4, dailyTotals.protein * 4, dailyTotals.fat * 9],
      backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
      borderWidth: 2,
      borderColor: '#fff'
    }]
  };

  const macroChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label;
            const value = Math.round(context.raw);
            const percentage = Math.round((context.raw / dailyTotals.calories) * 100);
            return `${label}: ${value} cal (${percentage}%)`;
          }
        }
      }
    }
  };

  // Weekly trend chart (mock data for demo)
  const weeklyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Calories',
      data: [1800, 2100, 1950, 2200, 1900, 2300, dailyTotals.calories],
      backgroundColor: '#10B981',
      borderColor: '#059669',
      borderWidth: 2
    }]
  };

  const weeklyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 2500
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nutrition Tracker</h1>
        <div className="flex items-center gap-4">
          <Badge variant={userPlan === 'free' ? 'warning' : 'success'} size="large">
            {userPlan === 'free' ? 'Free Plan' : 'Premium Plan'}
          </Badge>
          {userPlan === 'free' && (
            <p className="text-gray-600">Track basic nutrition with 500 foods database</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Food Logging Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Quick Add */}
          <Card>
            <CardHeader>
              <CardTitle>Add Food</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Meal Selection */}
              <div className="flex gap-2 flex-wrap">
                {mealCategories.map(meal => (
                  <Button
                    key={meal.id}
                    variant={selectedMeal === meal.id ? 'primary' : 'secondary'}
                    size="sm"
                    onClick={() => setSelectedMeal(meal.id)}
                  >
                    {meal.icon} {meal.name}
                  </Button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search foods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {searchResults.map(food => (
                      <div
                        key={food.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        onClick={() => addFood(food)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{food.name}</div>
                            <div className="text-sm text-gray-500">{food.serving}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{food.calories} cal</div>
                            <div className="text-xs text-gray-500">
                              P: {food.protein}g C: {food.carbs}g F: {food.fat}g
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Add Buttons */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Add</h4>
                <div className="flex gap-2 flex-wrap">
                  {commonFoods.slice(0, userPlan === 'free' ? 6 : 8).map(food => (
                    <Button
                      key={food.id}
                      variant="outline"
                      size="sm"
                      onClick={() => addFood(getFoodById(food.id))}
                    >
                      {food.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Custom Food Entry */}
              <div>
                <Button
                  variant="outline"
                  onClick={() => setShowCustomForm(!showCustomForm)}
                >
                  Add Custom Food
                </Button>
                
                {showCustomForm && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Food name"
                        value={customFood.name}
                        onChange={(e) => setCustomFood({...customFood, name: e.target.value})}
                      />
                      <Input
                        placeholder="Serving size"
                        value={customFood.serving}
                        onChange={(e) => setCustomFood({...customFood, serving: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        type="number"
                        placeholder="Calories"
                        value={customFood.calories}
                        onChange={(e) => setCustomFood({...customFood, calories: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Protein (g)"
                        value={customFood.protein}
                        onChange={(e) => setCustomFood({...customFood, protein: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Carbs (g)"
                        value={customFood.carbs}
                        onChange={(e) => setCustomFood({...customFood, carbs: e.target.value})}
                      />
                      <Input
                        type="number"
                        placeholder="Fat (g)"
                        value={customFood.fat}
                        onChange={(e) => setCustomFood({...customFood, fat: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={addCustomFood}>Add Food</Button>
                      <Button variant="outline" onClick={() => setShowCustomForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Daily Log */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Food Log</CardTitle>
            </CardHeader>
            <CardContent>
              {dailyLog.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No foods logged yet today</p>
              ) : (
                <div className="space-y-4">
                  {mealCategories.map(meal => {
                    const mealFoods = dailyLog.filter(entry => entry.meal === meal.id);
                    if (mealFoods.length === 0) return null;
                    
                    const mealTotals = mealFoods.reduce((totals, entry) => ({
                      calories: totals.calories + entry.calories,
                      protein: totals.protein + entry.protein,
                      carbs: totals.carbs + entry.carbs,
                      fat: totals.fat + entry.fat
                    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

                    return (
                      <div key={meal.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="font-medium flex items-center gap-2">
                            {meal.icon} {meal.name}
                          </h4>
                          <div className="text-sm text-gray-600">
                            {Math.round(mealTotals.calories)} cal
                          </div>
                        </div>
                        <div className="space-y-2">
                          {mealFoods.map(entry => (
                            <div key={entry.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                              <div>
                                <div className="font-medium">{entry.name}</div>
                                <div className="text-sm text-gray-500">{entry.serving}</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right text-sm">
                                  <div>{entry.calories} cal</div>
                                  <div className="text-gray-500">
                                    P: {entry.protein}g C: {entry.carbs}g F: {entry.fat}g
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFood(entry.id)}
                                >
                                  ×
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary and Charts Section */}
        <div className="space-y-6">
          {/* Daily Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Calories</span>
                  <span className="font-medium">
                    {Math.round(dailyTotals.calories)} / {dailyGoals.calories}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-teal h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((dailyTotals.calories / dailyGoals.calories) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-sm text-gray-600">Protein</div>
                  <div className="font-medium">{Math.round(dailyTotals.protein)}g</div>
                  <div className="text-xs text-gray-500">/ {dailyGoals.protein}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Carbs</div>
                  <div className="font-medium">{Math.round(dailyTotals.carbs)}g</div>
                  <div className="text-xs text-gray-500">/ {dailyGoals.carbs}g</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Fat</div>
                  <div className="font-medium">{Math.round(dailyTotals.fat)}g</div>
                  <div className="text-xs text-gray-500">/ {dailyGoals.fat}g</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Macro Distribution Chart */}
          {dailyTotals.calories > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Macro Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Pie data={macroChartData} options={macroChartOptions} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Water Intake Tracker */}
          <Card>
            <CardHeader>
              <CardTitle>Water Intake</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Today's Goal</span>
                <span className="font-medium">{waterIntake}ml / {waterGoal}ml</span>
              </div>
              
              {/* Water Bottle Visual */}
              <div className="flex justify-center">
                <div className="relative w-16 h-32 border-2 border-blue-300 rounded-b-lg rounded-t-sm bg-blue-50">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-blue-400 rounded-b-lg transition-all duration-500"
                    style={{ height: `${Math.min((waterIntake / waterGoal) * 100, 100)}%` }}
                  ></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-blue-300 rounded-t"></div>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button size="sm" onClick={() => addWater(250)}>+250ml</Button>
                <Button size="sm" onClick={() => addWater(500)}>+500ml</Button>
                <Button size="sm" onClick={() => addWater(1000)}>+1L</Button>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features Preview */}
          {userPlan === 'free' && (
            <Card className="border-primary-teal border-2">
              <CardHeader>
                <CardTitle className="text-primary-teal">Premium Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>✨ 1000+ food database</div>
                  <div>📊 Weekly trend charts</div>
                  <div>🔬 Micronutrient tracking</div>
                  <div>📈 Advanced analytics</div>
                  <div>📤 Export data</div>
                </div>
                <Button variant="primary" className="w-full">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Weekly Trend Chart (Premium) */}
          {userPlan === 'premium' && (
            <Card>
              <CardHeader>
                <CardTitle>Weekly Calorie Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Bar data={weeklyData} options={weeklyChartOptions} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
