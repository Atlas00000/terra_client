"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function KallonSupportSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Installation & Maintenance",
      subtitle: "Comprehensive Support Services",
      content: {
        installation: [
          {
            title: "Installation Process",
            description: "Professional installation and system integration services",
            details: ["Site preparation", "Tower erection", "System integration", "Testing & commissioning"],
            metrics: "48-hour installation"
          },
          {
            title: "Maintenance Requirements",
            description: "Regular servicing and system optimization",
            details: ["Regular servicing", "Software updates", "Hardware maintenance", "Performance optimization"],
            metrics: "99.9% uptime"
          },
          {
            title: "Support Services",
            description: "Comprehensive technical support and training",
            details: ["Technical support", "Training programs", "Warranty coverage", "Remote assistance"],
            metrics: "24/7 support"
          },
          {
            title: "System Optimization",
            description: "Continuous system performance optimization",
            details: ["Performance monitoring", "System tuning", "Efficiency optimization", "Upgrade services"],
            metrics: "Optimized performance"
          }
        ]
      }
    },
    {
      title: "Integration Capabilities",
      subtitle: "Seamless System Integration",
      content: {
        integration: [
          {
            title: "System Integration",
            value: "Seamless",
            description: "Complete integration with existing security systems",
            details: ["Legacy system integration", "API compatibility", "Data synchronization", "Unified control"]
          },
          {
            title: "Network Connectivity",
            value: "Multi-Protocol",
            description: "Advanced communication and data transmission",
            details: ["LTE/5G connectivity", "Wi-Fi networks", "Satellite uplink", "Secure protocols"]
          },
          {
            title: "Multi-Platform Coordination",
            value: "ArtemisOS",
            description: "Integration with Terrahaptix ecosystem",
            details: ["Unified command", "Cross-platform coordination", "Data sharing", "Coordinated response"]
          },
          {
            title: "Remote Monitoring",
            value: "Real-time",
            description: "Advanced remote monitoring capabilities",
            details: ["Remote access", "Live monitoring", "Remote diagnostics", "Cloud integration"]
          }
        ]
      }
    },
    {
      title: "Security & Compliance",
      subtitle: "Enterprise-Grade Security",
      content: {
        security: [
          {
            title: "Security Features",
            description: "Advanced security and data protection",
            details: ["AES-256 encryption", "Secure communications", "Access control", "Data protection"],
            examples: ["Military-grade encryption", "Secure data transmission", "Role-based access"]
          },
          {
            title: "Compliance Standards",
            description: "Full compliance with industry and government standards",
            details: ["Industry standards", "Government regulations", "Security protocols", "Quality standards"],
            examples: ["ISO certifications", "Government approvals", "Security compliance"]
          },
          {
            title: "Certification",
            description: "Comprehensive security and quality certifications",
            details: ["Security certifications", "Quality standards", "Government approvals", "Industry compliance"],
            examples: ["Security clearances", "Quality certifications", "Government contracts"]
          },
          {
            title: "Data Protection",
            description: "Comprehensive data protection and privacy",
            details: ["Data encryption", "Privacy protection", "Secure storage", "Access control"],
            examples: ["GDPR compliance", "Data privacy", "Secure operations"]
          }
        ]
      }
    }
  ]

  // Auto-rotation
  useEffect(() => {
    if (isReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [isReducedMotion, slides.length])

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Dynamic Background */}
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
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Support Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${10 + (i * 4) % 80}%`,
                  top: `${15 + (i * 5) % 70}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.7, 1.3, 0.7]
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}

        {/* Support Network Pattern */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(74, 144, 226, 0.08) 49%, rgba(74, 144, 226, 0.08) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(0, 255, 127, 0.08) 49%, rgba(0, 255, 127, 0.08) 51%, transparent 52%)
            `,
            backgroundSize: '160px 160px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '160px 160px']
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
          className="text-center mb-16"
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
            <span className="text-sm font-medium text-primary">Support & Integration</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Comprehensive</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Support Excellence
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Professional installation, seamless integration, and enterprise-grade security for mission-critical surveillance operations
          </motion.p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Slide Content */}
          <motion.div
            key={currentSlide}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div>
                <h3 className="text-4xl font-bold text-foreground mb-4">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-xl text-muted-foreground mb-8">
                  {slides[currentSlide].subtitle}
                </p>
              </div>

              {/* Installation & Maintenance Content */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.installation?.map((service, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-xl font-bold text-foreground">{service.title}</h4>
                        <div className="text-2xl font-bold text-primary">{service.metrics}</div>
                      </div>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        {service.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Integration Capabilities Content */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-2 gap-6">
                  {slides[currentSlide]?.content?.integration?.map((capability, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="text-3xl font-bold text-primary mb-2">{capability.value}</div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{capability.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{capability.description}</p>
                      <div className="space-y-2">
                        {capability.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="text-xs text-muted-foreground">
                            • {detail}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Security & Compliance Content */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.security?.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-foreground mb-3">{feature.title}</h4>
                      <p className="text-muted-foreground mb-4">{feature.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {feature.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-primary mb-2">Examples:</div>
                        {feature.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="text-xs text-muted-foreground">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="relative w-full h-96 lg:h-[500px]">
                <Image
                  src="/kallon(sentry_tower)/kallon.png"
                  alt="Kallon Support & Integration"
                  fill
                  className="object-contain rounded-3xl"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
                
                {/* Floating Support Indicators */}
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
                  <div className="text-2xl font-bold">{slides[currentSlide].title}</div>
                  <div className="text-sm opacity-90">{slides[currentSlide].subtitle}</div>
                </div>
              </div>

              {/* Support Performance Indicators */}
              <motion.div
                className="absolute -bottom-8 -right-8 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Enterprise</div>
                  <div className="text-sm text-muted-foreground">Grade Security</div>
                  <div className="text-xs text-muted-foreground">AES-256 encryption</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-12">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
