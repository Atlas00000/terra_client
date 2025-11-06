"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-charcoal to-background">
      <Header />
      
      {/* 404 Content */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Animated Grid Pattern */}
          <motion.div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(0deg, rgba(74, 144, 226, 0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '60px 60px']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          {/* Floating Particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* 404 Number */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-9xl md:text-[12rem] font-black text-foreground mb-4"
              animate={{
                textShadow: [
                  '0 0 20px rgba(74, 144, 226, 0.3)',
                  '0 0 40px rgba(74, 144, 226, 0.6)',
                  '0 0 20px rgba(74, 144, 226, 0.3)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: 'linear-gradient(135deg, #4A90E2 0%, #2E5BBA 50%, #4A90E2 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              404
            </motion.h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Page Not Found
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The page you're looking for seems to have drifted into the digital void. 
              Let's get you back to our defense systems.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {/* Home Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/"
                className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-white bg-gradient-to-r from-primary to-terra-steel-blue rounded-2xl overflow-hidden"
                style={{
                  boxShadow: '0 10px 30px rgba(74, 144, 226, 0.3)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-terra-steel-blue to-primary"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '0%' }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Return Home</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </Link>
            </motion.div>

            {/* Products Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/#products"
                className="group relative inline-flex items-center gap-4 px-12 py-6 text-lg font-bold text-foreground border-2 border-primary/30 hover:border-primary/60 rounded-2xl overflow-hidden backdrop-blur-sm bg-background/50"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 to-terra-steel-blue/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">View Products</span>
                <motion.div
                  className="relative z-10"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🚁
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Additional Help */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/20">
              <h3 className="text-2xl font-bold text-foreground mb-4">Need Help?</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                If you're looking for our defense systems, try navigating to our product pages 
                or return to the homepage to explore our full range of autonomous defense solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {[
                  { name: "Artemis", href: "/artemis" },
                  { name: "Archer", href: "/archer" },
                  { name: "Iroko", href: "/iroko" },
                  { name: "Duma", href: "/duma" },
                  { name: "Kallon", href: "/kallon" }
                ].map((product, index) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  >
                    <Link
                      href={product.href}
                      className="inline-block px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 border border-primary/30 hover:border-primary/50 rounded-lg transition-colors duration-300"
                    >
                      {product.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
