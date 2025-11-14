// Real coverage scenarios from product specifications and deployment stories

export interface CoverageContent {
  value: string
  label: string
  description: string
  radius: number // km
  kallonTowers: number
  deploymentScenario: string
  productStack: string
  costEfficiency: string
  realDeployment: string
  gradient: string
}

export const COVERAGE_CONTENT: CoverageContent[] = [
  {
    value: "0-5km",
    label: "0-5 km",
    description: "Small facility requiring single tower coverage",
    radius: 2.5,
    kallonTowers: 1,
    deploymentScenario: "Single Kallon tower deployment for small facilities like substations or telecommunications towers. One tower provides 3km threat detection range with 15km coverage radius, replacing 12 security personnel with 24/7 autonomous monitoring.",
    productStack: "ArtemisOS + 1x Kallon Tower + 1-2x Iroko UAV",
    costEfficiency: "One Kallon tower replaces 12 security personnel. Solar-powered operation eliminates ongoing power costs. IP67-rated for -30°C to +55°C operation.",
    realDeployment: "Deployed at telecommunications infrastructure sites across Nigeria. 6m extendable height with 360° pan capability and AI-enabled edge processing for instant threat assessment.",
    gradient: "from-primary/30 via-muted/20 to-primary/20"
  },
  {
    value: "5-15km",
    label: "5-15 km",
    description: "Medium facility requiring multi-tower network coordination",
    radius: 10,
    kallonTowers: 2,
    deploymentScenario: "Multi-tower network deployment for medium facilities like industrial complexes or critical infrastructure. Two Kallon towers with AI-driven coordination provide comprehensive coverage with overlapping detection zones. Networked intelligence enables synchronized threat response.",
    productStack: "ArtemisOS + 2x Kallon Tower + 2-3x Iroko UAV + 1x Archer VTOL",
    costEfficiency: "Two towers coordinate through ArtemisOS for seamless coverage. Multi-tower coordination reduces blind spots by 95%. Each tower operates independently with battery backup during low solar conditions.",
    realDeployment: "Currently protecting $13B+ in critical infrastructure across Africa. Multi-tower networks deployed at power plants and industrial facilities with LTE/5G connectivity for remote operations.",
    gradient: "from-primary/40 via-muted/25 to-primary/30"
  },
  {
    value: "15-50km",
    label: "15-50 km",
    description: "Large facility requiring comprehensive coverage network",
    radius: 32.5,
    kallonTowers: 4,
    deploymentScenario: "Comprehensive coverage network for large facilities like power plants, mining operations, or border segments. Four or more Kallon towers with networked intelligence provide complete perimeter security. Iroko UAV extends coverage with 20km operational range and 8-hour continuous surveillance flights.",
    productStack: "ArtemisOS + 4x Kallon Tower + 4-6x Iroko UAV + 2x Duma UGV",
    costEfficiency: "Network of 4+ towers with coordinated response. Iroko UAV provides aerial surveillance complementing tower coverage. Duma UGV adds ground patrol capability with 200km range. Complete ecosystem reduces security costs by 40-60%.",
    realDeployment: "Monitor 4 power plants simultaneously from one ArtemisOS command center. Large-area security networks deployed at border surveillance sites and mining operations with scalable deployment architecture.",
    gradient: "from-primary/50 via-muted/30 to-primary/40"
  },
  {
    value: "50km-plus",
    label: "50+ km",
    description: "Enterprise network requiring full ecosystem deployment",
    radius: 75,
    kallonTowers: 6,
    deploymentScenario: "Full ecosystem deployment for enterprise networks, extensive border segments, or multiple facility coordination. Six or more Kallon towers with Iroko UAV (20km range, extendable with LTE/5G), Duma UGV (200km ground patrol), and Archer VTOL (15-50km range) provide comprehensive multi-layer defense. ArtemisOS manages 1000+ systems with autonomous mission planning.",
    productStack: "ArtemisOS + 6x Kallon Tower + 6-12x Iroko UAV + 4-8x Duma UGV + 2-4x Archer VTOL",
    costEfficiency: "Complete ecosystem coordination saves $480K/year while improving coverage by 300%. One Kallon tower replaces 12 personnel. Full automation reduces operational costs by 40-60% with 99.9% system uptime.",
    realDeployment: "Currently protecting over $6 billion in assets under protection. Largest contract: $1.2 million hydroelectric plant security. Full ecosystem deployed at border surveillance sites with coordinated aerial, ground, and perimeter defense.",
    gradient: "from-primary/60 via-muted/35 to-primary/50"
  }
]
