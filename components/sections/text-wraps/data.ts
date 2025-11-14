"use client"

export interface TextWrapContent {
  id: string
  eyebrow: string
  headline: string
  description: string
  metrics?: string[]
}

export const TEXT_WRAP_CONTENT: Record<string, TextWrapContent> = {
  heroToWho: {
    id: "hero-to-who",
    eyebrow: "Artemis Mesh",
    headline: "Command every autonomous layer from a single AI brain.",
    description:
      "ArtemisOS links Iroko ISR, Archer rapid response, Duma ground patrols, and Kallon towers—coordinating 1,000+ autonomous nodes with sub-second threat detection and 99.5% accuracy.",
    metrics: ["Sub-second detection", "99.5% accuracy", "1,000+ active nodes"]
  },
  whoToConfigurator: {
    id: "who-to-configurator",
    eyebrow: "Live Deployments",
    headline: "North Delta hydro, Southern border ISR, ECOWAS refineries—already online.",
    description:
      "Our Abuja-built fleet protects $13B+ in assets: four hydro plants, 120 km border corridors, and 15+ refineries and substations under continuous ArtemisOS command.",
    metrics: ["20 Iroko units/day", "$13B assets protected", "120 km ISR mesh"]
  },
  configuratorToEcosystem: {
    id: "configurator-to-ecosystem",
    eyebrow: "Engineer-Grade Outputs",
    headline: "The configurator feeds directly into Artemis Cloud playbooks.",
    description:
      "Facility archetypes, coverage thresholds, and product specs come straight from our deployment docs—so your recommended stack is ready for command software without rework.",
    metrics: ["Power plant • Substation • Border archetypes", "AES-256 / TLS 1.3 telemetry"]
  },
  ecosystemToDemos: {
    id: "ecosystem-to-demos",
    eyebrow: "Documented Case Study",
    headline: "Four hydro plants, zero outage events over 18 months.",
    description:
      "ArtemisOS detects heat spikes in under five minutes, dispatches Iroko + Archer, and archives every incident for ECOWAS auditors—the same telemetry you’ll preview in the demo.",
    metrics: ["<5 min detect-to-neutralize", "18+ months continuous ISR"]
  },
  demosToSpecs: {
    id: "demos-to-specs",
    eyebrow: "Download the Proof",
    headline: "Technical manuals, ROI Excel models, and live case studies.",
    description:
      "Access the ArtemisOS integration guide, stack deployment playbook, ROI analysis, hydro corridor case study, and Iroko performance charts—exactly the files our deployments use.",
    metrics: ["ArtemisOS guide (18 MB)", "Deployment playbook (24 MB)", "ROI Excel (4 MB)"]
  },
  specsToFooter: {
    id: "specs-to-footer",
    eyebrow: "Production Pipeline",
    headline: "RFQ in 48 hours. Demo stream from Abuja. Slots held on request.",
    description:
      "Whether you’re funded, piloting, or scoping, we align a strategist, schedule a live ArtemisOS feed, and lock in manufacturing capacity before the next run begins.",
    metrics: ["48h RFQ response", "Live command center demo", "Manufacturing slots reserved"]
  }
}

