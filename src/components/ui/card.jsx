import React from 'react'

export const Card = ({ children, className = '', variant = 'default', hover = false, ...props }) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg border-0',
    outlined: 'bg-white border-2 border-gray-300',
    filled: 'bg-gray-50 border border-gray-200'
  }
  
  const baseClasses = `
    rounded-xl transition-all duration-200 ease-in-out
    ${variants[variant]}
    ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
  `
  
  return (
    <div className={`${baseClasses} ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '', size = 'default', ...props }) => {
  const sizes = {
    small: 'text-lg',
    default: 'text-xl',
    large: 'text-2xl'
  }
  
  return (
    <h3 className={`${sizes[size]} font-semibold text-gray-900 leading-tight ${className}`} {...props}>
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
      {children}
    </p>
  )
}

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`px-6 pb-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const FeatureCard = ({ icon, title, description, className = '', ...props }) => {
  return (
    <Card className={`text-center p-6 ${className}`} hover {...props}>
      <div className="flex flex-col items-center space-y-4">
        <div className="p-3 bg-blue-100 rounded-full">
          {icon}
        </div>
        <CardTitle size="small">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </div>
    </Card>
  )
}

export const MealCard = ({ image, title, calories, prepTime, difficulty, className = '', ...props }) => {
  return (
    <Card className={className} hover {...props}>
      <div className="aspect-w-16 aspect-h-9 rounded-t-xl overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      </div>
      <CardContent className="p-4">
        <CardTitle size="small">{title}</CardTitle>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <span>{calories} cal</span>
          <span>{prepTime} min</span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {difficulty}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export const RecipeCard = ({ image, title, prepTime, difficulty, rating, className = '', ...props }) => {
  return (
    <Card className={className} hover {...props}>
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full p-1">
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle size="small">{title}</CardTitle>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{prepTime} min</span>
            <span>•</span>
            <span>{difficulty}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 