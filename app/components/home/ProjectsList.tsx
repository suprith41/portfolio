"use client"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

/* ─────────────────────────────────────────────────────────────────
   DATA  — placeholder names & emojis; swap in real content later
───────────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    id: 1,
    index: "01",
    client: "CLIENT · CATEGORY",
    name: "Project A",
    description:
      "Placeholder description for Project A. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "🔮",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    id: 2,
    index: "02",
    client: "CLIENT · CATEGORY",
    name: "Project B",
    description:
      "Placeholder description for Project B. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "⚡",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #2d1b69 0%, #6b21a8 50%, #9333ea 100%)",
  },
  {
    id: 3,
    index: "03",
    client: "CLIENT · CATEGORY",
    name: "Project C",
    description:
      "Placeholder description for Project C. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "🌿",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)",
  },
  {
    id: 4,
    index: "04",
    client: "CLIENT · CATEGORY",
    name: "Project D",
    description:
      "Placeholder description for Project D. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "🧪",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #ea580c 100%)",
  },
  {
    id: 5,
    index: "05",
    client: "CLIENT · CATEGORY",
    name: "Project E",
    description:
      "Placeholder description for Project E. This will be replaced with a real summary of the work, the problem it solved, and the impact it created.",
    emoji: "🛠",
    accent: "#f97316",
    placeholderBg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
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
    <section className="relative w-full pt-8 pb-20 md:pt-12 md:pb-32">

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
      <div className="flex flex-col gap-0">
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
    <div className="flex flex-col justify-center h-full py-4 md:py-0">
      {/* Client / category label */}
      <p
        className="text-[11px] uppercase tracking-[0.2em] mb-4 md:mb-5"
        style={{
          fontFamily: "FunnelDisplay, sans-serif",
          color: hovered ? project.accent : "#9ca3af",
          transition: "color 0.25s ease",
        }}
      >
        {project.index} — {project.client}
      </p>

      {/* Project name */}
      <h3
        className="text-3xl md:text-5xl leading-tight mb-5 md:mb-6"
        style={{
          fontFamily: "var(--font-playfair), serif",
          fontWeight: 700,
          color: hovered ? "#111827" : "#1f2937",
          transition: "color 0.25s ease",
          letterSpacing: "-0.01em",
        }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm md:text-base text-gray-500 leading-relaxed mb-8 md:mb-10 max-w-sm"
        style={{ fontFamily: "FunnelDisplay, sans-serif", fontWeight: 300 }}
      >
        {project.description}
      </p>

      {/* CTA button */}
      <motion.a
        href="#"
        className="inline-flex items-center gap-2 self-start"
        whileHover={{ x: 3 }}
        transition={{ duration: 0.2 }}
        style={{ textDecoration: "none" }}
      >
        <span
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium"
          style={{
            fontFamily: "FunnelDisplay, sans-serif",
            background: hovered ? "#111827" : "#1f2937",
            color: "#fff",
            transition: "background 0.25s ease",
            letterSpacing: "0.02em",
          }}
        >
          View case study
          <ArrowUpRight size={14} />
        </span>
      </motion.a>
    </div>
  )

  const imageBlock = (
    <motion.div
      className="relative w-full overflow-hidden"
      style={{
        borderRadius: 20,
        aspectRatio: "4/3",
        background: project.placeholderBg,
        cursor: "default",
      }}
      animate={{ scale: hovered ? 1.015 : 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Placeholder content — replace with <Image> later */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 select-none">
        <span style={{ fontSize: 72, lineHeight: 1 }}>{project.emoji}</span>
        <span
          className="text-xs uppercase tracking-[0.2em] text-white/50"
          style={{ fontFamily: "FunnelDisplay, sans-serif" }}
        >
          Image coming soon
        </span>
      </div>

      {/* Subtle inner border */}
      <div
        className="absolute inset-0 rounded-[20px]"
        style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)" }}
      />
    </motion.div>
  )

  return (
    <div
      className="relative py-14 md:py-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top divider */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{
          backgroundColor: hovered ? "rgba(249,115,22,0.3)" : "rgba(17,24,39,0.09)",
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Two-column grid — alternates on each row */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
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
    </div>
  )
}
