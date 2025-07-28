import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FloatingSelect = ({ 
  label, 
  name, 
  value, 
  onChange,
  options = [],
  placeholder = 'Select...',
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false)
  
  const hasValue = value && value.toString().length > 0
  const shouldFloat = isFocused || hasValue

  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  return (
    <div className={`relative isolate ${className}`}>
      {/* Select field */}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full px-4 border-2 rounded-xl transition-all duration-200 ease-out
          focus:outline-none focus:ring-0 appearance-none cursor-pointer
          relative z-10
          ${shouldFloat 
            ? 'border-brandStart focus:border-brandEnd pt-7 pb-3 text-gray-900' 
            : 'border-gray-300 focus:border-brandStart py-4 text-gray-500'
          }
          bg-white text-base
          hover:border-brandMid
        `}
        {...props}
      >
        <option value="" disabled hidden>
          {shouldFloat ? '' : placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {/* Floating label */}
      <label
        htmlFor={name}
        className={`
          absolute left-3 transition-all duration-200 ease-out pointer-events-none z-30
          ${shouldFloat
            ? 'top-2 text-xs font-semibold text-brandStart bg-white px-2 rounded'
            : 'top-1/2 -translate-y-1/2 text-base text-gray-500 bg-transparent px-0'
          }
        `}
      >
        {label}
      </label>
      
      {/* Dropdown arrow */}
      <ChevronDown 
        className={`
          absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none z-20
          transition-colors duration-200
          ${isFocused ? 'text-brandStart' : 'text-gray-400'}
        `}
      />
      
      {/* Focus indicator */}
      <div 
        className={`
          absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brandStart to-brandEnd
          transition-all duration-200 ease-out z-10
          ${isFocused ? 'w-full' : 'w-0'}
        `}
      />
    </div>
  )
}

export default FloatingSelect 