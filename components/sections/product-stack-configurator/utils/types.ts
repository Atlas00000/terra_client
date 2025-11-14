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
}

export interface ConfiguratorState {
  facilityType: FacilityType | null
  threatLevel: ThreatLevel | null
  coverageArea: CoverageArea | null
  currentQuestion: number
}

