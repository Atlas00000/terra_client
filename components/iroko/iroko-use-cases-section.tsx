"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function IrokoUseCasesSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const useCases = {
    emergency: [
      {
        name: "Emergency Services Integration",
        description: "Seamless integration with emergency services including fire departments, medical emergency teams, and disaster response units for rapid deployment in critical situations",
        features: [
          "Direct integration with 911 dispatch systems",
          "Real-time emergency response coordination",
          "Automated emergency service notifications",
          "Integration with hospital emergency departments",
          "Fire department rapid deployment protocols",
          "Disaster response team coordination"
        ],
        metrics: {
          "Response Time": "<90 seconds",
          "Integration": "Seamless",
          "Coordination": "Real-time",
          "Success Rate": "99.5%",
          "Emergency Link": "Direct",
          "Deployment": "Automated"
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
          "Medical Response": "<90 seconds",
          "Supply Delivery": "Critical supplies",
          "Hospital Integration": "Seamless",
          "Medical Accuracy": "99.5%",
          "Emergency Link": "Real-time",
          "Success Rate": "97.8%"
        }
      }
    ],
    government: [
      {
        name: "Government Applications",
        description: "Comprehensive government applications including border security, infrastructure monitoring, and public safety operations with advanced surveillance capabilities",
        features: [
          "Border security and surveillance operations",
          "Infrastructure monitoring and protection",
          "Public safety and law enforcement support",
          "Environmental monitoring and compliance",
          "Emergency management coordination",
          "National security applications"
        ],
        metrics: {
          "Security Coverage": "24/7 monitoring",
          "Infrastructure": "Complete protection",
          "Public Safety": "Enhanced response",
          "Environmental": "Real-time monitoring",
          "Emergency": "Rapid coordination",
          "Security": "National level"
        }
      },
      {
        name: "Military Applications",
        description: "Advanced military applications including reconnaissance, surveillance, and tactical operations with secure communication and mission-critical capabilities",
        features: [
          "Tactical reconnaissance and surveillance",
          "Mission-critical operations support",
          "Secure communication systems",
          "Battlefield intelligence gathering",
          "Tactical coordination and support",
          "Military-grade security protocols"
        ],
        metrics: {
          "Reconnaissance": "Tactical level",
          "Surveillance": "Advanced capabilities",
          "Communication": "Secure protocols",
          "Intelligence": "Real-time gathering",
          "Coordination": "Tactical support",
          "Security": "Military-grade"
        }
      }
    ],
    commercial: [
      {
        name: "Commercial Applications",
        description: "Diverse commercial applications including infrastructure inspection, security services, and industrial monitoring with cost-effective solutions",
        features: [
          "Infrastructure inspection and monitoring",
          "Security and surveillance services",
          "Industrial monitoring and maintenance",
          "Asset management and tracking",
          "Quality control and inspection",
          "Commercial delivery services"
        ],
        metrics: {
          "Inspection": "10x faster",
          "Security": "24/7 coverage",
          "Industrial": "Comprehensive monitoring",
          "Asset Management": "Real-time tracking",
          "Quality Control": "Automated",
          "Delivery": "Efficient service"
        }
      },
      {
        name: "Industrial Uses",
        description: "Specialized industrial applications including manufacturing support, quality control, and operational efficiency optimization",
        features: [
          "Manufacturing process monitoring",
          "Quality control and inspection",
          "Operational efficiency optimization",
          "Safety monitoring and compliance",
          "Predictive maintenance support",
          "Industrial automation integration"
        ],
        metrics: {
          "Manufacturing": "Process optimization",
          "Quality Control": "Automated inspection",
          "Efficiency": "40% improvement",
          "Safety": "Enhanced monitoring",
          "Maintenance": "Predictive",
          "Automation": "Seamless integration"
        }
      }
    ],
    international: [
      {
        name: "International Deployment",
        description: "Global deployment capabilities with multi-country operations, international partnerships, and cross-border coordination",
        features: [
          "Multi-country deployment capabilities",
          "International partnership coordination",
          "Cross-border operations support",
          "Global supply chain integration",
          "International compliance management",
          "Worldwide service network"
        ],
        metrics: {
          "Global Reach": "Worldwide",
          "Partnerships": "International",
          "Operations": "Cross-border",
          "Supply Chain": "Global",
          "Compliance": "International",
          "Service": "Worldwide network"
        }
      },
      {
        name: "Success Stories",
        description: "Proven success stories including major contract achievements, international expansion, and operational excellence demonstrations",
        features: [
          "Major contract achievements and milestones",
          "International expansion success",
          "Operational excellence demonstrations",
          "Client satisfaction and testimonials",
          "Performance improvement records",
          "Innovation and technology leadership"
        ],
        metrics: {
          "Contracts": "Major achievements",
          "Expansion": "International success",
          "Excellence": "Proven performance",
          "Satisfaction": "High client ratings",
          "Performance": "Continuous improvement",
          "Leadership": "Technology innovation"
        }
      }
    ]
  }

  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Dynamic Use Cases Background */}
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

        {/* Use Case Indicators */}
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

        {/* Use Case Network */}
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
            <span className="text-sm font-medium text-primary">Use Cases & Applications</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Diverse</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Applications
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive use cases and applications across emergency services, government, 
            commercial, and international deployments with proven success stories
          </motion.p>
        </motion.div>

        {/* Emergency Services */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Emergency Services Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {useCases.emergency.map((useCase, index) => (
              <motion.div
                key={useCase.name}
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
                        {useCase.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {useCase.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {useCase.features.map((feature, fIndex) => (
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
                      {Object.entries(useCase.metrics).map(([key, value], mIndex) => (
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

        {/* Government & Military */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Government & Military Applications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {useCases.government.map((useCase, index) => (
              <motion.div
                key={useCase.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {useCase.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {useCase.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {useCase.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 + fIndex * 0.05, duration: 0.4 }}
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
                      {Object.entries(useCase.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 + mIndex * 0.05, duration: 0.4 }}
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

        {/* Commercial & Industrial */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Commercial & Industrial Uses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {useCases.commercial.map((useCase, index) => (
              <motion.div
                key={useCase.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {useCase.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {useCase.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {useCase.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 + fIndex * 0.05, duration: 0.4 }}
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
                      {Object.entries(useCase.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 + mIndex * 0.05, duration: 0.4 }}
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

        {/* International Deployment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">International Deployment & Success Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {useCases.international.map((useCase, index) => (
              <motion.div
                key={useCase.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {useCase.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {useCase.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {useCase.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.6 + fIndex * 0.05, duration: 0.4 }}
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
                      {Object.entries(useCase.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7 + mIndex * 0.05, duration: 0.4 }}
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
      </div>
    </section>
  )
}
