"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import Image from "next/image"

export function ArtemisIntelligenceSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Dynamic AI Network Background */}
      <div className="absolute inset-0">
        {/* Neural Network Visualization */}
        <motion.div 
          className="absolute inset-0 opacity-20"
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
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating AI Nodes */}
        {!isReducedMotion && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full"
                style={{
                  left: `${20 + (i * 7) % 60}%`,
                  top: `${20 + (i * 11) % 60}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  duration: 3 + (i % 2),
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
              linear-gradient(-45deg, transparent 48%, rgba(138, 43, 226, 0.1) 49%, rgba(138, 43, 226, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '120px 120px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '120px 120px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-[80vw] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-purple-500/10 backdrop-blur-sm mb-8"
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
            <span className="text-sm font-medium text-primary">AI Intelligence Core</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Neural Network</span>
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-green-400 bg-clip-text text-transparent">
              Architecture
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Advanced AI processing with 1000+ TOPS computing power, 50+ neural network layers, 
            and 10M+ training samples for autonomous decision-making and threat detection
          </motion.p>
        </motion.div>

        {/* AI Capabilities Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Side - Neural Processing */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 p-8 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Neural Processing</h3>
                  <p className="text-muted-foreground">50+ layer deep neural network</p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  1000+ TOPS processing power for real-time AI decision-making and pattern recognition. 
                  Advanced algorithms for autonomous decision-making with intelligent route optimization.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-primary/20">
                    <div className="text-2xl font-bold text-primary">1000+</div>
                    <div className="text-sm text-muted-foreground">TOPS</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-purple-500/20">
                    <div className="text-2xl font-bold text-purple-500">50+</div>
                    <div className="text-sm text-muted-foreground">Layers</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500/10 to-green-400/10 border border-purple-500/20 p-8 backdrop-blur-sm">
              <div className="relative z-10">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">Machine Learning</h3>
                  <p className="text-muted-foreground">Continuous learning algorithms</p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Adaptive algorithms that improve threat detection accuracy through real-world 
                  deployment data and feedback loops. Real-time analysis with instant processing.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-xl bg-purple-500/20">
                    <div className="text-2xl font-bold text-purple-500">99.5%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-green-400/20">
                    <div className="text-2xl font-bold text-green-400">Real-time</div>
                    <div className="text-sm text-muted-foreground">Analysis</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-96 lg:h-[500px]">
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
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute top-16 right-12 w-3 h-3 bg-purple-500 rounded-full"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.6, 1, 0.6]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute bottom-20 left-16 w-5 h-5 bg-green-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
                  />
                </>
              )}
              
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-2xl font-bold">ArtemisOS Dashboard</div>
                <div className="text-sm opacity-90">Real-time AI Operations</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-World Applications */}
        <motion.div
          className="bg-gradient-to-r from-card/50 to-card/30 rounded-3xl border border-border/20 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-foreground mb-6">Real-World Applications</h3>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              ArtemisOS is actively deployed across Africa, protecting over $13 billion in critical infrastructure 
              and enabling autonomous operations in the most challenging environments
            </p>
          </div>
          
          {/* Primary Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20">
              <h4 className="text-xl font-bold text-foreground mb-3">Critical Infrastructure</h4>
              <p className="text-muted-foreground mb-4">Protecting $13+ billion in critical infrastructure across Africa</p>
              <div className="text-2xl font-bold text-primary">$13B+</div>
              <div className="text-sm text-muted-foreground">Assets Protected</div>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-400/10 to-primary/10 border border-green-400/20">
              <h4 className="text-xl font-bold text-foreground mb-3">Power Infrastructure</h4>
              <p className="text-muted-foreground mb-4">Four power plants and substations under autonomous protection</p>
              <div className="text-2xl font-bold text-green-400">4</div>
              <div className="text-sm text-muted-foreground">Power Plants</div>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <h4 className="text-xl font-bold text-foreground mb-3">Border Security</h4>
              <p className="text-muted-foreground mb-4">Advanced border monitoring with autonomous patrol systems</p>
              <div className="text-2xl font-bold text-purple-500">24/7</div>
              <div className="text-sm text-muted-foreground">Surveillance</div>
            </div>
          </div>

          {/* Secondary Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20">
              <h5 className="text-lg font-bold text-foreground mb-2">Oil & Gas</h5>
              <p className="text-sm text-muted-foreground">Pipeline monitoring and facility security</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
              <h5 className="text-lg font-bold text-foreground mb-2">Mining Operations</h5>
              <p className="text-sm text-muted-foreground">Autonomous surveillance of mining sites</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <h5 className="text-lg font-bold text-foreground mb-2">Agricultural Security</h5>
              <p className="text-sm text-muted-foreground">Crop monitoring and farm protection</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
              <h5 className="text-lg font-bold text-foreground mb-2">Transportation</h5>
              <p className="text-sm text-muted-foreground">Railway and highway security systems</p>
            </div>
          </div>

          {/* International Deployment */}
          <div className="bg-gradient-to-r from-charcoal/50 to-background/50 rounded-2xl p-8 border border-border/20">
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-foreground mb-3">International Deployment</h4>
              <p className="text-muted-foreground">
                ArtemisOS is expanding beyond Nigeria, with successful deployments across Africa
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-lg font-bold text-foreground mb-3">Current Deployments</h5>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Nigeria: Primary deployment and manufacturing hub</li>
                  <li>• South Africa: First international export success</li>
                  <li>• Zambia: Drone services and infrastructure protection</li>
                  <li>• Pan-African: Continental expansion strategy</li>
                </ul>
              </div>
              
              <div>
                <h5 className="text-lg font-bold text-foreground mb-3">Operational Metrics</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-primary/20">
                    <div className="text-xl font-bold text-primary">99.5%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-400/20">
                    <div className="text-xl font-bold text-green-400">&lt;1s</div>
                    <div className="text-sm text-muted-foreground">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
