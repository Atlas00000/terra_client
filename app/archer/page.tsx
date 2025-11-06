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

// Lazy load Archer sections with threshold for mobile optimization
const ArcherHeroSection = dynamic(() => import("@/components/archer/archer-hero-section").then(mod => ({ default: mod.ArcherHeroSection })), {
  loading: () => <div className="h-screen bg-background" />,
  ssr: false
})

const ArcherCapabilitiesSection = dynamic(() => import("@/components/archer/archer-capabilities-section").then(mod => ({ default: mod.ArcherCapabilitiesSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArcherSpecificationsSection = dynamic(() => import("@/components/archer/archer-specifications-section").then(mod => ({ default: mod.ArcherSpecificationsSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const ArcherApplicationsSection = dynamic(() => import("@/components/archer/archer-applications-section").then(mod => ({ default: mod.ArcherApplicationsSection })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

const MobileArcherSlideshow = dynamic(() => import("@/components/mobile-archer-slideshow").then(mod => ({ default: mod.MobileArcherSlideshow })), {
  loading: () => <div className="h-96 bg-background" />,
  ssr: false
})

export default function ArcherPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  
  // Mobile optimization
  const { isMobile } = useMobileOptimization()
  
  // Fetch Archer product data from backend
  const { product, isLoading: isLoadingProduct, isFallback } = useProductCategory('Archer')
  
  // Track product view for analytics
  useTrackProductView('Archer', product?.id)

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

        {/* Archer Hero Section - Always visible */}
        <ArcherHeroSection product={product} />

        {/* Mobile: Combined Flight Capabilities & Technical Specifications Slideshow */}
        {isMobile ? (
          <MobileArcherSlideshow product={product} />
        ) : (
          <>
            {/* Desktop: Individual Sections */}
            <ArcherCapabilitiesSection product={product} />
            <ArcherSpecificationsSection product={product} />
          </>
        )}

        {/* Mission Applications Section */}
        <ArcherApplicationsSection product={product} />

        <Footer />
      </main>
    </MobileLayout>
  )
}
