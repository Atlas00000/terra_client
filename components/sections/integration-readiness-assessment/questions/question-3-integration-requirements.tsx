"use client"

import { motion } from "framer-motion"
import { IntegrationRequirement } from "../utils/scoring"

interface Question3Props {
  selected: IntegrationRequirement[]
  onSelect: (value: IntegrationRequirement) => void
  onNext: () => void
  onBack: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function Question3IntegrationRequirements({ selected, onSelect, onNext, onBack, animationSettings, isReducedMotion }: Question3Props) {
  const options: { value: IntegrationRequirement; label: string; icon: string; description: string }[] = [
    { value: "erp", label: "ERP Systems", icon: "📊", description: "SAP, Oracle, or similar" },
    { value: "scada", label: "SCADA Systems", icon: "⚙️", description: "Industrial control systems" },
    { value: "building-management", label: "Building Management", icon: "🏢", description: "BMS integration" },
    { value: "cloud-services", label: "Cloud Services", icon: "☁️", description: "AWS, Azure, or similar" },
    { value: "standalone", label: "Standalone Operation", icon: "🔌", description: "No integration needed" }
  ]

  const hasSelection = selected.length > 0

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
        className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...animationSettings }}
      >
        Do you need integration with existing systems?
      </motion.h3>

      <motion.p
        className="text-center text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Select all that apply
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {options.map((option, index) => {
          const isSelected = selected.includes(option.value)
          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                isSelected
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
              
              {isSelected && (
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
          )
        })}
      </div>

      {hasSelection && (
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={onNext}
            className="px-8 py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
            whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
          >
            Continue
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}

