// Facility types from product specifications
export type FacilityType = 
  | "power-plant"
  | "substation"
  | "critical-facility"
  | "border-security"
  | "industrial-complex"
  | "oil-gas"
  | "mining"
  | "telecommunications"

// Threat levels
export type ThreatLevel = 
  | "intrusion-detection"
  | "surveillance-monitoring"
  | "rapid-response"
  | "perimeter-security"
  | "multi-threat"

// Coverage areas
export type CoverageArea = 
  | "0-5km"
  | "5-15km"
  | "15-50km"
  | "50km-plus"

// Product recommendation
export interface ProductRecommendation {
  products: {
    name: string
    quantity: number
    capability: string
  }[]
  description: string
  responseTimes: {
    product: string
    time: string
  }[]
  // Enhanced fields
  score?: RecommendationScore
  explanation?: RecommendationExplanation
  validation?: ValidationResult
}

// Recommendation scoring
export interface RecommendationScore {
  coverageScore: number      // 0-100: How well coverage is met
  threatScore: number        // 0-100: How well threat is addressed
  costScore: number          // 0-100: Cost efficiency
  redundancyScore: number    // 0-100: Redundancy level
  overallScore: number        // Weighted average
  confidence: 'high' | 'medium' | 'low'
}

// Recommendation explanation
export interface RecommendationExplanation {
  products: {
    name: string
    quantity: number
    reasoning: string[]  // Why this product, why this quantity
  }[]
  totalCoverage: number
  coverageGaps: string[]
  costEstimate?: number
  confidence: 'high' | 'medium' | 'low'
}

// Validation result
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface ConfiguratorState {
  facilityType: FacilityType | null
  threatLevel: ThreatLevel | null
  coverageArea: CoverageArea | null
  currentQuestion: number
}

