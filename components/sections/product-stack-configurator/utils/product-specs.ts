// Real product specifications from product_specifications.md

export interface ProductSpec {
  name: string
  category: string
  detectionRange: number // km
  operationalRange: number // km
  endurance: string
  responseTime: string
  capabilities: string[]
  useCases: string[]
  costEfficiency: string
}

export const PRODUCT_SPECS: Record<string, ProductSpec> = {
  ArtemisOS: {
    name: "ArtemisOS",
    category: "AI Operating System",
    detectionRange: 0, // Central platform
    operationalRange: 0,
    endurance: "24/7",
    responseTime: "<1 second",
    capabilities: [
      "AI-powered threat detection (99.5% accuracy)",
      "Autonomous mission planning",
      "Fleet management (1000+ systems)",
      "Real-time data analysis",
      "AES-256 encryption"
    ],
    useCases: ["All facilities - Central intelligence platform"],
    costEfficiency: "40-60% operational cost reduction"
  },
  Iroko: {
    name: "Iroko UAV",
    category: "Quadcopter UAV",
    detectionRange: 20, // km with extendable range
    operationalRange: 20, // km (extendable with LTE/5G)
    endurance: "Up to 50 minutes",
    responseTime: "5-10 minutes",
    capabilities: [
      "8-hour continuous surveillance capability",
      "Multi-spectral imaging",
      "Thermal detection",
      "Real-time streaming",
      "Rapid deployment (90 seconds)"
    ],
    useCases: [
      "Power plant surveillance",
      "Infrastructure inspection",
      "Border monitoring",
      "Search & rescue"
    ],
    costEfficiency: "20 units produced daily at Abuja facility"
  },
  Archer: {
    name: "Archer VTOL",
    category: "VTOL UAV",
    detectionRange: 15, // km (up to 50km with GCS Pro)
    operationalRange: 15, // km (up to 50km with GCS Pro)
    endurance: "Up to 34 minutes",
    responseTime: "2-5 minutes",
    capabilities: [
      "Vertical takeoff (no runway)",
      "120 km/h speed",
      "4K video at 60fps",
      "48 MP stills",
      "Modular payload (4kg capacity)"
    ],
    useCases: [
      "Rapid response operations",
      "Substation network security",
      "Infrastructure inspection",
      "Border surveillance"
    ],
    costEfficiency: "Mass-producible, modular design"
  },
  Duma: {
    name: "Duma UGV",
    category: "Unmanned Ground Vehicle",
    detectionRange: 5, // km ground patrol range
    operationalRange: 200, // km
    endurance: "Extended operations",
    responseTime: "10-15 minutes",
    capabilities: [
      "All-terrain navigation",
      "24/7 ground patrol",
      "Weapon integration",
      "Autonomous operations",
      "Underground surveillance"
    ],
    useCases: [
      "Ground security patrol",
      "Mine operations",
      "Oil & gas pipeline monitoring",
      "Border ground patrol"
    ],
    costEfficiency: "Replaces 12 security personnel, saves $480K/year"
  },
  Kallon: {
    name: "Kallon Tower",
    category: "Surveillance Tower",
    detectionRange: 3, // km threat detection
    operationalRange: 15, // km coverage radius
    endurance: "24/7 solar-powered",
    responseTime: "Instant",
    capabilities: [
      "3km threat detection range",
      "15km coverage radius",
      "360° pan capability",
      "AI-enabled edge processing",
      "Solar-powered with battery backup"
    ],
    useCases: [
      "Perimeter security",
      "Border surveillance",
      "Mine perimeter monitoring",
      "Oil pipeline security"
    ],
    costEfficiency: "One tower replaces 12 security personnel"
  }
}

// Facility type requirements mapping
export interface FacilityRequirement {
  minCoverage: number // km
  recommendedProducts: {
    product: string
    minQuantity: number
    maxQuantity: number
    priority: "essential" | "recommended" | "optional"
  }[]
  threatPriorities: string[]
}

