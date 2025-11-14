export type ExistingSystems = "cctv" | "access-control" | "perimeter-sensors" | "multiple" | "none"
export type NetworkInfrastructure = "dedicated" | "shared" | "limited" | "none"
export type IntegrationRequirement = "erp" | "scada" | "building-management" | "cloud-services" | "standalone"
export type DataStorage = "on-premise" | "cloud" | "hybrid" | "compliance"
export type TechnicalTeam = "full-it" | "limited-it" | "external-vendor" | "no-team"

export interface AssessmentState {
  existingSystems: ExistingSystems | null
  networkInfrastructure: NetworkInfrastructure | null
  integrationRequirements: IntegrationRequirement[]
  dataStorage: DataStorage | null
  technicalTeam: TechnicalTeam | null
}

export interface ReadinessScore {
  score: number
  level: "high" | "medium" | "low" | "very-low"
  timeline: string
  weeks: { min: number; max: number }
}

export function calculateReadinessScore(state: AssessmentState): ReadinessScore | null {
  if (!state.existingSystems || !state.networkInfrastructure || !state.dataStorage || !state.technicalTeam) {
    return null
  }

  let score = 50 // Base score

  // Existing Systems (+20 if yes, +10 if no)
  if (state.existingSystems !== "none") {
    score += 20
  } else {
    score += 10
  }

  // Network Infrastructure
  if (state.networkInfrastructure === "dedicated") score += 25
  else if (state.networkInfrastructure === "shared") score += 15
  else if (state.networkInfrastructure === "limited") score += 5

  // Integration Requirements (each adds complexity: -5 per system)
  score -= state.integrationRequirements.length * 5
  if (state.integrationRequirements.includes("standalone")) {
    score += 10 // Standalone is simpler
  }

  // Data Storage
  if (state.dataStorage === "cloud") score += 20
  else if (state.dataStorage === "on-premise") score += 15
  else if (state.dataStorage === "hybrid") score += 10
  else if (state.dataStorage === "compliance") score += 5

  // Technical Team
  if (state.technicalTeam === "full-it") score += 25
  else if (state.technicalTeam === "limited-it") score += 15
  else if (state.technicalTeam === "external-vendor") score += 10
  else if (state.technicalTeam === "no-team") score += 5

  // Clamp score between 0-100
  score = Math.max(0, Math.min(100, score))

  // Determine level and timeline
  let level: "high" | "medium" | "low" | "very-low"
  let timeline: string
  let weeks: { min: number; max: number }

  if (score >= 80) {
    level = "high"
    timeline = "8-16 weeks"
    weeks = { min: 8, max: 16 }
  } else if (score >= 60) {
    level = "medium"
    timeline = "12-24 weeks"
    weeks = { min: 12, max: 24 }
  } else if (score >= 40) {
    level = "low"
    timeline = "16-32 weeks"
    weeks = { min: 16, max: 32 }
  } else {
    level = "very-low"
    timeline = "24-40 weeks"
    weeks = { min: 24, max: 40 }
  }

  return { score, level, timeline, weeks }
}

