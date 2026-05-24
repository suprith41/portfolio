"use client"

import { useState } from 'react'

const EMAIL = 'suprithraoj@gmail.com'

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="#6b7280">
    <path d="M358.27-260q-28.44 0-48.35-19.92Q290-299.83 290-328.27v-455.38q0-28.44 19.92-48.36 19.91-19.91 48.35-19.91h335.38q28.44 0 48.36 19.91 19.91 19.92 19.91 48.36v455.38q0 28.44-19.91 48.35Q722.09-260 693.65-260H358.27Zm0-55.96h335.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.47-3.84-3.84-8.46-3.84H358.27q-4.62 0-8.46 3.84-3.85 3.85-3.85 8.47v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM226.35-128.08q-28.44 0-48.36-19.92-19.91-19.91-19.91-48.35v-511.34h55.96v511.34q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h391.34v55.96H226.35Zm119.61-187.88v-480 480Z"/>
  </svg>
)

const ThumbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7.75 20.25h-3a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5h3v10.5Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M7.75 10.25 11.9 4.5c.38-.53.98-.84 1.63-.84.96 0 1.72.81 1.66 1.76l-.27 4.08h3.33a2.5 2.5 0 0 1 2.43 3.1l-1.08 4.5a4 4 0 0 1-3.89 3.15H7.75v-10Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Plus = ({ h, v }: { h: 'left' | 'right'; v: 'top' | 'bottom' }) => (
  <span
    className="absolute select-none pointer-events-none"
    style={{
      [h]: 0, [v]: 0,
      transform: `translate(${h === 'left' ? '-50%' : '50%'}, ${v === 'top' ? 'calc(-50% - 1px)' : '50%'})`,
      fontFamily: 'monospace', fontSize: '13px', lineHeight: 1, color: '#9ca3af', zIndex: 10,
    }}
  >+</span>
)

export default function EmailCopy() {
  const [copied, setCopied] = useState(false)

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
    } catch {
      // Fallback for mobile / non-HTTPS
      const el = document.createElement('textarea')
      el.value = EMAIL
      el.style.cssText = 'position:fixed;opacity:0;pointer-events:none;'
      document.body.appendChild(el)
      el.focus()
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="relative border cursor-pointer transition-colors duration-300"
      style={{
        fontFamily: 'FunnelDisplay, sans-serif',
        background: copied ? '#111' : 'white',
        borderColor: copied ? '#111' : '#e5e7eb',
        overflow: 'visible',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClick}
    >
      <Plus h="left"  v="top" />
      <Plus h="right" v="top" />
      <Plus h="left"  v="bottom" />
      <Plus h="right" v="bottom" />

      <div className={`flex items-center transition-opacity duration-200 ${copied ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <span className="pl-4 pr-2 py-2 text-xs text-gray-500 select-none">{EMAIL}</span>
        <button aria-label="Copy email" className="pl-2 pr-4 py-2 shrink-0 flex items-center justify-center outline-none">
          <CopyIcon />
        </button>
      </div>

      <div className={`absolute inset-0 flex items-center justify-center gap-2 text-white text-xs transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div
          className={copied ? 'animate-[thumb-pop_650ms_cubic-bezier(0.34,1.56,0.64,1)]' : ''}
          style={{ transformOrigin: 'center bottom' }}
        >
          <ThumbIcon />
        </div>
      </div>
    </div>
  )
}
