import React from 'react'
import './GlitchText.css'

interface GlitchTextProps {
  children: React.ReactNode
  /**
   * Plain-text string for the pseudo-element glitch copies.
   * Provide this when children is JSX (e.g. mixed-font spans) so the
   * CSS attr(data-text) still reads the correct string.
   * Falls back to children when children is a plain string.
   */
  dataText?: string
  /** Multiplier for animation speed. Higher = slower. Default 1. */
  speed?: number
  /** Toggle coloured red/cyan text-shadow on glitch copies. Default true. */
  enableShadows?: boolean
  /** Only glitch on hover when true. Default false. */
  enableOnHover?: boolean
  /** Additional class names. */
  className?: string
  /**
   * Background colour of the pseudo-element clips — must match the
   * element's actual page background so the "cut" illusion works.
   * Default '#120F17' (dark). Pass 'rgb(255,255,255)' for white backgrounds.
   * NOTE: use rgb() not hex so the globals.css wildcard selector can't intercept it.
   */
  bgColor?: string
}

export default function GlitchText({
  children,
  dataText,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = '',
  bgColor = '#120F17',
}: GlitchTextProps) {
  const resolvedDataText =
    dataText ?? (typeof children === 'string' ? children : '')

  const inlineStyles: React.CSSProperties & Record<string, string> = {
    '--after-duration': `${speed * 3}s`,
    '--before-duration': `${speed * 2}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
    '--glitch-bg': bgColor,
  }

  const hoverClass = enableOnHover ? 'enable-on-hover' : ''

  return (
    <div
      className={`glitch-text-container ${hoverClass} ${className}`.trim()}
      style={inlineStyles}
    >
      <div className="glitch-text-main">
        {children}
      </div>
      <div className="glitch-text-before" aria-hidden="true">
        {children}
      </div>
      <div className="glitch-text-after" aria-hidden="true">
        {children}
      </div>
    </div>
  )
}
