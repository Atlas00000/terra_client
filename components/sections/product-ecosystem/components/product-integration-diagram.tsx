"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { PRODUCT_INTEGRATIONS, getConnectedProducts } from "../utils/product-integration-data"
import type { ProductIntegration } from "../utils/product-integration-data"

interface ProductIntegrationDiagramProps {
  animationSettings: any
  isReducedMotion: boolean
}

export function ProductIntegrationDiagram({ animationSettings, isReducedMotion }: ProductIntegrationDiagramProps) {
  const { isMobile } = useMobileOptimization()
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const selectedProductData = selectedProduct 
    ? PRODUCT_INTEGRATIONS.find(p => p.productId === selectedProduct)
    : null

  const connectedProducts = selectedProduct 
    ? getConnectedProducts(selectedProduct)
    : []

  return (
    <div className="relative w-full">
      {/* Floating gradient orbs - background depth */}
      {!isReducedMotion && [0, 1, 2].map((i) => {
        const hash = (i * 7919) % 1000000
        return (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-20 -z-10"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${(hash % 60) + 20}%`,
              top: `${((hash * 7) % 60) + 20}%`,
              background: `radial-gradient(circle, rgba(74, 144, 226, 0.4), transparent)`
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.3, 0.15],
              x: [0, 40, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              delay: i * 2,
              ease: 'easeInOut'
            }}
          />
        )
      })}

      {/* Main container */}
      <div className="relative">
        <div
          className="relative z-10 p-8 md:p-12 border border-primary/10 rounded-[32px] bg-transparent"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)'
          }}
        >

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...animationSettings }}
          >
            <motion.h3
              className="text-3xl md:text-4xl font-black text-foreground mb-3"
              animate={!isReducedMotion ? {
                scale: [1, 1.02, 1]
              } : {}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-primary via-muted-foreground to-primary bg-clip-text text-transparent">
                Product Integration Diagram
              </span>
            </motion.h3>
            <p className="text-sm text-muted-foreground/80">
              Click products to see how they integrate and work together
            </p>
          </motion.div>

          {/* Integration Diagram */}
          <div className="relative w-full h-[500px] md:h-[600px] mb-8">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connection lines */}
              {PRODUCT_INTEGRATIONS.map(product => {
                return product.connections.map(connectedId => {
                  const connected = PRODUCT_INTEGRATIONS.find(p => p.productId === connectedId)
                  if (!connected) return null

                  const isActive = selectedProduct === product.productId || 
                                  selectedProduct === connectedId ||
                                  hoveredProduct === product.productId ||
                                  hoveredProduct === connectedId

                  return (
                    <motion.line
                      key={`${product.productId}-${connectedId}`}
                      x1={product.position.x * 10}
                      y1={product.position.y * 6}
                      x2={connected.position.x * 10}
                      y2={connected.position.y * 6}
                      stroke={isActive ? "rgba(74, 144, 226, 0.6)" : "rgba(74, 144, 226, 0.2)"}
                      strokeWidth={isActive ? 3 : 2}
                      strokeDasharray={isActive ? "0" : "8,8"}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: 1, 
                        opacity: isActive ? 0.6 : 0.2 
                      }}
                      transition={{ 
                        delay: 0.3,
                        duration: 0.8,
                        pathLength: { duration: 0.6 }
                      }}
                    />
                  )
                })
              })}

              {/* Product nodes */}
              {PRODUCT_INTEGRATIONS.map((product, index) => {
                const isSelected = selectedProduct === product.productId
                const isHovered = hoveredProduct === product.productId
                const isActive = isSelected || isHovered

                return (
                  <g key={product.productId}>
                    {/* Product node circle */}
                    <motion.circle
                      cx={product.position.x * 10}
                      cy={product.position.y * 6}
                      r={isActive ? 60 : 50}
                      fill={isActive ? "rgba(74, 144, 226, 0.3)" : "rgba(74, 144, 226, 0.1)"}
                      stroke={isActive ? "rgba(74, 144, 226, 0.9)" : "rgba(74, 144, 226, 0.5)"}
                      strokeWidth={isActive ? 4 : 2}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        opacity: 1
                      }}
                      transition={{ 
                        delay: 0.5 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      onMouseEnter={() => setHoveredProduct(product.productId)}
                      onMouseLeave={() => setHoveredProduct(null)}
                      onClick={() => setSelectedProduct(
                        isSelected ? null : product.productId
                      )}
                      style={{ cursor: 'pointer' }}
                    />

                    {/* Product image */}
                    <motion.foreignObject
                      x={product.position.x * 10 - 40}
                      y={product.position.y * 6 - 40}
                      width={80}
                      height={80}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isActive ? 1.1 : 1,
                        opacity: 1
                      }}
                      transition={{ 
                        delay: 0.6 + index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                        <Image
                          src={product.image}
                          alt={product.productName}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    </motion.foreignObject>

                    {/* Product label */}
                    <motion.text
                      x={product.position.x * 10}
                      y={product.position.y * 6 + 70}
                      textAnchor="middle"
                      fontSize="14"
                      fill="white"
                      fontWeight="bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {product.productName}
                    </motion.text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Integration Details Panel */}
          <AnimatePresence>
            {selectedProductData && (
              <motion.div
                className="mt-8 relative p-6 md:p-8 border border-primary/15 rounded-[32px] bg-background/30 backdrop-blur-xl"
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)'
                }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={animationSettings}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-black text-foreground mb-2">
                        {selectedProductData.productName}
                      </h4>
                      <p className="text-sm text-muted-foreground/70">
                        {selectedProductData.category}
                      </p>
                    </div>
                    <motion.button
                      className="w-8 h-8 rounded-full bg-primary/20 hover:bg-primary/30 flex items-center justify-center"
                      onClick={() => setSelectedProduct(null)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="text-primary text-xl">×</span>
                    </motion.button>
                  </div>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h5 className="text-lg font-bold text-foreground mb-3">Key Features</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedProductData.keyFeatures.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full bg-primary"
                            animate={!isReducedMotion ? {
                              scale: [1, 1.2, 1]
                            } : {}}
                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                          />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Integration Details */}
                  <div>
                    <h5 className="text-lg font-bold text-foreground mb-3">Integration Capabilities</h5>
                    <div className="space-y-4">
                      {selectedProductData.integrationDetails.map((integration, idx) => (
                        <motion.div
                          key={idx}
                          className="p-4 bg-white/5 rounded-lg border border-primary/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                        >
                          <h6 className="text-base font-bold text-primary mb-2">
                            Integration with {integration.with}
                          </h6>
                          <p className="text-sm text-muted-foreground mb-3">
                            {integration.description}
                          </p>
                          <div className="space-y-2">
                            {integration.capabilities.map((capability, capIdx) => (
                              <div key={capIdx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                <span className="text-xs text-muted-foreground/80">{capability}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

