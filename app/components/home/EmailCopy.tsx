"use client"

import { useState } from 'react'

const EMAIL = 'suprithraoj@gmail.com'

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="none" aria-hidden="true">
    <path
      d="M9.75 15.25h-3A1.75 1.75 0 0 1 5 13.5v-6A1.75 1.75 0 0 1 6.75 5.75h3A1.75 1.75 0 0 1 11.5 7.5v6a1.75 1.75 0 0 1-1.75 1.75Zm0 0H14.5a1.75 1.75 0 0 0 1.75-1.75v-6a1.75 1.75 0 0 0-1.75-1.75H9.75"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ThumbIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7.75 20.25h-3a1.5 1.5 0 0 1-1.5-1.5v-7.5a1.5 1.5 0 0 1 1.5-1.5h3v10.5Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M7.75 10.25 11.9 4.5c.38-.53.98-.84 1.63-.84.96 0 1.72.81 1.66 1.76l-.27 4.08h3.33a2.5 2.5 0 0 1 2.43 3.1l-1.08 4.5a4 4 0 0 1-3.89 3.15H7.75v-10Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
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
    <button
      type="button"
      aria-label="Copy email address"
      className="inline-flex items-center gap-2 rounded-lg border px-4 py-3 cursor-pointer transition-all duration-300"
      style={{
        fontFamily: 'FunnelDisplay, sans-serif',
        background: '#f97316',
        borderColor: '#f97316',
        color: '#ffffff',
        boxShadow: copied
          ? '0 8px 24px rgba(249, 115, 22, 0.22)'
          : '0 8px 24px rgba(249, 115, 22, 0.22)',
        backdropFilter: 'blur(10px)',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={handleClick}
    >
      <span className="text-sm tracking-normal select-none">{EMAIL}</span>
      <span className="flex items-center justify-center shrink-0" style={{ color: '#ffffff' }}>
        {copied ? (
          <span className="flex items-center gap-1.5">
            <span
              className="inline-flex items-center justify-center"
              style={{ animation: 'thumb-pop 650ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
            >
              <ThumbIcon />
            </span>
            <CheckIcon />
          </span>
        ) : (
          <CopyIcon />
        )}
      </span>
    </button>
  )
}
