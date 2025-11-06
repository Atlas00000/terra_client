/**
 * Static Product Fallback Data
 * 
 * Used when the backend API is unavailable or fails
 * Ensures the website remains functional even without backend connection
 */

import { ProductSpecification } from '@/types/api';

/**
 * Fallback product specifications
 * These match the seeded data in the backend
 */
export const FALLBACK_PRODUCTS: ProductSpecification[] = [
  {
    id: 'fallback-artemis',
    productName: 'Artemis',
    category: 'UAV',
    specifications: {
      platform: 'Fixed-Wing UAV',
      primaryRole: 'ISR (Intelligence, Surveillance, Reconnaissance)',
      maxAltitude: '25,000 ft',
      endurance: '24+ hours',
      range: '200 km',
      payload: '15 kg',
    },
    performanceMetrics: {
      maxSpeed: '150 km/h',
      cruiseSpeed: '90 km/h',
      climbRate: '5 m/s',
      serviceCell: '25,000 ft',
      windResistance: '45 km/h',
    },
    technicalDetails: {
      dimensions: {
        wingspan: '5.5m',
        length: '3.2m',
        height: '0.9m',
      },
      weight: {
        empty: '35 kg',
        maxTakeoff: '65 kg',
      },
      powerPlant: 'Electric propulsion system',
      launchMethod: 'Catapult or hand-launch',
      recoveryMethod: 'Parachute or net',
    },
    mediaGalleryIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-archer',
    productName: 'Archer',
    category: 'VTOL',
    specifications: {
      platform: 'Vertical Take-Off and Landing Aircraft',
      primaryRole: 'Tactical Transport & Logistics',
      maxAltitude: '15,000 ft',
      range: '400 km',
      payload: '500 kg',
      capacity: '4 personnel or cargo',
    },
    performanceMetrics: {
      maxSpeed: '250 km/h',
      cruiseSpeed: '180 km/h',
      hoverTime: '30 minutes',
      transitionTime: '< 3 seconds',
      verticalClimbRate: '8 m/s',
    },
    technicalDetails: {
      dimensions: {
        length: '8.5m',
        rotor_diameter: '12m',
        height: '3.5m',
      },
      weight: {
        empty: '1,200 kg',
        maxTakeoff: '2,000 kg',
      },
      powerPlant: 'Hybrid-electric propulsion',
      rotorConfiguration: 'Quad-tilt rotor',
      autonomy: 'Fully autonomous or piloted',
    },
    mediaGalleryIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-iroko',
    productName: 'Iroko',
    category: 'Armored Vehicle',
    specifications: {
      platform: '4x4 Tactical Armored Vehicle',
      primaryRole: 'Personnel Transport & Security',
      crew: '2 + 8 passengers',
      armor: 'STANAG Level 2/3',
      range: '800 km',
      fuelCapacity: '200L',
    },
    performanceMetrics: {
      maxSpeed: '120 km/h',
      acceleration: '0-60 km/h in 12s',
      climbGradient: '60%',
      fordingDepth: '1.2m',
      trenchCrossing: '1.5m',
    },
    technicalDetails: {
      dimensions: {
        length: '5.8m',
        width: '2.4m',
        height: '2.2m',
      },
      weight: {
        curb: '8,500 kg',
        gross: '12,000 kg',
      },
      engine: 'Turbocharged diesel 6-cylinder',
      transmission: 'Automatic 6-speed',
      suspension: 'Independent coil spring',
    },
    mediaGalleryIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-duma',
    productName: 'Duma',
    category: 'Armored Vehicle',
    specifications: {
      platform: '6x6 Mine-Resistant Vehicle',
      primaryRole: 'Force Protection & IED Defense',
      crew: '2 + 10 passengers',
      armor: 'STANAG Level 3/4',
      range: '600 km',
      blastProtection: 'V-shaped hull, mine resistant',
    },
    performanceMetrics: {
      maxSpeed: '100 km/h',
      acceleration: '0-60 km/h in 18s',
      climbGradient: '70%',
      fordingDepth: '1.5m',
      obstacleHeight: '0.6m',
    },
    technicalDetails: {
      dimensions: {
        length: '7.2m',
        width: '2.7m',
        height: '2.8m',
      },
      weight: {
        curb: '16,000 kg',
        gross: '22,000 kg',
      },
      engine: 'Turbocharged diesel V8',
      transmission: 'Automatic 8-speed',
      suspension: 'Heavy-duty independent',
    },
    mediaGalleryIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'fallback-kallon',
    productName: 'Kallon',
    category: 'Armored Vehicle',
    specifications: {
      platform: '4x4 Light Armored Patrol Vehicle',
      primaryRole: 'Reconnaissance & Border Patrol',
      crew: '2 + 4 passengers',
      armor: 'STANAG Level 1/2',
      range: '1,000 km',
      weaponMount: 'Optional turret ring',
    },
    performanceMetrics: {
      maxSpeed: '140 km/h',
      acceleration: '0-60 km/h in 9s',
      climbGradient: '65%',
      fordingDepth: '1m',
      turningRadius: '6m',
    },
    technicalDetails: {
      dimensions: {
        length: '5.2m',
        width: '2.2m',
        height: '2m',
      },
      weight: {
        curb: '6,500 kg',
        gross: '9,000 kg',
      },
      engine: 'Turbocharged diesel 4-cylinder',
      transmission: 'Manual/Automatic 5-speed',
      suspension: 'Independent with adjustable dampers',
    },
    mediaGalleryIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

/**
 * Get fallback product by name
 */
export function getFallbackProduct(productName: string): ProductSpecification | undefined {
  return FALLBACK_PRODUCTS.find(
    (p) => p.productName.toLowerCase() === productName.toLowerCase()
  );
}

/**
 * Get fallback products by category
 */
export function getFallbackProductsByCategory(category: string): ProductSpecification[] {
  return FALLBACK_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get all fallback products
 */
export function getAllFallbackProducts(): ProductSpecification[] {
  return [...FALLBACK_PRODUCTS];
}

