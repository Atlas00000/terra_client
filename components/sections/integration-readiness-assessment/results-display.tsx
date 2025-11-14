"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ReadinessScore, AssessmentState } from "./utils/scoring"
import { InquiryFormModal } from "./components/inquiry-form-modal"

interface ResultsDisplayProps {
  score: ReadinessScore
  state: AssessmentState & { currentQuestion: number }
  onReset: () => void
  animationSettings: any
  isReducedMotion: boolean
}

export function ResultsDisplay({ score, state, onReset, animationSettings, isReducedMotion }: ResultsDisplayProps) {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false)
  const getRecommendations = () => {
    const recommendations = []
    
    if (score.level === "high") {
      recommendations.push({
        title: "ArtemisOS Cloud Deployment",
        description: "Recommended for your high readiness score. Cloud deployment offers fastest setup and scalability.",
        icon: "☁️"
      })
    } else if (score.level === "medium") {
      recommendations.push({
        title: "Hybrid Deployment",
        description: "Combination of on-premise and cloud for optimal balance of control and scalability.",
        icon: "🔗"
      })
    } else {
      recommendations.push({
        title: "On-Premise Deployment",
        description: "Recommended for your current infrastructure. Provides full control and data sovereignty.",
        icon: "🏢"
      })
    }

    if (state.integrationRequirements.length > 0 && !state.integrationRequirements.includes("standalone")) {
      recommendations.push({
        title: "API Integration Required",
        description: "ArtemisOS provides open API and SDK for seamless integration with your existing systems.",
        icon: "🔌"
      })
    }

    if (state.technicalTeam === "no-team" || state.technicalTeam === "external-vendor") {
      recommendations.push({
        title: "Training Program Recommended",
        description: "2-3 days basic training, 1-2 weeks advanced training available. Certification programs included.",
        icon: "📚"
      })
    }

    return recommendations
  }

  const getPhases = () => {
    const phases = []
    const { min, max } = score.weeks
    
    if (score.level === "high") {
      phases.push(
        { phase: "Phase 1", weeks: `${min}-${min + 2}`, description: "Network setup, ArtemisOS installation" },
        { phase: "Phase 2", weeks: `${min + 2}-${min + 6}`, description: "Product deployment" },
        { phase: "Phase 3", weeks: `${min + 6}-${min + 10}`, description: "Integration testing" },
        { phase: "Phase 4", weeks: `${min + 10}-${max}`, description: "Training and go-live" }
      )
    } else if (score.level === "medium") {
      phases.push(
        { phase: "Phase 1", weeks: `${min}-${min + 4}`, description: "Infrastructure preparation" },
        { phase: "Phase 2", weeks: `${min + 4}-${min + 10}`, description: "System installation" },
        { phase: "Phase 3", weeks: `${min + 10}-${min + 16}`, description: "Integration and testing" },
        { phase: "Phase 4", weeks: `${min + 16}-${max}`, description: "Training and deployment" }
      )
    } else {
      phases.push(
        { phase: "Phase 1", weeks: `${min}-${min + 6}`, description: "Infrastructure and network setup" },
        { phase: "Phase 2", weeks: `${min + 6}-${min + 14}`, description: "System installation and configuration" },
        { phase: "Phase 3", weeks: `${min + 14}-${min + 22}`, description: "Integration, testing, training" },
        { phase: "Phase 4", weeks: `${min + 22}-${max}`, description: "Deployment and optimization" }
      )
    }
    return phases
  }

  const recommendations = getRecommendations()
  const phases = getPhases()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={animationSettings}
      className="max-w-6xl mx-auto mt-12"
    >
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...animationSettings }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Your Integration Readiness Assessment
        </h3>
        <p className="text-lg text-muted-foreground">
          Based on your answers, here's your personalized integration plan
        </p>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, ...animationSettings }}
      >
        <h4 className="text-xl font-bold text-foreground mb-6">Recommended Approach</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, ...animationSettings }}
              whileHover={!isReducedMotion ? { scale: 1.05, y: -4 } : {}}
            >
              <div className="text-4xl mb-4">{rec.icon}</div>
              <div className="text-lg font-bold text-foreground mb-2">{rec.title}</div>
              <div className="text-sm text-muted-foreground">{rec.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Timeline Phases */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ...animationSettings }}
      >
        <h4 className="text-xl font-bold text-foreground mb-6">Deployment Timeline</h4>
        <div className="space-y-4">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              className="p-6 rounded-2xl bg-card/50 border border-border/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, ...animationSettings }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">{phase.phase}</div>
                    <div className="text-sm text-muted-foreground">{phase.description}</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary">Weeks {phase.weeks}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, ...animationSettings }}
      >
        <motion.button
          onClick={() => setIsInquiryModalOpen(true)}
          className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors"
          whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          Get Integration Plan
        </motion.button>
        <motion.button
          onClick={onReset}
          className="px-8 py-4 rounded-xl border-2 border-border text-foreground font-bold hover:bg-card/50 transition-colors"
          whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
        >
          Start Over
        </motion.button>
      </motion.div>

      {/* Inquiry Form Modal */}
      <InquiryFormModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        score={score}
        assessmentState={state}
        animationSettings={animationSettings}
        isReducedMotion={isReducedMotion}
      />
    </motion.div>
  )
}

