"use client"

import { Header } from "@/components/header"
import { MobileHeader } from "@/components/mobile-header"
import { Footer } from "@/components/footer"
import { Loading } from "@/components/loading"
import { MobileLayout } from "@/components/mobile-layout"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { useProductCategory } from "@/hooks/use-product-category"
import { ProductDetailSkeleton } from "@/components/ui/product-skeleton"
import { useTrackProductView } from "@/hooks/use-track-event"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Lazy load Artemis sections with threshold for mobile optimization
const ArtemisHeroSection = dynamic(() => import("@/components/artemis/artemis-hero-section-v2").then(mod => ({ default: mod.ArtemisHeroSection })), {
  loading: () => <div className="h-screen bg-background" />,
  ssr: false
})

const ArtemisIntelligenceSection = dynamic(() => import("@/components/artemis/artemis-intelligence-section-v2").then(mod => ({ default: mod.ArtemisIntelligenceSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArtemisCapabilitiesSection = dynamic(() => import("@/components/artemis/artemis-capabilities-section-v2").then(mod => ({ default: mod.ArtemisCapabilitiesSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArtemisIntegrationSection = dynamic(() => import("@/components/artemis/artemis-integration-section-v2").then(mod => ({ default: mod.ArtemisIntegrationSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const MobileArtemisSlideshow = dynamic(() => import("@/components/mobile-artemis-slideshow").then(mod => ({ default: mod.MobileArtemisSlideshow })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

export default function ArtemisPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  
  // Mobile optimization
  const { isMobile } = useMobileOptimization()
  
  // Fetch Artemis product data from backend
  const { product, isLoading: isLoadingProduct, isFallback } = useProductCategory('Artemis')
  
  // Track product view for analytics
  useTrackProductView('Artemis', product?.id)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  if (showLoading) {
    return <Loading onComplete={handleLoadingComplete} />
  }
  
  // Show skeleton while product data loads
  if (isLoadingProduct) {
    return (
      <MobileLayout>
        <main className="min-h-screen bg-background text-foreground">
          {isMobile ? <MobileHeader /> : <Header />}
          <ProductDetailSkeleton />
          <Footer />
        </main>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout>
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        {isMobile ? <MobileHeader /> : <Header />}
        
        {/* Fallback data indicator (dev only) */}
        {isFallback && process.env.NODE_ENV === 'development' && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 text-center text-sm text-yellow-600 dark:text-yellow-400">
            Using fallback data - Backend API unavailable
          </div>
        )}

        {/* Artemis Hero Section - Always visible */}
        <ArtemisHeroSection product={product} />

        {/* Mobile: Combined AI Intelligence & System Integration Slideshow */}
        {isMobile ? (
          <MobileArtemisSlideshow product={product} />
        ) : (
          <>
            {/* Desktop: Individual Sections */}
            <ArtemisIntelligenceSection product={product} />
            <ArtemisCapabilitiesSection product={product} />
            <ArtemisIntegrationSection product={product} />
          </>
        )}

        <Footer />
      </main>
    </MobileLayout>
  )
}
