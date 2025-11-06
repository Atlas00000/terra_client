"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

const leadershipData = [
  {
    id: 1,
    name: "His Imperial Majesty, the Ooni of Ife",
    title: "Board of Directors",
    image: "/stories/Ooni_to_Board1.jpeg",
    description: "One of Africa's most powerful kings, bringing deep passion for Nigeria's industrial and economic prosperity. His royal authority enhances our credibility and government relations, with a global vision to turn Nigeria into a global drone producer.",
    highlights: [
      "Royal Authority & Influence",
      "Economic Development Vision", 
      "Government Relations"
    ],
    color: "purple"
  },
  {
    id: 2,
    name: "Retired Air Vice Marshal Ayoola Jolasinmi",
    title: "Board of Directors",
    image: "/stories/Ayoola_Jolasinmi_Joins_Board.jpeg",
    description: "Distinguished career in the Nigerian Air Force with key positions including Director of Operations, Chief of Defence Space Administration, and Chief of Defence Policy & Plans at Defence Headquarters.",
    highlights: [
      "Military Leadership",
      "Strategic Defense Planning",
      "Space Administration"
    ],
    color: "blue"
  },
  {
    id: 3,
    name: "Engr. Mansur Ahmed",
    title: "Board of Directors", 
    image: "/stories/Addition_Engr_Mansur_Ahmed.jpeg",
    description: "Former Director General of the Manufacturers Association of Nigeria (MAN) with extensive experience in industrial development and manufacturing policy. Brings deep understanding of Nigeria's manufacturing landscape and economic development.",
    highlights: [
      "Industrial Development",
      "Manufacturing Policy",
      "Economic Development"
    ],
    color: "green"
  }
]

export function MobileLeadershipSlideshow() {
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
        (currentSlide + 1) % leadershipData.length,
        (currentSlide + 2) % leadershipData.length
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
          img.src = leadershipData[index].image
        }
      })
    }
    
    preloadImages()
  }, [leadershipData, imagesLoaded, currentSlide])



  // Auto-rotation for mobile
  useEffect(() => {
    if (!isMobile || isReducedMotion || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % leadershipData.length)
    }, 6000) // 6 seconds per slide on mobile

    return () => clearInterval(interval)
  }, [isMobile, isReducedMotion, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 15 seconds
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % leadershipData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + leadershipData.length) % leadershipData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const animationSettings = getAnimationSettings()

  if (!isMobile) {
    return null // Only show on mobile
  }

  return (
    <section className="relative py-16 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Mobile Background Effects */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0px 0px', '40px 40px']
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
            <span className="text-xs font-medium text-primary">Leadership Excellence</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            className="text-3xl font-black tracking-tighter font-display text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="block">Royal & Military</span>
            <span className="block gradient-text">Command</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            className="text-base text-muted-foreground leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Led by Africa's most influential leaders - from royal authority to military expertise
          </motion.p>
        </motion.div>

        {/* Mobile Slideshow */}
        <div className="relative">
          {/* Slideshow Container */}
          <div className="relative h-[500px] overflow-hidden rounded-2xl">
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
                  {/* Leader Image */}
                  <div className="relative h-1/2">
                    {/* Loading State */}
                    {!imagesLoaded.has(currentSlide) && (
                      <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center rounded-2xl">
                        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      </div>
                    )}
                    
                    <Image
                      src={leadershipData[currentSlide].image}
                      alt={leadershipData[currentSlide].name}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        imagesLoaded.has(currentSlide) ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={currentSlide === 0}
                      loading={currentSlide === 0 ? "eager" : "lazy"}
                      onLoad={() => setImagesLoaded(prev => new Set([...prev, currentSlide]))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Title Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                        leadershipData[currentSlide].color === 'purple' ? 'bg-purple-500/20 text-purple-500' :
                        leadershipData[currentSlide].color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-green-500/20 text-green-500'
                      } text-xs font-medium`}>
                        <span className={`w-2 h-2 rounded-full ${
                          leadershipData[currentSlide].color === 'purple' ? 'bg-purple-500' :
                          leadershipData[currentSlide].color === 'blue' ? 'bg-blue-500' :
                          'bg-green-500'
                        }`} />
                        {leadershipData[currentSlide].title}
                      </div>
                    </div>
                  </div>

                  {/* Leader Content */}
                  <div className="p-6 h-1/2 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                        {leadershipData[currentSlide].name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {leadershipData[currentSlide].description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {leadershipData[currentSlide].highlights.map((highlight, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            leadershipData[currentSlide].color === 'purple' ? 'bg-purple-500' :
                            leadershipData[currentSlide].color === 'blue' ? 'bg-blue-500' :
                            'bg-green-500'
                          }`} />
                          <span className="text-xs text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
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
              {leadershipData.map((_, index) => (
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
