"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-endpoints"
import { THREAT_SCENARIOS, LEAD_PRIORITIES } from "./data"

interface InquiryFormProps {
  isReducedMotion: boolean
}

export function InquiryForm({ isReducedMotion }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    region: "",
    threatScenario: THREAT_SCENARIOS[0],
    priority: LEAD_PRIORITIES[0],
    infrastructure: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")
    setError("")
    try {
      await apiClient.post(API_ENDPOINTS.INQUIRIES.LIST, {
        inquiryType: "integration-inquiry",
        fullName: formData.fullName,
        email: formData.email,
        company: formData.company,
        metadata: {
          region: formData.region,
          threatScenario: formData.threatScenario,
          priority: formData.priority,
          infrastructure: formData.infrastructure
        },
        message: formData.message
      })
      setStatus("success")
      setFormData({
        fullName: "",
        email: "",
        company: "",
        region: "",
        threatScenario: THREAT_SCENARIOS[0],
        priority: LEAD_PRIORITIES[0],
        infrastructure: "",
        message: ""
      })
    } catch (err: any) {
      setStatus("error")
      setError(err.response?.data?.message || "Unable to submit inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl p-8 space-y-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-white">Talk to an Integration Strategist</h3>
        <p className="text-white/70 text-sm">
          We'll align your threat scenario, infrastructure scale, and executive priority to recommend the right deployment path.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Full Name</label>
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Work Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Region</label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => handleChange("region", e.target.value)}
            placeholder="e.g. ECOWAS, East Africa, Southern Africa"
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Threat Scenario</label>
          <select
            value={formData.threatScenario}
            onChange={(e) => handleChange("threatScenario", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
          >
            {THREAT_SCENARIOS.map(item => (
              <option key={item} value={item} className="bg-slate-900">{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Priority Level</label>
          <select
            value={formData.priority}
            onChange={(e) => handleChange("priority", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
          >
            {LEAD_PRIORITIES.map(item => (
              <option key={item} value={item} className="bg-slate-900">{item}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Infrastructure Scale</label>
          <input
            type="text"
            value={formData.infrastructure}
            onChange={(e) => handleChange("infrastructure", e.target.value)}
            placeholder="e.g. 4 power plants, 120km corridor"
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-white/50">Context</label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:ring-2 focus:ring-white/20"
          placeholder="Describe current operations, pain points, or technology stack…"
        />
      </div>

      {status === "error" && (
        <div className="text-sm text-red-400">{error}</div>
      )}

      {status === "success" && (
        <div className="text-sm text-green-400">Thanks! Our strategists will reach out shortly.</div>
      )}

      <motion.button
        type="submit"
        className="w-full rounded-2xl border border-white/30 py-4 text-sm font-bold text-white hover:bg-white/10"
        whileHover={!isReducedMotion && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit Inquiry"}
      </motion.button>
    </motion.form>
  )
}

