"use client"

import type React from "react"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, Send, Instagram, Phone, CheckCircle, AlertCircle, Copy } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, type FormEvent, useRef } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendContactEmail } from "@/app/actions/email-actions"

export function Footer() {
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: "" })

    try {
      // Use the server action to send the email
      const result = await sendContactEmail(formData)

      if (result.success) {
        setStatus({
          type: "success",
          message: t("contact.form.successMessage") || "Message sent successfully!",
        })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error(result.text || "Failed to send message")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      setStatus({
        type: "error",
        message: t("contact.form.errorMessage") || "Failed to send message. Please try the direct email option below.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDirectEmail = () => {
    const subject = `Contact from Portfolio: ${formData.name}`
    const body = `Name: ${formData.name}
Email: ${formData.email}

Message:
${formData.message}`

    // Create a temporary link element
    const mailtoLink = document.createElement("a")
    mailtoLink.href = `mailto:ahmadalkasem371@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    mailtoLink.target = "_blank"
    mailtoLink.click()
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/ahmad-alkasem",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/ahmad-alkasem",
      label: "LinkedIn",
    },
    {
      icon: <Send className="h-5 w-5" />,
      url: "https://t.me/Eng_Ahmad_Alkasem",
      label: "Telegram",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      url: "https://wa.me/963994074680",
      label: "WhatsApp",
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      url: "https://www.instagram.com/ahmad_alkasem__",
      label: "Instagram",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:ahmadalkasem371@gmail.com",
      label: "Email",
    },
  ]

  return (
    <footer id="contact" className="relative bg-gray-900 text-white py-20">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("contact.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
        >
          <motion.div variants={item}>
            <h3 className="text-2xl font-bold mb-6">{t("contact.getInTouch")}</h3>
            <p className="text-gray-300 mb-8 max-w-md">{t("contact.description")}</p>

            <div className="flex items-center mb-4">
              <Mail className="h-5 w-5 mr-3 text-primary" />
              <span>ahmadalkasem371@gmail.com</span>
            </div>

            <div className="flex items-center mb-4">
              <Phone className="h-5 w-5 mr-3 text-primary" />
              <span>+963 994 074 680</span>
            </div>

            <div className="flex space-x-4 rtl:space-x-reverse mt-6">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gray-700 hover:border-primary hover:bg-primary/10 transition-colors"
                  onClick={() => window.open(link.url, "_blank")}
                  aria-label={link.label}
                >
                  {link.icon}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item}>
            <h3 className="text-2xl font-bold mb-6">{t("contact.form.title")}</h3>
            <form ref={formRef} className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm">
                    {t("contact.form.name")}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t("contact.form.namePlaceholder")}
                    className="bg-gray-800 border-gray-700 focus:border-primary"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    {t("contact.form.email")}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className="bg-gray-800 border-gray-700 focus:border-primary"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 text-sm">
                  {t("contact.form.message")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.messagePlaceholder")}
                  rows={4}
                  className="bg-gray-800 border-gray-700 focus:border-primary"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {status.type && (
                <Alert
                  className={`${
                    status.type === "success" ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
                  } border-none`}
                >
                  <div className="flex items-center gap-2">
                    {status.type === "success" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{status.message}</AlertDescription>
                  </div>
                </Alert>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  type="submit"
                  className="flex-1 gap-2 bg-primary hover:bg-primary/90 rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {t("contact.form.sending") || "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t("contact.form.submit")}
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 border-gray-700 hover:border-primary hover:bg-primary/10 rounded-full"
                  onClick={handleDirectEmail}
                >
                  <Mail className="h-4 w-4" />
                  {t("contact.form.directEmail") || "Send via Email"}
                </Button>

              </div>
            </form>
          </motion.div>
        </motion.div>

        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex justify-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Ahmad Alkasem. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
