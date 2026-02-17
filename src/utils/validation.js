import React from 'react'

// Validation utility functions
export const validators = {
  required: (value, fieldName = 'This field') => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`
    }
    return null
  },

  email: (value) => {
    if (!value) {return null}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) ? null : 'Please enter a valid email address'
  },

  minLength: (min) => (value, fieldName = 'This field') => {
    if (!value) {return null}
    return value.length >= min ? null : `${fieldName} must be at least ${min} characters`
  },

  maxLength: (max) => (value, fieldName = 'This field') => {
    if (!value) {return null}
    return value.length <= max ? null : `${fieldName} must be no more than ${max} characters`
  },

  numeric: (value, fieldName = 'This field') => {
    if (!value) {return null}
    const numValue = parseFloat(value)
    return !isNaN(numValue) && isFinite(numValue) ? null : `${fieldName} must be a valid number`
  },

  min: (minVal) => (value, fieldName = 'This field') => {
    if (!value) {return null}
    const numValue = parseFloat(value)
    return numValue >= minVal ? null : `${fieldName} must be at least ${minVal}`
  },

  max: (maxVal) => (value, fieldName = 'This field') => {
    if (!value) {return null}
    const numValue = parseFloat(value)
    return numValue <= maxVal ? null : `${fieldName} must be no more than ${maxVal}`
  },

  range: (min, max) => (value, fieldName = 'This field') => {
    if (!value) {return null}
    const numValue = parseFloat(value)
    if (numValue < min || numValue > max) {
      return `${fieldName} must be between ${min} and ${max}`
    }
    return null
  },

  phone: (value) => {
    if (!value) {return null}
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? null : 'Please enter a valid phone number'
  },

  age: (value) => {
    if (!value) {return null}
    const age = parseInt(value)
    if (isNaN(age) || age < 13 || age > 120) {
      return 'Age must be between 13 and 120 years'
    }
    return null
  },

  weight: (value) => {
    if (!value) {return null}
    const weight = parseFloat(value)
    if (isNaN(weight) || weight < 20 || weight > 500) {
      return 'Weight must be between 20 and 500 kg'
    }
    return null
  },

  height: (value) => {
    if (!value) {return null}
    const height = parseFloat(value)
    if (isNaN(height) || height < 100 || height > 250) {
      return 'Height must be between 100 and 250 cm'
    }
    return null
  },

  calories: (value) => {
    if (!value) {return null}
    const calories = parseInt(value)
    if (isNaN(calories) || calories < 1000 || calories > 5000) {
      return 'Daily calories should be between 1000 and 5000'
    }
    return null
  },

  recipeName: (value) => {
    if (!value || value.trim() === '') {
      return 'Recipe name is required'
    }
    if (value.length < 3) {
      return 'Recipe name must be at least 3 characters'
    }
    if (value.length > 100) {
      return 'Recipe name must be less than 100 characters'
    }
    return null
  },

  ingredients: (value) => {
    if (!value || !Array.isArray(value) || value.length === 0) {
      return 'At least one ingredient is required'
    }
    
    for (let i = 0; i < value.length; i++) {
      const ingredient = value[i]
      if (!ingredient.name || ingredient.name.trim() === '') {
        return `Ingredient ${i + 1} name is required`
      }
      if (!ingredient.quantity || ingredient.quantity <= 0) {
        return `Ingredient ${i + 1} must have a valid quantity`
      }
    }
    return null
  },

  servings: (value) => {
    if (!value) {return null}
    const servings = parseInt(value)
    if (isNaN(servings) || servings < 1 || servings > 20) {
      return 'Servings must be between 1 and 20'
    }
    return null
  },

  cookingTime: (value) => {
    if (!value) {return null}
    const time = parseInt(value)
    if (isNaN(time) || time < 1 || time > 480) { // Max 8 hours
      return 'Cooking time must be between 1 and 480 minutes'
    }
    return null
  }
}

// Combine multiple validators
export const combineValidators = (...validatorFuncs) => (value, fieldName) => {
  for (const validator of validatorFuncs) {
    const error = validator(value, fieldName)
    if (error) {return error}
  }
  return null
}

// Validate an entire form
export const validateForm = (formData, validationRules) => {
  const errors = {}
  let isValid = true

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    const value = formData[fieldName]
    const validator = Array.isArray(rules) ? combineValidators(...rules) : rules
    const error = validator(value, fieldName)
    
    if (error) {
      errors[fieldName] = error
      isValid = false
    }
  }

  return { isValid, errors }
}

// Async validation for checking uniqueness, etc.
export const asyncValidators = {
  checkRecipeNameUnique: async (recipeName, existingRecipes = []) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const exists = existingRecipes.some(recipe => 
      recipe.name.toLowerCase() === recipeName.toLowerCase()
    )
    
    return exists ? 'A recipe with this name already exists' : null
  },

  checkEmailAvailable: async (email, existingEmails = []) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const exists = existingEmails.includes(email.toLowerCase())
    return exists ? 'This email is already registered' : null
  }
}

// Real-time validation hook for React components
export const useFormValidation = (initialData, validationRules) => {
  const [data, setData] = React.useState(initialData)
  const [errors, setErrors] = React.useState({})
  const [touched, setTouched] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName]
    if (!rules) {return null}

    const validator = Array.isArray(rules) ? combineValidators(...rules) : rules
    return validator(value, fieldName)
  }

  const handleChange = (fieldName, value) => {
    setData(prev => ({ ...prev, [fieldName]: value }))
    
    // Validate on change if field has been touched
    if (touched[fieldName]) {
      const error = validateField(fieldName, value)
      setErrors(prev => ({ ...prev, [fieldName]: error }))
    }
  }

  const handleBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
    
    const error = validateField(fieldName, data[fieldName])
    setErrors(prev => ({ ...prev, [fieldName]: error }))
  }

  const validateAll = () => {
    const { isValid, errors: allErrors } = validateForm(data, validationRules)
    setErrors(allErrors)
    setTouched(Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {}))
    return isValid
  }

  const reset = (newData = initialData) => {
    setData(newData)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }

  return {
    data,
    errors,
    touched,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).length === 0 || Object.values(errors).every(error => !error)
  }
}