"use client"

import Link from 'next/link'
import Image from 'next/image'

const allWorks = [
  {
    title: 'Smart Nation',
    href: '/works/smartNation',
    image: '/images/HomeImages/smartnation-tumbnail-home.png',
    year: '2025',
  },
  {
    title: 'Blume Health',
    href: '/works/blumeHealth',
    image: '/images/WorkImages/blumeHealthImages/BM-thumnail.png',
    year: '2025',
  },
  {
    title: 'SkinSage',
    href: '/works/skinSage',
    image: '/images/WorkImages/skinSageImages/SS-thumnail-1.png',
    year: '2025',
  },
  {
    title: 'SkillRadius',
    href: '/works/skillRadius',
    image: '/images/WorkImages/skillradius/SR-thumnail.png',
    year: '2025',
  },
]

function CornerMark({ v = 'top', h = 'left', className = '' }: { v?: 'top' | 'bottom'; h?: 'left' | 'right'; className?: string }) {
  return (
    <span
      className={`absolute z-10 pointer-events-none select-none ${className}`}
      style={{
        [v]: 0,
        [h]: 0,
        transform: `translate(${h === 'left' ? '-50%' : '50%'}, ${v === 'top' ? '-50%' : '50%'})`,
        fontFamily: 'monospace',
        fontSize: 13,
        lineHeight: 1,
        color: '#9ca3af',
      }}
    >
      +
    </span>
  )
}

export default function MoreWorks({ current }: { current: string }) {
  const others = allWorks.filter((w) => w.href !== current)

  return (
    <div className="mt-16 max-w-5xl mx-auto">
      <h2
        className="text-2xl md:text-3xl text-gray-900 mb-6 px-6 md:px-10"
        style={{ fontFamily: 'SatishSans, sans-serif', fontWeight: 'normal' }}
      >
        More Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3 px-6 md:px-0">
        {others.map((work, i) => {
          const isLast = i === others.length - 1
          return (
            <Link
              key={work.href}
              href={work.href}
              className="group relative overflow-visible block bg-gray-50 aspect-video border border-gray-200"
            >
              {/* Top-left: always show */}
              <CornerMark v="top" h="left" />
              {/* Top-right: always show on mobile, only on last card on desktop */}
              <CornerMark v="top" h="right" className={!isLast ? 'md:hidden' : ''} />
              {/* Bottom-left: always show */}
              <CornerMark v="bottom" h="left" />
              {/* Bottom-right: always show on mobile, only on last card on desktop */}
              <CornerMark v="bottom" h="right" className={!isLast ? 'md:hidden' : ''} />

              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end p-4">
                <div className="translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p
                    className="text-white text-sm font-light"
                    style={{ fontFamily: 'SatishSans, sans-serif' }}
                  >
                    {work.title}
                  </p>
                  <p
                    className="text-white/60 text-xs"
                    style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  >
                    {work.year}
                  </p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
