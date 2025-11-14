// Real threat scenarios from product specifications

export interface ThreatContent {
  value: string
  label: string
  description: string
  realScenario: string
  productResponse: string
  intensity: number
  gradient: string
  icon: string
}

export const THREAT_CONTENT: ThreatContent[] = [
  {
    value: "intrusion-detection",
    label: "Intrusion Detection & Response",
    description: "Autonomous detection and immediate response to unauthorized access",
    realScenario: "ArtemisOS detects threats in <1 second with 99.5% accuracy",
    productResponse: "Kallon Tower: Instant detection | Iroko UAV: 5-10 min response | ArtemisOS: <1s analysis",
    intensity: 3,
    gradient: "from-yellow-500 via-orange-500 to-red-500",
    icon: "🔍"
  },
  {
    value: "surveillance-monitoring",
    label: "24/7 Surveillance & Monitoring",
    description: "Continuous perimeter monitoring with real-time threat assessment",
    realScenario: "Monitor 4 power plants simultaneously from one ArtemisOS command center",
    productResponse: "Iroko UAV: 8-hour continuous surveillance | Kallon Tower: 24/7 solar-powered | ArtemisOS: Real-time analysis",
    intensity: 2,
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    icon: "👁️"
  },
  {
    value: "rapid-response",
    label: "Rapid Response Operations",
    description: "Vertical takeoff capability for immediate threat response",
    realScenario: "Archer VTOL reaches facility in 2-5 minutes vs 45 minutes for ground teams",
    productResponse: "Archer VTOL: 2-5 min response | No runway required | 120 km/h speed",
    intensity: 4,
    gradient: "from-orange-500 via-red-500 to-pink-500",
    icon: "⚡"
  },
  {
    value: "perimeter-security",
    label: "Comprehensive Perimeter Security",
    description: "360° monitoring with multi-tower coordination and ground patrol",
    realScenario: "One Kallon tower replaces 12 security personnel with 3km detection range",
    productResponse: "Kallon Tower: 15km coverage radius | Duma UGV: 200km ground patrol | 360° pan capability",
    intensity: 3,
    gradient: "from-blue-500 via-cyan-500 to-teal-500",
    icon: "🛡️"
  },
  {
    value: "multi-threat",
    label: "Multi-Threat Environment",
    description: "Comprehensive defense against multiple simultaneous threat vectors",
    realScenario: "Complete stack: Aerial surveillance (Iroko), rapid response (Archer), ground patrol (Duma), perimeter (Kallon)",
    productResponse: "Full ecosystem coordination | ArtemisOS manages 1000+ systems | Autonomous mission planning",
    intensity: 5,
    gradient: "from-red-500 via-pink-500 to-purple-500",
    icon: "🎯"
  }
]

