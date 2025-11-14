import { FacilityType, ThreatLevel, CoverageArea, ProductRecommendation } from "./types"
import { PRODUCT_SPECS, FACILITY_REQUIREMENTS } from "./product-specs"
import { 
  calculateKallonQuantity,
  calculateIrokoQuantity,
  calculateArcherQuantity,
  calculateDumaQuantity,
  calculateGenericProductQuantity
} from "./calculators/product-calculators"
import { analyzeThreat } from "./calculators/threat-analyzer"
import { validateRecommendation } from "./validation/recommendation-validator"
import { scoreRecommendation } from "./scoring/recommendation-scorer"
import { explainRecommendation } from "./explainability/recommendation-explainer"

/**
 * Main Recommendation Engine
 * Orchestrates modular components to generate product recommendations
 * Following industry best practices with validation, scoring, and explainability
 */

/**
 * Calculate product quantities using modular product-specific calculators
 */
function calculateQuantities(
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): { product: string; quantity: number; capability: string }[] {
  const facility = FACILITY_REQUIREMENTS[facilityType]
  if (!facility) return []

  const products: { product: string; quantity: number; capability: string }[] = []

  // Always include ArtemisOS
  products.push({
    product: "ArtemisOS",
    quantity: 1,
    capability: PRODUCT_SPECS.ArtemisOS.capabilities[0]
  })

  // Calculate quantities for each recommended product using product-specific calculators
  for (const rec of facility.recommendedProducts) {
    if (rec.product === "ArtemisOS") continue

    const spec = PRODUCT_SPECS[rec.product as keyof typeof PRODUCT_SPECS]
    if (!spec) continue

    // Check if product should be included based on threat match
    const threatProfile = analyzeThreat(threatLevel, facilityType)
    const isThreatMatch = facility.threatPriorities.includes(threatLevel) || 
                         rec.priority === "essential" ||
                         (rec.priority === "recommended" && threatProfile.multiplier >= 1.2)

    if (!isThreatMatch) continue

    // Use product-specific calculator
    let productCalc
    const baseQuantity = rec.minQuantity

    switch (rec.product) {
      case "Kallon":
        productCalc = calculateKallonQuantity(coverageArea, threatLevel, baseQuantity)
        break
      case "Iroko":
        productCalc = calculateIrokoQuantity(coverageArea, threatLevel, baseQuantity)
        break
      case "Archer":
        productCalc = calculateArcherQuantity(coverageArea, threatLevel, baseQuantity)
        break
      case "Duma":
        productCalc = calculateDumaQuantity(coverageArea, threatLevel, baseQuantity)
        break
      default:
        productCalc = calculateGenericProductQuantity(
          rec.product,
          coverageArea,
          threatLevel,
          baseQuantity
        )
    }

    // Apply max quantity constraint
    if (rec.maxQuantity > 0) {
      productCalc.quantity = Math.min(productCalc.quantity, rec.maxQuantity)
    }

    // Only include if quantity > 0
    if (productCalc.quantity > 0) {
      products.push({
        product: productCalc.product,
        quantity: productCalc.quantity,
        capability: productCalc.capability
      })
    }
  }

  return products
}

/**
 * Generate description based on configuration
 */
function generateDescription(
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea,
  products: { product: string; quantity: number }[]
): string {
  const facilityNames: Record<FacilityType, string> = {
    "power-plant": "power plant infrastructure",
    "substation": "substation network",
    "critical-facility": "critical infrastructure facility",
    "border-security": "border and perimeter defense",
    "industrial-complex": "industrial complex",
    "oil-gas": "oil & gas facility",
    "mining": "mining operation",
    "telecommunications": "telecommunications infrastructure"
  }

  const threatNames: Record<ThreatLevel, string> = {
    "intrusion-detection": "autonomous intrusion detection and response",
    "surveillance-monitoring": "24/7 continuous surveillance and monitoring",
    "rapid-response": "rapid response operations",
    "perimeter-security": "comprehensive perimeter security",
    "multi-threat": "multi-threat environment protection"
  }

  const facility = facilityNames[facilityType]
  const threat = threatNames[threatLevel]

  const productCount = products.length - 1 // Exclude ArtemisOS
  const totalUnits = products.reduce((sum, p) => sum + p.quantity, 0) - 1

  return `${threat} for ${facility} with ${productCount} product types and ${totalUnits} total units, powered by ArtemisOS AI intelligence platform`
}

/**
 * Generate response times based on products
 */
function generateResponseTimes(
  products: { product: string; quantity: number }[]
): { product: string; time: string }[] {
  const responseTimes: { product: string; time: string }[] = []

  for (const p of products) {
    if (p.product === "ArtemisOS") {
      responseTimes.push({ product: "ArtemisOS", time: "<1 second" })
    } else {
      const spec = PRODUCT_SPECS[p.product as keyof typeof PRODUCT_SPECS]
      if (spec) {
        responseTimes.push({ product: spec.name, time: spec.responseTime })
      }
    }
  }

  return responseTimes
}

/**
 * Generate product recommendation with validation, scoring, and explainability
 */
export function generateRecommendation(
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): ProductRecommendation {
  // Calculate product quantities using modular components
  const products = calculateQuantities(facilityType, threatLevel, coverageArea)

  // Generate description
  const description = generateDescription(facilityType, threatLevel, coverageArea, products)

  // Generate response times
  const responseTimes = generateResponseTimes(products)

  // Create base recommendation
  const recommendation: ProductRecommendation = {
    products: products.map(p => ({
      name: p.product,
      quantity: p.quantity,
      capability: p.capability
    })),
    description,
    responseTimes
  }

  // Validate recommendation
  const validation = validateRecommendation(recommendation, facilityType, threatLevel, coverageArea)
  if (!validation.isValid) {
    console.warn("Recommendation validation issues:", validation.errors)
  }
  if (validation.warnings.length > 0) {
    console.warn("Recommendation validation warnings:", validation.warnings)
  }
  recommendation.validation = validation

  // Score recommendation
  const score = scoreRecommendation(recommendation, facilityType, threatLevel, coverageArea)
  recommendation.score = score

  // Generate explanation
  const explanation = explainRecommendation(recommendation, facilityType, threatLevel, coverageArea)
  recommendation.explanation = explanation

  return recommendation
}
