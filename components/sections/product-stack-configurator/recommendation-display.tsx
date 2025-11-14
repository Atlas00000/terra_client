"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ProductRecommendation, FacilityType, ThreatLevel, CoverageArea } from "./utils/types"
import { PRODUCT_SPECS } from "./utils/product-specs"
import { CoverageMap } from "./components/coverage-map"
import { RfqFormModal } from "./components/rfq-form-modal"
import { ProductCard } from "./components/product-card"

interface RecommendationDisplayProps {
  recommendation: ProductRecommendation
  facilityType: FacilityType
  threatLevel: ThreatLevel
  coverageArea: CoverageArea
  onReset: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function RecommendationDisplay({
  recommendation,
  facilityType,
  threatLevel,
  coverageArea,
  onReset,
  animationSettings,
  isReducedMotion
}: RecommendationDisplayProps) {
  const [isRfqModalOpen, setIsRfqModalOpen] = useState(false)

  // Get real product specs for each recommended product
  const getProductSpec = (productName: string) => {
    const key = productName.replace(' UAV', '').replace(' VTOL', '').replace(' Tower', '').replace(' UGV', '') as keyof typeof PRODUCT_SPECS
    return PRODUCT_SPECS[key] || null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={animationSettings}
      className="w-full"
    >
      {/* Header - Fluid Design */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...animationSettings }}
      >
        <motion.h3
          className="text-4xl md:text-6xl font-black tracking-tight mb-6"
          animate={!isReducedMotion ? {
            scale: [1, 1.02, 1]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="block text-foreground">Your Recommended</span>
          <span className="block bg-gradient-to-r from-primary via-muted-foreground to-primary bg-clip-text text-transparent">
            Defense Stack
          </span>
        </motion.h3>
        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
          {recommendation.description}
        </p>
      </motion.div>

      {/* Product Stack - Fluid Cards with Real Specs and Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
        {recommendation.products.map((product, index) => {
          const spec = getProductSpec(product.name)
          return (
            <ProductCard
              key={product.name}
              product={product}
              spec={spec}
              index={index}
              animationSettings={animationSettings}
              isReducedMotion={isReducedMotion}
            />
          )
        })}
      </div>

      {/* Coverage Map */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...animationSettings }}
      >
        <CoverageMap
          recommendation={recommendation}
          facilityType={facilityType}
          coverageArea={coverageArea}
          animationSettings={animationSettings}
          isReducedMotion={isReducedMotion}
        />
      </motion.div>

      {/* CTA - Fluid Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ...animationSettings }}
      >
        {/* Primary CTA - Get My Custom Quote */}
        <motion.button
          onClick={() => setIsRfqModalOpen(true)}
          className="relative group overflow-visible"
          whileHover={!isReducedMotion ? { scale: 1.03, y: -4 } : {}}
          whileTap={{ scale: 0.97 }}
        >
          {/* Floating gradient orbs */}
          {!isReducedMotion && [0, 1].map((i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute inset-0 rounded-full blur-2xl opacity-30 -z-10 bg-primary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5
              }}
            />
          ))}

          {/* Button surface */}
          <div
            className="relative px-12 py-6 backdrop-blur-2xl bg-gradient-to-r from-primary via-primary/90 to-primary text-white font-black text-lg border-0 shadow-2xl shadow-primary/50"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 95% 100%, 5% 100%, 0% 90%)'
            }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 95% 100%, 5% 100%, 0% 90%)',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
              animate={!isReducedMotion ? {
                x: ['-100%', '100%']
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Button text */}
            <span className="relative z-10">Get My Custom Quote</span>

            {/* Floating particles */}
            {!isReducedMotion && Array.from({ length: 3 }).map((_, i) => {
              const hash = (i * 2654435761) % 1000000
              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${(hash % 80) + 10}%`,
                    top: `${((hash * 7) % 80) + 10}%`,
                    boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)'
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.2, 0]
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut'
                  }}
                />
              )
            })}
          </div>
        </motion.button>

        {/* Secondary CTA - Start Over */}
        <motion.button
          onClick={onReset}
          className="relative group overflow-visible"
          whileHover={!isReducedMotion ? { scale: 1.03, y: -4 } : {}}
          whileTap={{ scale: 0.97 }}
        >
          {/* Button surface */}
          <div
            className="relative px-12 py-6 backdrop-blur-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent text-foreground font-black text-lg border-0 shadow-xl"
            style={{
              clipPath: 'polygon(5% 0%, 100% 0%, 100% 90%, 95% 100%, 0% 100%, 0% 10%)'
            }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-muted-foreground/20 to-primary/20 opacity-0 group-hover:opacity-100"
              style={{
                clipPath: 'polygon(5% 0%, 100% 0%, 100% 90%, 95% 100%, 0% 100%, 0% 10%)',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
              }}
              animate={!isReducedMotion ? {
                x: ['-100%', '100%']
              } : {}}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            />

            {/* Button text */}
            <span className="relative z-10">Another Configurator</span>
          </div>
        </motion.button>
      </motion.div>

      {/* RFQ Form Modal */}
      <RfqFormModal
        isOpen={isRfqModalOpen}
        onClose={() => setIsRfqModalOpen(false)}
        recommendation={recommendation}
        facilityType={facilityType}
        threatLevel={threatLevel}
        coverageArea={coverageArea}
        animationSettings={animationSettings}
        isReducedMotion={isReducedMotion}
      />
    </motion.div>
  )
}
