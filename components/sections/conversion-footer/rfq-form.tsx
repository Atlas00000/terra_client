"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-endpoints"
import { PRODUCT_CATEGORIES, BUDGET_BANDS, TIMELINES } from "./data"

interface RfqFormProps {
  isReducedMotion: boolean
}

export function RfqForm({ isReducedMotion }: RfqFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    category: PRODUCT_CATEGORIES[0],
    budget: BUDGET_BANDS[0],
    timeline: TIMELINES[0],
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
      await apiClient.post(API_ENDPOINTS.RFQ.LIST, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        category: formData.category,
        budgetRange: formData.budget,
        timeline: formData.timeline,
        requirements: formData.message
      })
      setStatus("success")
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        category: PRODUCT_CATEGORIES[0],
        budget: BUDGET_BANDS[0],
        timeline: TIMELINES[0],
        message: ""
      })
    } catch (err: any) {
      setStatus("error")
      setError(err.response?.data?.message || "Unable to submit RFQ. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-black text-white">Request a Product Stack Quote</h3>
        <p className="text-white/70 text-sm">
          Tell us what infrastructure you are securing and the deployment window. Our team returns a scope & budget within 48 hours.
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
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Work Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Phone (optional)</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Company</label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Product Category</label>
          <select
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
          >
            {PRODUCT_CATEGORIES.map(category => (
              <option key={category} value={category} className="bg-slate-900">{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Budget Range</label>
          <select
            value={formData.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
          >
            {BUDGET_BANDS.map(band => (
              <option key={band} value={band} className="bg-slate-900">{band}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-white/50">Timeline</label>
          <select
            value={formData.timeline}
            onChange={(e) => handleChange("timeline", e.target.value)}
            className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
          >
            {TIMELINES.map(timeline => (
              <option key={timeline} value={timeline} className="bg-slate-900">{timeline}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-widest text-white/50">Mission Requirements</label>
        <textarea
          rows={4}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          placeholder="Describe coverage radius, infrastructure type, or compliance mandates..."
        />
      </div>

      {status === "error" && (
        <div className="text-sm text-red-400">{error}</div>
      )}

      {status === "success" && (
        <div className="text-sm text-green-400">Thanks! Our team will respond with a scoped quote.</div>
      )}

      <motion.button
        type="submit"
        className="w-full rounded-2xl bg-white text-slate-900 py-4 font-black tracking-wide"
        whileHover={!isReducedMotion && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending RFQ..." : "Request Custom Quote"}
      </motion.button>
    </motion.form>
  )
}

