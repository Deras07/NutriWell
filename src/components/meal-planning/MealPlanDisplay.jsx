import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export const MealPlanDisplay = ({ userData, onGetFullPlan, className = '' }) => {
  // Generate meals based on user preferences
  const generateMealPlan = () => {
    const isVegetarian = userData?.step3?.dietaryPreferences?.includes('vegetarian')
    const isVegan = userData?.step3?.dietaryPreferences?.includes('vegan')
    const isGlutenFree = userData?.step3?.dietaryPreferences?.includes('gluten-free')
    const dailyCalories = userData?.dailyCalories || 2000
    
    const meals = {
      breakfast: isVegan ? {
        name: "Overnight Oats with Berries",
        description: "Steel-cut oats soaked with almond milk, topped with fresh blueberries, chia seeds, and maple syrup",
        calories: Math.round(dailyCalories * 0.25),
        image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
        nutrients: {
          protein: "12g",
          carbs: "45g", 
          fat: "8g",
          fiber: "10g"
        },
        badges: ["Vegan", "High Fiber", "Antioxidants"]
      } : isVegetarian ? {
        name: "Greek Yogurt Parfait",
        description: "Creamy Greek yogurt layered with granola, honey, and seasonal berries",
        calories: Math.round(dailyCalories * 0.25),
        image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
        nutrients: {
          protein: "20g",
          carbs: "35g",
          fat: "6g",
          fiber: "5g"
        },
        badges: ["Vegetarian", "High Protein", "Probiotics"]
      } : {
        name: "Avocado Toast with Eggs",
        description: "Whole grain sourdough topped with smashed avocado, two poached eggs, and everything seasoning",
        calories: Math.round(dailyCalories * 0.25),
        image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=300&fit=crop",
        nutrients: {
          protein: "18g",
          carbs: "32g",
          fat: "16g",
          fiber: "12g"
        },
        badges: ["High Protein", "Healthy Fats", "Whole Grains"]
      },
      
      lunch: isVegan ? {
        name: "Buddha Bowl with Tahini",
        description: "Quinoa base with roasted vegetables, chickpeas, avocado, and creamy tahini dressing",
        calories: Math.round(dailyCalories * 0.35),
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
        nutrients: {
          protein: "16g",
          carbs: "52g",
          fat: "14g",
          fiber: "15g"
        },
        badges: ["Vegan", "Complete Protein", "Superfood"]
      } : isVegetarian ? {
        name: "Mediterranean Wrap",
        description: "Whole wheat tortilla filled with hummus, feta, cucumber, tomatoes, and fresh herbs",
        calories: Math.round(dailyCalories * 0.35),
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
        nutrients: {
          protein: "14g",
          carbs: "48g",
          fat: "12g",
          fiber: "8g"
        },
        badges: ["Vegetarian", "Mediterranean", "Fresh"]
      } : {
        name: "Grilled Chicken Salad",
        description: "Mixed greens with grilled chicken breast, cherry tomatoes, cucumber, and olive oil vinaigrette",
        calories: Math.round(dailyCalories * 0.35),
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop",
        nutrients: {
          protein: "32g",
          carbs: "18g",
          fat: "14g",
          fiber: "6g"
        },
        badges: ["High Protein", "Low Carb", "Fresh"]
      },
      
      dinner: isVegan ? {
        name: "Lentil Curry with Rice",
        description: "Red lentils simmered in coconut milk with spices, served over brown rice with cilantro",
        calories: Math.round(dailyCalories * 0.4),
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
        nutrients: {
          protein: "18g",
          carbs: "58g",
          fat: "10g",
          fiber: "12g"
        },
        badges: ["Vegan", "Plant Protein", "Anti-inflammatory"]
      } : isVegetarian ? {
        name: "Caprese Stuffed Portobello",
        description: "Large portobello mushroom stuffed with fresh mozzarella, tomatoes, and basil, with quinoa",
        calories: Math.round(dailyCalories * 0.4),
        image: "https://images.unsplash.com/photo-1565895405229-71bec30dfe3e?w=400&h=300&fit=crop",
        nutrients: {
          protein: "22g",
          carbs: "38g",
          fat: "16g",
          fiber: "8g"
        },
        badges: ["Vegetarian", "Fresh", "Italian"]
      } : {
        name: "Baked Salmon with Vegetables",
        description: "Atlantic salmon fillet with roasted sweet potato, broccoli, and herb butter",
        calories: Math.round(dailyCalories * 0.4),
        image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
        nutrients: {
          protein: "35g",
          carbs: "32g",
          fat: "18g",
          fiber: "7g"
        },
        badges: ["Omega-3", "Heart Healthy", "High Protein"]
      }
    }
    
    return meals
  }

  const meals = generateMealPlan()
  const totalCalories = Object.values(meals).reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Personalized Meal Plan
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Based on your preferences, here's your custom one-day nutrition plan
        </p>
        
        {/* Summary Stats */}
        <div className="flex justify-center space-x-8 mb-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-teal">{totalCalories}</div>
            <div className="text-sm text-gray-600">Total Calories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-sage">{userData?.calculatedBMI}</div>
            <div className="text-sm text-gray-600">Your BMI</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-coral">3</div>
            <div className="text-sm text-gray-600">Balanced Meals</div>
          </div>
        </div>
      </div>

      {/* Meal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {Object.entries(meals).map(([mealType, meal]) => (
          <MealCard
            key={mealType}
            mealType={mealType}
            meal={meal}
          />
        ))}
      </div>

      {/* Compliance Badges */}
      <div className="flex justify-center space-x-4 mb-8">
        <Badge variant="success" size="large" className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Health Canada Approved
        </Badge>
        <Badge variant="primary" size="large" className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Nutritionist Reviewed
        </Badge>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-primary-teal/10 to-primary-sage/10 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Want a Complete 7-Day Plan?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Upgrade to get detailed weekly meal plans, shopping lists, recipe instructions, 
          and nutrition tracking for optimal results.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="large"
            onClick={onGetFullPlan}
            className="bg-gradient-to-r from-primary-teal to-primary-sage"
          >
            Get 7-Day Plan - $29/month
          </Button>
          <Button variant="secondary" size="large">
            Download This Plan (Free)
          </Button>
        </div>
      </div>
    </div>
  )
}

