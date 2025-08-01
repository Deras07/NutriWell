import React, { useState, useRef, useEffect, useId } from 'react'

export const Select = ({ 
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  error,
  helpText,
  className = '',
  required = false,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  )
  const selectRef = useRef(null)
  const optionsRef = useRef([])
  const id = useId()
  const listboxId = `${id}-listbox`
  const errorId = error ? `${id}-error` : undefined
  const helpTextId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpTextId].filter(Boolean).join(' ')
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleSelect = (option, index) => {
    setSelectedOption(option)
    onChange?.(option.value)
    setIsOpen(false)
    setFocusedIndex(-1)
  }
  
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        setIsOpen(true)
        setFocusedIndex(selectedOption ? options.findIndex(opt => opt.value === selectedOption.value) : 0)
      }
      return
    }
    
    switch (e.key) {
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setFocusedIndex(-1)
        selectRef.current?.focus()
        break
      case 'ArrowDown':
        e.preventDefault()
        setFocusedIndex(prev => Math.min(prev + 1, options.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setFocusedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (focusedIndex >= 0 && options[focusedIndex]) {
          handleSelect(options[focusedIndex], focusedIndex)
        }
        break
      case 'Home':
        e.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        e.preventDefault()
        setFocusedIndex(options.length - 1)
        break
    }
  }
  
  // Focus management for keyboard navigation
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex].scrollIntoView({
        block: 'nearest'
      })
    }
  }, [focusedIndex, isOpen])
  
  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label id={`${id}-label`} htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500" aria-label="required">*</span>}
        </label>
      )}
      
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          w-full px-3 py-3 text-left border rounded-lg transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
          ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}
        `}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-controls={isOpen ? listboxId : undefined}
        aria-invalid={!!error}
        aria-describedby={describedBy || undefined}
        aria-required={required}
        {...props}
      >
        <div className="flex items-center justify-between">
          <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg 
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div 
          id={listboxId}
          role="listbox"
          aria-labelledby={label ? `${id}-label` : undefined}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {options.map((option, index) => {
            const isSelected = selectedOption?.value === option.value
            const isFocused = focusedIndex === index
            return (
              <div
                key={option.value}
                ref={el => optionsRef.current[index] = el}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option, index)}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`
                  w-full px-3 py-2 text-left cursor-pointer
                  ${isFocused ? 'bg-blue-50' : ''}
                  ${isSelected ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                  ${index === 0 ? 'rounded-t-lg' : ''}
                  ${index === options.length - 1 ? 'rounded-b-lg' : ''}
                `}
              >
                {option.label}
                {isSelected && (
                  <svg className="inline-block ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            )
          })}
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

export const Radio = ({ 
  label,
  name,
  value,
  checked,
  onChange,
  error,
  helpText,
  required = false,
  className = '',
  ...props 
}) => {
  const id = useId()
  const errorId = error ? `${id}-error` : undefined
  const helpTextId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpTextId].filter(Boolean).join(' ')
  
  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          {...props}
        />
        <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
          {label} {required && <span className="text-red-500" aria-label="required">*</span>}
        </label>
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

export const Checkbox = ({ 
  label,
  checked,
  onChange,
  error,
  helpText,
  required = false,
  className = '',
  ...props 
}) => {
  const id = useId()
  const errorId = error ? `${id}-error` : undefined
  const helpTextId = helpText ? `${id}-help` : undefined
  const describedBy = [errorId, helpTextId].filter(Boolean).join(' ')
  
  return (
    <div className={className}>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          {...props}
        />
        <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
          {label} {required && <span className="text-red-500" aria-label="required">*</span>}
        </label>
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