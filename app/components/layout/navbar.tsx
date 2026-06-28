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
    <div className="fixed top-0 left-0 right-0 flex justify-center px-4 py-4 pointer-events-none" style={{ zIndex: 10005 }}>
      <nav
        ref={navRef}
        className="pointer-events-auto w-full max-w-fit flex items-center justify-center gap-4 md:gap-6 rounded-lg border border-white/20 bg-white/12 px-6 py-2 shadow-[0_4px_18px_rgba(0,0,0,0.04)] backdrop-blur-md relative"
        style={{
          backgroundColor: 'rgba(255,255,255,0.12)',
          borderColor: 'rgba(255,255,255,0.20)',
          boxShadow: '0 4px 18px rgba(0,0,0,0.04)',
          WebkitBackdropFilter: 'blur(10px) saturate(115%)',
          backdropFilter: 'blur(10px) saturate(115%)',
        }}
      >
        {navItems.map((item, index) => (
          <div key={item.name} className="flex items-center gap-4 md:gap-6 relative">
            <button
              onClick={(e) => handleNavigation(item, e)}
              className={`cursor-pointer rounded-md px-8 md:px-10 py-2 text-xs md:text-sm transition-all duration-200 relative z-10 ${
                activeItem === item.name
                  ? "text-orange-500"
                  : "text-zinc-700 hover:text-orange-500 hover:bg-white/10"
              }`}
              style={{
                fontFamily: 'FunnelDisplay, sans-serif',
                fontWeight: activeItem === item.name ? 500 : 300,
              }}
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
  )
}
