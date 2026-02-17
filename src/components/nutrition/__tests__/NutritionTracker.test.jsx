import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { NutritionTracker } from '../NutritionTracker'

// Mock Chart.js components
jest.mock('react-chartjs-2', () => ({
  Line: ({ data, options, ...props }) => (
    <div data-testid="line-chart" {...props}>
      Chart with {data.datasets?.length || 0} datasets
    </div>
  ),
  Doughnut: ({ data, options, ...props }) => (
    <div data-testid="doughnut-chart" {...props}>
      Chart with {data.datasets?.[0]?.data?.length || 0} data points
    </div>
  )
}))

// Mock food database
jest.mock('../../../data/foodDatabase', () => ({
  foodDatabase: {
    searchFoods: jest.fn(() => [
      {
        id: 'apple-001',
        name: 'Apple',
        category: 'fruits',
        calories_per_100g: 52,
        protein: 0.3,
        carbs: 14,
        fat: 0.2,
        fiber: 2.4,
        sugar: 10.4,
        sodium: 1
      },
      {
        id: 'chicken-001', 
        name: 'Chicken Breast',
        category: 'protein',
        calories_per_100g: 165,
        protein: 31,
        carbs: 0,
        fat: 3.6,
        fiber: 0,
        sugar: 0,
        sodium: 74
      }
    ]),
    getFoodById: jest.fn(),
    addCustomFood: jest.fn()
  }
}))

// Mock persistent state
const mockSetState = jest.fn()
jest.mock('../../../hooks/usePersistentState', () => ({
  usePersistentState: jest.fn((key, defaultValue) => [defaultValue, mockSetState])
}))

const defaultProps = {
  userGoals: {
    calories: 2000,
    protein: 150,
    carbs: 200,
    fat: 67,
    fiber: 25,
    water: 8
  }
}

