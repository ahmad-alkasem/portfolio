"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Server, Code, Layout, Wrench, Globe, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useState, useEffect } from "react"

export function Skills() {
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })

  // Track which skills have been animated
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, boolean>>({})

  // Reset animations when section is out of view
  useEffect(() => {
    if (!inView) {
      setAnimatedSkills({})
    }
  }, [inView])

  const skillCategories = [
    {
      title: "skills.backend.title",
      icon: <Server className="h-6 w-6 text-primary" />,
      skills: [
        { name: "C#", level: 95 },
        { name: "ASP.NET Core", level: 90 },
        { name: "Entity Framework Core", level: 85 },
        { name: "LINQ", level: 90 },
        { name: "SignalR", level: 80 },
      ],
    },
    {
      title: "skills.database.title",
      icon: <Database className="h-6 w-6 text-primary" />,
      skills: [
        { name: "SQL Server", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "Database Design", level: 85 },
        { name: "Query Optimization", level: 75 },
      ],
    },
    {
      title: "skills.architecture.title",
      icon: <Code className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Clean Architecture", level: 90 },
        { name: "Domain-Driven Design", level: 85 },
        { name: "OOP", level: 90 },
        { name: "Dependency Injection", level: 85 },
        { name: "CQRS", level: 80 },
      ],
    },
    {
      title: "skills.frontend.title",
      icon: <Layout className="h-6 w-6 text-primary" />,
      skills: [
        { name: "HTML", level: 75 },
        { name: "CSS", level: 70 },
        { name: "JavaScript", level: 75 },
      ],
    },
    {
      title: "skills.tools.title",
      icon: <Wrench className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Git", level: 85 },
        { name: "CI/CD", level: 75 },
        { name: "Postman", level: 85 },
        { name: "Hangfire", level: 80 },
      ],
    },
    {
      title: "skills.languages.title",
      icon: <Globe className="h-6 w-6 text-primary" />,
      skills: [
        { name: t("skills.languages.arabic"), level: 100 },
        { name: t("skills.languages.english"), level: 85 },
      ],
    },
    {
      title: "skills.telegram.title",
      icon: <Send className="h-6 w-6 text-primary" />,
      skills: [
        { name: "Telegram Bot API", level: 90 },
        { name: "ChatGPT Integration", level: 85 },
        { name: "Bot Development", level: 88 },
        { name: "User Experience Design", level: 80 },
      ],
    },
  ]

  // Trigger animations for visible skills
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        skillCategories.forEach((category, categoryIndex) => {
          category.skills.forEach((_, skillIndex) => {
            setTimeout(
              () => {
                const skillId = `${categoryIndex}-${skillIndex}`
                setAnimatedSkills((prev) => ({
                  ...prev,
                  [skillId]: true,
                }))
              },
              categoryIndex * 100 + skillIndex * 100,
            )
          })
        })
      }, 400)

      return () => clearTimeout(timer)
    }
  }, [inView])

  return (
    <section id="skills" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900/50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("skills.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="transition-all duration-300 hover:-translate-y-2">
              <Card className="border-none shadow-md h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-full bg-primary/10 mr-4">{category.icon}</div>
                    <h3 className="text-xl font-bold">{t(category.title)}</h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => {
                      const skillId = `${categoryIndex}-${skillIndex}`
                      const isAnimated = animatedSkills[skillId]

                      return (
                        <div key={skillIndex}>
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary rounded-full"
                              initial={{ width: "0%" }}
                              animate={{ width: isAnimated ? `${skill.level}%` : "0%" }}
                              transition={{
                                duration: 1,
                                ease: "easeOut",
                                delay: 0.1 * skillIndex,
                              }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
