"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import Kallon sections
import { KallonHeroSection } from "@/components/kallon/kallon-hero-section"
import { KallonApplicationsSection } from "@/components/kallon/kallon-applications-section"
import { KallonSpecificationsSection } from "@/components/kallon/kallon-specifications-section"
import { KallonIntelligenceSection } from "@/components/kallon/kallon-intelligence-section"
import { KallonSupportSection } from "@/components/kallon/kallon-support-section"

// Dynamic imports for mobile slideshows
const MobileKallonApplicationsSlideshow = dynamic(
  () => import("@/components/mobile-kallon-applications-slideshow").then(mod => ({ default: mod.MobileKallonApplicationsSlideshow })),
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
)

const MobileKallonSpecificationsSlideshow = dynamic(
  () => import("@/components/mobile-kallon-specifications-slideshow").then(mod => ({ default: mod.MobileKallonSpecificationsSlideshow })),
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
)

export default function KallonPage() {
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

        {/* Kallon Hero Section */}
        <KallonHeroSection />

        {/* Surveillance Applications Section */}
        {isMobile ? (
          <MobileKallonApplicationsSlideshow />
        ) : (
          <KallonApplicationsSection />
        )}

        {/* Technical Specifications Section */}
        {isMobile ? (
          <MobileKallonSpecificationsSlideshow />
        ) : (
          <KallonSpecificationsSection />
        )}

        {/* AI Intelligence Section */}
        <KallonIntelligenceSection />

        {/* Support & Integration Section */}
        <KallonSupportSection />

        <Footer />
      </main>
    </MobileLayout>
  )
}
