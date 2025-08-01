import React from 'react'

export const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizes = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8', 
    large: 'w-12 h-12'
  }
  
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizes[size]} animate-spin`}>
        <svg className="w-full h-full" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  )
}

export const PageLoadingSkeleton = ({ variant = 'default' }) => {
  const variants = {
    default: 'from-secondary-mint via-secondary-white to-secondary-peach',
    dashboard: 'from-accent-golden/10 via-secondary-white to-primary-sage/10',
    recipes: 'from-secondary-mint via-secondary-white to-secondary-peach',
    nutrition: 'from-primary-teal/10 via-secondary-white to-accent-golden/10'
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${variants[variant]}`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="text-center mb-12">
            <div className="w-24 h-8 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="w-96 h-12 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="w-64 h-6 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          
          {/* Content skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
                <div className="w-32 h-6 bg-gray-200 rounded-lg mx-auto mb-3 animate-pulse" style={{animationDelay: `${i * 0.1 + 0.1}s`}}></div>
                <div className="w-full h-4 bg-gray-200 rounded-lg mb-2 animate-pulse" style={{animationDelay: `${i * 0.1 + 0.2}s`}}></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded-lg mx-auto animate-pulse" style={{animationDelay: `${i * 0.1 + 0.3}s`}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const FormLoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-12 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded w-32 ml-auto"></div>
      </div>
    </div>
  )
}

export const CardLoadingSkeleton = ({ count = 3 }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  )
}

export const InlineLoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center space-x-2 p-4">
      <LoadingSpinner size="small" />
      <span className="text-gray-600 text-sm">{text}</span>
    </div>
  )
}