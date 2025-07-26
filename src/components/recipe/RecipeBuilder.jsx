import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input, NumberInput } from '../ui/input'
import { Select } from '../ui/select'
import { Badge } from '../ui/badge'
import { usePersistentForm, DataRecoveryNotification } from '../../hooks/usePersistentState.jsx'
import { AutoSaveStatus, AdvancedSaveStatus } from '../ui/AutoSaveStatus'

// Mock ingredient database (100 basic foods for free version)
const BASIC_INGREDIENTS = [
  // Proteins
  { id: 1, name: 'Chicken Breast', category: 'Protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, unit: '100g' },
  { id: 2, name: 'Salmon Fillet', category: 'Protein', calories: 208, protein: 22, carbs: 0, fat: 12, fiber: 0, unit: '100g' },
  { id: 3, name: 'Ground Beef (Lean)', category: 'Protein', calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, unit: '100g' },
  { id: 4, name: 'Eggs', category: 'Protein', calories: 155, protein: 13, carbs: 1, fat: 11, fiber: 0, unit: '100g' },
  { id: 5, name: 'Greek Yogurt', category: 'Protein', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, unit: '100g' },
  
  // Grains & Carbs
  { id: 6, name: 'Brown Rice', category: 'Grains', calories: 123, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, unit: '100g' },
  { id: 7, name: 'Quinoa', category: 'Grains', calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8, unit: '100g' },
  { id: 8, name: 'Oats', category: 'Grains', calories: 389, protein: 17, carbs: 66, fat: 7, fiber: 11, unit: '100g' },
  { id: 9, name: 'Whole Wheat Bread', category: 'Grains', calories: 247, protein: 13, carbs: 41, fat: 4.2, fiber: 7, unit: '100g' },
  
  // Vegetables
  { id: 10, name: 'Broccoli', category: 'Vegetables', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, unit: '100g' },
  { id: 11, name: 'Spinach', category: 'Vegetables', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, unit: '100g' },
  { id: 12, name: 'Bell Pepper', category: 'Vegetables', calories: 31, protein: 1, carbs: 7, fat: 0.3, fiber: 2.5, unit: '100g' },
  { id: 13, name: 'Carrots', category: 'Vegetables', calories: 41, protein: 0.9, carbs: 10, fat: 0.2, fiber: 2.8, unit: '100g' },
  { id: 14, name: 'Tomatoes', category: 'Vegetables', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, unit: '100g' },
  
  // Fruits
  { id: 15, name: 'Banana', category: 'Fruits', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, unit: '100g' },
  { id: 16, name: 'Apple', category: 'Fruits', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, unit: '100g' },
  { id: 17, name: 'Berries (Mixed)', category: 'Fruits', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, unit: '100g' },
  
  // Fats & Oils
  { id: 18, name: 'Olive Oil', category: 'Fats', calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, unit: '100g' },
  { id: 19, name: 'Avocado', category: 'Fats', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, unit: '100g' },
  { id: 20, name: 'Nuts (Mixed)', category: 'Fats', calories: 607, protein: 20, carbs: 13, fat: 54, fiber: 7, unit: '100g' }
]

export const RecipeBuilder = ({ className = '', userPlan = 'free' }) => {
  // Use persistent form state with auto-save
  const {
    data: recipe,
    updateField: updateRecipe,
    isDirty,
    lastSaved,
    saveError,
    saveNow,
    hasRecoverableData,
    clearSaved
  } = usePersistentForm('recipe-builder', {
    name: '',
    servings: 4,
    ingredients: [],
    instructions: ''
  })
  
  const [currentIngredient, setCurrentIngredient] = useState({
    ingredient: null,
    quantity: 100,
    unit: 'g'
  })
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  const [savedRecipes, setSavedRecipes] = useState([])
  const [showRecovery, setShowRecovery] = useState(hasRecoverableData() && recipe.name === '')
  
  // Free version limit: 3 recipes per month
  const FREE_RECIPE_LIMIT = 3

  const filteredIngredients = BASIC_INGREDIENTS.filter(ingredient =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ingredient.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const addIngredient = () => {
    if (!currentIngredient.ingredient || currentIngredient.quantity <= 0) {return}

    const newIngredient = {
      ...currentIngredient,
      id: Date.now(),
      totalQuantity: currentIngredient.quantity
    }

    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, newIngredient]
    }))

    setCurrentIngredient({
      ingredient: null,
      quantity: 100,
      unit: 'g'
    })
    setSearchTerm('')
  }

  const removeIngredient = (ingredientId) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== ingredientId)
    }))
  }

  const calculateNutrition = () => {
    const totals = recipe.ingredients.reduce((acc, ing) => {
      const multiplier = ing.totalQuantity / 100 // Convert to per 100g basis
      return {
        calories: acc.calories + (ing.ingredient.calories * multiplier),
        protein: acc.protein + (ing.ingredient.protein * multiplier),
        carbs: acc.carbs + (ing.ingredient.carbs * multiplier),
        fat: acc.fat + (ing.ingredient.fat * multiplier),
        fiber: acc.fiber + (ing.ingredient.fiber * multiplier)
      }
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 })

    // Per serving
    return {
      calories: Math.round(totals.calories / recipe.servings),
      protein: Math.round(totals.protein / recipe.servings * 10) / 10,
      carbs: Math.round(totals.carbs / recipe.servings * 10) / 10,
      fat: Math.round(totals.fat / recipe.servings * 10) / 10,
      fiber: Math.round(totals.fiber / recipe.servings * 10) / 10
    }
  }

  const saveRecipe = () => {
    if (userPlan === 'free' && savedRecipes.length >= FREE_RECIPE_LIMIT) {
      setShowUpgradePrompt(true)
      return
    }

    const nutrition = calculateNutrition()
    const newRecipe = {
      ...recipe,
      id: Date.now(),
      nutrition,
      createdAt: new Date().toISOString()
    }

    setSavedRecipes(prev => [...prev, newRecipe])
    
    // Reset form
    setRecipe({
      name: '',
      servings: 4,
      ingredients: [],
      instructions: ''
    })

    alert('Recipe saved successfully!')
  }

  const nutrition = calculateNutrition()

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Recipe Builder & Nutrition Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Create custom recipes and calculate their nutritional value
        </p>
        {userPlan === 'free' && (
          <div className="mt-4">
            <Badge variant="warning" size="large">
              Free Plan: {savedRecipes.length}/{FREE_RECIPE_LIMIT} recipes this month
            </Badge>
          </div>
        )}
      </div>

      {/* Data Recovery Notification */}
      {showRecovery && (
        <DataRecoveryNotification
          hasRecoverableData={true}
          onRecover={() => setShowRecovery(false)}
          onStartFresh={() => {
            clearSaved()
            setShowRecovery(false)
          }}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipe Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Auto-save Status */}
          <AdvancedSaveStatus
            isDirty={isDirty}
            lastSaved={lastSaved}
            saveError={saveError}
            onRetry={saveNow}
            onForceRefresh={() => {
              const dataStr = JSON.stringify(recipe, null, 2)
              const dataBlob = new Blob([dataStr], { type: 'application/json' })
              const url = URL.createObjectURL(dataBlob)
              const link = document.createElement('a')
              link.href = url
              link.download = `recipe-backup-${Date.now()}.json`
              link.click()
            }}
            className="mb-4"
          />
          {/* Recipe Info */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Recipe Name"
                value={recipe.name}
                onChange={(e) => updateRecipe('name', e.target.value)}
                required
              />
              <NumberInput
                label="Number of Servings"
                value={recipe.servings}
                onChange={(value) => updateRecipe('servings', value)}
                min={1}
                max={20}
              />
            </CardContent>
          </Card>

          {/* Add Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Add Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                  <Input
                    label="Search Ingredients"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for ingredients..."
                  />
                  
                  {/* Ingredient Suggestions */}
                  {searchTerm && (
                    <div className="absolute top-full left-0 right-0 z-10 mt-1 max-h-40 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-lg">
                      {filteredIngredients.slice(0, 5).map((ingredient) => (
                        <button
                          key={ingredient.id}
                          onClick={() => {
                            setCurrentIngredient(prev => ({ ...prev, ingredient }))
                            setSearchTerm(ingredient.name)
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-50"
                        >
                          <div className="font-medium">{ingredient.name}</div>
                          <div className="text-sm text-gray-500">{ingredient.category} • {ingredient.calories} cal/100g</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <NumberInput
                  label="Quantity (g)"
                  value={currentIngredient.quantity}
                  onChange={(value) => setCurrentIngredient(prev => ({ ...prev, quantity: value }))}
                  min={1}
                  max={5000}
                />
              </div>
              
              <Button 
                onClick={addIngredient}
                disabled={!currentIngredient.ingredient || currentIngredient.quantity <= 0}
                className="w-full"
              >
                Add Ingredient
              </Button>
            </CardContent>
          </Card>

          {/* Ingredients List */}
          {recipe.ingredients.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recipe Ingredients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipe.ingredients.map((ing) => (
                    <div key={ing.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{ing.ingredient.name}</div>
                        <div className="text-sm text-gray-600">
                          {ing.totalQuantity}g • {Math.round(ing.ingredient.calories * ing.totalQuantity / 100)} cal
                        </div>
                      </div>
                      <Button
                        variant="danger"
                        size="small"
                        onClick={() => removeIngredient(ing.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Recipe */}
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="large"
              onClick={saveRecipe}
              disabled={!recipe.name || recipe.ingredients.length === 0}
            >
              Save Recipe
            </Button>
          </div>
        </div>

        {/* Nutrition Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nutrition Facts</CardTitle>
              <p className="text-sm text-gray-600">Per serving ({recipe.servings} servings)</p>
            </CardHeader>
            <CardContent>
              {recipe.ingredients.length > 0 ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-teal">{nutrition.calories}</div>
                    <div className="text-sm text-gray-600">Calories</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">{nutrition.protein}g</div>
                      <div className="text-xs text-gray-600">Protein</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">{nutrition.carbs}g</div>
                      <div className="text-xs text-gray-600">Carbs</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">{nutrition.fat}g</div>
                      <div className="text-xs text-gray-600">Fat</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-semibold">{nutrition.fiber}g</div>
                      <div className="text-xs text-gray-600">Fiber</div>
                    </div>
                  </div>

                  {/* Simple Pie Chart */}
                  <div className="mt-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Macronutrient Breakdown</div>
                    <div className="flex h-4 rounded-full overflow-hidden">
                      <div 
                        className="bg-red-400"
                        style={{ width: `${(nutrition.protein * 4 / nutrition.calories * 100) || 0}%` }}
                      />
                      <div 
                        className="bg-blue-400"
                        style={{ width: `${(nutrition.carbs * 4 / nutrition.calories * 100) || 0}%` }}
                      />
                      <div 
                        className="bg-yellow-400"
                        style={{ width: `${(nutrition.fat * 9 / nutrition.calories * 100) || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>🔴 Protein</span>
                      <span>🔵 Carbs</span>
                      <span>🟡 Fat</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Add ingredients to see nutrition facts
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upgrade Prompt for Free Users */}
          {userPlan === 'free' && (
            <Card className="border-accent-coral/20 bg-accent-coral/5">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">Unlock More Features</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get access to 500+ ingredients, detailed micronutrients, and unlimited recipes
                </p>
                <Button variant="primary" size="small" className="bg-accent-coral hover:bg-accent-coral/90">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Recipe Limit Reached</h3>
            <p className="text-gray-600 mb-6">
              You've reached your monthly limit of {FREE_RECIPE_LIMIT} recipes. 
              Upgrade to Premium for unlimited recipes and advanced features.
            </p>
            <div className="flex space-x-3">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => setShowUpgradePrompt(false)}
              >
                Upgrade Now
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowUpgradePrompt(false)}
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 