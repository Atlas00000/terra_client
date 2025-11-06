"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function DumaOperationsSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Ground Operations Excellence",
      subtitle: "Advanced Ground-Based Capabilities",
      content: {
        capabilities: [
          {
            title: "All-Terrain Navigation",
            description: "Advanced ground navigation across diverse terrain types",
            details: ["Rough terrain traversal", "Obstacle avoidance", "Path optimization", "Terrain mapping"]
          },
          {
            title: "Autonomous Ground Operations",
            description: "Fully autonomous ground-based mission execution",
            details: ["Mission planning", "Route optimization", "Threat assessment", "Decision making"]
          },
          {
            title: "Weather-Resistant Operations",
            description: "Reliable performance in challenging weather conditions",
            details: ["IP54 protection", "Temperature resistance", "Moisture protection", "Wind resistance"]
          },
          {
            title: "Long-Endurance Missions",
            description: "Extended operational capabilities for sustained missions",
            details: ["8-hour endurance", "Battery optimization", "Power management", "Mission continuity"]
          }
        ]
      }
    },
    {
      title: "Performance Metrics",
      subtitle: "Exceptional Ground Performance",
      content: {
        metrics: [
          {
            title: "Ground Endurance & Range",
            value: "8 hours",
            description: "Extended operational endurance",
            details: ["15km operational range", "Battery life optimization", "Power efficiency", "Mission duration"]
          },
          {
            title: "Speed & Maneuverability",
            value: "Variable",
            description: "Adaptive speed control",
            details: ["Terrain-adaptive speed", "Precision maneuvering", "Obstacle navigation", "Safety protocols"]
          },
          {
            title: "Weather Resistance",
            value: "IP54",
            description: "Robust weather protection",
            details: ["Dust protection", "Water resistance", "Temperature tolerance", "Environmental durability"]
          },
          {
            title: "Operational Efficiency",
            value: "95%",
            description: "High operational efficiency",
            details: ["Mission success rate", "Resource optimization", "Cost effectiveness", "ROI maximization"]
          }
        ]
      }
    },
    {
      title: "ArtemisOS Integration",
      subtitle: "Seamless System Coordination",
      content: {
        integration: [
          {
            title: "Seamless Integration",
            description: "Complete integration with ArtemisOS ecosystem",
            details: ["Unified control interface", "Data synchronization", "System compatibility", "Platform integration"]
          },
          {
            title: "Autonomous Mission Planning",
            description: "AI-powered mission planning and execution",
            details: ["Mission optimization", "Route planning", "Resource allocation", "Risk assessment"]
          },
          {
            title: "Real-time Coordination",
            description: "Live coordination with other systems",
            details: ["Live data sharing", "Real-time updates", "Communication protocols", "System synchronization"]
          },
          {
            title: "Multi-unit Operations",
            description: "Coordinated operations with multiple units",
            details: ["Fleet management", "Unit coordination", "Task distribution", "Collective intelligence"]
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
    }, 8000)

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
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Ground Data Points */}
        {!isReducedMotion && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${10 + (i * 4) % 80}%`,
                  top: `${15 + (i * 5) % 70}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.6, 1.4, 0.6]
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </>
        )}

        {/* Ground Operations Grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(0, 255, 127, 0.1) 49%, rgba(0, 255, 127, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '150px 150px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '150px 150px']
          }}
          transition={{
            duration: 15,
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
            <span className="text-sm font-medium text-primary">Ground Operations & Performance</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Advanced Ground</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Operations Platform
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive ground operations with exceptional performance metrics and seamless ArtemisOS integration
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

              {/* Dynamic Content Based on Slide */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.capabilities?.map((capability, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-foreground mb-3">
                        {capability.title}
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        {capability.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {capability.details.map((detail, detailIndex) => (
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

              {currentSlide === 1 && (
                <div className="grid grid-cols-2 gap-6">
                  {slides[currentSlide]?.content?.metrics?.map((metric, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="text-3xl font-bold text-primary mb-2">
                        {metric.value}
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">
                        {metric.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {metric.description}
                      </p>
                      <div className="space-y-2">
                        {metric.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="text-xs text-muted-foreground">
                            • {detail}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 2 && (
                <div className="space-y-6">
                  {slides[currentSlide]?.content?.integration?.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-xl font-bold text-foreground mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-muted-foreground mb-4">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {feature.details.map((detail, detailIndex) => (
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
                  alt="Duma UGV Operations"
                  fill
                  className="object-cover rounded-3xl"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
                
                {/* Floating Indicators */}
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
                  </>
                )}
                
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">{slides[currentSlide].title}</div>
                  <div className="text-sm opacity-90">{slides[currentSlide].subtitle}</div>
                </div>
              </div>
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
