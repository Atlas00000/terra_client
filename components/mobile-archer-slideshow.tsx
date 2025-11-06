"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function MobileArcherSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const { isReducedMotion } = useMobileOptimization()

  const slides = [
    {
      title: "Flight Capabilities",
      subtitle: "VTOL Excellence",
      content: [
        {
          category: "VTOL Capabilities",
          items: [
            "Vertical takeoff and landing capability",
            "No runway required for operations",
            "Rapid deployment in confined spaces",
            "Enhanced operational flexibility"
          ]
        },
        {
          category: "Autonomous Flight",
          items: [
            "Fully autonomous mission execution",
            "GPS-guided navigation system",
            "Obstacle avoidance technology",
            "Return-to-home functionality"
          ]
        },
        {
          category: "Weather Resistance",
          items: [
            "IP54 protection rating",
            "Operates in various weather conditions",
            "Wind resistance up to 15 m/s",
            "Temperature range: -10°C to 50°C"
          ]
        },
        {
          category: "Terrain Performance",
          items: [
            "All-terrain landing capability",
            "Adaptive landing systems",
            "Rough terrain operations",
            "Urban and rural deployment"
          ]
        }
      ]
    },
    {
      title: "Technical Specifications",
      subtitle: "Performance Details",
      content: [
        {
          category: "Physical Specifications",
          items: [
            "Wingspan: 1900mm",
            "Weight: 7.5kg",
            "Payload Capacity: 4kg",
            "Frame: 3K Carbon Fiber Monocoque"
          ]
        },
        {
          category: "Performance Metrics",
          items: [
            "Flight Time: 34 minutes",
            "Range: 15km",
            "Max Speed: 72 km/h",
            "Cruise Speed: 54 km/h"
          ]
        },
        {
          category: "Propulsion System",
          items: [
            "Brushless DC Motors",
            "High-efficiency propellers",
            "Redundant motor configuration",
            "Low noise operation"
          ]
        },
        {
          category: "Payload Management",
          items: [
            "Modular payload system",
            "Quick-release mechanisms",
            "Multi-mission configurations",
            "Sensor integration capability"
          ]
        }
      ]
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
          img.src = '/archer_vtol/archer_vtol_1.png' // Placeholder for text-only slides
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

  return (
    <section className="relative py-16 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
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
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="text-sm font-medium text-primary">Archer VTOL</span>
          </motion.div>

          <h2 className="text-3xl font-black tracking-tighter font-display text-foreground mb-4">
            <span className="block">Flight & Technical</span>
            <span className="block gradient-text">Specifications</span>
          </h2>
        </motion.div>

        {/* Slideshow Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Slide Content */}
          <div className="relative h-[70vh] overflow-hidden rounded-2xl bg-gradient-to-br from-card/20 via-card/10 to-card/20 backdrop-blur-sm border border-border/20">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 p-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <motion.div
                  className="text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {slides[currentSlide].subtitle}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground">
                    {slides[currentSlide].title}
                  </h3>
                </motion.div>

                {/* Content Grid */}
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-6">
                    {slides[currentSlide].content.map((section, sectionIndex) => (
                      <motion.div
                        key={sectionIndex}
                        className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-green-400/5 border border-primary/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + sectionIndex * 0.1, duration: 0.4 }}
                      >
                        <h4 className="text-lg font-bold text-foreground mb-3">
                          {section.category}
                        </h4>
                        <div className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              className="flex items-start gap-3 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + sectionIndex * 0.1 + itemIndex * 0.05, duration: 0.3 }}
                            >
                              <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-green-400 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{item}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <motion.div
            className="flex justify-center gap-3 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
