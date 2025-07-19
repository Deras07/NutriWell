import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/select'

// Pre-designed meal plans for free version
const MEAL_PLANS = {
  'balanced-canadian': {
    name: 'Balanced Canadian',
    description: 'A well-rounded meal plan following Canada\'s Food Guide',
    badges: ['Health Canada Approved', 'Balanced'],
    meals: {
      breakfast: { name: 'Oatmeal with Berries', calories: 320 },
      lunch: { name: 'Grilled Chicken Salad', calories: 450 },
      dinner: { name: 'Salmon with Quinoa', calories: 580 }
    },
    groceryList: {
      'Proteins': [
        { name: 'Chicken breast', quantity: '500g', checked: false },
        { name: 'Salmon fillet', quantity: '300g', checked: false },
        { name: 'Greek yogurt', quantity: '500g', checked: false }
      ],
      'Grains & Starches': [
        { name: 'Rolled oats', quantity: '500g', checked: false },
        { name: 'Quinoa', quantity: '250g', checked: false },
        { name: 'Whole grain bread', quantity: '1 loaf', checked: false }
      ],
      'Fruits & Vegetables': [
        { name: 'Mixed berries', quantity: '250g', checked: false },
        { name: 'Mixed salad greens', quantity: '200g', checked: false },
        { name: 'Cherry tomatoes', quantity: '250g', checked: false },
        { name: 'Cucumber', quantity: '1 large', checked: false },
        { name: 'Broccoli', quantity: '300g', checked: false }
      ],
      'Dairy & Alternatives': [
        { name: 'Milk', quantity: '1L', checked: false },
        { name: 'Feta cheese', quantity: '200g', checked: false }
      ],
      'Pantry Items': [
        { name: 'Olive oil', quantity: '250ml', checked: false },
        { name: 'Honey', quantity: '250g', checked: false },
        { name: 'Balsamic vinegar', quantity: '250ml', checked: false }
      ]
    }
  },
  'heart-healthy': {
    name: 'Heart Healthy',
    description: 'Low sodium, omega-3 rich meals for cardiovascular health',
    badges: ['Low Sodium', 'Heart Healthy', 'Omega-3'],
    meals: {
      breakfast: { name: 'Avocado Toast', calories: 340 },
      lunch: { name: 'Lentil Soup', calories: 380 },
      dinner: { name: 'Baked Cod with Vegetables', calories: 420 }
    },
    groceryList: {
      'Proteins': [
        { name: 'Cod fillet', quantity: '400g', checked: false },
        { name: 'Red lentils', quantity: '500g', checked: false },
        { name: 'Walnuts', quantity: '200g', checked: false }
      ],
      'Grains & Starches': [
        { name: 'Whole grain bread', quantity: '1 loaf', checked: false },
        { name: 'Brown rice', quantity: '500g', checked: false }
      ],
      'Fruits & Vegetables': [
        { name: 'Avocados', quantity: '3 medium', checked: false },
        { name: 'Spinach', quantity: '200g', checked: false },
        { name: 'Carrots', quantity: '500g', checked: false },
        { name: 'Celery', quantity: '1 bunch', checked: false },
        { name: 'Sweet potatoes', quantity: '500g', checked: false }
      ],
      'Pantry Items': [
        { name: 'Extra virgin olive oil', quantity: '250ml', checked: false },
        { name: 'Low sodium vegetable broth', quantity: '1L', checked: false },
        { name: 'Garlic', quantity: '1 bulb', checked: false },
        { name: 'Fresh herbs (parsley, dill)', quantity: '2 packs', checked: false }
      ]
    }
  },
  'mediterranean': {
    name: 'Mediterranean',
    description: 'Traditional Mediterranean diet with fresh ingredients',
    badges: ['Mediterranean', 'Fresh', 'Antioxidants'],
    meals: {
      breakfast: { name: 'Greek Yogurt with Honey', calories: 280 },
      lunch: { name: 'Mediterranean Bowl', calories: 520 },
      dinner: { name: 'Grilled Fish with Vegetables', calories: 480 }
    },
    groceryList: {
      'Proteins': [
        { name: 'White fish (sea bass)', quantity: '400g', checked: false },
        { name: 'Greek yogurt', quantity: '500g', checked: false },
        { name: 'Chickpeas (dried)', quantity: '250g', checked: false }
      ],
      'Grains & Starches': [
        { name: 'Bulgur wheat', quantity: '250g', checked: false },
        { name: 'Whole wheat pita', quantity: '1 pack', checked: false }
      ],
      'Fruits & Vegetables': [
        { name: 'Tomatoes', quantity: '500g', checked: false },
        { name: 'Cucumber', quantity: '2 large', checked: false },
        { name: 'Red onion', quantity: '2 medium', checked: false },
        { name: 'Bell peppers', quantity: '3 mixed', checked: false },
        { name: 'Fresh parsley', quantity: '1 bunch', checked: false },
        { name: 'Lemons', quantity: '4 pieces', checked: false }
      ],
      'Dairy & Alternatives': [
        { name: 'Feta cheese', quantity: '200g', checked: false }
      ],
      'Pantry Items': [
        { name: 'Extra virgin olive oil', quantity: '500ml', checked: false },
        { name: 'Kalamata olives', quantity: '150g', checked: false },
        { name: 'Honey', quantity: '250g', checked: false },
        { name: 'Dried oregano', quantity: '1 jar', checked: false }
      ]
    }
  },
  'vegetarian': {
    name: 'Plant-Based Power',
    description: 'Nutrient-dense vegetarian meals with complete proteins',
    badges: ['Vegetarian', 'High Protein', 'Plant-Based'],
    meals: {
      breakfast: { name: 'Protein Smoothie Bowl', calories: 380 },
      lunch: { name: 'Quinoa Buddha Bowl', calories: 520 },
      dinner: { name: 'Lentil Curry', calories: 450 }
    },
    groceryList: {
      'Proteins': [
        { name: 'Red lentils', quantity: '500g', checked: false },
        { name: 'Quinoa', quantity: '500g', checked: false },
        { name: 'Protein powder (plant-based)', quantity: '1 container', checked: false },
        { name: 'Tahini', quantity: '250g', checked: false }
      ],
      'Grains & Starches': [
        { name: 'Brown rice', quantity: '500g', checked: false },
        { name: 'Chia seeds', quantity: '200g', checked: false }
      ],
      'Fruits & Vegetables': [
        { name: 'Bananas', quantity: '6 pieces', checked: false },
        { name: 'Frozen berries', quantity: '500g', checked: false },
        { name: 'Kale', quantity: '200g', checked: false },
        { name: 'Sweet potato', quantity: '500g', checked: false },
        { name: 'Broccoli', quantity: '300g', checked: false },
        { name: 'Ginger', quantity: '1 piece', checked: false }
      ],
      'Dairy & Alternatives': [
        { name: 'Almond milk', quantity: '1L', checked: false },
        { name: 'Coconut milk (canned)', quantity: '400ml', checked: false }
      ],
      'Pantry Items': [
        { name: 'Coconut oil', quantity: '250ml', checked: false },
        { name: 'Curry powder', quantity: '1 jar', checked: false },
        { name: 'Turmeric', quantity: '1 jar', checked: false },
        { name: 'Maple syrup', quantity: '250ml', checked: false }
      ]
    }
  }
}

