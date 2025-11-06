/**
 * Fallback News Data
 * 
 * Static news data used when the backend API is unavailable.
 * This ensures the site remains functional even if the backend is down.
 * 
 * Data structure matches the frontend format (FrontendNewsItem)
 */

import { FrontendNewsItem } from '../transformers/news-transformer';

/**
 * Featured news items (for company page slideshow)
 * 
 * These are the most important company news stories.
 * In production, these will be dynamically fetched from the backend.
 */
export const FALLBACK_NEWS: FrontendNewsItem[] = [
  {
    title: "Board Leadership",
    subtitle: "Royal & Military Command",
    content: "Strategic expansion of Terra Industries board with distinguished leadership from traditional and military sectors.",
    items: [
      {
        title: "Ooni of Ife Joins Board",
        description: "His Imperial Majesty, the Ooni of Ife, brings unparalleled traditional authority and continental vision to our board of directors.",
        details: [
          "Strategic guidance on African market expansion",
          "Cultural integration and traditional governance insights",
          "Pan-African partnerships and diplomatic relations",
          "Heritage preservation in modern defense technology"
        ],
        impact: "Strengthens our connection to traditional institutions while advancing modern defense capabilities across the continent."
      },
      {
        title: "Engineer Mansur Ahmed Joins as Director",
        description: "Former Nigerian Air Force combat pilot and aerospace engineer brings decades of military aviation expertise and tactical operations experience.",
        details: [
          "35+ years combat aviation experience",
          "Deep understanding of African defense needs",
          "Expertise in autonomous systems integration",
          "Strategic military-to-civilian technology transfer"
        ],
        impact: "Provides invaluable tactical and strategic insights for autonomous defense system development and deployment across challenging African terrains."
      },
      {
        title: "Ayoola Jolasinmi - Technical Director",
        description: "Renowned AI researcher and autonomous systems architect joins as Technical Director, leading our R&D initiatives.",
        details: [
          "PhD in Machine Learning and Robotics",
          "10+ years autonomous systems development",
          "Published researcher in AI ethics and safety",
          "Experience with large-scale deployment"
        ],
        impact: "Accelerates our ArtemisOS development and ensures world-class AI capabilities in our defense systems."
      }
    ]
  },
  {
    title: "South Africa Expansion",
    subtitle: "Strategic Market Entry",
    content: "Terra Industries successfully expands operations to South Africa, marking our second major market after Nigeria.",
    items: [
      {
        title: "Johannesburg Operations Center",
        description: "New 15,000 sq ft facility established in Johannesburg's tech corridor, serving Southern African markets.",
        details: [
          "State-of-the-art R&D laboratories",
          "Regional customer support center",
          "Parts and maintenance hub",
          "Training facility for local partners"
        ],
        impact: "Positions Terra Industries as the leading African defense technology provider with continent-wide presence."
      },
      {
        title: "Initial Orders Secured",
        description: "R450 million in initial contracts for critical infrastructure protection across mining and energy sectors.",
        details: [
          "25 Iroko UAV units for pipeline monitoring",
          "10 Archer VTOL systems for border security",
          "50 Kallon autonomous towers for perimeter defense",
          "Comprehensive ArtemisOS integration"
        ],
        impact: "Validates our technology in diverse African markets and establishes revenue base for further expansion."
      }
    ]
  },
  {
    title: "Innovation Leadership",
    subtitle: "Technology & AI Excellence",
    content: "Terra Industries demonstrates cutting-edge innovation in autonomous defense systems and AI-powered intelligence platforms.",
    items: [
      {
        title: "ArtemisOS Real-Time Capabilities",
        description: "Breakthrough demonstration of ArtemisOS processing 15,000+ simultaneous threat streams with <100ms latency.",
        details: [
          "Advanced computer vision AI models",
          "Real-time threat classification",
          "Autonomous decision-making under 1 second",
          "99.7% threat detection accuracy"
        ],
        impact: "Establishes Terra Industries as the leader in AI-powered defense systems, surpassing international competitors."
      },
      {
        title: "Autonomous Fleet Coordination",
        description: "Successfully demonstrated coordinated autonomous operations with 50+ units operating in swarm formation.",
        details: [
          "Multi-unit path planning and collision avoidance",
          "Distributed target acquisition",
          "Self-healing network communication",
          "Emergency failover protocols"
        ],
        impact: "Enables scalable defense solutions for large infrastructure projects and national security applications."
      }
    ]
  },
  {
    title: "$13 Billion Infrastructure Contract",
    subtitle: "Largest Deal in Company History",
    content: "Terra Industries secures landmark $13 billion contract for comprehensive critical infrastructure protection.",
    items: [
      {
        title: "Multi-Phase Deployment",
        description: "10-year contract covering oil and gas installations, power grids, transportation networks, and government facilities across West Africa.",
        details: [
          "Phase 1: 500 Iroko UAVs for pipeline monitoring (Years 1-3)",
          "Phase 2: 200 Archer VTOLs for rapid response (Years 2-5)",
          "Phase 3: 1,000 Kallon towers for perimeter security (Years 3-7)",
          "Phase 4: Regional command centers with ArtemisOS (Years 4-10)"
        ],
        impact: "Transforms Terra Industries into a major defense contractor and validates autonomous technology at unprecedented scale."
      },
      {
        title: "Technology Integration",
        description: "Comprehensive ArtemisOS integration across all assets with centralized threat intelligence and response coordination.",
        details: [
          "Unified command and control dashboard",
          "Predictive analytics for threat prevention",
          "Integration with existing security systems",
          "24/7 monitoring and support"
        ],
        impact: "Creates the world's largest autonomous defense network, protecting critical infrastructure across millions of square kilometers."
      }
    ]
  },
  {
    title: "Manufacturing Scale-Up",
    subtitle: "Production Capacity Expansion",
    content: "Major expansion of manufacturing capabilities to meet growing demand for autonomous defense systems.",
    items: [
      {
        title: "Upgraded Drone Factory",
        description: "New 50,000 sq ft advanced manufacturing facility in Lagos with 10x production capacity increase.",
        details: [
          "Automated assembly lines",
          "Quality control systems",
          "Component warehousing",
          "Final testing facilities"
        ],
        impact: "Enables production of 500+ units per month, supporting rapid deployment for major contracts."
      },
      {
        title: "Supply Chain Localization",
        description: "Strategic partnerships with African suppliers for 70% of components, reducing costs and lead times.",
        details: [
          "Local PCB manufacturing",
          "Battery production partnerships",
          "Aluminum extrusion facilities",
          "Optics and sensor assembly"
        ],
        impact: "Reduces dependence on imports, creates local jobs, and improves profit margins by 35%."
      }
    ]
  },
  {
    title: "Africa Industrialization",
    subtitle: "Leading Continental Manufacturing",
    content: "Terra Industries drives African industrialization through advanced manufacturing and technology transfer.",
    items: [
      {
        title: "Made in Africa Innovation",
        description: "Pioneering African-designed and manufactured defense technology, breaking dependence on foreign suppliers.",
        details: [
          "100% local R&D and design",
          "70% locally sourced components",
          "Training programs for local engineers",
          "Technology transfer to partner nations"
        ],
        impact: "Establishes Africa as a hub for advanced technology manufacturing, not just resource extraction."
      },
      {
        title: "Economic Impact",
        description: "Creating 2,000+ high-skill jobs and generating $500M+ in local economic activity annually.",
        details: [
          "Direct employment: 800+ engineers and technicians",
          "Supply chain jobs: 1,200+ workers",
          "Average salary 3x national average",
          "Skills development and training programs"
        ],
        impact: "Demonstrates that African companies can compete globally in high-technology sectors."
      }
    ]
  },
  {
    title: "Strategic Partnership",
    subtitle: "MilSat Communications Integration",
    content: "Terra Industries partners with MilSat Communications for satellite connectivity and global C2 capabilities.",
    items: [
      {
        title: "Satellite Integration",
        description: "Direct integration with MilSat's constellation for beyond-visual-range communications and data relay.",
        details: [
          "Low-latency satellite uplink/downlink",
          "Encrypted command and control",
          "Real-time telemetry and video streaming",
          "Global coverage including remote areas"
        ],
        impact: "Enables operations in areas without cellular/internet infrastructure, critical for pipeline and border monitoring."
      },
      {
        title: "Enhanced Capabilities",
        description: "Satellite connectivity unlocks new operational capabilities and market opportunities.",
        details: [
          "Continental-scale fleet management",
          "Real-time threat intelligence sharing",
          "Remote software updates and diagnostics",
          "Emergency communication backup"
        ],
        impact: "Positions our systems as the only African autonomous platform with true global reach."
      }
    ]
  }
];

/**
 * Get featured news (top 3-5 stories)
 */
export function getFeaturedNews(limit: number = 5): FrontendNewsItem[] {
  return FALLBACK_NEWS.slice(0, limit);
}

/**
 * Get news by category
 */
export function getNewsByCategory(category: string): FrontendNewsItem[] {
  return FALLBACK_NEWS.filter(news => 
    news.subtitle.toLowerCase().includes(category.toLowerCase())
  );
}

/**
 * Search news by title or content
 */
export function searchNews(query: string): FrontendNewsItem[] {
  const lowerQuery = query.toLowerCase();
  return FALLBACK_NEWS.filter(news => 
    news.title.toLowerCase().includes(lowerQuery) ||
    news.content.toLowerCase().includes(lowerQuery) ||
    news.subtitle.toLowerCase().includes(lowerQuery)
  );
}

