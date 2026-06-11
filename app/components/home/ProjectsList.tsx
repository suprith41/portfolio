"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"

/* ─────────────────────────────────────────────────────────────────
   DATA  — placeholder names & emojis; swap in real content later
───────────────────────────────────────────────────────────────── */

interface Project {
  id: number
  index: string
  client: string
  name: string
  year: string
  image?: string
  description: string
  emoji: string
  accent: string
  placeholderBg: string
  link?: string
  github?: string
}

const PROJECTS: Project[] = [
  {
    id: 1,
    index: "01",
    client: "AI Consulting Firm",
    name: "Cosmog",
    year: "2025",
    image: "/images/HomeImages/cosmog1.png",
    description:
      "Cosmog is your personal AI consultant. Answer 5 questions, get a specific diagnosis of exactly where your workflow breaks down and what to do about it.",
    emoji: "🔮",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    link: "https://cosmog-theta.vercel.app/",
    github: "https://github.com/suprith41/cosmog",
  },
  {
    id: 2,
    index: "02",
    client: "AI Wealth Tracking",
    name: "Rapidash",
    year: "2025",
    image: "/images/HomeImages/Rapidash.png",
    description:
      "Turn your broker PDF into a full portfolio dashboard. AI-powered parsing, health scoring, SIP recommendations and audit trails. Built for Indian retail investors.",
    emoji: "⚡",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #2d1b69 0%, #6b21a8 50%, #9333ea 100%)",
    github: "https://github.com/suprith41",
  },
  {
    id: 3,
    index: "03",
    client: "AI Consulting Firm",
    name: "Project C",
    year: "2024",
    image: undefined,
    description:
      "Placeholder description for Project C. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "🌿",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
    github: "https://github.com/suprith41",
  },
  {
    id: 4,
    index: "04",
    client: "AI Consulting Firm",
    name: "Project D",
    year: "2024",
    image: undefined,
    description:
      "Placeholder description for Project D. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "🧪",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)",
    github: "https://github.com/suprith41",
  },
  {
    id: 5,
    index: "05",
    client: "AI Consulting Firm",
    name: "Project E",
    year: "2023",
    image: undefined,
    description:
      "Placeholder description for Project E. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "🛠",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
    github: "https://github.com/suprith41",
  },
]

/* ─────────────────────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────────────────────── */

export default function ProjectsList() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(1000)

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"]
  })

  // Responsive split width: words move apart by 32% of container width on each side
  const maxTranslate = containerWidth * 0.32
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate])
  const xRight = useTransform(scrollYProgress, [0, 1], [0, maxTranslate])
  const lineScale = useTransform(scrollYProgress, [0.2, 0.95], [0, 1])
  const lineOpacity = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])

  return (
    <section className="relative w-full pt-8 pb-0 md:pt-12 md:pb-0">

      {/* ── Heading with Curated [Line] Projects layout and scroll‑in animation ── */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-full mb-12 md:mb-16 overflow-hidden h-16"
      >
        <motion.h2
          style={{ x: xLeft, fontFamily: "var(--font-playfair), serif", fontWeight: 400 }}
          className="text-2xl md:text-4xl leading-none tracking-tight text-gray-900 whitespace-nowrap z-10"
        >
          <span
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "1.15em",
              display: "inline-block",
              marginRight: "2px",
            }}
          >
            C
          </span>
          urated
        </motion.h2>

        {/* Animated line arising between them */}
        <motion.div
          className="absolute h-px bg-gray-300"
          style={{
            width: maxTranslate * 2,
            scaleX: lineScale,
            opacity: lineOpacity,
            left: "50%",
            x: "-50%",
            originX: 0.5,
          }}
        />

        <motion.h2
          style={{ x: xRight, fontFamily: "var(--font-playfair), serif", fontWeight: 400 }}
          className="text-2xl md:text-4xl leading-none tracking-tight text-gray-900 whitespace-nowrap z-10"
        >
          <span
            style={{
              fontFamily: "var(--font-great-vibes), cursive",
              fontSize: "1.15em",
              display: "inline-block",
              marginRight: "2px",
            }}
          >
            P
          </span>
          rojects
        </motion.h2>
      </div>


      {/* ── Project cards (alternating layout) ───────────────── */}
      <div className="flex flex-col gap-12 md:gap-16 max-w-7xl mx-auto">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            reversed={i % 2 !== 0}   /* even = text-left, odd = text-right */
          />
        ))}
      </div>

    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────
   PROJECT CARD  — alternating two-column layout
───────────────────────────────────────────────────────────────── */

interface CardProps {
  project: typeof PROJECTS[0]
  reversed: boolean
}

