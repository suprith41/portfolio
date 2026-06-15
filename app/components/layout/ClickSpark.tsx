"use client"

import { useEffect, useRef } from "react"

interface Spark {
  x: number
  y: number
  angle: number
  startTime: number
}

interface ClickSparkProps {
  sparkColor?: string
  sparkSize?: number
  sparkRadius?: number
  sparkCount?: number
  duration?: number
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out"
  extraScale?: number
}

function applyEasing(t: number, easing: string): number {
  switch (easing) {
    case "linear":      return t
    case "ease-in":     return t * t
    case "ease-in-out": return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    case "ease-out":
    default:            return t * (2 - t)
  }
}

export default function ClickSpark({
  sparkColor = "#ea6000",
  sparkSize = 14,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 500,
  easing = "ease-out",
  extraScale = 1,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Keep all animation state in refs so event handlers never go stale
  const sparksRef    = useRef<Spark[]>([])
  const rafRef       = useRef<number | null>(null)
  // Mirror props into refs so the draw loop always reads the latest value
  const propsRef     = useRef({ sparkColor, sparkSize, sparkRadius, duration, easing, extraScale, sparkCount })

  useEffect(() => {
    propsRef.current = { sparkColor, sparkSize, sparkRadius, duration, easing, extraScale, sparkCount }
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Size canvas to the full viewport ──────────────────────────────
    const syncSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    syncSize()
    window.addEventListener("resize", syncSize)

    // ── Draw loop ─────────────────────────────────────────────────────
    const draw = () => {
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      const { sparkColor, sparkSize, sparkRadius, duration, easing, extraScale } = propsRef.current
      const now = performance.now()

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed  = now - spark.startTime
        if (elapsed >= duration) return false

        const t       = elapsed / duration
        const eased   = applyEasing(t, easing)
        const dist    = eased * sparkRadius * extraScale
        const alpha   = 1 - eased
        const lineLen = sparkSize * (1 - eased * 0.5)

        const cos = Math.cos(spark.angle)
        const sin = Math.sin(spark.angle)
        const x2  = spark.x + cos * dist
        const y2  = spark.y + sin * dist
        const x1  = spark.x + cos * (dist - lineLen)
        const y1  = spark.y + sin * (dist - lineLen)

        ctx.save()
        ctx.globalAlpha  = alpha
        ctx.strokeStyle  = sparkColor
        ctx.lineWidth    = 2.5
        ctx.lineCap      = "round"
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
        ctx.restore()

        return true
      })

      if (sparksRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        rafRef.current = null
      }
    }

    // ── Click handler ─────────────────────────────────────────────────
    const handleClick = (e: MouseEvent) => {
      const { sparkCount } = propsRef.current
      const now = performance.now()

      for (let i = 0; i < sparkCount; i++) {
        sparksRef.current.push({
          x: e.clientX,
          y: e.clientY,
          angle: (2 * Math.PI * i) / sparkCount,
          startTime: now,
        })
      }

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("resize", syncSize)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, []) // run once – props are read via ref on every frame

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  )
}
