"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image'

const Plus = ({ h, v = 'bottom' }: { h: 'left' | 'right'; v?: 'top' | 'bottom' }) => (
  <span
    className="absolute select-none pointer-events-none"
    style={{
      [h]: 0,
      [v]: 0,
      transform: `translate(${h === 'left' ? '-50%' : '50%'}, ${v === 'top' ? '-50%' : '50%'})`,
      fontFamily: 'monospace',
      fontSize: '13px',
      lineHeight: 1,
      color: '#9ca3af',
      zIndex: 10,
    }}
  >+</span>
)

// Internal column-divider intersections — place at % positions along a border
const PlusAt = ({ x, v = 'bottom', desktop = false }: { x: string; v?: 'top' | 'bottom'; desktop?: boolean }) => (
  <span
    className={`absolute select-none pointer-events-none${desktop ? ' hidden md:block' : ''}`}
    style={{
      left: x,
      [v]: 0,
      transform: `translate(-50%, ${v === 'top' ? '-50%' : '50%'})`,
      fontFamily: 'monospace',
      fontSize: '13px',
      lineHeight: 1,
      color: '#9ca3af',
      zIndex: 10,
    }}
  >+</span>
)

const SmartNation = () => {
  const appIcons = [
    { name: 'Beta',             src: '/images/WorkImages/smartNationImages/app-occations/beta.png',          mockup: '/images/WorkImages/smartNationImages/mobileMockUP/beta-mockup.png' },
    { name: 'Default',          src: '/images/WorkImages/smartNationImages/app-occations/default.png',       mockup: '/images/WorkImages/smartNationImages/mobileMockUP/default-mockup.png' },
    { name: 'V2',               src: '/images/WorkImages/smartNationImages/app-occations/v2.png',            mockup: '/images/WorkImages/smartNationImages/mobileMockUP/V2-mockup.png' },
    { name: 'National Festival',src: '/images/WorkImages/smartNationImages/app-occations/national-fest.png', mockup: '/images/WorkImages/smartNationImages/mobileMockUP/national-fest-mockup.png' },
    { name: 'Product Launch',   src: '/images/WorkImages/smartNationImages/app-occations/product-launch.png',mockup: '/images/WorkImages/smartNationImages/mobileMockUP/product-launch-mockup.png' },
    { name: 'Deepawali',        src: '/images/WorkImages/smartNationImages/app-occations/deepawali.png',     mockup: '/images/WorkImages/smartNationImages/mobileMockUP/deepawali-mockup.png' },
    { name: 'Save Energy',      src: '/images/WorkImages/smartNationImages/app-occations/save-energy.png',  mockup: '/images/WorkImages/smartNationImages/mobileMockUP/save-energy-mockup.png' },
    { name: 'Christmas',        src: '/images/WorkImages/smartNationImages/app-occations/crismas.png',       mockup: '/images/WorkImages/smartNationImages/mobileMockUP/crismas-mockup.png' },
  ];

  const [selectedIcon, setSelectedIcon] = useState(appIcons[1]);
  const [showProcess, setShowProcess]   = useState(false);
  const [processSlide, setProcessSlide] = useState(0);
  const clickSound    = useRef<HTMLAudioElement | null>(null);
  const deepawaliSound = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    clickSound.current = new Audio('/images/WorkImages/smartNationImages/radio-slow.mp3');
    clickSound.current.volume = 0.6;
    deepawaliSound.current = new Audio('/images/WorkImages/smartNationImages/wow-wow.mp3');
    deepawaliSound.current.volume = 0.7;
  }, []);

  const processSessions = [
    {
      label: 'Session 01',
      headline: 'Names on the wall, none of them stuck yet.',
      body: 'We started with a shortlist of names. Half a dozen candidates, each tested with a rough mark. These sheets are the work of narrowing: trying each name on a shape, seeing which combination had weight and felt like it could live on a product.',
      desktop: '/images/WorkImages/smartNationImages/logo-brainstrome-session-1-desktop.png',
      mobile:  '/images/WorkImages/smartNationImages/logo-brainstrome-session-1-mobile.png',
    },
    {
      label: 'Session 02',
      headline: 'Smart Nation. The name clicked.',
      body: 'The name was finalized and the brief sharpened immediately. From here it was clear: build a mark that felt both local and modern. We explored, debated, circled one direction, and committed to it.',
      desktop: '/images/WorkImages/smartNationImages/logo-brainstrome-session-2-desktop.png',
      mobile:  '/images/WorkImages/smartNationImages/logo-brainstrome-session-2-mobile.png',
    },
    {
      label: 'Session 03',
      headline: 'Refining the mark, then making it move.',
      body: 'The chosen direction went through iterations of proportion, stroke weight, and the custom power-button O. Once the static mark was locked, the last step was motion: how does the brand come alive on screen for the first time.',
      desktop: '/images/WorkImages/smartNationImages/logo-brainstrome-session-3-desktop.png',
      mobile:  '/images/WorkImages/smartNationImages/logo-brainstrome-session-3-mobile.png',
    },
  ];

  useEffect(() => {
    const prev = document.documentElement.style.background;
    document.documentElement.style.background = 'white';
    document.body.style.background = 'white';
    return () => {
      document.documentElement.style.background = prev;
      document.body.style.background = '';
    };
  }, []);

  const brandColors = [
    { name: 'Primary',    hex: '#080A30' },
    { name: 'Secondary',  hex: '#2A3281' },
    { name: 'Accent',     hex: '#386BF6' },
    { name: 'Background', hex: '#FFFFFF' },
    { name: 'Card',       hex: '#E5E7EB' },
  ];

  return (
    <div className="bg-white min-h-screen mt-16 px-4 md:px-0">
      <div className="relative overflow-visible max-w-5xl mx-auto border-l border-r border-t border-gray-200 rounded-t-lg">
        <Plus h="left"  v="top" />
        <Plus h="right" v="top" />

        {/* ── Project Header ─────────────────────────────────────────── */}
        <div className="relative overflow-visible flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-200 bg-white rounded-t-lg">
          <Image src="/images/WorkImages/smartNationImages/sn-header-logo.png" alt="Smart Nation" width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <h1 className="text-2xl md:text-4xl font-light tracking-tight" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
            Smart Nation
          </h1>
          <Image src="/images/common/sa26.svg" alt="SA" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-20" />
          <Plus h="left" />
          <Plus h="right" />
          <PlusAt x="50%" />
          <PlusAt x="25%" desktop />
          <PlusAt x="75%" desktop />
        </div>

        {/* ── Project Meta ───────────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
            <PlusAt x="50%" />
            <PlusAt x="25%"  desktop />
            <PlusAt x="75%"  desktop />
            {/* Company */}
            <div className="px-6 md:px-10 py-5 border-r border-gray-200 flex flex-col justify-between" style={{ minHeight: '72px' }}>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Company</p>
              <p className="text-sm text-gray-700 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>Abhiyantrik Solutions</p>
            </div>
            {/* Scope — marquee */}
            <div className="py-5 border-r border-gray-200 flex flex-col justify-between overflow-hidden" style={{ minHeight: '72px' }}>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 shrink-0 px-6 md:px-10" style={{ fontFamily: 'Poppins, sans-serif' }}>Scope</p>
              <div className="overflow-hidden w-full">
                <div className="flex gap-2 w-max" style={{ animation: 'marquee 12s linear infinite' }}>
                  {['Brand Identity', 'App UI/UX', 'Motion', 'Web', 'Packaging', 'Brochures', 'Brand Identity', 'App UI/UX', 'Motion', 'Web', 'Packaging', 'Brochures'].map((tag, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 border border-gray-300 text-gray-500 leading-snug whitespace-nowrap" style={{ fontFamily: 'Poppins, sans-serif' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Role */}
            <div className="px-6 md:px-10 py-5 border-r border-gray-200 flex flex-col justify-between" style={{ minHeight: '72px' }}>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Role</p>
              <p className="text-sm text-gray-700 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>Designer</p>
            </div>
            {/* Deliverable */}
            <div className="px-6 md:px-10 py-5 flex flex-col justify-between" style={{ minHeight: '72px' }}>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Deliverable</p>
              <p className="text-sm text-gray-700 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>Zero to Launch</p>
            </div>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* Hero Image */}
          <div className="relative overflow-visible border-b border-gray-200">
            <Image
              src="/images/WorkImages/smartNationImages/smartSWB-asset-1.png"
              alt="Smart Nation switchboard"
              width={2000}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Brief + Right panel */}
          <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 gap-0">
            <PlusAt x="50%" desktop />

            {/* Brief — always visible, never changes */}
            <div className="px-6 md:px-10 py-10 md:py-16 md:border-r border-gray-200 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>The Brief</p>
              <h2 className="text-3xl md:text-4xl font-light leading-tight text-black mb-6" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                Your entire home, automated. Every switch controlled from one app.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Most Indian homes have 20–30 wall switches. Smart Nation&apos;s hardware fits into those same boxes, no rewiring, no replacing appliances. What the product needed was a complete experience: full control over every device, automations that run without thinking about them, and the kind of reliability that makes people trust technology in their home. I built the brand and product from the ground up to deliver that.
              </p>
            </div>

            {/* Right panel — animation or process carousel */}
            <div className="relative overflow-hidden px-6 md:px-10 py-10 md:py-16" style={{ minHeight: '420px' }}>
              {/* Video always rendered — anchors the panel height */}
              <div className={`flex items-center justify-center transition-opacity duration-300 ${showProcess ? 'invisible' : ''}`} style={{ marginTop: '40px' }}>
                <video className="w-full h-auto max-w-xs md:max-w-sm rounded-lg" autoPlay loop muted playsInline>
                  <source src="/images/WorkImages/smartNationImages/smart-nation-animation.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Process overlay — absolutely fills panel, never changes its height */}
              {showProcess && (
                <div className="absolute inset-0 px-6 md:px-10 pt-6 pb-16 flex flex-col gap-3 overflow-hidden">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {processSessions[processSlide].label}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {processSessions[processSlide].body}
                  </p>
                  {/* Image fills remaining space */}
                  <div className="min-h-0 overflow-hidden" style={{ flex: 1, minHeight: '220px' }}>
                    {/* Session 3 desktop: use desktop image on md+ */}
                    {processSlide === 2 && (
                      <Image
                        src={processSessions[2].desktop}
                        alt={processSessions[2].label}
                        width={1200}
                        height={800}
                        className="hidden md:block w-full h-full object-cover rounded-sm"
                      />
                    )}
                    {/* Mobile image for all sessions on mobile; also session 1 & 2 on desktop */}
                    <Image
                      src={processSessions[processSlide].mobile}
                      alt={processSessions[processSlide].label}
                      width={600}
                      height={800}
                      className={`w-full h-full object-cover rounded-sm${processSlide === 2 ? ' md:hidden' : ''}`}
                    />
                  </div>
                  {/* Dot nav */}
                  <div className="flex gap-2 shrink-0">
                    {processSessions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setProcessSlide(i)}
                        className="w-1.5 h-1.5 rounded-full transition-colors"
                        style={{ background: i === processSlide ? '#374151' : '#d1d5db' }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Toggle button — bottom right always */}
              <div className="absolute bottom-4 right-4 flex gap-2 items-center">
                {showProcess && (
                  <>
                    <button
                      onClick={() => setProcessSlide(s => Math.max(0, s - 1))}
                      disabled={processSlide === 0}
                      className="w-7 h-7 border border-gray-300 bg-white text-gray-500 text-xs flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors"
                    >←</button>
                    <button
                      onClick={() => setProcessSlide(s => Math.min(processSessions.length - 1, s + 1))}
                      disabled={processSlide === processSessions.length - 1}
                      className="w-7 h-7 border border-gray-300 bg-white text-gray-500 text-xs flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition-colors"
                    >→</button>
                  </>
                )}
                <button
                  onClick={() => { setShowProcess(p => !p); setProcessSlide(0); }}
                  className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-gray-300 text-gray-500 bg-white hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {showProcess ? '✕ Close' : 'Logo Making Process'}
                </button>
              </div>
            </div>
          </div>
          <Plus h="left" />
          <Plus h="right" />
          <PlusAt x="50%" />
          <PlusAt x="25%" desktop />
          <PlusAt x="75%" desktop />
        </div>

        {/* ── Impact Numbers ─────────────────────────────────────────── */}
        <div className="relative overflow-visible grid grid-cols-2 md:grid-cols-4 border-b border-gray-200">
          <PlusAt x="50%" />
          <PlusAt x="25%"  desktop />
          <PlusAt x="75%"  desktop />
          {[
            { stat: '40+',    label: 'Installed across homes, offices & commercial spaces' },
            { stat: '280+',   label: 'Smart switches live, every tile, state and icon designed' },
            { stat: '3 mo',   label: 'First sketch to live product' },
            { stat: 'Day 1',  label: 'Usable by anyone, no manual, no learning curve' },
          ].map((item) => (
            <div key={item.stat} className="px-6 md:px-10 py-8 border-r border-gray-200 last:border-r-0">
              <p className="text-4xl md:text-5xl font-light text-black mb-2" style={{ fontFamily: 'Garamond, Georgia, serif' }}>{item.stat}</p>
              <p className="text-xs text-gray-400 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.label}</p>
            </div>
          ))}
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 01 · App Experience ────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>01</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Control, Simplified</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              A home has rooms, rooms have devices, devices have states. Most smart home apps bury this under layers of menus. I designed around how people actually think: room first, device second. One screen shows everything that matters. Tap once to control. A 10-year-old and a 70-year-old should both get it without anyone explaining anything.
            </p>
          </div>

          <div className="grid-bg-mobile py-10 md:py-16 flex justify-center px-6 md:px-10">
            <Image src="/images/WorkImages/smartNationImages/AppMockups-3screens.png" alt="Smart Nation App — 3-screen mockup" width={1200} height={800} className="w-full h-auto max-w-4xl" />
          </div>

          {/* Switch states */}
          <div className="relative overflow-visible px-6 md:px-10 py-8 border-t border-gray-200 bg-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Switch States</p>
                <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <strong className="text-gray-700 font-medium">On</strong> glows and asserts. <strong className="text-gray-700 font-medium">Off</strong> steps back. <strong className="text-gray-700 font-medium">Offline</strong> warns before you try, so you never tap a device that isn&apos;t listening.
                </p>
              </div>
              <div className="flex gap-8 md:gap-12 shrink-0">
                {[
                  { src: '/images/WorkImages/smartNationImages/switchOn.png',      label: 'On' },
                  { src: '/images/WorkImages/smartNationImages/switchOff.png',     label: 'Off' },
                  { src: '/images/WorkImages/smartNationImages/switchOffline.png', label: 'Offline' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <Image src={s.src} alt={`Switch ${s.label}`} width={128} height={128} className="h-16 md:h-24 mx-auto object-contain mb-3" />
                    <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <Plus h="left" v="top" />
            <Plus h="right" v="top" />
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 02 · Adding an Appliance ───────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>02</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Switchboard to Dashboard in Four Taps</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Once the hardware is in the wall, the homeowner should own it completely, no dependency on the installer after day one. I designed this flow to be fully self-serve: pick the board, pick the module, give it a name. Four taps and any family member can map a new switch themselves.
            </p>
          </div>
          <div className="px-6 md:px-10 py-10 md:py-16 flex justify-center">
            <Image src="/images/WorkImages/smartNationImages/AddApp.png" alt="Adding Appliance Flow" width={1400} height={800} className="w-full h-auto" />
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 03 · Device Provisioning ───────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>03</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Hardware in Hand, Online in Minutes</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              IoT setup is where trust breaks. Most users assume the product is broken the moment it takes more than five seconds. I redesigned provisioning into a linear flow: detect, connect, name, assign, confirm. Every step tells you exactly what's happening. The screen stays calm so the user does too.
            </p>
          </div>
          <div className="px-6 md:px-10 py-10 md:py-16 flex justify-center">
            <Image src="/images/WorkImages/smartNationImages/deviceProv.png" alt="Device Provisioning Flow" width={1400} height={800} className="w-full h-auto" />
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 04 · Automation ────────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>04</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Set It Once, Live Freely</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Two modes, not one, because the use cases are fundamentally different. <strong className="text-gray-700 font-medium">Routine</strong> handles fixed daily habits: lights on at 6am, geyser at 6:30, fans off at bedtime. <strong className="text-gray-700 font-medium">Timer</strong> handles spontaneous needs: run the AC for 90 minutes, then off. Merging them would have confused both. Kept visually separate, each with its own logic.
            </p>
          </div>
          <div className="px-6 md:px-10 py-10 md:py-16 flex justify-center">
            <Image src="/images/WorkImages/smartNationImages/automation.png" alt="Automation Features" width={1400} height={800} className="w-full h-auto" />
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 05 · Design System ─────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>05</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Design System</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* Colour palette */}
          <div className="relative overflow-visible px-6 md:px-10 py-10 border-b border-gray-200">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Brand Colours</p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {brandColors.map((c) => (
                <div key={c.name}>
                  <div
                    className="w-full aspect-square mb-2 border border-gray-200"
                    style={{ background: c.hex }}
                  />
                  <p className="text-[10px] text-gray-500 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>{c.name}</p>
                  <p className="text-[10px] text-gray-400" style={{ fontFamily: 'monospace' }}>{c.hex}</p>
                </div>
              ))}
            </div>
            <Plus h="left" />
            <Plus h="right" />
            <PlusAt x="50%" desktop />
          </div>

          {/* Typography */}
          <div className="relative overflow-visible px-6 md:px-10 py-10 border-b border-gray-200">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>Typography: Poppins</p>
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
              {/* Specimen */}
              <div className="shrink-0">
                <p className="text-6xl md:text-8xl font-light leading-none text-black" style={{ fontFamily: 'Poppins, sans-serif' }}>Aa</p>
                <p className="text-xs text-gray-400 mt-3 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
                <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>0 1 2 3 4 5 6 7 8 9</p>
              </div>
              {/* Type scale */}
              <div className="flex flex-col gap-3 w-full">
                {[
                  { label: 'Onboard Large',  size: '28px', weight: 'Bold',    sample: 'Smart Nation' },
                  { label: 'Onboard Medium', size: '16px', weight: 'Bold',    sample: 'Smart Nation' },
                  { label: 'Onboard Small',  size: '13px', weight: 'Regular', sample: 'Smart Nation' },
                  { label: 'Body Large',     size: '16px', weight: 'Regular', sample: 'Your home, automated.' },
                  { label: 'Body Medium',    size: '14px', weight: 'Regular', sample: 'Your home, automated.' },
                  { label: 'Body Small',     size: '12px', weight: 'Regular', sample: 'Your home, automated.' },
                ].map((t) => (
                  <div key={t.label} className="flex items-baseline gap-4 border-b border-gray-100 pb-2">
                    <p className="text-[10px] text-gray-400 w-32 shrink-0" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.label}</p>
                    <p
                      className="text-gray-800 leading-snug flex-1"
                      style={{ fontFamily: 'Poppins, sans-serif', fontSize: t.size, fontWeight: t.weight === 'Bold' ? 700 : 400 }}
                    >{t.sample}</p>
                    <p className="text-[10px] text-gray-300 shrink-0" style={{ fontFamily: 'monospace' }}>{t.size} · {t.weight}</p>
                  </div>
                ))}
              </div>
            </div>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 06 · Icon System ───────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>06</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Iconography</h2>
            <Plus h="left" />
            <Plus h="right" />
            <PlusAt x="50%" desktop />
          </div>

          {/* Appliance icons */}
          <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
            <PlusAt x="50%"  desktop />
            <div className="px-6 md:px-10 py-10 md:py-14 flex flex-col justify-center md:border-r border-gray-200 order-2 md:order-1">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Appliance Icons</p>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Material Icons covered the basics, but Indian homes needed more: ceiling fans, geysers, inverter ACs. I extended the library by drawing the missing appliances and altering existing icons to match, keeping the same grid and stroke weight across all 40+ types.
              </p>
            </div>
            <div className="flex items-center justify-center px-6 md:px-10 py-10 order-1 md:order-2">
              <Image src="/images/WorkImages/smartNationImages/applianceIcons.png" alt="Appliance Icons" width={400} height={300} className="w-full h-auto max-w-sm md:max-w-md" />
            </div>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* Navigation icons */}
          <div className="relative overflow-visible border-b border-gray-200">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 px-6 md:px-10 pt-10 pb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>Navigation Icons, Idle to Active</p>

            {/* 4-col grid — label + idle + active all aligned */}
            <div className="grid grid-cols-4 px-6 md:px-10 pb-10 md:pb-14 gap-2 md:gap-4">
              {[
                { label: 'Home',       raw: '/images/WorkImages/smartNationImages/homeIcon-raw.png',    act: '/images/WorkImages/smartNationImages/homeIcon-act.png' },
                { label: 'MCB',        raw: '/images/WorkImages/smartNationImages/MCBicon-raw.png',     act: '/images/WorkImages/smartNationImages/MCBicon-act.png' },
                { label: 'Automation', raw: '/images/WorkImages/smartNationImages/autoIcon-raw.png',    act: '/images/WorkImages/smartNationImages/autoIcon-act.png' },
                { label: 'Profile',    raw: '/images/WorkImages/smartNationImages/profileIcon-raw.png', act: '/images/WorkImages/smartNationImages/profileIcon-act.png' },
              ].map((icon) => (
                <div key={icon.label} className="flex flex-col items-center gap-3">
                  <span className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>{icon.label}</span>
                  <Image src={icon.raw} alt={`${icon.label} idle`}   width={64} height={64} className="w-10 h-10 md:w-16 md:h-16 object-contain" />
                  <Image src={icon.act} alt={`${icon.label} active`} width={64} height={64} className="w-10 h-10 md:w-16 md:h-16 object-contain" />
                </div>
              ))}
            </div>

            {/* Video — full bleed, no padding */}
            <video className="w-full h-auto block" autoPlay loop muted playsInline>
              <source src="/images/WorkImages/smartNationImages/icon.mov" type="video/mp4" />
            </video>

            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* App Icons */}
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>App Icon</p>
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              The icon changes with context: festivals, launches, seasons. The brand stays recognisable, the moment feels considered. Tap to preview on device.
            </p>
            <Plus h="left" />
            <Plus h="right" />
            <PlusAt x="50%" desktop />
          </div>

          <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 items-start">
            <PlusAt x="50%"  desktop />
            <div className="flex flex-col md:hidden px-6 py-8 items-center gap-6">
              <Image src={selectedIcon.mockup} alt={`${selectedIcon.name} mockup`} width={280} height={450} className="w-56 h-auto object-contain" />
              <Image src={selectedIcon.src} alt="Selected icon" width={160} height={160} className="w-36 h-36 object-contain" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.2))' }} />
              <p className="text-sm text-gray-500" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedIcon.name}</p>
            </div>
            <div className="hidden md:flex items-center justify-center py-14 md:border-r border-gray-200">
              <Image src={selectedIcon.src} alt="Selected icon" width={280} height={280} className="w-64 h-64 object-contain" style={{ filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.2))' }} />
            </div>
            <div className="hidden md:flex flex-col items-center justify-start pt-0 pb-6 gap-4 overflow-hidden">
              <Image src={selectedIcon.mockup} alt={`${selectedIcon.name} mockup`} width={400} height={650} className="w-full max-w-sm h-auto object-contain object-top" style={{ marginTop: '-2px' }} />
              <p className="text-sm text-gray-400 text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedIcon.name}</p>
            </div>
          </div>

          {/* Icon picker — vintage radio button console */}
          <div className="relative overflow-visible border-t border-gray-200 py-8 px-6 md:px-10 flex justify-center">
            {/* Console panel */}
            <div
              className="flex-wrap md:flex-nowrap max-w-[320px] md:max-w-none"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderRadius: '20px',
                padding: '10px 10px',
                background: 'linear-gradient(160deg, #e8e8e8 0%, #d4d4d4 40%, #c8c8c8 100%)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.18), 0 2px 4px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.08)',
                gap: '0',
                rowGap: '8px',
              }}
            >
              {appIcons.map((icon, index) => {
                const isSelected = selectedIcon.src === icon.src;
                return (
                  <div key={index} className="flex items-center">
                    {/* Groove divider — always on desktop, skip row-start on mobile */}
                    {index > 0 && (
                      <div
                        className={index % 4 === 0 ? 'hidden md:block' : ''}
                        style={{
                          width: '3px',
                          height: '44px',
                          marginLeft: '6px',
                          marginRight: '6px',
                          background: 'linear-gradient(to right, rgba(0,0,0,0.14) 0%, rgba(255,255,255,0.7) 50%, rgba(0,0,0,0.06) 100%)',
                          borderRadius: '2px',
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <button
                      onClick={() => {
                        const sound = icon.name === 'Deepawali' ? deepawaliSound.current : clickSound.current;
                        if (sound) { sound.currentTime = 0; sound.play(); }
                        setSelectedIcon(icon);
                      }}
                      title={icon.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        padding: '4px',
                        borderRadius: '16px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.08s ease, transform 0.08s ease',
                        background: isSelected
                          ? 'linear-gradient(145deg, #d6d6d6, #ebebeb)'
                          : 'linear-gradient(145deg, #f0f0f0, #d8d8d8)',
                        boxShadow: isSelected
                          ? 'inset 3px 3px 7px rgba(0,0,0,0.18), inset -2px -2px 5px rgba(255,255,255,0.75)'
                          : '5px 5px 10px rgba(0,0,0,0.12), -4px -4px 8px rgba(255,255,255,0.95)',
                        transform: isSelected ? 'translateY(1px) scale(0.97)' : 'translateY(0) scale(1)',
                      }}
                      onMouseDown={e => {
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'inset 4px 4px 9px rgba(0,0,0,0.22), inset -2px -2px 5px rgba(255,255,255,0.7)';
                        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(2px) scale(0.95)';
                      }}
                      onMouseUp={e => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        btn.style.boxShadow = isSelected
                          ? 'inset 3px 3px 7px rgba(0,0,0,0.18), inset -2px -2px 5px rgba(255,255,255,0.75)'
                          : '5px 5px 10px rgba(0,0,0,0.12), -4px -4px 8px rgba(255,255,255,0.95)';
                        btn.style.transform = isSelected ? 'translateY(1px) scale(0.97)' : 'translateY(0) scale(1)';
                      }}
                      onMouseLeave={e => {
                        const btn = e.currentTarget as HTMLButtonElement;
                        btn.style.boxShadow = isSelected
                          ? 'inset 3px 3px 7px rgba(0,0,0,0.18), inset -2px -2px 5px rgba(255,255,255,0.75)'
                          : '5px 5px 10px rgba(0,0,0,0.12), -4px -4px 8px rgba(255,255,255,0.95)';
                        btn.style.transform = isSelected ? 'translateY(1px) scale(0.97)' : 'translateY(0) scale(1)';
                      }}
                    >
                      <Image
                        src={icon.src}
                        alt={icon.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-contain rounded-xl"
                        style={{
                          transform: isSelected ? 'scale(0.93)' : 'scale(1)',
                          transition: 'transform 0.08s ease',
                          filter: isSelected ? 'brightness(0.92)' : 'brightness(1)',
                        }}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
            <Plus h="left" v="top" />
            <Plus h="right" v="top" />
          </div>

          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 07 · Packaging ─────────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>07</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Packaging Design</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              The product lands in a box before it lands in the wall. This is the first physical proof that Smart Nation is premium, not another generic IoT import. The packaging needed to earn trust before the app even opened. Clean, minimal, unmistakably Smart Nation.
            </p>
          </div>
          {/* Placeholder grid for packaging images */}
          <div className="px-6 md:px-10 py-10 md:py-14 grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                <p className="text-xs text-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Image {i}</p>
              </div>
            ))}
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 08 · Brochures ─────────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>08</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Brochures & User Guides</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Sales in Indian B2B channels still happen face-to-face. The brochure is the leave-behind that does the selling after the meeting ends, carrying the same visual language as the app so every touchpoint feels like one coherent brand, not a patchwork of vendors.
            </p>
          </div>
          {/* Placeholder grid for brochure images */}
          <div className="px-6 md:px-10 py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/2] rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                <p className="text-xs text-gray-300" style={{ fontFamily: 'Poppins, sans-serif' }}>Image {i}</p>
              </div>
            ))}
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 09 · From the Team ─────────────────────────────────────── */}
        <div className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>09</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>From the Team</h2>
            <Plus h="left" />
            <Plus h="right" />
            <PlusAt x="50%" desktop />
          </div>

          <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-3 border-gray-200">
            <PlusAt x="33.33%" desktop />
            <PlusAt x="66.66%" desktop />

            {[
              {
                quote: "The brand came together faster than I expected, and it actually looked like what I had in my head. That's rare.",
                name: 'Founder',
                role: 'Abhiyantrik Solutions',
              },
              {
                quote: "Having proper icons for every appliance made a real difference. The hardware team could finally show clients exactly what each switch would control.",
                name: 'Hardware Developer',
                role: 'Abhiyantrik Solutions',
              },
              {
                quote: "The app felt polished from the first build. Customers kept commenting on how easy it was to figure out. No one asked for a manual.",
                name: 'Hardware Developer',
                role: 'Abhiyantrik Solutions',
              },
            ].map((t, i) => (
              <div key={i} className="px-6 md:px-10 py-10 md:border-r border-gray-200 last:border-r-0 border-b md:border-b-0 border-gray-200 flex flex-col justify-between gap-6">
                <p className="text-base md:text-lg font-light leading-relaxed text-gray-700" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-xs text-gray-700" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5" style={{ fontFamily: 'Poppins, sans-serif' }}>{t.role}</p>
                </div>
              </div>
            ))}

            <Plus h="left" />
            <Plus h="right" />
          </div>
        </div>

        {/* ── Closing note ───────────────────────────────────────────── */}
        <div className="px-6 md:px-10 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-b-lg bg-white">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Outcome</p>
            <p className="text-sm text-gray-500 leading-relaxed max-w-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Three months. One designer. A brand built from nothing, a product anyone can pick up on day one, and 280+ switches running live in homes and offices. What I'm most proud of: the founder has never had to explain the app to a customer.
            </p>
          </div>
          <Image src="/images/common/sa26.svg" alt="" width={96} height={96} className="w-20 h-20 opacity-10 shrink-0" />
        </div>

      </div>
    </div>
  );
};

export default SmartNation;
