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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {FACILITY_CONTENT.map((facility, index) => {
          const isSelected = selected === facility.value
          const content = FACILITY_CONTENT.find(f => f.value === facility.value)!
          
          return (
            <motion.button
              key={facility.value}
              onClick={() => onSelect(facility.value as FacilityType)}
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
              {/* Fluid gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${content.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  isSelected ? 'opacity-30' : ''
                }`}
                animate={isSelected && !isReducedMotion ? {
                  opacity: [0.3, 0.4, 0.3]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Glassmorphism card - no borders, fluid shape */}
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

                {/* Floating particles */}
                {!isReducedMotion && [0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary/40 rounded-full"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{
                      duration: 2 + i,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <motion.div
                    className="text-2xl md:text-3xl font-black text-foreground leading-tight"
                    animate={isSelected && !isReducedMotion ? {
                      scale: [1, 1.02, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {content.label}
                  </motion.div>
                  
                  <div className="text-sm md:text-base text-muted-foreground/80 leading-relaxed">
                    {content.description}
                  </div>

                  {/* Real use case from MD files */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
                      Real Use Case
                    </div>
                    <div className="text-xs text-muted-foreground/70 leading-relaxed">
                      {content.useCase}
                    </div>
                  </div>

                  {/* Recommended stack preview */}
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
                      Recommended Stack
                    </div>
                    <div className="text-xs text-foreground/60 font-mono">
                      {content.recommendedStack}
                    </div>
                  </div>
                </div>

                {/* Selection indicator - fluid shape */}
                {isSelected && (
                  <motion.div
                    className="absolute top-4 right-4 w-8 h-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <motion.div
                      className="w-full h-full bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/50"
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
