"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

export function IrokoMarketSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Use Cases & Applications",
      subtitle: "Diverse Market Applications",
      content: {
        emergency: [
          {
            name: "Emergency Services Integration",
            description: "Seamless integration with emergency services including fire departments, medical emergency teams, and disaster response units for rapid deployment in critical situations",
            features: [
              "Direct integration with 911 dispatch systems",
              "Real-time emergency response coordination",
              "Automated emergency service notifications",
              "Integration with hospital emergency departments",
              "Fire department rapid deployment protocols",
              "Disaster response team coordination"
            ],
            metrics: {
              "Response Time": "<90 seconds",
              "Integration": "Seamless",
              "Coordination": "Real-time",
              "Success Rate": "99.5%",
              "Emergency Link": "Direct",
              "Deployment": "Automated"
            }
          },
          {
            name: "Medical Emergency Support",
            description: "Specialized medical emergency response with autonomous flight to medical incidents, supply delivery, and coordination with healthcare providers",
            features: [
              "Autonomous flight to medical emergencies",
              "Medical supply and equipment delivery",
              "Real-time coordination with healthcare providers",
              "Emergency communication with medical teams",
              "Integration with hospital systems",
              "Specialized medical payload configurations"
            ],
            metrics: {
              "Medical Response": "<90 seconds",
              "Supply Delivery": "Critical supplies",
              "Hospital Integration": "Seamless",
              "Medical Accuracy": "99.5%",
              "Emergency Link": "Real-time",
              "Success Rate": "97.8%"
            }
          }
        ],
        government: [
          {
            name: "Government Applications",
            description: "Comprehensive government applications including border security, infrastructure monitoring, and public safety operations with advanced surveillance capabilities",
            features: [
              "Border security and surveillance operations",
              "Infrastructure monitoring and protection",
              "Public safety and law enforcement support",
              "Environmental monitoring and compliance",
              "Emergency management coordination",
              "National security applications"
            ],
            metrics: {
              "Security Coverage": "24/7 monitoring",
              "Infrastructure": "Complete protection",
              "Public Safety": "Enhanced response",
              "Environmental": "Real-time monitoring",
              "Emergency": "Rapid coordination",
              "Security": "National level"
            }
          },
          {
            name: "Military Applications",
            description: "Advanced military applications including reconnaissance, surveillance, and tactical operations with secure communication and mission-critical capabilities",
            features: [
              "Tactical reconnaissance and surveillance",
              "Mission-critical operations support",
              "Secure communication systems",
              "Battlefield intelligence gathering",
              "Tactical coordination and support",
              "Military-grade security protocols"
            ],
            metrics: {
              "Reconnaissance": "Tactical level",
              "Surveillance": "Advanced capabilities",
              "Communication": "Secure protocols",
              "Intelligence": "Real-time gathering",
              "Coordination": "Tactical support",
              "Security": "Military-grade"
            }
          }
        ],
        commercial: [
          {
            name: "Commercial Applications",
            description: "Diverse commercial applications including infrastructure inspection, security services, and industrial monitoring with cost-effective solutions",
            features: [
              "Infrastructure inspection and monitoring",
              "Security and surveillance services",
              "Industrial monitoring and maintenance",
              "Asset management and tracking",
              "Quality control and inspection",
              "Commercial delivery services"
            ],
            metrics: {
              "Inspection": "10x faster",
              "Security": "24/7 coverage",
              "Industrial": "Comprehensive monitoring",
              "Asset Management": "Real-time tracking",
              "Quality Control": "Automated",
              "Delivery": "Efficient service"
            }
          },
          {
            name: "Industrial Uses",
            description: "Specialized industrial applications including manufacturing support, quality control, and operational efficiency optimization",
            features: [
              "Manufacturing process monitoring",
              "Quality control and inspection",
              "Operational efficiency optimization",
              "Safety monitoring and compliance",
              "Predictive maintenance support",
              "Industrial automation integration"
            ],
            metrics: {
              "Manufacturing": "Process optimization",
              "Quality Control": "Automated inspection",
              "Efficiency": "40% improvement",
              "Safety": "Enhanced monitoring",
              "Maintenance": "Predictive",
              "Automation": "Seamless integration"
            }
          }
        ]
      }
    },
    {
      title: "Competitive Advantages",
      subtitle: "Market Leadership Position",
      content: {
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
      {/* Dynamic Market Background */}
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

        {/* Market Data Streams */}
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

        {/* Market Network */}
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
            <span className="text-sm font-medium text-primary">Market Excellence</span>
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
            Comprehensive market applications and competitive advantages showcasing 
            Iroko's unique positioning and superior capabilities across diverse sectors
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
                  {/* Emergency Services */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Emergency Services Integration</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[0]?.content?.emergency?.map((service, index) => (
                        <motion.div
                          key={service.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xl font-bold text-foreground mb-2">{service.name}</h5>
                              <p className="text-muted-foreground text-sm">{service.description}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="text-sm font-bold text-foreground">Key Features</div>
                              <div className="space-y-1">
                                {service.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(service.metrics).map(([key, value]) => (
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

                  {/* Government & Military */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Government & Military Applications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[0]?.content?.government?.map((application, index) => (
                        <motion.div
                          key={application.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{application.name}</h5>
                              <p className="text-muted-foreground text-sm">{application.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {application.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(application.metrics).map(([key, value]) => (
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

                  {/* Commercial & Industrial */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Commercial & Industrial Uses</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[0]?.content?.commercial?.map((use, index) => (
                        <motion.div
                          key={use.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{use.name}</h5>
                              <p className="text-muted-foreground text-sm">{use.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {use.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(use.metrics).map(([key, value]) => (
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
                  {/* Unique Selling Propositions */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Unique Selling Propositions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[1]?.content?.unique?.map((proposition, index) => (
                        <motion.div
                          key={proposition.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xl font-bold text-foreground mb-2">{proposition.name}</h5>
                              <p className="text-muted-foreground text-sm">{proposition.description}</p>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="text-sm font-bold text-foreground">Key Features</div>
                              <div className="space-y-1">
                                {proposition.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              {Object.entries(proposition.metrics).map(([key, value]) => (
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

                  {/* Technology Differentiation */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Technology Differentiation</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[1]?.content?.technology?.map((technology, index) => (
                        <motion.div
                          key={technology.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{technology.name}</h5>
                              <p className="text-muted-foreground text-sm">{technology.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {technology.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(technology.metrics).map(([key, value]) => (
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

                  {/* Cost Advantages */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-8">Cost Advantages</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {slides[1]?.content?.cost?.map((advantage, index) => (
                        <motion.div
                          key={advantage.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-lg font-bold text-foreground mb-2">{advantage.name}</h5>
                              <p className="text-muted-foreground text-sm">{advantage.description}</p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="text-sm font-bold text-foreground">Features</div>
                              <div className="space-y-1">
                                {advantage.features.map((feature, fIndex) => (
                                  <div key={fIndex} className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-primary rounded-full" />
                                    <span className="text-xs text-muted-foreground">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              {Object.entries(advantage.metrics).map(([key, value]) => (
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
