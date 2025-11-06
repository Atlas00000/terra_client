"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function IrokoApplicationsSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const applications = {
    primary: [
      {
        name: "Emergency Response & First Aid",
        description: "Rapid deployment for emergency medical situations with autonomous flight to incident locations and real-time coordination with emergency services",
        features: [
          "90-second rapid deployment capability",
          "Autonomous flight to emergency locations",
          "Real-time coordination with emergency services",
          "Medical supply delivery and transport",
          "Emergency communication relay",
          "Integration with emergency response systems"
        ],
        metrics: {
          "Response Time": "<90 seconds",
          "Flight Range": "20km radius",
          "Payload Capacity": "1.5kg medical supplies",
          "Communication": "Real-time emergency link",
          "Success Rate": "98.5%",
          "Weather Operations": "IP54 rated"
        }
      },
      {
        name: "Search & Rescue Operations",
        description: "Advanced search and rescue capabilities with AI-powered search algorithms, thermal imaging, and coordinated multi-unit operations for missing person recovery",
        features: [
          "AI-powered search pattern optimization",
          "Thermal imaging for night operations",
          "GPS tracking and location services",
          "Multi-unit coordination and swarm operations",
          "Real-time data sharing with ground teams",
          "Emergency communication relay capabilities"
        ],
        metrics: {
          "Search Area": "20km² per mission",
          "Detection Range": "3km thermal imaging",
          "Night Operations": "Full capability",
          "Coordination Units": "Unlimited",
          "Success Rate": "96%",
          "Response Time": "<2 minutes"
        }
      },
      {
        name: "Disaster Relief Coordination",
        description: "Comprehensive disaster relief operations with rapid assessment, supply delivery, and coordination support for emergency management teams",
        features: [
          "Rapid disaster assessment and mapping",
          "Emergency supply delivery to affected areas",
          "Real-time damage assessment and reporting",
          "Coordination with relief organizations",
          "Communication infrastructure support",
          "Multi-mission payload flexibility"
        ],
        metrics: {
          "Assessment Speed": "10x faster than manual",
          "Supply Delivery": "1.5kg payload capacity",
          "Coverage Area": "20km operational radius",
          "Data Accuracy": "99.2%",
          "Coordination": "Real-time multi-agency",
          "Reliability": "99.8% uptime"
        }
      },
      {
        name: "Medical Emergency Support",
        description: "Specialized medical emergency response with autonomous flight to medical incidents, supply delivery, and coordination with healthcare providers",
        features: [
          "Autonomous flight to medical emergencies",
          "Medical supply and equipment delivery",
          "Real-time coordination with healthcare providers",
          "Emergency communication with medical teams",
          "Integration with hospital systems",
          "Specialized medical payload configurations"
        ],
        metrics: {
          "Medical Response": "<90 seconds deployment",
          "Supply Delivery": "Critical medical supplies",
          "Hospital Integration": "Seamless connectivity",
          "Medical Accuracy": "99.5%",
          "Emergency Link": "Real-time communication",
          "Success Rate": "97.8%"
        }
      }
    ],
    secondary: [
      {
        name: "Infrastructure Inspection",
        description: "Comprehensive infrastructure monitoring and inspection with high-resolution imaging, structural assessment, and automated reporting capabilities",
        features: [
          "High-resolution imaging and video capture",
          "Structural integrity assessment",
          "Automated inspection reporting",
          "Real-time data transmission",
          "Integration with maintenance systems",
          "Predictive maintenance analytics"
        ],
        metrics: {
          "Inspection Speed": "8x faster than manual",
          "Image Quality": "4K video capability",
          "Data Accuracy": "99.5%",
          "Report Generation": "Automated",
          "Cost Savings": "70% reduction",
          "Coverage": "Complete infrastructure mapping"
        }
      },
      {
        name: "Security Patrol",
        description: "Advanced security patrol operations with autonomous monitoring, threat detection, and real-time security coordination for enhanced protection",
        features: [
          "Autonomous patrol route optimization",
          "Real-time threat detection and assessment",
          "Security coordination and communication",
          "Perimeter monitoring and surveillance",
          "Integration with security systems",
          "Emergency response coordination"
        ],
        metrics: {
          "Patrol Efficiency": "5x improvement",
          "Threat Detection": "99.2% accuracy",
          "Response Time": "<30 seconds",
          "Coverage Area": "20km² per unit",
          "Security Integration": "Seamless",
          "Reliability": "99.9% uptime"
        }
      },
      {
        name: "Environmental Monitoring",
        description: "Comprehensive environmental monitoring with air quality assessment, pollution detection, and climate data collection for environmental protection",
        features: [
          "Air quality monitoring and analysis",
          "Pollution detection and assessment",
          "Climate data collection and analysis",
          "Environmental hazard detection",
          "Long-term monitoring capabilities",
          "Integration with environmental databases"
        ],
        metrics: {
          "Monitoring Accuracy": "99.8%",
          "Data Collection": "Real-time continuous",
          "Environmental Coverage": "20km radius",
          "Pollution Detection": "Sub-ppm sensitivity",
          "Climate Data": "Comprehensive metrics",
          "Integration": "Environmental databases"
        }
      },
      {
        name: "Agricultural Support",
        description: "Advanced agricultural monitoring and support with crop analysis, pest detection, and precision farming capabilities for optimized agricultural operations",
        features: [
          "Crop health monitoring and analysis",
          "Pest and disease detection",
          "Precision agriculture applications",
          "Yield optimization and planning",
          "Soil health assessment",
          "Agricultural data analytics"
        ],
        metrics: {
          "Crop Analysis": "Multi-spectral imaging",
          "Pest Detection": "95% accuracy",
          "Yield Improvement": "25% increase",
          "Cost Reduction": "40% savings",
          "Data Quality": "High-resolution",
          "Farm Integration": "Seamless connectivity"
        }
      }
    ]
  }

  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Dynamic Applications Background */}
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
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Mission Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${15 + (i * 7) % 70}%`,
                  top: `${20 + (i * 5) % 60}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
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

        {/* Mission Network */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(60deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-60deg, transparent 48%, rgba(0, 255, 127, 0.1) 49%, rgba(0, 255, 127, 0.1) 51%, transparent 52%)
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
            <span className="text-sm font-medium text-primary">Mission Applications</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Emergency</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Response Excellence
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive mission applications designed for emergency response, search & rescue, 
            disaster relief, and critical infrastructure support with rapid deployment capabilities
          </motion.p>
        </motion.div>

        {/* Primary Applications */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Primary Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {applications.primary.map((app, index) => (
              <motion.div
                key={app.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {app.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {app.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {app.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + fIndex * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(app.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + mIndex * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-lg font-bold text-primary mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
                        </motion.div>
                      ))}
                    </div>
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
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Secondary Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.secondary.map((app, index) => (
              <motion.div
                key={app.name}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/40 to-card/20 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-foreground mb-3">
                        {app.name}
                      </h4>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {app.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-bold text-foreground">Key Features</h5>
                      <div className="space-y-1">
                        {app.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            <span className="text-xs text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-bold text-foreground">Performance</h5>
                      <div className="space-y-1">
                        {Object.entries(app.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-xs text-muted-foreground">{key}:</span>
                            <span className="text-xs font-bold text-primary">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
