import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ErrorBoundary } from "@/components/error-boundary"
import { QueryProvider } from "@/providers/query-provider"
import "./globals.css"

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: 'swap',
  variable: '--font-jetbrains'
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: 'swap',
  variable: '--font-orbitron'
})

export const metadata: Metadata = {
  title: "Terra Industries - Autonomous Defense Systems",
  description: "Protecting Africa's critical infrastructure with advanced autonomous defense technology",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className={`font-sans antialiased bg-background text-foreground`}>
        <QueryProvider>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
