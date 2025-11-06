"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function ArtemisIntegrationSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const integratedSystems = [
    {
      name: "Archer VTOL",
      description: "Modular, multi-mission UAV platform with 3K carbon fiber monocoque frame, 1900mm wingspan, and 4kg payload capacity. Features enhanced terrain performance and AI-assisted autonomous operations.",
      specifications: {
        "Wingspan": "1900mm",
        "Weight": "7.5kg",
        "Payload": "4kg",
        "Flight Time": "34 minutes",
        "Range": "15km"
      },
      capabilities: [
        "Vertical takeoff and landing",
        "Autonomous flight operations",
        "Multi-mission payload capacity",
        "Weather resistance (IP54)",
        "AI-assisted mission planning"
      ],
      image: "/archer_vtol/archer_vtol_1.png",
      integration: "Seamless integration with ArtemisOS for autonomous mission planning and real-time coordination"
    },
    {
      name: "Iroko UAV",
      description: "Modular, mass-producible quadcopter with carbon fiber composite construction and aerospace-grade aluminum. Designed for first response operations with extended endurance and range capabilities.",
      specifications: {
        "Max Weight": "5kg",
        "Max Speed": "70 KM/h",
        "Endurance": "50 minutes",
        "Range": "20km",
        "Payload": "1.5kg"
      },
      capabilities: [
        "Intelligence, surveillance, and reconnaissance",
        "Long endurance operations",
        "Multi-sensor integration",
        "Real-time data transmission",
        "Autonomous navigation"
      ],
      image: "/Iroko_UAV/Iroko_UAV .png",
      integration: "Direct integration with ArtemisOS for ISR operations and real-time threat assessment"
    },
    {
      name: "Duma UGV",
      description: "Autonomous ground vehicle designed for ground-based security operations with all-terrain capabilities and advanced weapon systems integration.",
      specifications: {
        "Type": "Autonomous Ground Vehicle",
        "Terrain": "All-terrain capability",
        "Navigation": "Autonomous GPS/IMU",
        "Operations": "Hazardous environment ready",
        "Integration": "Weapon systems compatible"
      },
      capabilities: [
        "All-terrain autonomous navigation",
        "Ground-based security operations",
        "Weapon systems integration",
        "Hazardous environment operations",
        "Real-time threat response"
      ],
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      integration: "Coordinated with ArtemisOS for ground-based security operations and threat response"
    },
    {
      name: "Kallon Tower",
      description: "Surveillance and communication tower with 360-degree monitoring capabilities, radar systems, and edge AI processing for continuous perimeter security.",
      specifications: {
        "Monitoring": "360° coverage",
        "Systems": "Radar and sensor integration",
        "Communication": "Multi-channel radio",
        "AI Processing": "Edge AI capabilities",
        "Coverage": "Extended range surveillance"
      },
      capabilities: [
        "360-degree perimeter monitoring",
        "Advanced radar systems",
        "Multi-channel communication",
        "Edge AI processing",
        "Continuous surveillance"
      ],
      image: "/kallon(sentry_tower)/kallon.png",
      integration: "Central hub integration with ArtemisOS for comprehensive surveillance and communication"
    }
  ]

  return (
    <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Dynamic Background */}
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

        {/* Connection Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-30deg, transparent 48%, rgba(0, 255, 127, 0.1) 49%, rgba(0, 255, 127, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '100px 100px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '100px 100px']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Floating Integration Nodes */}
        {!isReducedMotion && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${10 + (i * 9) % 80}%`,
                  top: `${15 + (i * 8) % 70}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.3, 0.8]
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </>
        )}
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-blue-500/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-primary to-blue-500 rounded-full"
              animate={isReducedMotion ? {} : { 
                scale: [1, 1.3, 1], 
                opacity: [1, 0.7, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">System Integration</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Seamless</span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-green-400 bg-clip-text text-transparent">
              Integration
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            ArtemisOS serves as the central intelligence platform, seamlessly integrating 
            with all defense systems to create a unified, coordinated defense network
          </motion.p>
        </motion.div>

        {/* Central ArtemisOS Hub */}
        <motion.div
          className="relative flex items-center justify-center mb-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="relative flex items-center justify-center"
            animate={isReducedMotion ? {} : {
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Image
              src="/terra-logo.png"
              alt="Terra Industries Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </motion.div>
          
          <div className="absolute -bottom-12 text-center">
            <div className="text-2xl font-bold text-foreground">ArtemisOS</div>
            <div className="text-sm text-muted-foreground">Central Intelligence Platform</div>
          </div>
        </motion.div>

        {/* Integrated Systems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {integratedSystems.map((system, index) => (
            <motion.div
              key={system.name}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left Side - Content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-4">
                        {system.name}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {system.description}
                      </p>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold text-foreground">Key Specifications</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(system.specifications).map(([key, value], specIndex) => (
                          <div key={specIndex} className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20">
                            <div className="text-sm text-muted-foreground">{key}</div>
                            <div className="text-lg font-bold text-primary">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="space-y-3">
                      <h4 className="text-lg font-bold text-foreground">Core Capabilities</h4>
                      <div className="space-y-2">
                        {system.capabilities.map((capability, capIndex) => (
                          <div key={capIndex} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
                            <span className="text-sm text-muted-foreground">{capability}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Integration Info */}
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-400/10 to-primary/10 border border-green-400/20">
                      <div className="text-sm font-medium text-green-400 mb-2">ArtemisOS Integration</div>
                      <div className="text-sm text-muted-foreground">{system.integration}</div>
                    </div>
                  </div>

                  {/* Right Side - Visual */}
                  <div className="relative">
                    <div className="relative w-full h-80 rounded-2xl overflow-hidden">
                      <Image
                        src={system.image}
                        alt={`${system.name} - Integrated Defense System`}
                        fill
                        className="object-cover"
                        priority
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating Integration Indicators */}
                      {!isReducedMotion && (
                        <>
                          <motion.div
                            className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
                            animate={{ 
                              scale: [1, 1.2, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <motion.div
                            className="absolute bottom-16 left-4 w-2 h-2 bg-green-400 rounded-full"
                            animate={{ 
                              scale: [1, 1.4, 1],
                              opacity: [0.6, 1, 0.6]
                            }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                          />
                        </>
                      )}
                      
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-lg font-bold">{system.name}</div>
                        <div className="text-xs opacity-90">Integrated Defense System</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Benefits */}
        <motion.div
          className="mt-24 bg-gradient-to-r from-card/50 to-card/30 rounded-3xl border border-border/20 p-12 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-6">Integration Benefits</h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Unified control and coordination across all defense systems for maximum operational efficiency
            </p>
          </div>
          
          {/* Primary Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20">
              <h4 className="text-xl font-bold text-foreground mb-4">Unified Control</h4>
              <p className="text-muted-foreground mb-4">
                Single platform to control and coordinate all defense systems with real-time synchronization
              </p>
              <div className="text-sm text-muted-foreground">
                • Centralized command and control<br/>
                • Real-time system monitoring<br/>
                • Coordinated mission execution
              </div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-400/10 to-primary/10 border border-green-400/20">
              <h4 className="text-xl font-bold text-foreground mb-4">Real-time Communication</h4>
              <p className="text-muted-foreground mb-4">
                Instant data sharing and communication between all systems for coordinated operations
              </p>
              <div className="text-sm text-muted-foreground">
                • Sub-second data transmission<br/>
                • Secure encrypted channels<br/>
                • Multi-system coordination
              </div>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <h4 className="text-xl font-bold text-foreground mb-4">Intelligent Coordination</h4>
              <p className="text-muted-foreground mb-4">
                AI-powered decision making that optimizes system performance and mission outcomes
              </p>
              <div className="text-sm text-muted-foreground">
                • AI-driven optimization<br/>
                • Predictive analytics<br/>
                • Automated response protocols
              </div>
            </div>
          </div>

          {/* Advanced Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <h4 className="text-2xl font-bold text-foreground mb-4">Operational Excellence</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-muted-foreground">99.9% system uptime and reliability</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-muted-foreground">24/7 continuous monitoring capabilities</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-muted-foreground">Redundant backup systems for critical operations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full" />
                  <span className="text-muted-foreground">Enterprise-level scalability and deployment</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
              <h4 className="text-2xl font-bold text-foreground mb-4">Security & Compliance</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span className="text-muted-foreground">AES-256 encryption for all data transmission</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span className="text-muted-foreground">Multi-level authentication and authorization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span className="text-muted-foreground">Defense industry security standards compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span className="text-muted-foreground">Secure handling of sensitive surveillance data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-r from-charcoal/50 to-background/50 rounded-2xl p-8 border border-border/20">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-foreground mb-4">Integration Performance</h4>
              <p className="text-muted-foreground">
                Measurable improvements in operational efficiency and system coordination
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-xl bg-primary/20">
                <div className="text-3xl font-bold text-primary mb-2">10x</div>
                <div className="text-sm text-muted-foreground">Faster Response</div>
                <div className="text-xs text-muted-foreground">vs traditional systems</div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-green-400/20">
                <div className="text-3xl font-bold text-green-400 mb-2">5x</div>
                <div className="text-sm text-muted-foreground">Higher Efficiency</div>
                <div className="text-xs text-muted-foreground">resource utilization</div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-purple-500/20">
                <div className="text-3xl font-bold text-purple-500 mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
                <div className="text-xs text-muted-foreground">operational reliability</div>
              </div>
              
              <div className="text-center p-4 rounded-xl bg-blue-500/20">
                <div className="text-3xl font-bold text-blue-500 mb-2">&lt;10ms</div>
                <div className="text-sm text-muted-foreground">Latency</div>
                <div className="text-xs text-muted-foreground">communication delay</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

