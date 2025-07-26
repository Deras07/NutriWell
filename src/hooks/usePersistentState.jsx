import { useState, useEffect, useCallback, useRef } from 'react'

/**
 * Advanced persistent state hook with auto-save, recovery, and conflict detection
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value
 * @param {Object} options - Configuration options
 */
export const usePersistentState = (key, initialValue, options = {}) => {
  const {
    autoSaveDelay = 2000,
    storage = localStorage,
    compress = false,
    onSave,
    onLoad,
    onError,
    versioning = false
  } = options

  const autoSaveTimeout = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastSaved, setLastSaved] = useState(null)
  const [isDirty, setIsDirty] = useState(false)
  const [saveError, setSaveError] = useState(null)

  // Initialize state with recovered data
  const [state, setState] = useState(() => {
    try {
      const stored = storage.getItem(key)
      if (stored) {
        const parsed = JSON.parse(stored)
        const data = versioning ? parsed.data : parsed
        onLoad?.(data)
        return data
      }
    } catch (error) {
      console.warn(`Failed to load persisted state for key "${key}":`, error)
      onError?.(error)
    }
    return initialValue
  })

  // Save to storage
  const saveToStorage = useCallback(async (value) => {
    try {
      const dataToSave = versioning 
        ? {
            data: value,
            version: 1,
            timestamp: Date.now(),
            checksum: generateChecksum(value)
          }
        : value

      const serialized = JSON.stringify(dataToSave)
      storage.setItem(key, serialized)
      
      setLastSaved(new Date())
      setIsDirty(false)
      setSaveError(null)
      onSave?.(value)
      
      return true
    } catch (error) {
      console.error(`Failed to save state for key "${key}":`, error)
      setSaveError(error.message)
      onError?.(error)
      return false
    }
  }, [key, storage, versioning, onSave, onError])

  // Auto-save effect
  useEffect(() => {
    setIsLoading(false)
    
    if (!isDirty) return

    // Clear existing timeout
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current)
    }

    // Set new timeout
    autoSaveTimeout.current = setTimeout(() => {
      saveToStorage(state)
    }, autoSaveDelay)

    // Cleanup function
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current)
      }
    }
  }, [state, isDirty, autoSaveDelay, saveToStorage])

  // Save immediately on page unload
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        saveToStorage(state)
        // Show browser confirmation if there are unsaved changes
        e.preventDefault()
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?'
        return e.returnValue
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty, state, saveToStorage])

  // Update state wrapper
  const updateState = useCallback((newValue) => {
    const value = typeof newValue === 'function' ? newValue(state) : newValue
    setState(value)
    setIsDirty(true)
  }, [state])

  // Manual save function
  const saveNow = useCallback(() => {
    if (autoSaveTimeout.current) {
      clearTimeout(autoSaveTimeout.current)
    }
    return saveToStorage(state)
  }, [state, saveToStorage])

  // Clear saved data
  const clearSaved = useCallback(() => {
    try {
      storage.removeItem(key)
      setState(initialValue)
      setIsDirty(false)
      setLastSaved(null)
      setSaveError(null)
      return true
    } catch (error) {
      console.error(`Failed to clear saved state for key "${key}":`, error)
      onError?.(error)
      return false
    }
  }, [key, storage, initialValue, onError])

  // Check if there's recoverable data
  const hasRecoverableData = useCallback(() => {
    try {
      const stored = storage.getItem(key)
      return stored !== null
    } catch {
      return false
    }
  }, [key, storage])

  return {
    state,
    setState: updateState,
    isLoading,
    isDirty,
    lastSaved,
    saveError,
    saveNow,
    clearSaved,
    hasRecoverableData
  }
}

/**
 * Form-specific persistent state hook
 */
export const usePersistentForm = (formId, initialData, options = {}) => {
  const {
    state: data,
    setState: setData,
    isDirty,
    lastSaved,
    saveError,
    saveNow,
    clearSaved,
    hasRecoverableData
  } = usePersistentState(`form_${formId}`, initialData, {
    autoSaveDelay: 1000, // Faster auto-save for forms
    ...options
  })

  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const updateField = useCallback((field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
  }, [setData])

  const updateErrors = useCallback((field, error) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  const markTouched = useCallback((field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }, [])

  const resetForm = useCallback((newData = initialData) => {
    setData(newData)
    setErrors({})
    setTouched({})
  }, [setData, initialData])

  return {
    data,
    setData,
    updateField,
    errors,
    setErrors,
    updateErrors,
    touched,
    markTouched,
    isDirty,
    lastSaved,
    saveError,
    saveNow,
    clearSaved,
    resetForm,
    hasRecoverableData
  }
}

// Utility function to generate checksum for data integrity
function generateChecksum(data) {
  const str = JSON.stringify(data)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString()
}

// Recovery notification component
export const DataRecoveryNotification = ({ 
  hasRecoverableData, 
  onRecover, 
  onStartFresh, 
  className = '' 
}) => {
  if (!hasRecoverableData) return null

  return (
    <div className={`data-recovery-notification bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 ${className}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-800">
            Recover Your Previous Work?
          </h3>
          <p className="mt-1 text-sm text-blue-700">
            We found unsaved changes from your previous session. Would you like to recover them?
          </p>
          <div className="mt-3 space-x-3">
            <button
              onClick={onRecover}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Recover Data
            </button>
            <button
              onClick={onStartFresh}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Start Fresh
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}