"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function MobileCompanyMarketSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  const slides = [
    {
      title: "Market Leadership",
      subtitle: "Industry Position & Competitive Advantages",
      content: "Leading position in African defense technology market with unique competitive advantages and significant market share",
      items: [
        {
          title: "Industry Position",
          description: "Leading position in African defense technology market",
          details: ["Market leadership", "Industry position", "Competitive advantage", "Market share"],
          metrics: "Market Leader"
        },
        {
          title: "Competitive Advantages",
          description: "Unique competitive advantages in technology and market positioning",
          details: ["Technology advantage", "Market positioning", "Cost advantage", "Innovation leadership"],
          metrics: "40% Cost Advantage"
        }
      ],
      visual: "/stories/Largest_Contract_Achievement.jpeg"
    },
    {
      title: "Market Share",
      subtitle: "Growth & Market Presence",
      content: "Significant market share in defense technology and security solutions with growing market presence and customer base",
      items: [
        {
          title: "Market Share",
          description: "Significant market share in defense technology and security solutions",
          details: ["Market share", "Market presence", "Customer base", "Revenue growth"],
          metrics: "Growing Market Share"
        },
        {
          title: "Customer Base",
          description: "Expanding customer base across government and private sectors",
          details: ["Government clients", "Private sector", "Customer growth", "Market penetration"],
          metrics: "Expanding Base"
        }
      ],
      visual: "/stories/South_Africa_Export_Success.jpeg"
    },
    {
      title: "Growth Strategy",
      subtitle: "Expansion Plans & Market Development",
      content: "Comprehensive expansion plans for market development and growth with strategic initiatives driving sustained growth",
      items: [
        {
          title: "Expansion Plans",
          description: "Comprehensive expansion plans for market development and growth",
          details: ["Market expansion", "Geographic growth", "Product development", "Strategic initiatives"],
          metrics: "3-Year Plan"
        },
        {
          title: "Market Development",
          description: "Strategic market development initiatives for sustained growth",
          details: ["Market development", "Customer acquisition", "Market penetration", "Growth strategy"],
          metrics: "Strategic Growth"
        }
      ],
      visual: "/stories/Upgraded_Drone_Factory.jpeg"
    },
    {
      title: "Strategic Initiatives",
      subtitle: "Growth Focus & Strategic Objectives",
      content: "Key strategic initiatives driving market growth and expansion with focus on growth objectives and strategic targets",
      items: [
        {
          title: "Strategic Initiatives",
          description: "Key strategic initiatives driving market growth and expansion",
          details: ["Strategic initiatives", "Market growth", "Expansion strategy", "Growth objectives"],
          metrics: "Growth Focused"
        },
        {
          title: "Growth Objectives",
          description: "Ambitious growth objectives for market leadership and expansion",
          details: ["Growth objectives", "Market leadership", "Expansion goals", "Strategic targets"],
          metrics: "Ambitious Goals"
        }
      ],
      visual: "/stories/Innovation_in_Action.jpeg"
    },
    {
      title: "Financial Performance",
      subtitle: "Revenue Growth & Profitability",
      content: "Sustained revenue growth through market expansion and strategic initiatives with strong profitability and operational efficiency",
      items: [
        {
          title: "Revenue Growth",
          description: "Sustained revenue growth through market expansion and strategic initiatives",
          details: ["Revenue growth", "Market expansion", "Strategic growth", "Financial performance"],
          metrics: "Growing Revenue"
        },
        {
          title: "Profitability",
          description: "Strong profitability through operational efficiency and cost optimization",
          details: ["Profitability", "Operational efficiency", "Cost optimization", "Financial health"],
          metrics: "Profitable Growth"
        }
      ],
      visual: "/stories/$13-Billion-Critical_Infrastructure.jpeg"
    },
    {
      title: "Investment Returns",
      subtitle: "Financial Health & ROI Optimization",
      content: "Strong investment returns through strategic investments and market growth with focus on ROI optimization and financial performance",
      items: [
        {
          title: "Investment Returns",
          description: "Strong investment returns through strategic investments and market growth",
          details: ["Investment returns", "Strategic investments", "Market growth", "ROI optimization"],
          metrics: "Strong Returns"
        },
        {
          title: "Financial Health",
          description: "Robust financial health supporting continued growth and expansion",
          details: ["Financial stability", "Growth support", "Investment capacity", "Strategic flexibility"],
          metrics: "Robust Health"
        }
      ],
      visual: "/stories/Made_in_Africa_Innovation.jpeg"
    },
    {
      title: "Future Vision",
      subtitle: "Strategic Roadmap & Growth Objectives",
      content: "Comprehensive strategic roadmap for future growth and market expansion with ambitious growth objectives and strategic vision",
      items: [
        {
          title: "Strategic Roadmap",
          description: "Comprehensive strategic roadmap for future growth and market expansion",
          details: ["Strategic roadmap", "Future planning", "Growth objectives", "Strategic vision"],
          metrics: "5-Year Vision"
        },
        {
          title: "Growth Objectives",
          description: "Ambitious growth objectives for market leadership and expansion",
          details: ["Growth objectives", "Market leadership", "Expansion goals", "Strategic targets"],
          metrics: "Ambitious Goals"
        }
      ],
      visual: "/stories/Autonomous_Technology_Leadership.jpeg"
    },
    {
      title: "Market Expansion",
      subtitle: "Global Presence & International Growth",
      content: "Strategic market expansion initiatives for global presence with focus on international growth and market development",
      items: [
        {
          title: "Market Expansion",
          description: "Strategic market expansion initiatives for global presence",
          details: ["Market expansion", "Global presence", "International growth", "Market development"],
          metrics: "Global Expansion"
        },
        {
          title: "International Growth",
          description: "Comprehensive international growth strategy for global market presence",
          details: ["International markets", "Global strategy", "Market development", "Strategic expansion"],
          metrics: "Global Strategy"
        }
      ],
      visual: "/stories/ArtemisOS_Integration.jpeg"
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

        {/* Floating Market Indicators */}
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
            <span className="text-sm font-medium text-primary">Market Position</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Market</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Leadership
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Market leadership position with competitive advantages, growth strategy, and future vision
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

                {/* Items List */}
                <div className="space-y-4">
                  {slides[currentSlide].items.map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-green-400/5 border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                        <div className="text-lg font-bold text-primary">{item.metrics}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-green-400 rounded-full flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
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
