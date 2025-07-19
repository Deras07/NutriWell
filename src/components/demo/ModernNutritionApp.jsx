import React, { useState } from 'react'
import { Header } from '../layout/Header'
import { Footer } from '../layout/Footer'
import { Button } from '../ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, FeatureCard, MealCard, RecipeCard } from '../ui/card'
import { Input, NumberInput } from '../ui/input'
import { Select, Radio, Checkbox } from '../ui/select'
import { Badge, Tag, ProgressBar, Tooltip } from '../ui/badge'

export const ModernNutritionApp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: 25,
    activityLevel: '',
    dietaryPreferences: [],
  })

  const navigation = [
    { label: 'Home', href: '#home', active: true },
    { label: 'Nutrition Plans', href: '#plans' },
    { label: 'Meal Tracker', href: '#tracker' },
    { label: 'Recipes', href: '#recipes' },
    { label: 'Community', href: '#community' },
  ]

  const handleAuthAction = (action) => {
    console.log(`Auth action: ${action}`)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleDietaryChange = (preference, checked) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: checked
        ? [...prev.dietaryPreferences, preference]
        : prev.dietaryPreferences.filter(p => p !== preference)
    }))
  }

  return (
    <div className="min-h-screen bg-secondary-white">
      <Header 
        navigation={navigation}
        onAuthAction={handleAuthAction}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-sage/20 via-secondary-white to-primary-teal/20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-text-dark mb-6">
              Transform Your Health with
              <span className="bg-gradient-to-r from-primary-teal to-accent-coral bg-clip-text text-transparent"> Smart Nutrition</span>
            </h1>
            <p className="text-xl text-text-light max-w-3xl mx-auto mb-8">
              Personalized nutrition guidance designed for busy professionals and students. 
              Evidence-based meal planning that fits your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="large" className="bg-gradient-to-r from-primary-teal to-primary-sage hover:from-primary-sage hover:to-primary-teal">
                Start Your Journey
              </Button>
              <Button variant="secondary" size="large">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-text-dark mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Built for the modern lifestyle with science-backed nutrition guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              }
              title="Personalized Plans"
              description="AI-powered meal plans tailored to your goals, preferences, and lifestyle constraints."
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-primary-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
              title="Quick & Easy"
              description="15-minute meal prep guides and time-saving nutrition strategies for busy schedules."
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Science-Based"
              description="Evidence-backed recommendations from registered nutritionists and dietitians."
            />
          </div>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-text-dark mb-4">
              Get Your Personalized Nutrition Plan
            </h2>
            <p className="text-lg text-text-light">
              Tell us about yourself to receive customized recommendations
            </p>
          </div>

          <Card className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              
              <NumberInput
                label="Age"
                value={formData.age}
                onChange={(value) => handleInputChange('age', value)}
                min={16}
                max={100}
              />
              
              <Select
                label="Activity Level"
                value={formData.activityLevel}
                onChange={(value) => handleInputChange('activityLevel', value)}
                options={[
                  { value: 'sedentary', label: 'Sedentary (Little/no exercise)' },
                  { value: 'light', label: 'Light (Light exercise 1-3 days/week)' },
                  { value: 'moderate', label: 'Moderate (Moderate exercise 3-5 days/week)' },
                  { value: 'active', label: 'Active (Hard exercise 6-7 days/week)' },
                ]}
                required
              />
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-text-dark mb-4">Dietary Preferences</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Mediterranean', 'Low-Carb', 'Dairy-Free'].map((pref) => (
                  <Checkbox
                    key={pref}
                    label={pref}
                    checked={formData.dietaryPreferences.includes(pref)}
                    onChange={(e) => handleDietaryChange(pref, e.target.checked)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="primary" size="large" className="bg-gradient-to-r from-primary-teal to-accent-coral">
                Create My Plan
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Progress Tracking Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark text-center mb-12">
            Track Your Progress
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardHeader>
                <CardTitle size="small">Daily Nutrition Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-light">Calories</span>
                    <Badge variant="success" size="small">On Track</Badge>
                  </div>
                  <ProgressBar value={1680} max={2000} color="green" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-light">Protein</span>
                    <Badge variant="warning" size="small">Need More</Badge>
                  </div>
                  <ProgressBar value={45} max={80} color="yellow" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-light">Water</span>
                    <Badge variant="primary" size="small">Great!</Badge>
                  </div>
                  <ProgressBar value={7} max={8} color="blue" />
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle size="small">Weekly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-sage mb-2">-2.3 lbs</div>
                  <p className="text-text-light mb-4">This week</p>
                  <div className="flex justify-center space-x-2">
                    <Tag>Weight Loss</Tag>
                    <Tag>Energy +15%</Tag>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle size="small">Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">7-Day Streak</span>
                  <Badge variant="premium" size="small">🔥</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hydration Goal</span>
                  <Badge variant="primary" size="small">💧</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recipe Master</span>
                  <Badge variant="success" size="small">👨‍🍳</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Meal Cards Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark text-center mb-12">
            Today's Recommended Meals
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MealCard
              image="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400"
              title="Quinoa Power Bowl"
              calories="450"
              prepTime="15"
              difficulty="Easy"
            />
            
            <MealCard
              image="https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400"
              title="Grilled Salmon & Vegetables"
              calories="380"
              prepTime="25"
              difficulty="Medium"
            />
            
            <MealCard
              image="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400"
              title="Mediterranean Wrap"
              calories="320"
              prepTime="10"
              difficulty="Easy"
            />
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-text-dark text-center mb-12">
            Design System Components
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Buttons */}
            <Card className="p-6">
              <CardTitle size="small" className="mb-4">Buttons</CardTitle>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary" size="small">Primary Small</Button>
                  <Button variant="secondary" size="medium">Secondary</Button>
                  <Button variant="success" size="large">Success Large</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="warning">Warning</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="tertiary">Tertiary</Button>
                </div>
                <Button variant="primary" loading>Loading State</Button>
              </div>
            </Card>

            {/* Badges & Tags */}
            <Card className="p-6">
              <CardTitle size="small" className="mb-4">Badges & Tags</CardTitle>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag>Vegetarian</Tag>
                  <Tag removable onRemove={() => {}}>Gluten-Free</Tag>
                  <Tag>High Protein</Tag>
                </div>
                <div className="flex items-center gap-2">
                  <Tooltip content="This is a helpful tooltip!" position="top">
                    <span className="underline cursor-help">Hover for tooltip</span>
                  </Tooltip>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer
        links={[
          { label: 'About', href: '#about' },
          { label: 'Features', href: '#features' },
          { label: 'Pricing', href: '#pricing' },
          { label: 'Support', href: '#support' },
          { label: 'Blog', href: '#blog' },
          { label: 'Contact', href: '#contact' },
        ]}
        contactInfo={{
          email: 'hello@nutriwell.com',
          phone: '+1 (555) 123-4567',
          address: 'Toronto, ON, Canada'
        }}
        socialLinks={[
          {
            href: '#twitter',
            label: 'Twitter',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            )
          },
          {
            href: '#instagram',
            label: 'Instagram',
            icon: (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.807.875 1.297 2.026 1.297 3.323 0 1.297-.49 2.448-1.297 3.323-.875.807-2.026 1.297-3.323 1.297z"/>
              </svg>
            )
          }
        ]}
      />
    </div>
  )
} 