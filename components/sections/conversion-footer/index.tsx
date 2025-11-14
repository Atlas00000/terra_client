"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { RfqForm } from "./rfq-form"
import { InquiryForm } from "./inquiry-form"

export function ConversionFooterSection() {
  const { isReducedMotion, getAnimationSettings } = useMobileOptimization()
  const animationSettings = getAnimationSettings()

  return (
    <section className="relative py-24 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(2,6,15,0.95),_rgba(3,7,18,1))] text-white">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 20%, rgba(74,144,226,0.25), transparent 50%),
              radial-gradient(circle at 75% 10%, rgba(255,147,54,0.2), transparent 45%)
            `
          }}
          animate={!isReducedMotion ? { opacity: [0.3, 0.6, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
          animate={!isReducedMotion ? { backgroundPosition: ["0px 0px", "80px 80px"] } : {}}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
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
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl text-xs tracking-[0.4rem] uppercase text-white/60">
            Final Conversion
          </div>
          <h2 className="text-4xl md:text-6xl font-black">
            Secure <span className="text-primary">Your Deployment Window</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto">
            Get a scoped RFQ, speak with integration specialists, and lock-in an on-site demonstration before production slots close.
          </p>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={animationSettings}
        >
          <div className="space-y-8">
            <RfqForm isReducedMotion={isReducedMotion} />
            <div className="rounded-[32px] border border-white/10 bg-black/40 p-6 flex flex-wrap items-center gap-4 justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.5rem] text-white/60">Schedule Demo</div>
                <div className="text-2xl font-black">Live Autonomous Ops Walkthrough</div>
                <p className="text-white/70 text-sm max-w-xl">
                  We’ll stream ArtemisOS, Iroko UAV fleet control, and perimeter telemetry from our Abuja command center.
                </p>
              </div>
              <motion.a
                href="/company#contact"
                className="px-8 py-3 rounded-full border border-white/30 text-sm font-bold text-white hover:bg-white/10"
                whileHover={!isReducedMotion ? { scale: 1.04 } : {}}
                whileTap={{ scale: 0.97 }}
              >
                Schedule Demo
              </motion.a>
            </div>
          </div>

          <InquiryForm isReducedMotion={isReducedMotion} />
        </motion.div>
      </div>
    </section>
  )
}

