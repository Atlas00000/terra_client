"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function ArtemisPerformanceSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const performanceMetrics = [
    {
      title: "Processing Power",
      value: "1000+ TOPS",
      description: "Neural network processing power for real-time AI operations",
      color: "primary"
    },
    {
      title: "Response Time",
      value: "<1 second",
      description: "Ultra-fast threat detection and response capabilities",
      color: "green"
    },
    {
      title: "Accuracy Rate",
      value: "99.5%",
      description: "Exceptional accuracy in threat detection and classification",
      color: "blue"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      description: "Reliable 24/7 operation with minimal downtime",
      color: "purple"
    },
    {
      title: "Neural Layers",
      value: "50+",
      description: "Deep learning architecture for complex pattern recognition",
      color: "orange"
    },
    {
      title: "Training Data",
      value: "10M+",
      description: "Extensive training dataset for superior AI performance",
      color: "red"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-green-400/5" />
      
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-sm font-medium text-primary">Performance Metrics</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Exceptional</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Performance
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Industry-leading performance metrics that demonstrate the superior capabilities 
            of ArtemisOS in real-world defense applications
          </motion.p>
        </motion.div>

        {/* Performance Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              className="group relative overflow-hidden rounded-3xl bg-card/50 border border-border/20 p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/10" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-green-400 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-white rounded-lg" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {metric.title}
                </h3>
                
                <motion.div
                  className="text-3xl md:text-4xl font-black text-primary mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {metric.value}
                </motion.div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {metric.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Performance Comparison */}
        <motion.div
          className="mt-20 bg-card/50 rounded-3xl border border-border/20 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Performance Comparison</h3>
            <p className="text-muted-foreground">
              ArtemisOS outperforms traditional defense systems in key metrics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10x</div>
              <div className="text-sm text-muted-foreground">Faster Response</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">5x</div>
              <div className="text-sm text-muted-foreground">Higher Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">3x</div>
              <div className="text-sm text-muted-foreground">Better Efficiency</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
