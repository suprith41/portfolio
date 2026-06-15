"use client"

import Link from 'next/link'
import { Great_Vibes, Playfair_Display } from 'next/font/google'
import { Linkedin, Github } from 'lucide-react'
import GlitchText from './GlitchText'

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', display: 'swap' })
const playfairDisplay = Playfair_Display({ subsets: ['latin'], display: 'swap' })

// Custom Peerlist SVG icon (viewBox="0 0 24 24")
function PeerlistIcon({ className, size = 16 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M12 0C2.667 0 0 2.667 0 12s2.673 12 12 12 12-2.667 12-12S21.327 0 12 0zm8.892 20.894c-1.57 1.569-4.247 2.249-8.892 2.249s-7.322-.68-8.892-2.25C1.735 19.522 1.041 17.3.89 13.654A39.74 39.74 0 0 1 .857 12c0-1.162.043-2.201.13-3.13.177-1.859.537-3.278 1.106-4.366.284-.544.62-1.006 1.013-1.398s.854-.729 1.398-1.013C5.592 1.524 7.01 1.164 8.87.988 9.799.9 10.838.858 12 .858c4.645 0 7.322.68 8.892 2.248 1.569 1.569 2.25 4.246 2.25 8.894s-.681 7.325-2.25 8.894zM20.538 3.46C19.064 1.986 16.51 1.357 12 1.357c-4.513 0-7.067.629-8.54 2.103C1.986 4.933 1.357 7.487 1.357 12c0 4.511.63 7.065 2.105 8.54C4.936 22.014 7.49 22.643 12 22.643s7.064-.629 8.538-2.103c1.475-1.475 2.105-4.029 2.105-8.54s-.63-7.065-2.105-8.54zM14.25 16.49a6.097 6.097 0 0 1-2.442.59v2.706H10.45v.357H6.429V5.57h.357V4.214h5.676c3.565 0 6.467 2.81 6.467 6.262 0 2.852-1.981 5.26-4.68 6.013zm-1.788-8.728H10.45v5.428h2.011c1.532 0 2.802-1.2 2.802-2.714s-1.27-2.714-2.802-2.714zm.901 4.351c.117-.239.186-.502.186-.78 0-1.01-.855-1.857-1.945-1.857h-.296V8.62h1.154c1.09 0 1.945.847 1.945 1.857 0 .705-.422 1.323-1.044 1.637zm4.104 1.493c.043-.063.083-.129.123-.194a5.653 5.653 0 0 0 .526-1.103 5.56 5.56 0 0 0 .11-.362c.02-.076.042-.15.06-.227a5.58 5.58 0 0 0 .073-.41c.01-.068.025-.134.032-.203.024-.207.038-.417.038-.63 0-3.198-2.687-5.763-5.967-5.763H7.286v14.572h4.022v-3.048h1.154c1.43 0 2.747-.488 3.778-1.303a5.92 5.92 0 0 0 .46-.406c.035-.034.066-.07.1-.105.107-.11.21-.22.308-.337.044-.053.084-.108.126-.162.081-.104.16-.21.233-.319zm-5.005 1.775H10.45v3.048H8.143V5.57h4.319c2.837 0 5.11 2.211 5.11 4.905s-2.273 4.905-5.11 4.905z"/>
    </svg>
  )
}

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suprith-rao-a2ba45326/', icon: Linkedin },
  { label: 'Peerlist', href: 'https://peerlist.io/fredyeeyee', icon: PeerlistIcon },
  { label: 'GitHub', href: 'https://github.com/suprith41', icon: Github },
]

const navLinks = [
  { label: 'Projects', href: '/#work' },
  { label: 'About', href: '/about' },
]

export default function Footer() {
  return (
    <footer className="mt-6 md:mt-8 relative overflow-visible">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="footer-signature-glow pt-2 pb-6 text-center relative flex items-center justify-center gap-0">
          <div className="relative z-10 flex flex-col items-center">
            <h2
              className="text-[clamp(3rem,10vw,7.5rem)] leading-none tracking-tight text-black select-none"
              aria-hidden="true"
            >
              <GlitchText
                dataText="Suprith"
                speed={1.5}
                enableShadows={true}
                enableOnHover={true}
                bgColor="rgb(255,255,255)"
                className="text-black leading-none tracking-tight"
              >
                <span className={greatVibes.className} style={{ fontSize: '1.4em' }}>S</span>
                <span className={playfairDisplay.className} style={{ marginLeft: '6px' }}>uprith</span>
              </GlitchText>
            </h2>
            <p
              className="mt-3 text-sm text-gray-400"
              style={{ fontFamily: 'FunnelDisplay, sans-serif', fontWeight: 300 }}
            >
              AI Engineer
            </p>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              className="text-sm text-gray-400"
              style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
            >
              © 2026 Suprith Rao
            </span>
          </div>

          <nav className="flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-gray-400 hover:text-orange-500 transition-colors duration-200"
                style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            {links.map((l) => {
              const Icon = l.icon
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-500 transition-colors duration-200"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  <Icon size={15} className="flex-shrink-0" />
                  <span>{l.label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
