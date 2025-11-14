"use client"

import { motion } from "framer-motion"
import { DataStorage } from "../utils/scoring"

interface Question4Props {
  selected: DataStorage | null
  onSelect: (value: DataStorage) => void
  onNext: () => void
  onBack: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function Question4DataStorage({ selected, onSelect, onNext, onBack, animationSettings, isReducedMotion }: Question4Props) {
  const options: { value: DataStorage; label: string; description: string; badges: string[] }[] = [
    { 
      value: "on-premise", 
      label: "On-Premise Only", 
      description: "Data sovereignty requirements", 
      badges: ["Data Sovereignty"] 
    },
    { 
      value: "cloud", 
      label: "Cloud-Enabled", 
      description: "Artemis Cloud compatible", 
      badges: ["Artemis Cloud", "Scalable"] 
    },
    { 
      value: "hybrid", 
      label: "Hybrid", 
      description: "On-premise + cloud combination", 
      badges: ["Flexible"] 
    },
    { 
      value: "compliance", 
      label: "Compliance-Specific", 
      description: "ISO, NIST, or government standards", 
      badges: ["ISO", "NIST", "Compliant"] 
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
        What are your data storage requirements?
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
              
              <div className="flex flex-wrap gap-2">
                {option.badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {badge}
                  </span>
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

