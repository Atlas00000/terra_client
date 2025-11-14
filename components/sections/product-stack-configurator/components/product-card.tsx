"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ProductRecommendation } from "../utils/types"
import { ProductSpec } from "../utils/product-specs"

interface ProductCardProps {
  product: ProductRecommendation['products'][0]
  spec: ProductSpec | null
  index: number
  animationSettings: any
  isReducedMotion: boolean
}

// Product image mapping - using product keys from PRODUCT_SPECS
const PRODUCT_IMAGES: Record<string, string> = {
  'ArtemisOS': '/ArtemisOS/autonomous_mission_planning.png',
  'Iroko': '/Iroko_UAV/Iroko_UAV .png',
  'Archer': '/archer_vtol/archer_vtol_1.png',
  'Duma': '/Duma_ground_drone/Duma_ground_drone.png',
  'Kallon': '/kallon(sentry_tower)/kallon.png'
}

// Fluid clipPath variations
const FLUID_CLIP_PATHS = [
  'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)',
  'polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)',
  'polygon(0% 8%, 92% 0%, 100% 92%, 100% 100%, 0% 100%, 0% 88%)',
  'polygon(8% 0%, 100% 8%, 92% 100%, 0% 92%, 0% 0%)'
]

export function ProductCard({ product, spec, index, animationSettings, isReducedMotion }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  const imagePath = PRODUCT_IMAGES[product.name] || PRODUCT_IMAGES['ArtemisOS']
  const clipPath = FLUID_CLIP_PATHS[index % FLUID_CLIP_PATHS.length]
  
  const gradient = index % 3 === 0 
    ? 'from-primary/20 via-muted/10 to-transparent'
    : index % 3 === 1
    ? 'from-muted/20 via-primary/10 to-transparent'
    : 'from-primary/20 via-muted/10 to-transparent'

  return (
    <motion.div
      className="relative group overflow-visible"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 * index, ...animationSettings }}
      whileHover={!isReducedMotion ? { 
        scale: 1.03,
        y: -12
      } : {}}
    >
      {/* Floating gradient orbs - background depth */}
      {!isReducedMotion && [0, 1].map((i) => {
        const hash = (index * 7919 + i * 2654435761) % 1000000
        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-2xl opacity-20 -z-10"
            style={{
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              left: `${(hash % 60) + 20}%`,
              top: `${((hash * 7) % 60) + 20}%`,
              background: `radial-gradient(circle, rgba(74, 144, 226, 0.4), transparent)`
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              x: [0, 25, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut'
            }}
          />
        )
      })}

      {/* Main fluid container */}
      <div className="relative">
        {/* Dynamic gradient background - flows like liquid */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-700`}
          style={{ clipPath }}
        />

        {/* Flowing gradient overlay */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-15`}
          style={{
            clipPath,
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
          }}
          animate={!isReducedMotion ? {
            x: ['-20%', '120%'],
            opacity: [0, 0.2, 0]
          } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Glassmorphism fluid surface */}
        <div
          className={`
            relative z-10 p-6 md:p-8
            backdrop-blur-2xl
            bg-gradient-to-br ${gradient}
            transition-all duration-700
            flex flex-col
            min-h-[400px]
          `}
          style={{ clipPath }}
        >
          {/* Animated border glow */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-25`}
            style={{
              clipPath,
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
            }}
            animate={!isReducedMotion ? {
              x: ['-100%', '100%']
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Product Image - Fluid Container */}
          <div className="relative w-full h-48 mb-6 overflow-hidden">
            <motion.div
              className="relative w-full h-full"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 95% 100%, 5% 100%, 0% 90%)'
              }}
              whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
              transition={{ duration: 0.3 }}
            >
              {!imageError ? (
                <Image
                  src={imagePath}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <div className="text-muted-foreground/50 text-sm">Image unavailable</div>
                </div>
              )}
              
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="relative z-20 space-y-4 flex-1">
            {/* Product name and quantity */}
            <div>
              <motion.div
                className="text-2xl md:text-3xl font-black text-foreground mb-2 leading-tight"
                animate={!isReducedMotion ? {
                  scale: [1, 1.02, 1]
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {product.name}
              </motion.div>
              <div className="text-lg font-bold text-primary">
                Quantity: {product.quantity}
              </div>
            </div>

            {/* Product capability */}
            <div className="text-sm text-muted-foreground/90 leading-relaxed font-medium">
              {product.capability}
            </div>

            {/* Real specs from product-specs.ts */}
            {spec && (
              <div className="pt-4 space-y-2 border-t border-white/10">
                {spec.detectionRange > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground/70 uppercase tracking-wider">Detection</span>
                    <span className="text-sm text-foreground font-bold">{spec.detectionRange}km</span>
                  </div>
                )}
                {spec.operationalRange > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground/70 uppercase tracking-wider">Range</span>
                    <span className="text-sm text-foreground font-bold">{spec.operationalRange}km</span>
                  </div>
                )}
                {spec.endurance && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground/70 uppercase tracking-wider">Endurance</span>
                    <span className="text-sm text-foreground font-bold">{spec.endurance}</span>
                  </div>
                )}
                {spec.responseTime && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground/70 uppercase tracking-wider">Response</span>
                    <span className="text-sm text-foreground font-bold">{spec.responseTime}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Floating particles */}
          {!isReducedMotion && Array.from({ length: 3 }).map((_, i) => {
            const hash = (index * 2654435761 + i * 7919) % 1000000
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${(hash % 80) + 10}%`,
                  top: `${((hash * 7) % 80) + 10}%`,
                  boxShadow: '0 0 6px rgba(74, 144, 226, 0.6)'
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.7, 0],
                  scale: [0, 1.2, 0],
                  x: [0, (i % 2 === 0 ? 10 : -10), 0]
                }}
                transition={{
                  duration: 2.5 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: 'easeInOut'
                }}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

