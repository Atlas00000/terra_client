"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ProductRecommendation, FacilityType, ThreatLevel, CoverageArea } from "./utils/types"
import { PRODUCT_SPECS } from "./utils/product-specs"
import { CoverageMap } from "./components/coverage-map"
import { RfqFormModal } from "./components/rfq-form-modal"

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

  // Calculate total coverage and metrics
  const totalUnits = recommendation.products.reduce((sum, p) => sum + p.quantity, 0) - 1 // Exclude ArtemisOS
  const kallonTowers = recommendation.products.find(p => p.name.includes('Kallon'))?.quantity || 0
  const totalCoverage = kallonTowers * 15 // 15km per Kallon tower

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
          <span className="block bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Defense Stack
          </span>
        </motion.h3>
        <p className="text-lg md:text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed">
          {recommendation.description}
        </p>
      </motion.div>

      {/* Real Metrics - Fluid Cards */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...animationSettings }}
      >
        {/* Total Units */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 border-0 p-4 text-center"
          style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'
          }}
          whileHover={!isReducedMotion ? { scale: 1.05, y: -4 } : {}}
        >
          <div className="text-2xl md:text-3xl font-black text-primary mb-1">{totalUnits}</div>
          <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Total Units</div>
        </motion.div>

        {/* Coverage */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 border-0 p-4 text-center"
          style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'
          }}
          whileHover={!isReducedMotion ? { scale: 1.05, y: -4 } : {}}
        >
          <div className="text-2xl md:text-3xl font-black text-cyan-400 mb-1">{totalCoverage}km</div>
          <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Coverage</div>
        </motion.div>

        {/* Detection Accuracy */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 border-0 p-4 text-center"
          style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'
          }}
          whileHover={!isReducedMotion ? { scale: 1.05, y: -4 } : {}}
        >
          <div className="text-2xl md:text-3xl font-black text-emerald-400 mb-1">99.5%</div>
          <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Accuracy</div>
        </motion.div>

        {/* Response Time */}
        <motion.div
          className="backdrop-blur-xl bg-white/5 border-0 p-4 text-center"
          style={{
            clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'
          }}
          whileHover={!isReducedMotion ? { scale: 1.05, y: -4 } : {}}
        >
          <div className="text-2xl md:text-3xl font-black text-blue-400 mb-1">&lt;1s</div>
          <div className="text-xs text-muted-foreground/70 uppercase tracking-wider">Detection</div>
        </motion.div>
      </motion.div>

      {/* Product Stack - Fluid Cards with Real Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
        {recommendation.products.map((product, index) => {
          const spec = getProductSpec(product.name)
          const gradient = index % 3 === 0 
            ? 'from-primary/20 via-cyan-500/10 to-transparent'
            : index % 3 === 1
            ? 'from-cyan-500/20 via-blue-500/10 to-transparent'
            : 'from-blue-500/20 via-primary/10 to-transparent'

          return (
            <motion.div
              key={product.name}
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.1 * index, ...animationSettings }}
              whileHover={!isReducedMotion ? { 
                scale: 1.05, 
                y: -8,
                rotateY: 5
              } : {}}
            >
              {/* Gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Glassmorphism card */}
              <div className={`
                relative z-10 p-6 md:p-8
                backdrop-blur-xl bg-gradient-to-br ${gradient}
                border-0
                shadow-lg shadow-black/20
                transition-all duration-500
                min-h-[280px] flex flex-col
              `}
              style={{
                clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)'
              }}
              >
                {/* Product name and quantity */}
                <div className="mb-4">
                  <motion.div
                    className="text-2xl md:text-3xl font-black text-foreground mb-2"
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

                {/* Real product capability */}
                <div className="mb-4 flex-1">
                  <div className="text-sm text-muted-foreground/80 mb-3">
                    {product.capability}
                  </div>

                  {/* Real specs from product-specs.ts */}
                  {spec && (
                    <div className="space-y-2 text-xs">
                      {spec.detectionRange > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground/70">Detection:</span>
                          <span className="text-foreground font-semibold">{spec.detectionRange}km</span>
                        </div>
                      )}
                      {spec.operationalRange > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground/70">Range:</span>
                          <span className="text-foreground font-semibold">{spec.operationalRange}km</span>
                        </div>
                      )}
                      {spec.endurance && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground/70">Endurance:</span>
                          <span className="text-foreground font-semibold">{spec.endurance}</span>
                        </div>
                      )}
                      {spec.responseTime && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground/70">Response:</span>
                          <span className="text-foreground font-semibold">{spec.responseTime}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Key capability highlight */}
                {spec && spec.capabilities.length > 0 && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
                      Key Feature
                    </div>
                    <div className="text-xs text-foreground/70">
                      {spec.capabilities[0]}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
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

      {/* Response Times - Real Metrics */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ...animationSettings }}
      >
        <h4 className="text-2xl md:text-3xl font-black text-foreground mb-8 text-center">
          Response Times
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {recommendation.responseTimes.map((rt, index) => {
            const spec = getProductSpec(rt.product)
            return (
              <motion.div
                key={rt.product}
                className="backdrop-blur-xl bg-white/5 border-0 p-6 text-center"
                style={{
                  clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, ...animationSettings }}
                whileHover={!isReducedMotion ? { scale: 1.05, y: -4 } : {}}
              >
                <div className="text-sm text-muted-foreground/70 mb-2 uppercase tracking-wider">
                  {rt.product}
                </div>
                <motion.div
                  className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent mb-2"
                  animate={!isReducedMotion ? {
                    scale: [1, 1.1, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {rt.time}
                </motion.div>
                {spec && (
                  <div className="text-xs text-muted-foreground/60">
                    {spec.responseTime === rt.time ? 'Real-time from product specs' : ''}
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* CTA - Fluid Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, ...animationSettings }}
      >
        <motion.button
          onClick={() => setIsRfqModalOpen(true)}
          className="px-10 py-5 backdrop-blur-xl bg-gradient-to-r from-primary to-cyan-400 text-white font-black text-lg border-0 shadow-lg shadow-primary/50"
          style={{
            clipPath: 'polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)'
          }}
          whileHover={!isReducedMotion ? { scale: 1.05, y: -2 } : {}}
          whileTap={{ scale: 0.98 }}
        >
          Get My Custom Quote
        </motion.button>
        <motion.button
          onClick={onReset}
          className="px-10 py-5 backdrop-blur-xl bg-white/5 text-foreground font-black border-0 shadow-lg"
          style={{
            clipPath: 'polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)'
          }}
          whileHover={!isReducedMotion ? { scale: 1.05, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.1)' } : {}}
          whileTap={{ scale: 0.98 }}
        >
          Start Over
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
