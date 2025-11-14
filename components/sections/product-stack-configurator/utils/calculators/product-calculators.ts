import { PRODUCT_SPECS } from "../product-specs"
import { ThreatLevel } from "../types"
import { calculateKallonTowers, calculateUAVCoverage, calculateGroundVehicleCoverage } from "./coverage-overlap"
import { analyzeThreat, getRotationMultiplier, getRedundancyRequirement } from "./threat-analyzer"
import { getRecommendedCoverage } from "./coverage-calculator"
import { CoverageArea } from "../types"

/**
 * Product-Specific Calculator Modules
 * Each product has its own calculation logic based on real-world constraints
 */

export interface ProductCalculation {
  product: string
  quantity: number
  reasoning: string[]
  capability: string
}

/**
 * Kallon Tower Calculator
 * Uses overlap algorithm for continuous coverage
 */
export function calculateKallonQuantity(
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel,
  facilityBaseQuantity: number
): ProductCalculation {
  const coverage = getRecommendedCoverage(coverageArea, threatLevel)
  const threatProfile = analyzeThreat(threatLevel, "power-plant") // Facility type doesn't affect Kallon calc
  
  // Calculate based on coverage overlap
  const kallonCalc = calculateKallonTowers(coverage, 0.2) // 20% overlap
  
  // Apply threat multiplier
  let quantity = Math.ceil(kallonCalc.quantity * threatProfile.multiplier)
  
  // Ensure minimum from facility requirements
  quantity = Math.max(quantity, facilityBaseQuantity)
  
  // Add redundancy if required
  if (threatProfile.requiresRedundancy) {
    const redundancy = getRedundancyRequirement("Kallon", true, quantity)
    quantity += redundancy
  }
  
  const reasoning = [
    ...kallonCalc.reasoning,
    `Threat multiplier applied: ${threatProfile.multiplier.toFixed(2)}x`,
    threatProfile.requiresRedundancy ? "Redundancy units added for critical coverage" : ""
  ].filter(Boolean)

  return {
    product: "Kallon",
    quantity,
    reasoning,
    capability: PRODUCT_SPECS.Kallon.capabilities[0]
  }
}

/**
 * Iroko UAV Calculator
 * Accounts for flight time, rotation needs, and coverage patterns
 */
export function calculateIrokoQuantity(
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel,
  facilityBaseQuantity: number
): ProductCalculation {
  const coverage = getRecommendedCoverage(coverageArea, threatLevel)
  const threatProfile = analyzeThreat(threatLevel, "power-plant")
  
  // Calculate based on UAV coverage
  const uavCalc = calculateUAVCoverage("Iroko", coverage, 0.15)
  
  // Start with coverage-based quantity
  let quantity = Math.ceil(uavCalc.quantity * threatProfile.multiplier)
  
  // Ensure minimum from facility requirements
  quantity = Math.max(quantity, facilityBaseQuantity)
  
  // Apply rotation multiplier for 24/7 operations
  if (threatProfile.requires24_7) {
    const rotationMult = getRotationMultiplier("Iroko", true)
    quantity = Math.ceil(quantity * rotationMult)
  }
  
  // Add redundancy if required
  if (threatProfile.requiresRedundancy) {
    const redundancy = getRedundancyRequirement("Iroko", true, quantity)
    quantity += redundancy
  }
  
  const reasoning = [
    ...uavCalc.reasoning,
    `Threat multiplier: ${threatProfile.multiplier.toFixed(2)}x`,
    threatProfile.requires24_7 
      ? `24/7 operation requires rotation: ${getRotationMultiplier("Iroko", true)}x multiplier`
      : "",
    threatProfile.requiresRedundancy ? "Redundancy units added" : ""
  ].filter(Boolean)

  return {
    product: "Iroko",
    quantity,
    reasoning,
    capability: PRODUCT_SPECS.Iroko.capabilities[0]
  }
}

/**
 * Archer VTOL Calculator
 * Optimized for rapid response scenarios
 */
