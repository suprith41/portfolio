"use client"

import Link from 'next/link'
import { Great_Vibes, Playfair_Display } from 'next/font/google'

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', display: 'swap' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], display: 'swap' })

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suprith-rao-a2ba45326/' },
  { label: 'Peerlist', href: 'https://peerlist.io/fredyeeyee' },
  { label: 'GitHub', href: 'https://github.com/suprith41' },
]

const navLinks = [
  { label: 'Projects', href: '/#work' },
  { label: 'About', href: '/about' },
]

export default function Footer() {
  return (
    <footer className="mt-24 md:mt-32 relative overflow-visible">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="footer-signature-glow pt-4 pb-8 text-center relative flex items-center justify-center gap-0">
          <div className="relative z-10 flex flex-col items-center">
            <h2
              className="text-[clamp(3rem,12vw,9rem)] leading-none tracking-tight text-black select-none"
              aria-hidden="true"
            >
              <span className={greatVibes.className} style={{ fontSize: '1.4em' }}>S</span>
              <span className={playfairDisplay.className} style={{ marginLeft: '6px' }}>uprith</span>
            </h2>
            <p
              className="mt-4 text-sm text-gray-400"
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
            >
              AI Engineer
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              className="text-xs text-gray-400"
              style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
            >
              © 2026 Suprith Rao
            </span>
          </div>

          <nav className="flex items-center gap-6">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-gray-400 hover:text-orange-500 transition-colors duration-200"
                style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-orange-500 transition-colors duration-200"
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
