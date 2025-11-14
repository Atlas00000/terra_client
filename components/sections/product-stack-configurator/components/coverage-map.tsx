"use client"

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
  
  // Create visualization config
  const visualizationConfig: VisualizationConfig = {
    svgSize,
    centerX,
    centerY,
    maxRadius,
    scaleFactor,
    coverageArea
  }

  // Distribute all units using new modular system
  const allUnits = distributeUnits(recommendation, visualizationConfig)
  
  // Separate Kallon towers from other units
  const kallonUnits = allUnits.filter(u => u.productKey === 'Kallon')
  const otherUnits = allUnits.filter(u => u.productKey !== 'Kallon')
  
  // Cluster units of the same type (for better visualization)
  const clusters = clusterUnits(otherUnits)
  
  // Calculate coverage zones
  const coverageZones = calculateCoverageZones(allUnits, visualizationConfig)
  
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

  return (
    <motion.div
      className="w-full relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={animationSettings}
    >
      {/* Floating gradient orbs - background depth */}
      {!isReducedMotion && [0, 1, 2].map((i) => {
        const hash = (i * 7919) % 1000000
        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20 -z-10"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${(hash % 60) + 20}%`,
              top: `${((hash * 7) % 60) + 20}%`,
              background: `radial-gradient(circle, rgba(74, 144, 226, 0.4), transparent)`
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              x: [0, 40, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: 'easeInOut'
            }}
          />
        )
      })}

      {/* Main fluid container */}
      <div className="relative">
        {/* Dynamic gradient background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted/5 to-primary/10 opacity-50"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)'
          }}
        />

        {/* Glassmorphism fluid surface */}
        <div
          className="relative z-10 p-8 md:p-12 backdrop-blur-2xl bg-gradient-to-br from-white/8 via-white/5 to-transparent"
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
            animate={!isReducedMotion ? {
              x: ['-100%', '100%']
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...animationSettings }}
          >
            <motion.h4
              className="text-3xl md:text-4xl font-black text-foreground mb-3"
              animate={!isReducedMotion ? {
                scale: [1, 1.02, 1]
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Coverage Visualization
            </motion.h4>
            <p className="text-sm text-muted-foreground/80">
              Real deployment specs: Kallon Tower 3km detection | 15km coverage radius
            </p>
          </motion.div>

          {/* Interactive SVG Visualization */}
          <div className="relative w-full flex justify-center mb-8">
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
                animate={!isReducedMotion ? {
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1]
                } : { opacity: 0.3, scale: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
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
                  animate={!isReducedMotion ? {
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.03, 1]
                  } : { opacity: 0.2 }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
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
                      animate={!isReducedMotion ? {
                        opacity: [0.2, 0.35, 0.2],
                        scale: [1, 1.05, 1]
                      } : { opacity: 0.2 }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
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
                      animate={!isReducedMotion ? {
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.1, 1]
                      } : { opacity: 0.4 }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
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
                        animate={!isReducedMotion ? {
                          scale: [1, 1.15, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* Tower indicator */}
                      <motion.rect
                        x={kallonX - 4}
                        y={kallonY - 12}
                        width="8"
                        height="16"
                        fill="white"
                        rx="2"
                        animate={!isReducedMotion ? {
                          y: [kallonY - 12, kallonY - 14, kallonY - 12]
                        } : {}}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
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
                        animate={!isReducedMotion ? {
                          opacity: [0.2, 0.4, 0.2],
                          scale: [1, 1.05, 1]
                        } : { opacity: 0.2 }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.1 }}
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
                        animate={!isReducedMotion ? {
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.4, 0.2]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
                      />
                      
                      {/* Product node */}
                      <motion.circle
                        cx={unit.x}
                        cy={unit.y}
                        r="14"
                        fill="rgba(74, 144, 226, 0.4)"
                        stroke="rgba(74, 144, 226, 0.9)"
                        strokeWidth="2.5"
                        animate={!isReducedMotion ? {
                          scale: [1, 1.1, 1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.1 }}
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
                  animate={!isReducedMotion ? {
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.6, 0.3]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Facility center */}
                <motion.circle
                  cx={centerX}
                  cy={centerY}
                  r="20"
                  fill="rgba(74, 144, 226, 0.9)"
                  stroke="white"
                  strokeWidth="4"
                  animate={!isReducedMotion ? {
                    scale: [1, 1.15, 1]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
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
                animate={!isReducedMotion ? {
                  x: ['-100%', '100%']
                } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              {/* Legend Header */}
              <motion.div
                className="text-center mb-6"
                animate={!isReducedMotion ? {
                  scale: [1, 1.01, 1]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        scale: [1, 1.15, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30"
                      animate={!isReducedMotion ? {
                        scale: [1, 1.4, 1],
                        opacity: [0.3, 0.6, 0.3]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-white rounded-sm"
                      animate={!isReducedMotion ? {
                        y: [-1, -2, -1]
                      } : {}}
                      transition={{ duration: 1.5, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        scale: [1, 1.05, 1],
                        opacity: [0.4, 0.6, 0.4]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={!isReducedMotion ? {
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        scale: [1, 1.02, 1],
                        opacity: [0.3, 0.5, 0.3]
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.4, 0.7, 0.4]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        opacity: [0.3, 0.5, 0.3]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
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
                      animate={!isReducedMotion ? {
                        scale: [1, 1.05, 1],
                        opacity: [0.25, 0.4, 0.25]
                      } : {}}
                      transition={{ duration: 2.5, repeat: Infinity }}
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
          {!isReducedMotion && Array.from({ length: 8 }).map((_, i) => {
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
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.5,
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
