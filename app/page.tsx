"use client"

import dynamic from "next/dynamic"
import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"

// ═══════════════════════════════════════════════════════════════════════════
// SECTION COMPONENTS - Commented out but kept for future use
// ═══════════════════════════════════════════════════════════════════════════

// Import critical above-the-fold sections
import { ProductHeroSection } from "@/components/sections/product-hero"
// import { WhoWeAreSection } from "@/components/sections/who-we-are-section"
import { ProductStackConfigurator } from "@/components/sections/product-stack-configurator"
import { WhoWeAreSection } from "@/components/sections/who-we-are-section"
import { ProductEcosystemSection } from "@/components/sections/product-ecosystem"
import { TextWrap } from "@/components/sections/text-wraps/text-wrap"
import { TEXT_WRAP_CONTENT } from "@/components/sections/text-wraps/data"
// IntegrationReadinessAssessment component kept for future use
// import { IntegrationReadinessAssessment } from "@/components/sections/integration-readiness-assessment/index"

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

const SectionFallback = ({ label }: { label: string }) => (
  <section className="py-24 text-center text-white/50">
    <p>{label}</p>
  </section>
)

const InteractiveDemosSection = dynamic(
  () => import("@/components/sections/interactive-demos").then(mod => ({ default: mod.InteractiveDemosSection })),
  { ssr: false, loading: () => <SectionFallback label="Preparing live demo…" /> }
)

const TechnicalSpecsDownloadSection = dynamic(
  () => import("@/components/sections/spec-download").then(mod => ({ default: mod.TechnicalSpecsDownloadSection })),
  { ssr: false, loading: () => <SectionFallback label="Loading spec resources…" /> }
)

const ConversionFooterSection = dynamic(
  () => import("@/components/sections/conversion-footer").then(mod => ({ default: mod.ConversionFooterSection })),
  { ssr: false, loading: () => <SectionFallback label="Opening engagement hub…" /> }
)

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

        {/* Section 1: Product Hero */}
        <ProductHeroSection />

        <TextWrap content={TEXT_WRAP_CONTENT.heroToWho} />

        {/* Section 2: Who We Are */}
        <WhoWeAreSection />

        <TextWrap content={TEXT_WRAP_CONTENT.whoToConfigurator} />

        {/* Section 3: Interactive Qualification Tools */}
        <ProductStackConfigurator />
        
        <TextWrap content={TEXT_WRAP_CONTENT.configuratorToEcosystem} />

        {/* Section 4: Product Ecosystem (Technical Depth) */}
        <ProductEcosystemSection />

        <TextWrap content={TEXT_WRAP_CONTENT.ecosystemToDemos} />

        {/* Section 5: Interactive Demos */}
        <InteractiveDemosSection />

        <TextWrap content={TEXT_WRAP_CONTENT.demosToSpecs} />

        {/* Section 6: Technical Specifications Download */}
        <TechnicalSpecsDownloadSection />

        <TextWrap content={TEXT_WRAP_CONTENT.specsToFooter} />

        {/* Section 7: Conversion Footer */}
        <ConversionFooterSection />

        {/* Footer */}
        <Footer />
      </main>
    </MobileLayout>
  )
}