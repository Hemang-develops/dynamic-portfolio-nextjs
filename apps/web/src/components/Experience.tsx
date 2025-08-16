"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Full Stack Developer",
    company: "Tech Solutions Ltd.",
    period: "2022 – Present",
    description: "Built scalable apps with React, Next.js, Node.js & Django.",
  },
  {
    role: "Frontend Developer",
    company: "Innovate Labs",
    period: "2020 – 2021",
    description: "Created responsive UI components, boosted performance by 30%.",
  },
//   {
//     role: "Software Engineer Intern",
//     company: "Startup Hub",
//     period: "2019 – 2020",
//     description: "Assisted in Django apps, wrote tests, contributed to CI/CD.",
//   },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Experience</h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full rounded-full" />

        {/* Timeline Cards */}
        <div className="space-y-20">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative flex items-center ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Card */}
              <div className="w-1/2 px-8">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 transition-transform">
                  <h3 className="text-2xl font-semibold text-blue-400">
                    {exp.role}
                  </h3>
                  <p className="text-gray-300">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.period}</p>
                  <p className="mt-3 text-gray-400">{exp.description}</p>
                </div>
              </div>

              {/* Connector Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg border-2 border-white/30" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
