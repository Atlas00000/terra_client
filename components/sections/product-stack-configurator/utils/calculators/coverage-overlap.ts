import { PRODUCT_SPECS } from "../product-specs"

/**
 * Coverage Overlap Calculator Module
 * Calculates product deployment with overlap requirements for continuous coverage
 */

export interface OverlapConfig {
  overlapPercentage: number  // Required overlap (0-1, e.g., 0.2 = 20%)
  minimumUnits: number        // Minimum units required
  effectiveRadius: number     // Effective coverage radius after overlap
}

/**
 * Calculates Kallon tower deployment with overlap
 * Kallon: 15km coverage radius, requires 20% overlap for continuous coverage
 */
export function calculateKallonTowers(
  coverageRadius: number,
  overlapPercentage: number = 0.2
): { quantity: number; effectiveRadius: number; reasoning: string[] } {
  const kallonSpec = PRODUCT_SPECS.Kallon
  const kallonCoverageRadius = kallonSpec.operationalRange // 15km
  
  // Calculate effective radius with overlap
  const effectiveRadius = kallonCoverageRadius * (1 - overlapPercentage)
  
  // Calculate minimum towers needed
  const quantity = Math.ceil(coverageRadius / effectiveRadius)
  
  const reasoning = [
    `Kallon Tower: ${kallonCoverageRadius}km coverage radius`,
    `${(overlapPercentage * 100).toFixed(0)}% overlap required for continuous coverage`,
    `Effective radius per tower: ${effectiveRadius.toFixed(1)}km`,
    `${coverageRadius}km coverage requires ${quantity} towers`
  ]

  return {
    quantity,
    effectiveRadius,
    reasoning
  }
}

/**
 * Calculates UAV deployment for area coverage
 * Accounts for operational range and flight patterns
 */
export function calculateUAVCoverage(
  productName: "Iroko" | "Archer",
  coverageRadius: number,
  overlapPercentage: number = 0.15  // 15% overlap for UAVs
): { quantity: number; effectiveRange: number; reasoning: string[] } {
  const spec = PRODUCT_SPECS[productName]
  const operationalRange = spec.operationalRange
  
  // UAVs can cover area more efficiently with flight patterns
  // Effective range accounts for overlap and flight efficiency
  const effectiveRange = operationalRange * (1 - overlapPercentage)
  
  // For circular coverage, approximate with square grid
  // Each UAV covers approximately (effectiveRange * 2)^2 area
  const areaPerUAV = Math.PI * Math.pow(effectiveRange, 2)
  const totalArea = Math.PI * Math.pow(coverageRadius, 2)
  
  const quantity = Math.ceil(totalArea / areaPerUAV)
  
  const reasoning = [
    `${spec.name}: ${operationalRange}km operational range`,
    `${(overlapPercentage * 100).toFixed(0)}% overlap for continuous coverage`,
    `Effective coverage per unit: ${effectiveRange.toFixed(1)}km radius`,
    `${coverageRadius}km radius coverage requires ${quantity} units`
  ]

  return {
    quantity,
    effectiveRange,
    reasoning
  }
}

/**
 * Calculates ground vehicle (Duma) deployment
 * Ground vehicles cover linear/perimeter routes
 */
export function calculateGroundVehicleCoverage(
  coverageRadius: number,
  patrolRouteLength?: number  // Optional: specific route length in km
): { quantity: number; reasoning: string[] } {
  const dumaSpec = PRODUCT_SPECS.Duma
  const patrolRange = dumaSpec.detectionRange // 5km patrol range
  
  // For perimeter coverage, calculate based on circumference
  const perimeter = 2 * Math.PI * coverageRadius
  
  // Each Duma can patrol approximately 2 * patrolRange (round trip)
  const coveragePerUnit = patrolRange * 2
  
  // If specific route length provided, use that instead
  const routeLength = patrolRouteLength || perimeter
  const quantity = Math.ceil(routeLength / coveragePerUnit)
  
  const reasoning = [
    `Duma UGV: ${patrolRange}km patrol range`,
    `Perimeter length: ${routeLength.toFixed(1)}km`,
    `Coverage per unit: ${coveragePerUnit}km (round trip)`,
    `Requires ${quantity} units for complete perimeter coverage`
  ]

  return {
    quantity,
    reasoning
  }
}

/**
 * Validates coverage overlap meets minimum requirements
 */
export function validateCoverageOverlap(
  units: number,
  unitRadius: number,
  requiredCoverage: number,
  overlapPercentage: number = 0.2
): { isValid: boolean; actualCoverage: number; gap: number } {
  const effectiveRadius = unitRadius * (1 - overlapPercentage)
  const actualCoverage = units * effectiveRadius
  const gap = requiredCoverage - actualCoverage
  
  return {
    isValid: gap <= 0,
    actualCoverage,
    gap
  }
}

