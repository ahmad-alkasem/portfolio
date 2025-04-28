"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Send, Instagram, Phone } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { TypeAnimation } from "react-type-animation"

export function Hero() {
  const { t, language } = useLanguage()

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
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent -z-10"></div>

      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-300/10 dark:bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className={`md:w-1/2 ${language === "ar" ? "md:order-2" : "md:order-1"}`}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 variants={item} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block">{t("hero.greeting")}</span>
              <span className="text-primary block mt-2">{t("hero.name")}</span>
            </motion.h1>

            <motion.div variants={item} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6 h-12">
              {language === "en" ? (
                <TypeAnimation
                  sequence={[
                    ".NET Developer",
                    2000,
                    "Software Engineer",
                    2000,
                    "Clean Code Specialist",
                    2000,
                    "API & Backend Architect",
                    2000,
                    "Telegram Bot Developer",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                />
              ) : (
                <TypeAnimation
                  sequence={[
                    "مطور .NET ",
                    2000,
                    "مطور بوتات تيليجرام",
                    2000,
                    "مهندس برمجيات",
                    2000,
                    "متخصص في البرمجة النظيفة",
                    2000,
                    "مهندس واجهات برمجة التطبيقات والخلفية",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Number.POSITIVE_INFINITY}
                />
              )}
            </motion.div>

            <motion.p variants={item} className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
              {t("hero.description")}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2 rounded-full"
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
              >
                <Mail className="h-5 w-5" />
                {t("hero.contact")}
              </Button>

              <a href="/Ahmad_Alkasem_CV.pdf" download="Ahmad_Alkasem_CV.pdf">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 rounded-full"
                >
                  <ArrowDown className="h-5 w-5" />
                  {t("hero.resume")}
                </Button>
              </a>
              
            </motion.div>

            <motion.div variants={item} className="flex mt-8 gap-4 flex-wrap">
              {socialLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-gray-300 hover:border-primary hover:bg-primary/10 transition-colors"
                  onClick={() => window.open(link.url, "_blank")}
                  aria-label={link.label}
                >
                  {link.icon}
                </Button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={`md:w-1/2 ${language === "ar" ? "md:order-1" : "md:order-2"}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-blue-400/30 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-primary/50 backdrop-blur-sm">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-07-19_17-20-09.jpg-ytrdQRdre2dei1EVKMwjxstqAZ2NyS.jpeg"
                  alt="Ahmad Alkasem"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <span className="text-primary font-bold">C#</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-4 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <Send className="h-6 w-6 text-primary" />
                </div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-white dark:bg-gray-800 shadow-lg rounded-full p-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <span className="text-primary font-bold">.NET</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t("hero.scroll")}</span>
          <motion.div
            className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
