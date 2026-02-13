"use client"

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Reveal() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const scrollTriggerRef = useRef<any>(null)
  const maskId = 'reveal-mask'
  const [mounted, setMounted] = useState(false)
  const [initialCenter, setInitialCenter] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    // Calculate center position immediately
    if (typeof window !== 'undefined') {
      setInitialCenter({
        x: window.innerWidth / 2 - 100, // 100 = initialWidth / 2
        y: window.innerHeight / 2 - 50  // 50 = initialHeight / 2
      })
    }
  }, [])

  useEffect(() => {
    if (!mounted || !overlayRef.current || !svgRef.current || !rectRef.current) return

    // Initial mask size - small rectangle in the center
    const initialWidth = 200
    const initialHeight = 100
    
    const updateMask = (progress: number) => {
      if (!rectRef.current || !svgRef.current) return
      
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2
      
      // Calculate growing dimensions
      const maxDimension = Math.max(viewportWidth, viewportHeight) * 1.5
      const currentWidth = initialWidth + (maxDimension - initialWidth) * progress
      const currentHeight = initialHeight + (maxDimension - initialHeight) * progress
      
      // Update SVG size to match viewport exactly
      svgRef.current.setAttribute('width', String(viewportWidth))
      svgRef.current.setAttribute('height', String(viewportHeight))
      svgRef.current.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`)
      
      // Update rectangle position and size - centered
      // In SVG mask: white = visible, black = transparent
      // So black rectangle = transparent hole that reveals content
      const rectX = centerX - currentWidth / 2
      const rectY = centerY - currentHeight / 2
      
      rectRef.current.setAttribute('x', String(rectX))
      rectRef.current.setAttribute('y', String(rectY))
      rectRef.current.setAttribute('width', String(currentWidth))
      rectRef.current.setAttribute('height', String(currentHeight))
    }

    // Initialize - ensure it starts centered
    const initSVG = () => {
      if (!rectRef.current || !svgRef.current) return
      
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      svgRef.current.setAttribute('width', String(viewportWidth))
      svgRef.current.setAttribute('height', String(viewportHeight))
      svgRef.current.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`)
      
      // Set initial centered position immediately before any scroll
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2
      const initialX = centerX - initialWidth / 2
      const initialY = centerY - initialHeight / 2
      
      rectRef.current.setAttribute('x', String(initialX))
      rectRef.current.setAttribute('y', String(initialY))
      rectRef.current.setAttribute('width', String(initialWidth))
      rectRef.current.setAttribute('height', String(initialHeight))
    }
    
    // Initialize immediately
    initSVG()
    
    // Set initial state
    updateMask(0)

    // Wait a frame to ensure DOM is ready, then create scroll trigger
    const timeoutId = setTimeout(() => {
      // Calculate end point based on document height
      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        window.innerHeight * 2
      )
      
      // Create scroll animation
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: `+=${scrollHeight}`,
        scrub: 1,
        onUpdate: (self) => {
          updateMask(self.progress)
        }
      })

      // Refresh ScrollTrigger to ensure it's properly initialized
      ScrollTrigger.refresh()
    }, 100)

    // Handle resize
    const handleResize = () => {
      if (scrollTriggerRef.current) {
        const currentProgress = scrollTriggerRef.current.progress
        initSVG()
        updateMask(currentProgress)
        ScrollTrigger.refresh()
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener('resize', handleResize)
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [mounted])

  // Use useLayoutEffect to ensure center position is set before paint
  useLayoutEffect(() => {
    if (mounted && rectRef.current && typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2
      const initialWidth = 200
      const initialHeight = 100
      
      rectRef.current.setAttribute('x', String(centerX - initialWidth / 2))
      rectRef.current.setAttribute('y', String(centerY - initialHeight / 2))
    }
  }, [mounted])

  if (!mounted) return null

  const revealContent = (
    <>
      {/* SVG Mask - must be in DOM for mask to work */}
      <svg 
        ref={svgRef}
        width="100vw"
        height="100vh"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 10000,
        }}
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {/* White background = overlay stays visible */}
            <rect width="100%" height="100%" fill="white" />
            {/* Black rectangle = transparent hole that grows from center */}
            <rect
              ref={rectRef}
              x={initialCenter.x}
              y={initialCenter.y}
              width="200"
              height="100"
              fill="black"
            />
          </mask>
        </defs>
      </svg>
      
      {/* Reveal Overlay */}
      <div 
        ref={overlayRef}
        className="pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: '#f5f5f5',
          zIndex: 9999,
          mask: `url(#${maskId})`,
          WebkitMask: `url(#${maskId})`,
        }}
      />
    </>
  )

  // Render directly to body using portal to avoid any parent container issues
  return createPortal(revealContent, document.body)
}
