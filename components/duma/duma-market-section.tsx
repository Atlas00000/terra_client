"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function DumaMarketSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Manufacturing Excellence",
      subtitle: "Advanced Ground Vehicle Production",
      content: {
        manufacturing: [
          {
            title: "Mass Production Capabilities",
            description: "Scalable manufacturing for high-volume ground vehicle production",
            details: ["Automated assembly lines", "Quality control systems", "Production optimization", "Scalable operations"],
            metrics: "500+ units/month"
          },
          {
            title: "Quality Control Processes",
            description: "Rigorous quality assurance for ground vehicle reliability",
            details: ["Multi-stage testing", "Performance validation", "Durability testing", "Safety compliance"],
            metrics: "99.8% quality rate"
          },
          {
            title: "Supply Chain Management",
            description: "Optimized supply chain for ground vehicle components",
            details: ["Local sourcing", "Supplier partnerships", "Inventory management", "Cost optimization"],
            metrics: "80% local sourcing"
          },
          {
            title: "Ground Vehicle Specialization",
            description: "Specialized manufacturing for ground-based operations",
            details: ["Terrain-specific design", "Durability optimization", "Ground performance", "Environmental adaptation"],
            metrics: "All-terrain capable"
          }
        ]
      }
    },
    {
      title: "Use Cases & Applications",
      subtitle: "Diverse Ground Operations",
      content: {
        applications: [
          {
            title: "Emergency Services Integration",
            description: "Critical support for emergency response operations",
            details: ["Disaster response", "Search & rescue", "Medical emergencies", "Crisis management"],
            examples: ["Nigerian emergency services", "Disaster relief operations", "Medical supply delivery"]
          },
          {
            title: "Government & Military Applications",
            description: "Strategic ground operations for defense and security",
            details: ["Border security", "Military operations", "Defense contracts", "Security protocols"],
            examples: ["Nigerian military", "Border patrol operations", "Defense partnerships"]
          },
          {
            title: "Commercial & Industrial Uses",
            description: "Business applications for ground surveillance and security",
            details: ["Industrial monitoring", "Commercial security", "Asset protection", "Business operations"],
            examples: ["Oil & gas facilities", "Mining operations", "Industrial complexes"]
          },
          {
            title: "International Deployment",
            description: "Global ground operations and security solutions",
            details: ["International contracts", "Cross-border operations", "Global partnerships", "Worldwide deployment"],
            examples: ["South African operations", "Zambian partnerships", "Pan-African expansion"]
          }
        ]
      }
    },
    {
      title: "Competitive Advantages",
      subtitle: "Market Leadership Position",
      content: {
        advantages: [
          {
            title: "Unique Selling Propositions",
            description: "Distinctive advantages in ground vehicle market",
            details: ["ArtemisOS integration", "Modular design", "Cost effectiveness", "Local manufacturing"],
            metrics: "40% cost advantage"
          },
          {
            title: "Technology Differentiation",
            description: "Advanced technology for superior ground operations",
            details: ["AI-powered autonomy", "Real-time coordination", "Weather resistance", "Long endurance"],
            metrics: "8-hour endurance"
          },
          {
            title: "Performance Superiority",
            description: "Exceptional performance in ground operations",
            details: ["All-terrain capability", "Autonomous navigation", "Weather resistance", "Operational efficiency"],
            metrics: "95% success rate"
          },
          {
            title: "Market Positioning",
            description: "Strategic position in ground vehicle market",
            details: ["African market leader", "Cost competitive", "Technology advanced", "Locally manufactured"],
            metrics: "Market leader"
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

        {/* Floating Market Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${5 + (i * 3) % 90}%`,
                  top: `${10 + (i * 4) % 80}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5]
                }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </>
        )}

        {/* Market Data Streams */}
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
            <span className="text-sm font-medium text-primary">Market Excellence</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Market Leadership</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              & Excellence
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive manufacturing excellence, diverse applications, and competitive advantages in ground vehicle market
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

              {/* Manufacturing Excellence Content */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.manufacturing?.map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-xl font-bold text-foreground">
                          {item.title}
                        </h4>
                        <div className="text-2xl font-bold text-primary">
                          {item.metrics}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {item.details.map((detail, detailIndex) => (
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

              {/* Use Cases & Applications Content */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.applications?.map((app, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-foreground mb-3">
                        {app.title}
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        {app.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {app.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-primary mb-2">Real Examples:</div>
                        {app.examples.map((example, exampleIndex) => (
                          <div key={exampleIndex} className="text-xs text-muted-foreground">
                            • {example}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Competitive Advantages Content */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.advantages?.map((advantage, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-xl font-bold text-foreground">
                          {advantage.title}
                        </h4>
                        <div className="text-2xl font-bold text-primary">
                          {advantage.metrics}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {advantage.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {advantage.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                            <span className="text-muted-foreground">{detail}</span>
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
                  src="/Duma_ground_drone/Duma_ground_drone.png"
                  alt="Duma UGV Market Excellence"
                  fill
                  className="object-cover rounded-3xl"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
                
                {/* Floating Market Indicators */}
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

              {/* Market Performance Indicators */}
              <motion.div
                className="absolute -bottom-8 -right-8 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">Market Leader</div>
                  <div className="text-sm text-muted-foreground">Ground Vehicles</div>
                  <div className="text-xs text-muted-foreground">African market</div>
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