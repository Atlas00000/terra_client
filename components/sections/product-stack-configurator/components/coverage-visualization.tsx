"use client"

import { motion } from "framer-motion"
import { CoverageContent } from "../utils/coverage-content"

interface CoverageVisualizationProps {
  content: CoverageContent
  isSelected: boolean
  isReducedMotion: boolean
  animationSettings: any
}

export function CoverageVisualization({ content, isSelected, isReducedMotion, animationSettings }: CoverageVisualizationProps) {
  const svgSize = 200
  const centerX = svgSize / 2
  const centerY = svgSize / 2
  
  // Real Kallon specs: 3km detection, 15km coverage
  const KALLON_DETECTION = 3
  const KALLON_COVERAGE = 15
  
  // Scale visualization
  const maxRadius = Math.min(content.radius * 2, 80)
  const detectionRadius = Math.min((KALLON_DETECTION / content.radius) * maxRadius, maxRadius * 0.3)
  const coverageRadius = Math.min((KALLON_COVERAGE / content.radius) * maxRadius, maxRadius * 0.6)

  // Calculate tower positions in a circular pattern
  const towerPositions = Array.from({ length: content.kallonTowers }).map((_, i) => {
    const angle = (i * 2 * Math.PI) / content.kallonTowers
    const distance = maxRadius * 0.5
    const x = centerX + distance * Math.cos(angle)
    const y = centerY + distance * Math.sin(angle)
    return { x, y, angle }
  })

  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <svg
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        className="w-full h-full"
      >
        <defs>
          <radialGradient id={`coverageGradient-${content.value}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(74, 144, 226, 0.4)" />
            <stop offset="70%" stopColor="rgba(74, 144, 226, 0.1)" />
            <stop offset="100%" stopColor="rgba(74, 144, 226, 0)" />
          </radialGradient>
          <radialGradient id={`detectionGradient-${content.value}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(16, 185, 129, 0.5)" />
            <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
          </radialGradient>
        </defs>

        {/* Main coverage area */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={maxRadius}
          fill="url(#coverageGradient)"
          initial={{ opacity: 0, scale: 0 }}
          animate={isSelected && !isReducedMotion ? {
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1]
          } : { opacity: 0.3, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Coverage radius indicator */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={maxRadius}
          fill="none"
          stroke="rgba(74, 144, 226, 0.4)"
          strokeWidth="2"
          strokeDasharray="4,4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        {/* Kallon tower positions and coverage zones */}
        {towerPositions.map((tower, i) => (
          <g key={`tower-${i}`}>
            {/* Tower coverage radius (15km each) */}
            <motion.circle
              cx={tower.x}
              cy={tower.y}
              r={coverageRadius}
              fill="none"
              stroke="rgba(16, 185, 129, 0.3)"
              strokeWidth="1.5"
              strokeDasharray="3,3"
              initial={{ opacity: 0 }}
              animate={isSelected && !isReducedMotion ? {
                opacity: [0.2, 0.4, 0.2]
              } : { opacity: 0.2 }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />

            {/* Tower detection range (3km each) */}
            <motion.circle
              cx={tower.x}
              cy={tower.y}
              r={detectionRadius}
              fill="url(#detectionGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={isSelected && !isReducedMotion ? {
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              } : { opacity: 0.3, scale: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
            />

            {/* Tower position marker */}
            <motion.circle
              cx={tower.x}
              cy={tower.y}
              r="6"
              fill="rgba(16, 185, 129, 0.9)"
              stroke="white"
              strokeWidth="1.5"
              initial={{ scale: 0 }}
              animate={isSelected && !isReducedMotion ? {
                scale: [1, 1.2, 1]
              } : { scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 1.5, repeat: Infinity }}
            />

            {/* Connection line to center */}
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={tower.x}
              y2={tower.y}
              stroke="rgba(74, 144, 226, 0.2)"
              strokeWidth="1"
              strokeDasharray="2,2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            />
          </g>
        ))}

        {/* Center facility point */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="8"
          fill="rgba(74, 144, 226, 0.9)"
          stroke="white"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={isSelected && !isReducedMotion ? {
            scale: [1, 1.3, 1]
          } : { scale: 1 }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Floating metrics */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="text-2xl md:text-3xl font-black text-primary mb-1"
            animate={isSelected && !isReducedMotion ? {
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {content.radius}km
          </motion.div>
          <div className="text-xs text-muted-foreground/70">
            {content.kallonTowers} towers
          </div>
        </motion.div>
      </div>
    </div>
  )
}

