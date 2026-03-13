"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/satishhebbal' },
  { label: 'Dribbble',  href: 'https://dribbble.com/satishhebbal' },
  { label: 'Instagram', href: 'https://instagram.com/satishhebbal' },
  { label: 'GitHub',    href: 'https://github.com/satishhebbal' },
]

const navLinks = [
  { label: 'Works',     href: '/#work' },
  { label: 'Unplugged', href: '/#unplugged' },
  { label: 'About',     href: '/about' },
]

export default function Footer() {
  const pathname = usePathname()
  const isUnpluggedPage = pathname?.startsWith('/unplugged/')

  return (
    <footer className={`mt-16 border-t border-gray-100${isUnpluggedPage ? ' md:hidden' : ''}`}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Big name */}
        <div className="py-10 md:py-14 text-center">
          <h2
            className="text-[clamp(3rem,12vw,9rem)] leading-none tracking-tight text-black select-none"
            aria-hidden="true"
          >
            <span style={{ fontFamily: 'SatishCapsSans, sans-serif', fontSize: '1.4em' }}>S</span>
            <span style={{ fontFamily: 'SatishSans, sans-serif', marginLeft: '6px' }}>atish</span>
          </h2>
          <p
            className="mt-4 text-sm text-gray-400"
            style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
          >
            Product Designer &amp; Vibe Coder
          </p>
        </div>

        <div className="border-t border-gray-100" />

        {/* Bottom row */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo + year */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/common/sa26.svg"
              alt="SA26"
              width={28}
              height={28}
              className="opacity-40"
            />
            <span
              className="text-xs text-gray-400"
              style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
            >
              © 2026 Satish Hebbal
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-gray-400 hover:text-black transition-colors duration-200"
                style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-black transition-colors duration-200"
                style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
              >
                {l.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  )
}
