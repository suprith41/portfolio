"use client"
import { useState } from 'react'
import Image from 'next/image'
import './heroAnimations.css'
import GridDivider from '../ui/GridDivider'

export default function HeroSection() {
  const [copied, setCopied] = useState(false)

  const handleEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText('satishdezn@gmail.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = 'mailto:satishdezn@gmail.com'
    }
  }

  return (
    <>
      <GridDivider />
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">

        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">

          {/* Text */}
          <div className="flex-1">
            <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-6"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              About
            </p>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-1"
                style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Hey, I&apos;m
            </h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-7"
                style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              <span className="gradient-text">Satish Hebbal</span>
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-3 max-w-sm"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              A Product Designer based in Hubli, Karnataka.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm"
               style={{ fontFamily: 'Poppins, sans-serif' }}>
              I help zero-to-one teams build products that feel right from day one —
              from idea validation to your first hundred users.
            </p>

            <button
              onClick={handleEmail}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                         border border-gray-200 bg-white text-sm text-gray-500
                         hover:border-gray-300 hover:text-black transition-all duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              satishdezn@gmail.com
            </button>
            {copied && (
              <p className="text-gray-400 text-xs mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                copied ✓
              </p>
            )}
          </div>

          {/* Photo */}
          <div className="shrink-0 flex justify-center md:justify-end">
            <Image
              src="/images/HomeImages/myImage.png"
              alt="Satish Hebbal"
              width={260}
              height={330}
              className="object-contain object-top"
              priority
            />
          </div>

        </div>
      </div>
    </>
  )
}
