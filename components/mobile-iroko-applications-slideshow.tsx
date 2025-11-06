"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function MobileIrokoApplicationsSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  const slides = [
    // Primary Applications - Emergency Response & First Aid
    {
      id: "emergency-response",
      title: "Emergency Response & First Aid",
      subtitle: "Primary Applications",
      content: "Rapid deployment for emergency medical situations with autonomous flight to incident locations and real-time coordination with emergency services.",
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
        "Success Rate": "98.5%"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // Primary Applications - Search & Rescue Operations
    {
      id: "search-rescue",
      title: "Search & Rescue Operations",
      subtitle: "Primary Applications",
      content: "Advanced search and rescue capabilities with AI-powered search algorithms, thermal imaging, and coordinated multi-unit operations for missing person recovery.",
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
        "Success Rate": "96%"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // Primary Applications - Disaster Relief Coordination
    {
      id: "disaster-relief",
      title: "Disaster Relief Coordination",
      subtitle: "Primary Applications",
      content: "Comprehensive disaster relief operations with rapid assessment, supply delivery, and coordination support for emergency management teams.",
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
        "Data Accuracy": "99.2%"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // Primary Applications - Medical Emergency Support
    {
      id: "medical-emergency",
      title: "Medical Emergency Support",
      subtitle: "Primary Applications",
      content: "Specialized medical emergency response with autonomous flight to medical incidents, supply delivery, and coordination with healthcare providers.",
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
        "Success Rate": "97.8%"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // Secondary Applications - Infrastructure Inspection
    {
      id: "infrastructure-inspection",
      title: "Infrastructure Inspection",
      subtitle: "Secondary Applications",
      content: "Comprehensive infrastructure monitoring and inspection with high-resolution imaging, structural assessment, and automated reporting capabilities.",
      features: [
        "High-resolution imaging and video capture",
        "Structural integrity assessment",
        "Automated inspection reporting",
        "Real-time data transmission",
        "Multi-angle inspection capabilities",
        "Integration with maintenance systems"
      ],
      metrics: {
        "Inspection Speed": "5x faster than manual",
        "Image Resolution": "4K video, 48MP stills",
        "Coverage": "Complete 360° inspection",
        "Accuracy": "99.5% detection rate"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // Secondary Applications - Security Patrol
    {
      id: "security-patrol",
      title: "Security Patrol",
      subtitle: "Secondary Applications",
      content: "Automated security patrol operations with intelligent surveillance, threat detection, and real-time monitoring capabilities for enhanced security coverage.",
      features: [
        "Intelligent surveillance and monitoring",
        "Automated threat detection and alerting",
        "Real-time security reporting",
        "Integration with security systems",
        "Multi-zone patrol capabilities",
        "Emergency response coordination"
      ],
      metrics: {
        "Patrol Coverage": "20km operational radius",
        "Threat Detection": "Real-time AI analysis",
        "Response Time": "<30 seconds alert",
        "Reliability": "99.9% uptime"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // Secondary Applications - Environmental Monitoring
    {
      id: "environmental-monitoring",
      title: "Environmental Monitoring",
      subtitle: "Secondary Applications",
      content: "Environmental data collection and monitoring with specialized sensors for air quality, weather conditions, and ecological assessment.",
      features: [
        "Air quality monitoring and analysis",
        "Weather condition assessment",
        "Ecological data collection",
        "Environmental impact reporting",
        "Long-term monitoring capabilities",
        "Integration with environmental systems"
      ],
      metrics: {
        "Data Collection": "Continuous monitoring",
        "Sensor Accuracy": "99.8% precision",
        "Coverage Area": "20km monitoring radius",
        "Reporting": "Real-time environmental data"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
    },
    // Secondary Applications - Agricultural Support
    {
      id: "agricultural-support",
      title: "Agricultural Support",
      subtitle: "Secondary Applications",
      content: "Agricultural monitoring and support services with crop assessment, irrigation management, and precision farming capabilities.",
      features: [
        "Crop health assessment and monitoring",
        "Irrigation system management",
        "Precision farming data collection",
        "Pest and disease detection",
        "Yield prediction and analysis",
        "Integration with farm management systems"
      ],
      metrics: {
        "Crop Assessment": "Multi-spectral analysis",
        "Irrigation Efficiency": "30% water savings",
        "Yield Prediction": "95% accuracy",
        "Coverage": "Large-scale farm monitoring"
      },
      visual: "/Iroko_UAV/Iroko_UAV .png"
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
              radial-gradient(circle at 80% 80%, rgba(0, 255, 127, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)
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
            Mission Applications
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            First Response Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive mission applications designed for emergency response, search & rescue, and critical infrastructure support
          </p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Slide Content */}
          <div className="relative h-[650px] overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm">
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

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {Object.entries(slides[currentSlide].metrics).map(([key, value], index) => (
                      <motion.div
                        key={index}
                        className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <div className="text-primary font-bold text-sm">{value}</div>
                        <div className="text-xs text-muted-foreground">{key}</div>
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
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
