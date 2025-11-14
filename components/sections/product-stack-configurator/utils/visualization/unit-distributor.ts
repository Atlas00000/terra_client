import { ProductRecommendation, CoverageArea } from "../types"
import { PRODUCT_SPECS } from "../product-specs"
import { UnitPosition, DeploymentPattern, VisualizationConfig } from "./types"
import { getDeploymentPattern } from "./deployment-patterns"

/**
 * Unit Distributor Module
 * Calculates positions for individual units (not just product types)
 */

/**
 * Distributes all units across the visualization area
 */
export function distributeUnits(
  recommendation: ProductRecommendation,
  config: VisualizationConfig
): UnitPosition[] {
  const units: UnitPosition[] = []
  
  for (const product of recommendation.products) {
    if (product.name === 'ArtemisOS') continue
    
    const productKey = cleanProductName(product.name)
    const spec = PRODUCT_SPECS[productKey as keyof typeof PRODUCT_SPECS]
    
    // Get deployment pattern for this product
    const pattern = getDeploymentPattern(product.name, product.quantity, config.coverageArea)
    
    // Create positions for each unit of this product type
    for (let i = 0; i < product.quantity; i++) {
      const position = calculateUnitPosition(
        product.name,
        productKey,
        i,
        product.quantity,
        pattern,
        config,
        spec
      )
      units.push(position)
    }
  }
  
  return units
}

/**
 * Calculates position for a single unit
 */
function calculateUnitPosition(
  productName: string,
  productKey: string,
  unitIndex: number,
  totalQuantity: number,
  pattern: DeploymentPattern,
  config: VisualizationConfig,
  spec: typeof PRODUCT_SPECS[keyof typeof PRODUCT_SPECS] | undefined
): UnitPosition {
  const { centerX, centerY, maxRadius, scaleFactor } = config
  
  // Calculate angle based on deployment pattern
  const angle = calculateAngle(unitIndex, totalQuantity, pattern)
  
  // Calculate distance from center based on pattern
  const distance = calculateDistance(pattern, maxRadius, config.coverageArea)
  
  // Calculate position
  const x = centerX + distance * Math.cos(angle)
  const y = centerY + distance * Math.sin(angle)
  
  // Get product specs
  const detectionRange = spec?.detectionRange || 0
  const operationalRange = spec?.operationalRange || 0
  
  // Calculate visual range (scaled for visualization)
  const visualRange = calculateVisualRange(
    detectionRange || operationalRange,
    scaleFactor,
    config.coverageArea
  )
  
  return {
    productName,
    productKey,
    unitIndex,
    quantity: totalQuantity,
    x,
    y,
    angle,
    distance,
    spec: spec || null,
    detectionRange,
    operationalRange,
    visualRange
  }
}

/**
 * Calculates angle for unit based on deployment pattern
 */
function calculateAngle(
  unitIndex: number,
  totalQuantity: number,
  pattern: DeploymentPattern
): number {
  switch (pattern.type) {
    case 'perimeter':
      // Evenly distributed around perimeter
      return (unitIndex * 2 * Math.PI) / totalQuantity + pattern.angleOffset
      
    case 'circular':
      // Circular distribution with spacing
      return (unitIndex * 2 * Math.PI) / totalQuantity + pattern.angleOffset
      
    case 'strategic':
      // Strategic positions with offset
      return (unitIndex * 2 * Math.PI) / totalQuantity + pattern.angleOffset
      
    case 'grid':
      // Grid pattern (for future implementation)
      return (unitIndex * 2 * Math.PI) / totalQuantity
      
    case 'sector':
      // Sector-based (for future implementation)
      return (unitIndex * 2 * Math.PI) / totalQuantity
      
    default:
      return (unitIndex * 2 * Math.PI) / totalQuantity
  }
}

/**
 * Calculates distance from center based on pattern
 */
function calculateDistance(
  pattern: DeploymentPattern,
  maxRadius: number,
  coverageArea: CoverageArea
): number {
  // Pattern radius is a multiplier (0-1) of the visualization radius
  // Convert to actual SVG distance
  let distance = maxRadius * pattern.radius
  
  // Adjust based on coverage area
  const distanceMultiplier = getDistanceMultiplier(coverageArea)
  distance *= distanceMultiplier
  
  return Math.min(distance, maxRadius * 0.9) // Cap at 90% of max radius
}

/**
 * Gets distance multiplier based on coverage area
 */
function getDistanceMultiplier(coverageArea: CoverageArea): number {
  switch (coverageArea) {
    case "0-5km": return 0.75
    case "5-15km": return 0.72
    case "15-50km": return 0.68
    case "50km-plus": return 0.65
    default: return 0.7
  }
}

/**
 * Calculates visual range for SVG rendering
 */
function calculateVisualRange(
  range: number,
  scaleFactor: number,
  coverageArea: CoverageArea
): number {
  if (range === 0) return 0
  
  // Scale product range appropriately
  const productRangeScale = getProductRangeScale(coverageArea)
  const scaledRange = range * scaleFactor * productRangeScale
  
  // Cap visual range to prevent overlap
  const maxVisualRange = coverageArea === "50km-plus" 
    ? 150 * 0.25  // Smaller cap for very large areas
    : 150 * 0.3   // Standard cap
  
  return Math.min(scaledRange, maxVisualRange)
}

/**
 * Gets product range scale factor based on coverage area
 */
function getProductRangeScale(coverageArea: CoverageArea): number {
  switch (coverageArea) {
    case "0-5km": return 0.7
    case "5-15km": return 0.75
    case "15-50km": return 0.8
    case "50km-plus": return 0.75
    default: return 0.75
  }
}

/**
 * Cleans product name to get key
 */
function cleanProductName(name: string): string {
  return name
    .replace(' UAV', '')
    .replace(' VTOL', '')
    .replace(' Tower', '')
    .replace(' UGV', '')
    .trim()
}

