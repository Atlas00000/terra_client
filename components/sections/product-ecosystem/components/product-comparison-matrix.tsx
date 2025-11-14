"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo } from "react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { 
  PRODUCT_COMPARISONS, 
  filterProducts,
  getAllCapabilities,
  getAllUseCases,
  type CapabilityType,
  type UseCaseType,
  type PriceRange
} from "../utils/product-comparison-data"

interface ProductComparisonMatrixProps {
  animationSettings: any
  isReducedMotion: boolean
}

export function ProductComparisonMatrix({ animationSettings, isReducedMotion }: ProductComparisonMatrixProps) {
  const { isMobile } = useMobileOptimization()
  const [selectedCapabilities, setSelectedCapabilities] = useState<CapabilityType[]>([])
  const [selectedUseCases, setSelectedUseCases] = useState<UseCaseType[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<PriceRange[]>([])

  const allCapabilities = getAllCapabilities()
  const allUseCases = getAllUseCases()
  const priceRanges: PriceRange[] = ["Low", "Medium", "High", "Enterprise"]

  const filteredProducts = useMemo(() => {
    return filterProducts(PRODUCT_COMPARISONS, {
      capabilities: selectedCapabilities.length > 0 ? selectedCapabilities : undefined,
      useCases: selectedUseCases.length > 0 ? selectedUseCases : undefined,
      priceRange: selectedPriceRanges.length > 0 ? selectedPriceRanges : undefined
    })
  }, [selectedCapabilities, selectedUseCases, selectedPriceRanges])

  const toggleCapability = (capability: CapabilityType) => {
    setSelectedCapabilities(prev =>
      prev.includes(capability)
        ? prev.filter(c => c !== capability)
        : [...prev, capability]
    )
  }

  const toggleUseCase = (useCase: UseCaseType) => {
    setSelectedUseCases(prev =>
      prev.includes(useCase)
        ? prev.filter(u => u !== useCase)
        : [...prev, useCase]
    )
  }

  const togglePriceRange = (priceRange: PriceRange) => {
    setSelectedPriceRanges(prev =>
      prev.includes(priceRange)
        ? prev.filter(p => p !== priceRange)
        : [...prev, priceRange]
    )
  }

  const clearFilters = () => {
    setSelectedCapabilities([])
    setSelectedUseCases([])
    setSelectedPriceRanges([])
  }

  return (
    <div className="relative w-full">
      {/* Floating gradient orbs */}
      {!isReducedMotion && [0, 1].map((i) => {
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

      {/* Main fluid container */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-muted/5 to-primary/10 opacity-50"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)'
          }}
        />

        <div
          className="relative z-10 p-8 md:p-12 backdrop-blur-2xl bg-gradient-to-br from-white/8 via-white/5 to-transparent"
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)'
          }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-muted-foreground/20 to-primary/20 opacity-0 group-hover:opacity-100"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)',
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
            }}
            animate={!isReducedMotion ? {
              x: ['-100%', '100%']
            } : {}}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />

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
                Product Capability Comparison
              </span>
            </motion.h3>
            <p className="text-sm text-muted-foreground/80">
              Compare all products by capability, use case, and price range
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 space-y-6">
            {/* Capabilities Filter */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-3">Filter by Capability</h4>
              <div className="flex flex-wrap gap-2">
                {allCapabilities.map((capability) => {
                  const isSelected = selectedCapabilities.includes(capability)
                  return (
                    <motion.button
                      key={capability}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-muted-foreground hover:bg-white/20'
                      }`}
                      onClick={() => toggleCapability(capability)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {capability}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Use Cases Filter */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-3">Filter by Use Case</h4>
              <div className="flex flex-wrap gap-2">
                {allUseCases.map((useCase) => {
                  const isSelected = selectedUseCases.includes(useCase)
                  return (
                    <motion.button
                      key={useCase}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-muted-foreground hover:bg-white/20'
                      }`}
                      onClick={() => toggleUseCase(useCase)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {useCase}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="text-sm font-bold text-foreground mb-3">Filter by Price Range</h4>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((priceRange) => {
                  const isSelected = selectedPriceRanges.includes(priceRange)
                  return (
                    <motion.button
                      key={priceRange}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        isSelected
                          ? 'bg-primary text-white'
                          : 'bg-white/10 text-muted-foreground hover:bg-white/20'
                      }`}
                      onClick={() => togglePriceRange(priceRange)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {priceRange}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Clear Filters */}
            {(selectedCapabilities.length > 0 || selectedUseCases.length > 0 || selectedPriceRanges.length > 0) && (
              <motion.button
                className="px-6 py-2 bg-white/10 hover:bg-white/20 text-muted-foreground rounded-full text-sm font-medium"
                onClick={clearFilters}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
            )}
          </div>

          {/* Comparison Cards - Mobile Responsive */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.productId}
                  className="relative p-6 backdrop-blur-xl bg-gradient-to-br from-white/8 via-white/5 to-transparent border border-primary/20 rounded-lg hover:border-primary/40 transition-all"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!isReducedMotion ? { scale: 1.02 } : {}}
                >
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 via-muted-foreground/20 to-primary/20 opacity-0 group-hover:opacity-100"
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 88%, 92% 100%, 8% 100%, 0% 92%)',
                      maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                    }}
                    animate={!isReducedMotion ? {
                      x: ['-100%', '100%']
                    } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />

                  <div className="relative z-10">
                    {/* Product Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                      <div>
                        <h4 className="text-xl font-black text-foreground mb-1">
                          {product.productName}
                        </h4>
                        <p className="text-sm text-muted-foreground/70">{product.category}</p>
                      </div>
                      <div>
                        <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                          product.priceRange === 'Low' ? 'bg-green-500/20 text-green-400' :
                          product.priceRange === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          product.priceRange === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {product.priceRange}
                        </span>
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="mb-4">
                      <h5 className="text-sm font-bold text-foreground mb-2">Capabilities</h5>
                      <div className="flex flex-wrap gap-2">
                        {product.capabilities.map((cap, idx) => (
                          <motion.span
                            key={idx}
                            className="px-3 py-1 bg-primary/10 rounded-full text-xs text-muted-foreground"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                          >
                            {cap}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-4">
                      <h5 className="text-sm font-bold text-foreground mb-2">Use Cases</h5>
                      <div className="flex flex-wrap gap-2">
                        {product.useCases.map((useCase, idx) => (
                          <motion.span
                            key={idx}
                            className="px-3 py-1 bg-muted/20 rounded-full text-xs text-muted-foreground"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + idx * 0.05 }}
                          >
                            {useCase}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Specifications Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-primary/10">
                      <div>
                        <div className="text-xs text-muted-foreground/70 mb-1">Operational Range</div>
                        <div className="text-sm font-semibold text-foreground">
                          {product.specifications.operationalRange}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground/70 mb-1">Response Time</div>
                        <div className="text-sm font-semibold text-foreground">
                          {product.specifications.responseTime}
                        </div>
                      </div>
                      {product.specifications.endurance && (
                        <div>
                          <div className="text-xs text-muted-foreground/70 mb-1">Endurance</div>
                          <div className="text-sm font-semibold text-foreground">
                            {product.specifications.endurance}
                          </div>
                        </div>
                      )}
                      {product.specifications.detectionRange && product.specifications.detectionRange !== "N/A (Central Platform)" && (
                        <div>
                          <div className="text-xs text-muted-foreground/70 mb-1">Detection Range</div>
                          <div className="text-sm font-semibold text-foreground">
                            {product.specifications.detectionRange}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Cost Efficiency */}
                    <div className="mt-4 pt-4 border-t border-primary/10">
                      <div className="text-xs text-muted-foreground/70 mb-1">Cost Efficiency</div>
                      <div className="text-sm text-foreground">{product.costEfficiency}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                className="text-center py-12 text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No products match the selected filters
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

