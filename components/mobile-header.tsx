"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { useMobileOptimization } from "@/hooks/use-mobile-optimization"
import { SearchModal } from "@/components/search/search-modal"

export function MobileHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { isMobile, getTouchSettings, getAnimationSettings } = useMobileOptimization()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20) // Lower threshold for mobile
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navItems = [
    { label: "Artemis", href: "/artemis" },
    { label: "Archer", href: "/archer" },
    { label: "Iroko", href: "/iroko" },
    { label: "Duma", href: "/duma" },
    { label: "Kallon", href: "/kallon" },
    { label: "Company", href: "/company" },
  ]

  const animationSettings = getAnimationSettings()
  const touchSettings = getTouchSettings()

  if (!isMobile) {
    return null // Use regular header on desktop
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50"
          : "bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-2 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <motion.div 
            className="flex items-center gap-1 cursor-pointer" 
            whileHover={{ scale: 1.05 }} 
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-6 h-6 rounded-md flex items-center justify-center border border-terra-silver/30 overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(46, 91, 186, 0.1) 100%)",
              }}
            >
              <Image
                src="/terra-logo.png"
                alt="Terra Industries Logo"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.span
              className="text-xs font-black text-foreground tracking-wide font-display hidden sm:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              TERRA
            </motion.span>
          </motion.div>
        </Link>

        {/* Horizontal Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-1 justify-center overflow-x-auto scrollbar-hide px-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 px-2 sm:px-3 py-1 rounded-md hover:bg-primary/10 whitespace-nowrap flex-shrink-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={touchSettings as React.CSSProperties}
            >
              {item.label}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-terra-steel-blue"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Search Icon Button */}
        <motion.button
          onClick={() => setIsSearchOpen(true)}
          className="flex-shrink-0 p-2 rounded-md hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
          whileTap={{ scale: 0.95 }}
          aria-label="Open search"
        >
          <Search className="h-5 w-5" />
        </motion.button>
      </div>

      {/* Scroll indicator */}
      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Search Modal */}
      <SearchModal 
        open={isSearchOpen} 
        onOpenChange={setIsSearchOpen} 
      />
    </motion.header>
  )
}
