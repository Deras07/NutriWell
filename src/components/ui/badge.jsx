import React from 'react'

export const Badge = ({ children, className = '', variant = 'default', size = 'medium', ...props }) => {
  const baseClasses = 'inline-flex items-center font-medium transition-colors'
  
  const sizeClasses = {
    small: 'px-2 py-0.5 text-xs rounded-md',
    medium: 'px-2.5 py-0.5 text-sm rounded-lg',
    large: 'px-3 py-1 text-base rounded-lg'
  }
  
  const variantClasses = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    premium: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    free: 'bg-gray-100 text-gray-600'
  }
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
  
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

export const Tag = ({ children, className = '', removable = false, onRemove, ...props }) => {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 ${className}`} {...props}>
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  )
}

export const ProgressBar = ({ value = 0, max = 100, className = '', showValue = true, color = 'blue', ...props }) => {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  }
  
  return (
    <div className={`w-full ${className}`} {...props}>
      {showValue && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ease-out ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export const Tooltip = ({ children, content, position = 'top', className = '', ...props }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }
  
  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-l-4 border-r-4 border-t-4 border-t-gray-900',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-l-4 border-r-4 border-b-4 border-b-gray-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-t-4 border-b-4 border-l-4 border-l-gray-900',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-t-4 border-b-4 border-r-4 border-r-gray-900'
  }
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      {...props}
    >
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap ${positionClasses[position]}`}>
          {content}
          <div className={`absolute ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  )
} 