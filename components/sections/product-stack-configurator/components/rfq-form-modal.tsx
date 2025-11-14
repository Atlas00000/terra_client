"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ProductRecommendation, FacilityType, ThreatLevel, CoverageArea } from "../utils/types"
import { apiClient } from "@/lib/api-client"
import { API_ENDPOINTS } from "@/lib/api-endpoints"

interface RfqFormModalProps {
  isOpen: boolean
  onClose: () => void
  recommendation: ProductRecommendation
  facilityType: FacilityType
  threatLevel: ThreatLevel
  coverageArea: CoverageArea
  animationSettings: any
  isReducedMotion: boolean
}

export function RfqFormModal({
  isOpen,
  onClose,
  recommendation,
  facilityType,
  threatLevel,
  coverageArea,
  animationSettings,
  isReducedMotion
}: RfqFormModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    budgetRange: "",
    timeline: "",
    requirements: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  // Generate product categories from recommendation
  const productCategories = recommendation.products.map(p => p.name).join(", ")
  const totalQuantity = recommendation.products.reduce((sum, p) => sum + p.quantity, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        country: formData.country,
        productCategory: productCategories,
        quantity: totalQuantity,
        budgetRange: formData.budgetRange || null,
        timeline: formData.timeline,
        requirements: formData.requirements || null,
        specifications: {
          facilityType,
          threatLevel,
          coverageArea,
          recommendedProducts: recommendation.products,
          responseTimes: recommendation.responseTimes
        }
      }

      await apiClient.post(API_ENDPOINTS.RFQ.LIST, payload)
      setSubmitStatus("success")
      
      // Reset form after 2 seconds
      setTimeout(() => {
        onClose()
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          country: "",
          budgetRange: "",
          timeline: "",
          requirements: ""
        })
        setSubmitStatus("idle")
      }, 2000)
    } catch (error: any) {
      setSubmitStatus("error")
      setErrorMessage(error.response?.data?.message || "Failed to submit RFQ. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (!isOpen) return null

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
              <h2 className="text-2xl font-bold text-foreground">Get Your Custom Quote</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Receive a detailed proposal within 24 hours
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
                <h3 className="text-2xl font-bold text-foreground mb-2">Quote Request Submitted!</h3>
                <p className="text-muted-foreground">
                  We'll send you a detailed proposal within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Pre-filled Configuration Summary */}
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <h3 className="text-sm font-semibold text-primary mb-2">Your Configuration</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Products:</strong> {productCategories}</p>
                    <p><strong>Total Quantity:</strong> {totalQuantity} units</p>
                    <p><strong>Coverage:</strong> {coverageArea}</p>
                  </div>
                </div>

                {/* Form Fields */}
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

                  <div>
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

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Budget Range</label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => handleChange("budgetRange", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select budget range</option>
                      <option value="<$100K">Less than $100K</option>
                      <option value="$100K-$500K">$100K - $500K</option>
                      <option value="$500K-$1M">$500K - $1M</option>
                      <option value="$1M+">$1M+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Timeline <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.timeline}
                    onChange={(e) => handleChange("timeline", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select timeline</option>
                    <option value="urgent">Urgent (&lt;3 months)</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="6-12months">6-12 months</option>
                    <option value="planning">Planning phase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Additional Requirements</label>
                  <textarea
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => handleChange("requirements", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about any specific requirements or constraints..."
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

                {/* Submit Button */}
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
                    {isSubmitting ? "Submitting..." : "Submit RFQ Request"}
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

