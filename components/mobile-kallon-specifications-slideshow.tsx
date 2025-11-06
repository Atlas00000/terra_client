"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function MobileKallonSpecificationsSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  const slides = [
    {
      id: "physical",
      title: "Physical Specifications",
      content: [
        "Height: 8 meters (tower structure)",
        "Base Diameter: 2.5 meters",
        "Weight: 500kg (complete system)",
        "Material: Galvanized steel with weather coating",
        "Installation: Concrete foundation required"
      ],
      image: "/kallon(sentry_tower)/kallon.png",
      color: "from-primary/20 to-blue-500/20",
      borderColor: "border-primary/30"
    },
    {
      id: "surveillance",
      title: "Surveillance Capabilities",
      content: [
        "Detection Range: 3km maximum",
        "Field of View: 360° pan capability",
        "Zoom: 30x optical zoom",
        "Night Vision: Thermal imaging capability",
        "Weather Resistance: IP67 protection rating",
        "Operating Temperature: -40°C to +60°C"
      ],
      image: "/kallon(sentry_tower)/kallon.png",
      color: "from-green-400/20 to-emerald-500/20",
      borderColor: "border-green-400/30"
    },
    {
      id: "ai-system",
      title: "AI System Specifications",
      content: [
        "Processor: Edge AI processing unit",
        "Neural Network: Custom threat detection models",
        "Processing Speed: Real-time analysis",
        "Learning Capability: Continuous improvement",
        "Threat Recognition: 99.5% accuracy rate",
        "Alert Response: Sub-second threat detection"
      ],
      image: "/kallon(sentry_tower)/kallon.png",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: "power-system",
      title: "Power & Energy",
      content: [
        "Solar Panels: 2kW peak power generation",
        "Battery Backup: 48V 200Ah lithium system",
        "Autonomy: 72 hours without sunlight",
        "Power Management: Smart energy optimization",
        "Grid Connection: Optional backup power",
        "Maintenance: Self-cleaning solar panels"
      ],
      image: "/kallon(sentry_tower)/kallon.png",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      id: "communication",
      title: "Communication Systems",
      content: [
        "Primary: LTE/5G cellular connectivity",
        "Backup: Satellite communication",
        "Local Network: Wi-Fi 6 and Ethernet",
        "Encryption: AES-256 secure transmission",
        "Range: 50km communication radius",
        "Redundancy: Multiple communication paths"
      ],
      image: "/kallon(sentry_tower)/kallon.png",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      id: "integration",
      title: "System Integration",
      content: [
        "ArtemisOS: Full integration capability",
        "API Support: RESTful and GraphQL",
        "Data Storage: 1TB local storage",
        "Cloud Sync: Real-time data synchronization",
        "Fleet Management: Multi-tower coordination",
        "Maintenance: Remote diagnostics and updates"
      ],
      image: "/kallon(sentry_tower)/kallon.png",
      color: "from-indigo-500/20 to-purple-500/20",
      borderColor: "border-indigo-500/30"
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
          img.src = slides[index].image
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
  }, [isReducedMotion, slides.length])

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
    <section className="relative py-16 px-6 bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
        animate={!isReducedMotion ? {
          backgroundPosition: ['0px 0px', '60px 60px']
        } : {}}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-primary">Technical Excellence</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical Specifications
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technical details of the Kallon AI-Powered Sentry System
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="bg-gradient-to-br from-card/50 to-card/30 rounded-3xl border border-border/20 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className={`text-2xl font-bold text-foreground bg-gradient-to-r ${slides[currentSlide].color} p-4 rounded-xl border ${slides[currentSlide].borderColor}`}>
                      {slides[currentSlide].title}
                    </h3>
                    
                    <div className="space-y-3">
                      {slides[currentSlide].content.map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-muted/30 to-muted/10 border border-border/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.4 }}
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Slide Counter */}
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-sm text-muted-foreground">
                      {currentSlide + 1} of {slides.length}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={prevSlide}
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                        title="Previous slide"
                        aria-label="Previous slide"
                      >
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 transition-colors"
                        title="Next slide"
                        aria-label="Next slide"
                      >
                        <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual */}
                <div className="relative">
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-muted/20 to-muted/10 border border-border/20">
                    {/* Loading State */}
                    {!imagesLoaded.has(currentSlide) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center rounded-2xl">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      </div>
                    )}
                    
                    <Image
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      fill
                      className={`object-contain p-4 transition-opacity duration-300 ${
                        imagesLoaded.has(currentSlide) ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={currentSlide === 0}
                      loading={currentSlide === 0 ? "eager" : "lazy"}
                      onLoad={() => setImagesLoaded(prev => new Set([...prev, currentSlide]))}
                    />
                    
                    {/* Floating Indicators */}
                    {!isReducedMotion && (
                      <>
                        <motion.div
                          className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute bottom-4 left-4 w-2 h-2 bg-green-400 rounded-full"
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                      </>
                    )}
                  </div>

                  {/* Technical Badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/30 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="text-xs font-bold text-primary">Kallon Tower</div>
                    <div className="text-xs text-muted-foreground">Technical Specs</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                title={`Go to slide ${index + 1}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
