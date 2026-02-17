import React, { useId } from 'react'

export const Textarea = ({ 
  label,
  error,
  helpText,
  className = '',
  required = false,
  rows = 4,
  resize = true,
  ...props 
}) => {
  const id = useId()
  const errorId = error ? `${id}-error` : undefined
  const helpTextId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpTextId].filter(Boolean).join(' ')
  
  const baseClasses = `
    w-full px-3 py-2 border rounded-lg transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:border-transparent
    disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50
    placeholder:text-gray-400
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 hover:border-gray-400 focus:ring-blue-500'}
    ${!resize ? 'resize-none' : 'resize-y'}
    ${className}
  `
  
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500" aria-label="required">*</span>}
        </label>
      )}
      
      <textarea 
        id={id}
        className={baseClasses}
        rows={rows}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        aria-required={required}
        {...props} 
      />
      
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