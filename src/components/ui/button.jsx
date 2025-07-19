import React from 'react'

export const Button = ({ 
  children, 
  className = '', 
  size = 'medium', 
  variant = 'primary', 
  type = 'button',
  loading = false,
  disabled = false,
  ...props 
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    rounded-lg shadow-sm hover:shadow-md active:scale-95
  `
  
  const sizeClasses = {
    small: 'h-8 px-3 text-sm gap-1.5',
    medium: 'h-10 px-4 text-base gap-2',
    large: 'h-12 px-6 text-lg gap-2.5'
  }
  
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-blue-500 to-blue-600 text-white
      hover:from-blue-600 hover:to-blue-700
      focus:ring-blue-500
      shadow-blue-500/25
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500
    `,
    tertiary: `
      bg-transparent text-blue-600 
      hover:bg-blue-50 hover:text-blue-700
      focus:ring-blue-500
    `,
    success: `
      bg-gradient-to-r from-green-500 to-green-600 text-white
      hover:from-green-600 hover:to-green-700
      focus:ring-green-500
      shadow-green-500/25
    `,
    warning: `
      bg-gradient-to-r from-orange-500 to-orange-600 text-white
      hover:from-orange-600 hover:to-orange-700
      focus:ring-orange-500
      shadow-orange-500/25
    `,
    danger: `
      bg-gradient-to-r from-red-500 to-red-600 text-white
      hover:from-red-600 hover:to-red-700
      focus:ring-red-500
      shadow-red-500/25
    `
  }
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
  
  return (
    <button 
      type={type} 
      className={classes} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg 
          className="animate-spin h-4 w-4" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24"
        >
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
} 