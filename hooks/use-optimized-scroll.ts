import { useEffect, useCallback, useRef } from "react"

// Throttle function for scroll events
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return (...args: any[]) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export function useOptimizedScroll(callback: (scrollY: number) => void, delay: number = 16) {
  const callbackRef = useRef(callback)
  
  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])
  
  const throttledCallback = useCallback(
    throttle((scrollY: number) => {
      callbackRef.current(scrollY)
    }, delay),
    [delay]
  )
  
  useEffect(() => {
    const handleScroll = () => {
      throttledCallback(window.scrollY)
    }
    
    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [throttledCallback])
}
