import { ProductRecommendation, FacilityType, ThreatLevel, CoverageArea, ValidationResult } from "../types"
import { FACILITY_REQUIREMENTS } from "../product-specs"
import { PRODUCT_SPECS } from "../product-specs"
import { getRecommendedCoverage } from "../calculators/coverage-calculator"
import { validateCoverageOverlap } from "../calculators/coverage-overlap"

/**
 * Recommendation Validator Module
 * Validates recommendations against requirements and constraints
 */

/**
 * Validates a recommendation against inputs and requirements
 */
export function validateRecommendation(
  recommendation: ProductRecommendation,
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  
  const facility = FACILITY_REQUIREMENTS[facilityType]
  if (!facility) {
    errors.push(`Invalid facility type: ${facilityType}`)
    return { isValid: false, errors, warnings }
  }
  
  // Validate ArtemisOS is included
  const hasArtemisOS = recommendation.products.some(p => p.name === "ArtemisOS")
  if (!hasArtemisOS) {
    errors.push("ArtemisOS is required but not included in recommendation")
  }
  
  // Validate essential products are included
  const essentialProducts = facility.recommendedProducts
    .filter(p => p.priority === "essential" && p.product !== "ArtemisOS")
    .map(p => p.product)
  
  for (const essential of essentialProducts) {
    const included = recommendation.products.some(p => p.name === essential)
    if (!included) {
      warnings.push(`Essential product ${essential} is not included`)
    }
  }
  
  // Validate minimum quantities
  for (const req of facility.recommendedProducts) {
    const product = recommendation.products.find(p => p.name === req.product)
    if (product) {
      if (product.quantity < req.minQuantity) {
        warnings.push(
          `${req.product}: Quantity ${product.quantity} is below minimum ${req.minQuantity}`
        )
      }
      if (product.quantity > req.maxQuantity && req.maxQuantity > 0) {
        warnings.push(
          `${req.product}: Quantity ${product.quantity} exceeds maximum ${req.maxQuantity}`
        )
      }
    }
  }
  
  // Validate coverage requirements
  const requiredCoverage = getRecommendedCoverage(coverageArea, threatLevel)
  const coverageValidation = validateCoverageRequirement(
    recommendation,
    requiredCoverage,
    facility.minCoverage
  )
  
  if (!coverageValidation.isValid) {
    errors.push(...coverageValidation.errors)
  }
  warnings.push(...coverageValidation.warnings)
  
  // Validate product compatibility
  const compatibilityIssues = validateProductCompatibility(recommendation.products)
  warnings.push(...compatibilityIssues)
  
  // Validate threat level alignment
  const threatAlignment = validateThreatAlignment(
    recommendation,
    threatLevel,
    facility.threatPriorities
  )
  if (!threatAlignment.isValid) {
    warnings.push(...threatAlignment.warnings)
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Validates coverage requirements are met
 */
function validateCoverageRequirement(
  recommendation: ProductRecommendation,
  requiredCoverage: number,
  facilityMinCoverage: number
): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []
  
  // Check if we have Kallon towers (primary coverage)
  const kallonProducts = recommendation.products.filter(p => p.name === "Kallon")
  const totalKallonCoverage = kallonProducts.reduce((sum, p) => {
    const spec = PRODUCT_SPECS.Kallon
    const effectiveRadius = spec.operationalRange * 0.8 // 20% overlap
    return sum + (p.quantity * effectiveRadius)
  }, 0)
  
  if (kallonProducts.length > 0) {
    if (totalKallonCoverage < requiredCoverage) {
      const gap = requiredCoverage - totalKallonCoverage
      warnings.push(
        `Coverage gap: ${gap.toFixed(1)}km. Kallon towers provide ${totalKallonCoverage.toFixed(1)}km, but ${requiredCoverage}km is required`
      )
    }
  }
  
  // Check facility minimum
  const totalCoverage = calculateTotalCoverage(recommendation)
  if (totalCoverage < facilityMinCoverage) {
    errors.push(
      `Total coverage ${totalCoverage.toFixed(1)}km is below facility minimum ${facilityMinCoverage}km`
    )
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Calculates total coverage from all products
 */
function calculateTotalCoverage(recommendation: ProductRecommendation): number {
  let totalCoverage = 0
  
  for (const product of recommendation.products) {
    if (product.name === "ArtemisOS") continue
    
    const spec = PRODUCT_SPECS[product.name as keyof typeof PRODUCT_SPECS]
    if (!spec) continue
    
    if (product.name === "Kallon") {
      // Kallon: 15km radius with 20% overlap = 12km effective
      const effectiveRadius = spec.operationalRange * 0.8
      totalCoverage += product.quantity * effectiveRadius
    } else if (spec.operationalRange > 0) {
      // UAVs and other products contribute to coverage
      const effectiveRange = spec.operationalRange * 0.85 // 15% overlap
      totalCoverage += product.quantity * effectiveRange
    }
  }
  
  return totalCoverage
}

/**
 * Validates product compatibility
 */
function validateProductCompatibility(
  products: { name: string; quantity: number }[]
): string[] {
  const warnings: string[] = []
  
  // Check if we have both Archer and Iroko (both are UAVs, might be redundant)
  const hasArcher = products.some(p => p.name === "Archer")
  const hasIroko = products.some(p => p.name === "Iroko")
  
  if (hasArcher && hasIroko) {
    // This is actually fine, they serve different purposes
    // But we can note it
    const archerQty = products.find(p => p.name === "Archer")?.quantity || 0
    const irokoQty = products.find(p => p.name === "Iroko")?.quantity || 0
    
    if (archerQty > 3 && irokoQty > 3) {
      warnings.push(
        "Consider consolidating UAV types if cost is a concern (both Archer and Iroko included)"
      )
    }
  }
  
  return warnings
}

/**
 * Validates threat level alignment
 */
function validateThreatAlignment(
  recommendation: ProductRecommendation,
  threatLevel: ThreatLevel,
  facilityThreatPriorities: string[]
): { isValid: boolean; warnings: string[] } {
  const warnings: string[] = []
  
  const isPriorityThreat = facilityThreatPriorities.includes(threatLevel)
  if (!isPriorityThreat) {
    warnings.push(
      `Threat level ${threatLevel} is not a priority for this facility type`
    )
  }
  
  // Check if products match threat requirements
  const threatProductMap: Record<ThreatLevel, string[]> = {
    "intrusion-detection": ["Kallon", "ArtemisOS"],
    "surveillance-monitoring": ["Iroko", "Kallon"],
    "rapid-response": ["Archer", "Iroko"],
    "perimeter-security": ["Kallon", "Duma"],
    "multi-threat": ["Iroko", "Kallon", "Archer", "Duma"]
  }
  
  const requiredProducts = threatProductMap[threatLevel] || []
  const includedProducts = recommendation.products.map(p => p.name)
  
  for (const required of requiredProducts) {
    if (!includedProducts.includes(required) && required !== "ArtemisOS") {
      warnings.push(
        `Product ${required} is recommended for ${threatLevel} but not included`
      )
    }
  }
  
  return {
    isValid: warnings.length === 0,
    warnings
  }
}

