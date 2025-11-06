"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useMemo } from "react"

// Helper function to generate consistent particle positions (reduced count)
const generateParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const hash = (i * 2654435761) % 1000000;
    positions.push({
      left: (hash % 90) + 5,
      top: ((hash * 7) % 90) + 5,
      duration: 4 + (i % 2), // Slower animations
      delay: (i % 3) * 0.8
    });
  }
  return positions;
};

export function TechnologySection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const particleCount = getParticleCount()
  
  // Memoize particle positions to prevent recalculation on every render
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Background Effects (reduced particles) */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0 0, 0 30px, 30px -30px, -30px 0px', '60px 60px, 60px 90px, 90px 30px, 30px 60px']
          } : {}}
          transition={{
            duration: 30, // Slower animation
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Floating Particles (reduced count) */}
        {!isReducedMotion && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 0.8, 0]
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Technology Innovation</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">ArtemisOS in</span>
            <span className="block gradient-text">Action</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Advanced AI-powered intelligence platform driving autonomous defense operations with real-time capabilities and proven results
          </motion.p>
        </motion.div>

        {/* Technology Innovation Focus */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Technology Innovation Focus</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30">
                  <h4 className="text-2xl font-bold text-foreground mb-6">AI-Powered Intelligence</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Our ArtemisOS platform represents the pinnacle of AI-powered defense technology, 
                    providing autonomous mission planning, real-time threat detection, and intelligent 
                    decision-making capabilities that operate 24/7 without human intervention.
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">AI Processing Power</span>
                      <span className="text-sm font-medium text-primary">1000+ TOPS</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Neural Network Layers</span>
                      <span className="text-sm font-medium text-primary">50+ Layers</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Training Data</span>
                      <span className="text-sm font-medium text-primary">10M+ Samples</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30">
                  <h4 className="text-2xl font-bold text-foreground mb-6">Real-Time Operations</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Successfully demonstrated real-time capabilities across multiple power plants and substations, 
                    showcasing our ability to protect critical infrastructure with autonomous systems that respond 
                    to threats in milliseconds.
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Response Time</span>
                      <span className="text-sm font-medium text-primary">&lt;1 second</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Threat Detection</span>
                      <span className="text-sm font-medium text-primary">99.5% accuracy</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">System Uptime</span>
                      <span className="text-sm font-medium text-primary">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ArtemisOS Core Features */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">ArtemisOS Core Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Autonomous Mission Planning */}
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-purple-500 rounded-full" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">Autonomous Mission Planning</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  AI-powered mission planning that creates optimal flight paths, resource allocation, 
                  and contingency plans without human intervention.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Planning Time</span>
                    <span className="text-sm font-medium text-primary">&lt;5 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="text-sm font-medium text-primary">98.5%</span>
                  </div>
                </div>
              </motion.div>

              {/* Fleet Coordination */}
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">Fleet Coordination</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Intelligent coordination of multiple drones and systems for synchronized operations 
                  and maximum efficiency.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Max Drones</span>
                    <span className="text-sm font-medium text-primary">100+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Coordination</span>
                    <span className="text-sm font-medium text-primary">Real-time</span>
                  </div>
                </div>
              </motion.div>

              {/* AES-256 Encryption */}
              <motion.div
                className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-green-500 rounded-full" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-3">AES-256 Encryption</h4>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Military-grade encryption ensuring secure communication and data protection 
                  for all autonomous operations.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Encryption</span>
                    <span className="text-sm font-medium text-primary">AES-256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Security</span>
                    <span className="text-sm font-medium text-primary">Military-grade</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Technology Achievements */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8">Technology Achievements</h3>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Our technology innovation has resulted in measurable achievements across multiple domains, 
              establishing Terra Industries as a leader in autonomous defense systems and AI-powered intelligence.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
                <div className="text-sm text-muted-foreground">AI Accuracy</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">&lt;1s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Systems</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
