"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  const tags = ["Problem Solver", "Clean Code Advocate", "Performance Optimizer", "UX Enthusiast", "Innovation Driven"]

  return (
    <section id="about" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card>
            <CardContent className="p-8 py-8">
              <p className="text-lg mb-4">
                I'm a passionate full-stack developer with expertise in building modern web applications. With a strong
                foundation in both frontend and backend technologies, I create seamless, user-focused experiences that
                solve real-world problems.
              </p>
              <p className="text-lg mb-4">
                My approach combines clean code principles with innovative solutions, ensuring applications are not only
                functional but also maintainable and scalable.
              </p>
              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="outline"
                        className="text-sm px-4 py-1.5 border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 hover:scale-105 transition-all duration-200 cursor-default"
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
