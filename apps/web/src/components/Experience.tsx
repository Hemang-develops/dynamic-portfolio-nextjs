"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Software Engineer",
    company: "Searce",
    period: "October 2024 – Present",
    description: [
      "Designed and implemented a dynamic Angular form engine supporting 10+ configurable input types",
      "Refactored duplicated UI logic into reusable components, reducing code duplication by 15%",
      "Built a role-based attribute mapping system using TypeScript enums and typed objects",
      "Developed a tab-based filtering interface with 4 to 6 filters per tab",
      "Integrated Google Cloud Functions with Secret Manager and Pub/Sub for automation",
    ],
  },
  {
    role: "Digital Specialist Engineer",
    company: "Infosys",
    period: "August 2021 - September 2024",
    description: [
      "Developed high-quality front-end code using ReactJS, Angular, HTML, CSS, and TypeScript",
      "Successfully delivered 20+ stories on time using Agile SDLC methodology",
      "Provided technical assistance and maintenance support for 50+ defects",
      "Utilized GitHub projects for effective tracking of 30+ user stories",
      "Collaborated with Jira to test 15+ new pages/features",
    ],
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
    <section
      id="experience"
      className="min-h-screen relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20"
    >
      <h2 className="text-4xl font-bold text-center mb-16">Experience</h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 h-full rounded-full" />

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
                  <ul className="mt-4 text-gray-400 list-disc list-inside space-y-2">
                    {exp.description.map((desc, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: idx * 0.2 }}
                        viewport={{ once: true }}
                        className={`relative flex items-center ${
                          idx % 2 === 0 ? "justify-start" : "justify-end"
                        }`}
                      >
                        <li key={i}>{desc}</li>
                      </motion.div>
                    ))}
                  </ul>
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
