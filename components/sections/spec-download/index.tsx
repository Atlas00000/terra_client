"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { SPEC_RESOURCES, SpecResource } from "./data"
import { ResourceCard } from "./resource-card"
import { SpecForm } from "./spec-form"

export function TechnicalSpecsDownloadSection() {
  const { isReducedMotion, getAnimationSettings } = useMobileOptimization()
  const animationSettings = getAnimationSettings()
  const [activeResource, setActiveResource] = useState<SpecResource | null>(null)

  return (
    <section className="relative py-24 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(9,12,26,0.95),_rgba(3,7,18,1))] text-white">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(135deg, rgba(88,179,255,0.08) 0%, transparent 60%),
              linear-gradient(225deg, rgba(255,147,54,0.08) 0%, transparent 60%)
            `
          }}
          animate={!isReducedMotion ? { opacity: [0.25, 0.45, 0.25] } : { opacity: 0.35 }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6 space-y-16">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationSettings}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-xs tracking-[0.4rem] uppercase text-white/60">
            Technical Specs Download
          </div>
          <h2 className="text-4xl md:text-6xl font-black">
            Access the <span className="text-primary">Complete Stack Manual</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto">
            300+ pages of real ArtemisOS deployments, UAV flight data, ROI financial models, and integrations—available as secured downloads once you share your work email.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationSettings}
        >
          {SPEC_RESOURCES.map(resource => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onClick={setActiveResource}
              isReducedMotion={isReducedMotion}
            />
          ))}
        </motion.div>
      </div>

      <SpecForm resource={activeResource} onClose={() => setActiveResource(null)} isReducedMotion={isReducedMotion} />
    </section>
  )
}

