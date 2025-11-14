"use client"

import { motion } from "framer-motion"
import { NetworkInfrastructure } from "../utils/scoring"

interface Question2Props {
  selected: NetworkInfrastructure | null
  onSelect: (value: NetworkInfrastructure) => void
  onNext: () => void
  onBack: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function Question2NetworkInfrastructure({ selected, onSelect, onNext, onBack, animationSettings, isReducedMotion }: Question2Props) {
  const options: { value: NetworkInfrastructure; label: string; description: string; color: string }[] = [
    { value: "dedicated", label: "Dedicated Security Network", description: "Fiber/Ethernet dedicated to security", color: "from-green-500 to-emerald-500" },
    { value: "shared", label: "Shared Corporate Network", description: "Security shares network with other systems", color: "from-yellow-500 to-orange-500" },
    { value: "limited", label: "Limited Connectivity", description: "Satellite/4G connectivity", color: "from-orange-500 to-red-500" },
    { value: "none", label: "No Network Infrastructure", description: "No existing network setup", color: "from-red-500 to-pink-500" }
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
        What is your current network setup?
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option, index) => (
          <motion.button
            key={option.value}
            onClick={() => {
              onSelect(option.value)
              setTimeout(onNext, 300)
            }}
            className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 text-left overflow-hidden ${
              selected === option.value
                ? 'border-primary shadow-lg shadow-primary/20'
                : 'border-border/20 hover:border-primary/50'
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, ...animationSettings }}
            whileHover={!isReducedMotion ? { scale: 1.02, y: -4 } : {}}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity ${
                selected === option.value ? 'opacity-20' : ''
              }`}
            />
            
            <div className="relative z-10 space-y-3">
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

