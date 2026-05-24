"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin)

const navItems = [
  { name: "Projects", href: "/work" },
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Subtle entrance animation for a minimalist nav reveal.
    if (navRef.current) {
      gsap.fromTo(navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
      )
    }
  }, [])

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
      // Check if we're on a work page
      if (pathname.startsWith('/works/')) {
        // Navigate to home and scroll to work section
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToWorkSection()
          }, 500)
        })
      } else if (pathname === '/') {
        // Already on home, just scroll to work section
        scrollToWorkSection()
      } else {
        // Navigate to home and scroll to work
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToWorkSection()
          }, 500)
        })
      }
    } else if (item.name === "About") {
      navigateWithTransition('/about')
    } else if (item.name === "Home") {
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
    // Find work section and scroll to it
    const workSection = document.querySelector('[data-section="work"]') ||
                       document.querySelector('.gallery-wrapper') ||
                       Array.from(document.querySelectorAll('h2')).find(el =>
                         el.textContent?.toLowerCase().includes('work')
                       )?.parentElement

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
                (pathname === item.href) ||
                (item.name === "Projects" && pathname.startsWith('/works/')) ||
                (item.name === "Home" && pathname === '/')
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
