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

export function ManufacturingSection() {
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
            <span className="text-sm font-medium text-primary">Manufacturing Excellence</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">Africa's Largest</span>
            <span className="block gradient-text">Drone Factory</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            From concept to deployment in 11 months - our Abuja facility represents the pinnacle of African manufacturing excellence
          </motion.p>
        </motion.div>

        {/* Manufacturing Journey */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Manufacturing Journey</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20">
                    <h4 className="text-xl font-bold text-foreground mb-4">Manufacturing Excellence</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our Abuja facility represents the pinnacle of African manufacturing excellence, 
                      producing 20 Iroko drones per day with 80% local component sourcing. This achievement 
                      demonstrates our commitment to local production and technological sovereignty.
                    </p>
                  </div>
                  
                  <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/20">
                    <h4 className="text-xl font-bold text-foreground mb-4">Economic Impact</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Our manufacturing operations have created hundreds of direct and indirect jobs, 
                      fostering a robust ecosystem of suppliers, technicians, and engineers. This economic 
                      impact extends beyond our facility, strengthening Nigeria's defense industrial base.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-terra-steel-blue/20 border border-primary/30">
                  <h4 className="text-2xl font-bold text-foreground mb-6">Production Statistics</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Daily Production</span>
                      <span className="text-2xl font-bold text-primary">20 Drones</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Local Sourcing</span>
                      <span className="text-2xl font-bold text-primary">80%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Development Time</span>
                      <span className="text-2xl font-bold text-primary">11 Months</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-muted-foreground">Quality Rate</span>
                      <span className="text-2xl font-bold text-primary">99.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Three-Year Expansion Plan */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-12 text-center">
              <span className="block">Three-Year</span>
              <span className="block gradient-text">Expansion Plan</span>
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Year 1 */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-primary/10 border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-blue-500 mb-2">Year 1</div>
                  <h4 className="text-xl font-bold text-foreground">Foundation</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center mb-6">
                    Building the foundation for Africa's largest drone manufacturing network
                  </p>
                  <div className="space-y-3">
                    {[
                      "Scale current Abuja facility to 50 drones per day",
                      "Establish supply chain partnerships across West Africa",
                      "Launch first international factory in Ghana",
                      "Achieve 90% local component sourcing"
                    ].map((goal, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Year 2 */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-primary/10 border border-green-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-green-500 mb-2">Year 2</div>
                  <h4 className="text-xl font-bold text-foreground">Expansion</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center mb-6">
                    Expanding across Africa with strategic partnerships and increased production capacity
                  </p>
                  <div className="space-y-3">
                    {[
                      "Launch factories in Kenya and South Africa",
                      "Establish pan-African distribution network",
                      "Begin exports to Middle East and Europe",
                      "Achieve 200 drones per day total capacity"
                    ].map((goal, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Year 3 */}
              <motion.div
                className="p-8 rounded-3xl bg-gradient-to-br from-yellow-500/10 to-primary/10 border border-yellow-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-center mb-6">
                  <div className="text-4xl font-black text-yellow-500 mb-2">Year 3</div>
                  <h4 className="text-xl font-bold text-foreground">Global Leadership</h4>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-center mb-6">
                    Achieving global leadership in autonomous defense manufacturing and market penetration
                  </p>
                  <div className="space-y-3">
                    {[
                      "Complete African factory network (8 countries)",
                      "Launch global export operations",
                      "Establish partnerships with international defense contractors",
                      "Achieve 500+ drones per day capacity"
                    ].map((goal, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <span className="text-sm text-muted-foreground">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Manufacturing Impact */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8">Manufacturing Impact</h3>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Our manufacturing excellence is not just about production numbers—it's about building Africa's 
              technological future, creating sustainable jobs, and establishing the continent as a global 
              leader in defense technology innovation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">20</div>
                <div className="text-sm text-muted-foreground">Drones Per Day</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">80%</div>
                <div className="text-sm text-muted-foreground">Local Sourcing</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">11</div>
                <div className="text-sm text-muted-foreground">Months Journey</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">99.5%</div>
                <div className="text-sm text-muted-foreground">Quality Rate</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
