"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin)

const navItems = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Unplugged", href: "/unplugged" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Prevent hydration mismatch by waiting for client mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // Create the SVG displacement map for liquid glass effect
    const mapSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
        <radialGradient id="lensGradient">
          <stop offset="0%" stop-color="white" stop-opacity="0.8" />
          <stop offset="70%" stop-color="gray" stop-opacity="0.3" />
          <stop offset="85%" stop-color="black" stop-opacity="0.1" />
          <stop offset="100%" stop-color="white" stop-opacity="0.9" />
        </radialGradient>
        <rect width="1" height="1" fill="url(#lensGradient)" />
      </svg>
    `
    
    const encodedMap = encodeURIComponent(mapSvg)
    
    // Create and inject the filter SVG
    const filterSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    filterSvg.style.position = "fixed"
    filterSvg.style.top = "-10000px"
    filterSvg.innerHTML = `
      <defs>
        <filter id="liquid-lens" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">
          <feImage href="data:image/svg+xml;charset=utf-8,${encodedMap}" result="displacementMap" />
          <feDisplacementMap in="SourceGraphic" in2="displacementMap" scale="15" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="0.5" result="blurred" />
          <feMorphology operator="dilate" radius="1" in="blurred" result="expanded" />
          <feComposite in="expanded" in2="SourceGraphic" operator="over" />
        </filter>
      </defs>
    `
    
    document.body.appendChild(filterSvg)
    
    // Animate navbar entrance
    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { 
          y: -100, 
          opacity: 0,
          scale: 0.8
        },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.2
        }
      )
    }
    
    return () => {
      if (filterSvg && filterSvg.parentNode) {
        filterSvg.parentNode.removeChild(filterSvg)
      }
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

    if (item.name === "Work") {
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
    } else if (item.name === "Unplugged") {
      if (pathname === '/') {
        // Already on home, scroll to unplugged
        scrollToUnpluggedSection()
      } else {
        // Navigate to home and scroll to unplugged
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToUnpluggedSection()
          }, 500)
        })
      }
    } else if (item.name === "Contact") {
      if (pathname === '/') {
        // Already on home, scroll to contact
        scrollToContactSection()
      } else {
        // Navigate to home and scroll to contact
        navigateWithTransition('/', () => {
          setTimeout(() => {
            scrollToContactSection()
          }, 500)
        })
      }
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
                       document.querySelector('h2:contains("Works")') ||
                       // Try to find by text content
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

  const scrollToUnpluggedSection = () => {
    // Find unplugged section
    const unpluggedSection = document.querySelector('[data-section="unplugged"]') ||
                            // Try to find by text content containing "Unplugged"
                            Array.from(document.querySelectorAll('h2, h3')).find(el => 
                              el.textContent?.toLowerCase().includes('unplugged')
                            )?.closest('div')

    if (unpluggedSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: unpluggedSection,
          offsetY: 100
        },
        ease: "power2.inOut"
      })
    }
  }

  const scrollToContactSection = () => {
    // Find contact section
    const contactSection = document.querySelector('[data-section="contact"]') ||
                          // Try to find by text content containing "Ready to Collab" or "Contact"
                          Array.from(document.querySelectorAll('h2, h3')).find(el => 
                            el.textContent?.toLowerCase().includes('ready to collab') ||
                            el.textContent?.toLowerCase().includes('contact')
                          )?.closest('div')

    if (contactSection) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: {
          y: contactSection,
          offsetY: 50
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
    <div className="fixed top-0 left-0 right-0 flex justify-center p-4 pointer-events-none" style={{ zIndex: 10000 }}>
      <nav 
        ref={navRef}
        className={`flex items-center rounded-full py-2 relative transition-all duration-300 hover:shadow-lg pointer-events-auto ${
          isMounted 
            ? "gap-3 md:gap-6 px-4 md:px-6" 
            : "gap-6 px-6"
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'url(#liquid-lens) blur(2px)',
          border: '1px solid rgba(250, 250, 250, 0.2)',
          boxShadow: `
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.1),
            0 8px 24px rgba(0, 0, 0, 0.1)
          `
        }}
      >
        {navItems.map((item, index) => (
          <div key={item.name} className={`flex items-center ${
            isMounted ? "gap-3 md:gap-6" : "gap-6"
          }`}>
            <button
              onClick={(e) => handleNavigation(item, e)}
              className={`font-light transition-all duration-300 relative hover:text-orange-500 hover:scale-105 ${
                isMounted ? "text-sm md:text-md" : "text-md"
              } ${
                (pathname === item.href) ||
                (item.name === "Work" && pathname.startsWith('/works/')) ||
                (item.name === "Home" && pathname === '/')
                  ? "text-orange-500"
                  : (item.name === "Unplugged" && pathname.startsWith('/unplugged/'))
                    ? "text-orange-400"
                    : pathname.startsWith('/unplugged/')
                      ? "text-gray-300"
                      : "text-zinc-500"
              }`}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}
            >
              {item.name}
            </button>
            {index < navItems.length - 1 && (
              <span className={`text-zinc-300 ${
                isMounted ? "text-[6px] md:text-[8px]" : "text-[8px]"
              }`}>•</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  )
}