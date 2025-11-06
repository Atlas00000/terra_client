"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

const productData = [
  {
    id: 1,
    name: "ArtemisOS",
    title: "AI-Powered Central Intelligence Platform",
    image: "/ArtemisOS/autonomous_mission_planning.png",
    description: "Terrahaptix's flagship AI-powered, open operating system serving as the central intelligence platform for all autonomous defense systems. Provides real-time threat detection, autonomous mission planning, and fleet management capabilities.",
    features: [
      "Autonomous Mission Planning",
      "Real-Time Threat Detection", 
      "Drone Fleet Management",
      "AI-Powered Target Identification"
    ],
    metrics: {
      responseTime: "<1 second",
      accuracy: "99.5%",
      uptime: "99.9%",
      systems: "1000+"
    },
    color: "purple",
    href: "/artemis"
  },
  {
    id: 2,
    name: "Archer VTOL",
    title: "Vertical Takeoff & Landing Drone",
    image: "/archer_vtol/archer_vtol_1.png",
    description: "Advanced vertical takeoff and landing drone designed for versatile deployment in challenging environments. Features autonomous flight capabilities, extended range, and precision landing systems for critical infrastructure protection.",
    features: [
      "Vertical Takeoff & Landing",
      "Extended Flight Range",
      "Precision Landing Systems",
      "Autonomous Flight Control"
    ],
    metrics: {
      range: "50+ km",
      endurance: "2+ hours",
      payload: "5kg",
      speed: "120 km/h"
    },
    color: "blue",
    href: "/archer"
  },
  {
    id: 3,
    name: "Iroko UAV",
    title: "Intelligence, Surveillance & Reconnaissance",
    image: "/Iroko_UAV/Iroko_UAV .png",
    description: "High-performance unmanned aerial vehicle designed for intelligence, surveillance, and reconnaissance missions. Features advanced sensor suites, long-endurance flight, and real-time data transmission capabilities.",
    features: [
      "Advanced Sensor Suites",
      "Long-Endurance Flight",
      "Real-Time Data Transmission",
      "Multi-Mission Capability"
    ],
    metrics: {
      endurance: "8+ hours",
      range: "100+ km",
      altitude: "5000m",
      sensors: "Multi-spectral"
    },
    color: "green",
    href: "/iroko"
  },
  {
    id: 4,
    name: "Duma UGV",
    title: "Unmanned Ground Vehicle",
    image: "/Duma_ground_drone/Duma_ground_drone.png",
    description: "Autonomous unmanned ground vehicle designed for ground-based security operations. Features all-terrain capabilities, autonomous navigation, and integrated weapon systems for comprehensive ground defense.",
    features: [
      "All-Terrain Capabilities",
      "Autonomous Navigation",
      "Integrated Weapon Systems",
      "Ground Security Operations"
    ],
    metrics: {
      speed: "40 km/h",
      range: "200+ km",
      payload: "100kg",
      terrain: "All-terrain"
    },
    color: "orange",
    href: "/duma"
  },
  {
    id: 5,
    name: "Kallon Tower",
    title: "Surveillance & Communication Tower",
    image: "/kallon(sentry_tower)/kallon.png",
    description: "Advanced surveillance and communication tower system providing 360-degree monitoring capabilities. Features integrated radar systems, communication arrays, and autonomous threat detection for comprehensive area security.",
    features: [
      "360-Degree Monitoring",
      "Integrated Radar Systems",
      "Communication Arrays",
      "Autonomous Threat Detection"
    ],
    metrics: {
      range: "15+ km",
      height: "30m",
      coverage: "360°",
      detection: "Multi-target"
    },
    color: "red",
    href: "/kallon"
  }
]

