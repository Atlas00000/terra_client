"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useFeaturedNews } from "@/hooks/use-featured-news"
import { NewsSlideshowSkeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export function MobileCompanyNewsSlideshow() {
  const { isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())

  // Fetch news from backend (or use fallback data)
  const { data: slides, isLoading } = useFeaturedNews()

  // Show loading skeleton while fetching
  if (isLoading) {
    return <NewsSlideshowSkeleton />
  }

  // If no slides (shouldn't happen due to fallback), return null
  if (!slides || slides.length === 0) {
    return null
  }

  // Original hardcoded slides (now as fallback - not used since hook has fallback)
  const fallbackSlides = [
    {
      title: "Board Leadership",
      subtitle: "Royal & Military Command",
      content: "Strategic board appointments bringing royal leadership, military expertise, and engineering excellence to drive company success",
      items: [
        {
          title: "Ooni of Ife Joins Board",
          description: "His Imperial Majesty, the Ooni of Ife joins Board of Directors",
          details: ["Royal leadership", "Strategic positioning", "Enhanced credibility", "Market influence"],
          impact: "Enhanced credibility and market positioning"
        },
        {
          title: "AVM Jolasinmi Appointment",
          description: "AVM Ayoola Jolasinmi joins Board of Directors",
          details: ["Military expertise", "Defense leadership", "Strategic guidance", "Industry knowledge"],
          impact: "Strengthened defense capabilities"
        }
      ],
      visual: "/stories/Ooni_to_Board1.jpeg"
    },
    {
      title: "Technical Excellence",
      subtitle: "Engineering Leadership",
      content: "Engineering excellence and technical leadership driving innovation and industry expertise with focus on technical capabilities",
      items: [
        {
          title: "Engr. Mansur Ahmed Addition",
          description: "Engr. Mansur Ahmed joins Board of Directors",
          details: ["Engineering excellence", "Technical leadership", "Industry expertise", "Innovation focus"],
          impact: "Enhanced technical capabilities"
        },
        {
          title: "Technical Advisory Board",
          description: "Strengthened technical advisory capabilities and engineering leadership",
          details: ["Technical advisory", "Engineering leadership", "Innovation focus", "Technical expertise"],
          impact: "Strengthened technical foundation"
        }
      ],
      visual: "/stories/Addition_Engr_Mansur_Ahmed.jpeg"
    },
    {
      title: "Business Growth",
      subtitle: "Contract Success & Market Leadership",
      content: "Major contract achievements demonstrating market leadership and business growth through strategic positioning and market success",
      items: [
        {
          title: "Largest Contract Achievement",
          description: "Major contract win demonstrating market leadership",
          details: ["Contract success", "Market leadership", "Business growth", "Strategic positioning"],
          impact: "Significant business growth"
        },
        {
          title: "Market Leadership",
          description: "Established market leadership position through strategic initiatives",
          details: ["Market leadership", "Strategic initiatives", "Competitive advantage", "Market position"],
          impact: "Strengthened market position"
        }
      ],
      visual: "/stories/Largest_Contract_Achievement.jpeg"
    },
    {
      title: "International Expansion",
      subtitle: "Global Market Development",
      content: "Successful international expansion and global market development with focus on export success and international presence",
      items: [
        {
          title: "South Africa Export Success",
          description: "Successful export to South Africa expanding international presence",
          details: ["International expansion", "Export success", "Market growth", "Global presence"],
          impact: "Expanded international market"
        },
        {
          title: "Global Market Development",
          description: "Strategic global market development and international growth initiatives",
          details: ["Global markets", "International growth", "Market development", "Strategic expansion"],
          impact: "Accelerated global growth"
        }
      ],
      visual: "/stories/South_Africa_Export_Success.jpeg"
    },
    {
      title: "Manufacturing Excellence",
      subtitle: "Factory Upgrades & Production",
      content: "Major manufacturing upgrades and production optimization enhancing manufacturing capabilities and production efficiency",
      items: [
        {
          title: "Upgraded Drone Factory",
          description: "Major factory upgrade enhancing manufacturing capabilities",
          details: ["Manufacturing upgrade", "Capacity expansion", "Technology advancement", "Production optimization"],
          impact: "Enhanced manufacturing capabilities"
        },
        {
          title: "Production Optimization",
          description: "Advanced production optimization and manufacturing efficiency improvements",
          details: ["Production optimization", "Manufacturing efficiency", "Capacity expansion", "Technology advancement"],
          impact: "Improved production efficiency"
        }
      ],
      visual: "/stories/Upgraded_Drone_Factory.jpeg"
    },
    {
      title: "Media Coverage",
      subtitle: "News Stories & Industry Recognition",
      content: "Comprehensive media coverage and industry recognition highlighting company achievements and public awareness",
      items: [
        {
          title: "News Stories",
          description: "Comprehensive media coverage and news stories highlighting company achievements",
          details: ["Media coverage", "News stories", "Public awareness", "Industry recognition"],
          impact: "225+ LinkedIn Engagement"
        },
        {
          title: "Industry Recognition",
          description: "Industry recognition and awards for innovation and leadership",
          details: ["Industry awards", "Recognition", "Innovation leadership", "Market position"],
          impact: "Industry Leader Status"
        }
      ],
      visual: "/stories/Technology_and_AI_Innovation_Focus.png"
    },
    {
      title: "Public Awareness",
      subtitle: "Community Engagement & Brand Recognition",
      content: "Growing public awareness and community engagement with focus on brand recognition and market presence",
      items: [
        {
          title: "Public Awareness",
          description: "Growing public awareness and community engagement",
          details: ["Public awareness", "Community engagement", "Brand recognition", "Market presence"],
          impact: "Growing Awareness"
        },
        {
          title: "Brand Recognition",
          description: "Enhanced brand recognition and market presence through strategic initiatives",
          details: ["Brand recognition", "Market presence", "Strategic initiatives", "Public engagement"],
          impact: "Enhanced Brand Value"
        }
      ],
      visual: "/stories/africa_industralization_role1.png"
    },
    {
      title: "Social Impact",
      subtitle: "Community Engagement & Job Creation",
      content: "Active community engagement and social responsibility initiatives with significant job creation and economic impact",
      items: [
        {
          title: "Community Engagement",
          description: "Active community engagement and social responsibility initiatives",
          details: ["Community engagement", "Social responsibility", "Local impact", "Community support"],
          impact: "Active Engagement"
        },
        {
          title: "Job Creation",
          description: "Significant job creation through manufacturing and operations",
          details: ["Job creation", "Employment opportunities", "Economic impact", "Local employment"],
          impact: "500+ Jobs Created"
        }
      ],
      visual: "/stories/africa_industralization_role2.png"
    },
    {
      title: "Economic Impact",
      subtitle: "Local Sourcing & Economic Contribution",
      content: "Positive economic impact through local sourcing and manufacturing with focus on economic contribution and local development",
      items: [
        {
          title: "Economic Impact",
          description: "Positive economic impact through local sourcing and manufacturing",
          details: ["Economic impact", "Local sourcing", "Manufacturing", "Economic contribution"],
          impact: "80% Local Sourcing"
        },
        {
          title: "Local Development",
          description: "Supporting local development through manufacturing and economic initiatives",
          details: ["Local development", "Economic initiatives", "Community support", "Regional growth"],
          impact: "Regional Economic Growth"
        }
      ],
      visual: "/stories/africa_industralization_role3.png"
    },
    {
      title: "Industry Recognition",
      subtitle: "Awards & Quality Standards",
      content: "Industry recognition through awards, certifications, and quality standards establishing market leadership and industry position",
      items: [
        {
          title: "Awards Recognition",
          description: "Industry awards and recognition for innovation and leadership excellence",
          details: ["Industry awards", "Recognition", "Innovation leadership", "Excellence standards"],
          impact: "Awards Recognition"
        },
        {
          title: "Quality Standards",
          description: "Certifications and quality standards demonstrating commitment to excellence",
          details: ["Quality standards", "Certifications", "Excellence commitment", "Industry standards"],
          impact: "Quality Standards"
        }
      ],
      visual: "/stories/africa_industralization_role4.png"
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

        {/* Floating News Indicators */}
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
            <span className="text-sm font-medium text-primary">News & Achievements</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Recent</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Milestones
            </span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Major achievements, media coverage, social impact, and industry recognition driving company success
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
                      <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {item.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center gap-2 text-xs">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary to-green-400 rounded-full flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20">
                        <div className="text-xs font-medium text-primary mb-1">Impact:</div>
                        <div className="text-xs text-muted-foreground">{item.impact}</div>
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
