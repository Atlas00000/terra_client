"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { CaseStudy } from "./data"

interface CaseStudyCardProps {
  study: CaseStudy
  isReducedMotion: boolean
}

function CaseStudyCardComponent({ study, isReducedMotion }: CaseStudyCardProps) {
  return (
    <motion.div
      className="relative rounded-[32px] overflow-hidden backdrop-blur-xl h-full min-h-[340px]"
      style={{
        background: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08), transparent 70%)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
      whileHover={!isReducedMotion ? { scale: 1.02 } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-transparent to-black/25 z-10" />
      <Image
        src={study.media.image}
        alt={study.media.alt}
        width={960}
        height={640}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        className="w-full h-full object-cover object-center scale-105"
      />
      <div className="absolute inset-0 z-20 p-6 space-y-4 flex flex-col justify-end">
        <div className="text-xs uppercase tracking-widest text-white/70">{study.location}</div>
        <h3 className="text-2xl font-black text-white">{study.title}</h3>
        <p className="text-white/80 text-sm leading-relaxed">{study.narrative}</p>
        <div className="space-y-2">
          {study.outcomes.map(outcome => (
            <div key={outcome} className="flex items-center gap-2 text-white/80 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
              {outcome}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export const CaseStudyCard = memo(CaseStudyCardComponent)

