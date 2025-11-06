"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface LoadingProps {
  onComplete?: () => void
}

export function Loading({ onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsComplete(true)
          setTimeout(() => {
            onComplete?.()
          }, 1000)
          return 100
        }
        return prev + 8 // Fixed increment instead of random
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => {
          // Predefined positions to avoid hydration mismatch
          const positions = [
            { left: 10, top: 20 }, { left: 85, top: 15 }, { left: 45, top: 80 },
            { left: 70, top: 30 }, { left: 25, top: 60 }, { left: 90, top: 70 },
            { left: 15, top: 85 }, { left: 60, top: 10 }, { left: 35, top: 45 },
            { left: 80, top: 55 }, { left: 5, top: 40 }, { left: 95, top: 25 },
            { left: 50, top: 5 }, { left: 20, top: 35 }, { left: 75, top: 90 },
            { left: 40, top: 15 }, { left: 65, top: 75 }, { left: 30, top: 50 },
            { left: 55, top: 25 }, { left: 12, top: 65 }
          ];
          
          const pos = positions[i] || { left: 50, top: 50 };
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${pos.left}%`,
                top: `${pos.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + (i % 3),
                repeat: Infinity,
                delay: (i % 4) * 0.5
              }}
            />
          );
        })}

        {/* Rotating Rings */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border border-primary/20 rounded-full"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-12">
        {/* Logo Animation */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.5, 
            type: "spring", 
            stiffness: 100,
            damping: 15
          }}
        >
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-terra-steel-blue p-1"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(74, 144, 226, 0.4)',
                '0 0 0 20px rgba(74, 144, 226, 0.1)',
                '0 0 0 0 rgba(74, 144, 226, 0.4)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
              <motion.img
                src="/terra-logo.png"
                alt="Terra Industries Logo"
                className="w-20 h-20 object-contain"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Company Name */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-black tracking-tighter font-display"
            style={{
              background: 'linear-gradient(135deg, #4A90E2 0%, #2C5F8A 50%, #4A90E2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 40px rgba(74, 144, 226, 0.3)'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            TERRA INDUSTRIES
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Securing Africa's Future
          </motion.p>
        </motion.div>

        {/* Loading Progress */}
        <motion.div
          className="w-80 space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {/* Progress Bar */}
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-terra-steel-blue rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/30 rounded-full"
              animate={{
                x: ['-100%', '100%'],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </div>

          {/* Progress Text */}
          <motion.div
            className="text-center"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </motion.div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

      </div>
    </div>
  )
}
