import { ProductRecommendation, RecommendationScore, FacilityType, ThreatLevel, CoverageArea } from "../types"
import { PRODUCT_SPECS } from "../product-specs"
import { getRecommendedCoverage } from "../calculators/coverage-calculator"
import { analyzeThreat } from "../calculators/threat-analyzer"
import { validateCoverageOverlap } from "../calculators/coverage-overlap"

/**
 * Recommendation Scorer Module
 * Calculates multi-factor scores for recommendations
 */

const SCORE_WEIGHTS = {
  coverage: 0.3,
  threat: 0.25,
  redundancy: 0.2,
  cost: 0.15,
  compatibility: 0.1
}

/**
 * Calculates comprehensive score for a recommendation
 */
export function scoreRecommendation(
  recommendation: ProductRecommendation,
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): RecommendationScore {
  const coverageScore = calculateCoverageScore(recommendation, coverageArea, threatLevel)
  const threatScore = calculateThreatScore(recommendation, threatLevel, facilityType)
  const redundancyScore = calculateRedundancyScore(recommendation, threatLevel)
  const costScore = calculateCostScore(recommendation)
  
  // Calculate weighted overall score
  const overallScore = 
    coverageScore * SCORE_WEIGHTS.coverage +
    threatScore * SCORE_WEIGHTS.threat +
    redundancyScore * SCORE_WEIGHTS.redundancy +
    costScore * SCORE_WEIGHTS.cost
  
  // Determine confidence level
  const confidence = determineConfidence(
    coverageScore,
    threatScore,
    redundancyScore,
    costScore
  )
  
  return {
    coverageScore,
    threatScore,
    costScore,
    redundancyScore,
    overallScore: Math.round(overallScore),
    confidence
  }
}

/**
 * Calculates coverage score (0-100)
 */
function calculateCoverageScore(
  recommendation: ProductRecommendation,
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel
): number {
  const requiredCoverage = getRecommendedCoverage(coverageArea, threatLevel)
  const actualCoverage = calculateActualCoverage(recommendation)
  
  if (actualCoverage >= requiredCoverage) {
    // Full score if coverage is met or exceeded
    return 100
  }
  
  // Score based on percentage of coverage met
  const coverageRatio = actualCoverage / requiredCoverage
  return Math.min(100, Math.round(coverageRatio * 100))
}

/**
 * Calculates actual coverage from products
 * Exported for use in other modules (e.g., explainability)
 */
export function calculateActualCoverage(recommendation: ProductRecommendation): number {
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
      // UAVs: operational range with 15% overlap
      const effectiveRange = spec.operationalRange * 0.85
      totalCoverage += product.quantity * effectiveRange
    }
  }
  
  return totalCoverage
}

/**
 * Calculates threat score (0-100)
 */
function calculateThreatScore(
  recommendation: ProductRecommendation,
  threatLevel: ThreatLevel,
  facilityType: FacilityType
): number {
  const threatProfile = analyzeThreat(threatLevel, facilityType)
  const priorityProducts = threatProfile.priorityProducts
  
  // Check if priority products are included
  const includedProducts = recommendation.products.map(p => p.name)
  const includedPriority = priorityProducts.filter(p => includedProducts.includes(p))
  
  // Score based on percentage of priority products included
  const priorityRatio = priorityProducts.length > 0 
    ? includedPriority.length / priorityProducts.length 
    : 1
  
  // Base score from priority products
  let score = priorityRatio * 70
  
  // Bonus for having adequate quantities
  const hasAdequateQuantities = recommendation.products.every(p => {
    if (priorityProducts.includes(p.name)) {
      return p.quantity >= 2 // At least 2 units for redundancy
    }
    return true
  })
  
  if (hasAdequateQuantities) {
    score += 20
  }
  
  // Bonus for threat-specific products
  if (threatLevel === "rapid-response" && includedProducts.includes("Archer")) {
    score += 10
  }
  
  if (threatLevel === "surveillance-monitoring" && includedProducts.includes("Iroko")) {
    score += 10
  }
  
  return Math.min(100, Math.round(score))
}

/**
 * Calculates redundancy score (0-100)
 */
function calculateRedundancyScore(
  recommendation: ProductRecommendation,
  threatLevel: ThreatLevel
): number {
  const threatProfile = analyzeThreat(threatLevel, "power-plant") // Facility doesn't affect redundancy calc
  
  if (!threatProfile.requiresRedundancy) {
    // If redundancy not required, full score
    return 100
  }
  
  // Check for redundancy in critical products
  const criticalProducts = ["Archer", "Iroko", "Kallon"]
  let redundancyCount = 0
  
  for (const product of recommendation.products) {
    if (criticalProducts.includes(product.name) && product.quantity >= 2) {
      redundancyCount++
    }
  }
  
  // Score based on percentage of critical products with redundancy
  const redundancyRatio = criticalProducts.length > 0 
    ? redundancyCount / criticalProducts.length 
    : 1
  
  return Math.round(redundancyRatio * 100)
}

/**
 * Calculates cost score (0-100)
 * Higher score = more cost efficient
 */
function calculateCostScore(recommendation: ProductRecommendation): number {
  // Simple heuristic: fewer products and lower quantities = better cost score
  const totalUnits = recommendation.products.reduce((sum, p) => sum + p.quantity, 0)
  const productCount = recommendation.products.length
  
  // Base score from unit count (fewer units = higher score)
  // Normalize: 0-50 units = 100-50 score
  let score = Math.max(50, 100 - (totalUnits * 1))
  
  // Penalty for too many product types (complexity = cost)
  if (productCount > 4) {
    score -= 10
  }
  
  // Bonus for efficient product selection
  const hasKallon = recommendation.products.some(p => p.name === "Kallon")
  if (hasKallon) {
    // Kallon is cost-efficient (replaces 12 personnel)
    score += 10
  }
  
  return Math.min(100, Math.max(0, Math.round(score)))
}

/**
 * Determines confidence level based on scores
 */
function determineConfidence(
  coverageScore: number,
  threatScore: number,
  redundancyScore: number,
  costScore: number
): 'high' | 'medium' | 'low' {
  const minScore = Math.min(coverageScore, threatScore, redundancyScore)
  
  if (minScore >= 80 && coverageScore >= 90) {
    return 'high'
  }
  
  if (minScore >= 60 && coverageScore >= 70) {
    return 'medium'
  }
  
  return 'low'
}

