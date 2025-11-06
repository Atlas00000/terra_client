"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function ArcherHeroSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic VTOL Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(74, 144, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 255, 127, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating VTOL Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${20 + (i * 5) % 60}%`,
                  top: `${25 + (i * 7) % 55}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.3, 0.8]
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </>
        )}

        {/* Flight Path Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(60deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-60deg, transparent 48%, rgba(0, 255, 127, 0.1) 49%, rgba(0, 255, 127, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '200px 200px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '200px 200px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Data Streams */}
        {!isReducedMotion && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-24 bg-gradient-to-b from-transparent via-primary to-transparent opacity-25"
                style={{
                  left: `${15 + (i * 15) % 70}%`,
                  top: `${20 + (i * 12) % 60}%`,
                }}
                animate={{
                  y: [0, 120, 0],
                  opacity: [0, 0.7, 0]
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.6
                }}
              />
            ))}
          </>
        )}
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Mobile: Visual first, then Content */}
          {isMobile ? (
            <>
              {/* Visual - Mobile First */}
              <motion.div
                className="relative order-1"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-80">
                  <Image
                    src="/archer_vtol/archer_vtol_1.png"
                    alt="Archer VTOL - Modular UAV Platform"
                    fill
                    className="object-cover rounded-3xl"
                    priority
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
                  
                  {/* Floating VTOL Indicators */}
                  {!isReducedMotion && (
                    <>
                      <motion.div
                        className="absolute top-8 left-8 w-4 h-4 bg-primary rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute top-16 right-12 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.div
                        className="absolute bottom-20 left-16 w-5 h-5 bg-blue-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                      />
                      <motion.div
                        className="absolute bottom-32 right-20 w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                      />
                    </>
                  )}
                  
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-2xl font-bold">Archer VTOL</div>
                    <div className="text-sm opacity-90">Modular UAV Platform</div>
                    <div className="text-xs opacity-75 mt-1">Vertical Takeoff & Landing</div>
                  </div>
                </div>
              </motion.div>

              {/* Content - Mobile Second */}
              <motion.div
                className="space-y-8 order-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-green-400/10 backdrop-blur-sm"
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
                  <span className="text-sm font-medium text-primary">Vertical Takeoff & Landing Excellence</span>
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <span className="block">Archer VTOL</span>
                  <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
                    Modular UAV Platform
                  </span>
                </motion.h1>
                
                <motion.p
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Modular, quiet, and mass-producible UAV platform purpose-built for reconnaissance and site protection. 
                  Leverages ArtemisOS for automated mission planning, threat detection, and flight operations.
                </motion.p>

                {/* Key Specifications */}
                <motion.div
                  className="grid grid-cols-2 gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/30 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-primary mb-1">1900mm</div>
                    <div className="text-xs text-muted-foreground">Wingspan</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-400 mb-1">7.5kg</div>
                    <div className="text-xs text-muted-foreground">Weight</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-purple-500 mb-1">4kg</div>
                    <div className="text-xs text-muted-foreground">Payload</div>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-orange-500 mb-1">34min</div>
                    <div className="text-xs text-muted-foreground">Flight Time</div>
                  </div>
                </motion.div>

                {/* Performance Highlights */}
                <motion.div
                  className="p-4 rounded-xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-base font-bold text-foreground mb-3">Performance Highlights</h3>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="text-primary font-bold">15km Range</div>
                      <div className="text-muted-foreground">Operational range</div>
                    </div>
                    <div>
                      <div className="text-green-400 font-bold">IP54 Protection</div>
                      <div className="text-muted-foreground">Weather resistance</div>
                    </div>
                    <div>
                      <div className="text-purple-500 font-bold">90min Charging</div>
                      <div className="text-muted-foreground">Battery charging time</div>
                    </div>
                    <div>
                      <div className="text-blue-500 font-bold">4K Video</div>
                      <div className="text-muted-foreground">48MP stills capability</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          ) : (
            /* Desktop: Content first, then Visual */
            <>
              <motion.div
                className="space-y-10 order-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-green-400/10 backdrop-blur-sm"
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
                  <span className="text-sm font-medium text-primary">Vertical Takeoff & Landing Excellence</span>
                </motion.div>

                <motion.h1
                  className="text-6xl md:text-8xl font-black tracking-tighter font-display text-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <span className="block">Archer VTOL</span>
                  <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
                    Modular UAV Platform
                  </span>
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  Modular, quiet, and mass-producible UAV platform purpose-built for reconnaissance and site protection. 
                  Leverages ArtemisOS for automated mission planning, threat detection, and flight operations.
                </motion.p>

                {/* Key Specifications */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/30 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-primary mb-2">1900mm</div>
                    <div className="text-sm text-muted-foreground">Wingspan</div>
                    <div className="text-xs text-muted-foreground mt-1">3K Carbon Fiber Frame</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-green-400 mb-2">7.5kg</div>
                    <div className="text-sm text-muted-foreground">Weight</div>
                    <div className="text-xs text-muted-foreground mt-1">Without payload</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-purple-500 mb-2">4kg</div>
                    <div className="text-sm text-muted-foreground">Payload Capacity</div>
                    <div className="text-xs text-muted-foreground mt-1">Modular multi-mission</div>
                  </div>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm">
                    <div className="text-3xl font-bold text-orange-500 mb-2">34min</div>
                    <div className="text-sm text-muted-foreground">Flight Time</div>
                    <div className="text-xs text-muted-foreground mt-1">Per charge</div>
                  </div>
                </motion.div>

                {/* Performance Highlights */}
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">Performance Highlights</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-primary font-bold">15km Range</div>
                      <div className="text-muted-foreground">Operational range</div>
                    </div>
                    <div>
                      <div className="text-green-400 font-bold">IP54 Protection</div>
                      <div className="text-muted-foreground">Weather resistance</div>
                    </div>
                    <div>
                      <div className="text-purple-500 font-bold">90min Charging</div>
                      <div className="text-muted-foreground">Battery charging time</div>
                    </div>
                    <div>
                      <div className="text-blue-500 font-bold">4K Video</div>
                      <div className="text-muted-foreground">48MP stills capability</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Desktop Visual */}
              <motion.div
                className="relative order-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-96 lg:h-[600px]">
                  <Image
                    src="/archer_vtol/archer_vtol_1.png"
                    alt="Archer VTOL - Modular UAV Platform"
                    fill
                    className="object-cover rounded-3xl"
                    priority
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
                  
                  {/* Floating VTOL Indicators */}
                  {!isReducedMotion && (
                    <>
                      <motion.div
                        className="absolute top-8 left-8 w-4 h-4 bg-primary rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute top-16 right-12 w-3 h-3 bg-green-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      />
                      <motion.div
                        className="absolute bottom-20 left-16 w-5 h-5 bg-blue-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                      />
                      <motion.div
                        className="absolute bottom-32 right-20 w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                      />
                    </>
                  )}
                  
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-3xl font-bold">Archer VTOL</div>
                    <div className="text-sm opacity-90">Modular UAV Platform</div>
                    <div className="text-xs opacity-75 mt-1">Vertical Takeoff & Landing</div>
                  </div>
                </div>

                {/* Performance Indicators */}
                <motion.div
                  className="absolute -bottom-8 -right-8 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">15km</div>
                    <div className="text-sm text-muted-foreground">Operational Range</div>
                    <div className="text-xs text-muted-foreground">Extended with GCS Pro</div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}