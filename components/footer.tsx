"use client"

import { motion } from "framer-motion"

export function Footer() {
  const footerSections = [
    {
      title: "Products",
      links: ["Artemis", "Archer", "Iroko", "Duma", "Kallon"],
    },
    {
      title: "Company",
      links: ["About", "Leadership", "Careers", "Press"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Blog", "Support", "Contact"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.footer
      className="relative bg-gradient-to-b from-card to-background border-t border-border/50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-12 h-12 rounded-lg flex items-center justify-center border border-terra-silver/30 glow-pulse"
                style={{
                  backgroundImage: "linear-gradient(135deg, rgba(74, 144, 226, 0.2) 0%, rgba(46, 91, 186, 0.1) 100%)",
                }}
              >
                <span className="text-foreground font-black font-display">T</span>
              </motion.div>
              <span className="text-xl font-black text-foreground tracking-widest font-display">TERRA</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Protecting Africa's critical infrastructure with advanced autonomous defense systems.
            </p>
          </motion.div>

          {footerSections.map((section, sectionIndex) => (
            <motion.div key={section.title} variants={itemVariants} className="space-y-4">
              <h4 className="text-foreground font-semibold text-sm tracking-wide uppercase">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <motion.a
                      href="#"
                      className="group relative inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-all duration-300 text-sm rounded-lg hover:bg-primary/5"
                      whileHover={{ x: 4, scale: 1.02 }}
                    >
                      {link}
                      <motion.span
                        className="absolute bottom-0 left-0 h-px bg-primary"
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                      <motion.div
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-12"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        />

        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants} className="text-muted-foreground text-xs tracking-wide">
            © 2025 Terra Industries. All rights reserved.
          </motion.p>
          <motion.div
            className="flex gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="group relative inline-flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-primary transition-all duration-300 text-xs font-medium tracking-wide rounded-lg hover:bg-primary/5"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {social}
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
