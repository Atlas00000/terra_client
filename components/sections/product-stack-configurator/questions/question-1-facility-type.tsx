"use client"

import { motion } from "framer-motion"
import { FacilityType } from "../utils/types"
import { FACILITY_CONTENT } from "../utils/facility-content"

interface Question1Props {
  selected: FacilityType | null
  onSelect: (facility: FacilityType) => void
  animationSettings: any
  isReducedMotion: boolean
}

// Fluid clipPath variations
const FLUID_CLIP_PATHS = [
  'polygon(0% 0%, 100% 0%, 100% 85%, 95% 100%, 5% 100%, 0% 90%)',
  'polygon(5% 0%, 100% 0%, 100% 90%, 90% 100%, 0% 100%, 0% 10%)',
  'polygon(0% 5%, 95% 0%, 100% 95%, 100% 100%, 0% 100%, 0% 90%)',
  'polygon(10% 0%, 100% 5%, 95% 100%, 0% 95%, 0% 0%)',
  'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)',
  'polygon(8% 0%, 100% 0%, 100% 92%, 92% 100%, 0% 100%, 0% 8%)',
  'polygon(0% 8%, 92% 0%, 100% 92%, 100% 100%, 0% 100%, 0% 88%)',
  'polygon(8% 0%, 100% 8%, 92% 100%, 0% 92%, 0% 0%)'
]

const selectedClipPath = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

export function Question1FacilityType({ selected, onSelect, animationSettings, isReducedMotion }: Question1Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={animationSettings}
      className="w-full"
    >
      <motion.h3
        className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, ...animationSettings }}
      >
        <span className="block">What infrastructure</span>
        <span className="block bg-gradient-to-r from-primary via-muted-foreground to-primary bg-clip-text text-transparent">
          are you protecting?
        </span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {FACILITY_CONTENT.map((facility, index) => {
          const isSelected = selected === facility.value
          const content = FACILITY_CONTENT.find(f => f.value === facility.value)!
          const clipPath = FLUID_CLIP_PATHS[index % FLUID_CLIP_PATHS.length]
          
          return (
            <motion.button
              key={facility.value}
              onClick={() => onSelect(facility.value as FacilityType)}
              className="relative group overflow-visible"
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.05 * index, ...animationSettings }}
              whileHover={!isReducedMotion ? { 
                scale: 1.03,
                y: -12
              } : {}}
              whileTap={{ scale: 0.97 }}
            >
              {/* Floating gradient orbs - background depth */}
              {!isReducedMotion && [0, 1, 2].map((i) => {
                const hash = (index * 7919 + i * 2654435761) % 1000000
                return (
                  <motion.div
                    key={`orb-${i}`}
                    className="absolute rounded-full blur-2xl opacity-30 -z-10"
                    style={{
                      width: `${120 + i * 60}px`,
                      height: `${120 + i * 60}px`,
                      left: `${(hash % 60) + 20}%`,
                      top: `${((hash * 7) % 60) + 20}%`,
                      background: `radial-gradient(circle, rgba(74, 144, 226, 0.4), transparent)`
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.2, 0.4, 0.2],
                      x: [0, 30, 0],
                      y: [0, 20, 0]
                    }}
                    transition={{
                      duration: 8 + i * 2,
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
                  className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-0 ${
                    isSelected ? 'opacity-25' : 'group-hover:opacity-15'
                  }`}
                  style={{
                    clipPath: isSelected ? selectedClipPath : clipPath
                  }}
                  animate={isSelected && !isReducedMotion ? {
                    opacity: [0.25, 0.35, 0.25],
                    scale: [1, 1.02, 1]
                  } : {}}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Flowing gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-0 ${
                    isSelected ? 'opacity-15' : 'group-hover:opacity-8'
                  }`}
                  style={{
                    clipPath: isSelected ? selectedClipPath : clipPath,
                    maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
                    WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
                  }}
                  animate={isSelected && !isReducedMotion ? {
                    x: ['-20%', '120%'],
                    opacity: [0.15, 0.25, 0.15]
                  } : {}}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Glassmorphism fluid surface */}
                <div
                  className={`
                    relative z-10 p-6 md:p-8
                    backdrop-blur-2xl
                    ${isSelected 
                      ? 'bg-gradient-to-br from-primary/25 via-primary/15 to-transparent' 
                      : 'bg-gradient-to-br from-white/8 via-white/5 to-transparent'
                    }
                    transition-all duration-700
                    flex flex-col
                    min-h-[240px]
                  `}
                  style={{
                    clipPath: isSelected ? selectedClipPath : clipPath
                  }}
                >
                  {/* Animated border glow */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${content.gradient} opacity-0 ${
                      isSelected ? 'opacity-30' : 'group-hover:opacity-15'
                    }`}
                    style={{
                      clipPath: isSelected ? selectedClipPath : clipPath,
                      maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                    }}
                    animate={isSelected && !isReducedMotion ? {
                      x: ['-100%', '100%']
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Floating particles */}
                  {!isReducedMotion && Array.from({ length: 5 }).map((_, i) => {
                    const hash = (index * 2654435761 + i * 7919) % 1000000
                    return (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute w-1 h-1 bg-primary rounded-full"
                        style={{
                          left: `${(hash % 80) + 10}%`,
                          top: `${((hash * 7) % 80) + 10}%`,
                          boxShadow: '0 0 8px rgba(74, 144, 226, 0.6)'
                        }}
                        animate={{
                          y: [0, -40, 0],
                          opacity: [0, 0.8, 0],
                          scale: [0, 1.5, 0],
                          x: [0, (i % 2 === 0 ? 15 : -15), 0]
                        }}
                        transition={{
                          duration: 3 + i * 0.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: 'easeInOut'
                        }}
                      />
                    )
                  })}

                  {/* Content */}
                  <div className="relative z-20 space-y-4 flex-1">
                    <motion.div
                      className="text-2xl md:text-3xl font-black text-foreground leading-tight"
                      animate={isSelected && !isReducedMotion ? {
                        scale: [1, 1.02, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {content.label}
                    </motion.div>
                    
                    <div className="text-sm md:text-base text-muted-foreground/90 leading-relaxed font-medium">
                      {content.description}
                    </div>

                    {/* Recommended stack preview */}
                    <div className="pt-3 border-t border-white/10">
                      <div className="text-xs font-semibold text-primary/90 uppercase tracking-wider mb-2">
                        Recommended Stack
                      </div>
                      <div className="text-xs text-foreground/70 font-mono leading-relaxed">
                        {content.recommendedStack}
                      </div>
                    </div>
                  </div>

                  {/* Selection indicator - fluid design */}
                  {isSelected && (
                    <motion.div
                      className="absolute top-6 right-6"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <motion.div
                        className="w-12 h-12 bg-primary flex items-center justify-center shadow-2xl"
                        style={{
                          clipPath: 'polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%)'
                        }}
                        animate={!isReducedMotion ? {
                          scale: [1, 1.15, 1],
                          rotate: [0, 5, -5, 0]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Hover glow effect */}
                  {!isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:via-primary/10 group-hover:to-primary/5"
                      style={{
                        clipPath: clipPath
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>
    </motion.div>
  )
}
