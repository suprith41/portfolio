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
  const borderSvgRef = useRef<SVGSVGElement>(null)
  const rectRef = useRef<SVGRectElement>(null)
  const borderRef = useRef<SVGRectElement>(null)
  const dotsRef = useRef<SVGGElement>(null)
  const abhayRef = useRef<HTMLImageElement>(null)
  const tejasRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<any>(null)
  const maskId = 'reveal-mask'
  const [mounted, setMounted] = useState(false)
  const [initialCenter, setInitialCenter] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setMounted(true)
    // Calculate center position immediately
    if (typeof window !== 'undefined') {
      setInitialCenter({
        x: window.innerWidth / 2 - 175, // 175 = initialWidth / 2
        y: window.innerHeight / 2 - 50  // 50 = initialHeight / 2
      })
    }
  }, [])

  useEffect(() => {
    if (!mounted || !overlayRef.current || !svgRef.current || !borderSvgRef.current || !rectRef.current || !borderRef.current || !dotsRef.current || !abhayRef.current || !tejasRef.current || !textRef.current) return

    // Initial mask size - small rectangle in the center
    const initialWidth = 350
    const initialHeight = 100
    
    const updateMask = (progress: number) => {
      if (!rectRef.current || !svgRef.current || !borderSvgRef.current || !borderRef.current || !dotsRef.current) return
      
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
      
      // Update border SVG size to match
      borderSvgRef.current.setAttribute('width', String(viewportWidth))
      borderSvgRef.current.setAttribute('height', String(viewportHeight))
      borderSvgRef.current.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`)
      
      // Update rectangle position and size - centered
      // In SVG mask: white = visible, black = transparent
      // So black rectangle = transparent hole that reveals content
      const rectX = centerX - currentWidth / 2
      const rectY = centerY - currentHeight / 2
      
      rectRef.current.setAttribute('x', String(rectX))
      rectRef.current.setAttribute('y', String(rectY))
      rectRef.current.setAttribute('width', String(currentWidth))
      rectRef.current.setAttribute('height', String(currentHeight))
      
      // Update border rectangle (same position and size as mask)
      borderRef.current.setAttribute('x', String(rectX))
      borderRef.current.setAttribute('y', String(rectY))
      borderRef.current.setAttribute('width', String(currentWidth))
      borderRef.current.setAttribute('height', String(currentHeight))
      
      // Update dots positions
      const dotRadius = 4 // Size of the dots
      const dots = dotsRef.current.children
      
      // Top-left corner
      if (dots[0]) {
        (dots[0] as SVGCircleElement).setAttribute('cx', String(rectX))
        ;(dots[0] as SVGCircleElement).setAttribute('cy', String(rectY))
      }
      // Top-right corner
      if (dots[1]) {
        (dots[1] as SVGCircleElement).setAttribute('cx', String(rectX + currentWidth))
        ;(dots[1] as SVGCircleElement).setAttribute('cy', String(rectY))
      }
      // Bottom-right corner
      if (dots[2]) {
        (dots[2] as SVGCircleElement).setAttribute('cx', String(rectX + currentWidth))
        ;(dots[2] as SVGCircleElement).setAttribute('cy', String(rectY + currentHeight))
      }
      // Bottom-left corner
      if (dots[3]) {
        (dots[3] as SVGCircleElement).setAttribute('cx', String(rectX))
        ;(dots[3] as SVGCircleElement).setAttribute('cy', String(rectY + currentHeight))
      }
      // Top center
      if (dots[4]) {
        (dots[4] as SVGCircleElement).setAttribute('cx', String(rectX + currentWidth / 2))
        ;(dots[4] as SVGCircleElement).setAttribute('cy', String(rectY))
      }
      // Bottom center
      if (dots[5]) {
        (dots[5] as SVGCircleElement).setAttribute('cx', String(rectX + currentWidth / 2))
        ;(dots[5] as SVGCircleElement).setAttribute('cy', String(rectY + currentHeight))
      }
      
      // Update text position - centered inside the reveal box
      if (textRef.current) {
        const textX = centerX // Center horizontally
        const textY = centerY // Center vertically within the box
        textRef.current.style.left = `${textX}px`
        textRef.current.style.top = `${textY}px`
        textRef.current.style.transform = 'translate(-50%, -50%)' // Center the text
      }
      
      // Update images animation - zooming depth effect
      if (abhayRef.current && tejasRef.current) {
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const centerX = viewportWidth / 2
        const centerY = viewportHeight / 2
        
        // Calculate movement distance and scale - move completely off screen
        const maxMoveDistance = viewportWidth * 0.8 // Move 80% of viewport width to go off screen
        const maxScale = 3.5 // Scale up to 3.5x
        const maxBlur = 30 // Maximum blur in pixels
        
        // Abhay moves LEFT (out of screen), enlarges, and blurs
        const abhayStartX = centerX - 400
        const abhayMoveX = abhayStartX - maxMoveDistance * progress
        const abhayScale = 1 + (maxScale - 1) * progress
        const abhayBlur = maxBlur * progress
        
        // Tejas moves RIGHT (out of screen), enlarges, and blurs
        const tejasStartX = centerX + 405
        const tejasMoveX = tejasStartX + maxMoveDistance * progress
        const tejasScale = 1 + (maxScale - 1) * progress
        const tejasBlur = maxBlur * progress
        
        // Apply transforms - maintain center point while scaling
        abhayRef.current.style.left = `${abhayMoveX}px`
        abhayRef.current.style.top = `${centerY - 65}px`
        abhayRef.current.style.transform = `translate(-50%, -50%) rotate(15deg) scale(${abhayScale})`
        abhayRef.current.style.filter = `blur(${abhayBlur}px)`
        abhayRef.current.style.opacity = String(1 - progress * 0.5) // Fade out as it moves off screen
        
        tejasRef.current.style.left = `${tejasMoveX}px`
        tejasRef.current.style.top = `${centerY + 225}px`
        tejasRef.current.style.transform = `translate(-50%, -50%) rotate(-15deg) scale(${tejasScale})`
        tejasRef.current.style.filter = `blur(${tejasBlur}px)`
        tejasRef.current.style.opacity = String(1 - progress * 0.5) // Fade out as it moves off screen
      }
    }

    // Initialize - ensure it starts centered
    const initSVG = () => {
      if (!rectRef.current || !svgRef.current || !borderSvgRef.current || !borderRef.current || !dotsRef.current) return
      
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      
      svgRef.current.setAttribute('width', String(viewportWidth))
      svgRef.current.setAttribute('height', String(viewportHeight))
      svgRef.current.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`)
      
      borderSvgRef.current.setAttribute('width', String(viewportWidth))
      borderSvgRef.current.setAttribute('height', String(viewportHeight))
      borderSvgRef.current.setAttribute('viewBox', `0 0 ${viewportWidth} ${viewportHeight}`)
      
      // Set initial centered position immediately before any scroll
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2
      const initialX = centerX - initialWidth / 2
      const initialY = centerY - initialHeight / 2
      
      rectRef.current.setAttribute('x', String(initialX))
      rectRef.current.setAttribute('y', String(initialY))
      rectRef.current.setAttribute('width', String(initialWidth))
      rectRef.current.setAttribute('height', String(initialHeight))
      
      // Initialize border
      borderRef.current.setAttribute('x', String(initialX))
      borderRef.current.setAttribute('y', String(initialY))
      borderRef.current.setAttribute('width', String(initialWidth))
      borderRef.current.setAttribute('height', String(initialHeight))
      
      // Initialize dots
      const dots = dotsRef.current.children
      const dotRadius = 4
      // Top-left
      if (dots[0]) {
        (dots[0] as SVGCircleElement).setAttribute('cx', String(initialX))
        ;(dots[0] as SVGCircleElement).setAttribute('cy', String(initialY))
      }
      // Top-right
      if (dots[1]) {
        (dots[1] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth))
        ;(dots[1] as SVGCircleElement).setAttribute('cy', String(initialY))
      }
      // Bottom-right
      if (dots[2]) {
        (dots[2] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth))
        ;(dots[2] as SVGCircleElement).setAttribute('cy', String(initialY + initialHeight))
      }
      // Bottom-left
      if (dots[3]) {
        (dots[3] as SVGCircleElement).setAttribute('cx', String(initialX))
        ;(dots[3] as SVGCircleElement).setAttribute('cy', String(initialY + initialHeight))
      }
      // Top center
      if (dots[4]) {
        (dots[4] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth / 2))
        ;(dots[4] as SVGCircleElement).setAttribute('cy', String(initialY))
      }
      // Bottom center
      if (dots[5]) {
        (dots[5] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth / 2))
        ;(dots[5] as SVGCircleElement).setAttribute('cy', String(initialY + initialHeight))
      }
      
      // Initialize text position - centered inside the reveal box
      if (textRef.current) {
        const centerX = viewportWidth / 2
        const centerY = viewportHeight / 2
        
        textRef.current.style.position = 'fixed'
        textRef.current.style.left = `${centerX}px`
        textRef.current.style.top = `${centerY}px` // Center vertically inside the box
        textRef.current.style.transform = 'translate(-50%, -50%)' // Center the text
        textRef.current.style.zIndex = '10003'
        textRef.current.style.pointerEvents = 'none'
      }
      
      // Initialize images position - positioned within reveal box
      if (abhayRef.current && tejasRef.current) {
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const centerX = viewportWidth / 2
        const centerY = viewportHeight / 2
        
        // Abhay positioned on the LEFT side of reveal box
        abhayRef.current.style.position = 'fixed'
        abhayRef.current.style.left = `${centerX - 400}px` // Left side of reveal box
        abhayRef.current.style.top = `${centerY - 65}px` // Positioned up
        abhayRef.current.style.transform = 'translate(-50%, -50%) rotate(15deg)'
        abhayRef.current.style.width = '459px' // Reduced by 10%
        abhayRef.current.style.height = 'auto'
        abhayRef.current.style.zIndex = '10002'
        abhayRef.current.style.pointerEvents = 'none'
        abhayRef.current.style.filter = 'blur(0px)'
        abhayRef.current.style.opacity = '1'
        
        // Tejas positioned on the RIGHT side of reveal box
        tejasRef.current.style.position = 'fixed'
        tejasRef.current.style.left = `${centerX + 405}px` // Right side of reveal box
        tejasRef.current.style.top = `${centerY + 225}px` // Positioned down
        tejasRef.current.style.transform = 'translate(-50%, -50%) rotate(-15deg)'
        tejasRef.current.style.width = '378px' // Reduced by 10%
        tejasRef.current.style.height = 'auto'
        tejasRef.current.style.zIndex = '10002'
        tejasRef.current.style.pointerEvents = 'none'
        tejasRef.current.style.filter = 'blur(0px)'
        tejasRef.current.style.opacity = '1'
      }
    }
    
    // Initialize immediately
    initSVG()
    
    // Set initial state
    updateMask(0)

    // Wait a frame to ensure DOM is ready, then create scroll trigger
    const timeoutId = setTimeout(() => {
      // Make it complete in one scroll - use viewport height
      const scrollDistance = window.innerHeight
      
      // Ensure body/html is scrollable on mobile
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.body.style.height = 'auto'
      document.documentElement.style.height = 'auto'
      
      // Create scroll animation with mobile-friendly settings
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: 1,
        onUpdate: (self) => {
          updateMask(self.progress)
        },
        // Mobile-specific settings
        invalidateOnRefresh: true,
      })

      // Refresh ScrollTrigger to ensure it's properly initialized
      ScrollTrigger.refresh()
      
      // Also listen to scroll events directly for mobile fallback
      const handleScroll = () => {
        if (scrollTriggerRef.current) {
          const progress = scrollTriggerRef.current.progress
          updateMask(progress)
        }
      }
      
      // Use both scroll and touchmove for better mobile support
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('touchmove', handleScroll, { passive: true })
      
      // Store cleanup
      ;(window as any).__revealScrollCleanup = () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('touchmove', handleScroll)
      }
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
      if ((window as any).__revealScrollCleanup) {
        ;(window as any).__revealScrollCleanup()
        delete (window as any).__revealScrollCleanup
      }
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
        scrollTriggerRef.current = null
      }
    }
  }, [mounted])

  // Use useLayoutEffect to ensure center position is set before paint
  useLayoutEffect(() => {
    if (mounted && rectRef.current && borderRef.current && dotsRef.current && textRef.current && typeof window !== 'undefined') {
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2
      const initialWidth = 350
      const initialHeight = 100
      const initialX = centerX - initialWidth / 2
      const initialY = centerY - initialHeight / 2
      
      rectRef.current.setAttribute('x', String(initialX))
      rectRef.current.setAttribute('y', String(initialY))
      
      borderRef.current.setAttribute('x', String(initialX))
      borderRef.current.setAttribute('y', String(initialY))
      
      // Initialize dots
      const dots = dotsRef.current.children
      if (dots[0]) (dots[0] as SVGCircleElement).setAttribute('cx', String(initialX))
      if (dots[0]) (dots[0] as SVGCircleElement).setAttribute('cy', String(initialY))
      if (dots[1]) (dots[1] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth))
      if (dots[1]) (dots[1] as SVGCircleElement).setAttribute('cy', String(initialY))
      if (dots[2]) (dots[2] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth))
      if (dots[2]) (dots[2] as SVGCircleElement).setAttribute('cy', String(initialY + initialHeight))
      if (dots[3]) (dots[3] as SVGCircleElement).setAttribute('cx', String(initialX))
      if (dots[3]) (dots[3] as SVGCircleElement).setAttribute('cy', String(initialY + initialHeight))
      if (dots[4]) (dots[4] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth / 2))
      if (dots[4]) (dots[4] as SVGCircleElement).setAttribute('cy', String(initialY))
      if (dots[5]) (dots[5] as SVGCircleElement).setAttribute('cx', String(initialX + initialWidth / 2))
      if (dots[5]) (dots[5] as SVGCircleElement).setAttribute('cy', String(initialY + initialHeight))
      
      // Initialize text position - centered inside the reveal box
      if (textRef.current) {
        textRef.current.style.left = `${centerX}px`
        textRef.current.style.top = `${centerY}px` // Center vertically inside the box
        textRef.current.style.transform = 'translate(-50%, -50%)' // Center the text
      }
      
      // Initialize images position
      if (abhayRef.current && tejasRef.current) {
        // Abhay positioned on the LEFT side of reveal box
        abhayRef.current.style.left = `${centerX - 400}px`
        abhayRef.current.style.top = `${centerY - 65}px`
        abhayRef.current.style.width = '225px'
        
        // Tejas positioned on the RIGHT side of reveal box
        tejasRef.current.style.left = `${centerX + 405}px`
        tejasRef.current.style.top = `${centerY + 225}px`
        tejasRef.current.style.width = '225px'
      }
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
              width="350"
              height="100"
              fill="black"
            />
          </mask>
        </defs>
      </svg>
      
      {/* Border and Dots Overlay - visible elements */}
      <svg 
        ref={borderSvgRef}
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
          zIndex: 10001,
        }}
        aria-hidden="true"
      >
        {/* Border rectangle - light reddish-orange */}
        <rect
          ref={borderRef}
          x={initialCenter.x}
          y={initialCenter.y}
          width="350"
          height="100"
          fill="none"
          stroke="#FFB7A3"
          strokeWidth="2"
        />
        
        {/* Dots group */}
        <g ref={dotsRef}>
          {/* Top-left corner */}
          <circle cx="0" cy="0" r="4" fill="#FF6347" />
          {/* Top-right corner */}
          <circle cx="0" cy="0" r="4" fill="#FF6347" />
          {/* Bottom-right corner */}
          <circle cx="0" cy="0" r="4" fill="#FF6347" />
          {/* Bottom-left corner */}
          <circle cx="0" cy="0" r="4" fill="#FF6347" />
          {/* Top center */}
          <circle cx="0" cy="0" r="4" fill="#FF6347" />
          {/* Bottom center */}
          <circle cx="0" cy="0" r="4" fill="#FF6347" />
        </g>
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
      
      {/* Abhay Image - positioned LEFT, moves left off screen, enlarges, and blurs */}
      <img
        ref={abhayRef}
        src="/images/reveal/abhay.png"
        alt="Abhay"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(15deg)',
          width: '225px',
          height: 'auto',
          zIndex: 10002,
          pointerEvents: 'none',
          transition: 'none', // We'll animate with JS
          willChange: 'transform, filter, opacity, left', // Optimize for animation
          outline: 'none',
          border: 'none',
        }}
      />
      
      {/* Tejas Image - positioned RIGHT, moves right off screen, enlarges, and blurs */}
      <img
        ref={tejasRef}
        src="/images/reveal/tejas.png"
        alt="Tejas"
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(-15deg)',
          width: '225px',
          height: 'auto',
          zIndex: 10002,
          pointerEvents: 'none',
          transition: 'none', // We'll animate with JS
          willChange: 'transform, filter, opacity, left', // Optimize for animation
          outline: 'none',
          border: 'none',
        }}
      />
      
      {/* Text inside reveal box - centered and visible */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10003,
          pointerEvents: 'none',
          background: 'radial-gradient(circle, #4B4B4B 0%, #E9E9E9 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontSize: '48px',
          fontFamily: 'Garamond, Georgia, serif',
          fontWeight: 'normal',
          whiteSpace: 'nowrap',
        }}
      >
        Satish Hebbal
      </div>
    </>
  )

  // Render directly to body using portal to avoid any parent container issues
  return createPortal(revealContent, document.body)
}
