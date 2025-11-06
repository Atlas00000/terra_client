import { describe, it, expect, vi } from 'vitest'
import {
  safeArrayAccess,
  isDefined,
  isNonEmptyArray,
  clamp,
  safeJsonParse,
  objectKeys,
  debounce,
  throttle,
  generateId,
  formatFileSize,
  sleep,
  tryCatch,
} from '../types'

describe('Type Utilities', () => {
  describe('safeArrayAccess', () => {
    it('should return element at valid index', () => {
      const arr = ['a', 'b', 'c']
      expect(safeArrayAccess(arr, 0)).toBe('a')
      expect(safeArrayAccess(arr, 1)).toBe('b')
      expect(safeArrayAccess(arr, 2)).toBe('c')
    })

    it('should return undefined for invalid index', () => {
      const arr = ['a', 'b', 'c']
      expect(safeArrayAccess(arr, -1)).toBeUndefined()
      expect(safeArrayAccess(arr, 3)).toBeUndefined()
      expect(safeArrayAccess(arr, 100)).toBeUndefined()
    })

    it('should return undefined for undefined array', () => {
      expect(safeArrayAccess(undefined, 0)).toBeUndefined()
    })
  })

  describe('isDefined', () => {
    it('should return true for defined values', () => {
      expect(isDefined('string')).toBe(true)
      expect(isDefined(0)).toBe(true)
      expect(isDefined(false)).toBe(true)
      expect(isDefined([])).toBe(true)
      expect(isDefined({})).toBe(true)
    })

    it('should return false for undefined or null', () => {
      expect(isDefined(undefined)).toBe(false)
      expect(isDefined(null)).toBe(false)
    })
  })

  describe('isNonEmptyArray', () => {
    it('should return true for non-empty arrays', () => {
      expect(isNonEmptyArray([1])).toBe(true)
      expect(isNonEmptyArray([1, 2, 3])).toBe(true)
      expect(isNonEmptyArray(['a'])).toBe(true)
    })

    it('should return false for empty arrays', () => {
      expect(isNonEmptyArray([])).toBe(false)
    })

    it('should return false for non-arrays', () => {
      expect(isNonEmptyArray(undefined)).toBe(false)
      expect(isNonEmptyArray(null)).toBe(false)
    })
  })

  describe('clamp', () => {
    it('should clamp value between min and max', () => {
      expect(clamp(5, 0, 10)).toBe(5)
      expect(clamp(-5, 0, 10)).toBe(0)
      expect(clamp(15, 0, 10)).toBe(10)
    })

    it('should handle edge cases', () => {
      expect(clamp(0, 0, 10)).toBe(0)
      expect(clamp(10, 0, 10)).toBe(10)
    })
  })

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"key": "value"}', {})
      expect(result).toEqual({ key: 'value' })
    })

    it('should return fallback for invalid JSON', () => {
      const fallback = { default: true }
      const result = safeJsonParse('invalid json', fallback)
      expect(result).toEqual(fallback)
    })

    it('should handle arrays', () => {
      const result = safeJsonParse('[1, 2, 3]', [])
      expect(result).toEqual([1, 2, 3])
    })
  })

  describe('objectKeys', () => {
    it('should return typed keys', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const keys = objectKeys(obj)
      expect(keys).toEqual(['a', 'b', 'c'])
    })

    it('should work with empty objects', () => {
      const keys = objectKeys({})
      expect(keys).toEqual([])
    })
  })

  describe('debounce', () => {
    it('should debounce function calls', async () => {
      const fn = vi.fn()
      const debounced = debounce(fn, 100)

      debounced()
      debounced()
      debounced()

      expect(fn).not.toHaveBeenCalled()

      await sleep(150)
      expect(fn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    it('should throttle function calls', async () => {
      const fn = vi.fn()
      const throttled = throttle(fn, 100)

      throttled()
      throttled()
      throttled()

      expect(fn).toHaveBeenCalledTimes(1)

      await sleep(150)
      throttled()
      expect(fn).toHaveBeenCalledTimes(2)
    })
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      
      expect(id1).toBeTruthy()
      expect(id2).toBeTruthy()
      expect(id1).not.toBe(id2)
    })

    it('should generate string IDs', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
      expect(id.length).toBeGreaterThan(0)
    })
  })

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
    })

    it('should handle decimal places', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(2560)).toBe('2.5 KB')
    })
  })

  describe('sleep', () => {
    it('should delay execution', async () => {
      const start = Date.now()
      await sleep(100)
      const end = Date.now()
      
      expect(end - start).toBeGreaterThanOrEqual(95) // Allow some margin
    })
  })

  describe('tryCatch', () => {
    it('should return success for resolved promises', async () => {
      const promise = Promise.resolve('data')
      const result = await tryCatch(promise)
      
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toBe('data')
      }
    })

    it('should return error for rejected promises', async () => {
      const error = new Error('test error')
      const promise = Promise.reject(error)
      const result = await tryCatch(promise)
      
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBe(error)
      }
    })
  })
})

