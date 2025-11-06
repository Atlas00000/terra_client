"use client"

import { useState, useEffect, useCallback } from "react"
import { easeOut, linear, type Easing } from "@/lib/types"

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    const checkLowEndDevice = () => {
      // Simple heuristic for low-end devices
      const connection = (navigator as any).connection
      const isSlowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')
      const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4
      const isLowCores = navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4
      
      setIsLowEndDevice(isSlowConnection || isLowMemory || isLowCores)
    }

    checkDevice()
    checkReducedMotion()
    checkLowEndDevice()

    window.addEventListener('resize', checkDevice)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkReducedMotion)

    return () => {
      window.removeEventListener('resize', checkDevice)
      mediaQuery.removeEventListener('change', checkReducedMotion)
    }
  }, [])

  // Throttled scroll handler for mobile
  const useThrottledScroll = useCallback((callback: (scrollY: number) => void, delay = 16) => {
    let timeoutId: NodeJS.Timeout | null = null
    let lastScrollY = 0

    const handleScroll = () => {
      if (timeoutId || typeof window === 'undefined') return

      timeoutId = setTimeout(() => {
        const currentScrollY = window.scrollY
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          callback(currentScrollY)
          lastScrollY = currentScrollY
        }
        timeoutId = null
      }, delay)
    }

    return handleScroll
  }, [])

  // Optimized animation settings based on device
  const getAnimationSettings = useCallback(() => {
    if (isReducedMotion) {
      return {
        duration: 0,
        ease: linear as Easing,
        repeat: 0
      }
    }

    if (isLowEndDevice) {
      return {
        duration: 0.3,
        ease: easeOut as Easing,
        repeat: 0
      }
    }

    if (isMobile) {
      return {
        duration: 0.4,
        ease: easeOut as Easing,
        repeat: 0
      }
    }

    return {
      duration: 0.6,
      ease: easeOut as Easing,
      repeat: 0
    }
  }, [isMobile, isReducedMotion, isLowEndDevice])

  // Particle count based on device capability
  const getParticleCount = useCallback(() => {
    if (isReducedMotion || isLowEndDevice) return 0
    if (isMobile) return 5
    if (isTablet) return 10
    return 20
  }, [isMobile, isTablet, isReducedMotion, isLowEndDevice])

  // Touch-optimized interactions
  const getTouchSettings = useCallback(() => ({
    touchAction: 'manipulation',
    WebkitTapHighlightColor: 'transparent',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    userSelect: 'none'
  }), [])

  return {
    isMobile,
    isTablet,
    isReducedMotion,
    isLowEndDevice,
    useThrottledScroll,
    getAnimationSettings,
    getParticleCount,
    getTouchSettings
  }
}
