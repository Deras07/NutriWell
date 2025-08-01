import { renderHook, act } from '@testing-library/react'
import { useAppNavigation } from '../useAppNavigation'

describe('useAppNavigation', () => {
  test('should initialize with home page', () => {
    const { result } = renderHook(() => useAppNavigation())
    
    expect(result.current.currentPage).toBe('home')
    expect(result.current.showUpgradeModal).toBe(false)
  })

  test('should initialize with custom initial page', () => {
    const { result } = renderHook(() => useAppNavigation('tracker'))
    
    expect(result.current.currentPage).toBe('tracker')
  })

  test('should handle navigation correctly', () => {
    const { result } = renderHook(() => useAppNavigation())
    
    act(() => {
      result.current.handleNavigation('meal-planning')
    })
    
    expect(result.current.currentPage).toBe('meal-planning')
  })

  test('should close upgrade modal when navigating', () => {
    const { result } = renderHook(() => useAppNavigation())
    
    act(() => {
      result.current.setShowUpgradeModal(true)
    })
    
    expect(result.current.showUpgradeModal).toBe(true)
    
    act(() => {
      result.current.handleNavigation('tracker')
    })
    
    expect(result.current.showUpgradeModal).toBe(false)
    expect(result.current.currentPage).toBe('tracker')
  })

  test('should handle auth action signup', () => {
    const { result } = renderHook(() => useAppNavigation())
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    act(() => {
      result.current.handleAuthAction('signup')
    })
    
    expect(result.current.currentPage).toBe('onboarding')
    expect(consoleSpy).toHaveBeenCalledWith('Auth action:', 'signup')
    
    consoleSpy.mockRestore()
  })

  test('should generate correct navigation structure', () => {
    const { result } = renderHook(() => useAppNavigation())
    
    const navigation = result.current.navigation
    
    expect(navigation).toHaveLength(7)
    expect(navigation[0].label).toBe('Home')
    expect(navigation[0].active).toBe(true) // home is the initial page
    expect(navigation[1].label).toBe('Get Plan')
    expect(navigation[2].label).toBe('Meal Planning')
    expect(navigation[2].dropdown).toHaveLength(3)
  })

  test('should set active state correctly for meal planning dropdown', () => {
    const { result } = renderHook(() => useAppNavigation())
    
    act(() => {
      result.current.handleNavigation('recipes')
    })
    
    const mealPlanningItem = result.current.navigation.find(item => item.label === 'Meal Planning')
    expect(mealPlanningItem.active).toBe(true)
  })
}) 