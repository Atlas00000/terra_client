"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function CompanyPartnershipsSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(74, 144, 226, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0, 255, 127, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Partnership Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${10 + (i * 4) % 80}%`,
                  top: `${15 + (i * 5) % 70}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [0.7, 1.2, 0.7]
                }}
                transition={{
                  duration: 3 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-green-400/10 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-primary to-green-400 rounded-full"
              animate={isReducedMotion ? {} : { 
                scale: [1, 1.2, 1], 
                opacity: [1, 0.8, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Strategic Partnerships</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Strategic</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Partnerships
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Strategic partnerships driving market expansion, capability enhancement, and global positioning
          </motion.p>
        </motion.div>

        {/* Partnership Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Government Partnerships */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Government Partnerships</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Milsat Partnership",
                  description: "Strategic partnership with Milsat for satellite communications and defense technology",
                  details: ["Satellite communications", "Defense technology", "Strategic collaboration", "Market expansion"],
                  impact: "Enhanced satellite communication capabilities"
                },
                {
                  title: "Government Contracts",
                  description: "Major government contracts for defense and security solutions",
                  details: ["Defense contracts", "Security solutions", "Government relations", "Strategic positioning"],
                  impact: "Strengthened government relationships"
                },
                {
                  title: "Strategic Alliances",
                  description: "Strategic alliances with government agencies and defense organizations",
                  details: ["Government agencies", "Defense organizations", "Strategic alliances", "Collaborative projects"],
                  impact: "Expanded government market presence"
                }
              ].map((partnership, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-foreground mb-3">{partnership.title}</h4>
                  <p className="text-muted-foreground mb-4">{partnership.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {partnership.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20">
                    <div className="text-sm font-medium text-primary mb-1">Impact:</div>
                    <div className="text-sm text-muted-foreground">{partnership.impact}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* International Expansion */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">International Expansion</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Pan-African Expansion",
                  description: "Comprehensive expansion across African markets with strategic positioning",
                  details: ["African markets", "Strategic positioning", "Market development", "Regional presence"],
                  impact: "Expanded African market presence"
                },
                {
                  title: "Global Partnerships",
                  description: "Strategic global partnerships for international market development",
                  details: ["Global partnerships", "International markets", "Strategic alliances", "Market development"],
                  impact: "Enhanced global market access"
                },
                {
                  title: "Market Growth",
                  description: "Sustained market growth through strategic international expansion",
                  details: ["Market growth", "International expansion", "Strategic growth", "Market development"],
                  impact: "Accelerated international growth"
                }
              ].map((expansion, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-xl font-bold text-foreground mb-3">{expansion.title}</h4>
                  <p className="text-muted-foreground mb-4">{expansion.description}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {expansion.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-green-400/10 to-blue-500/10 border border-green-400/20">
                    <div className="text-sm font-medium text-green-400 mb-1">Impact:</div>
                    <div className="text-sm text-muted-foreground">{expansion.impact}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Industry Collaborations */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Industry Collaborations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Technology Partnerships",
                description: "Strategic technology partnerships for innovation and capability enhancement",
                details: ["Technology innovation", "Capability enhancement", "Strategic partnerships", "Innovation focus"]
              },
              {
                title: "Strategic Alliances",
                description: "Strategic alliances for market development and competitive positioning",
                details: ["Market development", "Competitive positioning", "Strategic alliances", "Market growth"]
              },
              {
                title: "Market Development",
                description: "Collaborative market development initiatives for growth and expansion",
                details: ["Market development", "Growth initiatives", "Collaborative projects", "Market expansion"]
              }
            ].map((collaboration, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold text-foreground mb-4">{collaboration.title}</h4>
                <p className="text-muted-foreground mb-6">{collaboration.description}</p>
                <div className="space-y-3">
                  {collaboration.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                      <span className="text-muted-foreground">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partnership Impact Summary */}
        <motion.div
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Partnership Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Market</div>
              <div className="text-sm text-muted-foreground">Expansion</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">Capability</div>
              <div className="text-sm text-muted-foreground">Enhancement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">Strategic</div>
              <div className="text-sm text-muted-foreground">Positioning</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
