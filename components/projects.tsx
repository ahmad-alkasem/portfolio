"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function Projects() {
  const { t, language } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "projects.telegram.title",
      description: "projects.telegram.description",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai-chat-assistant.jpg-XCgg5ZsCJDLprXkNSRW5oP5URsYpfi.jpeg",
      technologies: ["Telegram Bot API", "C#", "Gemini Integration", "AI"],
      link: "https://t.me/ChatGptAIAgentBot",
    },
    {
      title: "projects.medical.title",
      description: "projects.medical.description",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/arachnohealth-wEyi5rrSsvWhIoLkwC6jsbJOvRBknQ.png",
      technologies: ["ASP.NET Core", "MySQL", "Clean Architecture", "Hangfire", "AI"],
      link: "https://arachnohealth.com/",
    },
    {
      title: "projects.restaurant.title",
      description: "projects.restaurant.description",
      image: "/placeholder.svg?height=400&width=600",
      technologies: ["ASP.NET Core", "SQL Server", "CQRS", "MediatR", "Clean Architecture"],
    },
  ]

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

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("projects.title")}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{
                y: -10,
                transition: { duration: 0.2 },
              }}
              className="h-full"
            >
              <Card className="overflow-hidden border-none shadow-lg h-full flex flex-col">
                <div className="h-48 relative overflow-hidden group">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={t(project.title)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{t(project.title)}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 flex-1">{t(project.description)}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full gap-2 rounded-full"
                    onClick={() => (project.link ? window.open(project.link, "_blank") : null)}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {t("projects.details")}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
