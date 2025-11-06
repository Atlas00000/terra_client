"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function ArtemisSecuritySection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const securityFeatures = [
    {
      title: "AES-256 Encryption",
      description: "Military-grade encryption for all data transmission and storage",
      features: ["256-bit encryption", "End-to-end security", "Data integrity", "Secure protocols"],
      color: "primary"
    },
    {
      title: "Multi-Factor Authentication",
      description: "Advanced authentication protocols with biometric and cryptographic verification",
      features: ["Biometric verification", "Cryptographic keys", "Multi-layer auth", "Secure access"],
      color: "green"
    },
    {
      title: "Secure Communication",
      description: "Encrypted communication channels with quantum-resistant protocols",
      features: ["Quantum-resistant", "Encrypted channels", "Secure protocols", "Data protection"],
      color: "blue"
    },
    {
      title: "Threat Monitoring",
      description: "Real-time security monitoring with AI-powered threat detection",
      features: ["Real-time monitoring", "AI threat detection", "Automated response", "Security alerts"],
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
            <span className="text-sm font-medium text-primary">Security & Encryption</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Military-Grade</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Security
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Advanced security protocols and encryption standards that ensure the highest level 
            of protection for all defense operations and sensitive data
          </motion.p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
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
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="space-y-3">
                  {feature.features.map((item, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Standards */}
        <motion.div
          className="bg-card/50 rounded-3xl border border-border/20 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Security Standards</h3>
            <p className="text-muted-foreground">
              ArtemisOS meets and exceeds international security standards for defense applications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">AES-256</h4>
              <p className="text-sm text-muted-foreground">Military-grade encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-primary flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">ISO 27001</h4>
              <p className="text-sm text-muted-foreground">Information security management</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">FIPS 140-2</h4>
              <p className="text-sm text-muted-foreground">Cryptographic module validation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">Common Criteria</h4>
              <p className="text-sm text-muted-foreground">International security evaluation</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
