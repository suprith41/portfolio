import Link from 'next/link'
import Image from 'next/image'
import { Plus, PlusAt } from '../ui/Markers'

const works = [
  {
    num: '01',
    title: 'Smart Nation',
    tag: 'App Design · Branding · Motion',
    description: 'Built the brand from scratch — logo, design system, app UI, and motion graphics for a smart home IoT startup going from zero to launch.',
    image: '/images/HomeImages/SN-tumb-2.png',
    href: '/works/smartNation',
    client: 'Abhiyantrik Solutions',
    year: '2024',
    available: true,
  },
  {
    num: '02',
    title: 'Abhiyantrik Website',
    tag: 'Web Design · Development',
    description: 'Redesigned and built the company website end-to-end, along with a product experience deck that communicates the hardware offering clearly.',
    image: '/images/WorkImages/abhiyantrikImages/Abhiyantrik-tumb-1.png',
    href: '/works/abhiyantrikWebsite',
    client: 'Abhiyantrik Solutions',
    year: '2023',
    available: true,
  },
]

export default function WorkGallery() {
  return (
    <div className="relative overflow-visible">

      {/* ── Section header ─────────────────────────────────── */}
      <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
        <span
          className="text-[10px] uppercase tracking-widest text-gray-400"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          01
        </span>
        <h2
          className="text-2xl md:text-3xl font-light text-black"
          style={{ fontFamily: 'Garamond, Georgia, serif' }}
        >
          Selected Works
        </h2>
        <Plus h="left" />
        <Plus h="right" />
      </div>

      {/* ── Works list ─────────────────────────────────────── */}
      {works.map((work) => (
        <div
          key={work.num}
          className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 border-b border-gray-200 mt-12 first:mt-0"
        >
          <PlusAt x="50%" v="top" desktop />

          {/* Info — left on desktop, below image on mobile */}
          <div className="px-6 md:px-10 py-8 md:py-10 flex flex-col justify-between md:border-r border-gray-200 order-2 md:order-1">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-[9px] text-gray-300"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {work.num}
                </span>
                <span
                  className="text-[9px] uppercase tracking-widest text-gray-400"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {work.tag}
                </span>
              </div>
              <h3
                className="text-2xl md:text-3xl font-light text-black mb-3"
                style={{ fontFamily: 'Garamond, Georgia, serif' }}
              >
                {work.title}
              </h3>
              <p
                className="text-sm text-gray-400 leading-relaxed max-w-sm"
                style={{ fontFamily: 'Poppins, sans-serif' }}
              >
                {work.description}
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between">
              <div className="flex gap-6">
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest text-gray-300 mb-0.5"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Client
                  </p>
                  <p
                    className="text-xs text-gray-600"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {work.client}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest text-gray-300 mb-0.5"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Year
                  </p>
                  <p
                    className="text-xs text-gray-600"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {work.year}
                  </p>
                </div>
              </div>
              {work.available && work.href && (
                <Link
                  href={work.href}
                  className="text-xs text-black border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors shrink-0"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  View case study ↗
                </Link>
              )}
            </div>
          </div>

          {/* Image — right on desktop, above info on mobile */}
          <div className="relative overflow-hidden order-1 md:order-2">
            <Image
              src={work.image}
              alt={work.title}
              width={800}
              height={600}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`w-full h-auto block${work.available ? '' : ' blur-sm brightness-75'}`}
            />
            {!work.available && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-white/70 text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Posting soon
                </span>
              </div>
            )}
          </div>

          <PlusAt x="50%" desktop />
        </div>
      ))}

      <Plus h="left" />
      <Plus h="right" />
    </div>
  )
}
