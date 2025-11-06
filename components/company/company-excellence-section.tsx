"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function CompanyExcellenceSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Leadership Excellence",
      subtitle: "Royal & Military Command",
      content: {
        leadership: [
          {
            title: "His Imperial Majesty, the Ooni of Ife",
            description: "One of the most powerful kings in Africa, bringing deep passion for Nigeria's industrial and economic prosperity",
            details: ["Royal leadership", "Economic vision", "Strategic positioning", "Global ambition"],
            impact: "Enhanced credibility and market positioning"
          },
          {
            title: "AVM Ayoola Jolasinmi",
            description: "Former Air Vice Marshal with extensive military and defense expertise",
            details: ["Military expertise", "Defense leadership", "Strategic guidance", "Industry knowledge"],
            impact: "Strengthened defense and security capabilities"
          },
          {
            title: "Engr. Mansur Ahmed",
            description: "Renowned engineer with deep industry expertise and technical leadership",
            details: ["Engineering excellence", "Technical leadership", "Industry expertise", "Innovation focus"],
            impact: "Enhanced technical capabilities and innovation"
          }
        ]
      }
    },
    {
      title: "Manufacturing Excellence",
      subtitle: "Africa's Largest Drone Factory",
      content: {
        manufacturing: [
          {
            title: "Manufacturing Capabilities",
            value: "20 Iroko Drones/Day",
            description: "Mass production capabilities for high-volume drone manufacturing",
            details: ["Automated assembly lines", "Quality control systems", "Production optimization", "Scalable operations"]
          },
          {
            title: "Economic Impact",
            value: "80% Local Sourcing",
            description: "Significant economic contribution through local sourcing and job creation",
            details: ["Job creation", "Local sourcing", "Economic contribution", "Supply chain development"]
          },
          {
            title: "Expansion Plans",
            value: "3-Year Growth",
            description: "Comprehensive three-year expansion plan for facility growth and capacity scaling",
            details: ["Facility expansion", "Capacity scaling", "Technology upgrades", "Market expansion"]
          },
          {
            title: "Innovation",
            value: "Advanced Manufacturing",
            description: "Cutting-edge manufacturing innovation and process optimization",
            details: ["Process optimization", "Technology integration", "Innovation focus", "Quality excellence"]
          }
        ]
      }
    },
    {
      title: "Infrastructure Protection",
      subtitle: "$13+ Billion in Critical Infrastructure Protected",
      content: {
        infrastructure: [
          {
            title: "Critical Infrastructure",
            value: "$13B+",
            description: "Protecting over $13 billion in critical infrastructure assets across Africa",
            details: ["Power infrastructure", "Oil & gas facilities", "Telecommunications", "Transportation hubs"]
          },
          {
            title: "Case Studies",
            value: "Real-World",
            description: "Proven success stories and impact metrics from real-world deployments",
            details: ["Success stories", "Impact metrics", "Deployment records", "Performance data"]
          },
          {
            title: "Security Solutions",
            value: "Comprehensive",
            description: "Complete security solutions for threat mitigation and risk management",
            details: ["Threat mitigation", "Risk management", "Security protocols", "Protection systems"]
          },
          {
            title: "Market Impact",
            value: "Leadership",
            description: "Market leadership in infrastructure security and strategic positioning",
            details: ["Market leadership", "Strategic positioning", "Industry influence", "Competitive advantage"]
          }
        ]
      }
    },
    {
      title: "Technology Innovation",
      subtitle: "ArtemisOS Platform Excellence",
      content: {
        innovation: [
          {
            title: "ArtemisOS Platform",
            description: "AI-powered intelligence platform for autonomous operations and system coordination",
            details: ["AI-powered intelligence", "Autonomous operations", "System coordination", "Real-time processing"],
            examples: ["Mission planning", "Fleet management", "Threat detection", "Data analysis"]
          },
          {
            title: "Innovation Leadership",
            description: "Technology advancement and R&D capabilities driving market transformation",
            details: ["Technology advancement", "R&D capabilities", "Future vision", "Innovation focus"],
            examples: ["Research initiatives", "Technology development", "Market innovation", "Industry leadership"]
          },
          {
            title: "Integration Excellence",
            description: "Seamless system integration and platform capabilities across the ecosystem",
            details: ["System integration", "Platform capabilities", "Ecosystem coordination", "Unified operations"],
            examples: ["Cross-platform integration", "Data synchronization", "Unified control", "Seamless operations"]
          },
          {
            title: "Technology Impact",
            description: "Market transformation and industry leadership through technological innovation",
            details: ["Market transformation", "Industry leadership", "Technology adoption", "Innovation impact"],
            examples: ["Market disruption", "Industry evolution", "Technology adoption", "Innovation leadership"]
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
    }, 12000)

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
              radial-gradient(circle at 25% 25%, rgba(74, 144, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(0, 255, 127, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Excellence Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${5 + (i * 3) % 90}%`,
                  top: `${10 + (i * 3) % 80}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 6 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.1
                }}
              />
            ))}
          </>
        )}

        {/* Excellence Data Streams */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(30deg, transparent 48%, rgba(74, 144, 226, 0.08) 49%, rgba(74, 144, 226, 0.08) 51%, transparent 52%),
              linear-gradient(-30deg, transparent 48%, rgba(0, 255, 127, 0.08) 49%, rgba(0, 255, 127, 0.08) 51%, transparent 52%)
            `,
            backgroundSize: '200px 200px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '200px 200px']
          }}
          transition={{
            duration: 25,
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
            <span className="text-sm font-medium text-primary">Company Excellence</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Strategic</span>
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
            Leadership excellence, manufacturing capabilities, infrastructure protection, and technology innovation driving market leadership
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

              {/* Leadership Excellence Content */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.leadership?.map((leader, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-foreground mb-3">{leader.title}</h4>
                      <p className="text-muted-foreground mb-4">{leader.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {leader.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20">
                        <div className="text-sm font-medium text-primary mb-1">Impact:</div>
                        <div className="text-sm text-muted-foreground">{leader.impact}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Manufacturing Excellence Content */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-2 gap-6">
                  {slides[currentSlide]?.content?.manufacturing?.map((capability, index) => (
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

              {/* Infrastructure Protection Content */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-2 gap-6">
                  {slides[currentSlide]?.content?.infrastructure?.map((protection, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="text-3xl font-bold text-green-400 mb-2">{protection.value}</div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{protection.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{protection.description}</p>
                      <div className="space-y-2">
                        {protection.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="text-xs text-muted-foreground">
                            • {detail}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Technology Innovation Content */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.innovation?.map((innovation, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-foreground mb-3">{innovation.title}</h4>
                      <p className="text-muted-foreground mb-4">{innovation.description}</p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {innovation.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-primary mb-2">Examples:</div>
                        {innovation.examples.map((example, exampleIndex) => (
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
                  src="/stories/Technology_and_AI_Innovation_Focus.png"
                  alt="Company Excellence"
                  fill
                  className="object-contain rounded-3xl"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
                
                {/* Floating Excellence Indicators */}
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

              {/* Excellence Performance Indicators */}
              <motion.div
                className="absolute -bottom-8 -right-8 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Excellence</div>
                  <div className="text-sm text-muted-foreground">Leadership</div>
                  <div className="text-xs text-muted-foreground">Strategic positioning</div>
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
