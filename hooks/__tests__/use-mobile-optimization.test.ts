import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMobileOptimization } from '../use-mobile-optimization'

describe('useMobileOptimization Hook', () => {
  it('should return optimization utilities', () => {
    const { result } = renderHook(() => useMobileOptimization())
    
    expect(result.current).toBeDefined()
    expect(result.current).toHaveProperty('isMobile')
    expect(result.current).toHaveProperty('isTablet')
    expect(result.current).toHaveProperty('isReducedMotion')
    expect(result.current).toHaveProperty('isLowEndDevice')
  })

  it('should provide animation settings function', () => {
    const { result } = renderHook(() => useMobileOptimization())
    
    expect(result.current.getAnimationSettings).toBeDefined()
    expect(typeof result.current.getAnimationSettings).toBe('function')
  })

  it('should provide particle count function', () => {
    const { result } = renderHook(() => useMobileOptimization())
    
    expect(result.current.getParticleCount).toBeDefined()
    expect(typeof result.current.getParticleCount).toBe('function')
  })

  it('should return animation settings object', () => {
    const { result } = renderHook(() => useMobileOptimization())
    const settings = result.current.getAnimationSettings()
    
    expect(settings).toBeDefined()
    expect(settings).toHaveProperty('duration')
    expect(settings).toHaveProperty('ease')
  })

  it('should return particle count as number', () => {
    const { result } = renderHook(() => useMobileOptimization())
    const count = result.current.getParticleCount()
    
    expect(typeof count).toBe('number')
    expect(count).toBeGreaterThanOrEqual(0)
  })

  it('should provide touch settings function', () => {
    const { result } = renderHook(() => useMobileOptimization())
    
    expect(result.current.getTouchSettings).toBeDefined()
    expect(typeof result.current.getTouchSettings).toBe('function')
  })

  it('should export useMobileOptimization function', () => {
    expect(useMobileOptimization).toBeDefined()
    expect(typeof useMobileOptimization).toBe('function')
  })
})

