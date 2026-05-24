"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Default config (used if no saved config exists)
const DEFAULT = {
  ABHAY: {
    src: "/images/HomeImages/greek2.svg",
    width: 590,
    left: "-35%",
    top: "-2%",
    rotate: -11,
    offset: { x: -16.67578125, y: -101.71484375 },
  },
  TEJAS: {
    src: "/images/HomeImages/greek1.svg",
    width: 510,
    right: "-35%",
    top: "40%",
    rotate: -6,
    offset: { x: 34.2578125, y: -204.05078125 },
  }
}

// Decorative pillars that sit behind the parallax images
const PILLARS = {
  LEFT: {
    width: 140,
    height: '86vh',
    left: '-22%',
    top: '6%',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.07), rgba(0,0,0,0.02))',
    borderRadius: '28px',
    blur: 14,
  },
  RIGHT: {
    width: 140,
    height: '86vh',
    right: '-22%',
    top: '26%',
    background: 'linear-gradient(180deg, rgba(0,0,0,0.07), rgba(0,0,0,0.02))',
    borderRadius: '28px',
    blur: 14,
  }
}

const STORAGE_KEY = 'parallax-config-v1'

export default function ParallaxImages() {
  const abhayDesktop = useRef<HTMLDivElement>(null)
  const tejasDesktop = useRef<HTMLDivElement>(null)
  const abhayMobile  = useRef<HTMLDivElement>(null)
  const tejasMobile  = useRef<HTMLDivElement>(null)
  // Initialize with DEFAULT on both server and client to avoid hydration mismatch.
  const [config, setConfig] = useState(DEFAULT)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }

      // Desktop: drift down + slide outward
      gsap.to(abhayDesktop.current, {
        y: 0,
        x: () =>  window.innerWidth  * 0.1,
        ease: 'none',
        scrollTrigger: st,
      })
      gsap.to(tejasDesktop.current, {
        y: 0,
        x: () => -window.innerWidth  * 0.1,
        ease: 'none',
        scrollTrigger: st,
      })

      // Mobile: slide off-screen to their respective sides on scroll
      const mobileScrollST = {
        trigger: document.body,
        start:   'top top',
        end:     '25% top',
        scrub:   true,
      }
      gsap.to(abhayMobile.current, {
        x:       () => window.innerWidth * 0.14,
        opacity:  0,
        ease:    'none',
        scrollTrigger: mobileScrollST,
      })
      gsap.to(tejasMobile.current, {
        x:       () => -window.innerWidth * 0.14,
        opacity:  0,
        ease:    'none',
        scrollTrigger: mobileScrollST,
      })
    })

    return () => ctx.revert()
  }, [])

  // static display — editor removed

  return (
    <>
      {/* ── Decorative pillars (behind images) ───────────────────────── */}
      <div
        className="absolute hidden md:block pointer-events-none"
        style={{
          width: `${PILLARS.LEFT.width}px`,
          height: PILLARS.LEFT.height,
          left: PILLARS.LEFT.left,
          top: PILLARS.LEFT.top,
          background: PILLARS.LEFT.background,
          borderRadius: PILLARS.LEFT.borderRadius,
          filter: `blur(${PILLARS.LEFT.blur}px)`,
          zIndex: 5,
        }}
      />
      <div
        className="absolute hidden md:block pointer-events-none"
        style={{
          width: `${PILLARS.RIGHT.width}px`,
          height: PILLARS.RIGHT.height,
          right: PILLARS.RIGHT.right,
          top: PILLARS.RIGHT.top,
          background: PILLARS.RIGHT.background,
          borderRadius: PILLARS.RIGHT.borderRadius,
          filter: `blur(${PILLARS.RIGHT.blur}px)`,
          zIndex: 5,
        }}
      />

      {/* ── Desktop ──────────────────────────────────────────── */}
      <div
        ref={abhayDesktop}
        className={"absolute h-auto hidden md:block pointer-events-none"}
        style={{ width: `${config.ABHAY.width}px`, left: config.ABHAY.left, top: config.ABHAY.top, transform: `rotate(${config.ABHAY.rotate}deg) translate(${(config.ABHAY.offset?.x||0)}px, ${(config.ABHAY.offset?.y||0)}px)`, zIndex: 10 }}
      >
        <Image src={config.ABHAY.src} alt="Abhay" width={config.ABHAY.width} height={500} className="w-full h-auto object-contain block" />
      </div>
      <div
        ref={tejasDesktop}
        className={"absolute h-auto hidden md:block pointer-events-none"}
        style={{ width: `${config.TEJAS.width}px`, right: config.TEJAS.right, top: config.TEJAS.top, transform: `rotate(${config.TEJAS.rotate}deg) translate(${(config.TEJAS.offset?.x||0)}px, ${(config.TEJAS.offset?.y||0)}px)`, zIndex: 10 }}
      >
        <Image src={config.TEJAS.src} alt="Tejas" width={config.TEJAS.width} height={500} className="w-full h-auto object-contain block" />
      </div>

      {/* ── Mobile — fixed to viewport, no container clipping ───────────────── */}
      <div
        ref={abhayMobile}
        className="fixed block md:hidden pointer-events-none"
        style={{ width: 300, left: -135, top: '12vh', transform: 'rotate(22deg)', zIndex: 10 }}
      >
        <Image src={config.ABHAY.src} alt="Abhay" width={300} height={415} className="w-full h-auto object-contain block" />
      </div>
      <div
        ref={tejasMobile}
        className="fixed block md:hidden pointer-events-none"
        style={{ width: 240, left: 'calc(100vw - 130px)', top: '22vh', transform: 'rotate(-18deg)', zIndex: 10 }}
      >
        <Image src={config.TEJAS.src} alt="Tejas" width={240} height={340} className="w-full h-auto object-contain block" />
      </div>

      {/* editor removed */}
    </>
  )
}
