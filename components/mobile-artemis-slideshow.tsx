"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function MobileArtemisSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  const slides = [
    // AI Intelligence Core - Neural Processing
    {
      id: "neural-processing",
      title: "Neural Processing",
      subtitle: "AI Intelligence Core",
      content: "Advanced neural network architecture with 50+ specialized AI models for real-time threat detection, pattern recognition, and autonomous decision-making. Processes 10,000+ data points per second with 99.5% accuracy.",
      features: [
        "Real-time threat detection",
        "Pattern recognition algorithms",
        "Autonomous decision-making",
        "10,000+ data points/second",
        "99.5% accuracy rate"
      ],
      visual: "/ArtemisOS/AI_detection_and_tracking.png"
    },
    // AI Intelligence Core - Machine Learning
    {
      id: "machine-learning",
      title: "Machine Learning",
      subtitle: "AI Intelligence Core",
      content: "Continuous learning algorithms that adapt to new threats and operational patterns. Self-improving system that enhances performance over time through advanced machine learning techniques and predictive analytics.",
      features: [
        "Continuous learning algorithms",
        "Adaptive threat detection",
        "Predictive analytics",
        "Self-improving system",
        "Pattern adaptation"
      ],
      visual: "/ArtemisOS/autonomous_mission_planning.png"
    },
    // AI Intelligence Core - Real-World Applications
    {
      id: "real-world-apps",
      title: "Real-World Applications",
      subtitle: "AI Intelligence Core",
      content: "Deployed across critical infrastructure, power systems, and border security operations. Active in Nigeria, South Africa, Zambia, and expanding across Pan-African markets with proven operational success.",
      features: [
        "Critical infrastructure protection",
        "Power system monitoring",
        "Border security operations",
        "Pan-African deployment",
        "Proven operational success"
      ],
      visual: "/ArtemisOS/Geolocation_&_data_analysis.png"
    },
    // Seamless Integration
    {
      id: "seamless-integration",
      title: "Seamless Integration",
      subtitle: "System Integration",
      content: "Unified control system providing seamless coordination between all platforms. Real-time communication and intelligent coordination ensure optimal mission execution across all integrated systems with cross-platform compatibility.",
      features: [
        "Unified control system",
        "Real-time communication",
        "Intelligent coordination",
        "Optimal mission execution",
        "Cross-platform integration"
      ],
      visual: "/ArtemisOS/Drone_fleet_management.png"
    },
    // System Integration - Archer VTOL
    {
      id: "archer-integration",
      title: "Archer VTOL Integration",
      subtitle: "System Integration",
      content: "Modular, multi-mission UAV platform with 3K carbon fiber monocoque frame, 1900mm wingspan, and 4kg payload capacity. Features enhanced terrain performance and AI-assisted autonomous operations.",
      features: [
        "1900mm wingspan",
        "7.5kg weight",
        "4kg payload capacity",
        "34-minute flight time",
        "15km operational range"
      ],
      visual: "/archer_vtol/archer_vtol_1.png"
    },
    // System Integration - Iroko UAV
    {
      id: "iroko-integration",
      title: "Iroko UAV Integration",
      subtitle: "System Integration",
      content: "Modular, mass-producible quadcopter with carbon fiber composite construction and aerospace-grade aluminum. Designed for first response operations with extended endurance and range capabilities.",
      features: [
        "5kg max weight",
        "70 KM/h max speed",
        "50-minute endurance",
        "20km range",
        "1.5kg payload"
      ],
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // System Integration - Duma UGV
    {
      id: "duma-integration",
      title: "Duma UGV Integration",
      subtitle: "System Integration",
      content: "All-terrain ground vehicle with autonomous navigation and modular payload capabilities. Designed for ground surveillance, reconnaissance, and security operations with extended endurance.",
      features: [
        "All-terrain capability",
        "Autonomous navigation",
        "Modular payload system",
        "8-hour endurance",
        "15km operational range"
      ],
      visual: "/Duma_ground_drone/Duma_ground_drone.png"
    },
    // System Integration - Kallon Tower
    {
      id: "kallon-integration",
      title: "Kallon Tower Integration",
      subtitle: "System Integration",
      content: "AI-powered surveillance tower with 360° coverage and autonomous threat detection. Features advanced sensor integration and real-time monitoring capabilities for critical infrastructure protection.",
      features: [
        "360° surveillance coverage",
        "AI-powered threat detection",
        "Real-time monitoring",
        "Advanced sensor integration",
        "Autonomous operations"
      ],
      visual: "/kallon(sentry_tower)/kallon.png"
    }
  ]

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      // Preload current slide and next 2 slides for smoother transitions
      const slidesToPreload = [
        currentSlide,
        (currentSlide + 1) % slides.length,
        (currentSlide + 2) % slides.length
      ]
      
      slidesToPreload.forEach((index) => {
        if (!imagesLoaded.has(index)) {
          const img = new window.Image()
          img.onload = () => {
            setImagesLoaded(prev => new Set([...prev, index]))
          }
          img.onerror = () => {
            // Handle error silently, don't add to loaded set
          }
            setImagesLoaded(prev => new Set([...prev, index]))
          img.src = slides[index].visual
        }
      })
    }
    
    preloadImages()
  }, [slides, imagesLoaded, currentSlide])

  // Auto-rotation
  useEffect(() => {
    if (isReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000) // 8 seconds per slide

    return () => clearInterval(interval)
  }, [slides.length, isReducedMotion])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(74, 144, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(0, 255, 127, 0.3) 0%, transparent 50%)
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            AI Intelligence & System Integration
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            Advanced AI & Integration
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge AI intelligence core with seamless system integration across all platforms
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Slide Content */}
          <div className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0 p-8 flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {slides[currentSlide].title}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-4">
                      {slides[currentSlide].subtitle}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {slides[currentSlide].content}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 gap-2">
                    {slides[currentSlide].features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="w-full md:w-80 h-80 md:h-96 relative">
                  {/* Loading State */}
                  {!imagesLoaded.has(currentSlide) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center rounded-2xl">
                      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                  
                  <Image
                    src={slides[currentSlide].visual}
                    alt={slides[currentSlide].title}
                    fill
                    className={`object-contain rounded-2xl transition-opacity duration-300 ${
                      imagesLoaded.has(currentSlide) ? 'opacity-100' : 'opacity-0'
                    }`}
                    priority={currentSlide === 0}
                    loading={currentSlide === 0 ? "eager" : "lazy"}
                    onLoad={() => setImagesLoaded(prev => new Set([...prev, currentSlide]))}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <motion.button
              onClick={prevSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/20 text-foreground hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </motion.button>

            {/* Slide Indicators */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-primary scale-125'
                      : 'bg-border hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              onClick={nextSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/20 text-foreground hover:bg-primary/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} of {slides.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
