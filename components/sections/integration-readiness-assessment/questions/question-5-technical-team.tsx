"use client"

import { motion } from "framer-motion"
import { TechnicalTeam } from "../utils/scoring"

interface Question5Props {
  selected: TechnicalTeam | null
  onSelect: (value: TechnicalTeam) => void
  onNext: () => void
  onBack: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function Question5TechnicalTeam({ selected, onSelect, onNext, onBack, animationSettings, isReducedMotion }: Question5Props) {
  const options: { value: TechnicalTeam; label: string; description: string; skillLevel: number }[] = [
    { 
      value: "full-it", 
      label: "Full IT Team", 
      description: "Dedicated security/IT staff", 
      skillLevel: 5 
    },
    { 
      value: "limited-it", 
      label: "Limited IT Support", 
      description: "Shared IT resources", 
      skillLevel: 3 
    },
    { 
      value: "external-vendor", 
      label: "External Vendor", 
      description: "Managed services provider", 
      skillLevel: 2 
    },
    { 
      value: "no-team", 
      label: "No Technical Team", 
      description: "Requires extensive training", 
      skillLevel: 1 
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={animationSettings}
    >
      <motion.button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </motion.button>

      <motion.h3
        className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...animationSettings }}
      >
        What is your in-house technical capability?
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => {
              onSelect(option.value)
              setTimeout(onNext, 300)
            }}
            className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
              selected === option.value
                ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                : 'border-border/20 bg-card/30 hover:border-primary/50 hover:bg-card/50'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, ...animationSettings }}
            whileHover={!isReducedMotion ? { scale: 1.02, y: -4 } : {}}
            whileTap={{ scale: 0.98 }}
          >
            <div className="space-y-4">
              <div>
                <div className="text-xl font-bold text-foreground mb-2">{option.label}</div>
                <div className="text-sm text-muted-foreground">{option.description}</div>
              </div>
              
              {/* Skill Level Visualization */}
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <motion.div
                    key={level}
                    className={`h-2 flex-1 rounded-full ${
                      level <= option.skillLevel
                        ? 'bg-gradient-to-r from-primary to-green-400'
                        : 'bg-muted-foreground/20'
                    }`}
                    animate={selected === option.value && !isReducedMotion ? {
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ duration: 0.5, delay: level * 0.1, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>

            {selected === option.value && (
              <motion.div
                className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

