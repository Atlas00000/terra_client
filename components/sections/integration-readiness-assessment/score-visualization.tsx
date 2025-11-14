"use client"

import { motion } from "framer-motion"
import { ReadinessScore } from "./utils/scoring"

interface ScoreVisualizationProps {
  score: ReadinessScore | null
  animationSettings: any
  isReducedMotion: boolean
}

export function ScoreVisualization({ score, animationSettings, isReducedMotion }: ScoreVisualizationProps) {
  if (!score) {
    return (
      <motion.div
        className="sticky top-24 p-6 rounded-2xl bg-card/30 border border-border/20 backdrop-blur-sm"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={animationSettings}
      >
        <div className="text-center text-muted-foreground text-sm">
          Complete questions to see your readiness score
        </div>
      </motion.div>
    )
  }

  const colorMap = {
    high: "from-green-500 to-emerald-500",
    medium: "from-yellow-500 to-orange-500",
    low: "from-orange-500 to-red-500",
    "very-low": "from-red-500 to-pink-500"
  }

  const levelLabels = {
    high: "High Readiness",
    medium: "Medium Readiness",
    low: "Low Readiness",
    "very-low": "Very Low Readiness"
  }

  return (
    <motion.div
      className="sticky top-24 p-6 rounded-2xl bg-card/30 border border-border/20 backdrop-blur-sm"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={animationSettings}
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="text-sm text-muted-foreground mb-2">Readiness Score</div>
          <motion.div
            className={`text-5xl font-black bg-gradient-to-r ${colorMap[score.level]} bg-clip-text text-transparent`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            {score.score}
          </motion.div>
          <div className={`text-sm font-medium mt-2 bg-gradient-to-r ${colorMap[score.level]} bg-clip-text text-transparent`}>
            {levelLabels[score.level]}
          </div>
        </div>

        {/* Score Meter */}
        <div className="relative h-4 bg-muted-foreground/20 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${colorMap[score.level]} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${score.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>

        {/* Timeline */}
        <div className="text-center pt-4 border-t border-border/20">
          <div className="text-xs text-muted-foreground mb-1">Estimated Timeline</div>
          <div className="text-lg font-bold text-foreground">{score.timeline}</div>
        </div>
      </div>
    </motion.div>
  )
}

