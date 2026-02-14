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
  const middleRingRef = useRef<SVGRectElement>(null)
  const outerRingRef = useRef<SVGRectElement>(null)
  const outerRing2Ref = useRef<SVGRectElement>(null)
  const outerRing3Ref = useRef<SVGRectElement>(null)
  const dotsRef = useRef<SVGGElement>(null)
  const abhayRef = useRef<HTMLDivElement>(null)
  const tejasRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const productDesignerRef = useRef<HTMLDivElement>(null)
  const webDeveloperRef = useRef<HTMLDivElement>(null)
  const hiImARef = useRef<HTMLDivElement>(null)
  const basedInRef = useRef<HTMLDivElement>(null)
  const introParagraphRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<any>(null)
  const scrollRafIdRef = useRef<number | null>(null)
  const textAnimationsRef = useRef<Map<string, gsap.core.Timeline>>(new Map())
  const lastScrollYRef = useRef<number>(typeof window !== 'undefined' ? window.scrollY : 0)
  const maskId = 'reveal-mask'
  const [mounted, setMounted] = useState(false)
  const [initialCenter, setInitialCenter] = useState({ x: 0, y: 0 })

  // Initialize text animations (all 6 so resize works; visibility handled in handleTextAnimations)
  const initTextAnimations = () => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 768
    const textElements = [
      { ref: textRef, id: 'satish-hebbal' },
      { ref: productDesignerRef, id: 'product-designer' },
      { ref: webDeveloperRef, id: 'web-developer' },
      { ref: introParagraphRef, id: 'intro-paragraph' },
      { ref: hiImARef, id: 'hi-im-a' },
      { ref: basedInRef, id: 'based-in' },
    ]

    textElements.forEach(({ ref, id }) => {
      if (!ref.current) return

      const isInactiveOnMobile =
        isMobile && (id === 'hi-im-a' || id === 'based-in' || id === 'product-designer' || id === 'web-developer')
      const isInactiveOnDesktop = !isMobile && id === 'intro-paragraph'
      const isActive = !isInactiveOnMobile && !isInactiveOnDesktop

      // On mobile: no SplitType or timelines — just show/hide by visibility
      if (isMobile) {
        ref.current.style.opacity = isActive ? '1' : '0'
        ref.current.style.visibility = isActive ? 'visible' : 'hidden'
        ref.current.style.pointerEvents = isActive ? 'auto' : 'none'
        return
      }

      // Desktop: full character split and slide animations
      const split = new SplitType(ref.current, {
        types: ['words', 'chars'],
        tagName: 'span',
      })

      gsap.set(ref.current, { opacity: 1, visibility: 'visible' })
      if (split.chars && split.chars.length > 0) {
        gsap.set(split.chars, { opacity: 1, yPercent: 0 })
      }

      const isRightToLeft = id === 'web-developer' || id === 'based-in'
      const isSatishHebbal = id === 'satish-hebbal'

      const slideUpTl = gsap.timeline({ paused: true })
      const slideDownTl = gsap.timeline({ paused: true })

      if (isSatishHebbal && split.words && split.words.length >= 2) {
        // "Satish" right-to-left, "Hebbal" left-to-right
        const satishChars = Array.from(split.words[0].children) as Element[]
        const hebbalChars = Array.from(split.words[1].children) as Element[]
        slideUpTl
          .from(satishChars, {
            yPercent: 100,
            duration: 0.2,
            ease: 'ease.out',
            stagger: { amount: 0.15, from: 'end' },
          }, 0)
          .from(hebbalChars, {
            yPercent: 100,
            duration: 0.2,
            ease: 'ease.out',
            stagger: { amount: 0.15, from: 'start' },
          }, 0)
        slideDownTl
          .from(satishChars, {
            yPercent: -120,
            duration: 0.18,
            ease: 'ease.out',
            stagger: { amount: 0.18, from: 'end' },
          }, 0)
          .from(hebbalChars, {
            yPercent: -120,
            duration: 0.18,
            ease: 'ease.out',
            stagger: { amount: 0.18, from: 'start' },
          }, 0)
      } else {
        slideUpTl.from(split.chars, {
          yPercent: 100,
          duration: 0.2,
          ease: 'ease.out',
          stagger: { amount: 0.3, from: isRightToLeft ? 'end' : 'start' },
        })
        slideDownTl.from(split.chars, {
          yPercent: -120,
          duration: 0.18,
          ease: 'ease.out',
          stagger: { amount: 0.35, from: isRightToLeft ? 'end' : 'start' },
        })
      }

      textAnimationsRef.current.set(`${id}-up`, slideUpTl)
      textAnimationsRef.current.set(`${id}-down`, slideDownTl)
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

    const isMobile = window.innerWidth < 768
    const textElements = [
      { ref: textRef, id: 'satish-hebbal' as const },
      { ref: productDesignerRef, id: 'product-designer' as const },
      { ref: webDeveloperRef, id: 'web-developer' as const },
      { ref: introParagraphRef, id: 'intro-paragraph' as const },
      { ref: hiImARef, id: 'hi-im-a' as const },
      { ref: basedInRef, id: 'based-in' as const },
    ]

    // Once scroll progress passes threshold, hide all text so it fully disappears
    const shouldHideText = progress >= PROGRESS_HIDE_TEXT
    // On mobile: fast fade out/in tied to scroll progress (no character animations)
    const mobileFadeEnd = 0.12 // fade completes in first 12% of scroll
    const mobileFadeOpacity = isMobile ? Math.max(0, 1 - progress / mobileFadeEnd) : 1
    textElements.forEach(({ ref, id }) => {
      // On mobile: only show intro-paragraph; hide product-designer, web-developer, hi-im-a, based-in
      const isInactive =
        (isMobile && (id === 'hi-im-a' || id === 'based-in' || id === 'product-designer' || id === 'web-developer')) ||
        (!isMobile && id === 'intro-paragraph')
      if (ref.current) {
        if (isInactive) {
          ref.current.style.opacity = '0'
          ref.current.style.visibility = 'hidden'
          ref.current.style.pointerEvents = 'none'
        } else if (isMobile) {
          // Mobile: fade out as user scrolls, fade in as they scroll back
          ref.current.style.opacity = String(mobileFadeOpacity)
          ref.current.style.visibility = mobileFadeOpacity > 0 ? 'visible' : 'hidden'
          ref.current.style.pointerEvents = mobileFadeOpacity > 0 ? 'auto' : 'none'
        } else if (shouldHideText) {
          ref.current.style.opacity = '0'
          ref.current.style.visibility = 'hidden'
          ref.current.style.pointerEvents = 'none'
        } else {
          ref.current.style.opacity = '1'
          ref.current.style.visibility = 'visible'
          ref.current.style.pointerEvents = 'auto'
        }
      }

      if (isInactive) return

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
        const initialWidth = isMobile ? 340 : 500
        const initialHeight = isMobile ? 130 : 150
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
    if (!mounted || !overlayRef.current || !svgRef.current || !borderSvgRef.current || !rectRef.current || !borderRef.current || !middleRingRef.current || !outerRingRef.current || !outerRing2Ref.current || !outerRing3Ref.current || !dotsRef.current || !abhayRef.current || !tejasRef.current || !textRef.current) return

    // Initial mask size - small rectangle in the center (wider + taller proportion on mobile)
    const isMobile = window.innerWidth < 768
    const initialWidth = isMobile ? 340 : 500
    const initialHeight = isMobile ? 130 : 150
    const ringGap1 = isMobile ? 28 : 40
    const ringGap2 = isMobile ? 40 : 56
    const ringGap3 = isMobile ? 72 : 100
    const ringGap4 = isMobile ? 88 : 120

    const updateMask = (progress: number) => {
      if (!rectRef.current || !svgRef.current || !borderSvgRef.current || !borderRef.current || !middleRingRef.current || !outerRingRef.current || !outerRing2Ref.current || !outerRing3Ref.current || !dotsRef.current) return
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
      // Mobile: width ends at viewport width (grow less in width); height grows more (uses maxDimension)
      const widthProgress = isMobile ? progress * 0.88 : progress
      const heightProgress = isMobile ? progress * 1.2 : progress * 0.7
      const endWidthMobile = viewportWidth * 1.1
      const currentWidth = isMobile
        ? initialWidth + (endWidthMobile - initialWidth) * widthProgress
        : initialWidth + (maxDimension - initialWidth) * widthProgress
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
      // Update middle concentric ring
      middleRingRef.current.setAttribute('x', String(rectX - ringGap1))
      middleRingRef.current.setAttribute('y', String(rectY - ringGap1))
      middleRingRef.current.setAttribute('width', String(currentWidth + 2 * ringGap1))
      middleRingRef.current.setAttribute('height', String(currentHeight + 2 * ringGap1))
      // Update outer concentric ring
      outerRingRef.current.setAttribute('x', String(rectX - ringGap1 - ringGap2))
      outerRingRef.current.setAttribute('y', String(rectY - ringGap1 - ringGap2))
      outerRingRef.current.setAttribute('width', String(currentWidth + 2 * (ringGap1 + ringGap2)))
      outerRingRef.current.setAttribute('height', String(currentHeight + 2 * (ringGap1 + ringGap2)))
      // Update outer ring 2
      const offset3 = ringGap1 + ringGap2 + ringGap3
      outerRing2Ref.current.setAttribute('x', String(rectX - offset3))
      outerRing2Ref.current.setAttribute('y', String(rectY - offset3))
      outerRing2Ref.current.setAttribute('width', String(currentWidth + 2 * offset3))
      outerRing2Ref.current.setAttribute('height', String(currentHeight + 2 * offset3))
      // Update outer ring 3
      const offset4 = ringGap1 + ringGap2 + ringGap3 + ringGap4
      outerRing3Ref.current.setAttribute('x', String(rectX - offset4))
      outerRing3Ref.current.setAttribute('y', String(rectY - offset4))
      outerRing3Ref.current.setAttribute('width', String(currentWidth + 2 * offset4))
      outerRing3Ref.current.setAttribute('height', String(currentHeight + 2 * offset4))
      
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
        const textYOffset = isMobile ? 3 : 20 // Mobile: 12px up from center
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
      if (!rectRef.current || !svgRef.current || !borderSvgRef.current || !borderRef.current || !middleRingRef.current || !outerRingRef.current || !outerRing2Ref.current || !outerRing3Ref.current || !dotsRef.current) return
      
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
      // Initialize middle and outer concentric rings
      middleRingRef.current.setAttribute('x', String(initialX - ringGap1))
      middleRingRef.current.setAttribute('y', String(initialY - ringGap1))
      middleRingRef.current.setAttribute('width', String(initialWidth + 2 * ringGap1))
      middleRingRef.current.setAttribute('height', String(initialHeight + 2 * ringGap1))
      outerRingRef.current.setAttribute('x', String(initialX - ringGap1 - ringGap2))
      outerRingRef.current.setAttribute('y', String(initialY - ringGap1 - ringGap2))
      outerRingRef.current.setAttribute('width', String(initialWidth + 2 * (ringGap1 + ringGap2)))
      outerRingRef.current.setAttribute('height', String(initialHeight + 2 * (ringGap1 + ringGap2)))
      const offset3 = ringGap1 + ringGap2 + ringGap3
      outerRing2Ref.current.setAttribute('x', String(initialX - offset3))
      outerRing2Ref.current.setAttribute('y', String(initialY - offset3))
      outerRing2Ref.current.setAttribute('width', String(initialWidth + 2 * offset3))
      outerRing2Ref.current.setAttribute('height', String(initialHeight + 2 * offset3))
      const offset4 = ringGap1 + ringGap2 + ringGap3 + ringGap4
      outerRing3Ref.current.setAttribute('x', String(initialX - offset4))
      outerRing3Ref.current.setAttribute('y', String(initialY - offset4))
      outerRing3Ref.current.setAttribute('width', String(initialWidth + 2 * offset4))
      outerRing3Ref.current.setAttribute('height', String(initialHeight + 2 * offset4))
      
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
        textRef.current.style.top = `${centerY + (isMobile ? 3 : 20)}px` // Center vertically; mobile: 12px up from center
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
      const initialWidth = isMobile ? 340 : 500
      const initialHeight = isMobile ? 130 : 150
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
        textRef.current.style.top = `${centerY + (isMobile ? 3 : 20)}px` // Center vertically; mobile: 12px up from center
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

  // Calculate responsive dimensions for initial SVG values (mobile: wider, taller proportion)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const svgInitialWidth = isMobile ? 340 : 500
  const svgInitialHeight = isMobile ? 130 : 150

  // Match SVG viewBox to window so mask/rect coordinates (innerWidth/innerHeight) align and box is centered
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1920
  const viewportH = typeof window !== 'undefined' ? window.innerHeight : 1080
  const viewBox = `0 0 ${viewportW} ${viewportH}`

  // Use computed center on first paint so box is centered before resize effect runs
  const boxCenter =
    initialCenter.x === 0 && initialCenter.y === 0 && typeof window !== 'undefined'
      ? { x: viewportW / 2 - svgInitialWidth / 2, y: viewportH / 2 - svgInitialHeight / 2 }
      : initialCenter

  // Concentric rectangle gaps (outward from inner box) - increased sizes
  const ringGap1 = isMobile ? 28 : 40
  const ringGap2 = isMobile ? 40 : 56
  const ringGap3 = isMobile ? 72 : 100
  const ringGap4 = isMobile ? 88 : 120

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
          {/* Outermost concentric rectangle 3 - 25% opacity */}
          <rect
            ref={outerRing3Ref}
            x={boxCenter.x - ringGap1 - ringGap2 - ringGap3 - ringGap4}
            y={boxCenter.y - ringGap1 - ringGap2 - ringGap3 - ringGap4}
            width={svgInitialWidth + 2 * (ringGap1 + ringGap2 + ringGap3 + ringGap4)}
            height={svgInitialHeight + 2 * (ringGap1 + ringGap2 + ringGap3 + ringGap4)}
            fill="none"
            stroke="rgb(212, 212, 216)"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeOpacity="0.25"
          />
          {/* Outermost concentric rectangle 2 - 40% opacity */}
          <rect
            ref={outerRing2Ref}
            x={boxCenter.x - ringGap1 - ringGap2 - ringGap3}
            y={boxCenter.y - ringGap1 - ringGap2 - ringGap3}
            width={svgInitialWidth + 2 * (ringGap1 + ringGap2 + ringGap3)}
            height={svgInitialHeight + 2 * (ringGap1 + ringGap2 + ringGap3)}
            fill="none"
            stroke="rgb(212, 212, 216)"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeOpacity="0.4"
          />
          {/* Outer concentric rectangle - 65% opacity */}
          <rect
            ref={outerRingRef}
            x={boxCenter.x - ringGap1 - ringGap2}
            y={boxCenter.y - ringGap1 - ringGap2}
            width={svgInitialWidth + 2 * (ringGap1 + ringGap2)}
            height={svgInitialHeight + 2 * (ringGap1 + ringGap2)}
            fill="none"
            stroke="rgb(212, 212, 216)"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeOpacity="0.65"
          />
          {/* Middle concentric rectangle - 80% opacity */}
          <rect
            ref={middleRingRef}
            x={boxCenter.x - ringGap1}
            y={boxCenter.y - ringGap1}
            width={svgInitialWidth + 2 * ringGap1}
            height={svgInitialHeight + 2 * ringGap1}
            fill="none"
            stroke="rgb(212, 212, 216)"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeOpacity="0.8"
          />
          {/* Innermost border rectangle (with corner handles) - 100% opacity */}
          <rect
            ref={borderRef}
            x={boxCenter.x}
            y={boxCenter.y}
            width={svgInitialWidth}
            height={svgInitialHeight}
            fill="none"
            stroke="rgb(212, 212, 216)"
            strokeWidth="2"
            strokeDasharray="2 6"
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
      <div
        ref={abhayRef}
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
      >
        <div className="reveal-floating-abhay" style={{ width: '100%', height: '100%' }}>
          <img
            src="/images/reveal/abhay.png"
            alt="Abhay"
            width={400}
            height={400}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>

      {/* Tejas Image - positioned RIGHT, moves right off screen, enlarges, and blurs (hidden on mobile) */}
      <div
        ref={tejasRef}
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
      >
        <div className="reveal-floating-tejas" style={{ width: '100%', height: '100%' }}>
          <img
            src="/images/reveal/tejas.png"
            alt="Tejas"
            width={400}
            height={400}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
      
      {/* Text inside reveal box - centered and visible */}
      <div
        ref={textRef}
        style={{
          position: 'fixed',
          left: '50%',
          top: isMobile ? 'calc(50% + 3px)' : 'calc(50% + 20px)',
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

      {/* Product Designer: above mask box (hidden on mobile) */}
      <div
        ref={productDesignerRef}
        style={{
          position: 'fixed',
          display: isMobile ? 'none' : 'block',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, calc(-50% - 95px))',
          width: svgInitialWidth,
          zIndex: 10003,
          pointerEvents: 'auto',
          color: '#7A7A7A',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: '20px',
          lineHeight: 1.2,
          textAlign: 'right',
          opacity: 0,
        }}
      >
        Product Designer
      </div>

      {/* Web Developer: below mask box (hidden on mobile) */}
      <div
        ref={webDeveloperRef}
        style={{
          position: 'fixed',
          display: isMobile ? 'none' : 'block',
          left: '50%',
          top: '50%',
          transform: 'translate(calc(-50% + 14px), calc(-50% + 95px))',
          width: svgInitialWidth,
          zIndex: 10003,
          pointerEvents: 'auto',
          color: '#7A7A7A',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: '20px',
          lineHeight: 1.2,
          textAlign: 'left',
          opacity: 0,
        }}
      >
        Web Developer
      </div>

      {/* Mobile only: single paragraph below mask, above scroll */}
      <div
        ref={introParagraphRef}
        style={{
          position: 'fixed',
          left: 'clamp(1.5rem, 6vw, 4rem)',
          right: 'clamp(1.5rem, 6vw, 4rem)',
          bottom: 'calc(clamp(1.5rem, 5vh, 2.5rem) + 175px)',
          marginLeft: 15,
          display: isMobile ? 'block' : 'none',
          zIndex: 10003,
          pointerEvents: 'auto',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: '18px',
          lineHeight: 1.4,
          textAlign: 'left',
          color: '#7A7A7A',
          opacity: 0,
        }}
      >
        <span style={{ color: '#BEBEBE' }}>Hi, I'm a </span>
        <span>Product Designer & Front-End Engineer </span>
        <span style={{ color: '#BEBEBE' }}>based in </span>
        <span>
          <span className="reveal-hubli-hover" style={{ color: '#7A7A7A' }}>Hubli</span>
          <span style={{ color: '#7A7A7A' }}>, </span>
          <span className="reveal-karnataka-hover" style={{ color: '#7A7A7A' }}>Karnataka</span>
          <span style={{ color: '#7A7A7A' }}>.</span>
        </span>
      </div>

      {/* Desktop: top-right */}
      <div
        ref={hiImARef}
        style={{
          position: 'fixed',
          display: isMobile ? 'none' : 'block',
          right: 'clamp(1.5rem, 6vw, 4rem)',
          top: 'calc(clamp(6rem, 18vh, 12rem) - 90px)',
          zIndex: 10003,
          pointerEvents: 'auto',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: '24px',
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

      {/* Desktop: bottom-left */}
      <div
        ref={basedInRef}
        style={{
          position: 'fixed',
          display: isMobile ? 'none' : 'block',
          left: 'clamp(1.5rem, 6vw, 4rem)',
          bottom: 'calc(clamp(5rem, 18vh, 10rem) - 110px)',
          zIndex: 10003,
          pointerEvents: 'auto',
          fontFamily: 'Saans Regular, sans-serif',
          fontSize: '24px',
          lineHeight: 1.2,
          textAlign: 'left',
          whiteSpace: 'pre-line',
          maxWidth: '200px',
          opacity: 0,
        }}
      >
        <span style={{ color: '#BEBEBE' }}>based in</span>
        {'\n'}
        <span style={{ color: '#7A7A7A' }}>
          <span className="reveal-hubli-hover">Hubli</span>, <span className="reveal-karnataka-hover">Karnataka</span>.
        </span>
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
