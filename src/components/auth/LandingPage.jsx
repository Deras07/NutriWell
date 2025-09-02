import React from 'react'
import { motion } from 'framer-motion'

export default function LandingPage({ onGetStarted }) {
  const features = [
    {
      icon: '🌱',
      title: 'Personalized Nutrition',
      description: 'AI-powered meal recommendations tailored to your goals and preferences'
    },
    {
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your health journey with detailed analytics and insights'
    },
    {
      icon: '🍽️',
      title: 'Smart Meal Planning',
      description: 'Create balanced meal plans that fit your lifestyle and schedule'
    },
    {
      icon: '💬',
      title: 'AI Health Assistant',
      description: 'Chat with Nuri for personalized health advice and support'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8B4B8] via-[#EED6D3] to-[#E8D5C4]">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-[#E8B4B8]/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center">
                <span className="text-lg">🌱</span>
              </div>
              <span className="ml-3 text-xl font-bold text-[#2C2C2C]">NutriWell</span>
            </div>
            <button
              onClick={onGetStarted}
              className="px-6 py-2 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-medium rounded-lg transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#2C2C2C] mb-6">
              Your Personal
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E8B4B8] to-[#EED6D3]">
                Health Symphony
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your wellness journey with AI-powered nutrition guidance, personalized meal plans, and comprehensive health tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-[#E8B4B8] hover:bg-[#D4A5A9] text-white font-semibold text-lg rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Start Your Journey
              </button>
              <button className="px-8 py-4 border-2 border-[#E8B4B8] text-[#E8B4B8] hover:bg-[#E8B4B8] hover:text-white font-semibold text-lg rounded-xl transition-all duration-200">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with proven nutrition science to deliver personalized wellness solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-[#E8B4B8]/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#E8B4B8] to-[#EED6D3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#2C2C2C] mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl p-12 border border-[#E8B4B8]/20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-6">
              Ready to Transform Your Health?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already transformed their wellness journey with NutriWell's personalized approach to nutrition and health.
            </p>
            <button
              onClick={onGetStarted}
              className="px-10 py-4 bg-gradient-to-r from-[#E8B4B8] to-[#EED6D3] hover:from-[#D4A5A9] hover:to-[#E8C5C2] text-white font-semibold text-lg rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-[#E8B4B8]/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-600">
            © 2024 NutriWell. All rights reserved. | 
            <a href="#" className="text-[#E8B4B8] hover:text-[#D4A5A9] ml-2">Privacy Policy</a> | 
            <a href="#" className="text-[#E8B4B8] hover:text-[#D4A5A9] ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  )
}
