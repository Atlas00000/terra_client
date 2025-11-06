"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

const expansionData = [
  {
    id: 1,
    year: "Year 1",
    title: "Foundation",
    color: "blue",
    description: "Building the foundation for Africa's largest drone manufacturing network",
    goals: [
      "Scale current Abuja facility to 50 drones per day",
      "Establish supply chain partnerships across West Africa", 
      "Launch first international factory in Ghana",
      "Achieve 90% local component sourcing"
    ]
  },
  {
    id: 2,
    year: "Year 2", 
    title: "Expansion",
    color: "green",
    description: "Expanding across Africa with strategic partnerships and distribution",
    goals: [
      "Launch factories in Kenya and South Africa",
      "Establish pan-African distribution network",
      "Begin exports to Middle East and Europe", 
      "Achieve 200 drones per day total capacity"
    ]
  },
  {
    id: 3,
    year: "Year 3",
    title: "Global Leadership", 
    color: "yellow",
    description: "Achieving global leadership in autonomous defense manufacturing",
    goals: [
      "Complete African factory network (8 countries)",
      "Launch global export operations",
      "Establish partnerships with international defense contractors",
      "Achieve 500+ drones per day total capacity"
    ]
  }
]

export function MobileExpansionSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set())
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { isMobile, isReducedMotion, getAnimationSettings } = useMobileOptimization()
  // Preload images
  useEffect(() => {
    const preloadImages = () => {
      // Preload current slide and next 2 slides for smoother transitions
      const slidesToPreload = [
        currentSlide,
        (currentSlide + 1) % expansionData.length,
        (currentSlide + 2) % expansionData.length
      ]
      
      // Note: expansion data doesn't have images, this is text-only
      // Mark as loaded immediately
      slidesToPreload.forEach((index) => {
            setImagesLoaded(prev => new Set([...prev, index]))
      })
    }
    
    preloadImages()
  }, [expansionData, imagesLoaded, currentSlide])



  // Auto-rotation for mobile
  useEffect(() => {
    if (!isMobile || isReducedMotion || !isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % expansionData.length)
    }, 8000) // 8 seconds per slide on mobile

    return () => clearInterval(interval)
  }, [isMobile, isReducedMotion, isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    // Resume auto-play after 15 seconds
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % expansionData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + expansionData.length) % expansionData.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const animationSettings = getAnimationSettings()

  if (!isMobile) {
    return null // Only show on mobile
  }

  return (
    <div className="relative">
      {/* Mobile Expansion Slideshow */}
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
              {/* Year Header */}
              <div className={`h-1/3 flex items-center justify-center ${
                expansionData[currentSlide].color === 'blue' ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' :
                expansionData[currentSlide].color === 'green' ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' :
                'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
              }`}>
                <div className="text-center">
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 ${
                      expansionData[currentSlide].color === 'blue' ? 'bg-blue-500/20 text-blue-500' :
                      expansionData[currentSlide].color === 'green' ? 'bg-green-500/20 text-green-500' :
                      'bg-yellow-500/20 text-yellow-500'
                    }`}
                    animate={!isReducedMotion ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {expansionData[currentSlide].id}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {expansionData[currentSlide].year}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {expansionData[currentSlide].title}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 h-2/3 flex flex-col justify-between">
                <div>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {expansionData[currentSlide].description}
                  </p>

                  {/* Goals List */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Key Goals</h4>
                    {expansionData[currentSlide].goals.map((goal, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          expansionData[currentSlide].color === 'blue' ? 'bg-blue-500' :
                          expansionData[currentSlide].color === 'green' ? 'bg-green-500' :
                          'bg-yellow-500'
                        }`} />
                        <p className="text-sm text-muted-foreground leading-relaxed">{goal}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>Progress</span>
                    <span>{currentSlide + 1} of {expansionData.length}</span>
                  </div>
                  <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        expansionData[currentSlide].color === 'blue' ? 'bg-blue-500' :
                        expansionData[currentSlide].color === 'green' ? 'bg-green-500' :
                        'bg-yellow-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentSlide + 1) / expansionData.length) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
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
          {expansionData.map((_, index) => (
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
  )
}
