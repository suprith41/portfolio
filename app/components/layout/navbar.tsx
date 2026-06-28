"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

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
  const isCompactRef = useRef(false)
  const [activeItem, setActiveItem] = useState("Home")
  const isScrollingToRef = useRef(false)

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
        backgroundColor: compact ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.05)",
        borderColor: compact ? "#c8cdd5" : "#d1d5db",
        boxShadow: compact
          ? "0 8px 24px rgba(0,0,0,0.06)"
          : "none",
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
    <div className="fixed top-0 left-0 right-0 flex justify-center px-4 py-4 pointer-events-none" style={{ zIndex: 10005 }}>
      <nav
        ref={navRef}
        className="pointer-events-auto w-full max-w-fit flex items-center justify-center gap-4 md:gap-6 border bg-white/5 px-6 py-2 backdrop-blur-md relative"
        style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          borderColor: '#d1d5db',
          boxShadow: 'none',
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)',
        }}
      >
        {/* Corner bracket ticks — extend outside the border rectangle */}
        <div className="absolute pointer-events-none" style={{ top: '-6px', left: '-6px', width: '12px', height: '12px', borderTop: '1.5px solid #9ca3af', borderLeft: '1.5px solid #9ca3af' }} />
        <div className="absolute pointer-events-none" style={{ top: '-6px', right: '-6px', width: '12px', height: '12px', borderTop: '1.5px solid #9ca3af', borderRight: '1.5px solid #9ca3af' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '-6px', left: '-6px', width: '12px', height: '12px', borderBottom: '1.5px solid #9ca3af', borderLeft: '1.5px solid #9ca3af' }} />
        <div className="absolute pointer-events-none" style={{ bottom: '-6px', right: '-6px', width: '12px', height: '12px', borderBottom: '1.5px solid #9ca3af', borderRight: '1.5px solid #9ca3af' }} />

        {navItems.map((item, index) => {
          const isActive = activeItem === item.name && item.name !== "Home" && item.name !== "Projects"
          return (
            <div key={item.name} className="flex items-center gap-4 md:gap-6 relative">
              <button
                onClick={(e) => handleNavigation(item, e)}
                className={`cursor-pointer rounded-sm px-8 md:px-10 py-2 text-xs md:text-sm transition-all duration-200 relative z-10 ${
                  isActive
                    ? "text-orange-500"
                    : "text-zinc-700 hover:text-orange-500 hover:bg-white/10"
                }`}
                style={{
                  fontFamily: 'FunnelDisplay, sans-serif',
                  fontWeight: isActive ? 500 : 300,
                }}
              >
                {item.name}
              </button>
              {index < navItems.length - 1 && (
                <span className="text-zinc-400/80 text-[10px] relative z-10">•</span>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}
