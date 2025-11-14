// Real coverage specifications from product specs (Kallon: 3km detection, 15km radius)

export interface CoverageContent {
  value: string
  label: string
  description: string
  radius: number // km
  kallonTowers: number
  realExample: string
  gradient: string
}

export const COVERAGE_CONTENT: CoverageContent[] = [
  {
    value: "0-5km",
    label: "0-5 km",
    description: "Small facility - Single tower coverage",
    radius: 2.5,
    kallonTowers: 1,
    realExample: "1 Kallon tower = 12 security personnel, 3km detection range",
    gradient: "from-green-500 via-emerald-500 to-teal-500"
  },
  {
    value: "5-15km",
    label: "5-15 km",
    description: "Medium facility - Multi-tower network",
    radius: 10,
    kallonTowers: 2,
    realExample: "2 Kallon towers with 15km coverage radius each, AI coordination",
    gradient: "from-blue-500 via-cyan-500 to-teal-500"
  },
  {
    value: "15-50km",
    label: "15-50 km",
    description: "Large facility - Comprehensive coverage network",
    radius: 32.5,
    kallonTowers: 4,
    realExample: "4+ Kallon towers with networked intelligence, 360° monitoring",
    gradient: "from-purple-500 via-pink-500 to-rose-500"
  },
  {
    value: "50km-plus",
    label: "50+ km",
    description: "Enterprise/Network - Full ecosystem deployment",
    radius: 75,
    kallonTowers: 6,
    realExample: "6+ Kallon towers + Iroko UAV (20km range) + Duma UGV (200km range)",
    gradient: "from-red-500 via-orange-500 to-amber-500"
  }
]

