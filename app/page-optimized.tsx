"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { MobileLeadershipSlideshow } from "@/components/mobile-leadership-slideshow"
import { MobileProductSlideshow } from "@/components/mobile-product-slideshow"
import { MobileExpansionSlideshow } from "@/components/mobile-expansion-slideshow"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"

// Import section components
import { HeroSection } from "@/components/sections/hero-section"
import { WhoWeAreSection } from "@/components/sections/who-we-are-section"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { ProductEcosystemSection } from "@/components/sections/product-ecosystem-section"
import { ManufacturingSection } from "@/components/sections/manufacturing-section"
import { InfrastructureSection } from "@/components/sections/infrastructure-section"
import { TechnologySection } from "@/components/sections/technology-section"
import { InternationalSection } from "@/components/sections/international-section"

import { useState, useEffect } from "react"

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
        {isMobile ? <MobileHeader /> : <Header />}

        {/* Hero Section */}
        <HeroSection />

        {/* Who We Are Section */}
        <WhoWeAreSection />

        {/* Leadership Excellence Section */}
        {!isMobile ? (
          <LeadershipSection />
        ) : (
          <MobileLeadershipSlideshow />
        )}

        {/* Product Ecosystem Section */}
        {!isMobile ? (
          <ProductEcosystemSection />
        ) : (
          <MobileProductSlideshow />
        )}

        {/* Manufacturing Excellence Section */}
        <ManufacturingSection />

        {/* Infrastructure Protection Section - Desktop Only */}
        {!isMobile && <InfrastructureSection />}

        {/* Technology Innovation Section - Desktop Only */}
        {!isMobile && <TechnologySection />}

        {/* International Expansion Section - Desktop Only */}
        {!isMobile && <InternationalSection />}

        <Footer />
      </main>
    </MobileLayout>
  )
}
