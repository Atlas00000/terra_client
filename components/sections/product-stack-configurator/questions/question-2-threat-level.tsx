"use client"

import { motion } from "framer-motion"
import { ThreatLevel, FacilityType } from "../utils/types"
import { THREAT_CONTENT } from "../utils/threat-content"

interface Question2Props {
  facilityType: FacilityType
  selected: ThreatLevel | null
  onSelect: (threat: ThreatLevel) => void
  onBack: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function Question2ThreatLevel({ facilityType, selected, onSelect, onBack, animationSettings, isReducedMotion }: Question2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={animationSettings}
      className="w-full"
    >
      {/* Back button - fluid design */}
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
        <span className="block">What's your primary</span>
        <span className="block bg-gradient-to-r from-primary via-muted-foreground to-primary bg-clip-text text-transparent">
          threat concern?
        </span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {THREAT_CONTENT.map((threat, index) => {
          const isSelected = selected === threat.value
          const content = THREAT_CONTENT.find(t => t.value === threat.value)!

          return (
            <motion.button
              key={threat.value}
              onClick={() => onSelect(threat.value as ThreatLevel)}
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
                min-h-[280px] flex flex-col
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

                {/* Content */}
                <div className="relative z-10 space-y-4 flex-1">
                  <motion.div
                    className="text-xl md:text-2xl font-black text-foreground leading-tight"
                    animate={isSelected && !isReducedMotion ? {
                      scale: [1, 1.02, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {content.label}
                  </motion.div>
                  
                  <div className="text-sm text-muted-foreground/80 leading-relaxed">
                    {content.description}
                  </div>

                  {/* Scenario from product specs */}
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-2">
                      Scenario
                    </div>
                    <div className="text-xs text-muted-foreground/70 leading-relaxed">
                      {content.scenario}
                    </div>
                  </div>

                  {/* Product response */}
                  <div className="pt-2">
                    <div className="text-xs font-semibold text-primary/80 uppercase tracking-wider mb-1">
                      Product Response
                    </div>
                    <div className="text-xs text-foreground/60 font-mono leading-relaxed">
                      {content.productResponse}
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
