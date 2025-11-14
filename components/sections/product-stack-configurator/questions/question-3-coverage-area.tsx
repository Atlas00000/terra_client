"use client"

import { motion } from "framer-motion"
import { CoverageArea, FacilityType, ThreatLevel } from "../utils/types"
import { COVERAGE_CONTENT } from "../utils/coverage-content"

interface Question3Props {
  facilityType: FacilityType
  threatLevel: ThreatLevel
  selected: CoverageArea | null
  onSelect: (coverage: CoverageArea) => void
  onBack: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function Question3CoverageArea({ facilityType, threatLevel, selected, onSelect, onBack, animationSettings, isReducedMotion }: Question3Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={animationSettings}
      className="w-full"
    >
      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="mb-8 flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, ...animationSettings }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30"
          whileHover={!isReducedMotion ? { scale: 1.1, rotate: -5 } : {}}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.div>
        <span className="font-medium">Back</span>
      </motion.button>

      <motion.h3
        className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...animationSettings }}
      >
        <span className="block">What's your</span>
        <span className="block bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          coverage area?
        </span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {COVERAGE_CONTENT.map((option, index) => {
          const isSelected = selected === option.value
          const content = COVERAGE_CONTENT.find(c => c.value === option.value)!
          const maxRadius = 80 // Max visual radius in pixels

          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value as CoverageArea)}
              className="relative group overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.05 * index, ...animationSettings }}
              whileHover={!isReducedMotion ? { 
                scale: 1.05, 
                y: -8,
                rotateY: 5
              } : {}}
              whileTap={{ scale: 0.98 }}
            >
              {/* Dynamic gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  isSelected ? 'opacity-30' : ''
                }`}
                animate={isSelected && !isReducedMotion ? {
                  opacity: [0.3, 0.4, 0.3]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Glassmorphism card */}
              <div className={`
                relative z-10 p-6 md:p-8
                backdrop-blur-xl bg-gradient-to-br
                ${isSelected 
                  ? 'from-primary/20 via-primary/10 to-transparent' 
                  : 'from-white/5 via-white/5 to-transparent'
                }
                border-0
                ${isSelected ? 'shadow-2xl shadow-primary/30' : 'shadow-lg shadow-black/10'}
                transition-all duration-500
                min-h-[320px] flex flex-col items-center
              `}
              style={{
                clipPath: isSelected 
                  ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  : 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)'
              }}
              >
                {/* Animated border gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-0 ${
                    isSelected ? 'opacity-20' : 'group-hover:opacity-10'
                  }`}
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                  }}
                  animate={isSelected && !isReducedMotion ? {
                    x: ['-100%', '100%']
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                {/* Coverage visualization - dynamic circles */}
                <div className="relative w-full h-32 flex items-center justify-center mb-6">
                  {/* Base coverage circle */}
                  <motion.div
                    className={`absolute rounded-full border-2 ${
                      isSelected ? 'border-primary' : 'border-white/20'
                    }`}
                    style={{
                      width: `${Math.min((content.radius / 75) * maxRadius, maxRadius)}px`,
                      height: `${Math.min((content.radius / 75) * maxRadius, maxRadius)}px`
                    }}
                    animate={isSelected && !isReducedMotion ? {
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Kallon detection range (3km) - inner circle */}
                  <motion.div
                    className="absolute rounded-full border border-primary/40"
                    style={{
                      width: `${Math.min((3 / 75) * maxRadius, maxRadius * 0.4)}px`,
                      height: `${Math.min((3 / 75) * maxRadius, maxRadius * 0.4)}px`
                    }}
                    animate={!isReducedMotion ? {
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.6, 0.3]
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  {/* Center point */}
                  <motion.div
                    className="absolute w-3 h-3 rounded-full bg-primary"
                    animate={isSelected && !isReducedMotion ? {
                      scale: [1, 1.3, 1]
                    } : {}}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4 w-full text-center">
                  <motion.div
                    className="text-3xl md:text-4xl font-black text-primary"
                    animate={isSelected && !isReducedMotion ? {
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {content.label}
                  </motion.div>
                  
                  <div className="text-sm text-muted-foreground/80">
                    {content.description}
                  </div>

                  {/* Real specs from product documentation */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
                      Kallon Tower Specs
                    </div>
                    <div className="text-xs text-muted-foreground/70 leading-relaxed">
                      {content.kallonTowers} towers needed | 3km detection | 15km coverage radius
                    </div>
                  </div>

                  {/* Real example */}
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
                      Real Example
                    </div>
                    <div className="text-xs text-foreground/60 leading-relaxed">
                      {content.realExample}
                    </div>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className={`w-full h-full bg-gradient-to-br ${content.gradient} rounded-full flex items-center justify-center shadow-lg`}
                      animate={!isReducedMotion ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