function ProjectCard({ project, reversed }: CardProps) {
  const [hovered, setHovered] = useState(false)

  const textBlock = (
    <div className="flex flex-col justify-between h-full p-8 md:p-12">
      {/* Top Section: Client + Title + Description */}
      <div>
        {/* Client / category label */}
        <motion.p
          className="text-[10px] uppercase tracking-[0.2em] mb-4 font-mono"
          style={{ fontFamily: "FunnelDisplay, sans-serif" }}
          animate={{
            color: hovered ? project.accent : "#9ca3af",
          }}
          transition={{ duration: 0.25 }}
        >
          {project.index} — {project.client}
        </motion.p>

        {/* Project name */}
        <h3
          className="text-2xl md:text-4xl leading-tight mb-5 text-gray-900"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm md:text-base text-gray-500 leading-relaxed max-w-md font-normal"
          style={{ fontFamily: "FunnelDisplay, sans-serif" }}
        >
          {project.description}
        </p>
      </div>

      {/* Bottom Section: GitHub + CTA Button */}
      <div className="flex items-end justify-between w-full mt-10 md:mt-16">
        {/* GitHub Button */}
        <motion.a
          href={project.github || "https://github.com/suprith41"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-wider font-normal bg-transparent"
          style={{ textDecoration: "none", fontFamily: "FunnelDisplay, sans-serif" }}
          animate={{
            backgroundColor: hovered ? "rgba(17, 24, 39, 0.05)" : "rgba(255, 255, 255, 0)",
            borderColor: hovered ? "#111827" : "rgba(229, 231, 235, 0.8)",
            color: hovered ? "#111827" : "#9ca3af",
          }}
          transition={{ duration: 0.2 }}
        >
          <Github size={14} />
          GitHub
        </motion.a>

        {/* CTA button (Rectangular outline style) */}
        <motion.a
          href={project.link || "#"}
          target={project.link ? "_blank" : undefined}
          rel={project.link ? "noopener noreferrer" : undefined}
          className="relative inline-flex items-center gap-2 border px-5 py-2.5 text-xs uppercase tracking-wider font-normal bg-transparent overflow-hidden"
          style={{ textDecoration: "none", fontFamily: "FunnelDisplay, sans-serif", isolation: "isolate" }}
          animate={{
            borderColor: hovered ? project.accent : "#111827",
            color: hovered ? "#ffffff" : "#111827",
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Orange Gradient Overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${project.accent} 0%, #ff8c3a 100%)`,
              zIndex: 0,
            }}
            animate={{
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <span className="relative z-10 flex items-center gap-2">
            View project
            <motion.span
              animate={{
                x: hovered ? 2 : 0,
                y: hovered ? -2 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ display: "inline-flex" }}
            >
              <ArrowUpRight size={14} />
            </motion.span>
          </span>
        </motion.a>
      </div>
    </div>
  )

  const imageBlock = (
    <div
      className={`w-full h-full min-h-[300px] md:min-h-full relative overflow-hidden bg-gray-50 flex items-stretch border-t md:border-t-0 border-gray-200/80 ${
        reversed ? "md:border-r" : "md:border-l"
      }`}
    >
      <div
        className="w-full h-full relative flex flex-col items-center justify-center min-h-[300px] md:min-h-full"
        style={{
          background: project.placeholderBg,
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(max-w-768px) 100vw, 50vw"
            className="object-cover select-none pointer-events-none"
            priority={project.id === 1}
          />
        ) : (
          /* Placeholder content */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 select-none">
            <span style={{ fontSize: 72, lineHeight: 1, display: "inline-block" }}>
              {project.emoji}
            </span>
            <span
              className="text-xs uppercase tracking-[0.2em] text-white/50"
              style={{ fontFamily: "FunnelDisplay, sans-serif" }}
            >
              Image coming soon
            </span>
          </div>
        )}

        {/* Subtle inner border */}
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
        />
      </div>
    </div>
  )

  return (
    <motion.div
      className="relative w-full overflow-hidden border bg-white rounded-2xl cursor-default md:h-[478px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        borderColor: hovered ? "rgba(0, 0, 0, 0.16)" : "rgba(229, 231, 235, 0.8)",
        boxShadow: hovered
          ? "0 30px 60px -20px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.015)"
          : "0 4px 20px -10px rgba(0, 0, 0, 0.02)",
      }}
      transition={{ duration: 0.4 }}
    >
      {/* Two-column grid — alternates on each row */}
      <div
        className={`grid grid-cols-1 md:grid-cols-[42%_58%] items-stretch gap-0 h-full ${
          reversed ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* direction:rtl flips column order; children use ltr so text stays normal */}
        <div className={reversed ? "[direction:ltr]" : ""}>
          {textBlock}
        </div>
        <div className={reversed ? "[direction:ltr]" : ""}>
          {imageBlock}
        </div>
      </div>
    </motion.div>
  )
}
