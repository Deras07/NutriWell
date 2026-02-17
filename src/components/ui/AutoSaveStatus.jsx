import React from 'react'

/**
 * Auto-save status indicator component
 */
export const AutoSaveStatus = ({ 
  isDirty, 
  lastSaved, 
  saveError, 
  isLoading,
  className = '',
  position = 'bottom-right'
}) => {
  const getStatusInfo = () => {
    if (saveError) {
      return {
        icon: '⚠️',
        text: 'Save failed',
        className: 'text-red-600 bg-red-50 border-red-200'
      }
    }
    
    if (isDirty) {
      return {
        icon: '💾',
        text: 'Saving...',
        className: 'text-orange-600 bg-orange-50 border-orange-200'
      }
    }
    
    if (lastSaved) {
      const timeAgo = getTimeAgo(lastSaved)
      return {
        icon: '✅',
        text: `Saved ${timeAgo}`,
        className: 'text-green-600 bg-green-50 border-green-200'
      }
    }
    
    return null
  }

  const statusInfo = getStatusInfo()
  
  if (!statusInfo || isLoading) return null

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'inline': 'relative'
  }

  return (
    <div 
      className={`
        ${position === 'inline' ? '' : 'fixed'} 
        ${positionClasses[position]}
        z-50 px-3 py-2 rounded-lg border text-sm font-medium
        transition-all duration-200 ease-in-out
        ${statusInfo.className}
        ${className}
      `}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center space-x-2">
        <span className="text-sm">{statusInfo.icon}</span>
        <span>{statusInfo.text}</span>
      </div>
    </div>
  )
}

/**
 * Advanced save status with retry functionality
 */
export const AdvancedSaveStatus = ({ 
  isDirty, 
  lastSaved, 
  saveError, 
  onRetry,
  onForceRefresh,
  className = ''
}) => {
  if (saveError) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-3 ${className}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">
              Save Failed
            </h3>
            <p className="mt-1 text-sm text-red-700">
              Your changes couldn't be saved automatically. This might be due to a network issue.
            </p>
            <div className="mt-3 space-x-3">
              <button
                onClick={onRetry}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Retry Save
              </button>
              <button
                onClick={onForceRefresh}
                className="inline-flex items-center px-3 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
              >
                Download Backup
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isDirty) {
    return (
      <div className={`flex items-center space-x-2 text-orange-600 ${className}`}>
        <div className="animate-spin w-4 h-4">
          <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <span className="text-sm">Auto-saving...</span>
      </div>
    )
  }

  if (lastSaved) {
    return (
      <div className={`flex items-center space-x-2 text-green-600 ${className}`}>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm">
          Saved {getTimeAgo(lastSaved)}
        </span>
      </div>
    )
  }

  return null
}

// Utility function to get human-readable time difference
function getTimeAgo(date) {
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) {
    return 'just now'
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days !== 1 ? 's' : ''} ago`
  }
}