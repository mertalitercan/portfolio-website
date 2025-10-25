"use client"
import { motion } from "framer-motion"

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["JavaScript", "TypeScript", "React.js", "HTML/CSS", "Tailwind CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "PHP", "Laravel", "Express.js", "RESTful APIs"],
    },
    {
      title: "Database",
      skills: ["MySQL", "PostgreSQL", "DynamoDB", "MongoDB", "Redis"],
    },
    {
      title: "Cloud & Tools",
      skills: ["AWS", "Docker", "Git", "GitHub Actions", "CI/CD", "Agile"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            My expertise and technical proficiencies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />

              <div className="relative bg-card border border-border/50 rounded-xl p-8 min-h-[240px] hover:border-primary/30 transition-all duration-300">
                <h3 className="text-xl font-semibold text-foreground mb-6">{category.title}</h3>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05,
                      }}
                      viewport={{ once: true }}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium bg-muted/50 text-muted-foreground rounded-lg border border-border/30 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
