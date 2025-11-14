import { CoverageArea, ProductRecommendation } from "../types"
import { ProductSpec } from "../product-specs"

/**
 * Visualization Types
 * Type definitions for coverage visualization components
 */

export interface UnitPosition {
  productName: string
  productKey: string  // Cleaned product name (e.g., "Iroko", "Duma")
  unitIndex: number  // 0-based index for this unit
  quantity: number   // Total quantity of this product type
  x: number          // SVG X coordinate
  y: number          // SVG Y coordinate
  angle: number      // Angle from center in radians
  distance: number   // Distance from center
  spec: ProductSpec | null
  detectionRange: number
  operationalRange: number
  visualRange: number  // Scaled range for visualization
}

export interface UnitCluster {
  productType: string
  productKey: string
  centerX: number
  centerY: number
  units: UnitPosition[]
  clusterRadius: number
}

export interface DeploymentPattern {
  type: 'perimeter' | 'circular' | 'grid' | 'sector' | 'strategic'
  spacing: number    // Spacing between units
  radius: number     // Deployment radius
  angleOffset: number // Starting angle offset
}

export interface CoverageZone {
  x: number
  y: number
  radius: number
  intensity: number  // 0-1 for coverage intensity
  unitIndex: number
  productName: string
}

export interface VisualizationConfig {
  svgSize: number
  centerX: number
  centerY: number
  maxRadius: number
  scaleFactor: number
  coverageArea: CoverageArea
}

export interface UnitDistributionResult {
  units: UnitPosition[]
  clusters: UnitCluster[]
  coverageZones: CoverageZone[]
  config: VisualizationConfig
}

