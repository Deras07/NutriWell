import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { ChevronLeft, ChevronRight, Calculator, Target, TrendingUp, Download, Share2, ChevronDown, ChevronUp, BookOpen, Lightbulb, Utensils } from 'lucide-react'

const NutritionWizard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goal: ''
  })
  const [results, setResults] = useState(null)
  const [expandedSections, setExpandedSections] = useState({})

  // Toggle accordion sections
  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Step navigation
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0))

  // Update form data
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    const { age, gender, height, weight } = formData
    const ageNum = parseInt(age)
    const heightNum = parseFloat(height)
    const weightNum = parseFloat(weight)

    if (gender === 'male') {
      return 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
    } else {
      return 10 * weightNum + 6.25 * heightNum - 5 * ageNum - 161
    }
  }

  // Calculate daily calories based on activity level
  const calculateDailyCalories = () => {
    const bmr = calculateBMR()
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    return Math.round(bmr * activityMultipliers[formData.activityLevel])
  }

  // Calculate target calories based on goal
  const calculateTargetCalories = () => {
    const dailyCalories = calculateDailyCalories()
    switch (formData.goal) {
      case 'lose': return Math.round(dailyCalories - 500) // 1 lb/week loss
      case 'maintain': return dailyCalories
      case 'gain': return Math.round(dailyCalories + 500) // 1 lb/week gain
      default: return dailyCalories
    }
  }

  // Calculate macronutrient targets
  const calculateMacros = () => {
    const targetCalories = calculateTargetCalories()
    
    // Standard macro split (can be adjusted based on goals)
    const proteinPercent = formData.goal === 'lose' ? 30 : 25
    const fatPercent = 25
    const carbPercent = 100 - proteinPercent - fatPercent

    const proteinGrams = Math.round((targetCalories * proteinPercent / 100) / 4)
    const fatGrams = Math.round((targetCalories * fatPercent / 100) / 9)
    const carbGrams = Math.round((targetCalories * carbPercent / 100) / 4)

    return {
      protein: { grams: proteinGrams, percent: proteinPercent, calories: proteinGrams * 4 },
      fat: { grams: fatGrams, percent: fatPercent, calories: fatGrams * 9 },
      carbs: { grams: carbGrams, percent: carbPercent, calories: carbGrams * 4 }
    }
  }

  // Process form and calculate results
  const calculateResults = () => {
    const bmr = Math.round(calculateBMR())
    const dailyCalories = calculateDailyCalories()
    const targetCalories = calculateTargetCalories()
    const macros = calculateMacros()

    const resultsData = {
      bmr,
      dailyCalories,
      targetCalories,
      macros,
      personalSummary: generatePersonalSummary(dailyCalories, targetCalories)
    }

    setResults(resultsData)
    nextStep()
  }

  // Generate personalized summary
  const generatePersonalSummary = (daily, target) => {
    const { age, activityLevel, goal } = formData
    const activityText = {
      sedentary: 'sedentary lifestyle',
      light: 'lightly active',
      moderate: 'moderately active', 
      active: 'active lifestyle',
      very_active: 'very active lifestyle'
    }
    
    const goalText = {
      lose: `To lose weight healthily, aim for ~${target} calories daily.`,
      maintain: `To maintain your current weight, aim for ~${target} calories daily.`,
      gain: `To gain weight healthily, aim for ~${target} calories daily.`
    }

    return `At ${age} with a ${activityText[activityLevel]}, you burn approximately ${daily} calories per day. ${goalText[goal]}`
  }

  // Macro Pie Chart Component
  const MacroPieChart = ({ macros }) => {
    const { protein, fat, carbs } = macros
    const total = protein.percent + fat.percent + carbs.percent
    
    const proteinAngle = (protein.percent / total) * 360
    const fatAngle = (fat.percent / total) * 360
    const carbsAngle = (carbs.percent / total) * 360

    return (
      <div className="relative w-48 h-48 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          {/* Protein slice */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="#10B981"
            strokeWidth="20"
            strokeDasharray={`${proteinAngle * 0.628} 251.2`}
            strokeDashoffset="0"
            className="transition-all duration-300 hover:stroke-width-22"
          />
          {/* Fat slice */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="20"
            strokeDasharray={`${fatAngle * 0.628} 251.2`}
            strokeDashoffset={`-${proteinAngle * 0.628}`}
            className="transition-all duration-300 hover:stroke-width-22"
          />
          {/* Carbs slice */}
          <circle
            cx="50" cy="50" r="40"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="20"
            strokeDasharray={`${carbsAngle * 0.628} 251.2`}
            strokeDashoffset={`-${(proteinAngle + fatAngle) * 0.628}`}
            className="transition-all duration-300 hover:stroke-width-22"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700">Macros</div>
            <div className="text-sm text-gray-500">Daily Split</div>
          </div>
        </div>
      </div>
    )
  }

  // Expandable Info Section Component
  const ExpandableSection = ({ id, title, children, icon: Icon }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center">
          <Icon className="w-5 h-5 text-blue-600 mr-3" />
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        {expandedSections[id] ? (
          <ChevronUp className="w-5 h-5 text-gray-600" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-600" />
        )}
      </button>
      {expandedSections[id] && (
        <div className="p-4 bg-white">
          {children}
        </div>
      )}
    </div>
  )

  // Step components
  const steps = [
    // Step 0: Welcome Screen
    <div className="text-center max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Your Personalized Nutrition Guide
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          We'll help you find your personalized nutrition needs — in under 60 seconds.
        </p>
        <p className="text-lg text-gray-500">
          Get your daily calorie needs, macro targets, and personalized recommendations.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <Calculator className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Precise Calculations</h3>
          <p className="text-sm text-gray-600">Science-based formulas for accurate results</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <Target className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Personal Targets</h3>
          <p className="text-sm text-gray-600">Customized to your goals and lifestyle</p>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-2">Easy to Follow</h3>
          <p className="text-sm text-gray-600">Simple, actionable recommendations</p>
        </div>
      </div>

      <Button onClick={nextStep} size="large" className="px-8 py-3">
        Get Started <ChevronRight className="w-5 h-5 ml-2" />
      </Button>
    </div>,

    // Step 1: User Input Form
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Tell Us About Yourself</h2>
        <p className="text-gray-600">We'll use this information to calculate your personalized nutrition needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Input
            label="Age"
            type="number"
            placeholder="25"
            value={formData.age}
            onChange={(e) => updateFormData('age', e.target.value)}
            error=""
            helpText=""
            onValidate={() => {}}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Gender"
            value={formData.gender}
            onChange={(value) => updateFormData('gender', value)}
            placeholder="Select gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]}
            error=""
            helpText=""
          />
        </div>

        <div>
          <Input
            label="Height (cm)"
            type="number"
            placeholder="175"
            value={formData.height}
            onChange={(e) => updateFormData('height', e.target.value)}
            error=""
            helpText=""
            onValidate={() => {}}
            className="w-full"
          />
        </div>

        <div>
          <Input
            label="Weight (kg)"
            type="number"
            placeholder="70"
            value={formData.weight}
            onChange={(e) => updateFormData('weight', e.target.value)}
            error=""
            helpText=""
            onValidate={() => {}}
            className="w-full"
          />
        </div>

        <div className="md:col-span-2">
          <Select
            label="Activity Level"
            value={formData.activityLevel}
            onChange={(value) => updateFormData('activityLevel', value)}
            placeholder="Select your activity level"
            options={[
              { value: 'sedentary', label: 'Sedentary (little/no exercise)' },
              { value: 'light', label: 'Lightly Active (light exercise 1-3 days/week)' },
              { value: 'moderate', label: 'Moderately Active (moderate exercise 3-5 days/week)' },
              { value: 'active', label: 'Active (hard exercise 6-7 days/week)' },
              { value: 'very_active', label: 'Very Active (very hard exercise, physical job)' }
            ]}
            error=""
            helpText=""
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'lose', label: 'Lose Weight', emoji: '📉' },
              { value: 'maintain', label: 'Maintain Weight', emoji: '⚖️' },
              { value: 'gain', label: 'Gain Weight', emoji: '📈' }
            ].map(goal => (
              <button
                key={goal.value}
                onClick={() => updateFormData('goal', goal.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.goal === goal.value 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{goal.emoji}</div>
                <div className="font-medium text-sm">{goal.label}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="tertiary" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <Button 
          onClick={calculateResults}
          disabled={!formData.age || !formData.gender || !formData.height || !formData.weight || !formData.activityLevel || !formData.goal}
        >
          Calculate Results <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>,

    // Step 2: Results Display
    results && (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Personalized Results</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {results.personalSummary}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Numbers */}
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Daily Calorie Target</h3>
                  <p className="text-sm text-blue-600">For your {formData.goal} goal</p>
                </div>
                <div className="text-3xl font-bold text-blue-700">
                  {results.targetCalories}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-green-800">BMR (Base Metabolic Rate)</h3>
                  <p className="text-sm text-green-600">Calories burned at rest</p>
                </div>
                <div className="text-3xl font-bold text-green-700">
                  {results.bmr}
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">Daily Energy Expenditure</h3>
                  <p className="text-sm text-purple-600">Including activity</p>
                </div>
                <div className="text-3xl font-bold text-purple-700">
                  {results.dailyCalories}
                </div>
              </div>
            </Card>
          </div>

          {/* Macro Chart */}
          <div className="bg-white rounded-xl p-6 border">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Macronutrient Targets
            </h3>
            <MacroPieChart macros={results.macros} />
            
            <div className="mt-6 space-y-3">
              {[
                { key: 'protein', label: 'Protein', emoji: '🥩', color: 'text-green-600' },
                { key: 'carbs', label: 'Carbohydrates', emoji: '🍞', color: 'text-blue-600' },
                { key: 'fat', label: 'Fats', emoji: '🥑', color: 'text-yellow-600' }
              ].map(macro => (
                <div key={macro.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-xl mr-3">{macro.emoji}</span>
                    <span className="font-medium">{macro.label}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{results.macros[macro.key].grams}g</div>
                    <div className={`text-sm ${macro.color}`}>
                      {results.macros[macro.key].percent}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button variant="tertiary" onClick={prevStep}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          
          <div className="flex gap-3">
            <Button variant="secondary">
              <Download className="w-4 h-4 mr-2" /> Download Results
            </Button>
            <Button variant="secondary">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Button onClick={nextStep}>
              Learn More <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    ),

    // Step 3: Educational Content & Tips
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Learn More About Nutrition</h2>
        <p className="text-lg text-gray-600">
          Understanding your numbers is just the beginning. Here's everything you need to succeed.
        </p>
      </div>

      {/* Quick Tips Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
          Quick Tips for Success
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: '🥩',
              title: 'Include protein at every meal',
              description: 'Protein helps build muscle and keeps you feeling full longer.'
            },
            {
              icon: '🌿',
              title: 'Aim for fiber with every plate', 
              description: 'Fiber supports digestion and helps regulate blood sugar levels.'
            },
            {
              icon: '💧',
              title: 'Drink more water than you think you need',
              description: 'Proper hydration supports metabolism and can reduce hunger.'
            }
          ].map((tip, index) => (
            <Card key={index} className="p-4 bg-gradient-to-br from-gray-50 to-white">
              <div className="text-2xl mb-2">{tip.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-600">{tip.description}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Expandable Educational Sections */}
      <div className="space-y-4 mb-8">
        <ExpandableSection 
          id="what-numbers-mean" 
          title="What do these numbers mean?"
          icon={Calculator}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">BMR (Basal Metabolic Rate)</h4>
              <p className="text-gray-600">
                This is the number of calories your body burns at rest just to maintain basic functions like breathing, 
                circulation, and cell production. Think of it as your body's minimum energy requirement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Daily Calorie Needs</h4>
              <p className="text-gray-600">
                This includes your BMR plus the calories you burn through daily activities and exercise. 
                It represents your total energy expenditure on a typical day.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Macronutrients</h4>
              <p className="text-gray-600">
                Protein builds and repairs tissues, carbohydrates provide energy for your brain and muscles, 
                and fats support hormone production and nutrient absorption. Each plays a crucial role in your health.
              </p>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection 
          id="build-meals" 
          title="How to build meals that match your targets"
          icon={Utensils}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">The Plate Method</h4>
              <p className="text-gray-600 mb-3">
                Fill half your plate with vegetables, one quarter with lean protein, and one quarter with whole grains or starchy vegetables.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-1">🥬</div>
                  <div className="text-sm font-medium">50% Vegetables</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl mb-1">🍗</div>
                  <div className="text-sm font-medium">25% Protein</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mb-1">🍚</div>
                  <div className="text-sm font-medium">25% Carbs</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Portion Guides</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Protein: Palm-sized portion (3-4 oz)</li>
                <li>• Carbs: Cupped hand portion (1/2 - 1 cup)</li>
                <li>• Fats: Thumb-sized portion (1-2 tbsp)</li>
                <li>• Vegetables: As much as you want!</li>
              </ul>
            </div>
          </div>
        </ExpandableSection>

        <ExpandableSection 
          id="why-numbers-matter" 
          title="Why these numbers matter"
          icon={Target}
        >
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Sustainable Results</h4>
              <p className="text-gray-600">
                Understanding your calorie needs helps you make changes that you can stick with long-term. 
                Extreme restrictions often lead to rebounds and aren't sustainable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Individual Needs</h4>
              <p className="text-gray-600">
                Your age, gender, size, and activity level all influence your nutritional needs. 
                Generic recommendations don't account for your unique circumstances.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Balanced Approach</h4>
              <p className="text-gray-600">
                Focusing on all three macronutrients ensures your body gets what it needs to function optimally 
                while working toward your goals.
              </p>
            </div>
          </div>
        </ExpandableSection>
      </div>

      {/* Educational Articles */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-6 h-6 text-blue-500 mr-2" />
          Recommended Reading
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "What are macronutrients?",
              description: "Learn the basics of protein, carbs, and fats and why your body needs all three.",
              readTime: "3 min read",
              category: "Basics"
            },
            {
              title: "How to balance your meals",
              description: "Simple strategies for creating nutritious, satisfying meals that support your goals.",
              readTime: "5 min read", 
              category: "Meal Planning"
            },
            {
              title: "Adjusting calories over time",
              description: "When and how to modify your calorie intake as your body and goals change.",
              readTime: "4 min read",
              category: "Advanced"
            }
          ].map((article, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {article.category}
                </span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">{article.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{article.description}</p>
              <div className="text-xs text-gray-500">{article.readTime}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="tertiary" onClick={prevStep}>
          <ChevronLeft className="w-4 h-4 mr-2" /> Back to Results
        </Button>
        
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setCurrentStep(0)}>
            Start Over
          </Button>
          <Button variant="secondary">
            <Download className="w-4 h-4 mr-2" /> Save Guide
          </Button>
        </div>
      </div>
    </div>
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8 px-4">
      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-center space-x-2">
          {[0, 1, 2, 3].map(step => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-blue-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
        <div className="text-center mt-2 text-sm text-gray-500">
          Step {currentStep + 1} of 4
        </div>
      </div>

      {/* Current Step Content */}
      <div className="max-w-6xl mx-auto">
        {steps[currentStep]}
      </div>
    </div>
  )
}

export default NutritionWizard 