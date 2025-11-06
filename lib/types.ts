import type { Easing } from "framer-motion"

// Re-export Easing type for convenience
export type { Easing }

/**
 * Framer Motion Easing Constants
 * Use these instead of string literals for type safety
 */
export const easeOut: Easing = "easeOut"
export const easeIn: Easing = "easeIn"
export const easeInOut: Easing = "easeInOut"
export const linear: Easing = "linear"
export const circIn: Easing = "circIn"
export const circOut: Easing = "circOut"
export const circInOut: Easing = "circInOut"
export const backIn: Easing = "backIn"
export const backOut: Easing = "backOut"
export const backInOut: Easing = "backInOut"
export const anticipate: Easing = "anticipate"

/**
 * Safely access array element with optional chaining
 * Returns undefined if array is undefined or index is out of bounds
 * 
 * @example
 * ```ts
 * const slides = [...];
 * const currentSlide = safeArrayAccess(slides, currentIndex);
 * if (!currentSlide) return null;
 * ```
 */
export function safeArrayAccess<T>(
  array: T[] | undefined,
  index: number
): T | undefined {
  if (!array || index < 0 || index >= array.length) {
    return undefined
  }
  return array[index]
}

/**
 * Type guard to check if a value is defined (not null or undefined)
 * 
 * @example
 * ```ts
 * const value: string | undefined = getValue();
 * if (isDefined(value)) {
 *   // value is string here
 *   console.log(value.toUpperCase());
 * }
 * ```
 */
export function isDefined<T>(value: T | undefined | null): value is T {
  return value !== undefined && value !== null
}

/**
 * Type guard to check if an array is not empty
 * 
 * @example
 * ```ts
 * const items: string[] | undefined = getItems();
 * if (isNonEmptyArray(items)) {
 *   // items is string[] and has length > 0
 *   const first = items[0];
 * }
 * ```
 */
export function isNonEmptyArray<T>(
  array: T[] | undefined | null
): array is [T, ...T[]] {
  return Array.isArray(array) && array.length > 0
}

/**
 * Clamp a number between min and max values
 * 
 * @example
 * ```ts
 * const scrollY = clamp(value, 0, 1000);
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

/**
 * Safely parse JSON with fallback
 * 
 * @example
 * ```ts
 * const data = safeJsonParse<User>(jsonString, defaultUser);
 * ```
 */
export function safeJsonParse<T>(
  json: string,
  fallback: T
): T {
  try {
    return JSON.parse(json) as T
  } catch {
    return fallback
  }
}

/**
 * Type-safe object keys
 * Better than Object.keys() which returns string[]
 * 
 * @example
 * ```ts
 * const obj = { a: 1, b: 2 };
 * objectKeys(obj).forEach(key => {
 *   // key is 'a' | 'b', not string
 *   console.log(obj[key]);
 * });
 * ```
 */
export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

/**
 * Debounce function execution
 * 
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   search(query);
 * }, 300);
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function execution
 * 
 * @example
 * ```ts
 * const throttledScroll = throttle((e: Event) => {
 *   handleScroll(e);
 * }, 100);
 * ```
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function (...args: Parameters<T>) {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generate a unique ID
 * Simple implementation for component keys
 * 
 * @example
 * ```ts
 * const id = generateId(); // "abc123def456"
 * ```
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15)
}

/**
 * Format file size in human-readable format
 * 
 * @example
 * ```ts
 * formatFileSize(1536) // "1.5 KB"
 * formatFileSize(1048576) // "1 MB"
 * ```
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Sleep/delay function for async operations
 * 
 * @example
 * ```ts
 * await sleep(1000); // Wait 1 second
 * console.log('Delayed execution');
 * ```
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Type for async function result with error handling
 */
export type AsyncResult<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

/**
 * Wrap async function with error handling
 * 
 * @example
 * ```ts
 * const result = await tryCatch(fetchData());
 * if (result.success) {
 *   console.log(result.data);
 * } else {
 *   console.error(result.error);
 * }
 * ```
 */
export async function tryCatch<T>(
  promise: Promise<T>
): Promise<AsyncResult<T>> {
  try {
    const data = await promise
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

