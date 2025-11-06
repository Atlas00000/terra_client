import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useIsMobile } from '../use-mobile'

describe('useIsMobile Hook', () => {
  it('should return a boolean', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(typeof result.current).toBe('boolean')
  })

  it('should be defined', () => {
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBeDefined()
  })

  it('should export useIsMobile function', () => {
    expect(useIsMobile).toBeDefined()
    expect(typeof useIsMobile).toBe('function')
  })
})

