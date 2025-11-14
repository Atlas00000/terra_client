"use client"

import { motion } from "framer-motion"
import { CoverageArea, FacilityType, ThreatLevel } from "../utils/types"
import { COVERAGE_CONTENT } from "../utils/coverage-content"
import { CoverageCard } from "../components/coverage-card"

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
        <span className="block bg-gradient-to-r from-primary via-muted-foreground to-primary bg-clip-text text-transparent">
          coverage area?
        </span>
      </motion.h3>

      {/* Fluid grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {COVERAGE_CONTENT.map((option, index) => {
          const isSelected = selected === option.value
          const content = COVERAGE_CONTENT.find(c => c.value === option.value)!

          return (
            <CoverageCard
              key={option.value}
              content={content}
              isSelected={isSelected}
              onSelect={() => onSelect(option.value as CoverageArea)}
              index={index}
              animationSettings={animationSettings}
              isReducedMotion={isReducedMotion}
            />
          )
        })}
      </div>
    </motion.div>
  )
}
