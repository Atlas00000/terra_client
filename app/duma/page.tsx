"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import Duma sections
import { DumaHeroSection } from "@/components/duma/duma-hero-section"
import { DumaApplicationsSection } from "@/components/duma/duma-applications-section"
import { DumaSpecificationsSection } from "@/components/duma/duma-specifications-section"
import { DumaOperationsSection } from "@/components/duma/duma-operations-section"
import { DumaMarketSection } from "@/components/duma/duma-market-section"

// Dynamic imports for mobile slideshows
const MobileDumaApplicationsSlideshow = dynamic(
  () => import("@/components/mobile-duma-applications-slideshow").then(mod => ({ default: mod.MobileDumaApplicationsSlideshow })),
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
)

const MobileDumaSpecificationsSlideshow = dynamic(
  () => import("@/components/mobile-duma-specifications-slideshow").then(mod => ({ default: mod.MobileDumaSpecificationsSlideshow })),
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
)

export default function DumaPage() {
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

        {/* Duma Hero Section */}
        <DumaHeroSection />

        {/* Mission Applications Section */}
        {isMobile ? (
          <MobileDumaApplicationsSlideshow />
        ) : (
          <DumaApplicationsSection />
        )}

        {/* Technical Specifications Section */}
        {isMobile ? (
          <MobileDumaSpecificationsSlideshow />
        ) : (
          <DumaSpecificationsSection />
        )}

        {/* Operations Section */}
        <DumaOperationsSection />

        {/* Market Section */}
        <DumaMarketSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
