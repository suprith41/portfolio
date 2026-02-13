"use client"

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

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
  const productDesignerRef = useRef<HTMLDivElement>(null)
  const webDeveloperRef = useRef<HTMLDivElement>(null)
  const hiImARef = useRef<HTMLDivElement>(null)
  const basedInRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<any>(null)
  const scrollRafIdRef = useRef<number | null>(null)
  const textAnimationsRef = useRef<Map<string, gsap.core.Timeline>>(new Map())
  const lastScrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0)
  const maskId = 'reveal-mask'
  const [mounted, setMounted] = useState(false)
  const [initialCenter, setInitialCenter] = useState({ x: 0, y: 0 })

  // Initialize text animations
  const initTextAnimations = () => {
    if (typeof window === 'undefined') return

    const textElements = [
      { ref: textRef, id: 'satish-hebbal' },
      { ref: productDesignerRef, id: 'product-designer' },
      { ref: webDeveloperRef, id: 'web-developer' },
      { ref: hiImARef, id: 'hi-im-a' },
      { ref: basedInRef, id: 'based-in' },
    ]

    textElements.forEach(({ ref, id }) => {
      if (!ref.current) return

      // Split text into words & characters
      const split = new SplitType(ref.current, {
        types: ['words', 'chars'],
        tagName: 'span',
      })

      // Set initial opacity to 1 for the container and ensure it's visible
      gsap.set(ref.current, { opacity: 1, visibility: 'visible' })
      
      // Ensure characters are visible and positioned correctly initially
      if (split.chars && split.chars.length > 0) {
        gsap.set(split.chars, { opacity: 1, yPercent: 0 })
      }

      // Create slide-up animation (for initial load and scroll back to top)
      const slideUpTl = gsap.timeline({ paused: true })
      slideUpTl.from(split.chars, {
        yPercent: 100,
        duration: 0.2,
        ease: 'ease.out',
        stagger: { amount: 0.3 },
      })

      // Create slide-down animation (for initial scroll)
      const slideDownTl = gsap.timeline({ paused: true })
      slideDownTl.from(split.chars, {
        yPercent: -120,
        duration: 0.18,
        ease: 'ease.out',
        stagger: { amount: 0.35 },
      })

      // Store animations
      textAnimationsRef.current.set(`${id}-up`, slideUpTl)
      textAnimationsRef.current.set(`${id}-down`, slideDownTl)

      // Play slide-up on initial load (characters will animate from below to their position)
      slideUpTl.play()
    })
  }

  // Progress threshold after which all reveal text is hidden (stops "remaining" text on mobile)
  const PROGRESS_HIDE_TEXT = 0.32
  // Minimum scroll delta to count as direction change (reduces jitter on mobile)
  const SCROLL_DIRECTION_THRESHOLD = 5

  // Handle text animations based on scroll direction
  const handleTextAnimations = (progress: number) => {
    if (typeof window === 'undefined') return

    const currentScrollY = window.scrollY
    const scrollDelta = currentScrollY - lastScrollYRef.current
    const isScrollingDown = scrollDelta >= SCROLL_DIRECTION_THRESHOLD
    lastScrollYRef.current = currentScrollY

    const textElements = [
      { ref: textRef, id: 'satish-hebbal' },
      { ref: productDesignerRef, id: 'product-designer' },
      { ref: webDeveloperRef, id: 'web-developer' },
      { ref: hiImARef, id: 'hi-im-a' },
      { ref: basedInRef, id: 'based-in' },
    ]

    // Once scroll progress passes threshold, hide all text so it fully disappears
    const shouldHideText = progress >= PROGRESS_HIDE_TEXT
    textElements.forEach(({ ref, id }) => {
      if (ref.current) {
        if (shouldHideText) {
          ref.current.style.opacity = '0'
          ref.current.style.visibility = 'hidden'
          ref.current.style.pointerEvents = 'none'
        } else {
          ref.current.style.opacity = '1'
          ref.current.style.visibility = 'visible'
          ref.current.style.pointerEvents = 'auto'
        }
      }

      const slideUpTl = textAnimationsRef.current.get(`${id}-up`)
      const slideDownTl = textAnimationsRef.current.get(`${id}-down`)
      if (!slideUpTl || !slideDownTl) return

      // When scrolled back to top (progress === 0 or scrollY === 0), reset and play slide-up
      if (progress === 0 || currentScrollY === 0) {
        slideDownTl.progress(0)
        slideDownTl.pause()
        slideUpTl.progress(0)
        slideUpTl.play()
      }
      // On scroll down (only when not hiding yet), play slide-down once
      else if (!shouldHideText && isScrollingDown && slideDownTl.progress() === 0) {
        slideDownTl.play()
      }
    })
    
    // Fade out logo and scroll indicator as user scrolls (fade back in at top)
    const fadeOutOpacity = Math.max(0, 1 - progress * 6)
    if (logoRef.current) {
      logoRef.current.style.opacity = String(fadeOutOpacity)
    }
    if (scrollIndicatorRef.current) {
      scrollIndicatorRef.current.style.opacity = String(fadeOutOpacity)
    }
  }

  useEffect(() => {
    setMounted(true)
    // Calculate center position immediately
    const updateCenter = () => {
      if (typeof window !== 'undefined') {
        const isMobile = window.innerWidth < 768
        const initialWidth = isMobile ? 300 : 500
        const initialHeight = isMobile ? 100 : 150
        setInitialCenter({
          x: window.innerWidth / 2 - initialWidth / 2,
          y: window.innerHeight / 2 - initialHeight / 2
        })
      }
    }
    updateCenter()
    
    // Update center on resize (e.g., device rotation)
    window.addEventListener('resize', updateCenter)
    return () => window.removeEventListener('resize', updateCenter)
  }, [])

  useEffect(() => {
    if (!mounted || !overlayRef.current || !svgRef.current || !borderSvgRef.current || !rectRef.current || !borderRef.current || !dotsRef.current || !abhayRef.current || !tejasRef.current || !textRef.current) return

    // Initial mask size - small rectangle in the center (smaller on mobile)
    const isMobile = window.innerWidth < 768
    const initialWidth = isMobile ? 300 : 500
    const initialHeight = isMobile ? 100 : 150
    
    const updateMask = (progress: number) => {
      if (!rectRef.current || !svgRef.current || !borderSvgRef.current || !borderRef.current || !dotsRef.current) return
      const borderBlurEl = borderSvgRef.current?.querySelector('#reveal-border-blur feGaussianBlur') as SVGFEGaussianBlurElement | null
      if (borderBlurEl) {
        const maxBorderBlur = 4
        borderBlurEl.setAttribute('stdDeviation', String(progress * maxBorderBlur))
      }
      
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight
      const centerX = viewportWidth / 2
      const centerY = viewportHeight / 2
      
      // Calculate growing dimensions
      const maxDimension = Math.max(viewportWidth, viewportHeight) * 1.5
      // Slow down height growth to match width growth proportionally
      const heightProgress = progress * 0.7 // Height grows slower to match width growth rate
      const currentWidth = initialWidth + (maxDimension - initialWidth) * progress
      const currentHeight = initialHeight + (maxDimension - initialHeight) * heightProgress
      
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
      const dotSize = 4 // Half size of the squares (so 8x8 total)
      const dots = dotsRef.current.children
      
      // Top-left corner
      if (dots[0]) {
        (dots[0] as SVGRectElement).setAttribute('x', String(rectX - dotSize))
        ;(dots[0] as SVGRectElement).setAttribute('y', String(rectY - dotSize))
      }
      // Top-right corner
      if (dots[1]) {
        (dots[1] as SVGRectElement).setAttribute('x', String(rectX + currentWidth - dotSize))
        ;(dots[1] as SVGRectElement).setAttribute('y', String(rectY - dotSize))
      }
      // Bottom-right corner
      if (dots[2]) {
        (dots[2] as SVGRectElement).setAttribute('x', String(rectX + currentWidth - dotSize))
        ;(dots[2] as SVGRectElement).setAttribute('y', String(rectY + currentHeight - dotSize))
      }
      // Bottom-left corner
      if (dots[3]) {
        (dots[3] as SVGRectElement).setAttribute('x', String(rectX - dotSize))
        ;(dots[3] as SVGRectElement).setAttribute('y', String(rectY + currentHeight - dotSize))
      }
      
      // Update text position - centered inside the reveal box
      if (textRef.current) {
        const textX = centerX // Center horizontally
        const textYOffset = isMobile ? 15 : 20 // Mobile: 5px up
        const textY = centerY + textYOffset
        textRef.current.style.left = `${textX}px`
        textRef.current.style.top = `${textY}px`
        textRef.current.style.transform = 'translate(-50%, -50%)' // Center the text
      }
      
      // Fade out logo and scroll indicator as user scrolls
      const fadeOutOpacity = Math.max(0, 1 - progress * 6) // Fade out completely by progress 0.167 (very fast)
      if (logoRef.current) {
        logoRef.current.style.opacity = String(fadeOutOpacity)
      }
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.opacity = String(fadeOutOpacity)
      }
      
      // Update images animation - zooming depth effect
      if (abhayRef.current && tejasRef.current) {
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const centerX = viewportWidth / 2
        const centerY = viewportHeight / 2
        
        // Calculate movement distance and scale - move completely off screen
        const maxMoveDistance = viewportWidth * 0.8 // Move 80% of viewport width to go off screen
        const maxVerticalDistance = viewportHeight * 0.6 // Move 60% of viewport height vertically
        const maxScale = 3.5 // Scale up to 3.5x
        const maxBlur = 30 // Maximum blur in pixels
        // Accelerate movement so images reach off-screen sooner (quicker feel)
        const moveProgress = Math.min(1, progress * 2)
        
        // Abhay moves LEFT and UP (out of screen), enlarges, and blurs
        const abhayStartX = centerX - 491 // 5px more left (was -486)
        const abhayStartY = centerY - 91 // Initial Y position
        const abhayMoveX = abhayStartX - maxMoveDistance * moveProgress
        const abhayMoveY = abhayStartY - maxVerticalDistance * moveProgress // Move up as progress increases
        const abhayScale = 1 + (maxScale - 1) * moveProgress
        const abhayBlur = maxBlur * moveProgress
        
        // Tejas moves RIGHT and DOWN (out of screen), enlarges, and blurs
        const tejasStartX = centerX + 481 // 2px left of previous (was +483)
        const tejasStartY = centerY + 225 // Initial Y position
        const tejasMoveX = tejasStartX + maxMoveDistance * moveProgress
        const tejasMoveY = tejasStartY + maxVerticalDistance * moveProgress // Move down as progress increases
        const tejasScale = 1 + (maxScale - 1) * moveProgress
        const tejasBlur = maxBlur * moveProgress
        
        // Apply transforms - maintain center point while scaling
        abhayRef.current.style.left = `${abhayMoveX}px`
        abhayRef.current.style.top = `${abhayMoveY}px` // Moves up as it goes left
        abhayRef.current.style.transform = `translate(-50%, -50%) rotate(15deg) scale(${abhayScale})`
        abhayRef.current.style.filter = `blur(${abhayBlur}px)`
        abhayRef.current.style.opacity = String(1 - moveProgress * 0.5) // Fade out as it moves off screen
        
        tejasRef.current.style.left = `${tejasMoveX}px`
        tejasRef.current.style.top = `${tejasMoveY}px` // Moves down as it goes right
        tejasRef.current.style.transform = `translate(-50%, -50%) rotate(-15deg) scale(${tejasScale})`
        tejasRef.current.style.filter = `blur(${tejasBlur}px)`
        tejasRef.current.style.opacity = String(1 - moveProgress * 0.5) // Fade out as it moves off screen
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
      const dotSize = 4
      // Top-left
      if (dots[0]) {
        (dots[0] as SVGRectElement).setAttribute('x', String(initialX - dotSize))
        ;(dots[0] as SVGRectElement).setAttribute('y', String(initialY - dotSize))
      }
      // Top-right
      if (dots[1]) {
        (dots[1] as SVGRectElement).setAttribute('x', String(initialX + initialWidth - dotSize))
        ;(dots[1] as SVGRectElement).setAttribute('y', String(initialY - dotSize))
      }
      // Bottom-right
      if (dots[2]) {
        (dots[2] as SVGRectElement).setAttribute('x', String(initialX + initialWidth - dotSize))
        ;(dots[2] as SVGRectElement).setAttribute('y', String(initialY + initialHeight - dotSize))
      }
      // Bottom-left
      if (dots[3]) {
        (dots[3] as SVGRectElement).setAttribute('x', String(initialX - dotSize))
        ;(dots[3] as SVGRectElement).setAttribute('y', String(initialY + initialHeight - dotSize))
      }
      
      // Initialize text position - centered inside the reveal box
      if (textRef.current) {
        const centerX = viewportWidth / 2
        const centerY = viewportHeight / 2
        
        textRef.current.style.position = 'fixed'
        textRef.current.style.left = `${centerX}px`
        textRef.current.style.top = `${centerY + (isMobile ? 15 : 20)}px` // Center vertically; mobile: 5px up
        textRef.current.style.transform = 'translate(-50%, -50%)' // Center the text
        textRef.current.style.zIndex = '10003'
        textRef.current.style.pointerEvents = 'auto'
      }
      
      // Initialize images position - positioned within reveal box
      if (abhayRef.current && tejasRef.current) {
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const centerX = viewportWidth / 2
        const centerY = viewportHeight / 2
        
        // Abhay positioned on the LEFT side of reveal box
        abhayRef.current.style.position = 'fixed'
        abhayRef.current.style.left = `${centerX - 491}px` // Left side of reveal box (5px more left)
        abhayRef.current.style.top = `${centerY - 91}px` // Positioned up (3px more up)
        abhayRef.current.style.transform = 'translate(-50%, -50%) rotate(15deg)'
        abhayRef.current.style.width = '459px' // Reduced by 10%
        abhayRef.current.style.height = 'auto'
        abhayRef.current.style.zIndex = '10002'
        abhayRef.current.style.pointerEvents = 'none'
        abhayRef.current.style.filter = 'blur(0px)'
        abhayRef.current.style.opacity = '1'
        
        // Tejas positioned on the RIGHT side of reveal box
        tejasRef.current.style.position = 'fixed'
        tejasRef.current.style.left = `${centerX + 481}px` // Right side of reveal box (2px left of previous)
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
      // Initialize text animations after DOM is ready
      initTextAnimations()
      
      // Make it complete in one scroll - use viewport height
      const scrollDistance = window.innerHeight
      
      // Ensure body/html is scrollable on mobile
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
      document.body.style.height = 'auto'
      document.documentElement.style.height = 'auto'
      
      const isMobile = window.innerWidth < 768
      // Slightly smoother scrub on mobile to reduce jitter (higher = more smoothing)
      const scrubVal = isMobile ? 1.8 : 1

      // Create scroll animation with mobile-friendly settings
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: () => `+=${window.innerHeight}`,
        scrub: scrubVal,
        onUpdate: (self) => {
          updateMask(self.progress)
          handleTextAnimations(self.progress)
        },
        invalidateOnRefresh: true,
      })

      ScrollTrigger.refresh()

      // Only react to actual scroll (not touchmove) so mobile doesn't feel sluggish when finger is on screen
      const handleScroll = () => {
        if (scrollRafIdRef.current != null) return
        scrollRafIdRef.current = requestAnimationFrame(() => {
          scrollRafIdRef.current = null
          if (scrollTriggerRef.current) {
            const progress = scrollTriggerRef.current.progress
            updateMask(progress)
            handleTextAnimations(progress)
          }
        })
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      
      // Store cleanup
      ;(window as any).__revealScrollCleanup = () => {
        if (scrollRafIdRef.current != null) {
          cancelAnimationFrame(scrollRafIdRef.current)
          scrollRafIdRef.current = null
        }
        window.removeEventListener('scroll', handleScroll)
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
      const isMobile = window.innerWidth < 768
      const initialWidth = isMobile ? 300 : 500
      const initialHeight = isMobile ? 100 : 150
      const initialX = centerX - initialWidth / 2
      const initialY = centerY - initialHeight / 2
      
      rectRef.current.setAttribute('x', String(initialX))
      rectRef.current.setAttribute('y', String(initialY))
      
      borderRef.current.setAttribute('x', String(initialX))
      borderRef.current.setAttribute('y', String(initialY))
      
      // Initialize dots
      const dots = dotsRef.current.children
      const dotSize = 4
      if (dots[0]) (dots[0] as SVGRectElement).setAttribute('x', String(initialX - dotSize))
      if (dots[0]) (dots[0] as SVGRectElement).setAttribute('y', String(initialY - dotSize))
      if (dots[1]) (dots[1] as SVGRectElement).setAttribute('x', String(initialX + initialWidth - dotSize))
      if (dots[1]) (dots[1] as SVGRectElement).setAttribute('y', String(initialY - dotSize))
      if (dots[2]) (dots[2] as SVGRectElement).setAttribute('x', String(initialX + initialWidth - dotSize))
      if (dots[2]) (dots[2] as SVGRectElement).setAttribute('y', String(initialY + initialHeight - dotSize))
      if (dots[3]) (dots[3] as SVGRectElement).setAttribute('x', String(initialX - dotSize))
      if (dots[3]) (dots[3] as SVGRectElement).setAttribute('y', String(initialY + initialHeight - dotSize))
      
      // Initialize text position - centered inside the reveal box
      if (textRef.current) {
        textRef.current.style.left = `${centerX}px`
        textRef.current.style.top = `${centerY + (isMobile ? 15 : 20)}px` // Center vertically; mobile: 5px up
        textRef.current.style.transform = 'translate(-50%, -50%)' // Center the text
      }
      
      // Initialize images position
      if (abhayRef.current && tejasRef.current) {
        // Abhay positioned on the LEFT side of reveal box
        abhayRef.current.style.left = `${centerX - 491}px` // 5px more left
        abhayRef.current.style.top = `${centerY - 91}px` // 3px more up
        abhayRef.current.style.width = '225px'
        
        // Tejas positioned on the RIGHT side of reveal box
        tejasRef.current.style.left = `${centerX + 481}px` // 2px left of previous
        tejasRef.current.style.top = `${centerY + 225}px`
        tejasRef.current.style.width = '225px'
      }
    }
  }, [mounted])

  if (!mounted) return null

  // Calculate responsive dimensions for initial SVG values
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const svgInitialWidth = isMobile ? 300 : 500
  const svgInitialHeight = isMobile ? 100 : 150

  // Match SVG viewBox to window so mask/rect coordinates (innerWidth/innerHeight) align and box is centered
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1920
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 1080
  const viewBox = `0 0 ${viewportW} ${viewportH}`

  // Use computed center on first paint so box is centered before resize effect runs
  const boxCenter =
    initialCenter.x === 0 && initialCenter.y === 0 && typeof window !== 'undefined'
      ? { x: viewportW / 2 - svgInitialWidth / 2, y: viewportH / 2 - svgInitialHeight / 2 }
      : initialCenter

  const revealContent = (
    <>
      {/* SVG Mask - must be in DOM for mask to work */}
      <svg 
        ref={svgRef}
        viewBox={viewBox}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 10000,
        }}
        aria-hidden="true"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            {/* White = overlay visible; use large rect so mask always covers full viewport on mobile */}
            <rect x="-5000" y="-5000" width="10000" height="10000" fill="white" />
            {/* Black rectangle = transparent hole that grows from center */}
            <rect
              ref={rectRef}
              x={boxCenter.x}
              y={boxCenter.y}
              width={svgInitialWidth}
              height={svgInitialHeight}
              fill="black"
            />
          </mask>
        </defs>
      </svg>
      
      {/* Border and Dots Overlay - visible elements */}
      <svg 
        ref={borderSvgRef}
        viewBox={viewBox}
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10001,
        }}
        aria-hidden="true"
      >
        <defs>
          <filter id="reveal-border-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#reveal-border-blur)">
          {/* Border rectangle - light reddish-orange */}
          <rect
            ref={borderRef}
            x={boxCenter.x}
            y={boxCenter.y}
            width={svgInitialWidth}
            height={svgInitialHeight}
            fill="none"
            stroke="rgb(212, 212, 216)"
            strokeWidth="2"
          />
          {/* Dots group */}
          <g ref={dotsRef}>
          {/* Top-left corner */}
          <rect x="-4" y="-4" width="8" height="8" fill="rgb(212, 212, 216)" />
          {/* Top-right corner */}
          <rect x="-4" y="-4" width="8" height="8" fill="rgb(212, 212, 216)" />
          {/* Bottom-right corner */}
          <rect x="-4" y="-4" width="8" height="8" fill="rgb(212, 212, 216)" />
          {/* Bottom-left corner */}
          <rect x="-4" y="-4" width="8" height="8" fill="rgb(212, 212, 216)" />
          </g>
        </g>
      </svg>
      
      {/* Reveal Overlay - must fully cover viewport so home content stays hidden until mask grows */}
      <div 
        ref={overlayRef}
        className="pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          zIndex: 9999,
          mask: `url(#${maskId})`,
          WebkitMask: `url(#${maskId})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />

      {/* Logo - centered, halfway between nav and name */}
      <div
        ref={logoRef}
        style={{
          position: 'fixed',
          left: '50%',
          top: isMobile ? 'calc(clamp(6rem, 26vh, 28vh) - 30px)' : 'calc(clamp(6rem, 26vh, 28vh) - 55px)',
          transform: 'translate(-50%, 0)',
          zIndex: 10003,
          pointerEvents: 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          opacity: 1,
          transition: 'opacity 0.05s ease-out',
        }}
      >
        <img
          src="/images/common/saaa-logo.svg"
          alt=""
          width={48}
          height={46}
          style={{
            display: 'block',
            width: 48,
            height: 'auto',
            opacity: 1,
            filter: 'none',
          }}
        />
      </div>
      
      {/* Abhay Image - positioned LEFT, moves left off screen, enlarges, and blurs (hidden on mobile) */}
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
          userSelect: 'none',
          WebkitUserSelect: 'none',
          transition: 'none', // We'll animate with JS
          willChange: 'transform, filter, opacity, left', // Optimize for animation
          outline: 'none',
          border: 'none',
          display: isMobile ? 'none' : 'block',
        }}
      />
      
      {/* Tejas Image - positioned RIGHT, moves right off screen, enlarges, and blurs (hidden on mobile) */}
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
          userSelect: 'none',
          WebkitUserSelect: 'none',
          transition: 'none', // We'll animate with JS
          willChange: 'transform, filter, opacity, left', // Optimize for animation
          outline: 'none',
          border: 'none',
          display: isMobile ? 'none' : 'block',
        }}
      />
      
      {/* Text inside reveal box - centered and visible */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          left: '50%',
          top: isMobile ? 'calc(50% + 15px)' : 'calc(50% + 20px)',
          transform: 'translate(-50%, -50%)',
          zIndex: 10003,
          pointerEvents: 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          color: '#171717',
          fontSize: isMobile ? '48px' : '72px',
          fontFamily: 'Garamond, Georgia, serif',
          fontWeight: 'normal',
          whiteSpace: 'nowrap',
        }}
      >
        Satish Hebbal
      </div>

      {/* Product Design: above mask box, right edge aligned with mask box */}
      <div
        ref={productDesignerRef}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: isMobile ? 'translate(-50%, calc(-50% - 80px))' : 'translate(-50%, calc(-50% - 95px))',
          width: svgInitialWidth,
          zIndex: 10003,
          pointerEvents: 'auto',
          color: '#7A7A7A',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: isMobile ? '16px' : '20px',
          lineHeight: 1.2,
          textAlign: 'right',
          opacity: 0,
        }}
      >
        Product Designer
      </div>

      {/* Front-End Engineer: below mask box, left edge aligned with mask box */}
      <div
        ref={webDeveloperRef}
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: isMobile ? 'translate(calc(-50% + 14px), calc(-50% + 80px))' : 'translate(calc(-50% + 14px), calc(-50% + 95px))',
          width: svgInitialWidth,
          zIndex: 10003,
          pointerEvents: 'auto',
          color: '#7A7A7A',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: isMobile ? '16px' : '20px',
          lineHeight: 1.2,
          textAlign: 'left',
          opacity: 0,
        }}
      >
        Web Developer 
      </div>

      {/* Top-right: Hi, I'm a / Product Designer & Front-End Engineer */}
      <div
        ref={hiImARef}
        style={{
          position: 'fixed',
          right: 'clamp(1.5rem, 6vw, 4rem)',
          top: isMobile ? 'calc(clamp(6rem, 18vh, 12rem) - 80px)' : 'calc(clamp(6rem, 18vh, 12rem) - 90px)',
          zIndex: 10003,
          pointerEvents: 'auto',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: isMobile ? '18px' : '24px',
          lineHeight: 1.2,
          textAlign: 'right',
          whiteSpace: 'pre-line',
          maxWidth: '280px',
          opacity: 0,
        }}
      >
        <span style={{ color: '#BEBEBE' }}>Hi, I'm a</span>
        {'\n'}
        <span style={{ color: '#7A7A7A' }}>{`Product Designer
