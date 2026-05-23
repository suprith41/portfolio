"use client"

import { useRef, useEffect } from 'react'

// ─── Bloom config ─────────────────────────────────────────────────────────────
const BLOOM = {
  radius:  140,                        // px — size of the color circle
  color:   'rgba(245, 244, 240, 0.75)', // neutral — removes the blue cast
}

export default function MouseColorBloom() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      el.style.setProperty('--mx', `${e.clientX}px`)
      el.style.setProperty('--my', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 2,
        background: `radial-gradient(circle ${BLOOM.radius}px at var(--mx, -500px) var(--my, -500px), ${BLOOM.color} 0%, transparent 100%)`,
        mixBlendMode: 'color',
      }}
    />
  )
}
