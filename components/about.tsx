"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function About() {
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      value: "2+",
      label: "about.stats.years",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      value: "5+",
      label: "about.stats.projects",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary" />,
      value: "500+",
      label: "about.stats.problems",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("about.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"}>
            <motion.p variants={item} className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              {t("about.description1")}
            </motion.p>
            <motion.p variants={item} className="text-lg text-gray-700 dark:text-gray-300 mb-12 leading-relaxed">
              {t("about.description2")}
            </motion.p>

            <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div key={index} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                  <Card className="border-none shadow-md overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-primary/10">{stat.icon}</div>
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-gray-600 dark:text-gray-400">{t(stat.label)}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
