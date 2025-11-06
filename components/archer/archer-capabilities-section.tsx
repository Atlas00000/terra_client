"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function ArcherCapabilitiesSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const capabilities = [
    {
      title: "Vertical Takeoff & Landing",
      description: "Advanced VTOL capabilities enabling operations in confined spaces and challenging environments without traditional runway requirements.",
      features: [
        "Confined space operations",
        "No runway dependency", 
        "Rapid deployment capability",
        "Urban environment suitability"
      ],
      metrics: {
        "Deployment Time": "<2 minutes",
        "Landing Precision": "±0.5m",
        "Takeoff Distance": "0m required"
      }
    },
    {
      title: "Autonomous Flight Operations",
      description: "AI-powered autonomous flight capabilities with intelligent path planning, obstacle avoidance, and mission execution.",
      features: [
        "AI-driven navigation",
        "Intelligent path planning",
        "Obstacle avoidance systems",
        "Mission automation"
      ],
      metrics: {
        "Autonomy Level": "99.5%",
        "Navigation Accuracy": "±1m",
        "Mission Success": "99.8%"
      }
    },
    {
      title: "Weather Resistance",
      description: "IP54 protection level ensuring reliable operations in harsh environmental conditions including rain, dust, and temperature extremes.",
      features: [
        "IP54 protection rating",
        "Rain and dust resistance",
        "Temperature range: -20°C to 60°C",
        "Wind resistance up to 12 m/s"
      ],
      metrics: {
        "Protection Level": "IP54",
        "Wind Resistance": "12 m/s",
        "Temperature Range": "-20°C to 60°C"
      }
    },
    {
      title: "Enhanced Terrain Performance",
      description: "Advanced suspension system and flight control for optimal performance across diverse terrain types and challenging landscapes.",
      features: [
        "Advanced suspension system",
        "Off-road optimization",
        "Stability control systems",
        "Multi-terrain adaptability"
      ],
      metrics: {
        "Terrain Types": "All-terrain",
        "Stability Control": "Advanced",
        "Adaptability": "Multi-surface"
      }
    }
  ]

  return (
    <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Dynamic Flight Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(74, 144, 226, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 255, 127, 0.3) 0%, transparent 50%),
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

        {/* Flight Path Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${15 + (i * 8) % 70}%`,
                  top: `${20 + (i * 6) % 60}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </>
        )}

        {/* Connection Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(0, 255, 127, 0.1) 49%, rgba(0, 255, 127, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '120px 120px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '120px 120px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-green-400/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-primary to-green-400 rounded-full"
              animate={isReducedMotion ? {} : { 
                scale: [1, 1.3, 1], 
                opacity: [1, 0.7, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Flight Capabilities</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Advanced</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Flight Systems
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Cutting-edge flight capabilities designed for versatile operations across diverse environments 
            with autonomous intelligence and weather-resistant performance
          </motion.p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {capability.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {capability.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-foreground">Key Features</h4>
                    <div className="space-y-2">
                      {capability.features.map((feature, fIndex) => (
                        <motion.div
                          key={fIndex}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + fIndex * 0.1, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 gap-4">
                    {Object.entries(capability.metrics).map(([key, value], mIndex) => (
                      <motion.div
                        key={key}
                        className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + mIndex * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-muted-foreground">{key}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
