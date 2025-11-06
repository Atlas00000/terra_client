"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function MobileCompanyPartnershipsSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  const slides = [
    {
      title: "Government Partnerships",
      subtitle: "Strategic Government Alliances",
      content: "Strategic partnerships with government agencies and defense organizations driving market expansion and capability enhancement",
      partnerships: [
        {
          title: "Milsat Partnership",
          description: "Strategic partnership with Milsat for satellite communications and defense technology",
          details: ["Satellite communications", "Defense technology", "Strategic collaboration", "Market expansion"],
          impact: "Enhanced satellite communication capabilities"
        },
        {
          title: "Government Contracts",
          description: "Major government contracts for defense and security solutions",
          details: ["Defense contracts", "Security solutions", "Government relations", "Strategic positioning"],
          impact: "Strengthened government relationships"
        }
      ],
      visual: "/stories/Milsat_patnership.jpeg"
    },
    {
      title: "Strategic Alliances",
      subtitle: "Government & Defense Relations",
      content: "Strategic alliances with government agencies and defense organizations for expanded market presence and collaborative projects",
      partnerships: [
        {
          title: "Strategic Alliances",
          description: "Strategic alliances with government agencies and defense organizations",
          details: ["Government agencies", "Defense organizations", "Strategic alliances", "Collaborative projects"],
          impact: "Expanded government market presence"
        },
        {
          title: "Defense Integration",
          description: "Integration with national defense systems and security frameworks",
          details: ["Defense systems", "Security frameworks", "National integration", "Strategic positioning"],
          impact: "Enhanced national security capabilities"
        }
      ],
      visual: "/stories/Ayoola_Jolasinmi_Joins_Board.jpeg"
    },
    {
      title: "International Expansion",
      subtitle: "Pan-African Market Development",
      content: "Comprehensive expansion across African markets with strategic positioning and regional presence development",
      partnerships: [
        {
          title: "Pan-African Expansion",
          description: "Comprehensive expansion across African markets with strategic positioning",
          details: ["African markets", "Strategic positioning", "Market development", "Regional presence"],
          impact: "Expanded African market presence"
        },
        {
          title: "Regional Partnerships",
          description: "Strategic regional partnerships for market development and growth",
          details: ["Regional partnerships", "Market development", "Strategic growth", "Regional presence"],
          impact: "Accelerated regional market growth"
        }
      ],
      visual: "/stories/South_Africa_Export_Success.jpeg"
    },
    {
      title: "Global Partnerships",
      subtitle: "International Market Access",
      content: "Strategic global partnerships for international market development and enhanced global market access",
      partnerships: [
        {
          title: "Global Partnerships",
          description: "Strategic global partnerships for international market development",
          details: ["Global partnerships", "International markets", "Strategic alliances", "Market development"],
          impact: "Enhanced global market access"
        },
        {
          title: "Market Growth",
          description: "Sustained market growth through strategic international expansion",
          details: ["Market growth", "International expansion", "Strategic growth", "Market development"],
          impact: "Accelerated international growth"
        }
      ],
      visual: "/stories/ArtemisOS_Real_Time_Capabilities_Demonstration.jpeg"
    },
    {
      title: "Technology Partnerships",
      subtitle: "Innovation & Capability Enhancement",
      content: "Strategic technology partnerships for innovation and capability enhancement with focus on technology innovation",
      partnerships: [
        {
          title: "Technology Partnerships",
          description: "Strategic technology partnerships for innovation and capability enhancement",
          details: ["Technology innovation", "Capability enhancement", "Strategic partnerships", "Innovation focus"],
          impact: "Enhanced technological capabilities"
        },
        {
          title: "Innovation Alliances",
          description: "Strategic alliances focused on innovation and technological advancement",
          details: ["Innovation focus", "Technological advancement", "Strategic alliances", "Capability enhancement"],
          impact: "Accelerated innovation development"
        }
      ],
      visual: "/stories/Innovation_in_Action.jpeg"
    },
    {
      title: "Industry Collaborations",
      subtitle: "Strategic Market Development",
      content: "Collaborative market development initiatives for growth and expansion through strategic alliances and partnerships",
      partnerships: [
        {
          title: "Strategic Alliances",
          description: "Strategic alliances for market development and competitive positioning",
          details: ["Market development", "Competitive positioning", "Strategic alliances", "Market growth"],
          impact: "Enhanced competitive positioning"
        },
        {
          title: "Market Development",
          description: "Collaborative market development initiatives for growth and expansion",
          details: ["Market development", "Growth initiatives", "Collaborative projects", "Market expansion"],
          impact: "Accelerated market development"
        }
      ],
      visual: "/stories/Made_in_Africa_Innovation.jpeg"
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
    <section className="py-16 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, rgba(74, 144, 226, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(0, 255, 127, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.2) 0%, transparent 50%)
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

        {/* Floating Partnership Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${10 + (i * 5) % 80}%`,
                  top: `${15 + (i * 6) % 70}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.7, 1.1, 0.7]
                }}
                transition={{
                  duration: 3 + (i % 2),
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
          className="text-center mb-12"
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
            <span className="text-sm font-medium text-primary">Strategic Partnerships</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Strategic</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Partnerships
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Strategic partnerships driving market expansion, capability enhancement, and global positioning
          </motion.p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Slide Content */}
          <motion.div
            key={currentSlide}
            className="bg-gradient-to-br from-card/50 to-card/30 rounded-3xl border border-border/20 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Content Side */}
              <div className="space-y-6">
                <div>
                  <motion.h3
                    className="text-2xl font-bold text-foreground mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {slides[currentSlide].title}
                  </motion.h3>
                  <motion.p
                    className="text-lg font-medium text-primary mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                  <motion.p
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    {slides[currentSlide].content}
                  </motion.p>
                </div>

                {/* Partnerships List */}
                <div className="space-y-4">
                  {slides[currentSlide].partnerships.map((partnership, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-green-400/5 border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      <h4 className="text-lg font-bold text-foreground mb-2">{partnership.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{partnership.description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {partnership.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-green-400 rounded-full flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20">
                        <div className="text-xs font-medium text-primary mb-1">Impact:</div>
                        <div className="text-xs text-muted-foreground">{partnership.impact}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Side */}
              <div className="relative">
                <motion.div
                  className="relative h-80 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {/* Loading State */}
                  {!imagesLoaded.has(currentSlide) && (
                    <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  )}
                  
                  <Image
                    src={slides[currentSlide].visual}
                    alt={slides[currentSlide].title}
                    fill
                    className={`object-contain transition-opacity duration-300 ${
                      imagesLoaded.has(currentSlide) ? 'opacity-100' : 'opacity-0'
                    }`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={currentSlide === 0}
                    loading={currentSlide === 0 ? "eager" : "lazy"}
                    onLoad={() => setImagesLoaded(prev => new Set([...prev, currentSlide]))}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20 text-primary hover:from-primary/20 hover:to-green-400/20 transition-all duration-300"
              title="Previous slide"
              aria-label="Previous slide"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Previous</span>
            </button>

            {/* Slide Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-primary to-green-400 scale-125'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  title={`Go to slide ${index + 1}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20 text-primary hover:from-primary/20 hover:to-green-400/20 transition-all duration-300"
              title="Next slide"
              aria-label="Next slide"
            >
              <span className="text-sm font-medium">Next</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
