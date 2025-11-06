"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useMemo, useState, useEffect } from "react"
import Image from "next/image"

// Helper function to generate consistent particle positions (reduced count)
const generateParticlePositions = (count: number) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const hash = (i * 2654435761) % 1000000;
    positions.push({
      left: (hash % 90) + 5,
      top: ((hash * 7) % 90) + 5,
      duration: 4 + (i % 2), // Slower animations
      delay: (i % 3) * 0.8
    });
  }
  return positions;
};

export function InternationalSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const particleCount = getParticleCount()
  
  // Memoize particle positions to prevent recalculation on every render
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-rotation
  useEffect(() => {
    if (isReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, isMobile ? 8000 : 6000) // Slower on mobile

    return () => clearInterval(interval)
  }, [isReducedMotion, isMobile])

  // Slides data from markdown files
  const slides = [
    {
      title: "South Africa Export Success",
      subtitle: "First International Expansion",
      description: "Successfully announced export of drones to South Africa, marking our first international expansion and market penetration beyond Nigeria. This milestone demonstrates our export capabilities and pan-African market strategy, establishing Terra Industries as a continental leader in autonomous defense systems.",
      content: [
        "Strategic Market Entry: South Africa represents our first international market penetration, demonstrating our capability to serve markets beyond Nigeria's borders.",
        "Export Capabilities: Successfully established export operations, proving our ability to manufacture and deliver autonomous defense systems to international markets.",
        "Pan-African Strategy: This expansion aligns with our vision to establish a pan-African presence, leveraging regional partnerships and local manufacturing capabilities.",
        "Product Portfolio: Iroko UAV deployment in South Africa showcases our modular, mass-producible drone systems designed for rapid deployment and emergency response.",
        "Market Validation: International demand for our products validates our technology and manufacturing capabilities, positioning us for further continental expansion.",
        "Partnership Development: Establishing strategic alliances with South African partners to support local operations and market development."
      ],
      metrics: {
        "Export Market": "South Africa",
        "Product Type": "Iroko UAV",
        "Status": "Active Export",
        "Market Strategy": "Pan-African"
      }
    },
    {
      title: "Pan-African Strategy",
      subtitle: "Continental Market Leadership",
      description: "Our expansion strategy focuses on establishing a pan-African presence, leveraging regional partnerships and local manufacturing capabilities to serve markets across the continent. We're positioning Africa as the global leader in autonomous defense systems.",
      content: [
        "Regional Leadership: Establishing Africa as the global leader in autonomous defense systems through strategic positioning and technology leadership.",
        "Manufacturing Network: Developing a pan-African manufacturing network with local production capabilities across multiple countries to serve regional markets.",
        "Defense Partnerships: Building strategic partnerships with regional defense organizations to support continental security initiatives.",
        "Technology Development: Investing in local technology development and innovation to ensure African sovereignty in defense technology.",
        "Economic Sovereignty: Promoting African economic independence through local manufacturing and technology development in the defense sector.",
        "Market Penetration: Expanding our continental reach to serve 15+ African countries with autonomous defense solutions."
      ],
      metrics: {
        "Target Countries": "15+",
        "Manufacturing Sites": "Multiple",
        "Partnerships": "50+",
        "Market Reach": "Continental"
      }
    },
    {
      title: "Global Vision",
      subtitle: "$1 Trillion Protection Goal",
      description: "Expanding to international markets with strategic partnerships, establishing Africa as a global leader in autonomous defense systems and protecting critical infrastructure worldwide. Our vision is to protect $1 trillion in critical assets across emerging markets.",
      content: [
        "International Partnerships: Developing strategic partnerships with global defense companies to expand our international reach and technology capabilities.",
        "Export Operations: Establishing worldwide export operations to serve international markets with our autonomous defense systems.",
        "Technology Licensing: Sharing our innovative technology through licensing agreements to accelerate global adoption of autonomous defense systems.",
        "Joint Ventures: Forming strategic joint ventures with international partners to expand our global presence and market penetration.",
        "R&D Investment: Continuous investment in research and development to maintain our technology leadership in autonomous defense systems.",
        "Patent Development: Building a strong intellectual property portfolio to protect our innovations and establish our position as a technology leader."
      ],
      metrics: {
        "Protection Goal": "$1T",
        "Global Operations": "24/7",
        "Partnerships": "50+",
        "Market Reach": "Global"
      }
    },
    {
      title: "Technology Innovation",
      subtitle: "Driving Defense Technology Leadership",
      description: "Leading innovation in autonomous defense technology through continuous R&D investment, patent development, and strategic technology partnerships that position Africa at the forefront of defense innovation and autonomous systems development.",
      content: [
        "R&D Investment: Continuous investment in research and development to advance autonomous defense technology and maintain our competitive edge.",
        "Patent Development: Building a comprehensive intellectual property portfolio to protect our innovations and establish our position as a technology leader.",
        "Technology Transfer: Sharing knowledge and technology with partners to accelerate innovation and adoption of autonomous defense systems.",
        "Innovation Partnerships: Collaborating with leading technology companies and research institutions to drive innovation in defense technology.",
        "AI Development: Advancing artificial intelligence capabilities for autonomous systems, including machine learning, computer vision, and predictive analytics.",
        "Autonomous Systems: Developing cutting-edge autonomous systems that can operate independently in complex environments with minimal human intervention."
      ],
      metrics: {
        "R&D Investment": "Continuous",
        "Patents": "Growing",
        "Innovation": "Leading",
        "AI Development": "Advanced"
      }
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Background Effects (reduced particles) */}
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
            duration: 30, // Slower animation
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
              top: `${pos.top}%`
            }}
            animate={{
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 0.8, 0]
            }}
            transition={{
              duration: pos.duration,
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
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
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
            <span className="text-sm font-medium text-primary">International Expansion</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="block">From Nigeria to</span>
            <span className="block gradient-text">the World</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Expanding across Africa and beyond, establishing Nigeria as a global exporter of autonomous defense systems
          </motion.p>
        </motion.div>

        {/* Slideshow Container */}
        <motion.div
          className="relative max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Slide Content */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/20 via-card/10 to-card/20 backdrop-blur-sm border border-border/20">
            <motion.div
              key={currentSlide}
              className="p-8 md:p-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Header */}
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  {slides[currentSlide].subtitle}
                </div>
                
                <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                  {slides[currentSlide].title}
                </h3>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  {slides[currentSlide].description}
                </p>
              </motion.div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Detailed Content */}
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h4 className="text-2xl font-bold text-foreground mb-6">Strategic Expansion Details</h4>
                  {slides[currentSlide].content.map((item, index) => (
                    <motion.div
                      key={index}
                      className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-green-400/5 border border-primary/10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <p className="text-muted-foreground leading-relaxed">{item}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Metrics and Key Points */}
                <motion.div
                  className="space-y-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-6">Key Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(slides[currentSlide].metrics).map(([key, value], index) => (
                        <motion.div
                          key={index}
                          className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                          whileHover={{ scale: 1.05, y: -3 }}
                        >
                          <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                          <div className="text-sm text-muted-foreground">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Statement */}
                  <motion.div
                    className="p-8 rounded-2xl bg-gradient-to-br from-charcoal/20 to-background/20 border border-border/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                  >
                    <h5 className="text-lg font-bold text-foreground mb-4">Strategic Impact</h5>
                    <p className="text-muted-foreground leading-relaxed">
                      Our international expansion is not just about market penetration—it's about establishing 
                      Africa as a global leader in defense technology, creating sustainable economic growth, 
                      and building a more secure world through autonomous systems.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <motion.div
            className="flex justify-center gap-3 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
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