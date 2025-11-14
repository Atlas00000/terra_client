import { ProductRecommendation, RecommendationExplanation, FacilityType, ThreatLevel, CoverageArea } from "../types"
import { PRODUCT_SPECS } from "../product-specs"
import { getRecommendedCoverage } from "../calculators/coverage-calculator"
import { analyzeThreat } from "../calculators/threat-analyzer"
import { calculateActualCoverage } from "../scoring/recommendation-scorer"

/**
 * Recommendation Explainer Module
 * Generates human-readable explanations for recommendations
 */

/**
 * Generates explanation for a recommendation
 */
export function explainRecommendation(
  recommendation: ProductRecommendation,
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): RecommendationExplanation {
  const requiredCoverage = getRecommendedCoverage(coverageArea, threatLevel)
  const actualCoverage = calculateActualCoverage(recommendation)
  const threatProfile = analyzeThreat(threatLevel, facilityType)
  
  // Generate reasoning for each product
  const products = recommendation.products.map(product => ({
    name: product.name,
    quantity: product.quantity,
    reasoning: generateProductReasoning(
      product.name,
      product.quantity,
      facilityType,
      threatLevel,
      coverageArea
    )
  }))
  
  // Identify coverage gaps
  const coverageGaps = identifyCoverageGaps(actualCoverage, requiredCoverage)
  
  // Determine confidence
  const confidence = determineExplanationConfidence(
    actualCoverage,
    requiredCoverage,
    recommendation,
    threatProfile
  )
  
  return {
    products,
    totalCoverage: actualCoverage,
    coverageGaps,
    confidence
  }
}

/**
 * Generates reasoning for a specific product
 */
function generateProductReasoning(
  productName: string,
  quantity: number,
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): string[] {
  const reasoning: string[] = []
  const spec = PRODUCT_SPECS[productName as keyof typeof PRODUCT_SPECS]
  
  if (!spec) {
    return [`${productName}: Standard deployment`]
  }
  
  // Base reasoning
  reasoning.push(`${spec.name}: ${spec.category}`)
  
  // Coverage-based reasoning
  if (spec.operationalRange > 0) {
    const coverage = getRecommendedCoverage(coverageArea, threatLevel)
    if (productName === "Kallon") {
      const effectiveRadius = spec.operationalRange * 0.8 // 20% overlap
      const coveragePerTower = effectiveRadius
      reasoning.push(
        `Each tower provides ${coveragePerTower.toFixed(1)}km effective coverage (15km radius with 20% overlap)`
      )
      reasoning.push(
        `${coverage}km required coverage ÷ ${coveragePerTower.toFixed(1)}km per tower = ${quantity} towers`
      )
    } else {
      reasoning.push(
        `${spec.operationalRange}km operational range for ${coverage}km coverage area`
      )
    }
  }
  
  // Threat-based reasoning
  const threatProfile = analyzeThreat(threatLevel, facilityType)
  if (threatProfile.priorityProducts.includes(productName)) {
    reasoning.push(`Critical for ${threatLevel} threat scenario`)
  }
  
  // Quantity-specific reasoning
  if (productName === "Iroko" && threatLevel === "surveillance-monitoring") {
    reasoning.push(
      `${quantity} units required for 24/7 continuous surveillance with rotation (50min flight time)`
    )
  }
  
  if (productName === "Archer" && threatLevel === "rapid-response") {
    reasoning.push(
      `${quantity} units ensure rapid response capability with redundancy (2-5min response time)`
    )
  }
  
  if (productName === "Kallon") {
    reasoning.push(
      `${quantity} towers provide ${(quantity * spec.operationalRange * 0.8).toFixed(1)}km total coverage with overlap`
    )
  }
  
  if (productName === "Duma" && coverageArea === "50km-plus") {
    reasoning.push(
      `Large area coverage requires ${quantity} ground units for perimeter patrol`
    )
  }
  
  // Redundancy reasoning
  if (quantity >= 2 && threatProfile.requiresRedundancy) {
    reasoning.push("Redundancy included for critical operations")
  }
  
  return reasoning
}

/**
 * Identifies coverage gaps
 */
function identifyCoverageGaps(
  actualCoverage: number,
  requiredCoverage: number
): string[] {
  const gaps: string[] = []
  
  if (actualCoverage < requiredCoverage) {
    const gap = requiredCoverage - actualCoverage
    gaps.push(
      `Coverage gap: ${gap.toFixed(1)}km. Current: ${actualCoverage.toFixed(1)}km, Required: ${requiredCoverage}km`
    )
  } else if (actualCoverage >= requiredCoverage * 1.2) {
    gaps.push(
      `Coverage exceeds requirement by ${(actualCoverage - requiredCoverage).toFixed(1)}km (may be over-provisioned)`
    )
  }
  
  return gaps
}

/**
 * Determines confidence level for explanation
 */
function determineExplanationConfidence(
  actualCoverage: number,
  requiredCoverage: number,
  recommendation: ProductRecommendation,
  threatProfile: ReturnType<typeof analyzeThreat>
): 'high' | 'medium' | 'low' {
  // High confidence: coverage met, all requirements satisfied
  if (actualCoverage >= requiredCoverage && 
      recommendation.products.length >= 3 &&
      threatProfile.requiresRedundancy === recommendation.products.some(p => p.quantity >= 2)) {
    return 'high'
  }
  
  // Medium confidence: coverage close, most requirements met
  if (actualCoverage >= requiredCoverage * 0.8 && 
      recommendation.products.length >= 2) {
    return 'medium'
  }
  
  // Low confidence: gaps in coverage or requirements
  return 'low'
}