export const FACILITY_REQUIREMENTS: Record<string, FacilityRequirement> = {
  "power-plant": {
    minCoverage: 15,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Iroko", minQuantity: 4, maxQuantity: 8, priority: "essential" },
      { product: "Kallon", minQuantity: 2, maxQuantity: 4, priority: "essential" },
      { product: "Archer", minQuantity: 0, maxQuantity: 2, priority: "optional" }
    ],
    threatPriorities: ["surveillance-monitoring", "intrusion-detection", "rapid-response"]
  },
  "substation": {
    minCoverage: 5,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Archer", minQuantity: 2, maxQuantity: 4, priority: "essential" },
      { product: "Kallon", minQuantity: 3, maxQuantity: 6, priority: "essential" },
      { product: "Iroko", minQuantity: 0, maxQuantity: 2, priority: "optional" }
    ],
    threatPriorities: ["rapid-response", "intrusion-detection", "surveillance-monitoring"]
  },
  "border-security": {
    minCoverage: 50,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Iroko", minQuantity: 6, maxQuantity: 12, priority: "essential" },
      { product: "Duma", minQuantity: 4, maxQuantity: 8, priority: "essential" },
      { product: "Kallon", minQuantity: 5, maxQuantity: 10, priority: "essential" },
      { product: "Archer", minQuantity: 2, maxQuantity: 4, priority: "recommended" }
    ],
    threatPriorities: ["multi-threat", "surveillance-monitoring", "perimeter-security"]
  },
  "critical-facility": {
    minCoverage: 10,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Kallon", minQuantity: 3, maxQuantity: 6, priority: "essential" },
      { product: "Iroko", minQuantity: 3, maxQuantity: 6, priority: "essential" },
      { product: "Archer", minQuantity: 1, maxQuantity: 3, priority: "recommended" },
      { product: "Duma", minQuantity: 0, maxQuantity: 2, priority: "optional" }
    ],
    threatPriorities: ["intrusion-detection", "surveillance-monitoring", "rapid-response"]
  },
  "industrial-complex": {
    minCoverage: 8,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Kallon", minQuantity: 2, maxQuantity: 4, priority: "essential" },
      { product: "Iroko", minQuantity: 2, maxQuantity: 4, priority: "essential" },
      { product: "Duma", minQuantity: 1, maxQuantity: 3, priority: "recommended" }
    ],
    threatPriorities: ["surveillance-monitoring", "intrusion-detection", "perimeter-security"]
  },
  "oil-gas": {
    minCoverage: 20,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Duma", minQuantity: 3, maxQuantity: 6, priority: "essential" },
      { product: "Iroko", minQuantity: 4, maxQuantity: 8, priority: "essential" },
      { product: "Kallon", minQuantity: 4, maxQuantity: 8, priority: "essential" },
      { product: "Archer", minQuantity: 1, maxQuantity: 3, priority: "recommended" }
    ],
    threatPriorities: ["surveillance-monitoring", "intrusion-detection", "rapid-response"]
  },
  "mining": {
    minCoverage: 15,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Duma", minQuantity: 4, maxQuantity: 8, priority: "essential" },
      { product: "Kallon", minQuantity: 3, maxQuantity: 6, priority: "essential" },
      { product: "Iroko", minQuantity: 2, maxQuantity: 4, priority: "recommended" }
    ],
    threatPriorities: ["surveillance-monitoring", "intrusion-detection", "perimeter-security"]
  },
  "telecommunications": {
    minCoverage: 10,
    recommendedProducts: [
      { product: "ArtemisOS", minQuantity: 1, maxQuantity: 1, priority: "essential" },
      { product: "Kallon", minQuantity: 2, maxQuantity: 4, priority: "essential" },
      { product: "Iroko", minQuantity: 2, maxQuantity: 4, priority: "essential" },
      { product: "Archer", minQuantity: 1, maxQuantity: 2, priority: "optional" }
    ],
    threatPriorities: ["intrusion-detection", "surveillance-monitoring", "rapid-response"]
  }
}

