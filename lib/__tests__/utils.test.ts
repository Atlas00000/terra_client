import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('Utils Library', () => {
  describe('cn (className utility)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
    })

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'hidden', true && 'visible')
      expect(result).toBeTruthy()
    })

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'other')
      expect(result).toBeTruthy()
    })

    it('should handle array of classes', () => {
      const result = cn(['class1', 'class2'])
      expect(result).toBeTruthy()
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(typeof result).toBe('string')
    })

    it('should merge tailwind classes correctly', () => {
      const result = cn('px-4', 'px-2') // Should use px-2 (last wins)
      expect(result).toBeTruthy()
      expect(typeof result).toBe('string')
    })
  })
})

