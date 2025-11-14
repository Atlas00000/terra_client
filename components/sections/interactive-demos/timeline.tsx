"use client"

import { memo, useState } from "react"
import { motion } from "framer-motion"
import { SURVEILLANCE_SEGMENTS } from "./data"

interface TimelineProps {
  isReducedMotion: boolean
}

function SurveillanceTimelineComponent({ isReducedMotion }: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSegment = SURVEILLANCE_SEGMENTS[activeIndex]

  return (
    <div
      className="rounded-[32px] overflow-hidden"
      style={{
        background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 65%)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      <div className="grid md:grid-cols-[200px,1fr] divide-y md:divide-y-0 md:divide-x divide-white/5">
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible bg-white/5/">
          {SURVEILLANCE_SEGMENTS.map((segment, index) => {
            const isActive = index === activeIndex
            return (
              <button
                key={segment.label}
                onClick={() => setActiveIndex(index)}
                className={`flex-1 md:flex-none md:w-full px-4 py-4 transition text-left ${
                  isActive ? "bg-white/10 text-white" : "text-white/60 hover:text-white"
                }`}
              >
                <div className="text-xs uppercase tracking-widest">{segment.label}</div>
                <div className="text-sm font-bold">{segment.window}</div>
              </button>
            )
          })}
        </div>
        <motion.div
          key={activeSegment.label}
          className="p-6 space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: isReducedMotion ? 0 : 0.4 }}
        >
          <h4 className="text-white text-lg font-bold">{activeSegment.objective}</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {activeSegment.telemetry.map(point => (
              <li key={point} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export const SurveillanceTimeline = memo(SurveillanceTimelineComponent)

