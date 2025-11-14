export interface ProductHeroSlide {
  id: string
  name: string
  headline: string
  subheadline: string
  description: string
  highlights: string[]
  stats: {
    label: string
    value: string
  }[]
  ctas: {
    label: string
    href: string
    variant: "primary" | "secondary"
  }[]
  visual: {
    image: string
    alt: string
    caption: string
  }
  badge: string
  background: {
    gradient: string
    accent: string
  }
}

export const PRODUCT_HERO_SLIDES: ProductHeroSlide[] = [
  {
    id: "artemisos",
    name: "ArtemisOS",
    headline: "Command Autonomous Defense at Continental Scale",
    subheadline: "AI-powered central intelligence orchestrating 1,000+ autonomous systems with sub-second response times.",
    description: "ArtemisOS unifies every Terrahaptix system—planning missions, detecting threats with 99.5% accuracy, and coordinating air, ground, and perimeter assets in real time.",
    highlights: [
      "Autonomous mission planning with predictive risk scoring",
      "Real-time fusion of ISR, VTOL, UGV, and tower telemetry",
      "Encrypted command fabric linking 1000+ autonomous nodes"
    ],
    stats: [
      { label: "Threat Detection Accuracy", value: "99.5%" },
      { label: "Response Time", value: "< 1 second" },
      { label: "Concurrent Systems", value: "1,000+" }
    ],
    ctas: [
      { label: "Explore ArtemisOS", href: "/artemis", variant: "primary" },
      { label: "View Deployment Playbook", href: "/company#deployments", variant: "secondary" }
    ],
    visual: {
      image: "/ArtemisOS/autonomous_mission_planning.png",
      alt: "ArtemisOS AI Command Interface",
      caption: "ArtemisOS cloud console orchestrating autonomous missions."
    },
    badge: "Central Intelligence Platform",
    background: {
      gradient: "from-[#0a0f24] via-[#0a1c42] to-[#0a0f24]",
      accent: "rgba(88, 179, 255, 0.3)"
    }
  },
  {
    id: "iroko",
    name: "Iroko UAV",
    headline: "ISR Dominance with 8-Hour Eyes in the Sky",
    subheadline: "Mass-producible quadcopter delivering multi-spectral surveillance, thermal detection, and rapid deployment in 90 seconds.",
    description: "Designed for African critical infrastructure, Iroko maintains 8-hour surveillance loops, streams real-time intelligence into ArtemisOS, and operates with minimal pilot training.",
    highlights: [
      "Multi-spectral ISR with night and thermal fusion",
      "LTE/5G extendable data link for remote corridors",
      "90-second cold start for rapid mission launch"
    ],
    stats: [
      { label: "Endurance", value: "8 hours" },
      { label: "Range", value: "100 km" },
      { label: "Deployment", value: "90 seconds" }
    ],
    ctas: [
      { label: "Discover Iroko", href: "/iroko", variant: "primary" },
      { label: "Download Spec Sheet", href: "/assets/specs/iroko.pdf", variant: "secondary" }
    ],
    visual: {
      image: "/Iroko_UAV/Iroko_UAV .png",
      alt: "Iroko UAV in surveillance mission",
      caption: "Iroko UAV executing multi-spectral perimeter patrol."
    },
    badge: "ISR First Response",
    background: {
      gradient: "from-[#041e1f] via-[#032b2a] to-[#041e1f]",
      accent: "rgba(56, 201, 172, 0.35)"
    }
  },
  {
    id: "archer",
    name: "Archer VTOL",
    headline: "120 km/h Rapid Response from Anywhere",
    subheadline: "Vertical takeoff VTOL with AI-assisted flight, 50 km range, and precision landing for high-threat infrastructure.",
    description: "Archer VTOL brings runway-free deployment to remote borders, substations, and critical corridors with fully autonomous mission execution through ArtemisOS.",
    highlights: [
      "Carbon fiber monocoque with IP54 all-weather sealing",
      "AI-assisted VTOL landing on improvised pads",
      "Swappable payload bay for tactical sensors"
    ],
    stats: [
      { label: "Top Speed", value: "120 km/h" },
      { label: "Range", value: "50 km" },
      { label: "Payload", value: "4 kg" }
    ],
    ctas: [
      { label: "Meet Archer VTOL", href: "/archer", variant: "primary" },
      { label: "Watch Mission Demo", href: "/news/archer-mission", variant: "secondary" }
    ],
    visual: {
      image: "/archer_vtol/archer_vtol_1.png",
      alt: "Archer VTOL boarding sequence",
      caption: "Archer VTOL transitioning from vertical lift to fixed-wing flight."
    },
    badge: "Rapid Response VTOL",
    background: {
      gradient: "from-[#1a0b2e] via-[#2a0f4f] to-[#1a0b2e]",
      accent: "rgba(173, 109, 255, 0.35)"
    }
  },
  {
    id: "duma",
    name: "Duma UGV",
    headline: "Autonomous Ground Dominance Across 200 km",
    subheadline: "All-terrain UGV with weapon integration, underground surveillance, and ArtemisOS-guided patrol intelligence.",
    description: "Duma UGV replaces 12-man patrol teams with 24/7 autonomous coverage, hardened for mining corridors, refineries, and high-risk ground operations.",
    highlights: [
      "Autonomous convoy logic with obstacle negotiation",
      "Weapon-ready hardpoints and underground sensors",
      "Seamless ArtemisOS link for coordinated patrols"
    ],
    stats: [
      { label: "Operational Range", value: "200 km" },
      { label: "Terrain Adaptation", value: "All-terrain" },
      { label: "Patrol Endurance", value: "24/7" }
    ],
    ctas: [
      { label: "View Duma UGV", href: "/duma", variant: "primary" },
      { label: "See Mining Deployment", href: "/news/duma-mining", variant: "secondary" }
    ],
    visual: {
      image: "/Duma_ground_drone/Duma_ground_drone.png",
      alt: "Duma UGV patrolling industrial corridor",
      caption: "Duma UGV securing oil & gas pipeline infrastructure."
    },
    badge: "Ground Security Autonomy",
    background: {
      gradient: "from-[#1c1204] via-[#2c1907] to-[#1c1204]",
      accent: "rgba(255, 147, 54, 0.35)"
    }
  },
  {
    id: "kallon",
    name: "Kallon Tower",
    headline: "Solar-Powered 360° Perimeter Intelligence",
    subheadline: "3 km detection, 15 km coverage, edge AI processing, and instant response for border and facility perimeters.",
    description: "Kallon towers form the autonomous perimeter mesh—solar-powered, ArtemisOS-linked, and capable of replacing twelve static guards per installation.",
    highlights: [
      "Edge AI triages radar, thermal, and optical feeds",
      "Self-sustaining solar stack with battery redundancy",
      "Instant escalation to VTOL/UGV assets via ArtemisOS"
    ],
    stats: [
      { label: "Detection Range", value: "3 km" },
      { label: "Coverage Radius", value: "15 km" },
      { label: "Power", value: "Solar + Battery" }
    ],
    ctas: [
      { label: "Inspect Kallon Tower", href: "/kallon", variant: "primary" },
      { label: "Request Site Design", href: "/company#contact", variant: "secondary" }
    ],
    visual: {
      image: "/kallon(sentry_tower)/kallon.png",
      alt: "Kallon tower guarding perimeter",
      caption: "Kallon tower mesh providing live perimeter telemetry."
    },
    badge: "Perimeter Intelligence",
    background: {
      gradient: "from-[#0d141f] via-[#152239] to-[#0d141f]",
      accent: "rgba(80, 129, 255, 0.35)"
    }
  }
]

