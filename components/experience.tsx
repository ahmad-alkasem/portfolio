"use client"

import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function Experience() {
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: "experience.arachnoech.title",
      company: "Arachnoech",
      period: "experience.arachnoech.period",
      description: "experience.arachnoech.description",
      skills: ["ASP.NET Core", "MySQL", "Hangfire", "Clean Architecture", "DDD", "RBAC"],
    },
    {
      title: "experience.ulutech.title",
      company: "Ulutech",
      period: "experience.ulutech.period",
      description: "experience.ulutech.description",
      skills: ["ASP.NET Core", "SQL Server", "SignalR", "JWT", "Swagger"],
    },
    {
      title: "experience.bluebits.title",
      company: "Blue Bits Team",
      period: "experience.bluebits.period",
      description: "experience.bluebits.description",
      skills: ["Content Creation", "Education", "Technical Writing", "Review"],
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20Insights.jpg-vTWGPRj1AGVmJraurUBSP4XFAz8YIM.jpeg",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="experience" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("experience.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div variants={container} initial="hidden" animate={inView ? "show" : "hidden"} className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div key={index} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
                <Card className="overflow-hidden border-none shadow-lg">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {exp.image && (
                        <div className="md:w-1/3 h-64 relative">
                          <Image
                            src={exp.image || "/placeholder.svg"}
                            alt={t(exp.title)}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className={`p-6 md:p-8 ${exp.image ? "md:w-2/3" : "w-full"}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold">{t(exp.title)}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{exp.company}</p>
                          </div>
                          <p className="text-gray-500 dark:text-gray-500 mt-2 md:mt-0">{t(exp.period)}</p>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">{t(exp.description)}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
