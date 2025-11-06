"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function KallonSpecificationsSection() {
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
            Comprehensive technical specifications for AI-powered surveillance tower operations
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
                  title: "Material Construction",
                  value: "Reinforced Composite & Steel",
                  description: "Durable construction for all-weather operations"
                },
                {
                  title: "Height",
                  value: "6m (extendable)",
                  description: "Optimal height for comprehensive surveillance coverage"
                },
                {
                  title: "Power Supply",
                  value: "Solar-Powered",
                  description: "Self-sustaining solar power with battery backup"
                },
                {
                  title: "Weather Resistance",
                  value: "IP67-rated",
                  description: "All-weather operation from -30°C to +55°C"
                },
                {
                  title: "Connectivity",
                  value: "LTE/5G + Wi-Fi",
                  description: "Multi-protocol connectivity for remote operations"
                },
                {
                  title: "Installation",
                  value: "Modular Design",
                  description: "Easy installation and maintenance access"
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

          {/* System Specifications */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">System Specifications</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "AI Capabilities",
                  value: "Edge AI Processing",
                  description: "Built-in object detection and threat tracking"
                },
                {
                  title: "Camera System",
                  value: "Multi-sensor EO/IR",
                  description: "Electro-Optical and Infrared surveillance"
                },
                {
                  title: "Zoom Capability",
                  value: "30x Optical + 12x Digital",
                  description: "Advanced zoom for detailed surveillance"
                },
                {
                  title: "Security",
                  value: "AES-256 Encryption",
                  description: "Military-grade encryption for secure communications"
                },
                {
                  title: "Detection Range",
                  value: "Up to 3km",
                  description: "Long-range threat detection and tracking"
                },
                {
                  title: "Pan Capability",
                  value: "360° Coverage",
                  description: "Complete panoramic surveillance coverage"
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

        {/* AI System Capabilities */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">AI System Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Object Detection",
                description: "Advanced AI-powered object identification and tracking",
                details: ["Vehicle detection", "Human recognition", "Threat identification", "Behavioral analysis"]
              },
              {
                title: "Real-time Analysis",
                description: "Instant processing and threat assessment",
                details: ["Live analysis", "Instant alerts", "Real-time processing", "Immediate response"]
              },
              {
                title: "Autonomous Operations",
                description: "Fully autonomous surveillance and decision making",
                details: ["24/7 operation", "Autonomous decisions", "Self-managing", "Continuous monitoring"]
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

        {/* Performance Summary */}
        <motion.div
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3km</div>
              <div className="text-sm text-muted-foreground">Detection Range</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">360°</div>
              <div className="text-sm text-muted-foreground">Pan Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Operation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">AI</div>
              <div className="text-sm text-muted-foreground">Powered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