const MealCard = ({ mealType, meal }) => {
  const getMealIcon = (type) => {
    switch (type) {
      case 'breakfast':
        return '🌅'
      case 'lunch':
        return '☀️'
      case 'dinner':
        return '🌙'
      default:
        return '🍽️'
    }
  }

  const getMealTime = (type) => {
    switch (type) {
      case 'breakfast':
        return '7:00 - 9:00 AM'
      case 'lunch':
        return '12:00 - 1:00 PM'
      case 'dinner':
        return '6:00 - 8:00 PM'
      default:
        return ''
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img 
          src={meal.image} 
          alt={meal.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
            <span className="text-lg">{getMealIcon(mealType)}</span>
            <span className="font-medium capitalize text-gray-900">{mealType}</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="primary" className="bg-white/90 text-primary-teal">
            {meal.calories} cal
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{meal.name}</h3>
          <p className="text-sm text-gray-500 mb-2">{getMealTime(mealType)}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{meal.description}</p>
        </div>
        
        {/* Nutrition Info */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">{meal.nutrients.protein}</div>
            <div className="text-xs text-gray-500">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">{meal.nutrients.carbs}</div>
            <div className="text-xs text-gray-500">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">{meal.nutrients.fat}</div>
            <div className="text-xs text-gray-500">Fat</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-900">{meal.nutrients.fiber}</div>
            <div className="text-xs text-gray-500">Fiber</div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {meal.badges.map((badge, index) => (
            <Badge 
              key={index} 
              variant="default" 
              size="small"
              className="text-xs"
            >
              {badge}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 