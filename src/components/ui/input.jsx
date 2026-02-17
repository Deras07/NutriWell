import React, { useState, useId, useEffect } from 'react'

export const Input = ({ 
  label,
  type = 'text', 
  error,
  helpText,
  className = '',
  required = false,
  value,
  loading = false,
  success = false,
  onValidate,
  validateOnBlur = true,
  validateOnChange = false,
  ...props 
}) => {
  const [focused, setFocused] = useState(false)
  const [hasValue, setHasValue] = useState(Boolean(value))
  const id = useId()
  
  // Update hasValue when value prop changes
  useEffect(() => {
    setHasValue(Boolean(value))
  }, [value])
  
  const handleFocus = () => setFocused(true)
  const handleBlur = (e) => {
    setFocused(false)
    setHasValue(e.target.value.length > 0)
    
    // Trigger validation on blur if enabled
    if (validateOnBlur && onValidate) {
      onValidate(e.target.value)
    }
    
    // Call original onBlur if provided
    if (props.onBlur) {
      props.onBlur(e)
    }
  }
  
  const handleChange = (e) => {
    // Trigger validation on change if enabled
    if (validateOnChange && onValidate) {
      onValidate(e.target.value)
    }
    
    // Call original onChange if provided
    if (props.onChange) {
      props.onChange(e)
    }
  }
  
  const baseClasses = `
    w-full px-3 py-3 border rounded-lg transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:border-transparent
    disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
    ${error ? 'border-red-500 focus:ring-red-500' : 
      success ? 'border-green-500 focus:ring-green-500' : 
      'border-gray-300 hover:border-gray-400 focus:ring-blue-500'}
  `
  
  const labelClasses = `
    absolute left-3 transition-all duration-200 ease-in-out pointer-events-none
    ${focused || hasValue || type === 'date'
      ? 'top-1 text-xs text-blue-600 font-medium' 
      : 'top-3 text-base text-gray-500'
    }
    ${error ? 'text-red-500' : ''}
  `
  
  const errorId = error ? `${id}-error` : undefined
  const helpTextId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpTextId].filter(Boolean).join(' ')

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClasses}>
          {label} {required && <span className="text-red-500" aria-label="required">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        className={baseClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        aria-required={required}
        {...props}
      />
      
      {/* Validation status icon */}
      {(loading || success || error) && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {loading && (
            <div className="w-5 h-5 animate-spin">
              <svg className="w-full h-full text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
          )}
          {success && !loading && (
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          {error && !loading && (
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      )}
      
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helpText && !error && (
        <p id={helpTextId} className="mt-1 text-sm text-gray-500">{helpText}</p>
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
  error,
  helpText,
  required = false,
  ...props 
}) => {
  const id = useId()
  
  const handleIncrement = () => {
    const newValue = Math.min(Number(value) + step, max)
    onChange?.(newValue)
  }
  
  const handleDecrement = () => {
    const newValue = Math.max(Number(value) - step, min)
    onChange?.(newValue)
  }
  
  const errorId = error ? `${id}-error` : undefined
  const helpTextId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpTextId].filter(Boolean).join(' ')
  
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500" aria-label="required">*</span>}
        </label>
      )}
      <div className={`flex items-center border rounded-lg overflow-hidden ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}>
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Decrease value (minimum: ${min})`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange?.(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="flex-1 p-2 text-center border-0 focus:outline-none focus:ring-0"
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          {...props}
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="p-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Increase value (maximum: ${max})`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helpText && !error && (
        <p id={helpTextId} className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  )
} 