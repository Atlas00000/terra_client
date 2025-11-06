"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useFeaturedNews } from "@/hooks/use-featured-news"
import { NewsSlideshowSkeleton } from "@/components/ui/skeleton"
import Image from "next/image"

export function CompanyNewsSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  
  // Fetch news from backend (or use fallback data)
  const { data: newsData, isLoading } = useFeaturedNews()
  
  // Transform news data to flat array of milestones
  const milestones = newsData?.flatMap(story => 
    story.items?.map(item => ({
      title: item.title,
      description: item.description,
      details: item.details || [],
      image: story.visual || '/placeholder.jpg',
      impact: item.impact
    })) || []
  ).slice(0, 6) || [] // Take first 6 milestones

  return (
    <section className="py-24 relative overflow-hidden">
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
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${10 + (i * 4) % 80}%`,
                  top: `${15 + (i * 5) % 70}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.9, 0.3],
                  scale: [0.7, 1.2, 0.7]
                }}
                transition={{
                  duration: 3 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
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
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-6"
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
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Major achievements, media coverage, social impact, and industry recognition driving company success
          </motion.p>
        </motion.div>

        {/* Recent Milestones */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Recent Milestones</h3>
          
          {/* Show loading state */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-800 rounded-lg mb-4" />
                  <div className="h-6 bg-gray-800 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-800 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="group relative p-6 rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm hover:border-primary/30 transition-all duration-500"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={milestone.image}
                    alt={milestone.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {milestone.title}
                </h4>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {milestone.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  {milestone.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    className="flex items-center gap-3 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 + detailIndex * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                    <span className="text-muted-foreground">{detail}</span>
                  </motion.div>
                ))}
                </div>
                
                <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-green-400/10 border border-primary/20">
                  <div className="text-sm font-medium text-primary mb-1">Impact:</div>
                  <div className="text-sm text-muted-foreground">{milestone.impact}</div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </motion.div>

        {/* Media Coverage & Social Impact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Media Coverage */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Media Coverage</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "News Stories",
                  description: "Comprehensive media coverage and news stories highlighting company achievements",
                  details: ["Media coverage", "News stories", "Public awareness", "Industry recognition"],
                  metrics: "225+ LinkedIn Engagement"
                },
                {
                  title: "Industry Recognition",
                  description: "Industry recognition and awards for innovation and leadership",
                  details: ["Industry awards", "Recognition", "Innovation leadership", "Market position"],
                  metrics: "Industry Leader"
                },
                {
                  title: "Public Awareness",
                  description: "Growing public awareness and community engagement",
                  details: ["Public awareness", "Community engagement", "Brand recognition", "Market presence"],
                  metrics: "Growing Awareness"
                }
              ].map((coverage, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-foreground">{coverage.title}</h4>
                    <div className="text-2xl font-bold text-primary">{coverage.metrics}</div>
                  </div>
                  <p className="text-muted-foreground mb-4">{coverage.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {coverage.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Impact */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Social Impact</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Community Engagement",
                  description: "Active community engagement and social responsibility initiatives",
                  details: ["Community engagement", "Social responsibility", "Local impact", "Community support"],
                  metrics: "Active Engagement"
                },
                {
                  title: "Job Creation",
                  description: "Significant job creation through manufacturing and operations",
                  details: ["Job creation", "Employment opportunities", "Economic impact", "Local employment"],
                  metrics: "500+ Jobs Created"
                },
                {
                  title: "Economic Impact",
                  description: "Positive economic impact through local sourcing and manufacturing",
                  details: ["Economic impact", "Local sourcing", "Manufacturing", "Economic contribution"],
                  metrics: "80% Local Sourcing"
                }
              ].map((impact, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-xl font-bold text-foreground">{impact.title}</h4>
                    <div className="text-2xl font-bold text-green-400">{impact.metrics}</div>
                  </div>
                  <p className="text-muted-foreground mb-4">{impact.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {impact.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Industry Recognition Summary */}
        <motion.div
          className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Industry Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Awards</div>
              <div className="text-sm text-muted-foreground">Recognition</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">Certifications</div>
              <div className="text-sm text-muted-foreground">Quality Standards</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-500 mb-2">Industry</div>
              <div className="text-sm text-muted-foreground">Leadership</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">Market</div>
              <div className="text-sm text-muted-foreground">Position</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
