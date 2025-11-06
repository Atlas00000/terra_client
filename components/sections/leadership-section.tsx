"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useMemo } from "react"

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

export function LeadershipSection() {
  const { isMobile, isReducedMotion, getParticleCount } = useMobileOptimization()
  const particleCount = getParticleCount()
  
  // Memoize particle positions to prevent recalculation on every render
  const particlePositions = useMemo(() => generateParticlePositions(particleCount), [particleCount])

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
              top: `${pos.top}%`,
              willChange: 'transform, opacity'
            }}
            animate={{
              y: [0, -60, 0],
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
            <span className="text-sm font-medium text-primary">Leadership Excellence</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <span className="block">Royal & Military</span>
            <span className="block gradient-text">Command</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Led by Africa's most influential leaders - from royal authority to military expertise, 
            our leadership team combines centuries of tradition with cutting-edge defense technology
          </motion.p>
        </motion.div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Ooni of Ife */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 to-primary/10 border border-purple-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.01 }}
            style={{ willChange: 'transform' }}
          >
            <div className="p-8">
              <div className="mb-6">
                <Image
                  src="/stories/Ooni_to_Board1.jpeg"
                  alt="His Imperial Majesty, the Ooni of Ife"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-500 text-sm font-medium mb-4">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  Board of Directors
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                His Imperial Majesty,<br />
                <span className="gradient-text">the Ooni of Ife</span>
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                One of Africa's most powerful kings, bringing deep passion for Nigeria's industrial 
                and economic prosperity. His royal authority enhances our credibility and government 
                relations, with a global vision to turn Nigeria into a global drone producer.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Royal Authority & Influence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Economic Development Vision</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Government Relations</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AVM Jolasinmi */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 to-primary/10 border border-blue-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.01 }}
            style={{ willChange: 'transform' }}
          >
            <div className="p-8">
              <div className="mb-6">
                <Image
                  src="/stories/Ayoola_Jolasinmi_Joins_Board.jpeg"
                  alt="Retired Air Vice Marshal Ayoola Jolasinmi"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-sm font-medium mb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Board of Directors
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Retired Air Vice Marshal<br />
                <span className="gradient-text">Ayoola Jolasinmi</span>
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Distinguished career in the Nigerian Air Force with key positions including Director of Operations, 
                Chief of Defence Space Administration, and Chief of Defence Policy & Plans at Defence Headquarters.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Military Leadership</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Strategic Defense Planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Space Administration</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Engr. Mansur Ahmed */}
          <motion.div
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 to-primary/10 border border-green-500/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.01 }}
            style={{ willChange: 'transform' }}
          >
            <div className="p-8">
              <div className="mb-6">
                <Image
                  src="/stories/Addition_Engr_Mansur_Ahmed.jpeg"
                  alt="Engr. Mansur Ahmed"
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-sm font-medium mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Board of Directors
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Engr. Mansur Ahmed<br />
                <span className="gradient-text">Industrial Development Expert</span>
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Former Director General of the Manufacturers Association of Nigeria (MAN) with extensive 
                experience in industrial development and manufacturing policy. Brings deep understanding 
                of Nigeria's manufacturing landscape and economic development.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Industrial Development</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Manufacturing Policy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Economic Development</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leadership Impact */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-8">
              <span className="block">Leadership Impact</span>
              <span className="block gradient-text">$13B+ Infrastructure Protected</span>
            </h3>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Under this exceptional leadership team, Terra Industries has successfully protected 
              over $13 billion worth of critical infrastructure across Africa, establishing Nigeria 
              as a premier defense manufacturing hub with 20 drones per day production capacity.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">$13B+</div>
                <div className="text-sm text-muted-foreground">Infrastructure Protected</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">20</div>
                <div className="text-sm text-muted-foreground">Drones Per Day</div>
              </motion.div>
              
              <motion.div
                className="p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/20"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ willChange: 'transform' }}
              >
                <div className="text-3xl font-bold text-primary mb-2">80%</div>
                <div className="text-sm text-muted-foreground">Local Sourcing</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
