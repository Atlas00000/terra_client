"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function DumaSpecificationsSection() {
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

        {/* Floating Specification Indicators */}
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
            <span className="text-sm font-medium text-primary">Technical Specifications</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Technical</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive technical specifications for ground surveillance operations
          </motion.p>
        </motion.div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Physical Specifications */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Physical Specifications</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Frame Material",
                  value: "3K Carbon Fiber Monocoque",
                  description: "Lightweight yet durable construction for ground operations"
                },
                {
                  title: "Protection Level",
                  value: "IP54",
                  description: "Weather-resistant design for all-terrain operations"
                },
                {
                  title: "Dimensions",
                  value: "Compact Design",
                  description: "Optimized for ground-based surveillance operations"
                },
                {
                  title: "Weight",
                  value: "7.5 kg (without payload)",
                  description: "Lightweight design for enhanced mobility"
                },
                {
                  title: "Max Takeoff Weight",
                  value: "11.5 kg",
                  description: "Maximum operational weight capacity"
                },
                {
                  title: "Payload Capacity",
                  value: "4 kg",
                  description: "Modular payload system for mission flexibility"
                }
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-foreground">{spec.title}</h4>
                    <div className="text-2xl font-bold text-primary">{spec.value}</div>
                  </div>
                  <p className="text-muted-foreground text-sm">{spec.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Performance Specifications */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Performance Specifications</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Endurance",
                  value: "8 hours",
                  description: "Extended operational endurance for sustained missions"
                },
                {
                  title: "Operational Range",
                  value: "15 km",
                  description: "Ground-based operational range with real-time control"
                },
                {
                  title: "Speed",
                  value: "Variable",
                  description: "Adaptive speed control for terrain optimization"
                },
                {
                  title: "Weather Resistance",
                  value: "IP54",
                  description: "Robust weather protection for all-weather operations"
                },
                {
                  title: "Terrain Capability",
                  value: "All-Terrain",
                  description: "Multi-surface adaptability for diverse environments"
                },
                {
                  title: "Autonomous Navigation",
                  value: "AI-Powered",
                  description: "Advanced autonomous ground navigation capabilities"
                }
              ].map((spec, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-foreground">{spec.title}</h4>
                    <div className="text-2xl font-bold text-green-400">{spec.value}</div>
                  </div>
                  <p className="text-muted-foreground text-sm">{spec.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Propulsion System */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Propulsion System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Motor Specifications",
                description: "High-efficiency ground propulsion system",
                details: ["Optimized power output", "Energy efficiency", "Durability", "Maintenance-free operation"]
              },
              {
                title: "Battery System",
                description: "Advanced battery technology for extended operations",
                details: ["Long-lasting batteries", "Quick charging", "Power management", "Energy optimization"]
              },
              {
                title: "Ground Control Systems",
                description: "Advanced ground control and navigation",
                details: ["Precision control", "Autonomous navigation", "Terrain adaptation", "Safety protocols"]
              }
            ].map((system, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold text-foreground mb-4">{system.title}</h4>
                <p className="text-muted-foreground mb-6">{system.description}</p>
                <div className="space-y-3">
                  {system.details.map((detail, detailIndex) => (
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

        {/* Payload Management */}
        <motion.div
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Payload Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Modular</div>
              <div className="text-sm text-muted-foreground">Payload capabilities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">Quick-Release</div>
              <div className="text-sm text-muted-foreground">Mechanisms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">Multi-Mission</div>
              <div className="text-sm text-muted-foreground">Configurations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
