"use client"

import EmailCopy from './EmailCopy'

export default function EmailSection() {
  return (
    <div
      className="relative flex justify-center items-center px-4 py-8 overflow-visible"
      style={{
        width: 'min(92vw, 560px)',
        maxWidth: '100%',
        zIndex: 20,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{
          width: 'min(92vw, 520px)',
          height: '128px',
          transform: 'translate(-50%, -50%)',
          backgroundImage: [
            'linear-gradient(rgba(17, 24, 39, 0.09) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(17, 24, 39, 0.09) 1px, transparent 1px)',
            'linear-gradient(rgba(17, 24, 39, 0.05) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(17, 24, 39, 0.05) 1px, transparent 1px)',
            'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0) 74%)',
          ].join(', '),
          backgroundPosition: 'center',
          backgroundSize: '48px 48px, 48px 48px, 12px 12px, 12px 12px, cover',
          maskImage: 'radial-gradient(ellipse at center, black 42%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 42%, transparent 78%)',
        }}
      />
      <div className="relative">
        <EmailCopy />
      </div>
    </div>
  )
}
