import React, { useState, useRef, useEffect, useId } from 'react'

export const Select = ({ 
  label,
  options = [],
  value,
  onChange,
  placeholder = "Select an option...",
  error,
  className = '',
  required = false,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === value) || null
  )
  const selectRef = useRef(null)
  const id = useId()
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  const handleSelect = (option) => {
    setSelectedOption(option)
    onChange?.(option.value)
    setIsOpen(false)
  }
  
  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <button
        type="button"
        id={id}
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full px-3 py-3 text-left border rounded-lg transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'}
          ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}
        `}
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
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option, index) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option)}
              className={`
                w-full px-3 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none
                ${selectedOption?.value === option.value ? 'bg-blue-100 text-blue-900' : 'text-gray-900'}
                ${index === 0 ? 'rounded-t-lg' : ''}
                ${index === options.length - 1 ? 'rounded-b-lg' : ''}
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
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
  className = '',
  ...props 
}) => {
  const id = useId()
  
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  )
}

export const Checkbox = ({ 
  label,
  checked,
  onChange,
  className = '',
  ...props 
}) => {
  const id = useId()
  
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        {...props}
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700 cursor-pointer">
        {label}
      </label>
    </div>
  )
} 