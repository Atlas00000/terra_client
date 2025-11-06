"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { SearchBar } from "@/components/search/search-bar"
import { SearchModal } from "@/components/search/search-modal"
import { Search as SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Company", href: "/company" },
    { label: "Artemis", href: "/artemis" },
    { label: "Archer", href: "/archer" },
    { label: "Iroko", href: "/iroko" },
    { label: "Duma", href: "/duma" },
    { label: "Kallon", href: "/kallon" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
          : "bg-background/80 backdrop-blur-sm"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/">
          <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
            <motion.div
              className="w-12 h-12 rounded-lg flex items-center justify-center border border-terra-silver/30 glow-pulse overflow-hidden"
              style={{
                backgroundImage: "linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(46, 91, 186, 0.1) 100%)",
              }}
              whileHover={{
                boxShadow: "0 0 30px rgba(74, 144, 226, 0.5)",
              }}
            >
              <Image
                src="/terra-logo.png"
                alt="Terra Industries Logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.span
              className="text-2xl font-black text-foreground tracking-widest font-display"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              TERRA INDUSTRIES
            </motion.span>
          </motion.div>
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              className="relative text-muted-foreground hover:text-primary transition-colors duration-300 font-medium text-sm tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
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
          
          {/* Search Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="relative hover:bg-primary/10"
              aria-label="Search"
            >
              <SearchIcon className="h-5 w-5" />
            </Button>
          </motion.div>
        </nav>

      </div>

      {isScrolled && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {/* Search Modal */}
      <SearchModal open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </motion.header>
  )
}
