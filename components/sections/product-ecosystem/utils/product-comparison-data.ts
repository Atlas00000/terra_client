/**
 * Product Comparison Data Module
 * Comprehensive comparison data for all products
 * Based on real product specifications
 */

export type CapabilityType = 
  | "Surveillance"
  | "Rapid Response"
  | "Ground Operations"
  | "Perimeter Security"
  | "AI Integration"
  | "Autonomous Operations"
  | "Multi-Sensor"
  | "Communication"

export type UseCaseType =
  | "Power Plant"
  | "Border Security"
  | "Infrastructure Inspection"
  | "Search & Rescue"
  | "Mining Operations"
  | "Oil & Gas"
  | "Critical Facilities"
  | "Substation Networks"

export type PriceRange = "Low" | "Medium" | "High" | "Enterprise"

export interface ProductComparison {
  productId: string
  productName: string
  category: string
  capabilities: CapabilityType[]
  useCases: UseCaseType[]
  priceRange: PriceRange
  specifications: {
    detectionRange: string
    operationalRange: string
    endurance: string
    responseTime: string
    payload?: string
    speed?: string
    coverage?: string
  }
  keyFeatures: string[]
  costEfficiency: string
}

export const PRODUCT_COMPARISONS: ProductComparison[] = [
  {
    productId: "artemisos",
    productName: "ArtemisOS",
    category: "AI Operating System",
    capabilities: [
      "AI Integration",
      "Autonomous Operations",
      "Communication"
    ],
    useCases: [
      "Power Plant",
      "Border Security",
      "Infrastructure Inspection",
      "Search & Rescue",
      "Mining Operations",
      "Oil & Gas",
      "Critical Facilities",
      "Substation Networks"
    ],
    priceRange: "Enterprise",
    specifications: {
      detectionRange: "N/A (Central Platform)",
      operationalRange: "Unlimited (Cloud-based)",
      endurance: "24/7",
      responseTime: "<1 second"
    },
    keyFeatures: [
      "AI-powered threat detection (99.5% accuracy)",
      "Autonomous mission planning",
      "Fleet management (1000+ systems)",
      "Real-time data analysis",
      "AES-256 encryption"
    ],
    costEfficiency: "40-60% operational cost reduction"
  },
  {
    productId: "iroko",
    productName: "Iroko UAV",
    category: "Quadcopter UAV",
    capabilities: [
      "Surveillance",
      "AI Integration",
      "Autonomous Operations",
      "Multi-Sensor"
    ],
    useCases: [
      "Power Plant",
      "Border Security",
      "Infrastructure Inspection",
      "Search & Rescue",
      "Mining Operations",
      "Oil & Gas"
    ],
    priceRange: "Medium",
    specifications: {
      detectionRange: "20km",
      operationalRange: "20km (extendable with LTE/5G)",
      endurance: "Up to 50 minutes",
      responseTime: "5-10 minutes",
      payload: "1.5kg"
    },
    keyFeatures: [
      "8-hour continuous surveillance capability",
      "Multi-spectral imaging",
      "Thermal detection",
      "Real-time streaming",
      "Rapid deployment (90 seconds)"
    ],
    costEfficiency: "20 units produced daily at Abuja facility"
  },
  {
    productId: "archer",
    productName: "Archer VTOL",
    category: "VTOL UAV",
    capabilities: [
      "Rapid Response",
      "Surveillance",
      "AI Integration",
      "Autonomous Operations"
    ],
    useCases: [
      "Border Security",
      "Infrastructure Inspection",
      "Search & Rescue",
      "Substation Networks",
      "Critical Facilities"
    ],
    priceRange: "Medium",
    specifications: {
      detectionRange: "15km (up to 50km with GCS Pro)",
      operationalRange: "15km (up to 50km with GCS Pro)",
      endurance: "Up to 34 minutes",
      responseTime: "2-5 minutes",
      payload: "4kg",
      speed: "120 km/h"
    },
    keyFeatures: [
      "Vertical takeoff (no runway)",
      "120 km/h speed",
      "4K video at 60fps",
      "48 MP stills",
      "Modular payload (4kg capacity)"
    ],
    costEfficiency: "Mass-producible, modular design"
  },
  {
    productId: "duma",
    productName: "Duma UGV",
    category: "Unmanned Ground Vehicle",
    capabilities: [
      "Ground Operations",
      "Perimeter Security",
      "AI Integration",
      "Autonomous Operations"
    ],
    useCases: [
      "Border Security",
      "Mining Operations",
      "Oil & Gas",
      "Critical Facilities"
    ],
    priceRange: "Medium",
    specifications: {
      detectionRange: "5km (ground patrol range)",
      operationalRange: "200km",
      endurance: "Extended operations",
      responseTime: "10-15 minutes"
    },
    keyFeatures: [
      "All-terrain navigation",
      "24/7 ground patrol",
      "Weapon integration",
      "Autonomous operations",
      "Underground surveillance"
    ],
    costEfficiency: "Replaces 12 security personnel, saves $480K/year"
  },
  {
    productId: "kallon",
    productName: "Kallon Tower",
    category: "Surveillance Tower",
    capabilities: [
      "Surveillance",
      "Perimeter Security",
      "AI Integration",
      "Communication"
    ],
    useCases: [
      "Power Plant",
      "Border Security",
      "Mining Operations",
      "Oil & Gas",
      "Critical Facilities",
      "Substation Networks"
    ],
    priceRange: "Low",
    specifications: {
      detectionRange: "3km",
      operationalRange: "15km (coverage radius)",
      endurance: "24/7 solar-powered",
      responseTime: "Instant",
      coverage: "360°"
    },
    keyFeatures: [
      "3km threat detection range",
      "15km coverage radius",
      "360° pan capability",
      "AI-enabled edge processing",
      "Solar-powered with battery backup"
    ],
    costEfficiency: "One tower replaces 12 security personnel"
  }
]

/**
 * Filters products based on criteria
 */
export function filterProducts(
  products: ProductComparison[],
  filters: {
    capabilities?: CapabilityType[]
    useCases?: UseCaseType[]
    priceRange?: PriceRange[]
  }
): ProductComparison[] {
  return products.filter(product => {
    if (filters.capabilities && filters.capabilities.length > 0) {
      const hasCapability = filters.capabilities.some(cap =>
        product.capabilities.includes(cap)
      )
      if (!hasCapability) return false
    }
    
    if (filters.useCases && filters.useCases.length > 0) {
      const hasUseCase = filters.useCases.some(useCase =>
        product.useCases.includes(useCase)
      )
      if (!hasUseCase) return false
    }
    
    if (filters.priceRange && filters.priceRange.length > 0) {
      if (!filters.priceRange.includes(product.priceRange)) return false
    }
    
    return true
  })
}

/**
 * Gets all unique capabilities across all products
 */
export function getAllCapabilities(): CapabilityType[] {
  const allCapabilities = new Set<CapabilityType>()
  PRODUCT_COMPARISONS.forEach(product => {
    product.capabilities.forEach(cap => allCapabilities.add(cap))
  })
  return Array.from(allCapabilities)
}

/**
 * Gets all unique use cases across all products
 */
export function getAllUseCases(): UseCaseType[] {
  const allUseCases = new Set<UseCaseType>()
  PRODUCT_COMPARISONS.forEach(product => {
    product.useCases.forEach(useCase => allUseCases.add(useCase))
  })
  return Array.from(allUseCases)
}

