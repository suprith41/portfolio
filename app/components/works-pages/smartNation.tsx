"use client";

import React, { useState, useEffect } from 'react';
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
    { name: 'Background',  hex: '#0A0A0F' },
    { name: 'Surface',     hex: '#18181F' },
    { name: 'Card',        hex: '#242429' },
    { name: 'Blue',        hex: '#4676FF' },
    { name: 'Active',      hex: '#32D583' },
    { name: 'Muted',       hex: '#9B9BAD' },
    { name: 'White',       hex: '#FFFFFF' },
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
            <div className="px-6 md:px-10 py-5 border-r border-gray-200">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Company</p>
              <p className="text-sm text-gray-700 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>Abhiyantrik Solutions</p>
            </div>
            {/* Scope — pills */}
            <div className="px-6 md:px-10 py-5 border-r border-gray-200">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Scope</p>
              <div className="flex flex-wrap gap-1">
                {['Brand Identity', 'App UI/UX', 'Motion', 'Web', 'Packaging', 'Brochures'].map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 border border-gray-300 text-gray-500 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>{tag}</span>
                ))}
              </div>
            </div>
            {/* Role */}
            <div className="px-6 md:px-10 py-5 border-r border-gray-200">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Role</p>
              <p className="text-sm text-gray-700 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>Designer</p>
            </div>
            {/* Deliverable */}
            <div className="px-6 md:px-10 py-5">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>Deliverable</p>
              <p className="text-sm text-gray-700 leading-snug" style={{ fontFamily: 'Poppins, sans-serif' }}>Zero to Launch</p>
            </div>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* Brief + Video */}
          <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 gap-0">
            <PlusAt x="50%"  desktop />
            <div className="px-6 md:px-10 py-10 md:py-16 md:border-r border-gray-200 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>The Brief</p>
              <h2 className="text-3xl md:text-4xl font-light leading-tight text-black mb-6" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                Your entire home, automated. Every switch controlled from one app.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Smart Nation makes smart switches and MCBs for Indian homes. Lights on at 6, geyser ready at 6:30, fans off when you leave. Set it once, live freely. I built the complete brand and product experience from the ground up.
              </p>
            </div>
            <div className="flex items-center justify-center px-6 md:px-10 py-10 md:py-16">
              <video className="w-full h-auto max-w-xs md:max-w-sm rounded-lg" autoPlay loop muted playsInline>
                <source src="/images/WorkImages/smartNationImages/smart-nation-animation.mp4" type="video/mp4" />
              </video>
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
            { stat: '280+',   label: 'Smart switches live — every tile, state & icon designed' },
            { stat: '3 mo',   label: 'First sketch to live product' },
            { stat: 'Day 1',  label: 'Usable by anyone — no manual, no learning curve' },
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
              One dashboard, everything visible. Tap to control. The whole app was designed so that a 10-year-old and a 70-year-old can use it without anyone explaining anything.
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
                  <strong className="text-gray-700 font-medium">On</strong> glows and asserts. <strong className="text-gray-700 font-medium">Off</strong> steps back. <strong className="text-gray-700 font-medium">Offline</strong> warns before you try — so you never tap a device that isn&apos;t listening.
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
              Pick the board, pick the module, give it a name — it&apos;s live. Four taps, done. Anyone in the house can add a new appliance without calling anyone.
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
              IoT setup is where most apps lose people. I redesigned it into a five-step linear flow — detect, connect, name, assign, confirm. No dead ends. The screen stays calm even when the hardware takes a moment.
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
              <strong className="text-gray-700 font-medium">Routine</strong> — schedule by day and time. Lights on at 6am, geyser at 6:30. <strong className="text-gray-700 font-medium">Timer</strong> — ad hoc, set and forget. Two modes kept visually separate so there&apos;s never any confusion between them.
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
            <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
              {brandColors.map((c) => (
                <div key={c.name}>
                  <div
                    className="w-full aspect-square rounded-lg mb-2 border border-gray-200"
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
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>Typography</p>
            <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 gap-0">
              <PlusAt x="50%"  desktop />
              <div className="md:border-r border-gray-200 md:pr-10 pb-8 md:pb-0">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Brand — Garamond Condensed</p>
                <p className="text-5xl md:text-6xl font-light leading-none text-black mb-2" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Aa</p>
                <p className="text-xl font-light text-gray-600 mb-4" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Smart Nation</p>
                <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
                <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>0 1 2 3 4 5 6 7 8 9</p>
              </div>
              <div className="md:pl-10 pt-8 md:pt-0">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>App UI — Poppins</p>
                <p className="text-5xl md:text-6xl font-light leading-none text-black mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Aa</p>
                <p className="text-xl font-light text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif' }}>Smart Nation</p>
                <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</p>
                <p className="text-xs text-gray-400 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>a b c d e f g h i j k l m n o p q r s t u v w x y z</p>
                <p className="text-xs text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>0 1 2 3 4 5 6 7 8 9</p>
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
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>A Visual Language Built From Scratch</h2>
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
                Material Icons covered the basics, but Indian homes needed more — ceiling fans, geysers, inverter ACs. I extended the library by drawing the missing appliances and altering existing icons to match, keeping the same grid and stroke weight across all 40+ types.
              </p>
            </div>
            <div className="flex items-center justify-center px-6 md:px-10 py-10 order-1 md:order-2">
              <Image src="/images/WorkImages/smartNationImages/applianceIcons.png" alt="Appliance Icons" width={400} height={300} className="w-full h-auto max-w-sm md:max-w-md" />
            </div>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* Navigation icons */}
          <div className="relative overflow-visible px-6 md:px-10 py-10 md:py-14 border-b border-gray-200">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>Navigation Icons — Idle → Active</p>
            <div className="space-y-6 md:space-y-8">
              <div className="flex justify-between md:justify-center md:gap-24">
                {['Home', 'MCB', 'Automation', 'Profile'].map((label) => (
                  <span key={label} className="text-xs text-gray-400 text-center w-16 md:w-32" style={{ fontFamily: 'Poppins, sans-serif' }}>{label}</span>
                ))}
              </div>
              <div className="flex justify-between md:justify-center md:gap-16 items-center">
                {[
                  { raw: '/images/WorkImages/smartNationImages/homeIcon-raw.png',    act: '/images/WorkImages/smartNationImages/homeIcon-act.png',    alt: 'Home' },
                  { raw: '/images/WorkImages/smartNationImages/MCBicon-raw.png',     act: '/images/WorkImages/smartNationImages/MCBicon-act.png',     alt: 'MCB' },
                  { raw: '/images/WorkImages/smartNationImages/autoIcon-raw.png',    act: '/images/WorkImages/smartNationImages/autoIcon-act.png',    alt: 'Auto' },
                  { raw: '/images/WorkImages/smartNationImages/profileIcon-raw.png', act: '/images/WorkImages/smartNationImages/profileIcon-act.png', alt: 'Profile' },
                ].map((icon) => (
                  <div key={icon.alt} className="flex flex-col items-center gap-4">
                    <Image src={icon.raw} alt={`${icon.alt} idle`}   width={64} height={64} className="w-10 h-10 md:w-16 md:h-16 object-contain" />
                    <Image src={icon.act} alt={`${icon.alt} active`} width={64} height={64} className="w-10 h-10 md:w-16 md:h-16 object-contain" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 md:mt-14 flex justify-center">
              <video className="w-full h-auto max-w-2xl rounded-lg" autoPlay loop muted playsInline>
                <source src="/images/WorkImages/smartNationImages/icon.mov" type="video/mp4" />
              </video>
            </div>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* App Icons */}
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>App Icon — Built for Every Occasion</p>
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              The icon changes with context — festivals, launches, seasons. The brand stays recognisable, the moment feels considered. Tap to preview on device.
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
            <div className="hidden md:flex flex-col items-center justify-center py-14 gap-4">
              <Image src={selectedIcon.mockup} alt={`${selectedIcon.name} mockup`} width={320} height={520} className="w-72 h-auto object-contain" />
              <p className="text-sm text-gray-400" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedIcon.name}</p>
            </div>
          </div>

          {/* Icon picker */}
          <div className="relative overflow-visible border-t border-gray-200 pt-4 pb-6">
            <div className="relative flex items-center justify-center gap-3 md:gap-5 flex-wrap px-6">
              {appIcons.map((icon, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-14 h-14 md:w-16 md:h-16 p-1 rounded-xl transition-all duration-200 mb-2 ${
                    selectedIcon.src === icon.src ? 'ring-2 ring-orange-400 ring-offset-2' : ''
                  }`}
                >
                  <Image src={icon.src} alt={icon.name} width={56} height={56} className="w-full h-full object-contain rounded-xl" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.2)', cursor: 'pointer' }} />
                </button>
              ))}
              <div
                className="hidden md:block absolute bottom-0 h-1 bg-gray-300 rounded-t transition-all duration-500 ease-in-out"
                style={{
                  width: '38px',
                  left: '50%',
                  transform: `translateX(calc(-50% + ${(appIcons.findIndex(i => i.src === selectedIcon.src) - (appIcons.length - 1) / 2) * (64 + 20)}px))`,
                }}
              />
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
              The product lives in a box before it lives in the wall. Packaging designed to communicate premium at first glance — clean, confident, unmistakably Smart Nation.
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
              Print collateral that carries the same visual language as the app — so the experience is consistent whether a customer is holding the brochure or their phone.
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
                quote: "The brand came together faster than I expected — and it actually looked like what I had in my head. That's rare.",
                name: 'Founder',
                role: 'Abhiyantrik Solutions',
              },
              {
                quote: "Having proper icons for every appliance made a real difference. The hardware team could finally show clients exactly what each switch would control.",
                name: 'Hardware Developer',
                role: 'Abhiyantrik Solutions',
              },
              {
                quote: "The app felt polished from the first build. Customers kept commenting on how easy it was to figure out — no one asked for a manual.",
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
              One designer. One brand. 40+ installs, 280+ switches in the field — and a product anyone can pick up and use on day one.
            </p>
          </div>
          <Image src="/images/common/sa26.svg" alt="" width={96} height={96} className="w-20 h-20 opacity-10 shrink-0" />
        </div>

      </div>
    </div>
  );
};

export default SmartNation;
