"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { AssessmentState, ReadinessScore, calculateReadinessScore } from "./utils/scoring"
import { ScoreVisualization } from "./score-visualization"
import { ResultsDisplay } from "./results-display"
import { Question1ExistingSystems } from "./questions/question-1-existing-systems"
import { Question2NetworkInfrastructure } from "./questions/question-2-network-infrastructure"
import { Question3IntegrationRequirements } from "./questions/question-3-integration-requirements"
import { Question4DataStorage } from "./questions/question-4-data-storage"
import { Question5TechnicalTeam } from "./questions/question-5-technical-team"

interface FullAssessmentState extends AssessmentState {
  currentQuestion: number
}

export function IntegrationReadinessAssessment() {
  const { isMobile, isReducedMotion, getAnimationSettings, getParticleCount } = useMobileOptimization()
  const animationSettings = getAnimationSettings()
  const particleCount = getParticleCount()

  const [state, setState] = useState<FullAssessmentState>({
    existingSystems: null,
    networkInfrastructure: null,
    integrationRequirements: [],
    dataStorage: null,
    technicalTeam: null,
    currentQuestion: 1
  })

  const score = useMemo(() => {
    return calculateReadinessScore(state)
  }, [state])

  const handleNext = () => {
    if (state.currentQuestion < 5) {
      setState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }))
    }
  }

  const handleBack = () => {
    setState(prev => ({
      ...prev,
      currentQuestion: Math.max(1, prev.currentQuestion - 1)
    }))
  }

  const handleReset = () => {
    setState({
      existingSystems: null,
      networkInfrastructure: null,
      integrationRequirements: [],
      dataStorage: null,
      technicalTeam: null,
      currentQuestion: 1
    })
  }

  // Generate particle positions
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
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
          animate={!isReducedMotion ? {
            backgroundPosition: ['0px 0px', '60px 60px']
          } : {}}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        
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
              y: [0, -80, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              delay: pos.delay
            }}
          />
        ))}
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ...animationSettings }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={!isReducedMotion ? { scale: [1, 1.2, 1], opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Integration Assessment</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...animationSettings }}
            viewport={{ once: true }}
          >
            <span className="block">Integration</span>
            <span className="block gradient-text">Readiness Assessment</span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, ...animationSettings }}
            viewport={{ once: true }}
          >
            Assess your technical readiness for ArtemisOS integration in 5 questions
          </motion.p>
        </motion.div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left: Question Flow (2/3 width) */}
          <div className="lg:col-span-2">
            {/* Progress Indicator */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex items-center gap-1">
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-colors ${
                        state.currentQuestion >= num
                          ? 'bg-primary border-primary text-white'
                          : 'bg-transparent border-muted-foreground/30 text-muted-foreground'
                      }`}
                      animate={state.currentQuestion === num && !isReducedMotion ? {
                        scale: [1, 1.1, 1]
                      } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      {num}
                    </motion.div>
                    {num < 5 && (
                      <motion.div
                        className={`h-0.5 w-6 ${
                          state.currentQuestion > num ? 'bg-primary' : 'bg-muted-foreground/30'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: state.currentQuestion > num ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Question Flow */}
            <AnimatePresence mode="wait">
              {state.currentQuestion === 1 && (
                <Question1ExistingSystems
                  key="q1"
                  selected={state.existingSystems}
                  onSelect={(value) => setState(prev => ({ ...prev, existingSystems: value }))}
                  onNext={handleNext}
                  animationSettings={animationSettings}
                  isReducedMotion={isReducedMotion}
                />
              )}
              
              {state.currentQuestion === 2 && (
                <Question2NetworkInfrastructure
                  key="q2"
                  selected={state.networkInfrastructure}
                  onSelect={(value) => setState(prev => ({ ...prev, networkInfrastructure: value }))}
                  onNext={handleNext}
                  onBack={handleBack}
                  animationSettings={animationSettings}
                  isReducedMotion={isReducedMotion}
                />
              )}
              
              {state.currentQuestion === 3 && (
                <Question3IntegrationRequirements
                  key="q3"
                  selected={state.integrationRequirements}
                  onSelect={(value) => {
                    setState(prev => ({
                      ...prev,
                      integrationRequirements: prev.integrationRequirements.includes(value)
                        ? prev.integrationRequirements.filter(v => v !== value)
                        : [...prev.integrationRequirements, value]
                    }))
                  }}
                  onNext={handleNext}
                  onBack={handleBack}
                  animationSettings={animationSettings}
                  isReducedMotion={isReducedMotion}
                />
              )}
              
              {state.currentQuestion === 4 && (
                <Question4DataStorage
                  key="q4"
                  selected={state.dataStorage}
                  onSelect={(value) => setState(prev => ({ ...prev, dataStorage: value }))}
                  onNext={handleNext}
                  onBack={handleBack}
                  animationSettings={animationSettings}
                  isReducedMotion={isReducedMotion}
                />
              )}
              
              {state.currentQuestion === 5 && (
                <Question5TechnicalTeam
                  key="q5"
                  selected={state.technicalTeam}
                  onSelect={(value) => setState(prev => ({ ...prev, technicalTeam: value }))}
                  onNext={() => setState(prev => ({ ...prev, currentQuestion: 6 }))}
                  onBack={handleBack}
                  animationSettings={animationSettings}
                  isReducedMotion={isReducedMotion}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Right: Score Visualization (1/3 width) */}
          <div className="lg:col-span-1">
            <ScoreVisualization
              score={score}
              animationSettings={animationSettings}
              isReducedMotion={isReducedMotion}
            />
          </div>
        </div>

        {/* Results Display */}
        {state.currentQuestion === 6 && score && (
          <ResultsDisplay
            score={score}
            state={state}
            onReset={handleReset}
            animationSettings={animationSettings}
            isReducedMotion={isReducedMotion}
          />
        )}
      </div>
    </section>
  )
}