& Front-End Engineer`}</span>
      </div>

      {/* Bottom-left: based in / Hubli, Karnataka. */}
      <div
        ref={basedInRef}
        style={{
          position: 'fixed',
          left: 'clamp(1.5rem, 6vw, 4rem)',
          bottom: isMobile ? 'calc(clamp(5rem, 18vh, 10rem) - 120px)' : 'calc(clamp(5rem, 18vh, 10rem) - 110px)',
          zIndex: 10003,
          pointerEvents: 'auto',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: isMobile ? '18px' : '24px',
          lineHeight: 1.2,
          textAlign: 'left',
          whiteSpace: 'pre-line',
          maxWidth: '200px',
          opacity: 0,
        }}
      >
        <span style={{ color: '#BEBEBE' }}>based in</span>
        {'\n'}
        <span style={{ color: '#7A7A7A' }}>Hubli, Karnataka.</span>
      </div>

      {/* Scroll indicator - bottom center */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: 'fixed',
          left: '50%',
          bottom: 'calc(clamp(1.5rem, 5vh, 2.5rem) + 25px)',
          transform: 'translateX(-50%)',
          zIndex: 10003,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: 1,
          transition: 'opacity 0.05s ease-out',
        }}
      >
        <div
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: '1.5px solid rgba(0,0,0,0.15)',
            background: 'rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <div
            className="reveal-scroll-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.9)',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.1)',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'Saans Regular, sans-serif',
            fontSize: 12,
            color: '#7A7A7A',
            letterSpacing: '0.02em',
          }}
        >
          Scroll
        </span>
      </div>
    </>
  )

  // Render directly to body using portal to avoid any parent container issues
  return createPortal(revealContent, document.body)
}
