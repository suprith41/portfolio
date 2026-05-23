"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

type PillarSettings = {
  leftWidth: number
  rightWidth: number
  leftHeight: number
  rightHeight: number
  leftTop: number
  rightTop: number
  leftOffset: number
  rightOffset: number
  leftOpacity: number
  rightOpacity: number
}

const STORAGE_KEY = "pillar-config-v7"

const DEFAULT_SETTINGS: PillarSettings = {
  leftWidth: 156,
  rightWidth: 150,
  leftHeight: 1300,
  rightHeight: 1200,
  leftTop: -100,
  rightTop: -8,
  leftOffset: -25,
  rightOffset: -48,
  leftOpacity: 0.3,
  rightOpacity: 0.3,
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

// Editor UI removed — Pillar rendering kept. Settings still read from localStorage.

export default function PillarEditor() {
  const [settings, setSettings] = useState<PillarSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<PillarSettings>
        setSettings({
          leftWidth: typeof parsed.leftWidth === "number" ? parsed.leftWidth : DEFAULT_SETTINGS.leftWidth,
          rightWidth: typeof parsed.rightWidth === "number" ? parsed.rightWidth : DEFAULT_SETTINGS.rightWidth,
          leftHeight: typeof parsed.leftHeight === "number" ? parsed.leftHeight : DEFAULT_SETTINGS.leftHeight,
          rightHeight: typeof parsed.rightHeight === "number" ? parsed.rightHeight : DEFAULT_SETTINGS.rightHeight,
          leftTop: typeof parsed.leftTop === "number" ? parsed.leftTop : DEFAULT_SETTINGS.leftTop,
          rightTop: typeof parsed.rightTop === "number" ? parsed.rightTop : DEFAULT_SETTINGS.rightTop,
          leftOffset: typeof parsed.leftOffset === "number" ? parsed.leftOffset : DEFAULT_SETTINGS.leftOffset,
          rightOffset: typeof parsed.rightOffset === "number" ? parsed.rightOffset : DEFAULT_SETTINGS.rightOffset,
          leftOpacity: typeof parsed.leftOpacity === "number" ? parsed.leftOpacity : DEFAULT_SETTINGS.leftOpacity,
          rightOpacity: typeof parsed.rightOpacity === "number" ? parsed.rightOpacity : DEFAULT_SETTINGS.rightOpacity,
        })
      }
    } catch {
      setSettings(DEFAULT_SETTINGS)
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 hidden md:block">
        <Image
          src="/images/HomeImages/pillar1.svg"
          alt=""
          width={clamp(settings.leftWidth, 60, 260)}
          height={clamp(settings.leftHeight, 1200, 3600)}
          className="absolute top-0 w-auto object-contain object-top"
          style={{ top: `${settings.leftTop}px`, left: `${settings.leftOffset}px`, height: `${settings.leftHeight}px`, opacity: settings.leftOpacity }}
        />
        <Image
          src="/images/HomeImages/pillar2%20(1).svg"
          alt=""
          width={clamp(settings.rightWidth, 60, 260)}
          height={clamp(settings.rightHeight, 1200, 3600)}
          className="absolute top-0 w-auto object-contain object-top"
          style={{ top: `${settings.rightTop}px`, right: `${settings.rightOffset}px`, height: `${settings.rightHeight}px`, opacity: settings.rightOpacity }}
        />
      </div>
    </>
  )
}
