"use client"

import Image from 'next/image'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Each item: image path (empty = placeholder), alt text
// Desktop placement: gridColumn / gridRow (4-col, 6-row grid, row height 200px)
const items = [
  { image: '', alt: 'Visual 01',  col: '1 / 3', row: '1 / 3' },
  { image: '', alt: 'Visual 02',  col: '3 / 4', row: '1 / 2' },
  { image: '', alt: 'Visual 03',  col: '4 / 5', row: '1 / 3' },
  { image: '', alt: 'Visual 04',  col: '3 / 4', row: '2 / 3' },
  { image: '', alt: 'Visual 05',  col: '1 / 2', row: '3 / 5' },
  { image: '', alt: 'Visual 06',  col: '2 / 4', row: '3 / 4', comingSoon: true },
  { image: '', alt: 'Visual 07',  col: '4 / 5', row: '3 / 4' },
  { image: '', alt: 'Visual 08',  col: '2 / 4', row: '4 / 5' },
  { image: '', alt: 'Visual 09',  col: '4 / 5', row: '4 / 5' },
  { image: '', alt: 'Visual 10',  col: '1 / 2', row: '5 / 6' },
  { image: '', alt: 'Visual 11',  col: '2 / 4', row: '5 / 7' },
  { image: '', alt: 'Visual 12',  col: '4 / 5', row: '5 / 7' },
  { image: '', alt: 'Visual 13',  col: '1 / 2', row: '6 / 7' },
]

export default function VisualIdentityGallery() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const visualEl   = useRef<HTMLHeadingElement>(null)
  const identityEl = useRef<HTMLHeadingElement>(null)
  const lineEl     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const header   = headerRef.current
    const visual   = visualEl.current
    const identity = identityEl.current
    const line     = lineEl.current
    if (!header || !visual || !identity || !line) return

    let tl: gsap.core.Timeline

    const setup = () => {
      const cRect = header.getBoundingClientRect()
      const vRect = visual.getBoundingClientRect()
      const iRect = identity.getBoundingClientRect()

      const paddingX     = parseFloat(window.getComputedStyle(header).paddingLeft)
      const contentLeft  = cRect.left + paddingX
      const contentRight = cRect.right - paddingX

      const visualFinalX   = contentLeft - vRect.left
      const identityFinalX = (contentRight - iRect.width) - iRect.left

      gsap.set(line, { scaleX: 0, transformOrigin: 'center center', opacity: 0 })

      tl = gsap.timeline({
        defaults: { duration: 1.1, ease: 'power3.inOut' },
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(visual,   { x: visualFinalX }, 0)
        .to(line,     { scaleX: 1, opacity: 1, ease: 'power2.inOut' }, 0)
        .to(identity, { x: identityFinalX }, 0)
    }

    document.fonts.ready.then(() => requestAnimationFrame(setup))

    return () => { tl?.kill() }
  }, [])

  return (
    <div className="mt-20 md:mt-28">

      {/* ── Section header ──────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="px-6 md:px-10 pb-8 md:pb-12 overflow-hidden"
      >
        <div className="relative">
          <div
            ref={lineEl}
            className="absolute inset-x-0 border-t border-gray-300"
            style={{ top: '50%' }}
          />
          <div className="relative flex items-baseline justify-center gap-2">
            <h2
              ref={visualEl}
              className="relative bg-white pr-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>V</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>isual</span>
            </h2>
            <h2
              ref={identityEl}
              className="relative bg-white pl-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap"
            >
              <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.5em' }}>I</span><span style={{ fontFamily: 'SatishSans, sans-serif' }}>dentity</span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Desktop collage (md+) ─────────────────────────────── */}
      <div
        className="hidden md:grid gap-2"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '200px',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-gray-50"
            style={{ gridColumn: item.col, gridRow: item.row }}
          >
            {item.image ? (
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 1280px) 33vw, 25vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 border border-dashed border-gray-200" />
            )}

            {/* SA26 watermark */}
            <img
              src="/images/common/sa26.svg"
              aria-hidden="true"
              className="absolute inset-0 m-auto pointer-events-none select-none"
              style={{ width: '36px', height: '36px', opacity: 0.08 }}
            />

            {/* Coming soon label */}
            {'comingSoon' in item && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-400 tracking-widest uppercase" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                  Coming soon
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Mobile collage (2-col, natural flow) ─────────────── */}
      <div
        className="grid md:hidden gap-1.5 px-6"
        style={{
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridAutoRows: '140px',
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden bg-gray-50"
            style={i % 5 === 0 ? { gridColumn: '1 / 3' } : undefined}
          >
            {item.image ? (
              <Image src={item.image} alt={item.alt} fill sizes="50vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 border border-dashed border-gray-200" />
            )}

            {/* SA26 watermark */}
            <img
              src="/images/common/sa26.svg"
              aria-hidden="true"
              className="absolute inset-0 m-auto pointer-events-none select-none"
              style={{ width: '32px', height: '32px', opacity: 0.08 }}
            />

            {'comingSoon' in item && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-gray-400 tracking-widest uppercase" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                  Coming soon
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
