"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin)

const navItems = [
  { name: "Projects", href: "/" },
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  const [activeItem, setActiveItem] = useState("Home")

  useEffect(() => {
    // Subtle entrance animation for a minimalist nav reveal.
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
      )
    }
  }, [])

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
      const workSection = document.querySelector('[data-section="work"]')
      if (!workSection) {
        setActiveItem("Home")
        return
      }

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

  const handleNavigation = (item: typeof navItems[0], e: React.MouseEvent) => {
    e.preventDefault()
    
    // Add click animation
    if (navRef.current) {
      gsap.to(navRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
    }

    if (item.name === "Projects") {
      setActiveItem("Projects")
      if (pathname === '/') {
        scrollToWorkSection()
      } else {
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToWorkSection()
          }, 500)
        })
      }
    } else if (item.name === "About") {
      setActiveItem("About")
      navigateWithTransition('/about')
    } else if (item.name === "Home") {
      setActiveItem("Home")
      if (pathname !== '/') {
        navigateWithTransition('/')
      } else {
        // Already on home, scroll to top
        scrollToTop()
      }
    } else {
      // Handle other navigation items
      if (pathname !== item.href) {
        navigateWithTransition(item.href)
      }
    }
  }

  const navigateWithTransition = (href: string, callback?: () => void) => {
    // Page transition out
    gsap.to("main", {
      y: 50,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        router.push(href)
        if (callback) callback()
      }
    })
  }

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: 0,
        offsetY: 0
      },
      ease: "power2.inOut"
    })
  }

  const scrollToWorkSection = () => {
    const workSection = document.querySelector('[data-section="work"]')

    if (workSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: workSection,
          offsetY: 100
        },
        ease: "power2.inOut"
      })
    }
  }

  // Page transition in effect
  useEffect(() => {
    gsap.fromTo("main", 
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1
      }
    )
  }, [pathname])
  
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center px-4 py-4 pointer-events-none" style={{ zIndex: 10005 }}>
      <nav
        ref={navRef}
        className="pointer-events-auto w-full max-w-fit flex items-center justify-center gap-1 rounded-full border border-white/20 bg-white/12 px-1.5 py-1 shadow-[0_4px_18px_rgba(0,0,0,0.04)] backdrop-blur-md"
        style={{
          WebkitBackdropFilter: 'blur(10px) saturate(115%)',
          backdropFilter: 'blur(10px) saturate(115%)'
        }}
      >
        {navItems.map((item, index) => (
          <div key={item.name} className="flex items-center gap-1">
            <button
              onClick={(e) => handleNavigation(item, e)}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs md:text-sm transition-all duration-200 ${
                activeItem === item.name
                  ? "bg-black/8 text-black"
                  : "text-zinc-500 hover:text-black hover:bg-white/10"
              }`}
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
            >
              {item.name}
            </button>
            {index < navItems.length - 1 && (
              <span className="text-zinc-300/70 text-[10px]">•</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}
