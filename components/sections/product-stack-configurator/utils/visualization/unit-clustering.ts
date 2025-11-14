import { UnitPosition, UnitCluster } from "./types"

/**
 * Unit Clustering Module
 * Groups units of the same type with slight offsets for better visualization
 */

const CLUSTER_RADIUS = 15 // Pixels - radius for clustering same-type units

/**
 * Clusters units by product type with offsets
 */
export function clusterUnits(units: UnitPosition[]): UnitCluster[] {
  const clusters: Map<string, UnitCluster> = new Map()
  
  // Group units by product type
  for (const unit of units) {
    const key = unit.productKey
    
    if (!clusters.has(key)) {
      // Create new cluster
      const cluster: UnitCluster = {
        productType: unit.productName,
        productKey: key,
        centerX: unit.x,
        centerY: unit.y,
        units: [],
        clusterRadius: CLUSTER_RADIUS
      }
      clusters.set(key, cluster)
    }
    
    const cluster = clusters.get(key)!
    
    // Calculate offset for this unit within the cluster
    const offset = calculateClusterOffset(cluster.units.length, CLUSTER_RADIUS)
    
    // Add unit to cluster with offset
    cluster.units.push({
      ...unit,
      x: unit.x + offset.x,
      y: unit.y + offset.y
    })
    
    // Update cluster center (average of all units)
    updateClusterCenter(cluster)
  }
  
  return Array.from(clusters.values())
}

/**
 * Calculates offset for a unit within a cluster
 * Uses circular pattern for even distribution
 */
function calculateClusterOffset(unitIndex: number, radius: number): { x: number; y: number } {
  if (unitIndex === 0) {
    // First unit at center
    return { x: 0, y: 0 }
  }
  
  // Distribute units in a small circle around cluster center
  const angle = (unitIndex * 2 * Math.PI) / Math.max(4, unitIndex + 1)
  const distance = radius * (0.3 + (unitIndex % 3) * 0.2) // Vary distance slightly
  
  return {
    x: distance * Math.cos(angle),
    y: distance * Math.sin(angle)
  }
}

/**
 * Updates cluster center to be the average of all unit positions
 */
function updateClusterCenter(cluster: UnitCluster): void {
  if (cluster.units.length === 0) return
  
  const sumX = cluster.units.reduce((sum, unit) => sum + unit.x, 0)
  const sumY = cluster.units.reduce((sum, unit) => sum + unit.y, 0)
  
  cluster.centerX = sumX / cluster.units.length
  cluster.centerY = sumY / cluster.units.length
}

/**
 * Gets cluster for a specific product type
 */
export function getClusterForProduct(
  clusters: UnitCluster[],
  productKey: string
): UnitCluster | undefined {
  return clusters.find(c => c.productKey === productKey)
}

/**
 * Checks if units should be clustered
 * For small quantities, clustering may not be necessary
 */
export function shouldClusterUnits(units: UnitPosition[]): boolean {
  // Cluster if we have multiple units of the same type
  const productCounts = new Map<string, number>()
  
  for (const unit of units) {
    const count = productCounts.get(unit.productKey) || 0
    productCounts.set(unit.productKey, count + 1)
  }
  
  // Cluster if any product has more than 1 unit
  return Array.from(productCounts.values()).some(count => count > 1)
}

