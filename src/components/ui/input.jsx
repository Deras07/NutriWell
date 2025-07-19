import React, { useState, useId } from 'react'

export const Input = ({ 
  label,
  type = 'text', 
  error,
  helpText,
  className = '',
  required = false,
  ...props 
}) => {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(false)
  const id = useId()
  
  const handleFocus = () => setFocused(true)
  const handleBlur = (e) => {
    setFocused(false)
    setHasValue(e.target.value.length > 0)
  }
  
  const baseClasses = `
    w-full px-3 py-3 border rounded-lg transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400'}
  `
  
  const labelClasses = `
    absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
    ${focused || hasValue 
      ? 'top-1 text-xs text-blue-600 font-medium' 
      : 'top-3 text-base text-gray-500'
    }
    ${error ? 'text-red-500' : ''}
  `
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={baseClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  )
}

export const NumberInput = ({ 
  label,
  value = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className = '',
  ...props 
}) => {
  const handleIncrement = () => {
    const newValue = Math.min(Number(value) + step, max)
    onChange?.(newValue)
  }
  
  const handleDecrement = () => {
    const newValue = Math.max(Number(value) - step, min)
    onChange?.(newValue)
  }
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={handleDecrement}
          className="p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="flex-1 p-2 text-center border-0 focus:outline-none focus:ring-0"
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )
} 