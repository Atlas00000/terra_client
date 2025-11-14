import { UnitPosition, CoverageZone, VisualizationConfig } from "./types"

/**
 * Coverage Calculator Module
 * Calculates coverage zones for visualization
 */

/**
 * Calculates coverage zones for all units
 */
export function calculateCoverageZones(
  units: UnitPosition[],
  config: VisualizationConfig
): CoverageZone[] {
  const zones: CoverageZone[] = []
  
  for (const unit of units) {
    if (unit.visualRange > 0) {
      zones.push({
        x: unit.x,
        y: unit.y,
        radius: unit.visualRange,
        intensity: calculateCoverageIntensity(unit, config),
        unitIndex: unit.unitIndex,
        productName: unit.productName
      })
    }
  }
  
  return zones
}

/**
 * Calculates coverage intensity for a unit
 * Based on product type and range
 */
function calculateCoverageIntensity(
  unit: UnitPosition,
  config: VisualizationConfig
): number {
  // Base intensity from product type
  let intensity = 0.5
  
  // Adjust based on detection range vs operational range
  if (unit.detectionRange > 0) {
    intensity = 0.7 // Higher intensity for detection
  } else if (unit.operationalRange > 0) {
    intensity = 0.5 // Medium intensity for operational
  }
  
  // Adjust based on distance from center
  const distanceFromCenter = Math.sqrt(
    Math.pow(unit.x - config.centerX, 2) + 
    Math.pow(unit.y - config.centerY, 2)
  )
  const maxDistance = config.maxRadius
  const distanceRatio = distanceFromCenter / maxDistance
  
  // Units closer to center have slightly higher intensity
  if (distanceRatio < 0.5) {
    intensity += 0.1
  }
  
  return Math.min(1, Math.max(0.3, intensity))
}

/**
 * Calculates combined coverage intensity at a point
 * Used for heat map visualization
 */
export function calculateCombinedCoverage(
  x: number,
  y: number,
  zones: CoverageZone[]
): number {
  let totalIntensity = 0
  
  for (const zone of zones) {
    const distance = Math.sqrt(
      Math.pow(x - zone.x, 2) + Math.pow(y - zone.y, 2)
    )
    
    if (distance <= zone.radius) {
      // Intensity decreases with distance
      const distanceRatio = distance / zone.radius
      const intensity = zone.intensity * (1 - distanceRatio * 0.7)
      totalIntensity += intensity
    }
  }
  
  // Cap at 1.0 (full coverage)
  return Math.min(1, totalIntensity)
}

/**
 * Identifies coverage gaps
 * Areas with low or no coverage
 */
export function identifyCoverageGaps(
  zones: CoverageZone[],
  config: VisualizationConfig
): Array<{ x: number; y: number; radius: number }> {
  const gaps: Array<{ x: number; y: number; radius: number }> = []
  
  // Sample points across the coverage area
  const samplePoints = generateSamplePoints(config, 20)
  
  for (const point of samplePoints) {
    const coverage = calculateCombinedCoverage(point.x, point.y, zones)
    
    if (coverage < 0.3) {
      // Low coverage area - potential gap
      gaps.push({
        x: point.x,
        y: point.y,
        radius: 20 // Gap visualization radius
      })
    }
  }
  
  return gaps
}

/**
 * Generates sample points for coverage analysis
 */
function generateSamplePoints(
  config: VisualizationConfig,
  gridSize: number
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = []
  const step = config.maxRadius * 2 / gridSize
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const x = config.centerX - config.maxRadius + i * step
      const y = config.centerY - config.maxRadius + j * step
      
      // Only include points within the coverage circle
      const distance = Math.sqrt(
        Math.pow(x - config.centerX, 2) + 
        Math.pow(y - config.centerY, 2)
      )
      
      if (distance <= config.maxRadius) {
        points.push({ x, y })
      }
    }
  }
  
  return points
}

