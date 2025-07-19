import React, { useState } from 'react'
import { Button } from './button'

export const Wizard = ({ 
  steps, 
  onComplete, 
  onStepChange,
  className = '',
  showStepNumbers = true,
  allowStepSkipping = false
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState(new Set())
  const [stepData, setStepData] = useState({})

  const handleNext = (data = {}) => {
    const newStepData = { ...stepData, [`step${currentStep}`]: data }
    setStepData(newStepData)
    
    const newCompletedSteps = new Set(completedSteps)
    newCompletedSteps.add(currentStep)
    setCompletedSteps(newCompletedSteps)
    
    if (currentStep === steps.length - 1) {
      onComplete?.(newStepData)
    } else {
      const nextStep = currentStep + 1
      setCurrentStep(nextStep)
      onStepChange?.(nextStep, newStepData)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1
      setCurrentStep(prevStep)
      onStepChange?.(prevStep, stepData)
    }
  }

  const handleStepClick = (stepIndex) => {
    if (allowStepSkipping || completedSteps.has(stepIndex) || stepIndex <= currentStep) {
      setCurrentStep(stepIndex)
      onStepChange?.(stepIndex, stepData)
    }
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </span>
          <span className="text-sm font-medium text-primary-teal">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary-teal to-primary-sage h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      {showStepNumbers && (
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(index)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  transition-all duration-200 ease-in-out
                  ${index === currentStep 
                    ? 'bg-primary-teal text-white ring-4 ring-primary-teal/20' 
                    : completedSteps.has(index)
                    ? 'bg-green-500 text-white'
                    : index < currentStep
                    ? 'bg-primary-sage text-white'
                    : 'bg-gray-200 text-gray-500'
                  }
                  ${(allowStepSkipping || completedSteps.has(index) || index <= currentStep) 
                    ? 'cursor-pointer hover:scale-105' 
                    : 'cursor-not-allowed'
                  }
                `}
                disabled={!allowStepSkipping && !completedSteps.has(index) && index > currentStep}
              >
                {completedSteps.has(index) ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </button>
              <span className={`text-xs mt-2 text-center max-w-20 ${
                index === currentStep ? 'text-primary-teal font-medium' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {currentStepData.title}
          </h2>
          {currentStepData.description && (
            <p className="text-gray-600">
              {currentStepData.description}
            </p>
          )}
        </div>
        
        {/* Render current step component */}
        {React.createElement(currentStepData.component, {
          onNext: handleNext,
          onPrevious: handlePrevious,
          data: stepData[`step${currentStep}`] || {},
          isFirstStep: currentStep === 0,
          isLastStep: currentStep === steps.length - 1
        })}
      </div>
    </div>
  )
}

export const StepNavigation = ({ 
  onNext, 
  onPrevious, 
  isFirstStep, 
  isLastStep, 
  nextDisabled = false,
  nextText = "Next",
  previousText = "Previous",
  finalText = "Complete"
}) => {
  return (
    <div className="flex justify-between items-center pt-6 border-t border-gray-200">
      <div>
        {!isFirstStep && (
          <Button 
            variant="secondary" 
            onClick={onPrevious}
            className="flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {previousText}
          </Button>
        )}
      </div>
      
      <Button 
        variant="primary" 
        onClick={onNext}
        disabled={nextDisabled}
        className="flex items-center gap-2"
      >
        {isLastStep ? finalText : nextText}
        {!isLastStep && (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </Button>
    </div>
  )
} 