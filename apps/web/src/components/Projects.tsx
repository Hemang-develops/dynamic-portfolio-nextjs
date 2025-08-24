"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  cta?: { label: string; href: string };
  media: {
    type: "image" | "video";
    src: string;
    poster?: string; // for video
    alt?: string; // for image
  };
  featured?: boolean; // bigger block
};

const PROJECTS: Project[] = [
  {
    featured: true,
    title: "Dynamic Portfolio Platform",
    tagline: "Self-editable portfolio with 3D hero + admin",
    description:
      "A headless, layout-configurable portfolio system with an admin to publish live changes instantly. Includes 3D hero, templates, role-based content, and real-time previews.",
    tech: ["Next.js", "R3F", "Framer Motion", "Tailwind", "PostgreSQL"],
    cta: {
      label: "View live",
      href: "https://dynamic-portfolio-nextjs.vercel.app/",
    },
    media: {
      type: "video",
      src: "/projects/portfolio-hero-demo.mov",
      poster: "/projects/portfolio-hero-poster.png",
    },
  },
  {
    // featured: true,
    title: "iPhone 15 Pro Product Page (Clone)",
    tagline: "Apple-style product storytelling with scroll choreography",
    description:
      "A faithful, responsive recreation of Apple’s iPhone 15 pro page with sticky sections, motion-driven reveals, and premium product visuals. Built for smoothness and polish.",
    tech: ["React", "TailwindCSS", "Framer Motion / GSAP"],
    cta: { label: "View Live", href: "https://iphone-clone-inky.vercel.app/" },
    media: {
      type: "video",
      src: "/projects/iphone-clone.mov",
      poster: "/projects/iphone-clone.png",
    },
  },
  {
    title: "React Movie Store",
    tagline: "Streaming-style catalog with search, filters, and watchlists",
    description:
      "A sleek movie discovery app with dynamic routing, debounced search, genre filters, and persistent watchlists. Optimized for snappy loads and smooth transitions.",
    tech: ["React", "Next.js", "TailwindCSS", "Framer Motion", "TMDB API"],
    cta: { label: "View Live", href: "https://react-movie-store.vercel.app" },
    media: {
      type: "video",
      src: "/projects/react-movie-store.mov",
      poster: "/projects/react-movie-store.png",
    },
  },
  {
    title: "Angular E-commerce",
    tagline: "Full-featured shop: cart, checkout, product filters",
    description:
      "An Angular storefront with category filters, product detail pages, cart management, and responsive UI. Built with best practices for state, routing, and performance.",
    tech: ["Angular", "TypeScript", "RxJS", "SCSS"],
    cta: {
      label: "View Live",
      href: "https://angular-ecommerce-website.vercel.app",
    },
    media: {
      type: "image",
      src: "/projects/angular-ecommerce.png",
      alt: "Angular E-commerce UI",
    },
  },
  //   {
  //     title: "Job Role Form Engine",
  //     tagline: "Configurable form engine for enterprise workflows",
  //     description:
  //       "Angular-based dynamic form engine supporting 10+ input families, enum-driven rules, and role-wise attribute mapping with pristine UX and accessibility.",
  //     tech: ["Angular", "TypeScript", "RxJS", "SCSS"],
  //     cta: { label: "See Details", href: "#" },
  //     media: {
  //       type: "image",
  //       src: "/projects/form-engine-shot.png",
  //       alt: "Form Engine UI",
  //     },
  //   },
  //   {
  //     title: "GCP Secret Automation",
  //     tagline: "Secure secrets + notifications via Cloud Functions",
  //     description:
  //       "Automated secret creation/validation flows using Secret Manager, Pub/Sub, and Functions. Sends email/chat on valid/invalid access with audit logging.",
  //     tech: ["GCP", "Cloud Functions", "Secret Manager", "Pub/Sub", "Node.js"],
  //     cta: { label: "Read More", href: "#" },
  //     media: {
  //       type: "image",
  //       src: "/projects/gcp-automation.png",
  //       alt: "GCP Automation Diagram",
  //     },
  //   },
];

