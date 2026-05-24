"use client"

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    num: '01',
    title: 'A',
    description: 'Placeholder project card. You can replace this with your real project details later.',
    emoji: '🌿',
  },
  {
    num: '02',
    title: 'B',
    description: 'Placeholder project card. You can replace this with your real project details later.',
    emoji: '🪴',
  },
  {
    num: '03',
    title: 'C',
    description: 'Placeholder project card. You can replace this with your real project details later.',
    emoji: '🍃',
  },
  {
    num: '04',
    title: 'D',
    description: 'Placeholder project card. You can replace this with your real project details later.',
    emoji: '🌱',
  },
]

export default function WorkGallery() {
  const headerRef  = useRef<HTMLDivElement>(null)
  const branchContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = branchContainerRef.current
    if (!container) return

    const header = headerRef.current
    const cards = gsap.utils.toArray<HTMLElement>('[data-project-card]', container)
    const images = gsap.utils.toArray<HTMLElement>('[data-project-image]', container)
    const lineLeft = header?.querySelector<HTMLElement>('[data-project-line-left]')
    const lineRight = header?.querySelector<HTMLElement>('[data-project-line-right]')
    const projectTitle = header?.querySelector<HTMLElement>('[data-project-title]')
    if (!cards.length) return

    const localTriggers: ScrollTrigger[] = []

    // 1) Staggered reveal when the section enters view.
    const revealTween = gsap.from(cards, {
      opacity: 0,
      y: 24,
      duration: 0.75,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: cards[0].parentElement,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })
    if (revealTween.scrollTrigger) localTriggers.push(revealTween.scrollTrigger)

    // 2) Subtle image parallax for depth while scrolling.
    images.forEach((img) => {
      const card = img.closest('[data-project-card]')
      if (!card) return

      const parallaxTween = gsap.fromTo(
        img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
      if (parallaxTween.scrollTrigger) localTriggers.push(parallaxTween.scrollTrigger)
    })

    // 3) Active-card emphasis based on viewport position.
    cards.forEach((card) => {
      gsap.set(card, { opacity: 0.86, scale: 0.985 })

      const st = ScrollTrigger.create({
        trigger: card,
        start: 'top 70%',
        end: 'bottom 35%',
        onEnter: () => gsap.to(card, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }),
        onEnterBack: () => gsap.to(card, { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out' }),
        onLeave: () => gsap.to(card, { opacity: 0.86, scale: 0.985, duration: 0.35, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(card, { opacity: 0.86, scale: 0.985, duration: 0.35, ease: 'power2.out' }),
      })
      localTriggers.push(st)
    })

    // 4) Directional draw-in for section line.
    if (projectTitle) {
      gsap.set(projectTitle, { opacity: 0, y: 22, scale: 0.96 })

      const titleTween = gsap.to(projectTitle, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 86%',
          toggleActions: 'play none none reverse',
        },
      })
      if (titleTween.scrollTrigger) localTriggers.push(titleTween.scrollTrigger)
    }

    if (lineLeft && lineRight) {
      gsap.set(lineLeft, { opacity: 0, scaleX: 0, transformOrigin: 'right center' })
      gsap.set(lineRight, { opacity: 0, scaleX: 0, transformOrigin: 'left center' })

      const lineTween = gsap.to([lineLeft, lineRight], {
        opacity: 1,
        scaleX: 1,
        duration: 0.9,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: header,
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      })
      if (lineTween.scrollTrigger) localTriggers.push(lineTween.scrollTrigger)
    }

    return () => {
      localTriggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className="pb-28 md:pb-36">

      {/* ── Section header ──────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="px-6 md:px-10 pt-28 md:pt-40 pb-14 md:pb-20 overflow-hidden"
      >
        <div className="relative flex items-center justify-center gap-6">
          <div data-project-line-left className="h-0 border-t border-gray-300 flex-1" />
          <h2 data-project-title className="relative bg-transparent px-3 text-2xl md:text-3xl font-light text-black shrink-0 whitespace-nowrap" style={{ marginTop: '6px' }}>
            <span style={{ fontFamily: 'SuprithCapsSans, sans-serif', fontSize: '1.5em' }}>P</span><span style={{ fontFamily: 'SuprithSans, sans-serif' }}>rojects</span>
          </h2>
          <div data-project-line-right className="h-0 border-t border-gray-300 flex-1" />
        </div>
      </div>

      {/* ── Works list ─────────────────────────────────────── */}
      <div className="relative" ref={branchContainerRef}>
      <div
        className="project-section-grid"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col gap-8 md:gap-10">
        {works.map((work) => (
          <div
            key={work.num}
            data-project-card
            className="grid grid-cols-1 gap-0 overflow-hidden rounded-[28px] border border-black/8 bg-white/70 shadow-[0_18px_45px_rgba(0,0,0,0.04)] backdrop-blur-sm md:min-h-[32rem] md:grid-cols-[1.2fr_0.8fr]"
          >
            {/* Info — left on desktop, below image on mobile */}
            <div className="order-2 flex flex-col justify-between p-7 md:order-1 md:p-10">
              <div>
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span
                    className="text-[11px] uppercase tracking-[0.24em] text-gray-300"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    {work.num}
                  </span>
                  <span
                    className="rounded-full border border-black/8 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gray-400"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    Placeholder
                  </span>
                </div>
                <h3
                  className="mb-4 text-3xl md:text-4xl font-light text-black"
                  style={{ fontFamily: 'SuprithSans, sans-serif' }}
                >
                  {work.title}
                </h3>
                <p
                  className="max-w-md text-sm leading-relaxed text-gray-400 md:text-[15px]"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  {work.description}
                </p>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-black/6 pt-5">
                <span
                  className="text-xs text-gray-300"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  Coming later
                </span>
                <span
                  className="text-xs uppercase tracking-[0.2em] text-gray-300"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  Portfolio
                </span>
              </div>
            </div>

            {/* Placeholder visual — right on desktop, above info on mobile */}
            <div className="relative order-1 flex aspect-[5/4] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff_0%,#f7f3ea_58%,#f1ece3_100%)] md:order-2 md:aspect-auto">
              <div className="absolute inset-6 rounded-[24px] border border-white/70 bg-white/25" />
              <div
                data-project-image
                className="relative flex h-full w-full items-center justify-center text-[4.75rem] md:text-[6.5rem]"
                aria-hidden="true"
              >
                {work.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>

      </div>{/* end relative wrapper */}

    </div>
  )
}
