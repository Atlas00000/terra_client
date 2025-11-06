"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function ArtemisHeroSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic AI Network Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(74, 144, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(138, 43, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(0, 255, 127, 0.3) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating AI Nodes */}
        {!isReducedMotion && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                style={{
                  left: `${15 + (i * 6) % 70}%`,
                  top: `${20 + (i * 8) % 60}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.4, 0.8]
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </>
        )}

        {/* Connection Lines */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(0, 255, 127, 0.1) 49%, rgba(0, 255, 127, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '150px 150px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '150px 150px']
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Data Streams */}
        {!isReducedMotion && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-primary to-transparent opacity-30"
                style={{
                  left: `${10 + (i * 12) % 80}%`,
                  top: `${10 + (i * 10) % 80}%`,
                }}
                animate={{
                  y: [0, 100, 0],
                  opacity: [0, 0.6, 0]
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-4 h-4 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                animate={isReducedMotion ? {} : { 
                  scale: [1, 1.3, 1], 
                  opacity: [1, 0.7, 1] 
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-primary">AI-Powered Intelligence Platform</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-black tracking-tighter font-display text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="block">ArtemisOS</span>
              <span className="block bg-gradient-to-r from-primary via-purple-500 to-green-400 bg-clip-text text-transparent">
                Central Intelligence
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
            >
              The flagship AI-powered operating system serving as the central intelligence platform 
              for all autonomous defense systems. Real-time threat detection, autonomous mission 
              planning, and fleet management capabilities across Africa's critical infrastructure.
            </motion.p>


            {/* Real-World Impact */}
            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-r from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-foreground mb-3">Active Deployment</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-primary font-bold">4 Power Plants</div>
                  <div className="text-muted-foreground">Under protection</div>
                </div>
                <div>
                  <div className="text-green-400 font-bold">24/7 Operations</div>
                  <div className="text-muted-foreground">Continuous monitoring</div>
                </div>
                <div>
                  <div className="text-purple-500 font-bold">Pan-African</div>
                  <div className="text-muted-foreground">Multi-country deployment</div>
                </div>
                <div>
                  <div className="text-blue-500 font-bold">AES-256</div>
                  <div className="text-muted-foreground">Military-grade encryption</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 lg:h-[600px]">
              <Image
                src="/ArtemisOS/autonomous_mission_planning.png"
                alt="ArtemisOS AI Intelligence Platform"
                fill
                className="object-cover rounded-3xl"
                priority
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl" />
              
              {/* Floating AI Indicators */}
              {!isReducedMotion && (
                <>
                  <motion.div
                    className="absolute top-8 left-8 w-4 h-4 bg-primary rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-16 right-12 w-3 h-3 bg-purple-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-16 w-5 h-5 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                  />
                  <motion.div
                    className="absolute bottom-32 right-20 w-2 h-2 bg-blue-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  />
                </>
              )}
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-3xl font-bold">ArtemisOS Dashboard</div>
                <div className="text-sm opacity-90">Real-time AI Operations</div>
                <div className="text-xs opacity-75 mt-1">Central Intelligence Platform</div>
              </div>
            </div>

            {/* Performance Indicators */}
            <motion.div
              className="absolute -bottom-8 -right-8 p-6 rounded-2xl bg-gradient-to-br from-card/80 to-card/60 border border-border/20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">1000+ TOPS</div>
                <div className="text-sm text-muted-foreground">Processing Power</div>
                <div className="text-xs text-muted-foreground">Neural Network</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

