import React, { useState } from 'react'

const FloatingInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange,
  placeholder = '',
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  const hasValue = value && value.toString().length > 0
  const shouldFloat = isFocused || hasValue

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <div className={`relative ${className}`}>
      {/* Input field */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={shouldFloat ? placeholder : ''}
        className={`
          w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 ease-out
          focus:outline-none focus:ring-0
          ${shouldFloat 
            ? 'border-brandStart focus:border-brandEnd pt-6 pb-2' 
            : 'border-gray-300 focus:border-brandStart'
          }
          bg-white text-gray-900 text-base
          hover:border-brandMid
        `}
        {...props}
      />
      
      {/* Floating label */}
      <label
        htmlFor={name}
        className={`
          absolute left-4 transition-all duration-200 ease-out pointer-events-none
          ${shouldFloat
            ? 'top-2 text-xs font-semibold text-brandStart transform scale-95'
            : 'top-1/2 -translate-y-1/2 text-base text-gray-500'
          }
        `}
      >
        {label}
      </label>
      
      {/* Focus indicator */}
      <div 
        className={`
          absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brandStart to-brandEnd
          transition-all duration-200 ease-out
          ${isFocused ? 'w-full' : 'w-0'}
        `}
      />
    </div>
  )
}

export default FloatingInput 