import Link from 'next/link'
import Image from 'next/image'
import GridDivider from '../ui/GridDivider'

export default function Footer() {
  return (
    <>
      <GridDivider />
      <footer className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 py-10 md:py-12">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

          {/* Logo + tagline */}
          <div>
            <Image src="/images/HomeImages/sa.svg" alt="SA" width={40} height={24} className="mb-2" />
            <p className="text-gray-400 text-xs max-w-[200px]"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              Product design for early-stage teams.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex gap-6">
            {[
              { label: 'Work',      href: '/work' },
              { label: 'Unplugged', href: '/unplugged' },
              { label: 'Lab',       href: '/lab' },
              { label: 'Contact',   href: '/contact' },
            ].map((l) => (
              <Link key={l.label} href={l.href}
                    className="text-gray-400 hover:text-black text-sm transition-colors duration-200"
                    style={{ fontFamily: 'Poppins, sans-serif' }}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { href: 'https://www.linkedin.com/in/satish-hebbal/', src: '/images/HomeImages/social/linkedin.svg',  alt: 'LinkedIn'  },
              { href: 'https://www.behance.net/satish-designs',     src: '/images/HomeImages/social/behance.svg',   alt: 'Behance'   },
              { href: 'https://dribbble.com/Satish-Hebbal',         src: '/images/HomeImages/social/dribbble.svg',  alt: 'Dribbble'  },
              { href: 'https://www.instagram.com/sat_dez',          src: '/images/HomeImages/social/instagram.svg', alt: 'Instagram' },
            ].map((s) => (
              <Link key={s.alt} href={s.href} target="_blank" rel="noopener noreferrer">
                <Image src={s.src} alt={s.alt} width={22} height={22}
                       className="opacity-40 hover:opacity-80 transition-opacity duration-200" />
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-1">
          <p className="text-gray-300 text-xs" style={{ fontFamily: 'Poppins, sans-serif' }}>
            &copy; {new Date().getFullYear()} Satish Hebbal. All rights reserved.
          </p>
          <p className="text-gray-200 text-xs" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
            Designed &amp; built by Satish
          </p>
        </div>

      </footer>
      <GridDivider />
    </>
  )
}