export const GroceryListGenerator = ({ className = '', userPlan = 'free' }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [groceryItems, setGroceryItems] = useState({})
  const [showVegetarianOnly, setShowVegetarianOnly] = useState(false)

  const filteredPlans = showVegetarianOnly 
    ? Object.entries(MEAL_PLANS).filter(([key, plan]) => 
        plan.badges.includes('Vegetarian') || plan.badges.includes('Plant-Based')
      )
    : Object.entries(MEAL_PLANS)

  const selectMealPlan = (planKey) => {
    const plan = MEAL_PLANS[planKey]
    setSelectedPlan(planKey)
    setGroceryItems(plan.groceryList)
  }

  const toggleItem = (category, itemIndex) => {
    setGroceryItems(prev => ({
      ...prev,
      [category]: prev[category].map((item, index) => 
        index === itemIndex ? { ...item, checked: !item.checked } : item
      )
    }))
  }

  const getCheckedItemsCount = () => {
    return Object.values(groceryItems).flat().filter(item => item.checked).length
  }

  const getTotalItemsCount = () => {
    return Object.values(groceryItems).flat().length
  }

  const printGroceryList = () => {
    const printWindow = window.open('', '_blank')
    const checkedItems = Object.entries(groceryItems).map(([category, items]) => {
      const uncheckedItems = items.filter(item => !item.checked)
      return uncheckedItems.length > 0 ? [category, uncheckedItems] : null
    }).filter(Boolean)

    const printContent = `
      <html>
        <head>
          <title>Grocery List - ${MEAL_PLANS[selectedPlan]?.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; border-bottom: 2px solid #5F9EA0; }
            h2 { color: #5F9EA0; margin-top: 20px; }
            ul { list-style-type: none; padding: 0; }
            li { padding: 8px 0; border-bottom: 1px solid #eee; }
            .header { margin-bottom: 30px; }
            .category { margin-bottom: 20px; }
            .quantity { color: #666; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Grocery List</h1>
            <p><strong>Meal Plan:</strong> ${MEAL_PLANS[selectedPlan]?.name}</p>
            <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          ${checkedItems.map(([category, items]) => `
            <div class="category">
              <h2>${category}</h2>
              <ul>
                ${items.map(item => `
                  <li>☐ ${item.name} <span class="quantity">(${item.quantity})</span></li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </body>
      </html>
    `
    
    printWindow.document.write(printContent)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Meal Planning & Grocery Lists
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Choose from our pre-designed meal plans and get an organized grocery list
        </p>
        
        {/* Vegetarian Filter */}
        <div className="flex justify-center mb-6">
          <Checkbox
            label="Show vegetarian plans only"
            checked={showVegetarianOnly}
            onChange={(e) => setShowVegetarianOnly(e.target.checked)}
          />
        </div>
      </div>

      {!selectedPlan ? (
        /* Meal Plan Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredPlans.map(([planKey, plan]) => (
            <Card 
              key={planKey} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => selectMealPlan(planKey)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {plan.name}
                  <div className="flex gap-1">
                    {plan.badges.slice(0, 2).map((badge, index) => (
                      <Badge key={index} variant="primary" size="small">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </CardTitle>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Sample Meals:</h4>
                  {Object.entries(plan.meals).map(([mealType, meal]) => (
                    <div key={mealType} className="flex justify-between text-sm">
                      <span className="capitalize font-medium">{mealType}:</span>
                      <span className="text-gray-600">{meal.name} ({meal.calories} cal)</span>
                    </div>
                  ))}
                </div>
                <Button variant="primary" className="w-full mt-4">
                  Select This Plan
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Grocery List Display */
        <div className="space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {MEAL_PLANS[selectedPlan].name} - Grocery List
                  </h2>
                  <p className="text-gray-600">{MEAL_PLANS[selectedPlan].description}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={() => setSelectedPlan(null)}
                  >
                    Change Plan
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={printGroceryList}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print List
                  </Button>
                </div>
              </div>
              
              {/* Progress */}
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Progress: {getCheckedItemsCount()}/{getTotalItemsCount()} items checked
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(getCheckedItemsCount() / getTotalItemsCount()) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grocery Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groceryItems).map(([category, items]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {category}
                    <Badge variant="default" size="small">
                      {items.filter(item => !item.checked).length} items
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {items.map((item, index) => (
                      <div 
                        key={index}
                        className={`flex items-center space-x-3 p-2 rounded ${
                          item.checked ? 'bg-green-50 text-green-800' : 'hover:bg-gray-50'
                        }`}
                      >
                        <Checkbox
                          checked={item.checked}
                          onChange={() => toggleItem(category, index)}
                        />
                        <div className={`flex-1 ${item.checked ? 'line-through' : ''}`}>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upgrade Prompt for Free Users */}
          {userPlan === 'free' && (
            <Card className="border-accent-coral/20 bg-accent-coral/5">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Want More Customization?
                </h3>
                <p className="text-gray-600 mb-4">
                  Upgrade to Premium for custom meal planning, dietary restrictions, 
                  smart shopping lists with price estimates, and recipe substitutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" className="bg-accent-coral hover:bg-accent-coral/90">
                    Upgrade to Premium - $29/month
                  </Button>
                  <Button variant="secondary">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
} 