describe('NutritionTracker', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders nutrition tracker interface', () => {
    render(<NutritionTracker {...defaultProps} />)
    
    expect(screen.getByText('Nutrition Tracker')).toBeInTheDocument()
    expect(screen.getByText('Daily Overview')).toBeInTheDocument()
    expect(screen.getByText('Add Food')).toBeInTheDocument()
    expect(screen.getByText('Recent Entries')).toBeInTheDocument()
  })

  test('displays daily nutrition goals and progress', () => {
    render(<NutritionTracker {...defaultProps} />)
    
    // Check that goals are displayed
    expect(screen.getByText('2,000')).toBeInTheDocument() // Calories
    expect(screen.getByText('150g')).toBeInTheDocument() // Protein
    expect(screen.getByText('200g')).toBeInTheDocument() // Carbs
    expect(screen.getByText('67g')).toBeInTheDocument() // Fat
  })

  test('shows progress charts', () => {
    render(<NutritionTracker {...defaultProps} />)
    
    expect(screen.getByTestId('doughnut-chart')).toBeInTheDocument()
    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
  })

  test('allows food search and selection', async () => {
    const { foodDatabase } = require('../../../data/foodDatabase')
    render(<NutritionTracker {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search foods...')
    fireEvent.change(searchInput, { target: { value: 'apple' } })
    
    await waitFor(() => {
      expect(foodDatabase.searchFoods).toHaveBeenCalledWith('apple')
    })
    
    // Should show search results
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('52 cal/100g')).toBeInTheDocument()
  })

  test('adds food entry with portion size', async () => {
    render(<NutritionTracker {...defaultProps} />)
    
    // Search for food
    const searchInput = screen.getByPlaceholderText('Search foods...')
    fireEvent.change(searchInput, { target: { value: 'apple' } })
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    // Click add button
    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)
    
    // Should show portion input
    const portionInput = screen.getByPlaceholderText('Enter portion size (g)')
    fireEvent.change(portionInput, { target: { value: '150' } })
    
    const confirmButton = screen.getByText('Add to Log')
    fireEvent.click(confirmButton)
    
    // Should show entry in recent entries
    await waitFor(() => {
      expect(screen.getByText('150g Apple')).toBeInTheDocument()
    })
  })

  test('calculates nutrition totals correctly', async () => {
    render(<NutritionTracker {...defaultProps} />)
    
    // Add an apple (150g)
    const searchInput = screen.getByPlaceholderText('Search foods...')
    fireEvent.change(searchInput, { target: { value: 'apple' } })
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)
    
    const portionInput = screen.getByPlaceholderText('Enter portion size (g)')
    fireEvent.change(portionInput, { target: { value: '150' } })
    
    const confirmButton = screen.getByText('Add to Log')
    fireEvent.click(confirmButton)
    
    // Check calculated totals (52 cal/100g * 1.5 = 78 calories)
    await waitFor(() => {
      expect(screen.getByText('78')).toBeInTheDocument() // Total calories
    })
  })

  test('allows editing food entries', async () => {
    render(<NutritionTracker {...defaultProps} />)
    
    // First add an entry
    const searchInput = screen.getByPlaceholderText('Search foods...')
    fireEvent.change(searchInput, { target: { value: 'apple' } })
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)
    
    const portionInput = screen.getByPlaceholderText('Enter portion size (g)')
    fireEvent.change(portionInput, { target: { value: '100' } })
    
    const confirmButton = screen.getByText('Add to Log')
    fireEvent.click(confirmButton)
    
    // Now edit the entry
    await waitFor(() => {
      expect(screen.getByText('100g Apple')).toBeInTheDocument()
    })
    
    const editButton = screen.getByLabelText('Edit entry')
    fireEvent.click(editButton)
    
    // Change portion size
    const editInput = screen.getByDisplayValue('100')
    fireEvent.change(editInput, { target: { value: '200' } })
    
    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)
    
    // Should show updated entry
    await waitFor(() => {
      expect(screen.getByText('200g Apple')).toBeInTheDocument()
    })
  })

  test('allows deleting food entries', async () => {
    render(<NutritionTracker {...defaultProps} />)
    
    // First add an entry
    const searchInput = screen.getByPlaceholderText('Search foods...')
    fireEvent.change(searchInput, { target: { value: 'apple' } })
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)
    
    const portionInput = screen.getByPlaceholderText('Enter portion size (g)')
    fireEvent.change(portionInput, { target: { value: '100' } })
    
    const confirmButton = screen.getByText('Add to Log')
    fireEvent.click(confirmButton)
    
    // Now delete the entry
    await waitFor(() => {
      expect(screen.getByText('100g Apple')).toBeInTheDocument()
    })
    
    const deleteButton = screen.getByLabelText('Delete entry')
    fireEvent.click(deleteButton)
    
    // Should remove entry
    await waitFor(() => {
      expect(screen.queryByText('100g Apple')).not.toBeInTheDocument()
    })
  })

  test('shows progress towards daily goals', () => {
    render(<NutritionTracker {...defaultProps} />)
    
    // Should show progress bars/indicators
    expect(screen.getByText('Calories')).toBeInTheDocument()
    expect(screen.getByText('Protein')).toBeInTheDocument()
    expect(screen.getByText('Carbs')).toBeInTheDocument()
    expect(screen.getByText('Fat')).toBeInTheDocument()
    
    // Should show goal values
    expect(screen.getByText('/ 2,000 kcal')).toBeInTheDocument()
    expect(screen.getByText('/ 150g')).toBeInTheDocument()
  })

  test('filters entries by date', () => {
    render(<NutritionTracker {...defaultProps} />)
    
    const dateInput = screen.getByLabelText('Select date')
    const today = new Date().toISOString().split('T')[0]
    
    fireEvent.change(dateInput, { target: { value: today } })
    
    // Should filter entries for selected date
    expect(dateInput).toHaveValue(today)
  })

  test('handles empty search results', async () => {
    const { foodDatabase } = require('../../../data/foodDatabase')
    foodDatabase.searchFoods.mockReturnValue([])
    
    render(<NutritionTracker {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search foods...')
    fireEvent.change(searchInput, { target: { value: 'nonexistentfood' } })
    
    await waitFor(() => {
      expect(screen.getByText('No foods found')).toBeInTheDocument()
    })
  })

  test('validates portion input', async () => {
    render(<NutritionTracker {...defaultProps} />)
    
    const searchInput = screen.getByPlaceholderText('Search foods...')
    fireEvent.change(searchInput, { target: { value: 'apple' } })
    
    await waitFor(() => {
      expect(screen.getByText('Apple')).toBeInTheDocument()
    })
    
    const addButton = screen.getByText('Add')
    fireEvent.click(addButton)
    
    // Try to add with invalid portion
    const portionInput = screen.getByPlaceholderText('Enter portion size (g)')
    fireEvent.change(portionInput, { target: { value: '0' } })
    
    const confirmButton = screen.getByText('Add to Log')
    fireEvent.click(confirmButton)
    
    // Should show error message
    expect(screen.getByText('Please enter a valid portion size')).toBeInTheDocument()
  })
})