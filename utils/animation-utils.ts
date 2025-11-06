import { motion, type Variants } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { easeOut, easeInOut, type Easing } from "@/lib/types"

export function useOptimizedAnimations() {
  const { isReducedMotion, isMobile } = useMobileOptimization()

  // Base animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: isReducedMotion ? 0 : 0.6, ease: easeOut as Easing },
    viewport: { once: true }
  }

  const staggerContainer: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: isReducedMotion ? 0 : 0.5, ease: easeOut as Easing } }
  }

  // Particle animation
  const particleAnimation = isReducedMotion ? {} : {
    y: [0, -100, 0],
    opacity: [0, 1, 0],
    scale: [0, 1, 0]
  }

  const particleTransition = {
    duration: isReducedMotion ? 0 : 3,
    repeat: isReducedMotion ? 0 : Infinity,
    ease: easeInOut as Easing
  }

  return {
    fadeInUp,
    staggerContainer,
    staggerItem,
    particleAnimation,
    particleTransition
  }
}