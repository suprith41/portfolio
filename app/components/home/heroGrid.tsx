"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Plus, PlusAt } from '../ui/Markers'

export default function HeroGrid() {
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null)

  const handleCopy = (type: 'email' | 'phone', value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="relative overflow-visible flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-200 bg-white rounded-t-lg">
        <Image
          src="/images/common/sa26.svg"
          alt="SA"
          width={40}
          height={40}
          className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80"
        />
        <h1
          className="text-2xl md:text-4xl font-light tracking-tight"
          style={{ fontFamily: 'Garamond, Georgia, serif' }}
        >
          Satish Hebbal
        </h1>
        <span
          className="text-[10px] uppercase tracking-widest text-gray-400"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Portfolio 2026
        </span>
        <Plus h="left" />
        <Plus h="right" />
      </div>

      {/* ── Meta row ───────────────────────────────────────── */}
      <div className="relative flex flex-wrap md:flex-nowrap items-stretch gap-0 border-b border-gray-200">
        {[
          { label: 'Role',     value: 'Product Designer' },
          { label: 'Location', value: 'Hubli, Karnataka' },
          { label: 'Status',   value: 'Available' },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-2 px-6 md:px-8 py-3 ${i > 0 ? 'border-l border-gray-200' : ''}`}
          >
            <span
              className="text-[9px] uppercase tracking-widest text-gray-400 shrink-0"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {item.label}
            </span>
            <span
              className="text-[11px] text-gray-700"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              {item.value}
            </span>
          </div>
        ))}
        {/* Skills marquee */}
        <div className="flex items-center gap-2 w-full md:w-auto pl-6 md:pl-8 pr-6 py-3 border-t md:border-t-0 md:border-l border-gray-200 overflow-hidden min-w-0 md:flex-1">
          <span
            className="text-[9px] uppercase tracking-widest text-gray-400 shrink-0"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Skills
          </span>
          <div
            className="overflow-hidden flex-1"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            }}
          >
            <div className="flex gap-2 w-max" style={{ animation: 'marquee 14s linear infinite' }}>
              {[
                'Product Design', 'Brand Identity', 'Motion', 'Web Design',
                'Design Systems', 'Prototyping', 'User Research', 'App UI/UX',
                'Product Design', 'Brand Identity', 'Motion', 'Web Design',
                'Design Systems', 'Prototyping', 'User Research', 'App UI/UX',
              ].map((tag, i) => (
                <span
                  key={i}
                  className="text-[9px] px-2 py-0.5 border border-gray-200 text-gray-500 whitespace-nowrap"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero: About + Photo ────────────────────────────── */}
      <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 gap-0">
        <PlusAt x="50%" v="top" desktop />

        {/* Left: text */}
        <div className="px-6 md:px-10 py-10 md:py-16 md:border-r border-gray-200 flex flex-col justify-center">
          <p
            className="text-[11px] uppercase tracking-widest text-gray-400 mb-4"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            About
          </p>
          <h2
            className="text-3xl md:text-4xl font-light leading-tight text-black mb-6"
            style={{ fontFamily: 'Garamond, Georgia, serif' }}
          >
            Designing products that work,<br />feel right, and last.
          </h2>
          <p
            className="text-sm text-gray-500 leading-relaxed mb-8"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            I partner with zero-to-one teams to build products that feel right from day one —
            brand identity, app UI, design systems, and everything in between.
            From first sketch to a live product in users&apos; hands.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleCopy('email', 'satishdezn@gmail.com')}
              className="w-full flex items-center gap-3 px-5 py-3 border border-gray-900 text-gray-900 text-xs tracking-wide hover:bg-gray-900 hover:text-white transition-colors duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m2 7 10 7 10-7"/>
              </svg>
              {copied === 'email' ? 'Copied!' : 'satishdezn@gmail.com'}
            </button>
            <button
              onClick={() => handleCopy('phone', '+918722519704')}
              className="w-full flex items-center gap-3 px-5 py-3 border border-gray-200 text-gray-500 text-xs tracking-wide hover:border-gray-400 hover:text-gray-700 transition-colors duration-200"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.44 2 2 0 0 1 3.57 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {copied === 'phone' ? 'Copied!' : '+91 87225 19704'}
            </button>
          </div>
        </div>

        {/* Right: photo */}
        <div className="flex items-end justify-center overflow-hidden border-t md:border-t-0">
          <Image
            src="/images/HomeImages/myImage.png"
            alt="Satish Hebbal"
            width={340}
            height={440}
            className="object-contain object-bottom w-auto max-h-[360px] md:max-h-[460px]"
            priority
          />
        </div>

        <PlusAt x="50%" desktop />
      </div>
    </>
  )
}
