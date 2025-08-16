"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const bio =
    "I am a passionate Full Stack Developer with 4+ years of experience building scalable web applications using React, Angular, Node.js, and Python/Django. I thrive in crafting seamless user experiences, optimizing performance, and delivering robust solutions.";
  
  const highlights = [
    "Built and deployed 20+ full-scale projects across domains.",
    "Resolved 50+ critical issues in production with quick turnaround.",
    "Reduced codebase size by 15% through refactoring & optimization.",
    "Improved UX satisfaction scores by 10% in enterprise apps."
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-heading", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".about-bio", {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-bio",
          start: "top 85%",
        },
      });

      gsap.from(".highlight-item", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".highlight-item",
          start: "top 85%",
        },
      });

      gsap.from(".stats-card", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-card",
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-20 about-heading">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Bio + Highlights */}
          <div className="space-y-8 about-bio">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {bio}
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="highlight-item text-gray-600 dark:text-gray-300">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="relative stats-card">
            <div className="bg-white/90 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-10 shadow-lg">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">4+</div>
                  <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
                </div>

                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">20+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Projects Delivered</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Issues Resolved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">15%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Code Reduction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">UX Improvement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
