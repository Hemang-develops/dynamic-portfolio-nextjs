"use client";
import { motion } from "framer-motion";
import type { ExperienceContent } from "@portfolio-content/schema";

export default function ExperienceSection({
  data,
}: {
  data: ExperienceContent;
}) {
  return (
    <section
      id="experience"
      className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20"
    >
      <h2 className="text-4xl font-bold text-center mb-16">{data.heading}</h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div
          className="
    absolute 
    h-full w-1 rounded-full
    bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500
    left-8 md:left-1/2 md:-translate-x-1/2
  "
        />

        <div className="space-y-20">
          {data.items.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center 
      ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"} 
      justify-end
    `}
            >
              {/* Card */}
              <div className="w-5/6 md:w-1/2 px-4 md:px-8 flex justify-end">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 transition-transform text-left">
                  <h3 className="text-2xl font-semibold text-blue-400">
                    {exp.role}
                  </h3>
                  <p className="text-gray-300">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.period}</p>
                  <ul className="mt-4 text-gray-400 list-disc list-inside space-y-2">
                    {exp.points.map((desc, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                      >
                        {desc}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Connector Dot */}
              <div
                className="
    absolute 
    w-6 h-6 rounded-full shadow-lg border-2 border-white/30
    bg-gradient-to-r from-blue-500 to-purple-500
    left-8 md:left-1/2 md:-translate-x-1/2
  "
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
