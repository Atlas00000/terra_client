// Real facility content from product specifications and MD files

export interface FacilityContent {
  value: string
  label: string
  description: string
  useCase: string
  recommendedStack: string
  realExample: string
  gradient: string
}

export const FACILITY_CONTENT: FacilityContent[] = [
  {
    value: "power-plant",
    label: "Power Plant & Electrical Grids",
    description: "Thermal and renewable power facilities requiring 24/7 surveillance",
    useCase: "Monitor 4 power plants simultaneously from one ArtemisOS command center",
    recommendedStack: "ArtemisOS + 4x Iroko UAV + 2x Kallon Towers",
    realExample: "Currently protecting $13B+ in critical infrastructure across Africa",
    gradient: "from-blue-600 via-cyan-500 to-teal-400"
  },
  {
    value: "substation",
    label: "Substation Networks",
    description: "Electrical distribution and transmission requiring rapid multi-site response",
    useCase: "Vertical takeoff capability for rapid deployment across multiple substations",
    recommendedStack: "ArtemisOS + 2x Archer VTOL + 3x Kallon Towers",
    realExample: "Multi-site coordination with instant threat detection",
    gradient: "from-purple-600 via-pink-500 to-rose-400"
  },
  {
    value: "critical-facility",
    label: "Critical Infrastructure",
    description: "Mines, refineries, and essential facilities requiring comprehensive protection",
    useCase: "Complete perimeter security with AI-powered threat detection",
    recommendedStack: "ArtemisOS + 3x Kallon Towers + 3x Iroko UAV",
    realExample: "99.5% threat detection accuracy with <1 second response time",
    gradient: "from-orange-600 via-red-500 to-pink-400"
  },
  {
    value: "border-security",
    label: "Border Security",
    description: "Perimeter defense and border monitoring for large areas",
    useCase: "Comprehensive border defense with ground and aerial coverage",
    recommendedStack: "ArtemisOS + 6x Iroko UAV + 4x Duma UGV + 5x Kallon Towers",
    realExample: "Long-range surveillance with 15km coverage radius per Kallon tower",
    gradient: "from-green-600 via-emerald-500 to-teal-400"
  },
  {
    value: "industrial-complex",
    label: "Industrial Complexes",
    description: "Manufacturing and production facilities requiring asset protection",
    useCase: "24/7 surveillance with autonomous threat response",
    recommendedStack: "ArtemisOS + 2x Kallon Towers + 2x Iroko UAV",
    realExample: "One Kallon tower replaces 12 security personnel",
    gradient: "from-indigo-600 via-blue-500 to-cyan-400"
  },
  {
    value: "oil-gas",
    label: "Oil & Gas Facilities",
    description: "Refineries, pipelines, and extraction sites requiring pipeline monitoring",
    useCase: "Pipeline monitoring with ground patrol and aerial surveillance",
    recommendedStack: "ArtemisOS + 4x Duma UGV + 4x Iroko UAV + 4x Kallon Towers",
    realExample: "Duma UGV saves $480K/year while improving coverage by 300%",
    gradient: "from-amber-600 via-yellow-500 to-orange-400"
  },
  {
    value: "mining",
    label: "Mining Sites",
    description: "Surface and underground mining operations requiring safety compliance",
    useCase: "Underground surveillance with ground patrol and perimeter security",
    recommendedStack: "ArtemisOS + 4x Duma UGV + 3x Kallon Towers",
    realExample: "Autonomous operations remove need for human operators in hazardous environments",
    gradient: "from-slate-600 via-gray-500 to-zinc-400"
  },
  {
    value: "telecommunications",
    label: "Telecommunications",
    description: "Towers, data centers, and network infrastructure requiring intrusion detection",
    useCase: "Infrastructure inspection with rapid response capability",
    recommendedStack: "ArtemisOS + 2x Kallon Towers + 2x Iroko UAV",
    realExample: "Real-time streaming with 4K video at 60fps",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-400"
  }
]

