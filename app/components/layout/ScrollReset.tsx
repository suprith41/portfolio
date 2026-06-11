"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReset() {
  const pathname = usePathname()

  useEffect(() => {
    // Kill all active ScrollTriggers from the previous page before resetting scroll.
    // This prevents stale trigger callbacks from firing during the transition.
    ScrollTrigger.killAll()

    // Reset scroll position using Lenis if available, native otherwise.
    // Use two rAF ticks to let the new page DOM finish mounting.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const lenis = (window as any).__lenis
        if (lenis) {
          lenis.scrollTo(0, { immediate: true, force: true })
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }

        // Refresh ScrollTrigger after the DOM has settled for the new page
        setTimeout(() => {
          ScrollTrigger.refresh()
        }, 150)
      })
    })
  }, [pathname])

  return null
}
