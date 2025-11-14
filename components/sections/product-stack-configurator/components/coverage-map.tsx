"use client"

import { memo, useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { ProductRecommendation, FacilityType, CoverageArea } from "../utils/types"
import { PRODUCT_SPECS } from "../utils/product-specs"
import { 
  distributeUnits, 
  clusterUnits, 
  calculateCoverageZones,
  type UnitPosition,
  type VisualizationConfig 
} from "../utils/visualization"

interface CoverageMapProps {
  recommendation: ProductRecommendation
  facilityType: FacilityType
  coverageArea: CoverageArea
  animationSettings: any
  isReducedMotion: boolean
}

export const CoverageMap = memo(CoverageMapComponent)

function CoverageMapComponent({ recommendation, facilityType, coverageArea, animationSettings, isReducedMotion }: CoverageMapProps) {
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
  const svgSize = 600
  const centerX = svgSize / 2
  const centerY = svgSize / 2
  
  // Adaptive scaling based on coverage area
  // For smaller areas, use minimum visualization radius to prevent cramping
  // For larger areas, use optimized visualization radius for proper scaling
  const getVisualizationRadius = (area: CoverageArea): number => {
    switch (area) {
      case "0-5km": return 15 // Minimum radius for visualization (ensures spacing)
      case "5-15km": return 20 // Slightly larger for better spacing
      case "15-50km": return 28 // Optimized for medium-large areas (better than 32.5 * 0.8 = 26)
      case "50km-plus": return 40 // Optimized for very large areas (better than 75 * 0.6 = 45)
      default: return 20
    }
  }

  const visualizationRadius = getVisualizationRadius(coverageArea)
  
  // Scale factor: ensure we use most of the SVG space while maintaining proportions
  // Use consistent scaling approach for all coverage areas
  const availableRadius = svgSize / 2 - 50 // Leave 50px margin for better spacing
  const scaleFactor = availableRadius / visualizationRadius
  
  // Visual radius in SVG coordinates
  const maxRadius = visualizationRadius * scaleFactor
  
  const visualizationConfig: VisualizationConfig = useMemo(() => ({
    svgSize,
    centerX,
    centerY,
    maxRadius,
    scaleFactor,
    coverageArea
  }), [svgSize, centerX, centerY, maxRadius, scaleFactor, coverageArea])

  const allUnits = useMemo(
    () => distributeUnits(recommendation, visualizationConfig),
    [recommendation, visualizationConfig]
  )

  const kallonUnits = useMemo(
    () => allUnits.filter(u => u.productKey === "Kallon"),
    [allUnits]
  )
  const otherUnits = useMemo(
    () => allUnits.filter(u => u.productKey !== "Kallon"),
    [allUnits]
  )

  const clusters = useMemo(() => clusterUnits(otherUnits), [otherUnits])
  const coverageZones = useMemo(
    () => calculateCoverageZones(allUnits, visualizationConfig),
    [allUnits, visualizationConfig]
  )
  
  // Kallon specs scaled appropriately based on coverage area
  const kallonScaleFactor = (() => {
    switch (coverageArea) {
      case "0-5km": return scaleFactor * 0.8
      case "5-15km": return scaleFactor * 0.75
      case "15-50km": return scaleFactor * 0.7
      case "50km-plus": return scaleFactor * 0.65
      default: return scaleFactor
    }
  })()
  
  const kallonDetectionRadius = KALLON_DETECTION * kallonScaleFactor
  const kallonCoverageRadius = KALLON_COVERAGE * kallonScaleFactor

  const [allowAnimation, setAllowAnimation] = useState(!isReducedMotion)
  useEffect(() => {
    if (isReducedMotion) {
      setAllowAnimation(false)
      return
    }
    setAllowAnimation(true)
    const timer = setTimeout(() => setAllowAnimation(false), 6000)
    return () => clearTimeout(timer)
  }, [isReducedMotion])

  const shouldAnimate = allowAnimation && !isReducedMotion

  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={animationSettings}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(74,144,226,0.18), transparent 55%),
            radial-gradient(circle at 70% 15%, rgba(99,102,241,0.15), transparent 50%)
          `
        }}
      />

      {/* Main fluid container */}
      <div className="relative max-w-5xl mx-auto">
        <div
          className="relative z-10 p-8 md:p-12 backdrop-blur-2xl"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)',
            background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 70%)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...animationSettings }}
          >
            <motion.h4
              className="text-3xl md:text-4xl font-black text-foreground mb-3"
              animate={shouldAnimate ? {
                scale: [1, 1.02, 1]
              } : {}}
              transition={shouldAnimate ? { duration: 3, repeat: Infinity } : undefined}
            >
              Coverage Visualization
            </motion.h4>
            <p className="text-sm text-muted-foreground/80">
              Real deployment specs: Kallon Tower 3km detection | 15km coverage radius
            </p>
          </motion.div>

          {/* Interactive SVG Visualization */}
          <div className="relative w-full flex justify-center mb-8 max-w-xl mx-auto">
            <svg
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              className="w-full max-w-2xl"
            >
              <defs>
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(74, 144, 226, 0.1)"
                    strokeWidth="1"
                  />
                </pattern>
                <radialGradient id="coverageGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(74, 144, 226, 0.3)" />
                  <stop offset="50%" stopColor="rgba(74, 144, 226, 0.15)" />
                  <stop offset="100%" stopColor="rgba(74, 144, 226, 0)" />
                </radialGradient>
                <radialGradient id="kallonDetectionGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(74, 144, 226, 0.6)" />
                  <stop offset="100%" stopColor="rgba(74, 144, 226, 0)" />
                </radialGradient>
                <radialGradient id="kallonCoverageGradient" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="rgba(192, 192, 192, 0.3)" />
                  <stop offset="100%" stopColor="rgba(192, 192, 192, 0)" />
                </radialGradient>
              </defs>

              {/* Grid background */}
              <rect width={svgSize} height={svgSize} fill="url(#grid)" />

              {/* Main coverage area - pulsing animation */}
              <motion.circle
                cx={centerX}
                cy={centerY}
                r={maxRadius}
                fill="url(#coverageGradient)"
                initial={{ opacity: 0, scale: 0 }}
                animate={shouldAnimate ? {
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1]
                } : { opacity: 0.3, scale: 1 }}
                transition={shouldAnimate ? { duration: 3, repeat: Infinity } : undefined}
              />

              {/* Coverage radius rings */}
              {[0.5, 0.75, 1].map((scale, i) => (
                <motion.circle
                  key={`ring-${i}`}
                  cx={centerX}
                  cy={centerY}
                  r={maxRadius * scale}
                  fill="none"
                  stroke="rgba(74, 144, 226, 0.25)"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={shouldAnimate ? {
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.03, 1]
                  } : { opacity: 0.2 }}
                  transition={shouldAnimate ? { duration: 4, repeat: Infinity, delay: i * 0.6 } : undefined}
                />
              ))}

              {/* Kallon tower deployments with real specs */}
              {kallonUnits.map((kallonUnit, i) => {
                const kallonX = kallonUnit.x
                const kallonY = kallonUnit.y
                
                return (
                  <g key={`kallon-${i}`}>
                    {/* Kallon coverage radius (15km) - outer ring */}
                    <motion.circle
                      cx={kallonX}
                      cy={kallonY}
                      r={kallonCoverageRadius}
                      fill="url(#kallonCoverageGradient)"
                      initial={{ opacity: 0 }}
                      animate={shouldAnimate ? {
                        opacity: [0.2, 0.35, 0.2],
                        scale: [1, 1.05, 1]
                      } : { opacity: 0.2 }}
                      transition={shouldAnimate ? { duration: 3, repeat: Infinity, delay: i * 0.4 } : undefined}
                    />
                    
                    {/* Kallon coverage border */}
                    <motion.circle
                      cx={kallonX}
                      cy={kallonY}
                      r={kallonCoverageRadius}
                      fill="none"
                      stroke="rgba(192, 192, 192, 0.4)"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                    />
                    
                    {/* Kallon detection range (3km) - inner zone */}
                    <motion.circle
                      cx={kallonX}
                      cy={kallonY}
                      r={kallonDetectionRadius}
                      fill="url(#kallonDetectionGradient)"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={shouldAnimate ? {
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.1, 1]
                      } : { opacity: 0.4 }}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity, delay: i * 0.3 } : undefined}
                    />
                    
                    {/* Kallon tower position - enhanced */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.7 + i * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {/* Tower base */}
                      <motion.circle
                        cx={kallonX}
                        cy={kallonY}
                        r="16"
                        fill="rgba(74, 144, 226, 0.9)"
                        stroke="white"
                        strokeWidth="3"
                        animate={shouldAnimate ? {
                          scale: [1, 1.15, 1]
                        } : {}}
                        transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                      />
                      {/* Tower indicator */}
                      <motion.rect
                        x={kallonX - 4}
                        y={kallonY - 12}
                        width="8"
                        height="16"
                        fill="white"
                        rx="2"
                        animate={shouldAnimate ? {
                          y: [kallonY - 12, kallonY - 14, kallonY - 12]
                        } : {}}
                        transition={shouldAnimate ? { duration: 1.5, repeat: Infinity, delay: i * 0.2 } : undefined}
                      />
                    </motion.g>
                    
                    {/* Connection line to center */}
                    <motion.line
                      x1={centerX}
                      y1={centerY}
                      x2={kallonX}
                      y2={kallonY}
                      stroke="rgba(74, 144, 226, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="8,8"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                    />
                  </g>
                )
              })}

              {/* Product deployments - all individual units */}
              {otherUnits.map((unit, index) => {
                const productName = unit.productKey
                const unitNumber = unit.unitIndex + 1
                
                return (
                  <g key={`unit-${unit.productKey}-${unit.unitIndex}`}>
                    {/* Product detection/coverage range visualization */}
                    {unit.visualRange > 0 && (
                      <motion.circle
                        cx={unit.x}
                        cy={unit.y}
                        r={Math.min(unit.visualRange, 50)}
                        fill="none"
                        stroke="rgba(74, 144, 226, 0.25)"
                        strokeWidth="2"
                        strokeDasharray="4,4"
                        initial={{ opacity: 0 }}
                        animate={shouldAnimate ? {
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.05, 1]
                        } : { opacity: 0.2 }}
                        transition={shouldAnimate ? { duration: 2.5, repeat: Infinity, delay: index * 0.1 } : undefined}
                      />
                    )}
                    
                    {/* Connection line from center */}
                    <motion.line
                      x1={centerX}
                      y1={centerY}
                      x2={unit.x}
                      y2={unit.y}
                      stroke="rgba(74, 144, 226, 0.3)"
                      strokeWidth="2"
                      strokeDasharray="6,6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.8 }}
                    />
                    
                    {/* Product node - enhanced */}
                    <motion.g
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.9 + index * 0.05, type: "spring", stiffness: 200 }}
                    >
                      {/* Outer glow */}
                      <motion.circle
                        cx={unit.x}
                        cy={unit.y}
                        r="18"
                        fill="rgba(74, 144, 226, 0.2)"
                        animate={shouldAnimate ? {
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2]
                        } : {}}
                        transition={shouldAnimate ? { duration: 2, repeat: Infinity, delay: index * 0.1 } : undefined}
                      />
                      
                      {/* Product node */}
                      <motion.circle
                        cx={unit.x}
                        cy={unit.y}
                        r="14"
                        fill="rgba(74, 144, 226, 0.4)"
                        stroke="rgba(74, 144, 226, 0.9)"
                        strokeWidth="2.5"
                        animate={shouldAnimate ? {
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={shouldAnimate ? { duration: 2, repeat: Infinity, delay: index * 0.1 } : undefined}
                      />
                      
                      {/* Product label with unit number */}
                      <motion.text
                        x={unit.x}
                        y={unit.y + 4}
                        textAnchor="middle"
                        fontSize="10"
                        fill="white"
                        fontWeight="bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.05 }}
                      >
                        {productName}
                      </motion.text>
                      
                      {/* Unit number (small) */}
                      {unit.quantity > 1 && (
                        <motion.text
                          x={unit.x}
                          y={unit.y + 32}
                          textAnchor="middle"
                          fontSize="8"
                          fill="rgba(74, 144, 226, 0.9)"
                          fontWeight="600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.1 + index * 0.05 }}
                        >
                          #{unitNumber}
                        </motion.text>
                      )}
                      
                      {/* Real range label */}
                      {(unit.detectionRange > 0 || unit.operationalRange > 0) && (
                        <motion.text
                          x={unit.x}
                          y={unit.y + 45}
                          textAnchor="middle"
                          fontSize="8"
                          fill="rgba(192, 192, 192, 0.8)"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 + index * 0.05 }}
                        >
                          {(unit.detectionRange || unit.operationalRange)}km
                        </motion.text>
                      )}
                    </motion.g>
                  </g>
                )
              })}

              {/* Center facility point - enhanced */}
              <motion.g>
                {/* Facility glow */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r="24"
                  fill="rgba(74, 144, 226, 0.3)"
                  animate={shouldAnimate ? {
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3]
                  } : {}}
                  transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                />
                
                {/* Facility center */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r="20"
                  fill="rgba(74, 144, 226, 0.9)"
                  stroke="white"
                  strokeWidth="4"
                  animate={shouldAnimate ? {
                    scale: [1, 1.15, 1]
                  } : {}}
                  transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                />
                
                <motion.text
                  x={centerX}
                  y={centerY + 6}
                  textAnchor="middle"
                  fontSize="11"
                  fill="white"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Facility
                </motion.text>
              </motion.g>
            </svg>
          </div>

          {/* Visualization Legend - Fluid Design */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...animationSettings }}
          >
            <div className="relative p-6 md:p-8 backdrop-blur-xl bg-gradient-to-br from-white/8 via-white/5 to-transparent"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)'
              }}
            >
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-muted-foreground/20 to-primary/20 opacity-0 group-hover:opacity-100"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)',
                  maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                }}
                animate={shouldAnimate ? {
                  x: ['-100%', '100%']
                } : {}}
                transition={shouldAnimate ? { duration: 4, repeat: Infinity, ease: 'linear' } : undefined}
              />

              {/* Legend Header */}
              <motion.div
                className="text-center mb-6"
                animate={shouldAnimate ? {
                  scale: [1, 1.01, 1]
                } : {}}
                transition={shouldAnimate ? { duration: 3, repeat: Infinity } : undefined}
              >
                <h5 className="text-lg md:text-xl font-black text-foreground mb-1">
                  Visualization Legend
                </h5>
                <p className="text-xs text-muted-foreground/70">
                  Understanding the coverage map elements
                </p>
              </motion.div>

              {/* Legend Items Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {/* Facility Center */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-primary"
                      animate={shouldAnimate ? {
                        scale: [1, 1.15, 1]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={shouldAnimate ? {
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.6, 0.3]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Facility Center</div>
                    <div className="text-xs text-muted-foreground/70">Protected location</div>
                  </div>
                </motion.div>

                {/* Kallon Tower */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-primary border-2 border-white"
                      animate={shouldAnimate ? {
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                    />
                    <motion.div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-white rounded-sm"
                      animate={shouldAnimate ? {
                        y: [-1, -2, -1]
                      } : {}}
                      transition={shouldAnimate ? { duration: 1.5, repeat: Infinity } : undefined}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Kallon Tower</div>
                    <div className="text-xs text-muted-foreground/70">3km detection</div>
                  </div>
                </motion.div>

                {/* Kallon Coverage */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/40"
                      animate={shouldAnimate ? {
                        scale: [1, 1.05, 1],
                        opacity: [0.4, 0.6, 0.4]
                      } : {}}
                      transition={shouldAnimate ? { duration: 3, repeat: Infinity } : undefined}
                    />
                    <div className="absolute inset-0 rounded-full bg-muted-foreground/10" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">15km Coverage</div>
                    <div className="text-xs text-muted-foreground/70">Kallon radius</div>
                  </div>
                </motion.div>

                {/* Product Deployment */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-5 h-5 rounded-full bg-primary/40 border-2 border-primary"
                      animate={shouldAnimate ? {
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity, delay: 0.2 } : undefined}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={shouldAnimate ? {
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Product Node</div>
                    <div className="text-xs text-muted-foreground/70">UAV/UGV/VTOL</div>
                  </div>
                </motion.div>

                {/* Coverage Zone */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-8 h-8 rounded-full border-2 border-primary/30"
                      animate={shouldAnimate ? {
                        scale: [1, 1.02, 1],
                        opacity: [0.3, 0.5, 0.3]
                      } : {}}
                      transition={shouldAnimate ? { duration: 3, repeat: Infinity } : undefined}
                    />
                    <div className="absolute inset-0 rounded-full bg-primary/10" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Coverage Zone</div>
                    <div className="text-xs text-muted-foreground/70">Total area</div>
                  </div>
                </motion.div>

                {/* Detection Range */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-6 h-6 rounded-full bg-primary/30"
                      animate={shouldAnimate ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.7, 0.4]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Detection Range</div>
                    <div className="text-xs text-muted-foreground/70">3km active zone</div>
                  </div>
                </motion.div>

                {/* Connection Lines */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0 w-8 h-0.5">
                    <motion.div
                      className="absolute inset-0 border-t-2 border-dashed border-primary/30"
                      animate={shouldAnimate ? {
                        opacity: [0.3, 0.5, 0.3]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2, repeat: Infinity } : undefined}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Connection</div>
                    <div className="text-xs text-muted-foreground/70">Deployment lines</div>
                  </div>
                </motion.div>

                {/* Product Range */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, ...animationSettings }}
                >
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="w-6 h-6 rounded-full border border-primary/30 border-dashed"
                      animate={shouldAnimate ? {
                        scale: [1, 1.05, 1],
                        opacity: [0.25, 0.4, 0.25]
                      } : {}}
                      transition={shouldAnimate ? { duration: 2.5, repeat: Infinity } : undefined}
                    />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">Product Range</div>
                    <div className="text-xs text-muted-foreground/70">Operational zone</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Floating particles */}
          {shouldAnimate && Array.from({ length: 8 }).map((_, i) => {
            const hash = (i * 2654435761) % 1000000
            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1.5 h-1.5 bg-primary rounded-full"
                style={{
                  left: `${(hash % 80) + 10}%`,
                  top: `${((hash * 7) % 80) + 10}%`,
                  boxShadow: '0 0 8px rgba(74, 144, 226, 0.6)'
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  x: [0, (i % 2 === 0 ? 20 : -20), 0]
                }}
                transition={shouldAnimate ? {
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut'
                } : undefined}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