export function calculateArcherQuantity(
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel,
  facilityBaseQuantity: number
): ProductCalculation {
  const coverage = getRecommendedCoverage(coverageArea, threatLevel)
  const threatProfile = analyzeThreat(threatLevel, "power-plant")
  
  // For rapid response, calculate based on response time requirements
  const isRapidResponse = threatLevel === "rapid-response"
  
  let quantity: number
  if (isRapidResponse) {
    // Rapid response needs multiple units for redundancy
    const uavCalc = calculateUAVCoverage("Archer", coverage, 0.15)
    quantity = Math.max(Math.ceil(uavCalc.quantity * threatProfile.multiplier), 2) // Minimum 2 for redundancy
  } else {
    // Standard calculation
    const uavCalc = calculateUAVCoverage("Archer", coverage, 0.15)
    quantity = Math.ceil(uavCalc.quantity * threatProfile.multiplier)
  }
  
  // Ensure minimum from facility requirements
  quantity = Math.max(quantity, facilityBaseQuantity)
  
  // Always add redundancy for rapid response
  if (threatProfile.requiresRedundancy || isRapidResponse) {
    const redundancy = getRedundancyRequirement("Archer", true, quantity)
    quantity += redundancy
  }
  
  const reasoning = [
    `Archer VTOL: ${PRODUCT_SPECS.Archer.operationalRange}km operational range`,
    isRapidResponse ? "Rapid response requires minimum 2 units for redundancy" : "",
    `Threat multiplier: ${threatProfile.multiplier.toFixed(2)}x`,
    threatProfile.requiresRedundancy ? "Redundancy units added for critical operations" : ""
  ].filter(Boolean)

  return {
    product: "Archer",
    quantity,
    reasoning,
    capability: PRODUCT_SPECS.Archer.capabilities[0]
  }
}

/**
 * Duma UGV Calculator
 * Optimized for ground patrol and perimeter coverage
 */
export function calculateDumaQuantity(
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel,
  facilityBaseQuantity: number
): ProductCalculation {
  const coverage = getRecommendedCoverage(coverageArea, threatLevel)
  const threatProfile = analyzeThreat(threatLevel, "power-plant")
  
  // For large areas, calculate based on perimeter
  const isLargeArea = coverageArea === "50km-plus" || coverageArea === "15-50km"
  
  let quantity: number
  if (isLargeArea) {
    // Large areas need ground patrol coverage
    const groundCalc = calculateGroundVehicleCoverage(coverage)
    quantity = Math.ceil(groundCalc.quantity * threatProfile.multiplier * 1.3) // 30% extra for large areas
  } else {
    // Smaller areas use base quantity with multiplier
    quantity = Math.ceil(facilityBaseQuantity * threatProfile.multiplier)
  }
  
  // Ensure minimum from facility requirements
  quantity = Math.max(quantity, facilityBaseQuantity)
  
  // Add redundancy if required
  if (threatProfile.requiresRedundancy) {
    const redundancy = getRedundancyRequirement("Duma", true, quantity)
    quantity += redundancy
  }
  
  const reasoning = [
    `Duma UGV: ${PRODUCT_SPECS.Duma.detectionRange}km patrol range`,
    isLargeArea ? "Large area requires additional ground units" : "",
    `Threat multiplier: ${threatProfile.multiplier.toFixed(2)}x`,
    threatProfile.requiresRedundancy ? "Redundancy units added" : ""
  ].filter(Boolean)

  return {
    product: "Duma",
    quantity,
    reasoning,
    capability: PRODUCT_SPECS.Duma.capabilities[0]
  }
}

/**
 * Generic product calculator (fallback)
 */
export function calculateGenericProductQuantity(
  productName: string,
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel,
  facilityBaseQuantity: number
): ProductCalculation {
  const coverage = getRecommendedCoverage(coverageArea, threatLevel)
  const threatProfile = analyzeThreat(threatLevel, "power-plant")
  const spec = PRODUCT_SPECS[productName as keyof typeof PRODUCT_SPECS]
  
  if (!spec) {
    return {
      product: productName,
      quantity: facilityBaseQuantity,
      reasoning: ["Product specification not found, using facility base quantity"],
      capability: "Standard deployment"
    }
  }
  
  // Generic calculation based on operational range
  let quantity = facilityBaseQuantity
  
  if (spec.operationalRange > 0) {
    const neededForCoverage = Math.ceil(coverage / spec.operationalRange)
    quantity = Math.max(quantity, neededForCoverage)
  }
  
  // Apply threat multiplier
  quantity = Math.ceil(quantity * threatProfile.multiplier)
  
  const reasoning = [
    `${spec.name}: ${spec.operationalRange}km operational range`,
    `Coverage requirement: ${coverage}km`,
    `Threat multiplier: ${threatProfile.multiplier.toFixed(2)}x`,
    `Calculated quantity: ${quantity} units`
  ]

  return {
    product: productName,
    quantity,
    reasoning,
    capability: spec.capabilities[0] || `${spec.name} deployment`
  }
}

