"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
// import dynamic from "next/dynamic"

// ═══════════════════════════════════════════════════════════════════════════
// SECTION COMPONENTS - Commented out but kept for future use
// ═══════════════════════════════════════════════════════════════════════════

// Import critical above-the-fold sections
// import { HeroSection } from "@/components/sections/hero-section"
// import { WhoWeAreSection } from "@/components/sections/who-we-are-section"
import { ProductStackConfigurator } from "@/components/sections/product-stack-configurator"
import { IntegrationReadinessAssessment } from "@/components/sections/integration-readiness-assessment/index"

// Lazy load below-the-fold sections for better performance
// const LeadershipSection = dynamic(
//   () => import('@/components/sections/leadership-section').then(mod => ({ default: mod.LeadershipSection })),
//   { ssr: false }
// )

// const ProductEcosystemSection = dynamic(
//   () => import('@/components/sections/product-ecosystem-section').then(mod => ({ default: mod.ProductEcosystemSection })),
//   { ssr: false }
// )

// const InternationalSection = dynamic(
//   () => import('@/components/sections/international-section').then(mod => ({ default: mod.InternationalSection })),
//   { ssr: false }
// )

// const MobileLeadershipSlideshow = dynamic(
//   () => import('@/components/mobile-leadership-slideshow').then(mod => ({ default: mod.MobileLeadershipSlideshow })),
//   { ssr: false }
// )

// const MobileProductSlideshow = dynamic(
//   () => import('@/components/mobile-product-slideshow').then(mod => ({ default: mod.MobileProductSlideshow })),
//   { ssr: false }
// )

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  
  // Mobile optimization
  const { isMobile } = useMobileOptimization()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  if (showLoading) {
    return <Loading onComplete={handleLoadingComplete} />
  }

  return (
    <MobileLayout>
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        {/* Header / Navigation */}
        {isMobile ? <MobileHeader /> : <Header />}

        {/* ═══════════════════════════════════════════════════════════════════════════
            SECTIONS - Removed but components are available for future use:
            - HeroSection
            - WhoWeAreSection
            - LeadershipSection / MobileLeadershipSlideshow
            - ProductEcosystemSection / MobileProductSlideshow
            - InternationalSection
            ═══════════════════════════════════════════════════════════════════════════ */}

        {/* Section 2: Interactive Qualification Tools */}
        <ProductStackConfigurator />
        <IntegrationReadinessAssessment />

        {/* Footer */}
        <Footer />
      </main>
    </MobileLayout>
  )
}