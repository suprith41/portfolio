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

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}) {
  return (
    <label className="flex flex-col gap-2 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
      <span className="flex items-center justify-between text-[10px]">
        <span>{label}</span>
        <span className="text-neutral-400 normal-case tracking-normal text-[11px]">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-black"
      />
    </label>
  )
}

export default function PillarEditor() {
  const [settings, setSettings] = useState<PillarSettings>(DEFAULT_SETTINGS)
  const [open, setOpen] = useState(true)

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

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed top-5 right-5 z-[100] rounded-full border border-black/15 bg-black px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white shadow-[0_16px_44px_rgba(0,0,0,0.24)] transition hover:bg-neutral-800"
      >
        {open ? "Hide Pillars" : "Edit Pillars"}
      </button>

      {open ? (
        <div className="fixed top-16 right-5 z-[100] w-[calc(100vw-24px)] max-w-[340px] rounded-2xl border border-black/15 bg-white/95 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-md md:w-[340px]">
          <div className="border-b border-black/10 px-4 py-3">
            <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-600">Pillar Editor</p>
            <p className="text-xs text-neutral-500">Adjust widths and offsets directly on the page</p>
          </div>

          <div className="space-y-4 p-4">
            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-700">Left Pillar</p>
              <div className="space-y-3">
                <Slider
                  label="Width"
                  value={settings.leftWidth}
                  min={60}
                  max={260}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, leftWidth: value }))}
                />
                <Slider
                  label="Offset"
                  value={settings.leftOffset}
                  min={-120}
                  max={20}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, leftOffset: value }))}
                />
                <Slider
                  label="Top"
                  value={settings.leftTop}
                  min={-100}
                  max={100}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, leftTop: value }))}
                />
                <Slider
                  label="Height"
                  value={settings.leftHeight}
                  min={1200}
                  max={3600}
                  step={10}
                  onChange={(value) => setSettings((current) => ({ ...current, leftHeight: value }))}
                />
                <Slider
                  label="Opacity"
                  value={Math.round(settings.leftOpacity * 100)}
                  min={5}
                  max={100}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, leftOpacity: value / 100 }))}
                />
              </div>
            </div>

            <div className="rounded-xl bg-neutral-50 p-3">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-700">Right Pillar</p>
              <div className="space-y-3">
                <Slider
                  label="Width"
                  value={settings.rightWidth}
                  min={60}
                  max={260}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, rightWidth: value }))}
                />
                <Slider
                  label="Offset"
                  value={settings.rightOffset}
                  min={-120}
                  max={20}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, rightOffset: value }))}
                />
                <Slider
                  label="Top"
                  value={settings.rightTop}
                  min={-100}
                  max={100}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, rightTop: value }))}
                />
                <Slider
                  label="Height"
                  value={settings.rightHeight}
                  min={1200}
                  max={3600}
                  step={10}
                  onChange={(value) => setSettings((current) => ({ ...current, rightHeight: value }))}
                />
                <Slider
                  label="Opacity"
                  value={Math.round(settings.rightOpacity * 100)}
                  min={5}
                  max={100}
                  step={1}
                  onChange={(value) => setSettings((current) => ({ ...current, rightOpacity: value / 100 }))}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSettings(DEFAULT_SETTINGS)}
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-neutral-600 transition hover:border-black/20 hover:text-black"
            >
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
