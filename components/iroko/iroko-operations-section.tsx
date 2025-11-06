"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

export function IrokoOperationsSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Rapid Deployment Excellence",
      subtitle: "90-Second Emergency Response",
      content: {
        deployment: [
          {
            name: "90-Second Deployment",
            description: "Ultra-rapid deployment capability enabling emergency response teams to launch Iroko UAV within 90 seconds of receiving emergency calls",
            features: [
              "Pre-flight system checks in under 30 seconds",
              "Automated startup and calibration procedures",
              "One-touch launch sequence with safety protocols",
              "Real-time system diagnostics and health monitoring",
              "Emergency override capabilities for critical situations",
              "Integration with emergency dispatch systems"
            ],
            metrics: {
              "Deployment Time": "<90 seconds",
              "System Check": "<30 seconds",
              "Launch Sequence": "<15 seconds",
              "Success Rate": "99.8%",
              "Emergency Override": "Instant",
              "Dispatch Integration": "Real-time"
            }
          },
          {
            name: "Modular Assembly Process",
            description: "Streamlined modular assembly process designed for rapid deployment and easy maintenance with standardized components and tool-free assembly",
            features: [
              "Tool-free assembly and disassembly",
              "Standardized component interfaces",
              "Color-coded assembly guides",
              "Automated assembly verification",
              "Modular payload quick-connect systems",
              "Pre-configured mission packages"
            ],
            metrics: {
              "Assembly Time": "<5 minutes",
              "Tool Requirements": "None",
              "Component Standardization": "100%",
              "Assembly Accuracy": "99.9%",
              "Verification Time": "<30 seconds",
              "Mission Packages": "Pre-configured"
            }
          },
          {
            name: "Mass Production Advantages",
            description: "Optimized mass production capabilities ensuring consistent quality, rapid scalability, and cost-effective manufacturing for large-scale deployments",
            features: [
              "Automated production lines with quality control",
              "Standardized manufacturing processes",
              "Scalable production capacity",
              "Cost-effective component sourcing",
              "Quality assurance at every stage",
              "Rapid production scaling capabilities"
            ],
            metrics: {
              "Production Rate": "100+ units/month",
              "Quality Control": "100% inspection",
              "Scalability": "10x capacity increase",
              "Cost Efficiency": "60% reduction",
              "Lead Time": "<2 weeks",
              "Quality Rate": "99.9%"
            }
          }
        ],
        training: [
          {
            name: "Training Requirements",
            description: "Minimal training requirements with intuitive operation and comprehensive support systems for rapid operator certification",
            features: [
              "Intuitive user interface design",
              "Comprehensive training modules",
              "Simulation-based learning",
              "Certification programs",
              "Ongoing support and updates",
              "Multi-language support"
            ],
            metrics: {
              "Training Time": "<8 hours",
              "Certification": "95% pass rate",
              "Interface Intuitive": "User-friendly",
              "Support": "24/7 available",
              "Languages": "Multi-language",
              "Updates": "Continuous"
            }
          },
          {
            name: "Maintenance Systems",
            description: "Advanced maintenance and support systems with predictive analytics, remote diagnostics, and comprehensive service networks",
            features: [
              "Predictive maintenance analytics",
              "Remote diagnostics and troubleshooting",
              "Automated maintenance scheduling",
              "Comprehensive service network",
              "Real-time health monitoring",
              "Preventive maintenance protocols"
            ],
            metrics: {
              "Maintenance Interval": "Predictive",
              "Diagnostics": "Remote capability",
              "Service Network": "Global coverage",
              "Uptime": "99.5%",
              "Maintenance Cost": "50% reduction",
              "Support Response": "<2 hours"
            }
          }
        ]
      }
    },
    {
      title: "Performance Metrics Excellence",
      subtitle: "Exceptional Operational Performance",
      content: {
        flight: [
          {
            name: "Flight Endurance & Range",
            description: "Superior flight endurance and range capabilities with intelligent power management and extended operational capabilities",
            features: [
              "Intelligent power management systems",
              "Extended range with LTE/5G connectivity",
              "Payload-optimized flight profiles",
              "Weather-adaptive flight planning",
              "Battery optimization algorithms",
              "Emergency power reserves"
            ],
            metrics: {
              "Standard Flight": "25-50 minutes",
              "Extended Range": "20km+ with LTE/5G",
              "Power Management": "AI-optimized",
              "Weather Adaptation": "Real-time",
              "Battery Efficiency": "95%",
              "Emergency Reserve": "10 minutes"
            }
          },
          {
            name: "Speed & Maneuverability",
            description: "Advanced speed and maneuverability with precision control systems and responsive flight characteristics for complex operations",
            features: [
              "High-speed operations up to 70 km/h",
              "Precision hover control ±0.3m",
              "Advanced flight control algorithms",
              "Responsive maneuverability",
              "Stability in challenging conditions",
              "Precision positioning systems"
            ],
            metrics: {
              "Max Speed": "70 km/h",
              "Cruise Speed": "45 km/h",
              "Hover Precision": "±0.3m",
              "Maneuverability": "360° rotation",
              "Stability": "Advanced control",
              "Positioning": "GPS + visual"
            }
          },
          {
            name: "Weather Resistance",
            description: "Superior weather resistance with IP54 protection and operational capabilities in challenging environmental conditions",
            features: [
              "IP54 weather protection rating",
              "Wind resistance up to 15 m/s",
              "Temperature range -20°C to 60°C",
              "Humidity resistance 0-95% RH",
              "Dust and particle protection",
              "Water ingress protection"
            ],
            metrics: {
              "Protection Level": "IP54",
              "Wind Resistance": "15 m/s",
              "Temperature Range": "-20°C to 60°C",
              "Humidity": "0-95% RH",
              "Dust Protection": "Complete",
              "Water Resistance": "Heavy rain"
            }
          }
        ],
        efficiency: [
          {
            name: "Operational Efficiency",
            description: "Exceptional operational efficiency with automated systems, intelligent coordination, and optimized resource utilization",
            features: [
              "Automated mission planning and execution",
              "Intelligent resource allocation",
              "Real-time performance monitoring",
              "Efficiency optimization algorithms",
              "Predictive maintenance scheduling",
              "Cost-effective operations"
            ],
            metrics: {
              "Mission Success": "99.5%",
              "Efficiency": "40% improvement",
              "Resource Utilization": "95%",
              "Cost Reduction": "60%",
              "Maintenance": "Predictive",
              "ROI": "300% increase"
            }
          },
          {
            name: "Cost-Effectiveness",
            description: "Superior cost-effectiveness with optimized operations, reduced maintenance costs, and exceptional return on investment",
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
          }
        ]
      }
    },
    {
      title: "ArtemisOS Integration",
      subtitle: "Seamless AI-Powered Operations",
      content: {
        integration: [
          {
            name: "Seamless Integration",
            description: "Native integration with ArtemisOS providing unified fleet management, real-time coordination, and centralized control across all operational assets",
            features: [
              "Native ArtemisOS integration",
              "Unified control interface",
              "Real-time data synchronization",
              "Centralized fleet management",
              "Cross-platform compatibility",
              "API integration capabilities"
            ],
            metrics: {
              "Integration Time": "<5 minutes",
              "Data Sync": "Real-time",
              "Compatibility": "100%",
              "API Response": "<100ms",
              "System Uptime": "99.9%",
              "Data Accuracy": "99.9%"
            }
          },
          {
            name: "Autonomous Mission Planning",
            description: "Advanced AI-driven mission planning with intelligent route optimization, threat assessment, and dynamic adaptation for complex operational scenarios",
            features: [
              "AI-powered mission planning",
              "Intelligent route optimization",
              "Real-time threat assessment",
              "Dynamic mission adaptation",
              "Predictive analytics",
              "Weather integration"
            ],
            metrics: {
              "Planning Speed": "<30 seconds",
              "Optimization": "95% efficiency",
              "Adaptation": "Real-time",
              "Success Rate": "98.5%",
              "Route Efficiency": "40% improvement",
              "Threat Detection": "99.2%"
            }
          },
          {
            name: "Real-time Coordination",
            description: "Advanced real-time coordination between multiple Iroko units and other fleet assets with synchronized operations and shared intelligence",
            features: [
              "Multi-unit coordination",
              "Real-time communication",
              "Shared intelligence systems",
              "Synchronized operations",
              "Cross-platform integration",
              "Emergency coordination"
            ],
            metrics: {
              "Coordination Units": "Unlimited",
              "Response Time": "<1 second",
              "Data Latency": "<50ms",
              "Communication": "Real-time",
              "Synchronization": "±100ms",
              "Reliability": "99.8%"
            }
          }
        ],
        fleet: [
          {
            name: "Fleet Management",
            description: "Comprehensive fleet management with centralized monitoring, predictive analytics, and resource optimization for maximum operational efficiency",
            features: [
              "Centralized fleet monitoring",
              "Predictive analytics and reporting",
              "Resource optimization",
              "Performance tracking",
              "Automated scheduling",
              "Maintenance coordination"
            ],
            metrics: {
              "Fleet Size": "Unlimited",
              "Monitoring": "24/7 continuous",
              "Efficiency": "40% improvement",
              "Maintenance": "Predictive",
              "Uptime": "99.5%",
              "ROI": "300% increase"
            }
          },
          {
            name: "Multi-Unit Operations",
            description: "Advanced multi-unit operations with swarm coordination, synchronized missions, and collaborative intelligence for complex operational requirements",
            features: [
              "Swarm coordination algorithms",
              "Synchronized mission execution",
              "Collaborative intelligence sharing",
              "Distributed task allocation",
              "Real-time coordination",
              "Emergency response protocols"
            ],
            metrics: {
              "Swarm Size": "Unlimited",
              "Coordination": "Real-time",
              "Synchronization": "±50ms",
              "Task Allocation": "Automatic",
              "Intelligence Sharing": "Continuous",
              "Emergency Response": "<30 seconds"
            }
          }
        ]
      }
    },
    {
      title: "Manufacturing Excellence",
      subtitle: "Mass Production & Quality Control",
      content: {
        production: [
          {
            name: "Mass Production Capabilities",
            description: "Advanced mass production capabilities with automated manufacturing processes, quality control systems, and scalable production capacity",
            features: [
              "Automated production lines",
              "Robotic assembly systems",
              "Quality control at every stage",
              "Scalable production capacity",
              "Standardized processes",
              "Continuous improvement protocols"
            ],
            metrics: {
              "Production Rate": "100+ units/month",
              "Quality Control": "100% inspection",
              "Scalability": "10x capacity",
              "Efficiency": "95%",
              "Lead Time": "<2 weeks",
              "Quality Rate": "99.9%"
            }
          },
          {
            name: "Quality Control Processes",
            description: "Comprehensive quality control processes with multi-stage inspections, automated testing, and continuous quality monitoring",
            features: [
              "Multi-stage quality inspections",
              "Automated testing procedures",
              "Real-time quality monitoring",
              "Statistical process control",
              "Defect prevention systems",
              "Continuous improvement"
            ],
            metrics: {
              "Inspection Stages": "5+ levels",
              "Testing Automation": "95%",
              "Quality Monitoring": "Real-time",
              "Defect Rate": "<0.1%",
              "Process Control": "Statistical",
              "Improvement": "Continuous"
            }
          },
          {
            name: "Supply Chain Management",
            description: "Optimized supply chain management with strategic sourcing, inventory optimization, and supplier quality assurance",
            features: [
              "Strategic supplier partnerships",
              "Inventory optimization",
              "Quality supplier certification",
              "Supply chain visibility",
              "Risk management",
              "Cost optimization"
            ],
            metrics: {
              "Supplier Quality": "99.5%",
              "Inventory Optimization": "30% reduction",
              "Supply Visibility": "Real-time",
              "Risk Management": "Proactive",
              "Cost Optimization": "25% savings",
              "Delivery": "On-time 99%"
            }
          }
        ],
        optimization: [
          {
            name: "Cost Optimization",
            description: "Advanced cost optimization strategies with efficient resource utilization, lean manufacturing, and continuous cost reduction initiatives",
            features: [
              "Lean manufacturing principles",
              "Resource efficiency optimization",
              "Cost reduction initiatives",
              "Waste elimination programs",
              "Process optimization",
              "Continuous improvement"
            ],
            metrics: {
              "Cost Reduction": "40%",
              "Resource Efficiency": "95%",
              "Waste Elimination": "80%",
              "Process Optimization": "Continuous",
              "Improvement": "Ongoing",
              "Efficiency": "Maximum"
            }
          },
          {
            name: "Scalability Advantages",
            description: "Superior scalability advantages with flexible production capacity, modular manufacturing, and rapid scaling capabilities",
            features: [
              "Flexible production capacity",
              "Modular manufacturing systems",
              "Rapid scaling capabilities",
              "Demand-responsive production",
              "Capacity optimization",
              "Market adaptation"
            ],
            metrics: {
              "Scalability": "10x capacity",
              "Flexibility": "High",
              "Scaling Speed": "Rapid",
              "Demand Response": "Real-time",
              "Capacity": "Optimized",
              "Adaptation": "Market-driven"
            }
          }
        ]
      }
    }
  ]

  // Auto-rotation
  useEffect(() => {
    if (isReducedMotion) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 20000) // 20 seconds for slower rotation

    return () => clearInterval(interval)
  }, [isReducedMotion, slides.length])

  return (
    <section className="relative py-32 bg-gradient-to-b from-background via-charcoal to-background overflow-hidden">
      {/* Dynamic Operations Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-15"
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
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Operations Data Streams */}
        {!isReducedMotion && (
          <>
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-20 bg-gradient-to-b from-transparent via-primary to-transparent opacity-20"
                style={{
                  left: `${20 + (i * 8) % 60}%`,
                  top: `${25 + (i * 6) % 50}%`,
                }}
                animate={{
                  y: [0, 100, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 5 + (i % 2),
                  repeat: Infinity,
                  delay: i * 0.6
                }}
              />
            ))}
          </>
        )}

        {/* Operations Network */}
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
            <span className="text-sm font-medium text-primary">Operational Excellence</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Advanced</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Operations
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive operational capabilities including rapid deployment, performance metrics, 
            ArtemisOS integration, and manufacturing excellence for superior mission execution
          </motion.p>
        </motion.div>

        {/* Slideshow Container */}
        <div className="relative">
          {/* Slide Content */}
          <motion.div
            key={currentSlide}
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {/* Content */}
            <div className="space-y-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <div>
                  <h3 className="text-4xl font-bold text-foreground mb-4">
                    {slides[currentSlide].title}
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    {slides[currentSlide].subtitle}
                  </p>
                </div>
              </motion.div>

              {/* Dynamic Content Based on Slide */}
              {currentSlide === 0 && (
                <div className="space-y-12">
                  {/* Deployment Capabilities */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Deployment Capabilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {slides[0]?.content?.deployment?.map((capability, index) => (
                        <motion.div
                          key={capability.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xl font-bold text-foreground mb-2">{capability.name}</h5>
                              <p className="text-muted-foreground text-sm">{capability.description}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="text-sm font-bold text-foreground">Key Features</div>
                              <div className="space-y-1">
                                {capability.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(capability.metrics).map(([key, value]) => (
                                <div key={key} className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10">
                                  <div className="text-sm font-bold text-primary">{value}</div>
                                  <div className="text-xs text-muted-foreground">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Training & Maintenance */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Training & Maintenance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[0]?.content?.training?.map((system, index) => (
                        <motion.div
                          key={system.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{system.name}</h5>
                              <p className="text-muted-foreground text-sm">{system.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {system.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(system.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-xs text-muted-foreground">{key}:</span>
                                  <span className="text-xs font-bold text-primary">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 1 && (
                <div className="space-y-12">
                  {/* Flight Performance */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Flight Performance</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {slides[1]?.content?.flight?.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xl font-bold text-foreground mb-2">{metric.name}</h5>
                              <p className="text-muted-foreground text-sm">{metric.description}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="text-sm font-bold text-foreground">Capabilities</div>
                              <div className="space-y-1">
                                {metric.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(metric.metrics).map(([key, value]) => (
                                <div key={key} className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10">
                                  <div className="text-sm font-bold text-primary">{value}</div>
                                  <div className="text-xs text-muted-foreground">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Efficiency Metrics */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Efficiency Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[1]?.content?.efficiency?.map((efficiency, index) => (
                        <motion.div
                          key={efficiency.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{efficiency.name}</h5>
                              <p className="text-muted-foreground text-sm">{efficiency.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {efficiency.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(efficiency.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-xs text-muted-foreground">{key}:</span>
                                  <span className="text-xs font-bold text-primary">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 2 && (
                <div className="space-y-12">
                  {/* Integration Capabilities */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Integration Capabilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {slides[2]?.content?.integration?.map((integration, index) => (
                        <motion.div
                          key={integration.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xl font-bold text-foreground mb-2">{integration.name}</h5>
                              <p className="text-muted-foreground text-sm">{integration.description}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {integration.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(integration.metrics).map(([key, value]) => (
                                <div key={key} className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10">
                                  <div className="text-sm font-bold text-primary">{value}</div>
                                  <div className="text-xs text-muted-foreground">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Fleet Management */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Fleet Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[2]?.content?.fleet?.map((fleet, index) => (
                        <motion.div
                          key={fleet.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{fleet.name}</h5>
                              <p className="text-muted-foreground text-sm">{fleet.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {fleet.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(fleet.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-xs text-muted-foreground">{key}:</span>
                                  <span className="text-xs font-bold text-primary">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 3 && (
                <div className="space-y-12">
                  {/* Production Capabilities */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Production Capabilities</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {slides[3]?.content?.production?.map((production, index) => (
                        <motion.div
                          key={production.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xl font-bold text-foreground mb-2">{production.name}</h5>
                              <p className="text-muted-foreground text-sm">{production.description}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {production.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(production.metrics).map(([key, value]) => (
                                <div key={key} className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10">
                                  <div className="text-sm font-bold text-primary">{value}</div>
                                  <div className="text-xs text-muted-foreground">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Optimization */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Optimization</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[3]?.content?.optimization?.map((optimization, index) => (
                        <motion.div
                          key={optimization.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{optimization.name}</h5>
                              <p className="text-muted-foreground text-sm">{optimization.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {optimization.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(optimization.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-xs text-muted-foreground">{key}:</span>
                                  <span className="text-xs font-bold text-primary">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-4 mt-12">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-primary scale-125' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
                onClick={() => setCurrentSlide(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
