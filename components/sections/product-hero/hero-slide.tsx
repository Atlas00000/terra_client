"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ProductHeroSlide } from "./hero-data"

interface HeroSlideProps {
  slide: ProductHeroSlide
  isActive: boolean
  animationSettings: any
  isReducedMotion: boolean
}

export function HeroSlide({ slide, isActive, animationSettings, isReducedMotion }: HeroSlideProps) {
  return (
    <motion.div
      className="relative flex flex-col md:flex-row md:items-stretch gap-12 md:min-h-[50vh]"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 40 }}
      transition={animationSettings}
    >
      {/* Narrative panel */}
      <div className="space-y-6 order-2 md:order-1 md:flex-1">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-semibold tracking-[0.3em] text-white/70 uppercase">
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: slide.background.accent }}
            animate={!isReducedMotion ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          {slide.badge}
        </div>

        <div className="space-y-4">
          <div className="text-sm font-semibold text-white/60">{slide.name}</div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-white drop-shadow-[0_5px_35px_rgba(10,15,36,0.35)]">
            {slide.headline}
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl">{slide.subheadline}</p>
        </div>

        <p className="text-base md:text-lg text-white/80 max-w-3xl">
          {slide.description}
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {slide.stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-5 rounded-[28px]"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08), transparent 60%)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <div className="text-xs text-white/60 uppercase tracking-wide">{stat.label}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {slide.highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-start gap-3 text-white/80">
              <motion.div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white/70"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 65%)",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
                whileHover={!isReducedMotion ? { rotate: 360 } : {}}
              >
                {idx + 1}
              </motion.div>
              <p className="text-sm">{highlight}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-4">
          {slide.ctas.map((cta, idx) => (
            <motion.a
              key={idx}
              href={cta.href}
              className={`relative px-7 py-3 rounded-full font-semibold text-sm tracking-wide border transition ${
                cta.variant === "primary"
                  ? "bg-white text-slate-900 border-transparent shadow-lg shadow-white/20"
                  : "bg-transparent text-white border-white/30 hover:border-white/60"
              }`}
              whileHover={!isReducedMotion ? { scale: 1.05 } : {}}
              whileTap={{ scale: 0.95 }}
            >
              {cta.label}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Visual panel */}
      <motion.div
        className="relative order-1 md:order-2 md:flex-1 w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
        transition={{ ...animationSettings, delay: 0.1 }}
      >
        <div className="relative rounded-[36px] overflow-hidden shadow-[0_40px_100px_rgba(5,7,18,0.65)]">
          <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-black/10 z-10" />
          <Image
            src={slide.visual.image}
            alt={slide.visual.alt}
            width={960}
            height={640}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 45vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <div className="text-white text-sm font-medium">{slide.visual.caption}</div>
          </div>
        </div>

        {/* Floating spec chip */}
                <motion.div
                  className="absolute -left-10 top-6 p-4 rounded-2xl bg-black/60 backdrop-blur-xl text-white/80 text-xs uppercase tracking-wide"
          animate={!isReducedMotion ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 6, repeat: Infinity }}
        >
          Linked to ArtemisOS
        </motion.div>

        <motion.div
          className="absolute -right-8 bottom-10 p-5 rounded-3xl text-white"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.14), transparent 65%)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
          animate={!isReducedMotion ? { opacity: [0.8, 1, 0.8] } : { opacity: 0.9 }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="text-xs text-white/70">Deployment Mesh</div>
          <div className="text-lg font-black">Live</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

