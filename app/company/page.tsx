"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import Company sections
import { CompanyExcellenceSection } from "@/components/company/company-excellence-section"
import { CompanyPartnershipsSection } from "@/components/company/company-partnerships-section"
import { CompanyMarketSection } from "@/components/company/company-market-section"
import { CompanyNewsSection } from "@/components/company/company-news-section"

// Dynamic imports for mobile slideshows
const MobileCompanyPartnershipsSlideshow = dynamic(
  () => import("@/components/mobile-company-partnerships-slideshow").then(mod => ({ default: mod.MobileCompanyPartnershipsSlideshow })),
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
)

const MobileCompanyMarketSlideshow = dynamic(
  () => import("@/components/mobile-company-market-slideshow").then(mod => ({ default: mod.MobileCompanyMarketSlideshow })),
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
)

const MobileCompanyNewsSlideshow = dynamic(
  () => import("@/components/mobile-company-news-slideshow").then(mod => ({ default: mod.MobileCompanyNewsSlideshow })),
  { 
    ssr: false,
    loading: () => <div className="h-96 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
)

export default function CompanyPage() {
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

        {/* Company Excellence Section */}
        <CompanyExcellenceSection />

        {/* Strategic Partnerships Section */}
        {isMobile ? (
          <MobileCompanyPartnershipsSlideshow />
        ) : (
          <CompanyPartnershipsSection />
        )}

        {/* Market Position Section */}
        {isMobile ? (
          <MobileCompanyMarketSlideshow />
        ) : (
          <CompanyMarketSection />
        )}

        {/* News & Achievements Section */}
        {isMobile ? (
          <MobileCompanyNewsSlideshow />
        ) : (
          <CompanyNewsSection />
        )}

        <Footer />
      </main>
    </MobileLayout>
  )
}
