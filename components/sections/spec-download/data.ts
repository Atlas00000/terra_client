export interface SpecResource {
  id: string
  title: string
  description: string
  format: "PDF" | "Excel"
  size: string
  thumbnail: string
  badge: string
  highlights: string[]
}

export const SPEC_RESOURCES: SpecResource[] = [
  {
    id: "artemis-specs",
    title: "ArtemisOS Technical Specifications & Integration Guide",
    description: "Full stack documentation covering Artemis Cloud, Autonomy, and licensed API endpoints for third-party sensors.",
    format: "PDF",
    size: "18 MB",
    thumbnail: "/ArtemisOS/autonomous_mission_planning.png",
    badge: "Central Intelligence",
    highlights: [
      "99.5% detection accuracy benchmarks with test harness outputs",
      "Integration patterns with Iroko, Archer, Duma, Kallon hardware",
      "Security architecture (AES-256, TLS 1.3, audit logging)"
    ]
  },
  {
    id: "stack-deployment",
    title: "Complete Product Stack Deployment Guide",
    description: "Site readiness checklist, phased deployment blueprints, and RFQ templates for multi-product rollouts.",
    format: "PDF",
    size: "24 MB",
    thumbnail: "/kallon(sentry_tower)/kallon.png",
    badge: "Deployment Playbook",
    highlights: [
      "15+ facility archetypes with coverage diagrams",
      "Contracting + logistics timeline (Africa-wide)",
      "Maintenance + training calendar aligned with ArtemisOS releases"
    ]
  },
  {
    id: "roi-analysis",
    title: "ROI Analysis: ArtemisOS vs Traditional Security",
    description: "Excel model comparing manual guard operations to fully autonomous stack deployments.",
    format: "Excel",
    size: "4 MB",
    thumbnail: "/Duma_ground_drone/Duma_ground_drone.png",
    badge: "Financial Model",
    highlights: [
      "Cost breakdown for guards vs autonomous stack",
      "Breakeven calculators for mines, borders, power networks",
      "Customizable inputs for regional labor costs"
    ]
  },
  {
    id: "power-case-study",
    title: "Case Study: 4 Power Plants Protected by ArtemisOS",
    description: "Real deployment metrics from North Delta hydro corridor including detection to resolution timelines.",
    format: "PDF",
    size: "9 MB",
    thumbnail: "/archer_vtol/archer_vtol_1.png",
    badge: "Case Study",
    highlights: [
      "$1.2B in assets monitored with zero outages in 18 months",
      "Detection-to-neutralization in under 5 minutes",
      "Approved for ECOWAS deployments"
    ]
  },
  {
    id: "iroko-performance",
    title: "Iroko UAV Performance Data & Range Charts",
    description: "Flight envelopes, endurance charts, and environmental tolerance data validated across Nigeria and South Africa.",
    format: "PDF",
    size: "6 MB",
    thumbnail: "/Iroko_UAV/Iroko_UAV .png",
    badge: "Performance Data",
    highlights: [
      "8-hour ISR loops with LTE/5G backhaul",
      "Thermal + EO sensor calibration tables",
      "Daily production capacity (20 units, Abuja facility)"
    ]
  }
]

