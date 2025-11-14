"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { ConfiguratorState, ProductRecommendation } from "./utils/types"
import { generateRecommendation } from "./utils/recommendation-engine"
import { Question1FacilityType } from "./questions/question-1-facility-type"
import { Question2ThreatLevel } from "./questions/question-2-threat-level"
import { Question3CoverageArea } from "./questions/question-3-coverage-area"
import { RecommendationDisplay } from "./recommendation-display"

export function ProductStackConfigurator() {
  const { isMobile, isReducedMotion, getAnimationSettings, getParticleCount } = useMobileOptimization()
  const animationSettings = getAnimationSettings()
  const particleCount = getParticleCount()

  const [state, setState] = useState<ConfiguratorState>({
    facilityType: null,
    threatLevel: null,
    coverageArea: null,
    currentQuestion: 1
  })

  const recommendation = useMemo(() => {
    if (!state.facilityType || !state.threatLevel || !state.coverageArea) {
      return null
    }
    return generateRecommendation(state.facilityType, state.threatLevel, state.coverageArea)
  }, [state.facilityType, state.threatLevel, state.coverageArea])

  const handleFacilitySelect = (facility: typeof state.facilityType) => {
    setState(prev => ({ ...prev, facilityType: facility, currentQuestion: 2 }))
  }

  const handleThreatSelect = (threat: typeof state.threatLevel) => {
    setState(prev => ({ ...prev, threatLevel: threat, currentQuestion: 3 }))
  }

  const handleCoverageSelect = (coverage: typeof state.coverageArea) => {
    setState(prev => ({ ...prev, coverageArea: coverage, currentQuestion: 4 }))
  }

  const handleBack = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.max(1, prev.currentQuestion - 1)
    }))
  }

  const handleReset = () => {
    setState({
      facilityType: null,
      threatLevel: null,
      coverageArea: null,
      currentQuestion: 1
    })
  }

  // Generate particle positions for background
  const particlePositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < particleCount; i++) {
      const hash = (i * 2654435761) % 1000000
      positions.push({
        left: (hash % 90) + 5,
        top: ((hash * 7) % 90) + 5,
        duration: 4 + (i % 3),
        delay: (i % 4) * 0.5
      })
    }
    return positions
  }, [particleCount])

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Immersive gradient background - no static colors */}
      <div className="absolute inset-0">
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-cyan-500/10 to-blue-500/20"
          animate={!isReducedMotion ? {
            backgroundPosition: ['0% 0%', '100% 100%']
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear'
          }}
        />

        {/* Dynamic mesh grid - more visible */}
        <motion.div 
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0px 0px', '80px 80px']
          } : {}}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Floating product icons - dynamic */}
        {!isReducedMotion && ['ArtemisOS', 'Iroko', 'Archer', 'Duma', 'Kallon'].map((product, i) => {
          const hash = (i * 2654435761) % 1000000
          const left = (hash % 85) + 5
          const top = ((hash * 7) % 85) + 5
          return (
            <motion.div
              key={product}
              className="absolute text-6xl md:text-8xl opacity-[0.03]"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                willChange: 'transform'
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + (i * 2),
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'easeInOut'
              }}
            >
              {product === 'ArtemisOS' && '🧠'}
              {product === 'Iroko' && '🚁'}
              {product === 'Archer' && '✈️'}
              {product === 'Duma' && '🚗'}
              {product === 'Kallon' && '🗼'}
            </motion.div>
          )
        })}
        
        {/* Enhanced floating particles */}
        {!isReducedMotion && particlePositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary rounded-full blur-sm"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              willChange: 'transform, opacity',
              boxShadow: '0 0 10px rgba(74, 144, 226, 0.5)'
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              x: [0, (i % 2 === 0 ? 20 : -20), 0]
            }}
            transition={{
              duration: pos.duration + 1,
              repeat: Infinity,
              delay: pos.delay,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Radial gradient orbs for depth */}
        {!isReducedMotion && [0, 1, 2].map((i) => {
          const hash = (i * 7919) % 1000000
          return (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full blur-3xl opacity-20"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                left: `${(hash % 70) + 15}%`,
                top: `${((hash * 11) % 70) + 15}%`,
                background: i === 0 
                  ? 'radial-gradient(circle, rgba(74, 144, 226, 0.4), transparent)'
                  : i === 1
                  ? 'radial-gradient(circle, rgba(16, 185, 129, 0.3), transparent)'
                  : 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
                x: [0, 50, 0],
                y: [0, 30, 0]
              }}
              transition={{
                duration: 15 + i * 5,
                repeat: Infinity,
                delay: i * 3,
                ease: 'easeInOut'
              }}
            />
          )
        })}
      </div>

      <div className="relative z-10 max-w-[90vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={animationSettings}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 backdrop-blur-xl bg-white/5 border-0 shadow-lg shadow-primary/10 mb-8"
            style={{
              clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...animationSettings }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2.5 h-2.5 bg-gradient-to-br from-primary to-cyan-400 rounded-full"
              animate={!isReducedMotion ? { scale: [1, 1.3, 1], opacity: [1, 0.6, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-bold text-primary tracking-wider uppercase">Product Configurator</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...animationSettings }}
            viewport={{ once: true }}
          >
            <span className="block text-foreground">Build Your</span>
            <span className="block bg-gradient-to-r from-primary via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Defense Stack
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed font-medium"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...animationSettings }}
            viewport={{ once: true }}
          >
            Answer 3 questions to get a personalized product recommendation powered by real product specifications
          </motion.p>
        </motion.div>

        {/* Progress Indicator - Fluid Design */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 md:gap-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center gap-2 md:gap-4">
                <motion.div
                  className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center font-black text-base md:text-lg backdrop-blur-xl border-0 transition-all ${
                    state.currentQuestion >= num
                      ? 'bg-gradient-to-br from-primary to-cyan-400 text-white shadow-lg shadow-primary/50'
                      : 'bg-white/5 text-muted-foreground/50'
                  }`}
                  style={{
                    clipPath: state.currentQuestion >= num
                      ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                      : 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)'
                  }}
                  animate={state.currentQuestion === num && !isReducedMotion ? {
                    scale: [1, 1.15, 1],
                    rotate: [0, 5, -5, 0]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {num}
                </motion.div>
                {num < 3 && (
                  <motion.div
                    className={`h-1 w-12 md:w-20 ${
                      state.currentQuestion > num 
                        ? 'bg-gradient-to-r from-primary to-cyan-400' 
                        : 'bg-white/10'
                    }`}
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: state.currentQuestion > num ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Question Flow */}
        <AnimatePresence mode="wait">
          {state.currentQuestion === 1 && (
            <Question1FacilityType
              key="q1"
              selected={state.facilityType}
              onSelect={handleFacilitySelect}
              animationSettings={animationSettings}
              isReducedMotion={isReducedMotion}
            />
          )}
          
          {state.currentQuestion === 2 && state.facilityType && (
            <Question2ThreatLevel
              key="q2"
              facilityType={state.facilityType}
              selected={state.threatLevel}
              onSelect={handleThreatSelect}
              onBack={handleBack}
              animationSettings={animationSettings}
              isReducedMotion={isReducedMotion}
            />
          )}
          
          {state.currentQuestion === 3 && state.facilityType && state.threatLevel && (
            <Question3CoverageArea
              key="q3"
              facilityType={state.facilityType}
              threatLevel={state.threatLevel}
              selected={state.coverageArea}
              onSelect={handleCoverageSelect}
              onBack={handleBack}
              animationSettings={animationSettings}
              isReducedMotion={isReducedMotion}
            />
          )}
          
          {state.currentQuestion === 4 && recommendation && (
            <RecommendationDisplay
              key="recommendation"
              recommendation={recommendation}
              facilityType={state.facilityType!}
              threatLevel={state.threatLevel!}
              coverageArea={state.coverageArea!}
              onReset={handleReset}
              animationSettings={animationSettings}
              isReducedMotion={isReducedMotion}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

