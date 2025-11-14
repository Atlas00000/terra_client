"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-endpoints"

interface InquiryModalProps {
  isOpen: boolean
  onClose: () => void
  inquiryType: "integration-consultation" | "product-comparison"
  prefillData?: {
    inquiryType: string
    message: string
  }
  animationSettings: any
  isReducedMotion: boolean
}

export function InquiryModal({
  isOpen,
  onClose,
  inquiryType,
  prefillData,
  animationSettings,
  isReducedMotion
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    message: prefillData?.message || ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const payload = {
        inquiryType: inquiryType === "integration-consultation" ? "integration" : "product-comparison",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        country: formData.country,
        message: formData.message,
        metadata: {
          source: "product-ecosystem",
          inquiryType: inquiryType
        }
      }

      await apiClient.post(API_ENDPOINTS.INQUIRIES.LIST, payload)
      setSubmitStatus("success")
      
      setTimeout(() => {
        onClose()
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          message: prefillData?.message || ""
        })
        setSubmitStatus("idle")
      }, 2000)
    } catch (error: any) {
      setSubmitStatus("error")
      setErrorMessage(error.response?.data?.message || "Failed to submit inquiry. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

  const title = inquiryType === "integration-consultation" 
    ? "Request Integration Consultation"
    : "Request Product Specifications"

  const description = inquiryType === "integration-consultation"
    ? "Get expert guidance on integrating our defense systems"
    : "Receive detailed product specifications for comparison"

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal */}
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl border border-border shadow-2xl"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={animationSettings}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-card transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {submitStatus === "success" ? (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={animationSettings}
              >
                <motion.div
                  className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                >
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Inquiry Submitted!</h3>
                <p className="text-muted-foreground">
                  Our team will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about your specific needs or questions..."
                  />
                </div>

                {submitStatus === "error" && (
                  <motion.div
                    className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 rounded-lg border-2 border-border text-foreground font-medium hover:bg-card transition-colors"
                    whileHover={!isReducedMotion ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isReducedMotion && !isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

