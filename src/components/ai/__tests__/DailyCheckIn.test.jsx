import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { motion } from 'framer-motion'
import DailyCheckIn from '../DailyCheckIn'
import { MOOD_RESPONSES } from '../../../constants/nuriModes'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => {
      // Remove motion props to avoid React warnings
      const { whileHover, whileTap, initial, animate, exit, transition, ...restProps } = props
      return <div {...restProps}>{children}</div>
    },
    button: ({ children, ...props }) => {
      // Remove motion props to avoid React warnings
      const { whileHover, whileTap, initial, animate, exit, transition, ...restProps } = props
      return <button {...restProps}>{children}</button>
    }
  }
}))

// Mock the mood responses for testing
const mockMoodResponses = {
  energetic: {
    tone: 'excited',
    suggestions: ['Great time for a workout!', 'Try that new recipe you wanted to make'],
    encouragement: "Your energy is contagious! Let's channel it into something amazing."
  },
  happy: {
    tone: 'cheerful',
    suggestions: ['Share your joy with movement', 'Try something new', 'Connect with others'],
    encouragement: "Your positive energy is beautiful! Keep spreading that joy."
  },
  tired: {
    tone: 'gentle',
    suggestions: ['Take it easy today', 'Focus on gentle movement', 'Prioritize rest'],
    encouragement: "It's okay to slow down. Your body knows what it needs."
  }
}

// Helper functions for mood scoring and streak logic
export const calculateMoodScore = (mood) => {
  const moodScores = {
    energetic: 5,
    happy: 4,
    motivated: 4,
    neutral: 3,
    tired: 2,
    stressed: 1,
    anxious: 1
  }
  return moodScores[mood] || 0
}

