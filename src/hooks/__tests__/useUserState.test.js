import { renderHook, act } from '@testing-library/react'
import { useUserState } from '../useUserState'

describe('useUserState', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useUserState())
    
    expect(result.current.userPlan).toBe('free')
    expect(result.current.onboardingData).toBe(null)
  })

  test('should handle onboarding completion', () => {
    const { result } = renderHook(() => useUserState())
    const mockData = { age: 25, goals: 'weight_loss' }
    
    act(() => {
      result.current.handleOnboardingComplete(mockData)
    })
    
    expect(result.current.onboardingData).toEqual(mockData)
  })

  test('should handle get full plan', () => {
    const { result } = renderHook(() => useUserState())
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    
    act(() => {
      result.current.handleGetFullPlan()
    })
    
    expect(consoleSpy).toHaveBeenCalledWith('Getting full plan...')
    consoleSpy.mockRestore()
  })

  test('should upgrade user plan', () => {
    const { result } = renderHook(() => useUserState())
    
    act(() => {
      result.current.upgradeUser()
    })
    
    expect(result.current.userPlan).toBe('premium')
  })

  test('should downgrade user plan', () => {
    const { result } = renderHook(() => useUserState())
    
    // First upgrade to premium
    act(() => {
      result.current.upgradeUser()
    })
    
    expect(result.current.userPlan).toBe('premium')
    
    // Then downgrade
    act(() => {
      result.current.downgradeUser()
    })
    
    expect(result.current.userPlan).toBe('free')
  })

  test('should set user plan directly', () => {
    const { result } = renderHook(() => useUserState())
    
    act(() => {
      result.current.setUserPlan('premium')
    })
    
    expect(result.current.userPlan).toBe('premium')
  })
}) 