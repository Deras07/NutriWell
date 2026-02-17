import React from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'

const FeatureCard = ({ icon, title, description, onClick }) => (
  <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border-0" onClick={onClick}>
    <CardContent className="p-6 text-center">
      <div className="w-16 h-16 bg-gradient-to-br from-primary-sage/20 to-primary-teal/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform group-hover:bg-gradient-to-br group-hover:from-accent-coral/20 group-hover:to-accent-golden/20">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-text-dark mb-2">{title}</h3>
      <p className="text-text-light text-sm">{description}</p>
    </CardContent>
  </Card>
)

export const HomePage = ({ onNavigate, onShowUpgrade, userPlan }) => {
  return (
    <div>
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-secondary-mint via-secondary-white to-secondary-peach overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-accent-coral/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-16 w-16 h-16 bg-primary-sage/30 rounded-full animate-bounce-gentle"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-accent-golden/25 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary-teal/20 rounded-full animate-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-sage/10 to-accent-coral/10 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left side - Main content */}
            <div className="text-center lg:text-left">
              <div className="animate-slide-up">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-coral/20 to-primary-sage/20 px-4 py-2 rounded-full mb-6">
                  <span className="text-2xl animate-wiggle">🌟</span>
                  <span className="text-primary-teal font-semibold">AI-Powered Nutrition</span>
                </div>
                
                <h1 className="font-heading text-6xl md:text-7xl font-bold text-text-dark mb-6 leading-tight">
                  Transform Your
                  <br />
                  <span className="bg-gradient-to-r from-primary-teal via-accent-coral to-accent-golden bg-clip-text text-transparent animate-gradient bg-[length:400%_400%]">
                    Health Journey
                  </span>
                </h1>
                
                <p className="text-xl text-text-light mb-8 max-w-2xl leading-relaxed">
                  Discover the power of personalized nutrition with our AI-driven platform. 
                  Create custom meal plans, track your progress, and achieve your wellness goals 
                  with scientifically-backed nutrition guidance.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Button 
                  size="large"
                  onClick={() => onNavigate('onboarding')}
                  className="bg-gradient-to-r from-primary-teal to-accent-coral hover:from-accent-coral hover:to-primary-teal text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Your Journey - Free
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => onNavigate('recipes')}
                  className="border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200"
                >
                  Try Recipe Builder
                </Button>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-3 gap-4 mt-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-teal">1000+</div>
                  <div className="text-sm text-text-light">Healthy Recipes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-coral">24/7</div>
                  <div className="text-sm text-text-light">AI Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-golden">95%</div>
                  <div className="text-sm text-text-light">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Right side - Hero visual */}
            <div className="relative animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="relative">
                {/* Main hero image placeholder */}
                <div className="w-full h-96 bg-gradient-to-br from-primary-sage/30 to-accent-coral/30 rounded-3xl flex items-center justify-center shadow-2xl">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4 animate-bounce-gentle">🥗</div>
                    <div className="text-2xl font-bold">Your Nutrition</div>
                    <div className="text-lg">Dashboard Preview</div>
                  </div>
                </div>
                
                {/* Floating cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-4 shadow-lg animate-float">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Calories: On Track</span>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg animate-float" style={{animationDelay: '1s'}}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">7-Day Streak! 🔥</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -right-8 bg-white rounded-xl p-3 shadow-lg animate-pulse-slow">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-secondary-white to-secondary-mint">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-primary-sage/10 px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">🚀</span>
              <span className="text-primary-sage font-medium">Powerful Features</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4">
              Everything You Need for
              <span className="bg-gradient-to-r from-primary-sage to-accent-coral bg-clip-text text-transparent"> Healthy Living</span>
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto">
              Our comprehensive nutrition platform provides all the tools you need to succeed
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-primary-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              }
              title="Personalized Plans"
              description="AI-generated meal plans tailored to your goals, preferences, and lifestyle"
              onClick={() => onNavigate('onboarding')}
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title="Recipe Builder"
              description="Create custom recipes with automatic nutrition calculations and smart ingredient suggestions"
              onClick={() => onNavigate('recipes')}
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-accent-golden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              }
              title="Smart Grocery Lists"
              description="Organized shopping lists with price estimates and store layout optimization"
              onClick={() => onNavigate('grocery')}
            />
            
            <FeatureCard
              icon={
                <svg className="w-8 h-8 text-primary-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4M8 19l8-8M8 19H5a2 2 0 01-2-2v-6a2 2 0 012-2h3m5 8h7a2 2 0 002-2v-6a2 2 0 00-2-2h-7m-5-4v2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                </svg>
              }
              title="Weekly Planning"
              description="Drag-and-drop meal calendar with prep time optimization and family meal coordination"
              onClick={() => onNavigate('meal-planning')}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-primary-sage/5 via-secondary-white to-accent-coral/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-accent-golden/10 px-4 py-2 rounded-full mb-4">
              <span className="text-2xl">💎</span>
              <span className="text-accent-golden font-medium">Pricing Plans</span>
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-text-dark mb-4">
              Choose Your
              <span className="bg-gradient-to-r from-accent-golden to-primary-teal bg-clip-text text-transparent"> Nutrition Journey</span>
            </h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Start free and upgrade as your needs grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <Card className="relative bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader className="text-center">
                <CardTitle>
                  <div className="text-2xl font-bold text-text-dark">Free Starter</div>
                  <div className="text-4xl font-bold text-primary-teal mt-2">$0</div>
                  <div className="text-text-light">Forever free</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4">
                  {[
                    "✨ One personalized meal plan",
                    "🍽️ 5 pre-designed meal templates", 
                    "🛒 Basic grocery list generator",
                    "📱 3 custom recipes per month",
                    "💬 Community forum access"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-text-dark">
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="secondary" 
                  className="w-full py-3 text-lg border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-white transition-all duration-200"
                  onClick={() => onNavigate('onboarding')}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative bg-gradient-to-br from-primary-teal to-accent-coral border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent-golden text-white px-4 py-2 text-sm font-bold">MOST POPULAR</Badge>
              </div>
              <CardHeader className="text-center text-white">
                <CardTitle>
                  <div className="text-2xl font-bold">Premium Pro</div>
                  <div className="text-4xl font-bold mt-2">$29</div>
                  <div className="text-white/90">per month</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-white">
                <div className="text-center mb-4">
                  <span className="text-white/90">Everything in Free, plus:</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "🗓️ Interactive weekly meal calendar",
                    "🤖 AI nutrition optimization",
                    "🛒 Smart shopping with price tracking",
                    "👨‍🍳 Unlimited recipes & meal ideas",
                    "📊 Advanced nutrition analytics",
                    "📱 Mobile app with offline access"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="primary" 
                  className="w-full py-3 text-lg bg-white text-primary-teal hover:bg-white/90 font-bold transition-all duration-200"
                  onClick={() => onShowUpgrade(true)}
                >
                  Start Premium Trial
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-text-light">
              🔒 30-day money-back guarantee • Cancel anytime • No hidden fees
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 