import { CoverageArea, ThreatLevel } from "../types"

/**
 * Coverage Calculator Module
 * Calculates coverage requirements based on area and threat level
 * Uses conservative approach for high-threat scenarios
 */

export interface CoverageRequirement {
  conservative: number  // Upper bound for critical/high-threat
  standard: number      // Average for standard scenarios
  recommended: number   // Recommended value based on threat level
}

const COVERAGE_MAP: Record<CoverageArea, { conservative: number; standard: number }> = {
  "0-5km": { conservative: 5, standard: 2.5 },
  "5-15km": { conservative: 15, standard: 10 },
  "15-50km": { conservative: 50, standard: 32.5 },
  "50km-plus": { conservative: 100, standard: 75 } // Cap at 100km for realistic calculations
}

/**
 * Determines if a threat level requires conservative coverage
 */
function requiresConservativeCoverage(threatLevel: ThreatLevel): boolean {
  const highThreatLevels: ThreatLevel[] = [
    "multi-threat",
    "perimeter-security",
    "surveillance-monitoring" // 24/7 surveillance needs continuous coverage
  ]
  return highThreatLevels.includes(threatLevel)
}

/**
 * Calculates coverage requirement based on area and threat level
 */
export function calculateCoverageRequirement(
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel
): CoverageRequirement {
  const coverage = COVERAGE_MAP[coverageArea]
  
  const useConservative = requiresConservativeCoverage(threatLevel)
  const recommended = useConservative ? coverage.conservative : coverage.standard
  
  return {
    conservative: coverage.conservative,
    standard: coverage.standard,
    recommended
  }
}

/**
 * Gets the recommended coverage value in km
 */
export function getRecommendedCoverage(
  coverageArea: CoverageArea,
  threatLevel: ThreatLevel
): number {
  const requirement = calculateCoverageRequirement(coverageArea, threatLevel)
  return requirement.recommended
}
