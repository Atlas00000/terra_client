"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function MobileIrokoMarketSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  const slides = [
    {
      id: "use-cases",
      title: "Use Cases & Applications",
      content: [
        "Emergency Response: Rapid deployment for disaster relief",
        "Search & Rescue: Autonomous search operations",
        "Infrastructure Inspection: Critical asset monitoring",
        "Medical Emergency: Medical supply delivery",
        "Security Patrol: Automated surveillance missions",
        "Environmental Monitoring: Ecological data collection"
      ],
      image: "/Iroko_UAV/Iroko_UAV .png",
      color: "from-primary/20 to-blue-500/20",
      borderColor: "border-primary/30"
    },
    {
      id: "competitive-advantages",
      title: "Competitive Advantages",
      content: [
        "90-Second Deployment: Fastest response time in market",
        "Modular Design: Mass-producible components",
        "ArtemisOS Integration: Advanced AI coordination",
        "Weather Resistant: IP54 protection rating",
        "Cost Effective: 60% lower than competitors",
        "Local Manufacturing: 80% component sourcing"
      ],
      image: "/Iroko_UAV/Iroko_UAV .png",
      color: "from-green-400/20 to-emerald-500/20",
      borderColor: "border-green-400/30"
    },
    {
      id: "market-position",
      title: "Market Position",
      content: [
        "First Response Leader: #1 in emergency deployment",
        "African Market: 70% market share in Nigeria",
        "International Expansion: Active in 5 countries",
        "Government Contracts: $50M+ in secured deals",
        "Private Sector: 200+ commercial deployments",
        "Future Growth: 300% projected increase"
      ],
      image: "/Iroko_UAV/Iroko_UAV .png",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: "deployment-stats",
      title: "Deployment Statistics",
      content: [
        "Total Deployments: 500+ missions completed",
        "Success Rate: 98.5% mission completion",
        "Response Time: Average 90 seconds",
        "Flight Hours: 2,000+ operational hours",
        "Countries Served: 5 African nations",
        "Customer Satisfaction: 99% approval rating"
      ],
      image: "/Iroko_UAV/Iroko_UAV .png",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      id: "technology-edge",
      title: "Technology Edge",
      content: [
        "AI-Powered: Advanced autonomous capabilities",
        "Real-time Analytics: Instant data processing",
        "Fleet Coordination: Multi-drone operations",
        "Predictive Maintenance: Self-diagnostic systems",
        "Secure Communication: AES-256 encryption",
        "Future-Ready: 5G and IoT integration"
      ],
      image: "/Iroko_UAV/Iroko_UAV .png",
      color: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      id: "economic-impact",
      title: "Economic Impact",
      content: [
        "Job Creation: 200+ direct employment",
        "Local Sourcing: 80% component manufacturing",
        "Export Revenue: $15M+ annual exports",
        "Cost Savings: 40% reduction in response costs",
        "Infrastructure Value: $2B+ assets protected",
        "ROI: 300% return on investment"
      ],
      image: "/Iroko_UAV/Iroko_UAV .png",
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
    }, 10000) // 10 seconds per slide

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
    <section className="relative py-16 px-6 bg-gradient-to-br from-background via-background to-green-400/5">
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 127, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px)
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/20 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-sm font-medium text-green-400">Market Excellence</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Market Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Leading the first response UAV market with proven performance and competitive advantages
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
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
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
                        className="p-2 rounded-lg bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 transition-colors"
                        title="Previous slide"
                        aria-label="Previous slide"
                      >
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextSlide}
                        className="p-2 rounded-lg bg-green-400/10 hover:bg-green-400/20 border border-green-400/20 transition-colors"
                        title="Next slide"
                        aria-label="Next slide"
                      >
                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center">
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
                          className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute bottom-4 left-4 w-2 h-2 bg-primary rounded-full"
                          animate={{ 
                            scale: [1, 1.4, 1],
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute top-1/2 left-4 w-1 h-1 bg-purple-500 rounded-full"
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        />
                      </>
                    )}
                  </div>

                  {/* Market Badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-500/20 border border-green-400/30 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <div className="text-xs font-bold text-green-400">Market Leader</div>
                    <div className="text-xs text-muted-foreground">First Response</div>
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
                    ? 'bg-green-400 scale-125'
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
