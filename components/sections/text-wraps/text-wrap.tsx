"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { TextWrapContent } from "./data"

interface TextWrapProps {
  content: TextWrapContent
}

function TextWrapComponent({ content }: TextWrapProps) {
  const { isReducedMotion, getAnimationSettings } = useMobileOptimization()
  const animationSettings = getAnimationSettings()

  return (
    <section className="relative py-12">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(88,179,255,0.25), transparent 45%),
              radial-gradient(circle at 80% 20%, rgba(255,147,54,0.2), transparent 40%)
            `
          }}
          animate={!isReducedMotion ? { opacity: [0.2, 0.45, 0.2] } : { opacity: 0.3 }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "90px 90px"
          }}
          animate={!isReducedMotion ? { backgroundPosition: ["0px 0px", "90px 90px"] } : {}}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        <motion.div
          className="group relative rounded-[36px] bg-transparent backdrop-blur-xl p-6 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationSettings}
        >
          <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-white/10 via-transparent to-white/10"
          />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 text-xs uppercase tracking-[0.4rem] text-white/60">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={!isReducedMotion ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
              {content.eyebrow}
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {content.headline}
            </h3>
            <p className="text-white/75 text-sm md:text-base">
              {content.description}
            </p>
            {content.metrics && (
              <div className="flex flex-wrap gap-3 text-xs text-white/70">
                {content.metrics.map(metric => (
                  <span
                    key={metric}
                    className="px-4 py-1 rounded-full bg-white/5 backdrop-blur text-[0.7rem]"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export const TextWrap = memo(TextWrapComponent)

