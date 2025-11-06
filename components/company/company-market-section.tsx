"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function CompanyMarketSection() {
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

        {/* Floating Market Indicators */}
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
            <span className="text-sm font-medium text-primary">Market Position</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Market</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Leadership
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Market leadership position with competitive advantages, growth strategy, and future vision
          </motion.p>
        </motion.div>

        {/* Market Position Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Market Leadership */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Market Leadership</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Industry Position",
                  description: "Leading position in African defense technology market",
                  details: ["Market leadership", "Industry position", "Competitive advantage", "Market share"],
                  metrics: "Market Leader"
                },
                {
                  title: "Competitive Advantages",
                  description: "Unique competitive advantages in technology and market positioning",
                  details: ["Technology advantage", "Market positioning", "Cost advantage", "Innovation leadership"],
                  metrics: "40% Cost Advantage"
                },
                {
                  title: "Market Share",
                  description: "Significant market share in defense technology and security solutions",
                  details: ["Market share", "Market presence", "Customer base", "Revenue growth"],
                  metrics: "Growing Market Share"
                }
              ].map((leadership, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-foreground">{leadership.title}</h4>
                    <div className="text-2xl font-bold text-primary">{leadership.metrics}</div>
                  </div>
                  <p className="text-muted-foreground mb-4">{leadership.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {leadership.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Growth Strategy */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Growth Strategy</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Expansion Plans",
                  description: "Comprehensive expansion plans for market development and growth",
                  details: ["Market expansion", "Geographic growth", "Product development", "Strategic initiatives"],
                  metrics: "3-Year Plan"
                },
                {
                  title: "Market Development",
                  description: "Strategic market development initiatives for sustained growth",
                  details: ["Market development", "Customer acquisition", "Market penetration", "Growth strategy"],
                  metrics: "Strategic Growth"
                },
                {
                  title: "Strategic Initiatives",
                  description: "Key strategic initiatives driving market growth and expansion",
                  details: ["Strategic initiatives", "Market growth", "Expansion strategy", "Growth objectives"],
                  metrics: "Growth Focused"
                }
              ].map((strategy, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-foreground">{strategy.title}</h4>
                    <div className="text-2xl font-bold text-green-400">{strategy.metrics}</div>
                  </div>
                  <p className="text-muted-foreground mb-4">{strategy.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {strategy.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Financial Performance & Future Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
          {/* Financial Performance */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Financial Performance</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Revenue Growth",
                  description: "Sustained revenue growth through market expansion and strategic initiatives",
                  details: ["Revenue growth", "Market expansion", "Strategic growth", "Financial performance"],
                  metrics: "Growing Revenue"
                },
                {
                  title: "Profitability",
                  description: "Strong profitability through operational efficiency and cost optimization",
                  details: ["Profitability", "Operational efficiency", "Cost optimization", "Financial health"],
                  metrics: "Profitable Growth"
                },
                {
                  title: "Investment Returns",
                  description: "Strong investment returns through strategic investments and market growth",
                  details: ["Investment returns", "Strategic investments", "Market growth", "ROI optimization"],
                  metrics: "Strong Returns"
                }
              ].map((performance, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-foreground">{performance.title}</h4>
                    <div className="text-2xl font-bold text-blue-500">{performance.metrics}</div>
                  </div>
                  <p className="text-muted-foreground mb-4">{performance.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {performance.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Future Vision */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Future Vision</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Strategic Roadmap",
                  description: "Comprehensive strategic roadmap for future growth and market expansion",
                  details: ["Strategic roadmap", "Future planning", "Growth objectives", "Strategic vision"],
                  metrics: "5-Year Vision"
                },
                {
                  title: "Growth Objectives",
                  description: "Ambitious growth objectives for market leadership and expansion",
                  details: ["Growth objectives", "Market leadership", "Expansion goals", "Strategic targets"],
                  metrics: "Ambitious Goals"
                },
                {
                  title: "Market Expansion",
                  description: "Strategic market expansion initiatives for global presence",
                  details: ["Market expansion", "Global presence", "International growth", "Market development"],
                  metrics: "Global Expansion"
                }
              ].map((vision, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-foreground">{vision.title}</h4>
                    <div className="text-2xl font-bold text-purple-500">{vision.metrics}</div>
                  </div>
                  <p className="text-muted-foreground mb-4">{vision.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {vision.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Market Position Summary */}
        <motion.div
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Market Position Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Market</div>
              <div className="text-sm text-muted-foreground">Leader</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">Strategic</div>
              <div className="text-sm text-muted-foreground">Growth</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">Financial</div>
              <div className="text-sm text-muted-foreground">Performance</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">Future</div>
              <div className="text-sm text-muted-foreground">Vision</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
