"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function ArtemisDeploymentSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const deploymentCases = [
    {
      title: "Critical Infrastructure Protection",
      description: "Protecting $13+ billion in critical infrastructure across Africa with real-time threat detection and automated response systems.",
      metrics: ["$13B+ Protected", "99.5% Accuracy", "24/7 Monitoring", "Real-time Response"],
      color: "primary"
    },
    {
      title: "Border Security Operations",
      description: "Advanced border monitoring with autonomous patrol systems and intelligent threat detection capabilities.",
      metrics: ["1000+ km Coverage", "24/7 Operations", "Autonomous Patrols", "Threat Detection"],
      color: "blue"
    },
    {
      title: "Urban Security Networks",
      description: "Comprehensive urban security with integrated surveillance, communication, and response systems.",
      metrics: ["Multi-City Coverage", "Integrated Systems", "Real-time Alerts", "Coordinated Response"],
      color: "green"
    },
    {
      title: "Maritime Defense",
      description: "Coastal and maritime security with advanced radar systems and autonomous patrol capabilities.",
      metrics: ["Coastal Coverage", "Maritime Patrols", "Radar Systems", "Autonomous Operations"],
      color: "purple"
    }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5" />
      
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
            <span className="text-sm font-medium text-primary">Real-World Deployment</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Proven</span>
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-green-400 bg-clip-text text-transparent">
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
            ArtemisOS is actively deployed across Africa, protecting critical infrastructure 
            and providing real-world defense solutions with proven results
          </motion.p>
        </motion.div>

        {/* Deployment Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {deploymentCases.map((deployment, index) => (
            <motion.div
              key={deployment.title}
              className="group relative overflow-hidden rounded-3xl bg-card/50 border border-border/20 p-8 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/10" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-white rounded-lg" />
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {deployment.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {deployment.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {deployment.metrics.map((metric, mIndex) => (
                    <div key={mIndex} className="text-center p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <div className="text-sm font-bold text-primary">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Deployment Statistics */}
        <motion.div
          className="bg-card/50 rounded-3xl border border-border/20 p-8 backdrop-blur-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-foreground mb-4">Deployment Statistics</h3>
            <p className="text-muted-foreground">
              Real-world performance metrics from active ArtemisOS deployments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                $13B+
              </div>
              <div className="text-sm text-muted-foreground">Infrastructure Protected</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-blue-500 mb-2">
                1000+
              </div>
              <div className="text-sm text-muted-foreground">Systems Deployed</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-green-400 mb-2">
                99.5%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-purple-500 mb-2">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">Operations</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
