"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Import critical above-the-fold sections
import { HeroSection } from "@/components/sections/hero-section"
import { WhoWeAreSection } from "@/components/sections/who-we-are-section"

// Lazy load below-the-fold sections for better performance
const LeadershipSection = dynamic(
  () => import('@/components/sections/leadership-section').then(mod => ({ default: mod.LeadershipSection })),
  { ssr: false }
)

const ProductEcosystemSection = dynamic(
  () => import('@/components/sections/product-ecosystem-section').then(mod => ({ default: mod.ProductEcosystemSection })),
  { ssr: false }
)

const InternationalSection = dynamic(
  () => import('@/components/sections/international-section').then(mod => ({ default: mod.InternationalSection })),
  { ssr: false }
)

const MobileLeadershipSlideshow = dynamic(
  () => import('@/components/mobile-leadership-slideshow').then(mod => ({ default: mod.MobileLeadershipSlideshow })),
  { ssr: false }
)

const MobileProductSlideshow = dynamic(
  () => import('@/components/mobile-product-slideshow').then(mod => ({ default: mod.MobileProductSlideshow })),
  { ssr: false }
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

        {/* International Expansion Section - Desktop Only */}
        {!isMobile && <InternationalSection />}

        <Footer />
      </main>
    </MobileLayout>
  )
}