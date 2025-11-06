"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function ArcherSpecificationsSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const specifications = [
    {
      category: "Physical Specifications",
      specs: [
        { name: "Frame Material", value: "3K Carbon Fiber Monocoque", detail: "Lightweight & durable" },
        { name: "Protection Level", value: "IP54", detail: "Weather resistant" },
        { name: "Wingspan", value: "1900mm", detail: "With 28'' propellers" },
        { name: "Dimensions (Unfolded)", value: "183 x 253 x 77 mm", detail: "Compact design" },
        { name: "Dimensions (Folded)", value: "180 x 97 x 84 mm", detail: "Transport ready" },
        { name: "Weight (No Payload)", value: "7.5 kg", detail: "Lightweight frame" },
        { name: "Weight (No Batteries)", value: "3.5 kg", detail: "Minimal weight" },
        { name: "Max Takeoff Weight", value: "11.5 kg", detail: "Full capacity" },
        { name: "Payload Capacity", value: "4 kg", detail: "Modular payloads" }
      ]
    },
    {
      category: "Performance Specifications", 
      specs: [
        { name: "Camera", value: "48 MP stills", detail: "4K video at 60fps" },
        { name: "Connectivity", value: "Wi-Fi 2.4/5.8 GHz", detail: "Bluetooth 5.0" },
        { name: "Battery Life", value: "34 minutes", detail: "Per charge" },
        { name: "Charging Time", value: "90 minutes", detail: "Full charge" },
        { name: "Operational Range", value: "15 km", detail: "Standard range" },
        { name: "Extended Range", value: "50 km", detail: "With GCS Pro" },
        { name: "Flight Speed", value: "Up to 60 km/h", detail: "Maximum speed" },
        { name: "Wind Resistance", value: "12 m/s", detail: "Weather capability" },
        { name: "Temperature Range", value: "-20°C to 60°C", detail: "Operating range" }
      ]
    },
    {
      category: "Propulsion System",
      specs: [
        { name: "Propeller System", value: "28'' Propellers", detail: "Optimized efficiency" },
        { name: "Motor Type", value: "Brushless DC", detail: "High performance" },
        { name: "Power System", value: "Lithium Polymer", detail: "Long endurance" },
        { name: "Thrust-to-Weight", value: "2.5:1", detail: "VTOL capability" },
        { name: "Hover Efficiency", value: "85%", detail: "Energy optimization" },
        { name: "Noise Level", value: "<65 dB", detail: "Quiet operations" },
        { name: "Vibration Control", value: "Active damping", detail: "Stable flight" },
        { name: "Redundancy", value: "Dual ESC", detail: "Safety systems" },
        { name: "Cooling System", value: "Active cooling", detail: "Thermal management" }
      ]
    },
    {
      category: "Payload Management",
      specs: [
        { name: "Payload Types", value: "Modular", detail: "Multi-mission capability" },
        { name: "Quick Release", value: "<30 seconds", detail: "Rapid reconfiguration" },
        { name: "Weight Distribution", value: "Auto-balance", detail: "Flight optimization" },
        { name: "Power Supply", value: "Dedicated", detail: "Payload power" },
        { name: "Data Interface", value: "USB Type-C", detail: "High-speed transfer" },
        { name: "Mounting System", value: "Standardized", detail: "Universal compatibility" },
        { name: "Protection", value: "Weather sealed", detail: "Environmental protection" },
        { name: "Accessibility", value: "Tool-free", detail: "Easy maintenance" },
        { name: "Compatibility", value: "Multi-vendor", detail: "Open standard" }
      ]
    }
  ]

  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Dynamic Technical Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(74, 144, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0, 255, 127, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Technical Grid Pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Floating Data Points */}
        {!isReducedMotion && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${10 + (i * 6) % 80}%`,
                  top: `${15 + (i * 5) % 70}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 4 + (i % 3),
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
            <span className="text-sm font-medium text-primary">Technical Specifications</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Precision</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Engineering
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Detailed technical specifications showcasing the advanced engineering and performance 
            capabilities of the Archer VTOL platform
          </motion.p>
        </motion.div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {specifications.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + categoryIndex * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="p-8">
                <div className="space-y-6">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-foreground">
                      {category.category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {category.specs.map((spec, specIndex) => (
                      <motion.div
                        key={spec.name}
                        className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-green-400/5 border border-primary/10 hover:border-primary/30 transition-all duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + specIndex * 0.05, duration: 0.4 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.02, borderColor: "rgba(74, 144, 226, 0.3)" }}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-muted-foreground mb-1">
                              {spec.name}
                            </div>
                            <div className="text-lg font-bold text-foreground">
                              {spec.value}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {spec.detail}
                            </div>
                          </div>
                          
                          <motion.div
                            className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                            animate={isReducedMotion ? {} : { 
                              scale: [1, 1.3, 1], 
                              opacity: [0.7, 1, 0.7] 
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: specIndex * 0.1 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Highlights */}
        <motion.div
          className="mt-24 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Performance Highlights</h3>
            <p className="text-muted-foreground text-lg">
              Key performance metrics that define the Archer VTOL's operational excellence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-primary mb-2">34min</div>
              <div className="text-sm text-muted-foreground">Flight Time</div>
              <div className="text-xs text-muted-foreground mt-1">Per charge</div>
            </motion.div>
            
            <motion.div
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 border border-green-400/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-green-400 mb-2">15km</div>
              <div className="text-sm text-muted-foreground">Operational Range</div>
              <div className="text-xs text-muted-foreground mt-1">Standard range</div>
            </motion.div>
            
            <motion.div
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold text-purple-500 mb-2">4kg</div>
              <div className="text-sm text-muted-foreground">Payload Capacity</div>
              <div className="text-xs text-muted-foreground mt-1">Modular payloads</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
