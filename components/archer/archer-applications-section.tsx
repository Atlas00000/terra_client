"use client"

import { motion } from "framer-motion"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import Image from "next/image"

export function ArcherApplicationsSection() {
  const { isMobile, isReducedMotion } = useMobileOptimization()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Mission Applications",
      subtitle: "Versatile Operations Across Industries",
      content: {
        primary: [
          {
            name: "Border Surveillance",
            description: "Advanced perimeter monitoring and patrol systems with AI-powered intrusion detection and automated response capabilities for enhanced border security",
            features: [
              "24/7 perimeter monitoring with thermal imaging",
              "AI-powered intrusion detection and classification", 
              "Cross-border threat assessment and intelligence gathering",
              "Automated alert systems with real-time notifications",
              "Integration with existing security infrastructure",
              "Weather-resistant operations in harsh conditions"
            ],
            metrics: { 
              "Coverage Area": "15km radius", 
              "Detection Range": "5km day/3km night", 
              "Response Time": "<2 minutes",
              "Accuracy Rate": "99.2%",
              "False Alarm Rate": "<0.5%",
              "Weather Resistance": "IP54 rated"
            }
          },
          {
            name: "Infrastructure Inspection", 
            description: "Comprehensive power line and pipeline inspection with advanced structural integrity assessment using high-resolution imaging and AI analysis",
            features: [
              "High-resolution 4K video and 48MP still imaging",
              "Thermal imaging for heat detection and analysis",
              "AI-powered defect detection and classification",
              "Automated reporting with detailed documentation",
              "Integration with maintenance management systems",
              "Real-time data transmission and cloud storage"
            ],
            metrics: { 
              "Inspection Speed": "10x faster than manual", 
              "Detection Accuracy": "99.5%", 
              "Cost Savings": "60% reduction",
              "Data Quality": "4K resolution",
              "Processing Time": "<30 seconds",
              "Report Generation": "Automated"
            }
          },
          {
            name: "Search & Rescue",
            description: "Advanced emergency response coordination with AI-powered search algorithms and real-time communication for missing person operations and disaster relief",
            features: [
              "AI-powered search pattern optimization",
              "Real-time coordination with ground teams",
              "Thermal imaging for night operations",
              "GPS tracking and location services",
              "Emergency communication relay capabilities",
              "Integration with emergency services"
            ],
            metrics: { 
              "Search Area": "50km² per mission", 
              "Response Time": "<5 minutes", 
              "Success Rate": "95%",
              "Night Operations": "Full capability",
              "Communication Range": "15km",
              "Battery Life": "34 minutes"
            }
          }
        ],
        secondary: [
          {
            name: "Agriculture",
            description: "Advanced crop monitoring and analysis with AI-powered pest detection, irrigation management, and yield optimization for precision farming",
            features: [
              "Multi-spectral imaging for crop health analysis",
              "AI-powered pest and disease detection",
              "Precision irrigation management systems",
              "Yield prediction and optimization algorithms",
              "Soil health monitoring and analysis",
              "Automated reporting for farm management"
            ]
          },
          {
            name: "Environmental Monitoring",
            description: "Comprehensive wildlife tracking and environmental hazard detection with advanced climate monitoring and pollution assessment capabilities",
            features: [
              "Wildlife population tracking and behavior analysis",
              "Environmental hazard detection and early warning",
              "Climate change monitoring and data collection",
              "Pollution assessment and air quality monitoring",
              "Ecosystem health evaluation",
              "Long-term environmental data collection"
            ]
          }
        ]
      }
    },
    {
      title: "Performance Metrics",
      subtitle: "Exceptional Operational Excellence",
      content: {
        flight: [
          {
            name: "Flight Endurance",
            value: "34 minutes",
            detail: "Extended flight time per charge with optimal conditions and intelligent power management",
            metrics: { 
              "Standard Flight": "34 min", 
              "Hover Time": "28 min", 
              "Payload Flight": "25 min",
              "Battery Type": "LiPo 6S",
              "Charging Time": "90 minutes",
              "Power Management": "AI-optimized"
            }
          },
          {
            name: "Operational Range", 
            value: "15km",
            detail: "Standard operational range with extended capability to 50km using advanced communication systems",
            metrics: { 
              "Standard Range": "15km", 
              "Extended Range": "50km", 
              "Line of Sight": "Visual range",
              "Communication": "Wi-Fi 2.4/5.8GHz",
              "Bluetooth": "5.0 support",
              "Data Transfer": "Real-time"
            }
          },
          {
            name: "Speed & Maneuverability",
            value: "60 km/h",
            detail: "Maximum speed with advanced maneuverability and precision flight control systems",
            metrics: { 
              "Max Speed": "60 km/h", 
              "Cruise Speed": "45 km/h", 
              "Hover Stability": "±0.5m",
              "Wind Resistance": "12 m/s",
              "Precision Control": "±0.1m",
              "Maneuverability": "360° rotation"
            }
          }
        ],
        weather: [
          {
            name: "Weather Resistance",
            value: "IP54",
            detail: "Advanced protection against dust and water ingress with temperature range operation",
            metrics: { 
              "Protection Level": "IP54", 
              "Wind Resistance": "12 m/s", 
              "Temperature Range": "-20°C to 60°C",
              "Humidity": "0-95% RH",
              "Altitude": "5000m max",
              "Rain Resistance": "Heavy rain"
            }
          },
          {
            name: "Operational Efficiency",
            value: "99.5%",
            detail: "Exceptional mission success rate with minimal downtime and predictive maintenance",
            metrics: { 
              "Success Rate": "99.5%", 
              "Uptime": "99.8%", 
              "Maintenance": "Predictive",
              "Reliability": "Military-grade",
              "Failure Rate": "<0.2%",
              "Service Life": "10+ years"
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
            description: "Native integration with ArtemisOS for unified fleet management, real-time coordination, and centralized control across all operational assets",
            features: [
              "Unified control interface with intuitive dashboard",
              "Real-time data sharing and synchronization",
              "Centralized fleet management and monitoring",
              "Cross-platform compatibility with existing systems",
              "API integration with third-party applications",
              "Cloud-based data storage and analytics"
            ],
            metrics: { 
              "Integration Time": "<5 minutes", 
              "Data Sync": "Real-time", 
              "Compatibility": "100%",
              "API Response": "<100ms",
              "Data Accuracy": "99.9%",
              "System Uptime": "99.9%"
            }
          },
          {
            name: "Autonomous Mission Planning",
            description: "Advanced AI-driven mission planning with intelligent route optimization, threat assessment, and dynamic adaptation for complex operational scenarios",
            features: [
              "AI-powered mission planning and optimization",
              "Intelligent route planning with obstacle avoidance",
              "Real-time threat assessment and risk analysis",
              "Dynamic mission adaptation based on conditions",
              "Predictive analytics for mission success",
              "Integration with weather and environmental data"
            ],
            metrics: { 
              "Planning Speed": "<30 seconds", 
              "Optimization": "95% efficiency", 
              "Adaptation": "Real-time",
              "Success Rate": "98.5%",
              "Route Efficiency": "40% improvement",
              "Threat Detection": "99.2% accuracy"
            }
          },
          {
            name: "Real-time Coordination",
            description: "Advanced live coordination between multiple Archer units and other fleet assets with synchronized operations and shared intelligence",
            features: [
              "Multi-unit coordination and swarm operations",
              "Live communication and data sharing",
              "Shared intelligence and situational awareness",
              "Synchronized mission execution",
              "Cross-platform asset integration",
              "Emergency response coordination"
            ],
            metrics: { 
              "Coordination Units": "Unlimited scale", 
              "Response Time": "<1 second", 
              "Data Latency": "<50ms",
              "Communication Range": "15km",
              "Synchronization": "±100ms",
              "Reliability": "99.8%"
            }
          },
          {
            name: "Fleet Management",
            description: "Comprehensive fleet management with centralized monitoring, predictive analytics, and resource optimization for maximum operational efficiency",
            features: [
              "Centralized monitoring and control dashboard",
              "Advanced fleet analytics and reporting",
              "Predictive maintenance and health monitoring",
              "Resource optimization and allocation",
              "Performance tracking and KPI management",
              "Automated scheduling and deployment"
            ],
            metrics: { 
              "Fleet Size": "Unlimited capacity", 
              "Monitoring": "24/7 continuous", 
              "Efficiency": "40% improvement",
              "Maintenance Cost": "60% reduction",
              "Uptime": "99.5%",
              "ROI": "300% increase"
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
    }, 20000) // Increased to 20 seconds for slower rotation

    return () => clearInterval(interval)
  }, [isReducedMotion, slides.length])

  return (
    <section className="relative py-32 bg-gradient-to-b from-charcoal via-background to-charcoal overflow-hidden">
      {/* Dynamic Mission Background */}
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
            <span className="text-sm font-medium text-primary">Mission Excellence</span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-black tracking-tighter font-display text-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="block">Operational</span>
            <span className="block bg-gradient-to-r from-primary via-green-400 to-blue-500 bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-6xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Comprehensive mission applications, performance metrics, and seamless ArtemisOS integration 
            for superior operational capabilities across diverse environments
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
                <div className="space-y-8">
                  {/* Primary Applications */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-6">Primary Applications</h4>
                    <div className="space-y-6">
                      {slides[0]?.content?.primary?.map((app, index) => (
                        <motion.div
                          key={app.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div>
                              <h5 className="text-xl font-bold text-foreground mb-2">{app.name}</h5>
                              <p className="text-muted-foreground">{app.description}</p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-muted-foreground mb-2">Key Features</div>
                                <div className="space-y-1">
                                  {app.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-center gap-2">
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                      <span className="text-sm text-muted-foreground">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-muted-foreground mb-2">Performance</div>
                                <div className="space-y-1">
                                  {Object.entries(app.metrics).map(([key, value]) => (
                                    <div key={key} className="flex justify-between">
                                      <span className="text-sm text-muted-foreground">{key}:</span>
                                      <span className="text-sm font-bold text-primary">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Secondary Applications */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-6">Secondary Applications</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {slides[0]?.content?.secondary?.map((app, index) => (
                        <motion.div
                          key={app.name}
                          className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-green-400/10 border border-primary/20"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <h5 className="text-lg font-bold text-foreground mb-2">{app.name}</h5>
                          <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                          <div className="space-y-1">
                            {app.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                <span className="text-xs text-muted-foreground">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentSlide === 1 && (
                <div className="space-y-8">
                  {/* Flight Performance */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-6">Flight Performance</h4>
                    <div className="space-y-6">
                      {slides[1]?.content?.flight?.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-xl font-bold text-foreground mb-1">{metric.name}</h5>
                                <p className="text-muted-foreground">{metric.detail}</p>
                              </div>
                              <div className="text-3xl font-bold text-primary">{metric.value}</div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              {Object.entries(metric.metrics).map(([key, value]) => (
                                <div key={key} className="text-center p-3 rounded-lg bg-gradient-to-br from-primary/10 to-green-400/10">
                                  <div className="text-lg font-bold text-primary">{value}</div>
                                  <div className="text-xs text-muted-foreground">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Weather & Efficiency */}
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-6">Weather & Efficiency</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {slides[1]?.content?.weather?.map((metric, index) => (
                        <motion.div
                          key={metric.name}
                          className="p-6 rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/20 backdrop-blur-sm"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="space-y-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="text-lg font-bold text-foreground mb-1">{metric.name}</h5>
                                <p className="text-sm text-muted-foreground">{metric.detail}</p>
                              </div>
                              <div className="text-2xl font-bold text-primary">{metric.value}</div>
                            </div>
                            
                            <div className="space-y-2">
                              {Object.entries(metric.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">{key}:</span>
                                  <span className="text-sm font-bold text-primary">{value}</span>
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
                <div className="space-y-8">
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
                          <p className="text-muted-foreground">{integration.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm text-muted-foreground mb-3">Key Features</div>
                            <div className="space-y-2">
                              {integration.features.map((feature, fIndex) => (
                                <div key={fIndex} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                  <span className="text-sm text-muted-foreground">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-3">Performance</div>
                            <div className="space-y-2">
                              {Object.entries(integration.metrics).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span className="text-sm text-muted-foreground">{key}:</span>
                                  <span className="text-sm font-bold text-primary">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
