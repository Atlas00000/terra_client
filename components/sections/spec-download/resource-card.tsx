"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { SpecResource } from "./data"

interface ResourceCardProps {
  resource: SpecResource
  onClick: (resource: SpecResource) => void
  isReducedMotion: boolean
}

export function ResourceCard({ resource, onClick, isReducedMotion }: ResourceCardProps) {
  return (
    <motion.button
      className="relative rounded-[32px] overflow-hidden backdrop-blur-xl text-left"
      style={{
        background: "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.08), transparent 70%)",
        border: "1px solid rgba(255,255,255,0.08)"
      }}
      onClick={() => onClick(resource)}
      whileHover={!isReducedMotion ? { scale: 1.02 } : {}}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40 z-10" />
      <Image
        src={resource.thumbnail}
        alt={resource.title}
        width={600}
        height={400}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 text-xs font-semibold tracking-widest uppercase text-white/80">
          {resource.badge} • {resource.format}
        </div>
        <div className="flex items-center justify-between text-white/80 text-xs">
          <span>{resource.size}</span>
        </div>
        <h3 className="text-2xl font-black text-white">{resource.title}</h3>
        <p className="text-white/80 text-sm">{resource.description}</p>
      </div>
    </motion.button>
  )
}

