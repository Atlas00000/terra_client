"use client"

import { motion } from "framer-motion"
import { ExistingSystems } from "../utils/scoring"

interface Question1Props {
  selected: ExistingSystems | null
  onSelect: (value: ExistingSystems) => void
  onNext: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function Question1ExistingSystems({ selected, onSelect, onNext, animationSettings, isReducedMotion }: Question1Props) {
  const options: { value: ExistingSystems; label: string; icon: string; description: string }[] = [
    { value: "cctv", label: "CCTV Systems", icon: "📹", description: "Video surveillance cameras" },
    { value: "access-control", label: "Access Control", icon: "🔐", description: "Door locks and access systems" },
    { value: "perimeter-sensors", label: "Perimeter Sensors", icon: "📡", description: "Motion and intrusion sensors" },
    { value: "multiple", label: "Multiple Systems", icon: "🔗", description: "Combination of security systems" },
    { value: "none", label: "No Existing Systems", icon: "🆕", description: "Starting fresh" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={animationSettings}
    >
      <motion.button
        onClick={() => {}}
        className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors opacity-0 pointer-events-none"
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
        Do you have existing security systems?
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="space-y-3">
              <div className="text-4xl mb-2">{option.icon}</div>
              <div className="text-xl font-bold text-foreground">{option.label}</div>
              <div className="text-sm text-muted-foreground">{option.description}</div>
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

