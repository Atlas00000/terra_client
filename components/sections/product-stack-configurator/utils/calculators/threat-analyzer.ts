import { ThreatLevel, FacilityType } from "../types"
import { FACILITY_REQUIREMENTS } from "../product-specs"

/**
 * Threat Analyzer Module
 * Analyzes threat levels and provides dynamic multipliers and requirements
 * Replaces hardcoded multipliers with context-aware analysis
 */

export interface ThreatProfile {
  level: ThreatLevel
  intensity: number          // 0-1 scale
  multiplier: number         // Quantity multiplier
  requiresRedundancy: boolean
  requires24_7: boolean
  priorityProducts: string[] // Products that are critical for this threat
  reasoning: string[]
}

const THREAT_INTENSITY: Record<ThreatLevel, number> = {
  "intrusion-detection": 0.6,
  "surveillance-monitoring": 0.8,
  "rapid-response": 0.7,
  "perimeter-security": 0.9,
  "multi-threat": 1.0
}

const BASE_MULTIPLIERS: Record<ThreatLevel, number> = {
  "intrusion-detection": 1.0,
  "surveillance-monitoring": 1.2,
  "rapid-response": 1.1,
  "perimeter-security": 1.3,
  "multi-threat": 1.5
}

/**
 * Analyzes threat level and generates threat profile
 */
export function analyzeThreat(
  threatLevel: ThreatLevel,
  facilityType: FacilityType
): ThreatProfile {
  const facility = FACILITY_REQUIREMENTS[facilityType]
  const baseMultiplier = BASE_MULTIPLIERS[threatLevel]
  const intensity = THREAT_INTENSITY[threatLevel]
  
  // Check if threat is a priority for this facility
  const isPriorityThreat = facility?.threatPriorities.includes(threatLevel) || false
  const priorityRank = facility?.threatPriorities.indexOf(threatLevel) ?? -1
  
  // Adjust multiplier based on priority
  const priorityMultiplier = isPriorityThreat && priorityRank === 0 ? 1.2 : 1.0
  const multiplier = baseMultiplier * priorityMultiplier
  
  // Determine requirements
  const requiresRedundancy = threatLevel === "multi-threat" || 
                            threatLevel === "perimeter-security" ||
                            threatLevel === "rapid-response"
  
  const requires24_7 = threatLevel === "surveillance-monitoring" ||
                      threatLevel === "multi-threat" ||
                      threatLevel === "perimeter-security"
  
  // Determine priority products based on threat
  const priorityProducts = getPriorityProductsForThreat(threatLevel)
  
  const reasoning = [
    `Threat level: ${threatLevel} (intensity: ${(intensity * 100).toFixed(0)}%)`,
    isPriorityThreat 
      ? `High priority for ${facilityType} (rank ${priorityRank + 1})`
      : `Standard priority for ${facilityType}`,
    requiresRedundancy ? "Requires redundant systems" : "Single system acceptable",
    requires24_7 ? "Requires 24/7 operation" : "On-demand operation acceptable"
  ]

  return {
    level: threatLevel,
    intensity,
    multiplier,
    requiresRedundancy,
    requires24_7,
    priorityProducts,
    reasoning
  }
}

/**
 * Gets priority products for a specific threat level
 */
function getPriorityProductsForThreat(threatLevel: ThreatLevel): string[] {
  const productMap: Record<ThreatLevel, string[]> = {
    "intrusion-detection": ["Kallon", "ArtemisOS"], // Instant detection
    "surveillance-monitoring": ["Iroko", "Kallon", "ArtemisOS"], // Continuous monitoring
    "rapid-response": ["Archer", "Iroko", "ArtemisOS"], // Fast deployment
    "perimeter-security": ["Kallon", "Duma", "ArtemisOS"], // Perimeter coverage
    "multi-threat": ["Iroko", "Kallon", "Archer", "Duma", "ArtemisOS"] // All products
  }
  
  return productMap[threatLevel] || []
}

/**
 * Gets rotation multiplier for 24/7 operations
 * Accounts for battery life and maintenance windows
 */
export function getRotationMultiplier(
  productName: string,
  requires24_7: boolean
): number {
  if (!requires24_7) return 1.0
  
  // Products that need rotation for 24/7 operation
  const rotationMultipliers: Record<string, number> = {
    "Iroko": 1.5,    // 50min flight time, needs rotation
    "Archer": 1.8,   // 34min flight time, needs more rotation
    "Duma": 1.2,     // Extended operations, minimal rotation
    "Kallon": 1.0    // 24/7 solar-powered, no rotation needed
  }
  
  return rotationMultipliers[productName] || 1.0
}

/**
 * Gets redundancy requirement for a product
 */
export function getRedundancyRequirement(
  productName: string,
  requiresRedundancy: boolean,
  baseQuantity: number
): number {
  if (!requiresRedundancy) return 0
  
  // Minimum redundancy: at least 1 backup unit for critical systems
  const redundancyMultipliers: Record<string, number> = {
    "Archer": 0.5,   // 50% redundancy for rapid response
    "Iroko": 0.3,    // 30% redundancy for surveillance
    "Kallon": 0.2,   // 20% redundancy for towers
    "Duma": 0.25     // 25% redundancy for ground units
  }
  
  const multiplier = redundancyMultipliers[productName] || 0.2
  return Math.ceil(baseQuantity * multiplier)
}
