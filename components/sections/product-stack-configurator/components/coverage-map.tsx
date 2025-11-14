"use client"

import { motion } from "framer-motion"
import { ProductRecommendation, FacilityType, CoverageArea } from "../utils/types"
import { PRODUCT_SPECS } from "../utils/product-specs"

interface CoverageMapProps {
  recommendation: ProductRecommendation
  facilityType: FacilityType
  coverageArea: CoverageArea
  animationSettings: any
  isReducedMotion: boolean
}

export function CoverageMap({ recommendation, facilityType, coverageArea, animationSettings, isReducedMotion }: CoverageMapProps) {
  // Real Kallon specs: 3km detection, 15km coverage radius
  const KALLON_DETECTION = 3
  const KALLON_COVERAGE = 15

  // Calculate coverage radius based on coverage area
  const getCoverageRadius = (area: CoverageArea): number => {
    switch (area) {
      case "0-5km": return 2.5
      case "5-15km": return 10
      case "15-50km": return 32.5
      case "50km-plus": return 75
      default: return 10
    }
  }

  const radius = getCoverageRadius(coverageArea)
  const svgSize = 500
  const centerX = svgSize / 2
  const centerY = svgSize / 2
  
  // Scale visualization - Kallon 15km coverage radius
  const scaleFactor = Math.min(svgSize / 2 / (radius * 1.2), 8)
  const maxRadius = radius * scaleFactor
  const kallonDetectionRadius = KALLON_DETECTION * scaleFactor
  const kallonCoverageRadius = KALLON_COVERAGE * scaleFactor

  // Get Kallon tower count
  const kallonProduct = recommendation.products.find(p => p.name.includes('Kallon'))
  const kallonCount = kallonProduct?.quantity || 0

  // Calculate product positions based on real specs
  const productPositions = recommendation.products
    .filter(p => p.name !== 'ArtemisOS')
    .map((product, index) => {
      const spec = PRODUCT_SPECS[product.name.replace(' UAV', '').replace(' VTOL', '').replace(' Tower', '').replace(' UGV', '') as keyof typeof PRODUCT_SPECS]
      const angle = (index * 2 * Math.PI) / (recommendation.products.length - 1)
      const distance = maxRadius * 0.5
      const x = centerX + distance * Math.cos(angle)
      const y = centerY + distance * Math.sin(angle)
      
      // Use real detection/coverage range if available
      const productRange = spec?.detectionRange || spec?.operationalRange || 5
      const visualRange = productRange * scaleFactor
      
      return { product, x, y, angle, visualRange, spec }
    })

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={animationSettings}
    >
      <div className="backdrop-blur-xl bg-white/5 border-0 p-6 md:p-8 shadow-lg shadow-black/20"
        style={{
          clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)'
        }}
      >
        <motion.h4
          className="text-2xl md:text-3xl font-black text-foreground mb-2 text-center"
          animate={!isReducedMotion ? {
            scale: [1, 1.02, 1]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Coverage Visualization
        </motion.h4>
        <p className="text-sm text-muted-foreground/70 text-center mb-6">
          Real specs: Kallon Tower 3km detection, 15km coverage radius
        </p>
        
        <div className="relative w-full flex justify-center">
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            className="w-full max-w-lg"
          >
            <defs>
              <pattern
                id="grid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="rgba(74, 144, 226, 0.15)"
                  strokeWidth="1"
                />
              </pattern>
              <radialGradient id="coverageGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(74, 144, 226, 0.4)" />
                <stop offset="50%" stopColor="rgba(74, 144, 226, 0.2)" />
                <stop offset="100%" stopColor="rgba(74, 144, 226, 0)" />
              </radialGradient>
              <radialGradient id="kallonDetectionGradient" cx="50%" cy="50%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
                <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
              </radialGradient>
            </defs>

            {/* Grid background */}
            <rect width={svgSize} height={svgSize} fill="url(#grid)" />

            {/* Main coverage area - based on real radius */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r={maxRadius}
              fill="url(#coverageGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, ...animationSettings }}
            />

            {/* Kallon detection zones (3km each) */}
            {kallonCount > 0 && Array.from({ length: kallonCount }).map((_, i) => {
              const angle = (i * 2 * Math.PI) / kallonCount
              const kallonX = centerX + (maxRadius * 0.6) * Math.cos(angle)
              const kallonY = centerY + (maxRadius * 0.6) * Math.sin(angle)
              
              return (
                <g key={`kallon-${i}`}>
                  {/* Kallon detection range (3km) */}
                  <motion.circle
                    cx={kallonX}
                    cy={kallonY}
                    r={kallonDetectionRadius}
                    fill="url(#kallonDetectionGradient)"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={!isReducedMotion ? {
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.1, 1]
                    } : { opacity: 0.3 }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  
                  {/* Kallon coverage radius (15km) */}
                  <motion.circle
                    cx={kallonX}
                    cy={kallonY}
                    r={kallonCoverageRadius}
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.3)"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  />
                  
                  {/* Kallon tower position */}
                  <motion.circle
                    cx={kallonX}
                    cy={kallonY}
                    r="12"
                    fill="rgba(16, 185, 129, 0.9)"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={!isReducedMotion ? {
                      scale: [1, 1.2, 1]
                    } : { scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 2, repeat: Infinity }}
                  />
                  <text
                    x={kallonX}
                    y={kallonY + 5}
                    textAnchor="middle"
                    fontSize="8"
                    fill="white"
                    fontWeight="bold"
                  >
                    K
                  </text>
                </g>
              )
            })}

            {/* Coverage radius indicators */}
            {[0.5, 0.75, 1].map((scale, i) => (
              <motion.circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={maxRadius * scale}
                fill="none"
                stroke="rgba(74, 144, 226, 0.3)"
                strokeWidth="2"
                strokeDasharray="6,6"
                initial={{ opacity: 0, scale: 0 }}
                animate={!isReducedMotion ? {
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1]
                } : { opacity: 0.2 }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}

            {/* Connection lines from center to products */}
            {productPositions.map((pos, index) => (
              <motion.line
                key={`line-${index}`}
                x1={centerX}
                y1={centerY}
                x2={pos.x}
                y2={pos.y}
                stroke="rgba(74, 144, 226, 0.4)"
                strokeWidth="2"
                strokeDasharray="6,6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
              />
            ))}

            {/* Product nodes with real range visualization */}
            {productPositions.map((pos, index) => {
              const productName = pos.product.name.split(' ')[0]
              return (
                <g key={`product-${index}`}>
                  {/* Product detection/coverage range */}
                  {pos.visualRange > 0 && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={Math.min(pos.visualRange, 40)}
                      fill="none"
                      stroke="rgba(74, 144, 226, 0.3)"
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                      initial={{ opacity: 0 }}
                      animate={!isReducedMotion ? {
                        opacity: [0.2, 0.4, 0.2]
                      } : { opacity: 0.2 }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    />
                  )}
                  
                  {/* Product node */}
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="18"
                    fill="rgba(74, 144, 226, 0.3)"
                    stroke="rgba(74, 144, 226, 0.9)"
                    strokeWidth="3"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    whileHover={!isReducedMotion ? { scale: 1.3, r: 25 } : {}}
                  />
                  <motion.text
                    x={pos.x}
                    y={pos.y + 35}
                    textAnchor="middle"
                    fontSize="11"
                    fill="rgba(74, 144, 226, 0.9)"
                    fontWeight="bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    {productName}
                  </motion.text>
                  <motion.text
                    x={pos.x}
                    y={pos.y + 50}
                    textAnchor="middle"
                    fontSize="9"
                    fill="rgba(74, 144, 226, 0.7)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    x{pos.product.quantity}
                  </motion.text>
                  {/* Real range label */}
                  {pos.spec && (pos.spec.detectionRange > 0 || pos.spec.operationalRange > 0) && (
                    <motion.text
                      x={pos.x}
                      y={pos.y + 65}
                      textAnchor="middle"
                      fontSize="8"
                      fill="rgba(74, 144, 226, 0.6)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                    >
                      {pos.spec.detectionRange || pos.spec.operationalRange}km
                    </motion.text>
                  )}
                </g>
              )
            })}

            {/* Center point (facility) */}
            <motion.circle
              cx={centerX}
              cy={centerY}
              r="16"
              fill="rgba(74, 144, 226, 0.9)"
              stroke="white"
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={!isReducedMotion ? {
                scale: [1, 1.2, 1]
              } : { scale: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text
              x={centerX}
              y={centerY + 6}
              textAnchor="middle"
              fontSize="10"
              fill="white"
              fontWeight="bold"
            >
              Facility
            </text>
          </svg>
        </div>

        {/* Legend - Real Specs */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary/40 border-2 border-primary"></div>
            <span className="text-muted-foreground/70">Product Deployment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500/40 border border-emerald-500/50"></div>
            <span className="text-muted-foreground/70">Kallon 3km Detection</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/30"></div>
            <span className="text-muted-foreground/70">15km Coverage Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary/90"></div>
            <span className="text-muted-foreground/70">Facility Center</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
