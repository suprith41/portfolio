"use client"
import Link from 'next/link'
import Image from 'next/image'
import GridDivider from '../ui/GridDivider'

const majorWorks = [
  {
    id: 'smartNation',
    num: '01',
    title: 'Smart Nation',
    tag: 'App Design · Branding · Motion',
    description: 'Built the brand from scratch — logo, design system, app UI, and motion graphics for a smart home IoT startup going from zero to launch.',
    image: '/images/HomeImages/smartNation-frame.png',
    href: '/works/smartNation',
    available: true,
    client: 'Smart Nation',
    year: '2024',
  },
  {
    id: 'abhiyantrik',
    num: '02',
    title: 'Abhiyantrik Website',
    tag: 'Web Design · Development',
    description: 'Redesigned and built the company website end-to-end, along with a product experience deck that communicates the hardware offering clearly.',
    image: '/images/HomeImages/abhiyantrik-frame.png',
    href: '/works/abhiyantrikWebsite',
    available: true,
    client: 'Abhiyantrik Solutions',
    year: '2023',
  },
  {
    id: 'wagwan',
    num: '03',
    title: 'Wagwan',
    tag: 'Coming Soon',
    description: 'Details dropping soon.',
    image: '/images/HomeImages/wagwan-frame.png',
    href: null,
    available: false,
    client: '—',
    year: '—',
  },
  {
    id: 'wagwanEvents',
    num: '04',
    title: 'Wagwan Events',
    tag: 'Coming Soon',
    description: 'Details dropping soon.',
    image: '/images/HomeImages/wagwan-events-frame.png',
    href: null,
    available: false,
    client: '—',
    year: '—',
  },
]

const smallWorks = [
  { id: 's1',  title: 'Brand Identity',    tag: 'Branding' },
  { id: 's2',  title: 'Mobile App UI',     tag: 'App Design' },
  { id: 's3',  title: 'Dashboard Design',  tag: 'Web Design' },
  { id: 's4',  title: 'Logo System',       tag: 'Branding' },
  { id: 's5',  title: 'Onboarding Flow',   tag: 'UX Design' },
  { id: 's6',  title: 'Design System',     tag: 'Systems' },
  { id: 's7',  title: 'Landing Page',      tag: 'Web Design' },
  { id: 's8',  title: 'Icon Set',          tag: 'Illustration' },
  { id: 's9',  title: 'Pitch Deck',        tag: 'Presentation' },
  { id: 's10', title: 'Motion Graphics',   tag: 'Motion' },
]

export default function WorkGallery() {
  return (
    <section>

      {/* ── Section heading ──────────────────────────────── */}
      <GridDivider />
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-12">
        <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-4"
           style={{ fontFamily: 'Poppins, sans-serif' }}>
          Selected Works
        </p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1]"
            style={{ fontFamily: 'Garamond, Georgia, serif' }}>
          <span className="text-gray-300">I partner with early-stage</span><br />
          <span className="text-black">teams building something real</span>
        </h2>
      </div>

      {/* ── Major works ──────────────────────────────────── */}
      {majorWorks.map((work) => (
        <div key={work.id}>
          <GridDivider />

          {/* Full-width image flush against guide lines */}
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full aspect-[16/9] bg-zinc-100">
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className={`object-cover${work.available ? '' : ' blur-sm brightness-75'}`}
              />
              {!work.available && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/70 text-sm tracking-widest uppercase"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Posting soon
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info row */}
          <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 py-5 md:py-6">
            <div className="flex items-start justify-between gap-8">

              {/* Left */}
              <div className="flex gap-4 md:gap-6 items-start">
                <span className="text-gray-300 text-xs mt-1 shrink-0"
                      style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {work.num}
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {work.tag}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light text-black mb-2 leading-tight"
                      style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                    {work.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-md"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {work.description}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="shrink-0 text-right hidden md:flex flex-col gap-3">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-300 mb-0.5"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>Client</p>
                  <p className="text-sm text-gray-600"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>{work.client}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-300 mb-0.5"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>Year</p>
                  <p className="text-sm text-gray-600"
                     style={{ fontFamily: 'Poppins, sans-serif' }}>{work.year}</p>
                </div>
                {work.available && work.href && (
                  <Link href={work.href}
                        className="text-xs text-black border-b border-black/20 pb-0.5 hover:border-black transition-colors duration-200 self-end"
                        style={{ fontFamily: 'Poppins, sans-serif' }}>
                    View case study ↗
                  </Link>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* ── Small works ──────────────────────────────────── */}
      <GridDivider />
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 pt-8 pb-4">
        <p className="text-[11px] uppercase tracking-widest text-gray-400"
           style={{ fontFamily: 'Poppins, sans-serif' }}>
          More Works
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* 1px grid lines between cells via bg on parent + gap */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
             style={{ gap: '1px', backgroundColor: '#e5e7eb' }}>
          {smallWorks.map((w) => (
            <div key={w.id}
                 className="bg-[#f5f5f5] aspect-square flex flex-col justify-end p-4
                            hover:bg-zinc-100 transition-colors duration-200 cursor-pointer">
              <p className="text-[9px] uppercase tracking-widest text-gray-300 mb-1"
                 style={{ fontFamily: 'Poppins, sans-serif' }}>
                {w.tag}
              </p>
              <p className="text-sm font-light text-gray-300"
                 style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                {w.title}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
