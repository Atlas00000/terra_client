"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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

export function ProductEcosystemSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const particleCount = getParticleCount()
  
  // Memoize particle positions to prevent recalculation on every render
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  return (
    <section className="relative py-24 bg-gradient-to-b from-background to-charcoal overflow-hidden">
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
            <span className="text-sm font-medium text-primary">Product Ecosystem</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">Five Integrated</span>
            <span className="block gradient-text">Defense Systems</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Complete autonomous defense ecosystem protecting Africa's critical infrastructure with real-world deployments
          </motion.p>
        </motion.div>

        {/* Product Showcase */}
        <div className="space-y-24">
          {/* ArtemisOS */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">ArtemisOS</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  AI-Powered Central Intelligence Platform
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Terrahaptix's flagship AI-powered, open operating system serving as the central intelligence platform 
                for all autonomous defense systems. Provides real-time threat detection, autonomous mission planning, 
                and fleet management capabilities across the entire product ecosystem.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Core Capabilities</h4>
                    <div className="space-y-3">
                      {[
                        "Autonomous Mission Planning & Decision-Making",
                        "Real-Time Threat Detection & Analysis", 
                        "Drone Fleet Management & Swarm Operations",
                        "AI-Powered Target Identification & Tracking",
                        "AES-256 Encryption & Security",
                        "Predictive Analytics & Pattern Recognition"
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={!isReducedMotion ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                          />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Response Time</span>
                        <span className="text-sm font-medium text-primary">&lt;1 second</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Threat Detection Accuracy</span>
                        <span className="text-sm font-medium text-primary">99.5%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">System Uptime</span>
                        <span className="text-sm font-medium text-primary">99.9%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Concurrent Systems</span>
                        <span className="text-sm font-medium text-primary">1000+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/ArtemisOS/autonomous_mission_planning.png"
                alt="ArtemisOS AI-Powered Intelligence Platform"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-2xl font-bold">ArtemisOS Dashboard</div>
                <div className="text-sm opacity-90">Real-time AI Operations</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Archer VTOL */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/archer_vtol/archer_vtol_1.png"
                alt="Archer VTOL Drone"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Archer VTOL</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-sm font-medium">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  Vertical Takeoff & Landing Drone
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Advanced vertical takeoff and landing drone designed for versatile deployment in challenging environments. 
                Features autonomous flight capabilities, extended range, and precision landing systems for critical infrastructure protection.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Range</span>
                      <span className="text-sm font-medium text-primary">50+ km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Endurance</span>
                      <span className="text-sm font-medium text-primary">2+ hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payload</span>
                      <span className="text-sm font-medium text-primary">5kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Speed</span>
                      <span className="text-sm font-medium text-primary">120 km/h</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Capabilities</h4>
                  <div className="space-y-2">
                    {["Vertical Takeoff & Landing", "Autonomous Flight", "Precision Landing", "All-Weather Operations"].map((capability, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Iroko UAV */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Iroko UAV</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-medium">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  Intelligence, Surveillance & Reconnaissance
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                High-performance unmanned aerial vehicle designed for intelligence, surveillance, and reconnaissance missions. 
                Features advanced sensor suites, long-endurance flight, and real-time data transmission capabilities.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Endurance</span>
                      <span className="text-sm font-medium text-primary">8+ hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Range</span>
                      <span className="text-sm font-medium text-primary">100+ km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Altitude</span>
                      <span className="text-sm font-medium text-primary">5000m</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Sensors</h4>
                  <div className="space-y-2">
                    {["Multi-spectral Imaging", "Thermal Detection", "Night Vision", "Real-time Streaming"].map((sensor, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{sensor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/Iroko_UAV/Iroko_UAV .png"
                alt="Iroko UAV Surveillance Drone"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Duma UGV */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/Duma_ground_drone/Duma_ground_drone.png"
                alt="Duma UGV Ground Vehicle"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
            
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Duma UGV</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-medium">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                  Unmanned Ground Vehicle
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Autonomous unmanned ground vehicle designed for ground-based security operations. 
                Features all-terrain capabilities, autonomous navigation, and integrated weapon systems for comprehensive ground defense.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Speed</span>
                      <span className="text-sm font-medium text-primary">40 km/h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Range</span>
                      <span className="text-sm font-medium text-primary">200+ km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Payload</span>
                      <span className="text-sm font-medium text-primary">100kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Terrain</span>
                      <span className="text-sm font-medium text-primary">All-terrain</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Capabilities</h4>
                  <div className="space-y-2">
                    {["All-Terrain Navigation", "Autonomous Operations", "Weapon Integration", "Ground Security"].map((capability, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Kallon Tower */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4">Kallon Tower</h3>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium">
                  <motion.div
                    className="w-2 h-2 bg-white rounded-full"
                    animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                  />
                  Surveillance & Communication Tower
                </div>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Advanced surveillance and communication tower system providing 360-degree monitoring capabilities. 
                Features integrated radar systems, communication arrays, and autonomous threat detection for comprehensive area security.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Range</span>
                      <span className="text-sm font-medium text-primary">15+ km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Height</span>
                      <span className="text-sm font-medium text-primary">30m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Coverage</span>
                      <span className="text-sm font-medium text-primary">360°</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Detection</span>
                      <span className="text-sm font-medium text-primary">Multi-target</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground">Capabilities</h4>
                  <div className="space-y-2">
                    {["360° Monitoring", "Radar Integration", "Communication Arrays", "Threat Detection"].map((capability, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{capability}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src="/kallon(sentry_tower)/kallon.png"
                alt="Kallon Surveillance Tower"
                width={600}
                height={400}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
