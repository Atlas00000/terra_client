"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

// Helper function to generate fewer particles for mobile
const generateMobileParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const hash = (i * 2654435761) % 1000000;
    positions.push({
      left: (hash % 90) + 5,
      top: ((hash * 7) % 90) + 5,
      duration: 4 + (i % 2), // Slower animations for mobile
      delay: (i % 3) * 0.8
    });
  }
  return positions;
};

interface MobileLayoutProps {
  children: React.ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    const checkReducedMotion = () => {
      setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    checkMobile()
    checkReducedMotion()
    
    window.addEventListener('resize', checkMobile)
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    mediaQuery.addEventListener('change', checkReducedMotion)

    return () => {
      window.removeEventListener('resize', checkMobile)
      mediaQuery.removeEventListener('change', checkReducedMotion)
    }
  }, [])

  if (!isMobile) {
    return <>{children}</>
  }

  return (
    <div className="mobile-optimized">
      {/* Mobile-specific background with reduced particles */}
      <div className="fixed inset-0 -z-10">
        {/* Simplified grid for mobile */}
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px' // Smaller grid for mobile
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0px 0px', '30px 30px']
          } : {}}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Reduced particles for mobile */}
        {!isReducedMotion && generateMobileParticlePositions(8).map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 0.8, 0]
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay
            }}
          />
        ))}
      </div>

      {/* Mobile-optimized content */}
      <div className="mobile-content">
        {children}
      </div>

      <style jsx global>{`
        .mobile-optimized {
          /* Mobile-specific optimizations */
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
        
        .mobile-content {
          /* Reduce motion for better performance */
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          will-change: auto;
        }
        
        /* Mobile-specific animations */
        @media (max-width: 767px) {
          .mobile-content * {
            /* Reduce complex animations on mobile */
            animation-duration: 0.3s !important;
            transition-duration: 0.2s !important;
          }
          
          /* Optimize touch interactions */
          .mobile-content button,
          .mobile-content a {
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
          }
          
          /* Reduce particle effects */
          .mobile-content .particle {
            display: none;
          }
          
          /* Optimize scrolling */
          .mobile-content {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
          }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          .mobile-content * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </div>
  )
}

// Mobile-optimized section wrapper
export function MobileSection({ 
  children, 
  className = "",
  reducedAnimations = true 
}: { 
  children: React.ReactNode
  className?: string
  reducedAnimations?: boolean
}) {
  return (
    <motion.section
      className={`mobile-section ${className}`}
      initial={reducedAnimations ? {} : { opacity: 0, y: 20 }}
      whileInView={reducedAnimations ? {} : { opacity: 1, y: 0 }}
      transition={reducedAnimations ? {} : { duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.section>
  )
}

// Mobile-optimized text component
export function MobileText({ 
  children, 
  size = "base",
  className = ""
}: { 
  children: React.ReactNode
  size?: "sm" | "base" | "lg" | "xl" | "2xl"
  className?: string
}) {
  const sizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl"
  }

  return (
    <motion.p
      className={`mobile-text ${sizeClasses[size]} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  )
}

// Mobile-optimized button component
export function MobileButton({ 
  children, 
  onClick,
  variant = "primary",
  className = ""
}: { 
  children: React.ReactNode
  onClick?: () => void
  variant?: "primary" | "secondary"
  className?: string
}) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-primary to-terra-steel-blue text-white",
    secondary: "border-2 border-primary/30 text-foreground bg-background/50"
  }

  return (
    <motion.button
      className={`mobile-button px-6 py-3 rounded-xl font-semibold ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent'
      }}
    >
      {children}
    </motion.button>
  )
}

// Mobile-optimized image component
export function MobileImage({ 
  src, 
  alt, 
  width, 
  height,
  priority = false,
  className = ""
}: {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}) {
  return (
    <motion.div
      className={`mobile-image-container ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </motion.div>
  )
}
