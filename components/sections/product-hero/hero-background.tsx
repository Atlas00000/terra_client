"use client"

import { motion } from "framer-motion"
import { useId } from "react"

interface HeroBackgroundProps {
  accent: string
  isReducedMotion: boolean
}

export function HeroBackground({ accent, isReducedMotion }: HeroBackgroundProps) {
  const noiseId = useId()

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(3,7,18,0.95) 0%, rgba(3,7,18,0.85) 40%, rgba(3,7,18,0.6) 100%)"
        }}
      />

      {/* Accent bloom */}
      <div
        className="absolute -inset-32 blur-[120px] opacity-50"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accent}, transparent 55%)`
        }}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      {/* Particles */}
      {Array.from({ length: 12 }).map((_, idx) => {
        const left = (idx * 73) % 100
        const top = (idx * 137) % 100
        return (
          <motion.div
            key={`${noiseId}-${idx}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              backgroundColor: "rgba(255,255,255,0.35)",
              boxShadow: `0 0 10px ${accent}`
            }}
            animate={!isReducedMotion ? {
              y: [0, -20, 0],
              opacity: [0.1, 0.6, 0.1]
            } : { opacity: 0.3 }}
            transition={{
              duration: 6 + idx * 0.2,
              repeat: Infinity,
              delay: idx * 0.1
            }}
          />
        )
      })}
    </div>
  )
}

