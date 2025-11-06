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

export function InfrastructureSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const particleCount = getParticleCount()
  
  // Memoize particle positions to prevent recalculation on every render
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Background Effects (reduced particles) */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-5"
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
            <span className="text-sm font-medium text-primary">Infrastructure Protection</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">$13+ Billion in</span>
            <span className="block gradient-text">Critical Infrastructure</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Real-world protection of Africa's most critical infrastructure assets with measurable impact and proven results
          </motion.p>
        </motion.div>

        {/* Protection Statistics */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Protection Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-4xl font-black text-primary mb-4">$13B+</div>
                <div className="text-lg font-bold text-foreground mb-2">Infrastructure Protected</div>
                <div className="text-muted-foreground">Critical assets under our protection</div>
              </motion.div>
              
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-terra-steel-blue/20 to-primary/20 border border-terra-steel-blue/30 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-4xl font-black text-terra-steel-blue mb-4">24/7</div>
                <div className="text-lg font-bold text-foreground mb-2">Continuous Monitoring</div>
                <div className="text-muted-foreground">Round-the-clock surveillance</div>
              </motion.div>
              
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30 text-center"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-4xl font-black text-primary mb-4">99.9%</div>
                <div className="text-lg font-bold text-foreground mb-2">Uptime</div>
                <div className="text-muted-foreground">System reliability</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Case Studies */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Real-World Case Studies</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Power Plant Protection */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Power Plant Protection</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                    Critical Infrastructure
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Successfully deployed our autonomous defense systems to protect multiple power plants 
                  across Nigeria, ensuring uninterrupted electricity supply to millions of citizens. 
                  Our systems have prevented numerous security breaches and maintained 99.9% uptime.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Assets Protected</span>
                    <span className="text-sm font-medium text-primary">4 Power Plants</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Value Protected</span>
                    <span className="text-sm font-medium text-primary">$2.5B+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Uptime</span>
                    <span className="text-sm font-medium text-primary">99.9%</span>
                  </div>
                </div>
              </motion.div>

              {/* Substation Security */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="mb-6">
                  <h4 className="text-2xl font-bold text-foreground mb-4">Substation Security</h4>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-blue-500 rounded-full" />
                    Grid Infrastructure
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Comprehensive protection of electrical substations using our integrated defense systems. 
                  Our AI-powered threat detection has identified and prevented multiple security threats, 
                  ensuring grid stability and preventing potential blackouts.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Substations</span>
                    <span className="text-sm font-medium text-primary">12+ Locations</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Threats Prevented</span>
                    <span className="text-sm font-medium text-primary">50+ Incidents</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="text-sm font-medium text-primary">&lt;30 seconds</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8">
              <span className="block">Future Vision</span>
              <span className="block gradient-text">$1 Trillion Protection Goal</span>
            </h3>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Our vision extends beyond current achievements. We're working towards protecting over $1 trillion 
              in emerging market infrastructure, establishing Africa as the global leader in autonomous 
              defense systems and critical infrastructure protection.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">$1T</div>
                <div className="text-sm text-muted-foreground">Protection Goal</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Global Coverage</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