function ParallaxMedia({
  children,
  strength = 120,
}: {
  children: React.ReactNode;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <motion.div ref={ref} style={{ y }} className="relative w-full h-full">
      {children}
    </motion.div>
  );
}

function TechPill({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-gray-200 border border-white/20">
      {label}
    </span>
  );
}

function CaseStudy({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10; // rotateY
    const rx = (0.5 - py) * 8; // rotateX
    setTilt({ rx, ry });
  };
  const onLeave = () => setTilt({ rx: 0, ry: 0 });

  // --- VIDEO hover/focus control ---
  const handleMouseEnter = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  const handleFocus = () => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };
  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  // Optional: tap-to-play for touch devices
  const handleTouchStart = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (!videoRef.current) return;
    videoRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {});
  };
  const stop = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  };
  // optional: if tab hidden, stop video
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) stop();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <section
      className={[
        "relative py-16 md:py-24",
        project.featured ? "md:py-28" : "",
        "bg-gradient-to-br from-gray-950/0 via-black/0 to-gray-900/0",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto grid items-center gap-10 md:gap-14",
          project.featured
            ? "max-w-7xl md:grid-cols-2"
            : "max-w-6xl md:grid-cols-2",
          isEven ? "" : "md:[direction:rtl]", // flip columns visually
        ].join(" ")}
      >
        {/* MEDIA (no parallax, poster when idle) */}
        <div
          className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          onMouseEnter={play}
          onMouseLeave={stop}
          onFocus={play}
          onBlur={stop}
          // remove if you don't want tap-to-toggle on mobile
          onTouchStart={() => (isPlaying ? stop() : play())}
          tabIndex={0}
          aria-label={`${project.title} preview`}
        >
          {/* Poster image (visible when not playing) */}
          <img
            src={
              project.media.poster ??
              (project.media.type === "image" ? project.media.src : "")
            }
            alt={project.media.alt ?? project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
            loading="lazy"
            decoding="async"
          />

          {/* Video (crossfades in on hover) */}
          {project.media.type === "video" ? (
            <video
              ref={videoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                isPlaying ? "opacity-100" : "opacity-0"
              }`}
              muted
              loop
              playsInline
              preload="none" // don't fetch frames until hover
              // ensure we keep showing poster until it's actually playing
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              poster={project.media.poster}
            >
              <source src={project.media.src} />
            </video>
          ) : (
            // fallback for pure image projects
            <img
              src={project.media.src}
              alt={project.media.alt ?? project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* subtle gradient mask */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Content (unflip inner to keep text normal) */}
        <div className="md:[direction:ltr]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.05 * index }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{
              transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transformStyle: "preserve-3d",
            }}
            className={[
              "relative bg-white/10 backdrop-blur-lg border border-white/15",
              "rounded-2xl shadow-2xl p-6 md:p-10",
              project.featured ? "md:p-12" : "",
              "transition-transform will-change-transform",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl" />
            <div className="relative">
              <p className="text-sm md:text-base text-blue-300 tracking-wide mb-2">
                {project.tagline}
              </p>
              <h3
                className={[
                  "font-semibold text-blue-400",
                  project.featured
                    ? "text-3xl md:text-5xl"
                    : "text-2xl md:text-4xl",
                ].join(" ")}
              >
                {project.title}
              </h3>
              <p className="mt-4 text-gray-300 text-base md:text-lg">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full bg-white/10 text-xs md:text-sm text-gray-200 border border-white/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.cta && (
                <a
                  href={project.cta.href}
                  className="mt-8 inline-block px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow hover:shadow-lg transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.cta.label} →
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-16 md:py-24"
    >
      <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold text-center mb-6"
        >
          Projects
        </motion.h2>
        <p className="text-center text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16">
          Selected case studies with depth, motion and polish. Scroll to
          explore.
        </p>

        {/* Case studies */}
        <div className="space-y-8 md:space-y-16">
          {PROJECTS.map((p, i) => (
            <CaseStudy key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* subtle background accents */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute top-10 left-10 w-56 h-56 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-purple-600/10 blur-3xl" />
      </div>
    </section>
  );
}
