"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import Image from "next/image"

export function ArtemisCapabilitiesSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      type: "capability",
      title: "Autonomous Mission Planning",
      description: "AI-powered mission planning that analyzes threat levels, environmental conditions, and resource availability to create optimal defense strategies without human intervention.",
      features: [
        "Real-time threat assessment and analysis",
        "Environmental condition monitoring", 
        "Resource optimization algorithms",
        "Dynamic mission adaptation"
      ],
      metrics: {
        "Processing Speed": "<1 second",
        "Accuracy Rate": "99.5%",
        "Mission Success": "99.8%"
      }
    },
    {
      type: "capability", 
      title: "Real-Time Threat Detection",
      description: "Advanced sensor fusion and AI analysis to detect and classify threats in real-time, providing instant alerts and automated response protocols.",
      features: [
        "Multi-sensor data fusion",
        "Advanced threat classification",
        "Instant alert systems",
        "Automated response protocols"
      ],
      metrics: {
        "Detection Speed": "<0.5 seconds",
        "Classification Accuracy": "99.5%",
        "False Positive Rate": "<0.1%"
      }
    },
    {
      type: "capability",
      title: "Fleet Coordination",
      description: "Intelligent coordination of multiple defense systems, ensuring seamless communication and synchronized operations across all deployed assets.",
      features: [
        "Multi-system coordination protocols",
        "Real-time communication networks",
        "Synchronized operational planning",
        "Centralized asset management"
      ],
      metrics: {
        "Coordination Efficiency": "99.9%",
        "Communication Latency": "<10ms",
        "System Integration": "100%"
      }
    },
    {
      type: "capability",
      title: "AI-Powered Target Identification", 
      description: "Machine learning algorithms that identify and classify targets with exceptional accuracy, distinguishing between threats and non-threats in complex environments.",
      features: [
        "Advanced target classification",
        "99.5% identification accuracy",
        "Complex environment analysis",
        "Threat differentiation algorithms"
      ],
      metrics: {
        "Identification Accuracy": "99.5%",
        "Processing Time": "<0.3 seconds",
        "Confidence Level": "99.8%"
      }
    },
    {
      type: "performance",
      title: "Processing Power",
      description: "Neural network processing power for real-time AI operations with 1000+ TOPS computing capability.",
      features: [
        "1000+ TOPS processing power",
        "50+ neural network layers",
        "10M+ training samples",
        "Real-time AI operations"
      ],
      metrics: {
        "Processing Power": "1000+ TOPS",
        "Neural Layers": "50+",
        "Training Data": "10M+ samples"
      }
    },
    {
      type: "performance",
      title: "System Reliability",
      description: "Exceptional system uptime and reliability with 99.9% operational availability for continuous defense operations.",
      features: [
        "99.9% system uptime",
        "24/7 operational capability",
        "Redundant backup systems",
        "Continuous monitoring"
      ],
      metrics: {
        "System Uptime": "99.9%",
        "Response Time": "<1 second",
        "Availability": "24/7"
      }
    }
  ]

  // Auto-rotation
  useEffect(() => {
    if (isReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length, isReducedMotion])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const currentSlideData = slides[currentSlide]

  return (
    <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(74, 144, 226, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 255, 127, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating Data Points */}
        {!isReducedMotion && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${15 + (i * 12) % 70}%`,
                  top: `${20 + (i * 15) % 60}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 2 + (i % 2),
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
                scale: [1, 1.2, 1], 
                opacity: [1, 0.7, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Core Capabilities & Performance</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">AI-Powered</span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-green-400 bg-clip-text text-transparent">
              Defense Systems
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Advanced AI capabilities and exceptional performance metrics that enable autonomous decision-making, 
            real-time threat detection, and coordinated defense operations across all deployed systems
          </motion.p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Slide Content */}
          <motion.div
            key={currentSlide}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Side - Content */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <div>
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {currentSlideData.type === 'capability' ? 'Core Capability' : 'Performance Metric'}
                    </motion.div>
                    
                    <h3 className="text-4xl font-bold text-foreground mb-6">
                      {currentSlideData.title}
                    </h3>
                    
                    <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                      {currentSlideData.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-foreground mb-4">Key Features</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {currentSlideData.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-blue-500 rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(currentSlideData.metrics).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      >
                        <div className="text-2xl font-bold text-primary mb-1">{value}</div>
                        <div className="text-sm text-muted-foreground">{key}</div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Side - Visual */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className="relative w-full h-96 lg:h-[500px]">
                    <Image
                      src="/ArtemisOS/autonomous_mission_planning.png"
                      alt={`${currentSlideData.title} - ArtemisOS Platform`}
                      fill
                      className="object-cover rounded-2xl"
                      priority
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />
                    
                    {/* Floating Performance Indicators */}
                    {!isReducedMotion && (
                      <>
                        <motion.div
                          className="absolute top-8 left-8 w-3 h-3 bg-primary rounded-full"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute top-16 right-12 w-2 h-2 bg-blue-500 rounded-full"
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute bottom-20 left-16 w-4 h-4 bg-green-400 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                        />
                      </>
                    )}
                    
                    <div className="absolute bottom-6 left-6 text-white">
                      <div className="text-2xl font-bold">{currentSlideData.title}</div>
                      <div className="text-sm opacity-90">ArtemisOS Platform</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-12 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
