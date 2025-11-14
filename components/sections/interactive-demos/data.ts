export interface SurveillanceSegment {
  label: string
  window: string
  objective: string
  telemetry: string[]
}

export interface CaseStudy {
  id: string
  title: string
  location: string
  narrative: string
  outcomes: string[]
  media: {
    image: string
    alt: string
  }
}

export const SURVEILLANCE_SEGMENTS: SurveillanceSegment[] = [
  {
    label: "Launch & Calibration",
    window: "00:00 - 00:45",
    objective: "Autonomous pre-flight checks, payload verification, and LTE/ArtemisOS sync.",
    telemetry: [
      "Iroko deploys in 90 seconds with thermal + EO payload",
      "ArtemisOS assigns multi-plant patrol route",
      "Encrypted LTE link established for live streaming"
    ]
  },
  {
    label: "Power Corridor Sweep",
    window: "00:45 - 03:00",
    objective: "Continuous orbit over four power plants sharing a single command center.",
    telemetry: [
      "Multi-spectral imagery contrasts heat signatures",
      "Pipeline and transmission lines scanned for anomalies",
      "Predictive alerts pushed to facility operators"
    ]
  },
  {
    label: "Border Extension",
    window: "03:00 - 05:30",
    objective: "Extended-range ISR along cross-border perimeter using LTE backhaul.",
    telemetry: [
      "100 km ISR bubble sustained with relay towers",
      "ArtemisOS correlation with Kallon tower feeds",
      "Auto-bookmark of suspicious ground movement"
    ]
  },
  {
    label: "Night Ops & Recovery",
    window: "05:30 - 08:00",
    objective: "Thermal-only mode, docking guidance, and battery swap automation.",
    telemetry: [
      "Thermal detection maintains sub-1s response time",
      "Fleet scheduler queues fresh Iroko units",
      "Mission log synced to Artemis Cloud archive"
    ]
  }
]

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "delta-power",
    title: "North Delta Power Corridor",
    location: "Nigeria • 4 Power Plants • 8-hour ISR loop",
    narrative:
      "Iroko UAVs protect $1.2B in hydroelectric infrastructure with continuous patrols that detect heat spikes, gas leaks, and perimeter breaches before they disrupt the grid.",
    outcomes: [
      "Cut outage investigations from 6 hours to 20 minutes",
      "Delivered 24/7 telemetry into ArtemisOS for predictive maintenance",
      "Approved for export across ECOWAS energy partners"
    ],
    media: {
      image: "/Iroko_UAV/Iroko_UAV .png",
      alt: "Iroko UAV monitoring hydroelectric corridor"
    }
  },
  {
    id: "south-border",
    title: "Southern Border Shield",
    location: "South Africa • 120 km corridor • Cross-border ISR",
    narrative:
      "A mesh of Iroko UAVs, Archer VTOLs, and Kallon towers closes blind spots along remote borderlands, coordinated by ArtemisOS with sub-second threat detection.",
    outcomes: [
      "Reduced manual patrols by 70% while increasing coverage",
      "Identified multi-target incursions with thermal + EO fusion",
      "Feeds archived in Artemis Cloud for joint task-force review"
    ],
    media: {
      image: "/archer_vtol/archer_vtol_1.png",
      alt: "Border ISR deployment with Terrahaptix fleet"
    }
  }
]

