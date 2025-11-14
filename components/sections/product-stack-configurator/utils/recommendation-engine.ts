import { FacilityType, ThreatLevel, CoverageArea, ProductRecommendation } from "./types"
import { PRODUCT_SPECS, FACILITY_REQUIREMENTS } from "./product-specs"

// Calculate product quantities based on coverage area
function calculateQuantities(
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): { product: string; quantity: number; capability: string }[] {
  const facility = FACILITY_REQUIREMENTS[facilityType]
  if (!facility) return []

  // Parse coverage area to number
  const coverageMap: Record<CoverageArea, { min: number; max: number }> = {
    "0-5km": { min: 0, max: 5 },
    "5-15km": { min: 5, max: 15 },
    "15-50km": { min: 15, max: 50 },
    "50km-plus": { min: 50, max: 200 }
  }

  const coverage = coverageMap[coverageArea]
  const avgCoverage = (coverage.min + coverage.max) / 2

  // Threat level multipliers
  const threatMultipliers: Record<ThreatLevel, number> = {
    "intrusion-detection": 1.0,
    "surveillance-monitoring": 1.2,
    "rapid-response": 1.1,
    "perimeter-security": 1.3,
    "multi-threat": 1.5
  }

  const multiplier = threatMultipliers[threatLevel] || 1.0

  const products: { product: string; quantity: number; capability: string }[] = []

  // Always include ArtemisOS
  products.push({
    product: "ArtemisOS",
    quantity: 1,
    capability: PRODUCT_SPECS.ArtemisOS.capabilities[0]
  })

  // Calculate quantities for each recommended product
  for (const rec of facility.recommendedProducts) {
    if (rec.product === "ArtemisOS") continue

    const spec = PRODUCT_SPECS[rec.product as keyof typeof PRODUCT_SPECS]
    if (!spec) continue

    // Base quantity calculation
    let quantity = rec.minQuantity

    // Adjust based on coverage area
    if (spec.operationalRange > 0) {
      const neededForCoverage = Math.ceil(avgCoverage / spec.operationalRange)
      quantity = Math.max(quantity, neededForCoverage)
    }

    // Adjust based on threat level
    quantity = Math.ceil(quantity * multiplier)

    // Cap at max quantity
    quantity = Math.min(quantity, rec.maxQuantity)

    // Special logic for specific products
    if (rec.product === "Kallon" && spec.detectionRange > 0) {
      // Kallon: 3km detection, 15km coverage radius
      const towersNeeded = Math.ceil(avgCoverage / 15)
      quantity = Math.max(quantity, towersNeeded)
    }

    if (rec.product === "Iroko" && threatLevel === "surveillance-monitoring") {
      // Iroko for 24/7 surveillance needs more units for rotation
      quantity = Math.ceil(quantity * 1.5)
    }

    if (rec.product === "Archer" && threatLevel === "rapid-response") {
      // Archer for rapid response - ensure multiple units for redundancy
      quantity = Math.max(quantity, 2)
    }

    if (rec.product === "Duma" && coverageArea === "50km-plus") {
      // Duma for large areas - more ground units needed
      quantity = Math.ceil(quantity * 1.3)
    }

    // Only include if quantity > 0 and priority matches threat
    const isThreatMatch = facility.threatPriorities.includes(threatLevel) || 
                         rec.priority === "essential" ||
                         (rec.priority === "recommended" && multiplier >= 1.2)

    if (quantity > 0 && isThreatMatch) {
      products.push({
        product: rec.product,
        quantity,
        capability: spec.capabilities[0] || `${spec.name} deployment`
      })
    }
  }

  return products
}

// Generate description based on configuration
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

// Generate response times based on products
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

export function generateRecommendation(
  facilityType: FacilityType,
  threatLevel: ThreatLevel,
  coverageArea: CoverageArea
): ProductRecommendation {
  // Calculate product quantities
  const products = calculateQuantities(facilityType, threatLevel, coverageArea)

  // Generate description
  const description = generateDescription(facilityType, threatLevel, coverageArea, products)

  // Generate response times
  const responseTimes = generateResponseTimes(products)

  return {
    products: products.map(p => ({
      name: p.product,
      quantity: p.quantity,
      capability: p.capability
    })),
    description,
    responseTimes
  }
}
