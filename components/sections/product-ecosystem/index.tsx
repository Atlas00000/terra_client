"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { ProductIntegrationDiagram } from "./components/product-integration-diagram"
import { InquiryModal } from "./components/inquiry-modal"
import { useState } from "react"

export function ProductEcosystemSection() {
  const { isMobile, isReducedMotion, getAnimationSettings, getParticleCount } = useMobileOptimization()
  const animationSettings = getAnimationSettings()
  const [showIntegrationModal, setShowIntegrationModal] = useState(false)

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Immersive background */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted/5 to-primary/10"
          animate={!isReducedMotion ? {
            backgroundPosition: ['0% 0%', '100% 100%']
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
        />

        {/* Dynamic mesh grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0px 0px', '60px 60px']
          } : {}}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Floating particles */}
        {!isReducedMotion && Array.from({ length: getParticleCount() }).map((_, i) => {
          const hash = (i * 2654435761) % 1000000
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 bg-primary rounded-full"
              style={{
                left: `${(hash % 80) + 10}%`,
                top: `${((hash * 7) % 80) + 10}%`,
                boxShadow: '0 0 8px rgba(74, 144, 226, 0.6)'
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
                x: [0, (i % 2 === 0 ? 20 : -20), 0]
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: 'easeInOut'
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Product Ecosystem</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="block bg-gradient-to-r from-primary via-muted-foreground to-primary bg-clip-text text-transparent">
              Technical Depth
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore how our integrated defense systems work together to protect critical infrastructure
          </motion.p>
        </motion.div>

        {/* Feature 7: Product Integration Diagram */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <ProductIntegrationDiagram 
            animationSettings={animationSettings}
            isReducedMotion={isReducedMotion}
          />

          {/* CTA Button */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.button
              className="relative px-12 py-5 rounded-full overflow-hidden group"
              onClick={() => setShowIntegrationModal(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {/* Base gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 opacity-90 blur-[1px]" />
              {/* Floating aurora */}
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 45%)"
                }}
                animate={!isReducedMotion ? {
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              {/* Sliding shine */}
              <motion.div
                className="absolute inset-0 bg-white/30"
                style={{
                  clipPath: "polygon(0% 0%, 35% 0%, 55% 100%, 0% 100%)"
                }}
                animate={!isReducedMotion ? { x: ['-120%', '120%'] } : {}}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Particle spark */}
              {!isReducedMotion && (
                <motion.div
                  className="absolute w-16 h-16 rounded-full bg-white/20 blur-3xl"
                  animate={{
                    x: [-30, 30, -30],
                    opacity: [0.2, 0.6, 0.2]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              )}
              <span className="relative z-10 text-white font-black tracking-wide text-sm uppercase">
                Request Integration Consultation
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Feature 12: Product Capability Comparison Matrix (temporarily removed, component retained for reuse) */}
      </div>

      {/* Modals */}
      <InquiryModal
        isOpen={showIntegrationModal}
        onClose={() => setShowIntegrationModal(false)}
        inquiryType="integration-consultation"
        prefillData={{
          inquiryType: "integration-consultation",
          message: "I'm interested in learning more about product integration capabilities."
        }}
        animationSettings={animationSettings}
        isReducedMotion={isReducedMotion}
      />
    </section>
  )
}

