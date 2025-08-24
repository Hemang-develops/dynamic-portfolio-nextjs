"use client";

import { motion, useAnimation, useReducedMotion } from "framer-motion";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Type = "Frontend" | "Backend" | "Cloud & DevOps" | "Tooling";

const SKILLS_BY_TYPE: Record<Type, string[]> = {
  Frontend: [
    "React",
    "Next.js",
    "Angular",
    "TypeScript",
    "TailwindCSS",
    "RxJS",
  ],
  Backend: ["Node.js", "Express", "Python", "Django"],
  "Cloud & DevOps": ["GCP", "Cloud Functions", "Pub/Sub", "Secret Manager"],
  Tooling: ["Git / GitHub", "Jira"],
};

/** Ensure the list is long enough to cover width comfortably */
function buildDense(skills: string[], minCount = 10) {
  const out: string[] = [];
  while (out.length < Math.max(minCount, skills.length * 4))
    out.push(...skills);
  return out;
}

function MarqueeRowFM({
  label,
  skills,
  reverse = false,
  speed = 60, // seconds to traverse one full track width
}: {
  label: string;
  skills: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackARef = useRef<HTMLDivElement | null>(null);
  const controlsA = useAnimation();
  const controlsB = useAnimation();
  const [trackWidth, setTrackWidth] = useState(0);

  const dense = useMemo(() => buildDense(skills), [skills]);

  // measure width after paint
  const measure = useCallback(() => {
    if (!containerRef.current || !trackARef.current) return;
    const w = trackARef.current.scrollWidth; // width of one track (dense skills once)
    setTrackWidth(w);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, dense]);

  useEffect(() => {
    if (prefersReduced || !trackWidth) {
      controlsA.stop();
      controlsB.stop();
      return;
    }

    const dir = reverse ? 1 : -1;
    const distance = trackWidth; // move exactly one track width
    const duration = speed; // seconds

    // Start both tracks: A from 0 -> -distance, B from +distance -> 0 (or reversed)
    const start = async () => {
      // reset instantly to starting positions
      await Promise.all([
        controlsA.set({ x: 0 }),
        controlsB.set({ x: dir * distance }),
      ]);

      // infinite loop
      while (true) {
        await Promise.all([
          controlsA.start({
            x: dir * -distance,
            transition: { duration, ease: "linear" },
          }),
          controlsB.start({
            x: 0,
            transition: { duration, ease: "linear" },
          }),
        ]);
        // swap roles by jumping instantly
        await Promise.all([
          controlsA.set({ x: 0 }),
          controlsB.set({ x: dir * distance }),
        ]);
      }
    };

    start();

    return () => {
      controlsA.stop();
      controlsB.stop();
    };
  }, [controlsA, controlsB, trackWidth, speed, reverse, prefersReduced]);

  return (
    <div
      className="relative w-full overflow-hidden py-12" // increased from py-8 → py-12 for breathing room
      ref={containerRef}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {/* Row label */}
      <div className="absolute -top-1.5 left-10 z-10 text-xl font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </div>

      {/* Track A */}
      <motion.div
        ref={trackARef}
        animate={controlsA}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-6 px-3"
        style={{ willChange: "transform" }}
      >
        {dense.map((s, i) => (
          <div
            key={`A-${s}-${i}`}
            className="shrink-0 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg text-white text-base md:text-lg font-medium whitespace-nowrap"
          >
            {s}
          </div>
        ))}
      </motion.div>

      {/* Track B (follows A) */}
      <motion.div
        animate={controlsB}
        className="absolute left-0 top-1/2 -translate-y-1/2 flex gap-6"
        style={{ willChange: "transform" }}
      >
        {dense.map((s, i) => (
          <div
            key={`B-${s}-${i}`}
            className="shrink-0 px-6 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg text-white text-base md:text-lg font-medium whitespace-nowrap"
          >
            {s}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-center mb-12">
          Skills
        </h2>

        <div className="space-y-10">
          <MarqueeRowFM
            label="Frontend"
            skills={SKILLS_BY_TYPE["Frontend"]}
            speed={50}
          />
          <MarqueeRowFM
            label="Backend"
            skills={SKILLS_BY_TYPE["Backend"]}
            speed={50}
            reverse
          />
          <MarqueeRowFM
            label="Cloud & DevOps"
            skills={SKILLS_BY_TYPE["Cloud & DevOps"]}
            speed={50}
          />
          <MarqueeRowFM
            label="Tooling"
            skills={SKILLS_BY_TYPE["Tooling"]}
            speed={50}
            reverse
          />
        </div>
      </div>

      {/* subtle bg blobs */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-10 left-8 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-8 right-8 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl" />
      </div>
    </section>
  );
}
