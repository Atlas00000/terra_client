"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { PRODUCT_HERO_SLIDES } from "./hero-data"
import { HeroSlide } from "./hero-slide"
import { HeroBackground } from "./hero-background"

export function ProductHeroSection() {
  const { isReducedMotion, getAnimationSettings } = useMobileOptimization()
  const animationSettings = getAnimationSettings()
  const [activeIndex, setActiveIndex] = useState(0)
  const activeSlide = PRODUCT_HERO_SLIDES[activeIndex]

  return (
    <section className="relative min-h-[95vh] overflow-hidden bg-transparent text-white mt-8 md:mt-16">
      <HeroBackground accent={activeSlide.background.accent} isReducedMotion={isReducedMotion} />

      <div className="relative z-10 max-w-[80vw] mx-auto px-6 py-16 md:py-24 space-y-16">
        {/* Slides */}
        <div className="relative min-h-[55vh]">
          <AnimatePresence mode="wait">
            {PRODUCT_HERO_SLIDES.map((slide, index) =>
              index === activeIndex ? (
                <HeroSlide
                  key={slide.id}
                  slide={slide}
                  isActive={index === activeIndex}
                  animationSettings={animationSettings}
                  isReducedMotion={isReducedMotion}
                />
              ) : null
            )}
          </AnimatePresence>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center gap-3 text-white/60 text-sm">
          {PRODUCT_HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1 rounded-full transition-all ${
                index === activeIndex ? "bg-white w-16" : "bg-white/30 w-8"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

