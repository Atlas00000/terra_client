"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

export function IrokoAdvantagesSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()

  const advantages = {
    unique: [
      {
        name: "90-Second Deployment",
        description: "Industry-leading 90-second deployment capability that sets Iroko apart from competitors with standard 5-10 minute deployment times",
        features: [
          "Ultra-rapid emergency response capability",
          "Pre-configured mission packages",
          "One-touch launch sequence",
          "Automated system diagnostics",
          "Emergency override protocols",
          "Integration with dispatch systems"
        ],
        metrics: {
          "Deployment Time": "90 seconds",
          "Competitor Average": "5-10 minutes",
          "Advantage": "5-6x faster",
          "Emergency Response": "Critical advantage",
          "Market Position": "Industry leader",
          "Unique Value": "Unmatched speed"
        }
      },
      {
        name: "Mass Production Excellence",
        description: "Superior mass production capabilities with automated manufacturing, quality control, and scalable production capacity for large-scale deployments",
        features: [
          "Automated production lines",
          "Robotic assembly systems",
          "Quality control at every stage",
          "Scalable production capacity",
          "Cost-effective manufacturing",
          "Rapid production scaling"
        ],
        metrics: {
          "Production Rate": "100+ units/month",
          "Quality Control": "100% inspection",
          "Scalability": "10x capacity",
          "Cost Efficiency": "60% reduction",
          "Lead Time": "<2 weeks",
          "Quality Rate": "99.9%"
        }
      },
      {
        name: "ArtemisOS Integration",
        description: "Native integration with ArtemisOS providing unified fleet management, AI-powered operations, and seamless coordination capabilities",
        features: [
          "Native ArtemisOS integration",
          "AI-powered operations",
          "Unified fleet management",
          "Real-time coordination",
          "Autonomous mission planning",
          "Intelligent resource allocation"
        ],
        metrics: {
          "Integration": "Native seamless",
          "AI Operations": "Advanced capabilities",
          "Fleet Management": "Unified control",
          "Coordination": "Real-time",
          "Mission Planning": "Autonomous",
          "Resource Allocation": "Intelligent"
        }
      }
    ],
    technology: [
      {
        name: "Advanced AI Capabilities",
        description: "Cutting-edge AI capabilities with autonomous mission planning, intelligent threat detection, and predictive analytics for superior operational performance",
        features: [
          "Autonomous mission planning and execution",
          "AI-powered threat detection and classification",
          "Predictive analytics and maintenance",
          "Intelligent route optimization",
          "Dynamic mission adaptation",
          "Machine learning algorithms"
        ],
        metrics: {
          "AI Planning": "Autonomous",
          "Threat Detection": "99.2% accuracy",
          "Predictive Analytics": "Advanced",
          "Route Optimization": "40% improvement",
          "Mission Adaptation": "Real-time",
          "Learning": "Continuous"
        }
      },
      {
        name: "Superior Performance",
        description: "Exceptional performance metrics with extended flight time, superior range, and advanced weather resistance capabilities",
        features: [
          "Extended flight time up to 50 minutes",
          "Superior operational range 20km+",
          "Advanced weather resistance IP54",
          "High-speed operations 70 km/h",
          "Precision hover control ±0.3m",
          "Wind resistance up to 15 m/s"
        ],
        metrics: {
          "Flight Time": "50 minutes",
          "Operational Range": "20km+",
          "Weather Resistance": "IP54",
          "Max Speed": "70 km/h",
          "Hover Precision": "±0.3m",
          "Wind Resistance": "15 m/s"
        }
      },
      {
        name: "Modular Design Excellence",
        description: "Superior modular design with tool-free assembly, standardized components, and rapid reconfiguration capabilities for diverse mission requirements",
        features: [
          "Tool-free assembly and disassembly",
          "Standardized component interfaces",
          "Rapid reconfiguration capabilities",
          "Modular payload systems",
          "Pre-configured mission packages",
          "Easy maintenance and support"
        ],
        metrics: {
          "Assembly Time": "<5 minutes",
          "Tool Requirements": "None",
          "Reconfiguration": "Rapid",
          "Modularity": "Complete",
          "Mission Packages": "Pre-configured",
          "Maintenance": "Easy"
        }
      }
    ],
    cost: [
      {
        name: "Cost-Effective Operations",
        description: "Superior cost-effectiveness with optimized operations, reduced maintenance costs, and exceptional return on investment for long-term value",
        features: [
          "Optimized operational costs",
          "Reduced maintenance requirements",
          "Long-term cost savings",
          "Scalable deployment options",
          "Efficient resource utilization",
          "Predictable operational expenses"
        ],
        metrics: {
          "Operational Cost": "60% reduction",
          "Maintenance Cost": "50% savings",
          "ROI": "300% in 2 years",
          "Cost per Flight": "Minimal",
          "Scalability": "Linear scaling",
          "Total Cost": "Predictable"
        }
      },
      {
        name: "Manufacturing Cost Advantages",
        description: "Superior manufacturing cost advantages with automated production, lean manufacturing principles, and optimized supply chain management",
        features: [
          "Automated production processes",
          "Lean manufacturing principles",
          "Optimized supply chain management",
          "Cost reduction initiatives",
          "Waste elimination programs",
          "Process optimization"
        ],
        metrics: {
          "Production Cost": "40% reduction",
          "Manufacturing": "Automated",
          "Supply Chain": "Optimized",
          "Cost Reduction": "Continuous",
          "Waste Elimination": "80%",
          "Process": "Optimized"
        }
      }
    ],
    performance: [
      {
        name: "Operational Excellence",
        description: "Exceptional operational excellence with high success rates, reliable performance, and superior mission execution capabilities",
        features: [
          "High mission success rates",
          "Reliable performance metrics",
          "Superior mission execution",
          "Predictable operational outcomes",
          "Consistent quality delivery",
          "Proven operational track record"
        ],
        metrics: {
          "Mission Success": "99.5%",
          "Performance": "Reliable",
          "Execution": "Superior",
          "Outcomes": "Predictable",
          "Quality": "Consistent",
          "Track Record": "Proven"
        }
      },
      {
        name: "Weather & Environmental Superiority",
        description: "Superior weather and environmental capabilities with IP54 protection, wide temperature range, and advanced environmental resistance",
        features: [
          "IP54 weather protection rating",
          "Wide temperature range -20°C to 60°C",
          "Advanced environmental resistance",
          "Humidity resistance 0-95% RH",
          "Dust and particle protection",
          "Water ingress protection"
        ],
        metrics: {
          "Protection Level": "IP54",
          "Temperature Range": "-20°C to 60°C",
          "Environmental": "Advanced resistance",
          "Humidity": "0-95% RH",
          "Dust Protection": "Complete",
          "Water Resistance": "Heavy rain"
        }
      }
    ],
    market: [
      {
        name: "Market Leadership Position",
        description: "Strong market leadership position with proven technology, established partnerships, and growing market share in the UAV industry",
        features: [
          "Proven technology leadership",
          "Established industry partnerships",
          "Growing market share",
          "Strong brand recognition",
          "Customer satisfaction leadership",
          "Innovation leadership"
        ],
        metrics: {
          "Technology": "Proven leadership",
          "Partnerships": "Established",
          "Market Share": "Growing",
          "Brand": "Strong recognition",
          "Customer Satisfaction": "High",
          "Innovation": "Leadership"
        }
      },
      {
        name: "Competitive Differentiation",
        description: "Clear competitive differentiation with unique capabilities, superior performance, and unmatched value proposition in the market",
        features: [
          "Unique deployment capabilities",
          "Superior performance metrics",
          "Unmatched value proposition",
          "Distinctive technology advantages",
          "Clear market positioning",
          "Competitive edge maintenance"
        ],
        metrics: {
          "Deployment": "Unique capabilities",
          "Performance": "Superior metrics",
          "Value": "Unmatched proposition",
          "Technology": "Distinctive advantages",
          "Positioning": "Clear market",
          "Edge": "Competitive maintenance"
        }
      }
    ]
  }

  return (
    <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Dynamic Advantages Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(74, 144, 226, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 255, 127, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)
            `
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Advantages Indicators */}
        {!isReducedMotion && (
          <>
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"
                style={{
                  left: `${20 + (i * 5) % 60}%`,
                  top: `${25 + (i * 4) % 55}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.3, 0.8]
                }}
                transition={{
                  duration: 4 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </>
        )}

        {/* Advantages Network */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 48%, rgba(74, 144, 226, 0.1) 49%, rgba(74, 144, 226, 0.1) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(0, 255, 127, 0.1) 49%, rgba(0, 255, 127, 0.1) 51%, transparent 52%)
            `,
            backgroundSize: '150px 150px'
          }}
          animate={isReducedMotion ? {} : {
            backgroundPosition: ['0px 0px', '150px 150px']
          }}
          transition={{
            duration: 25,
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/30 bg-gradient-to-r from-primary/10 to-green-400/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-4 h-4 bg-gradient-to-r from-primary to-green-400 rounded-full"
              animate={isReducedMotion ? {} : { 
                scale: [1, 1.3, 1], 
                opacity: [1, 0.7, 1] 
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">Competitive Advantages</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Market</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Leadership
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Unique selling propositions, technology differentiation, cost advantages, 
            performance superiority, and market positioning that set Iroko apart from competitors
          </motion.p>
        </motion.div>

        {/* Unique Selling Propositions */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Unique Selling Propositions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {advantages.unique.map((advantage, index) => (
              <motion.div
                key={advantage.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {advantage.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {advantage.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {advantage.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 + fIndex * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(advantage.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + mIndex * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-lg font-bold text-primary mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Differentiation */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Technology Differentiation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {advantages.technology.map((advantage, index) => (
              <motion.div
                key={advantage.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {advantage.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {advantage.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {advantage.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.0 + fIndex * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(advantage.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.1 + mIndex * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-lg font-bold text-primary mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cost Advantages */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Cost Advantages</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {advantages.cost.map((advantage, index) => (
              <motion.div
                key={advantage.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {advantage.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {advantage.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {advantage.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.3 + fIndex * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(advantage.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 + mIndex * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-lg font-bold text-primary mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Superiority */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Performance Superiority</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {advantages.performance.map((advantage, index) => (
              <motion.div
                key={advantage.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {advantage.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {advantage.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {advantage.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.6 + fIndex * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(advantage.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7 + mIndex * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-lg font-bold text-primary mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Market Positioning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Market Positioning</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {advantages.market.map((advantage, index) => (
              <motion.div
                key={advantage.name}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="p-8">
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-4">
                        {advantage.name}
                      </h4>
                      
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {advantage.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                      <h5 className="text-lg font-bold text-foreground">Key Features</h5>
                      <div className="space-y-2">
                        {advantage.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.9 + fIndex * 0.05, duration: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-green-400 rounded-full" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(advantage.metrics).map(([key, value], mIndex) => (
                        <motion.div
                          key={key}
                          className="p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2.0 + mIndex * 0.05, duration: 0.4 }}
                          viewport={{ once: true }}
                        >
                          <div className="text-lg font-bold text-primary mb-1">{value}</div>
                          <div className="text-xs text-muted-foreground">{key}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
