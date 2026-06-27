"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import "./GooeyNav.css"

gsap.registerPlugin(ScrollToPlugin)

const navItems = [
  { name: "Projects", href: "/" },
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
]

// Shared flag so the page-in animation knows whether a transition overlay is
// already handling the reveal (avoids double-animation races that cause freezes).
let _isTransitioning = false

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  const filterRef = useRef<HTMLSpanElement>(null)
  const isCompactRef = useRef(false)
  const [activeItem, setActiveItem] = useState("Home")
  const isFirstRender = useRef(true)
  const isScrollingToRef = useRef(false)

  const activeIndex = navItems.findIndex((item) => item.name === activeItem)

  const noise = (n = 1) => n / 2 - Math.random() * n

  const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
    const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
    return [distance * Math.cos(angle), distance * Math.sin(angle)]
  }

  const createParticle = (i: number, t: number, d: [number, number], r: number) => {
    const rotate = noise(r / 10)
    const count = 15
    const colorsList = [1, 2, 3, 1, 2, 3, 1, 4]
    return {
      start: getXY(d[0], count - i, count),
      end: getXY(d[1] + noise(7), count - i, count),
      time: t,
      scale: 1 + noise(0.2),
      color: colorsList[Math.floor(Math.random() * colorsList.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    }
  }

  const makeParticles = (element: HTMLElement) => {
    const d: [number, number] = [90, 10]
    const r = 100
    const count = 15
    const animationTime = 600
    const timeVariance = 300
    const bubbleTime = animationTime * 2 + timeVariance
    element.style.setProperty('--time', `${bubbleTime}ms`)

    for (let i = 0; i < count; i++) {
      const t = animationTime * 2 + noise(timeVariance * 2)
      const p = createParticle(i, t, d, r)

      setTimeout(() => {
        const particle = document.createElement('span')
        const point = document.createElement('span')
        particle.classList.add('particle')
        particle.style.setProperty('--start-x', `${p.start[0]}px`)
        particle.style.setProperty('--start-y', `${p.start[1]}px`)
        particle.style.setProperty('--end-x', `${p.end[0]}px`)
        particle.style.setProperty('--end-y', `${p.end[1]}px`)
        particle.style.setProperty('--time', `${t}ms`)
        particle.style.setProperty('--scale', `${p.scale}`)
        particle.style.setProperty('--color', `var(--color-${p.color}, #f97316)`)
        particle.style.setProperty('--rotate', `${p.rotate}deg`)

        point.classList.add('point')
        particle.appendChild(point)
        element.appendChild(particle)

        setTimeout(() => {
          try {
            element.removeChild(particle)
          } catch {
            // Do nothing
          }
        }, t)
      }, 30)
    }
  }

  const updateEffectPosition = (element: HTMLElement) => {
    if (!navRef.current || !filterRef.current) return
    const containerRect = navRef.current.getBoundingClientRect()
    const pos = element.getBoundingClientRect()

    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
      opacity: "1",
    }
    Object.assign(filterRef.current.style, styles)
  }

  useEffect(() => {
    if (!navRef.current) return
    const buttons = navRef.current.querySelectorAll('button')
    const activeEl = buttons[activeIndex]

    if (activeEl) {
      updateEffectPosition(activeEl as HTMLElement)
      if (filterRef.current) {
        filterRef.current.style.opacity = "1"
      }
      if (!isFirstRender.current) {
        if (filterRef.current) {
          const particles = filterRef.current.querySelectorAll('.particle')
          particles.forEach((p) => filterRef.current?.removeChild(p))
          makeParticles(filterRef.current)
        }
      } else {
        isFirstRender.current = false
      }
    } else {
      if (filterRef.current) {
        filterRef.current.style.opacity = "0"
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      const currentButtons = navRef.current?.querySelectorAll('button')
      const currentActiveEl = currentButtons?.[activeIndex]
      if (currentActiveEl) {
        updateEffectPosition(currentActiveEl as HTMLElement)
      }
    })

    resizeObserver.observe(navRef.current)
    return () => resizeObserver.disconnect()
  }, [activeIndex])

  // ── Entrance animation ──────────────────────────────────────────
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
      )
    }
  }, [])

  // ── Compact on scroll ───────────────────────────────────────────
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const animateNav = (compact: boolean) => {
      gsap.to(nav, {
        y: compact ? -4 : 0,
        scale: compact ? 0.965 : 1,
        backgroundColor: compact ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)",
        borderColor: compact ? "rgba(255,255,255,0.34)" : "rgba(255,255,255,0.20)",
        boxShadow: compact
          ? "0 10px 30px rgba(0,0,0,0.08)"
          : "0 4px 18px rgba(0,0,0,0.04)",
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      })
    }

    const updateNavOnScroll = () => {
      const shouldCompact = window.scrollY > 24
      if (shouldCompact === isCompactRef.current) return
      isCompactRef.current = shouldCompact
      animateNav(shouldCompact)
    }

    updateNavOnScroll()
    window.addEventListener("scroll", updateNavOnScroll, { passive: true })
    return () => window.removeEventListener("scroll", updateNavOnScroll)
  }, [])

  // ── Active item detection ───────────────────────────────────────
  useEffect(() => {
    if (pathname === "/about") {
      setActiveItem("About")
      return
    }
    if (pathname !== "/") {
      setActiveItem("")
      return
    }

    const updateActiveItem = () => {
      if (isScrollingToRef.current) return
      const workSection = document.querySelector('[data-section="work"]')
      if (!workSection) { setActiveItem("Home"); return }
      const rect = workSection.getBoundingClientRect()
      setActiveItem(rect.top <= 140 ? "Projects" : "Home")
    }

    updateActiveItem()
    window.addEventListener("scroll", updateActiveItem, { passive: true })
    window.addEventListener("resize", updateActiveItem)
    return () => {
      window.removeEventListener("scroll", updateActiveItem)
      window.removeEventListener("resize", updateActiveItem)
    }
  }, [pathname])

  // ── Page-in animation (fires on every pathname change) ──────────
  useEffect(() => {
    // Kill any leftover out-animation on <main> so we always start fresh
    gsap.killTweensOf("main")

    if (_isTransitioning) {
      // A navigate-with-transition call already set main to opacity:0 / y:50.
      // Just animate back in.
      _isTransitioning = false
      gsap.fromTo(
        "main",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: 0.05 }
      )
    } else {
      // Direct load / back-button: ensure main is visible immediately
      gsap.set("main", { y: 0, opacity: 1 })
    }
  }, [pathname])

  // ── Navigation helpers ──────────────────────────────────────────
  const navigateWithTransition = (href: string, afterPush?: () => void) => {
    if (_isTransitioning) return   // prevent double-clicks
    _isTransitioning = true

    gsap.to("main", {
      y: 40,
      opacity: 0,
      duration: 0.32,
      ease: "power2.in",
      onComplete: () => {
        router.push(href)
        if (afterPush) afterPush()
      },
    })
  }

  const scrollToTop = () => {
    isScrollingToRef.current = true
    const handleScrollComplete = () => {
      isScrollingToRef.current = false
    }

    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(0, { 
        duration: 1.2, 
        easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: handleScrollComplete
      })
      setTimeout(handleScrollComplete, 1300)
    } else {
      gsap.to(window, { 
        duration: 1.2, 
        scrollTo: { y: 0 }, 
        ease: "power3.inOut",
        onComplete: handleScrollComplete
      })
      setTimeout(handleScrollComplete, 1300)
    }
  }

  const scrollToWorkSection = () => {
    isScrollingToRef.current = true
    const handleScrollComplete = () => {
      isScrollingToRef.current = false
    }

    const workSection = document.querySelector('[data-section="work"]')
    if (!workSection) {
      isScrollingToRef.current = false
      return
    }
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(workSection as HTMLElement, { 
        offset: -100, 
        duration: 1.2, 
        easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: handleScrollComplete
      })
      setTimeout(handleScrollComplete, 1300)
    } else {
      gsap.to(window, { 
        duration: 1.2, 
        scrollTo: { y: workSection, offsetY: 100 }, 
        ease: "power3.inOut",
        onComplete: handleScrollComplete
      })
      setTimeout(handleScrollComplete, 1300)
    }
  }

  const handleNavigation = (item: typeof navItems[0], e: React.MouseEvent) => {
    e.preventDefault()

    if (item.name === "Projects") {
      setActiveItem("Projects")
      if (pathname === "/") {
        scrollToWorkSection()
      } else {
        isScrollingToRef.current = true
        navigateWithTransition("/", () => {
          setTimeout(scrollToWorkSection, 620)
        })
      }
    } else if (item.name === "About") {
      if (pathname === "/about") return   // already there
      setActiveItem("About")
      navigateWithTransition("/about")
    } else if (item.name === "Home") {
      setActiveItem("Home")
      if (pathname !== "/") {
        isScrollingToRef.current = true
        navigateWithTransition("/", () => {
          setTimeout(() => {
            isScrollingToRef.current = false
          }, 620)
        })
      } else {
        scrollToTop()
      }
    } else {
      if (pathname !== item.href) {
        navigateWithTransition(item.href)
      }
    }
  }

  return (
    <>
      {/* Hidden SVG Gooey Filter */}
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className="hidden" style={{ display: 'none' }}>
        <defs>
          <filter id="gooey-nav-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
          </filter>
        </defs>
      </svg>

      <div className="fixed top-0 left-0 right-0 flex justify-center px-4 py-4 pointer-events-none" style={{ zIndex: 10005 }}>
        <nav
          ref={navRef}
          className="pointer-events-auto w-full max-w-fit flex items-center justify-center gap-2 md:gap-3 rounded-lg border border-white/20 bg-white/12 px-3 py-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.04)] backdrop-blur-md relative"
          style={{
            backgroundColor: 'rgba(255,255,255,0.12)',
            borderColor: 'rgba(255,255,255,0.20)',
            boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
            WebkitBackdropFilter: 'blur(10px) saturate(115%)',
            backdropFilter: 'blur(10px) saturate(115%)',
          }}
        >
          {/* Gooey Sliding Highlight */}
          <span className="effect filter" ref={filterRef} />

          {navItems.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2 md:gap-3 relative">
              <button
                onClick={(e) => handleNavigation(item, e)}
                className={`cursor-pointer rounded-md px-5 md:px-6 py-1.5 text-xs md:text-sm transition-all duration-200 relative z-10 ${
                  activeItem === item.name
                    ? "text-white"
                    : "text-zinc-700 hover:text-orange-500 hover:bg-white/10"
                }`}
                style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
              >
                {item.name}
              </button>
              {index < navItems.length - 1 && (
                <span className="text-zinc-400/80 text-[10px] relative z-10">•</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </>
  )
}
