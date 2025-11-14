// Threat scenarios from product specifications

export interface ThreatContent {
  value: string
  label: string
  description: string
  scenario: string
  productResponse: string
  intensity: number
  gradient: string
}

export const THREAT_CONTENT: ThreatContent[] = [
  {
    value: "intrusion-detection",
    label: "Intrusion Detection & Response",
    description: "Autonomous detection and immediate response to unauthorized access",
    scenario: "ArtemisOS detects threats in <1 second with 99.5% accuracy. Kallon Tower provides instant perimeter detection while Iroko UAV responds within 5-10 minutes for aerial assessment.",
    productResponse: "Kallon Tower: Instant detection | Iroko UAV: 5-10 min response | ArtemisOS: <1s analysis",
    intensity: 3,
    gradient: "from-primary/40 via-muted/25 to-primary/30"
  },
  {
    value: "surveillance-monitoring",
    label: "24/7 Surveillance & Monitoring",
    description: "Continuous perimeter monitoring with real-time threat assessment",
    scenario: "Monitor multiple facilities simultaneously from one ArtemisOS command center. Iroko UAV provides 8-hour continuous surveillance flights while Kallon Tower offers 24/7 solar-powered perimeter monitoring.",
    productResponse: "Iroko UAV: 8-hour continuous surveillance | Kallon Tower: 24/7 solar-powered | ArtemisOS: Real-time analysis",
    intensity: 2,
    gradient: "from-primary/30 via-muted/20 to-primary/20"
  },
  {
    value: "rapid-response",
    label: "Rapid Response Operations",
    description: "Vertical takeoff capability for immediate threat response",
    scenario: "Archer VTOL reaches your facility in 2-5 minutes from deployment, compared to 45 minutes for traditional ground response teams. No runway required, vertical takeoff enables deployment from any location.",
    productResponse: "Archer VTOL: 2-5 min response | No runway required | 120 km/h speed",
    intensity: 4,
    gradient: "from-primary/50 via-muted/30 to-primary/40"
  },
  {
    value: "perimeter-security",
    label: "Comprehensive Perimeter Security",
    description: "360° monitoring with multi-tower coordination and ground patrol",
    scenario: "One Kallon tower replaces 12 security personnel with 3km threat detection range and 15km coverage radius. Duma UGV provides 200km ground patrol capability with autonomous operations.",
    productResponse: "Kallon Tower: 15km coverage radius | Duma UGV: 200km ground patrol | 360° pan capability",
    intensity: 3,
    gradient: "from-primary/40 via-muted/25 to-primary/30"
  },
  {
    value: "multi-threat",
    label: "Multi-Threat Environment",
    description: "Comprehensive defense against multiple simultaneous threat vectors",
    scenario: "Complete ecosystem coordination: Iroko UAV for aerial surveillance, Archer VTOL for rapid response, Duma UGV for ground patrol, and Kallon Tower for perimeter security. ArtemisOS manages 1000+ systems with autonomous mission planning.",
    productResponse: "Full ecosystem coordination | ArtemisOS manages 1000+ systems | Autonomous mission planning",
    intensity: 5,
    gradient: "from-primary/60 via-muted/35 to-primary/50"
  }
]

