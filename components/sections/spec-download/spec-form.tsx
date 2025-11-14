"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { SpecResource } from "./data"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-endpoints"

interface SpecFormProps {
  resource: SpecResource | null
  onClose: () => void
  isReducedMotion: boolean
}

export function SpecForm({ resource, onClose, isReducedMotion }: SpecFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
    interest: resource?.title ?? ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!resource) return

    setIsSubmitting(true)
    setStatus("idle")
    setError("")

    try {
      await apiClient.post(API_ENDPOINTS.INQUIRIES.LIST, {
        inquiryType: "tech-spec-download",
        fullName: formData.fullName,
        email: formData.email,
        phone: null,
        company: formData.company,
        role: formData.role,
        message: `Requested download: ${resource.title}`
      })
      setStatus("success")
      setTimeout(onClose, 3000)
    } catch (err: any) {
      setStatus("error")
      setError(err.response?.data?.message || "Unable to submit form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {resource && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#030712]/95 text-white p-8 shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: isReducedMotion ? 0 : 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6">
              <div className="text-xs uppercase tracking-[0.5rem] text-white/60 mb-2">Download</div>
              <h3 className="text-3xl font-black">{resource.title}</h3>
              <p className="text-white/70 text-sm mt-2">
                Enter your details to receive the {resource.format} via email.
              </p>
            </div>

            {status === "success" ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-3">✅</div>
                <div className="text-lg font-bold">Download link sent!</div>
                <p className="text-white/70 text-sm">
                  Check your inbox for access to {resource.title}.
                </p>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
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
                    <label className="text-xs uppercase tracking-widest text-white/50">Email</label>
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
                    <label className="text-xs uppercase tracking-widest text-white/50">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest text-white/50">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleChange("role", e.target.value)}
                      className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-white/50">Product Interest</label>
                  <input
                    type="text"
                    readOnly
                    value={resource.title}
                    className="w-full mt-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60"
                  />
                </div>

                {status === "error" && (
                  <div className="text-sm text-red-400">{error}</div>
                )}

                <div className="flex gap-4">
                  <button
                    type="button"
                    className="flex-1 rounded-2xl border border-white/20 py-3 text-sm font-semibold text-white/80 hover:bg-white/5"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <motion.button
                    type="submit"
                    className="flex-1 rounded-2xl bg-white text-slate-900 py-3 text-sm font-bold"
                    whileHover={!isReducedMotion && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Download Link"}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

