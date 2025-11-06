"use client"

import { Component, type ReactNode } from "react"
import { motion } from "framer-motion"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

/**
 * Error Boundary Component
 * Catches React errors and displays a fallback UI
 * Prevents the entire app from crashing
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    console.error('Error caught by boundary:', error, errorInfo)
    
    // Store error info in state
    this.setState({ errorInfo })
    
    // Send to Sentry error tracking
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_SENTRY_DSN) {
      const Sentry = require('@sentry/nextjs')
      Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack,
          },
        },
        tags: {
          errorBoundary: true,
        },
      })
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" 
              style={{
                backgroundImage: `
                  linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Error Icon */}
              <motion.div
                className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-destructive/30 bg-destructive/10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <svg
                  className="w-12 h-12 text-destructive"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </motion.div>

              {/* Error Message */}
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Something went wrong
              </motion.h2>

              <motion.p
                className="text-lg text-muted-foreground mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                We're sorry for the inconvenience. An unexpected error occurred while loading this component.
                Please try refreshing the page or contact support if the problem persists.
              </motion.p>

              {/* Error Details (Development Only) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <motion.details
                  className="mb-8 text-left bg-card border border-border rounded-lg p-4 max-w-xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-4 space-y-2">
                    <div className="text-xs">
                      <span className="font-semibold text-destructive">Error:</span>
                      <pre className="mt-1 p-2 bg-background rounded text-xs overflow-x-auto">
                        {this.state.error.message}
                      </pre>
                    </div>
                    {this.state.error.stack && (
                      <div className="text-xs">
                        <span className="font-semibold text-destructive">Stack:</span>
                        <pre className="mt-1 p-2 bg-background rounded text-xs overflow-x-auto max-h-40 overflow-y-auto">
                          {this.state.error.stack}
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.details>
              )}

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={this.handleReset}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Try again
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/90 transition-colors"
                >
                  Go to homepage
                </button>
              </motion.div>

              {/* Support Link */}
              <motion.p
                className="mt-6 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Need help?{' '}
                <a
                  href="mailto:support@terraindustries.com"
                  className="text-primary hover:underline"
                >
                  Contact Support
                </a>
              </motion.p>
            </motion.div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