export const calculateStreakDays = (checkIns) => {
  if (!checkIns || checkIns.length === 0) return 0
  
  let streak = 0
  const today = new Date().toDateString()
  
  for (let i = checkIns.length - 1; i >= 0; i--) {
    const checkInDate = new Date(checkIns[i].timestamp).toDateString()
    if (checkInDate === today || isConsecutiveDay(checkInDate, today)) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

export const isConsecutiveDay = (date1, date2) => {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays === 1
}

export const getMoodResponse = (mood) => {
  return mockMoodResponses[mood] || {
    tone: 'neutral',
    suggestions: ['Take care of yourself today'],
    encouragement: "You're doing great!"
  }
}

// Test suite for helper functions
describe('DailyCheckIn Helper Functions', () => {
  describe('calculateMoodScore', () => {
    test('returns correct score for each mood', () => {
      expect(calculateMoodScore('energetic')).toBe(5)
      expect(calculateMoodScore('happy')).toBe(4)
      expect(calculateMoodScore('tired')).toBe(2)
      expect(calculateMoodScore('stressed')).toBe(1)
    })

    test('returns 0 for unknown mood', () => {
      expect(calculateMoodScore('unknown')).toBe(0)
    })
  })

  describe('calculateStreakDays', () => {
    test('returns 0 for empty check-ins', () => {
      expect(calculateStreakDays([])).toBe(0)
      expect(calculateStreakDays(null)).toBe(0)
    })

    test('returns 1 for today only', () => {
      const checkIns = [
        { timestamp: new Date().toISOString(), mood: 'happy' }
      ]
      expect(calculateStreakDays(checkIns)).toBe(1)
    })

    test('calculates consecutive day streak', () => {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      const checkIns = [
        { timestamp: yesterday.toISOString(), mood: 'happy' },
        { timestamp: new Date().toISOString(), mood: 'energetic' }
      ]
      expect(calculateStreakDays(checkIns)).toBe(2)
    })

    test('breaks streak for non-consecutive days', () => {
      const twoDaysAgo = new Date()
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
      
      const checkIns = [
        { timestamp: twoDaysAgo.toISOString(), mood: 'happy' },
        { timestamp: new Date().toISOString(), mood: 'energetic' }
      ]
      expect(calculateStreakDays(checkIns)).toBe(1)
    })
  })

  describe('getMoodResponse', () => {
    test('returns correct response for known moods', () => {
      const response = getMoodResponse('energetic')
      expect(response.tone).toBe('excited')
      expect(response.suggestions).toContain('Great time for a workout!')
    })

    test('returns default response for unknown mood', () => {
      const response = getMoodResponse('unknown')
      expect(response.tone).toBe('neutral')
      expect(response.suggestions).toContain('Take care of yourself today')
    })
  })
})

// Test suite for DailyCheckIn component
describe('DailyCheckIn Component', () => {
  const defaultProps = {
    onComplete: jest.fn(),
    onSkip: jest.fn(),
    streakDays: 0
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Component Rendering', () => {
    test('renders without crashing', () => {
      render(<DailyCheckIn {...defaultProps} />)
      expect(screen.getByText('Daily Check-in')).toBeInTheDocument()
    })

    test('displays all required elements', () => {
      render(<DailyCheckIn {...defaultProps} />)
      
      // Check for main elements
      expect(screen.getByText('Daily Check-in')).toBeInTheDocument()
      expect(screen.getByText("How are you feeling today?")).toBeInTheDocument()
      
      // Check for mood options
      expect(screen.getByText('Energetic')).toBeInTheDocument()
      expect(screen.getByText('Happy')).toBeInTheDocument()
      expect(screen.getByText('Tired')).toBeInTheDocument()
      expect(screen.getByText('Stressed')).toBeInTheDocument()
    })

    test('displays streak message when streak > 0', () => {
      render(<DailyCheckIn {...defaultProps} streakDays={5} />)
      expect(screen.getByText("Great job! You're on a 5-day streak.")).toBeInTheDocument()
    })

    test('displays default message when streak = 0', () => {
      render(<DailyCheckIn {...defaultProps} />)
      expect(screen.getByText("Let's start your day with a quick check-in.")).toBeInTheDocument()
    })
  })

  describe('User Interaction', () => {
    test('allows mood selection', async () => {
      render(<DailyCheckIn {...defaultProps} />)
      
      const energeticButton = screen.getByText('Energetic').closest('button')
      expect(energeticButton).toBeInTheDocument()
      
      fireEvent.click(energeticButton)
      
      // Should show mood response after mood selection
      await waitFor(() => {
        expect(screen.getByText('Your energy is contagious! Let\'s channel it into something amazing.')).toBeInTheDocument()
      })
    })

    test('handles mood selection and notes submission', async () => {
      const mockOnComplete = jest.fn()
      render(<DailyCheckIn {...defaultProps} onComplete={mockOnComplete} />)
      
      // Select mood
      const happyButton = screen.getByText('Happy').closest('button')
      fireEvent.click(happyButton)
      
      // Add notes
      await waitFor(() => {
        const notesInput = screen.getByPlaceholderText('How are you feeling about your health goals today?')
        fireEvent.change(notesInput, { target: { value: 'Feeling great today!' } })
      })
      
      // Submit
      const submitButton = screen.getByText('Complete Check-in')
      fireEvent.click(submitButton)
      
      expect(mockOnComplete).toHaveBeenCalledWith('happy', 'Feeling great today!')
    })

    test('handles mood selection without notes', async () => {
      const mockOnComplete = jest.fn()
      render(<DailyCheckIn {...defaultProps} onComplete={mockOnComplete} />)
      
      // Select mood
      const tiredButton = screen.getByText('Tired').closest('button')
      fireEvent.click(tiredButton)
      
      // Submit without notes
      const submitButton = screen.getByText('Complete Check-in')
      fireEvent.click(submitButton)
      
      expect(mockOnComplete).toHaveBeenCalledWith('tired', undefined)
    })

    test('handles skip action', () => {
      const mockOnSkip = jest.fn()
      render(<DailyCheckIn {...defaultProps} onSkip={mockOnSkip} />)
      
      const skipButton = screen.getByText('Skip for today')
      fireEvent.click(skipButton)
      
      expect(mockOnSkip).toHaveBeenCalled()
    })
  })

  describe('UI State Changes', () => {
    test('shows mood response after mood selection', async () => {
      render(<DailyCheckIn {...defaultProps} />)
      
      const motivatedButton = screen.getByText('Motivated').closest('button')
      fireEvent.click(motivatedButton)
      
      await waitFor(() => {
        expect(screen.getByText('Your positive energy is beautiful! Keep spreading that joy.')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('How are you feeling about your health goals today?')).toBeInTheDocument()
        expect(screen.getByText('Complete Check-in')).toBeInTheDocument()
      })
    })

    test('highlights selected mood', async () => {
      render(<DailyCheckIn {...defaultProps} />)
      
      const stressedButton = screen.getByText('Stressed').closest('button')
      fireEvent.click(stressedButton)
      
      // The selected button should have different styling
      expect(stressedButton).toHaveClass('border-blue-500')
    })

    test('enables submit button only after mood selection', async () => {
      render(<DailyCheckIn {...defaultProps} />)
      
      // Initially, submit button should not be visible
      expect(screen.queryByText('Complete Check-in')).not.toBeInTheDocument()
      
      // Select mood
      const neutralButton = screen.getByText('Neutral').closest('button')
      fireEvent.click(neutralButton)
      
      // Submit button should now be visible
      await waitFor(() => {
        expect(screen.getByText('Complete Check-in')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    test('handles empty notes submission', async () => {
      const mockOnComplete = jest.fn()
      render(<DailyCheckIn {...defaultProps} onComplete={mockOnComplete} />)
      
      // Select mood
      const anxiousButton = screen.getByText('Anxious').closest('button')
      fireEvent.click(anxiousButton)
      
      // Submit with empty notes
      const submitButton = screen.getByText('Complete Check-in')
      fireEvent.click(submitButton)
      
      expect(mockOnComplete).toHaveBeenCalledWith('anxious', undefined)
    })

    test('handles whitespace-only notes', async () => {
      const mockOnComplete = jest.fn()
      render(<DailyCheckIn {...defaultProps} onComplete={mockOnComplete} />)
      
      // Select mood
      const energeticButton = screen.getByText('Energetic').closest('button')
      fireEvent.click(energeticButton)
      
      // Add whitespace-only notes
      const notesInput = screen.getByPlaceholderText('How are you feeling about your health goals today?')
      fireEvent.change(notesInput, { target: { value: '   ' } })
      
      // Submit
      const submitButton = screen.getByText('Complete Check-in')
      fireEvent.click(submitButton)
      
      expect(mockOnComplete).toHaveBeenCalledWith('energetic', undefined)
    })
  })
})

// Integration test for full app flow
describe('DailyCheckIn Integration', () => {
  test('integrates with NuriAssistant flow', async () => {
    // This would test the full integration with the main app
    // For now, we'll test that the component can be rendered within a provider context
    
    const TestWrapper = ({ children }) => (
      <div className="test-wrapper">
        {children}
      </div>
    )
    
    const mockOnComplete = jest.fn()
    const mockOnSkip = jest.fn()
    
    render(
      <TestWrapper>
        <DailyCheckIn 
          onComplete={mockOnComplete}
          onSkip={mockOnSkip}
          streakDays={3}
        />
      </TestWrapper>
    )
    
    // Verify component renders in integration context
    expect(screen.getByText('Daily Check-in')).toBeInTheDocument()
    expect(screen.getByText("Great job! You're on a 3-day streak.")).toBeInTheDocument()
    
    // Test integration flow
    const happyButton = screen.getByText('Happy').closest('button')
    fireEvent.click(happyButton)
    
    await waitFor(() => {
      const submitButton = screen.getByText('Complete Check-in')
      fireEvent.click(submitButton)
    })
    
    expect(mockOnComplete).toHaveBeenCalledWith('happy', undefined)
  })
})

// Mock setup for external dependencies
jest.mock('../../../constants/nuriModes', () => ({
  MOOD_RESPONSES: {
    energetic: {
      tone: 'excited',
      suggestions: ['Great time for a workout!', 'Try that new recipe you wanted to make'],
      encouragement: "Your energy is contagious! Let's channel it into something amazing."
    },
    happy: {
      tone: 'cheerful',
      suggestions: ['Share your joy with movement', 'Try something new', 'Connect with others'],
      encouragement: "Your positive energy is beautiful! Keep spreading that joy."
    },
    tired: {
      tone: 'gentle',
      suggestions: ['Take it easy today', 'Focus on gentle movement', 'Prioritize rest'],
      encouragement: "It's okay to slow down. Your body knows what it needs."
    }
  }
})) 