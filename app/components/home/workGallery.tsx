"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    num: '01',
    title: 'Smart Nation',
    description: 'Built the brand from scratch — logo, design system, app UI, and motion graphics for a smart home IoT startup going from zero to launch.',
    image: '/images/HomeImages/smartnation-tumbnail-home.png',
    href: '/works/smartNation',
    year: '2024',
    available: true,
  },
  {
    num: '02',
    title: 'Abhiyantrik Website',
    description: 'Redesigned and built the company website end-to-end, along with a product experience deck that communicates the hardware offering clearly.',
    image: '/images/HomeImages/Abhiyanyrik-tumbnail-home.png',
    href: '/works/abhiyantrikWebsite',
    year: '2023',
    available: true,
  },
]

// Corner plus marker
const Plus = ({ h, v = 'bottom' }: { h: 'left' | 'right'; v?: 'top' | 'bottom' }) => (
  <span
    className="absolute select-none pointer-events-none"
    style={{
      [h]: 0,
      [v]: 0,
      transform: `translate(${h === 'left' ? '-50%' : '50%'}, ${v === 'top' ? '-50%' : '50%'})`,
      fontFamily: 'monospace',
      fontSize: '13px',
      lineHeight: 1,
      color: '#9ca3af',
      zIndex: 10,
    }}
  >+</span>
)

export default function WorkGallery() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const selectedEl = useRef<HTMLHeadingElement>(null)
  const worksEl    = useRef<HTMLHeadingElement>(null)
  const lineEl     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header   = headerRef.current
    const selected = selectedEl.current
    const worksH   = worksEl.current
    const line     = lineEl.current
    if (!header || !selected || !worksH || !line) return

    let tl: gsap.core.Timeline

    const setup = () => {
      // Words are centered via CSS (justify-center) — this IS the initial state.
      // We calculate where they need to animate TO (left edge / right edge of content area).
      const cRect = header.getBoundingClientRect()
      const sRect = selected.getBoundingClientRect()
      const wRect = worksH.getBoundingClientRect()

      // line uses inset-x-0 on the inner wrapper (header minus its padding)
      const paddingX    = parseFloat(window.getComputedStyle(header).paddingLeft)
      const contentLeft  = cRect.left  + paddingX
      const contentRight = cRect.right - paddingX

      // How far each word moves from its centered position to the edge
      const selectedFinalX = contentLeft - sRect.left               // negative → moves left
      const worksFinalX    = (contentRight - wRect.width) - wRect.left  // positive → moves right

      // Hide line at start
      gsap.set(line, { scaleX: 0, transformOrigin: 'center center', opacity: 0 })

      // One-shot animation triggered when section enters view.
      // toggleActions: play forward on enter, reverse on leave-back.
      tl = gsap.timeline({
        defaults: { duration: 1.1, ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(selected, { x: selectedFinalX }, 0)
        .to(line,     { scaleX: 1, opacity: 1, ease: 'power2.inOut' }, 0)
        .to(worksH,   { x: worksFinalX }, 0)
    }

    document.fonts.ready.then(() => requestAnimationFrame(setup))

    return () => { tl?.kill() }
  }, [])

  return (
    <div>

      {/* ── Section header ──────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="px-6 md:px-10 pb-8 md:pb-12 overflow-hidden"
      >
        {/* Inner wrapper: height = text height only, so top:50% = text midline */}
        <div className="relative">
          {/* Line: spans full content width, vertically centred with the text */}
          <div
            ref={lineEl}
            className="absolute inset-x-0 border-t border-gray-300"
            style={{ top: '50%' }}
          />

          {/* Words: start naturally centered side-by-side */}
          <div className="relative flex items-baseline justify-center gap-2">
            <h2
              ref={selectedEl}
              className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>S</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>elected</span>
            </h2>
            <h2
              ref={worksEl}
              className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>W</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>orks</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Works list ─────────────────────────────────────── */}
      <div className="flex flex-col gap-20 md:gap-28">
        {works.map((work) => (
          <div
            key={work.num}
            className="relative border border-gray-200 grid grid-cols-1 md:grid-cols-2"
          >
            {/* Corner plus markers */}
            <Plus h="left"  v="top" />
            <Plus h="right" v="top" />
            <Plus h="left"  v="bottom" />
            <Plus h="right" v="bottom" />

            {/* Info — left on desktop, below image on mobile */}
            <div className="p-6 md:p-10 flex flex-col justify-between order-2 md:order-1">
              <div>
                <h3
                  className="text-2xl md:text-3xl font-light text-black mb-4"
                  style={{ fontFamily: 'SatishSans, sans-serif' }}
                >
                  {work.title}
                </h3>
                <p
                  className="text-sm text-gray-400 leading-relaxed max-w-sm"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  {work.description}
                </p>
              </div>

              <div className="mt-8 flex items-end justify-between">
                <span
                  className="text-xs text-gray-400"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  {work.year}
                </span>
                {work.available && work.href && (
                  <Link
                    href={work.href}
                    className="px-4 py-2 border border-gray-900 text-xs text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200 shrink-0 flex items-center gap-2"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    View Work
                    <svg xmlns="http://www.w3.org/2000/svg" height="14px" viewBox="0 -960 960 960" width="14px" fill="currentColor">
                      <path d="M251.77-254.23 210-296l393.62-394H245.77v-60h460v460h-60v-357.85l-394 393.62Z"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>

            {/* Image — right on desktop, above info on mobile */}
            <div className="relative overflow-hidden order-1 md:order-2 aspect-square">
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={`object-cover${work.available ? '' : ' blur-sm brightness-75'}`}
              />
              {!work.available && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-white/70 text-xs tracking-widest uppercase"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    Posting soon
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
