"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function DumaApplicationsSection() {
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
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Application Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${15 + (i * 5) % 70}%`,
                  top: `${20 + (i * 6) % 60}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [0.7, 1.2, 0.7]
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
            <span className="text-sm font-medium text-primary">Mission Applications</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ground Operations
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
            Purpose-built for ground surveillance and site protection across diverse operational environments
          </motion.p>
        </motion.div>

        {/* Primary Applications */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Primary Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Ground Surveillance & Reconnaissance",
                description: "Comprehensive ground-based monitoring and intelligence gathering",
                features: ["Real-time surveillance", "Terrain mapping", "Threat detection", "Intelligence collection"],
                color: "from-primary to-blue-500"
              },
              {
                title: "Border Patrol Operations",
                description: "Automated border security and perimeter monitoring",
                features: ["Perimeter security", "Intrusion detection", "Automated patrols", "Alert systems"],
                color: "from-green-400 to-emerald-500"
              },
              {
                title: "Infrastructure Security",
                description: "Critical infrastructure protection and monitoring",
                features: ["Asset protection", "Security patrols", "Threat assessment", "Emergency response"],
                color: "from-purple-500 to-pink-500"
              },
              {
                title: "Emergency Response Support",
                description: "Rapid deployment for emergency and disaster response",
                features: ["Emergency deployment", "Disaster assessment", "Search operations", "Medical support"],
                color: "from-orange-500 to-red-500"
              }
            ].map((app, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {app.title}
                  </h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="space-y-3">
                    {app.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 + featureIndex * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${app.color} rounded-full`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Secondary Applications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Secondary Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Industrial Monitoring",
                description: "Comprehensive industrial facility monitoring and security",
                features: ["Facility security", "Equipment monitoring", "Safety compliance", "Process optimization"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                title: "Agricultural Surveillance",
                description: "Farm and agricultural land monitoring and protection",
                features: ["Crop monitoring", "Livestock security", "Pest detection", "Yield optimization"],
                color: "from-green-500 to-lime-500"
              },
              {
                title: "Environmental Monitoring",
                description: "Environmental protection and ecological monitoring",
                features: ["Wildlife monitoring", "Habitat protection", "Pollution detection", "Conservation efforts"],
                color: "from-emerald-500 to-teal-500"
              },
              {
                title: "Security Patrol Services",
                description: "Professional security services and patrol operations",
                features: ["Security patrols", "Access control", "Incident response", "Safety protocols"],
                color: "from-indigo-500 to-purple-500"
              }
            ].map((app, index) => (
              <motion.div
                key={index}
                className="group relative p-8 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {app.title}
                  </h4>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {app.description}
                  </p>
                  
                  <div className="space-y-3">
                    {app.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center gap-3 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.0 + index * 0.1 + featureIndex * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${app.color} rounded-full`} />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Benefits */}
        <motion.div
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Ground Operations Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">ArtemisOS</div>
              <div className="text-sm text-muted-foreground">Autonomous mission planning</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">Real-time</div>
              <div className="text-sm text-muted-foreground">Ground coordination</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">Multi-unit</div>
              <div className="text-sm text-muted-foreground">Ground operations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
