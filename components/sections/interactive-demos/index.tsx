"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { SurveillanceTimeline } from "./timeline"
import { CASE_STUDIES } from "./data"
import { CaseStudyCard } from "./case-study-card"

export function InteractiveDemosSection() {
  const { isReducedMotion, getAnimationSettings } = useMobileOptimization()
  const animationSettings = getAnimationSettings()

  return (
    <section id="interactive-demos" className="relative py-24 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(9,18,35,0.9),_rgba(3,7,18,1))] text-white">
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(3,7,18,0.65), transparent 55%),
            radial-gradient(circle at 75% 20%, rgba(3,7,18,0.5), transparent 45%)
          `
        }}
      />

      <div className="relative z-10 max-w-[80vw] mx-auto px-6 space-y-16">
        <motion.div
          className="text-center space-y-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-xs tracking-[0.4rem] uppercase text-white/70">
            Live Demo
          </div>
          <h2 className="text-4xl md:text-6xl font-black">
            8-Hour Surveillance, <span className="text-primary">Proven Live</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto">
            Iroko UAV meshes with ArtemisOS, Archer VTOL, and Kallon towers to deliver uninterrupted ISR loops, real deployment telemetry, and actionable footage across Africa’s highest-value corridors.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-[0.45fr,0.55fr] gap-12 items-start"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationSettings}
        >
          <div className="space-y-6">
            <div
              className="rounded-[36px] backdrop-blur-xl p-6 space-y-4"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent 70%)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <h3 className="text-2xl font-black">Flight Timeline</h3>
              <p className="text-sm text-white/70">Follow a single Iroko mission covering hydro plants, border segments, and returns to ArtemisOS command for the next sortie.</p>
              <SurveillanceTimeline isReducedMotion={isReducedMotion} />
            </div>
            <motion.div
              className="rounded-[36px] p-6"
              style={{
                background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 70%)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-xs uppercase tracking-[0.5rem] text-white/60 mb-2">Iroko Production</div>
              <div className="text-4xl font-black">20 units / day</div>
              <p className="text-white/70 text-sm mt-2">Built in Abuja, exported across ECOWAS. Ready for your facility within 6 weeks.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-widest">LTE/5G</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-widest">Multi-spectral</span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-widest">Thermal ISR</span>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {CASE_STUDIES.map(study => (
                <CaseStudyCard key={study.id} study={study} isReducedMotion={isReducedMotion} />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/#rfq"
            className="relative px-10 py-4 rounded-full bg-white text-slate-900 font-black tracking-wide overflow-hidden"
            whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
          >
            See Iroko in Action
          </motion.a>
          <a
            href="/news"
            className="px-10 py-4 rounded-full border border-white/30 text-white/80 hover:bg-white/10"
          >
            Watch Deployment Footage
          </a>
        </motion.div>
      </div>
    </section>
  )
}

