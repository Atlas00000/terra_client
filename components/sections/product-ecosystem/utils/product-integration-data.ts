/**
 * Product Integration Data Module
 * Defines how products integrate and work together
 * Based on real product specifications and integration capabilities
 */

export interface ProductIntegration {
  productId: string
  productName: string
  category: string
  image: string
  position: { x: number; y: number }
  connections: string[] // Product IDs this product connects to
  integrationDetails: {
    with: string // Product name
    description: string
    capabilities: string[]
  }[]
  keyFeatures: string[]
  specifications: Record<string, string>
}

export const PRODUCT_INTEGRATIONS: ProductIntegration[] = [
  {
    productId: "artemisos",
    productName: "ArtemisOS",
    category: "AI Operating System",
    image: "/ArtemisOS/autonomous_mission_planning.png",
    position: { x: 50, y: 50 }, // Center position
    connections: ["iroko", "archer", "duma", "kallon"],
    integrationDetails: [
      {
        with: "Iroko UAV",
        description: "Seamless integration with ArtemisOS for autonomous mission planning and real-time coordination. Iroko leverages ArtemisOS AI for threat detection, classification, and tracking during ISR operations.",
        capabilities: [
          "Autonomous mission planning for ISR operations",
          "Real-time threat assessment and classification",
          "Coordinated response with other systems",
          "Fleet management for multiple Iroko units"
        ]
      },
      {
        with: "Archer VTOL",
        description: "Direct integration with ArtemisOS for autonomous flight operations and rapid response coordination. Archer uses ArtemisOS for AI-assisted mission planning and real-time threat response.",
        capabilities: [
          "Autonomous flight operations and path planning",
          "AI-assisted mission planning",
          "Real-time coordination for rapid response",
          "Multi-mission payload management"
        ]
      },
      {
        with: "Duma UGV",
        description: "Coordinated integration with ArtemisOS for ground-based security operations and threat response. Duma leverages ArtemisOS for autonomous ground navigation and coordinated operations.",
        capabilities: [
          "Autonomous ground navigation and patrol",
          "Coordinated threat response",
          "Ground-based security operations",
          "Hazardous environment operations"
        ]
      },
      {
        with: "Kallon Tower",
        description: "Central hub integration with ArtemisOS for comprehensive surveillance and communication. Kallon serves as a communication and monitoring hub, feeding data to ArtemisOS for analysis.",
        capabilities: [
          "Central surveillance hub integration",
          "Real-time data transmission to ArtemisOS",
          "Edge AI processing coordination",
          "Multi-channel communication management"
        ]
      }
    ],
    keyFeatures: [
      "AI-powered threat detection (99.5% accuracy)",
      "Autonomous mission planning",
      "Fleet management (1000+ systems)",
      "Real-time data analysis",
      "AES-256 encryption"
    ],
    specifications: {
      "Response Time": "<1 second",
      "Threat Detection Accuracy": "99.5%",
      "System Uptime": "99.9%",
      "Concurrent Systems": "1000+"
    }
  },
  {
    productId: "iroko",
    productName: "Iroko UAV",
    category: "Quadcopter UAV",
    image: "/Iroko_UAV/Iroko_UAV .png",
    position: { x: 25, y: 30 },
    connections: ["artemisos"],
    integrationDetails: [
      {
        with: "ArtemisOS",
        description: "Direct integration with ArtemisOS for ISR operations and real-time threat assessment. Iroko transmits surveillance data to ArtemisOS for AI-powered analysis and coordinated response.",
        capabilities: [
          "Real-time data transmission to ArtemisOS",
          "Autonomous mission execution via ArtemisOS",
          "Coordinated operations with other systems",
          "AI-powered threat detection and classification"
        ]
      }
    ],
    keyFeatures: [
      "8-hour continuous surveillance capability",
      "Multi-spectral imaging",
      "Thermal detection",
      "Real-time streaming",
      "Rapid deployment (90 seconds)"
    ],
    specifications: {
      "Max Weight": "5kg",
      "Max Speed": "70 KM/h",
      "Endurance": "Up to 50 minutes",
      "Range": "20km (extendable with LTE/5G)",
      "Payload": "1.5kg"
    }
  },
  {
    productId: "archer",
    productName: "Archer VTOL",
    category: "VTOL UAV",
    image: "/archer_vtol/archer_vtol_1.png",
    position: { x: 75, y: 30 },
    connections: ["artemisos"],
    integrationDetails: [
      {
        with: "ArtemisOS",
        description: "Seamless integration with ArtemisOS for autonomous mission planning and real-time coordination. Archer uses ArtemisOS for AI-assisted flight operations and rapid response missions.",
        capabilities: [
          "Autonomous flight operations",
          "AI-assisted mission planning",
          "Rapid response coordination",
          "Multi-mission payload management"
        ]
      }
    ],
    keyFeatures: [
      "Vertical takeoff (no runway)",
      "120 km/h speed",
      "4K video at 60fps",
      "48 MP stills",
      "Modular payload (4kg capacity)"
    ],
    specifications: {
      "Wingspan": "1900mm",
      "Weight": "7.5kg",
      "Payload": "4kg",
      "Flight Time": "34 minutes",
      "Range": "15km (up to 50km with GCS Pro)"
    }
  },
  {
    productId: "duma",
    productName: "Duma UGV",
    category: "Unmanned Ground Vehicle",
    image: "/Duma_ground_drone/Duma_ground_drone.png",
    position: { x: 25, y: 70 },
    connections: ["artemisos"],
    integrationDetails: [
      {
        with: "ArtemisOS",
        description: "Coordinated with ArtemisOS for ground-based security operations and threat response. Duma uses ArtemisOS for autonomous navigation and coordinated ground patrol operations.",
        capabilities: [
          "Autonomous ground navigation",
          "Coordinated threat response",
          "Ground-based security operations",
          "Hazardous environment operations"
        ]
      }
    ],
    keyFeatures: [
      "All-terrain navigation",
      "24/7 ground patrol",
      "Weapon integration",
      "Autonomous operations",
      "Underground surveillance"
    ],
    specifications: {
      "Type": "Autonomous Ground Vehicle",
      "Terrain": "All-terrain capability",
      "Navigation": "Autonomous GPS/IMU",
      "Operations": "Hazardous environment ready",
      "Range": "200km"
    }
  },
  {
    productId: "kallon",
    productName: "Kallon Tower",
    category: "Surveillance Tower",
    image: "/kallon(sentry_tower)/kallon.png",
    position: { x: 75, y: 70 },
    connections: ["artemisos"],
    integrationDetails: [
      {
        with: "ArtemisOS",
        description: "Central hub integration with ArtemisOS for comprehensive surveillance and communication. Kallon serves as a fixed monitoring hub, transmitting data to ArtemisOS for analysis and coordinated response.",
        capabilities: [
          "Central surveillance hub",
          "Real-time data transmission",
          "Edge AI processing coordination",
          "Multi-channel communication"
        ]
      }
    ],
    keyFeatures: [
      "3km threat detection range",
      "15km coverage radius",
      "360° pan capability",
      "AI-enabled edge processing",
      "Solar-powered with battery backup"
    ],
    specifications: {
      "Monitoring": "360° coverage",
      "Detection Range": "3km",
      "Coverage Radius": "15km",
      "AI Processing": "Edge AI capabilities",
      "Power": "Solar-powered with battery backup"
    }
  }
]

/**
 * Gets integration details between two products
 */
export function getIntegrationDetails(
  productId1: string,
  productId2: string
): ProductIntegration["integrationDetails"][0] | null {
  const product1 = PRODUCT_INTEGRATIONS.find(p => p.productId === productId1)
  if (!product1) return null
  
  const integration = product1.integrationDetails.find(
    detail => detail.with.toLowerCase().includes(productId2) || 
             productId2.toLowerCase().includes(detail.with.toLowerCase().split(' ')[0])
  )
  
  return integration || null
}

/**
 * Gets all products that connect to a given product
 */
export function getConnectedProducts(productId: string): ProductIntegration[] {
  const product = PRODUCT_INTEGRATIONS.find(p => p.productId === productId)
  if (!product) return []
  
  return PRODUCT_INTEGRATIONS.filter(p => 
    product.connections.includes(p.productId)
  )
}

