"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { HeroBackground } from "@/components/hero-background"
import { useOptimizedScroll } from "@/hooks/use-optimized-scroll"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

// Helper function to generate consistent particle positions (reduced count)
const generateParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const hash = (i * 2654435761) % 1000000;
    positions.push({
      left: (hash % 90) + 5,
      top: ((hash * 7) % 90) + 5,
      duration: 3 + (i % 3),
      delay: (i % 4) * 0.5
    });
  }
  return positions;
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(2) // Start from slide 3 (index 2)
  const [isPaused, setIsPaused] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  
  // Mobile optimization
  const { isMobile, isReducedMotion, getParticleCount, getAnimationSettings } = useMobileOptimization()
  
  // Use optimized scroll listener
  useOptimizedScroll((scrollY: number) => {
    setScrollY(scrollY)
  }, 16) // 60fps throttling

  // Memoize particle positions to prevent recalculation on every render
  const particleCount = getParticleCount()
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])
  
  // Get optimized animation settings
  const animationSettings = getAnimationSettings()

  // Auto-rotation effect (disabled for reduced motion)
  useEffect(() => {
    if (isPaused || isReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 7)
    }, isMobile ? 12000 : 10000) // Slower on mobile

    return () => clearInterval(interval)
  }, [isPaused, isReducedMotion, isMobile])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 15000) // Increased pause time
  }

  const slides = [
    {
      id: 0,
      image: "/stories/$13-Billion-Critical_Infrastructure.jpeg",
      title: "$13 Billion in Critical Infrastructure Protected",
      subtitle: "Real impact, real results",
      description: "Our autonomous defense systems are actively protecting over $13 billion worth of critical infrastructure across Africa, safeguarding the global economy with proven results and measurable impact."
    },
    {
      id: 1,
      image: "/stories/Ooni_to_Board1.jpeg",
      title: "Ooni of Ife Joins Board of Directors",
      subtitle: "Royal Authority & Influence",
      description: "One of Africa's most powerful kings brings deep passion for Nigeria's industrial and economic prosperity, enhancing our credibility and government relations with a global vision to turn Nigeria into a global drone producer."
    },
    {
      id: 2,
      image: "/stories/ArtemisOS_Real_Time_Capabilities_Demonstration.jpeg",
      title: "ArtemisOS Real-Time Capabilities Demonstration",
      subtitle: "AI-Powered Intelligence Platform",
      description: "Successfully showcased ArtemisOS real-time capabilities, demonstrating advanced AI-powered threat detection and autonomous mission planning with four power plants and several substations under active protection."
    },
    {
      id: 3,
      image: "/stories/Ayoola_Jolasinmi_Joins_Board.jpeg",
      title: "Retired Air Vice Marshal Ayoola Jolasinmi Joins Board",
      subtitle: "Military Leadership & Strategic Planning",
      description: "Distinguished career in the Nigerian Air Force with key positions including Director of Operations, Chief of Defence Space Administration, and Chief of Defence Policy & Plans at Defence Headquarters."
    },
    {
      id: 4,
      image: "/stories/South_Africa_Export_Success.jpeg",
      title: "South Africa Export Success",
      subtitle: "International Expansion Milestone",
      description: "Successfully announced export of drones to South Africa, marking our first international expansion and market penetration beyond Nigeria, demonstrating our export capabilities and pan-African market strategy."
    },
    {
      id: 5,
      image: "/stories/Upgraded_Drone_Factory.jpeg",
      title: "Upgraded Drone Factory - 20 Drones Per Day",
      subtitle: "Manufacturing Excellence",
      description: "Our Abuja facility now produces 20 Iroko drones per day with 80% local component sourcing, establishing Nigeria as Africa's premier defense manufacturing hub and demonstrating our commitment to local production."
    },
    {
      id: 6,
      image: "/stories/Milsat_patnership.jpeg",
      title: "Strategic Partnership with Milsat",
      subtitle: "Global Defense Collaboration",
      description: "Forging strategic alliances with global defense contractors to expand our reach and capabilities, establishing Terra Industries as a key player in the international defense technology market."
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Background Effects (reduced particles) */}
      <div className="absolute inset-0">
        <HeroBackground />
        
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '50px 50px']
          }}
          transition={isReducedMotion ? {} : {
            duration: isMobile ? 30 : 25, // Slower on mobile
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
        {/* Floating Particles (reduced count) */}
        {!isReducedMotion && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              willChange: 'transform, opacity' // Added for performance
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: isMobile ? pos.duration * 1.5 : pos.duration, // Slower on mobile
              repeat: Infinity,
              delay: pos.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationSettings}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: isReducedMotion ? 0 : 0.2, ...animationSettings }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={isReducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={isReducedMotion ? {} : { duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Securing Africa's Future</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: isReducedMotion ? 0 : 0.3, ...animationSettings }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">Autonomous Defense</span>
            <span className="block gradient-text">Systems</span>
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: isReducedMotion ? 0 : 0.4, ...animationSettings }}
            viewport={{ once: true }}
          >
            Protecting over $13 billion in critical infrastructure across Africa with cutting-edge AI-powered defense technology
          </motion.p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative h-[60vh] md:h-[65vh] overflow-hidden rounded-3xl">
          {slides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className={`absolute inset-0 ${
                index === currentSlide ? 'z-10' : 'z-0'
              }`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 0.95
              }}
              transition={isReducedMotion ? { duration: 0.1 } : { duration: 0.8, ease: "easeInOut" }}
              onClick={() => goToSlide(index)}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="relative h-full bg-gradient-to-br from-card/80 to-card/60 backdrop-blur-sm border border-border/20">
                {/* Image */}
                <div className="h-1/2 md:h-2/3 relative">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="h-1/2 md:h-1/3 p-4 md:p-8 flex flex-col justify-center">
                  <div className="space-y-3 md:space-y-6">
                    <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-sm md:text-lg text-muted-foreground leading-relaxed">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-primary scale-125' 
                  : 'bg-muted-foreground/30'
              }`}
              onClick={() => goToSlide(index)}
              whileHover={isReducedMotion ? {} : { scale: 1.2 }}
              style={{ touchAction: 'manipulation' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