export function MobileProductSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const { isMobile, isReducedMotion, getAnimationSettings } = useMobileOptimization()

  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      // Preload current slide and next 2 slides for smoother transitions
      const slidesToPreload = [
        currentSlide,
        (currentSlide + 1) % productData.length,
        (currentSlide + 2) % productData.length
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
          img.src = productData[index].image
        }
      })
    }
    
    preloadImages()
  }, [productData, imagesLoaded, currentSlide])

  // Auto-rotation for mobile
  useEffect(() => {
    if (!isMobile || isReducedMotion || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % productData.length)
    }, 7000) // 7 seconds per slide on mobile

    return () => clearInterval(interval)
  }, [isMobile, isReducedMotion, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 20 seconds
    setTimeout(() => setIsAutoPlaying(true), 20000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 20000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + productData.length) % productData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 20000)
  }

  const animationSettings = getAnimationSettings()

  if (!isMobile) {
    return null // Only show on mobile
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-charcoal overflow-hidden">
      {/* Mobile Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(74, 144, 226, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(74, 144, 226, 0.1) 75%)
            `,
            backgroundSize: '30px 30px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0 0, 0 15px, 15px -15px, -15px 0px', '30px 30px, 30px 45px, 45px 15px, 15px 30px']
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[90vw] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-medium text-primary">Product Ecosystem</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            className="text-3xl font-black tracking-tighter font-display text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="block">Five Integrated</span>
            <span className="block gradient-text">Defense Systems</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-base text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Complete autonomous defense ecosystem protecting Africa's critical infrastructure
          </motion.p>
        </motion.div>

        {/* Mobile Product Slideshow */}
        <div className="relative">
          {/* Slideshow Container */}
          <div className="relative h-[600px] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="relative h-full bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/20">
                  {/* Product Image */}
                  <div className="relative h-2/5">
                    {/* Loading State */}
                    {!imagesLoaded.has(currentSlide) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      </div>
                    )}
                    
                    <Image
                      src={productData[currentSlide].image}
                      alt={productData[currentSlide].name}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        imagesLoaded.has(currentSlide) ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={currentSlide === 0}
                      loading={currentSlide === 0 ? "eager" : "lazy"}
                      onLoad={() => setImagesLoaded(prev => new Set([...prev, currentSlide]))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Product Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                        productData[currentSlide].color === 'purple' ? 'bg-purple-500/20 text-purple-500' :
                        productData[currentSlide].color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                        productData[currentSlide].color === 'green' ? 'bg-green-500/20 text-green-500' :
                        productData[currentSlide].color === 'orange' ? 'bg-orange-500/20 text-orange-500' :
                        'bg-red-500/20 text-red-500'
                      } text-xs font-medium`}>
                        <span className={`w-2 h-2 rounded-full ${
                          productData[currentSlide].color === 'purple' ? 'bg-purple-500' :
                          productData[currentSlide].color === 'blue' ? 'bg-blue-500' :
                          productData[currentSlide].color === 'green' ? 'bg-green-500' :
                          productData[currentSlide].color === 'orange' ? 'bg-orange-500' :
                          'bg-red-500'
                        }`} />
                        {productData[currentSlide].title}
                      </div>
                    </div>
                  </div>

                  {/* Product Content */}
                  <div className="p-6 h-3/5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                        {productData[currentSlide].name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {productData[currentSlide].description}
                      </p>

                      {/* Key Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Key Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {productData[currentSlide].features.slice(0, 4).map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                productData[currentSlide].color === 'purple' ? 'bg-purple-500' :
                                productData[currentSlide].color === 'blue' ? 'bg-blue-500' :
                                productData[currentSlide].color === 'green' ? 'bg-green-500' :
                                productData[currentSlide].color === 'orange' ? 'bg-orange-500' :
                                'bg-red-500'
                              }`} />
                              <span className="text-xs text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-foreground mb-2">Performance</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(productData[currentSlide].metrics).slice(0, 4).map(([key, value], index) => (
                            <div key={index} className="flex justify-between items-center">
                              <span className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                              <span className="text-xs font-medium text-primary">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* View Product Button */}
                    <motion.div
                      className="mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        href={productData[currentSlide].href}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-xl"
                        style={{ touchAction: 'manipulation' }}
                      >
                        <span>View Product</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            {/* Previous Button */}
            <motion.button
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 flex items-center justify-center"
              onClick={prevSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ touchAction: 'manipulation' }}
            >
              <span className="text-foreground text-lg">‹</span>
            </motion.button>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {productData.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30'
                  }`}
                  onClick={() => goToSlide(index)}
                  whileHover={{ scale: 1.2 }}
                  style={{ touchAction: 'manipulation' }}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-border/30 flex items-center justify-center"
              onClick={nextSlide}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ touchAction: 'manipulation' }}
            >
              <span className="text-foreground text-lg">›</span>
            </motion.button>
          </div>

          {/* Auto-play Indicator */}
          <div className="flex items-center justify-center mt-4">
            <motion.div
              className="flex items-center gap-2 text-xs text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
              <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
