import { CoverageArea } from "../types"
import { DeploymentPattern } from "./types"

/**
 * Deployment Patterns Module
 * Product-specific deployment strategies based on real-world use cases
 */

/**
 * Gets deployment pattern for a product type
 */
export function getDeploymentPattern(
  productName: string,
  quantity: number,
  coverageArea: CoverageArea
): DeploymentPattern {
  const productKey = cleanProductName(productName)
  
  switch (productKey) {
    case "Kallon":
      return getKallonPattern(quantity, coverageArea)
    case "Iroko":
      return getIrokoPattern(quantity, coverageArea)
    case "Archer":
      return getArcherPattern(quantity, coverageArea)
    case "Duma":
      return getDumaPattern(quantity, coverageArea)
    default:
      return getDefaultPattern(quantity, coverageArea)
  }
}

/**
 * Kallon Tower: Perimeter deployment with overlap
 * Towers are distributed evenly around perimeter for continuous coverage
 */
function getKallonPattern(quantity: number, coverageArea: CoverageArea): DeploymentPattern {
  return {
    type: 'perimeter',
    spacing: 0, // Not used for circular distribution
    radius: 0.6, // Deploy at 60% of visualization radius (as multiplier)
    angleOffset: 0
  }
}

/**
 * Iroko UAV: Circular patrol zones
 * UAVs are grouped into patrol zones covering different sectors
 */
function getIrokoPattern(quantity: number, coverageArea: CoverageArea): DeploymentPattern {
  return {
    type: 'circular',
    spacing: 0, // Not used for circular distribution
    radius: 0.7, // Deploy at 70% of visualization radius (as multiplier)
    angleOffset: 0
  }
}

/**
 * Archer VTOL: Strategic rapid response positions
 * Positioned for quick deployment, closer to facility center
 */
function getArcherPattern(quantity: number, coverageArea: CoverageArea): DeploymentPattern {
  return {
    type: 'strategic',
    spacing: 0, // Not used for circular distribution
    radius: 0.4, // Closer to center for fast response (40% of visualization radius)
    angleOffset: Math.PI / 4 // 45-degree offset
  }
}

/**
 * Duma UGV: Ground patrol routes
 * Distributed along perimeter or key ground routes
 */
function getDumaPattern(quantity: number, coverageArea: CoverageArea): DeploymentPattern {
  return {
    type: 'perimeter',
    spacing: 0, // Not used for circular distribution
    radius: 0.65, // Slightly inside perimeter (65% of visualization radius)
    angleOffset: Math.PI / 6 // 30-degree offset
  }
}

/**
 * Default pattern: Circular distribution
 */
function getDefaultPattern(quantity: number, coverageArea: CoverageArea): DeploymentPattern {
  return {
    type: 'circular',
    spacing: 0, // Not used for circular distribution
    radius: 0.6, // Deploy at 60% of visualization radius (as multiplier)
    angleOffset: 0
  }
}

/**
 * Gets coverage radius for a coverage area
 */
function getCoverageRadius(coverageArea: CoverageArea): number {
  switch (coverageArea) {
    case "0-5km": return 2.5
    case "5-15km": return 10
    case "15-50km": return 32.5
    case "50km-plus": return 75
    default: return 10
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

