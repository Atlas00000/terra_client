import { Suspense } from "react"
import { SPEC_RESOURCES, SpecResource } from "./data"
import { SpecDownloadClient } from "./spec-download-client"

async function fetchSpecResources(): Promise<SpecResource[]> {
  return SPEC_RESOURCES
}

function SpecFallback() {
  return (
    <section className="py-24 text-center text-white/50">
      <p>Loading spec resources…</p>
    </section>
  )
}

export async function TechnicalSpecsDownloadSection() {
  const resources = await fetchSpecResources()
  return (
    <Suspense fallback={<SpecFallback />}>
      <SpecDownloadClient resources={resources} />
    </Suspense>
  )
}
"use client"

