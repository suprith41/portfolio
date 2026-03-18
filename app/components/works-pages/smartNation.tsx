"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image'
import SmartTouchSwitchBoard, { SwitchState } from './abhiyantrik/SmartTouchSwitchBoard'
import SmartMCB, { MCBState } from './abhiyantrik/SmartMCB'
import PhoneShell from './abhiyantrik/PhoneShell'

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

const SwitchStatesSection = () => {
  const [lightOn, setLightOn] = useState(true);
  const [offlineClicked, setOfflineClicked] = useState(false);

  const handleOfflineClick = () => {
    if (offlineClicked) return;
    setOfflineClicked(true);
    setTimeout(() => setOfflineClicked(false), 600);
  };

  return (
    <div className="relative overflow-visible px-6 md:px-10 py-8 border-t border-gray-200 bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Switch States</p>
          <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
            <strong className="text-gray-700 font-medium">On</strong> glows and asserts. <strong className="text-gray-700 font-medium">Off</strong> steps back. <strong className="text-gray-700 font-medium">Offline</strong> warns before you try, so you never tap a device that isn&apos;t listening.
          </p>
          <p className="text-[10px] text-gray-400 mt-3 italic" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Try tapping the switches →</p>
        </div>
        <div className="flex gap-8 md:gap-12 shrink-0">
          {/* On */}
          <div className="text-center cursor-pointer select-none" onClick={() => setLightOn(true)}>
            <img
              src={lightOn ? '/images/WorkImages/smartNationImages/switchOn.png' : '/images/WorkImages/smartNationImages/switchOff.png'}
              alt="Switch On"
              className="h-14 md:h-20 mx-auto object-contain mb-3 transition-all duration-300 pointer-events-none"
            />
            <p className="text-xs text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{lightOn ? 'On' : 'Off'}</p>
          </div>
          {/* Off */}
          <div className="text-center cursor-pointer select-none" onClick={() => setLightOn(false)}>
            <img
              src={lightOn ? '/images/WorkImages/smartNationImages/switchOff.png' : '/images/WorkImages/smartNationImages/switchOn.png'}
              alt="Switch Off"
              className="h-14 md:h-20 mx-auto object-contain mb-3 transition-all duration-300 pointer-events-none"
            />
            <p className="text-xs text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{lightOn ? 'Off' : 'On'}</p>
          </div>
          {/* Offline */}
          <div
            className="text-center cursor-pointer select-none"
            onClick={handleOfflineClick}
            style={{ animation: offlineClicked ? 'sn-shake 0.5s ease' : 'none' }}
          >
            <div className="rounded-2xl transition-all duration-150" style={{ boxShadow: offlineClicked ? '0 0 12px 2px rgba(239,68,68,0.2)' : 'none' }}>
              <img
                src="/images/WorkImages/smartNationImages/switchOffline.png"
                alt="Switch Offline"
                className="h-14 md:h-20 mx-auto object-contain mb-3 pointer-events-none"
              />
            </div>
            <p className="text-xs text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Offline</p>
          </div>
        </div>
      </div>
      <Plus h="left" v="top" />
      <Plus h="right" v="top" />
    </div>
  );
};

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

  const [setupSlide, setSetupSlide] = useState(0);
  const [desktopSetupSlide, setDesktopSetupSlide] = useState(0);
  const [swbPan, setSwbPan] = useState(0);
  const [mcbPan, setMcbPan] = useState(0);
  const swbWrapperRef = useRef<HTMLDivElement>(null);
  const mcbWrapperRef = useRef<HTMLDivElement>(null);
  const swbTouchX = useRef(0);
  const mcbTouchX = useRef(0);

  // Sync pan state → wrapper transform with transition
  useEffect(() => {
    const el = swbWrapperRef.current; if (!el) return;
    el.style.transition = 'transform 0.5s ease-in-out';
    el.style.transform = swbPan === 0 ? 'translateX(0)' : 'translateX(-50%)';
  }, [swbPan]);
  useEffect(() => {
    const el = mcbWrapperRef.current; if (!el) return;
    el.style.transition = 'transform 0.5s ease-in-out';
    el.style.transform = mcbPan === 0 ? 'translateX(0)' : 'translateX(-50%)';
  }, [mcbPan]);
  const [addAppSlide, setAddAppSlide] = useState(0);
  const [desktopAddAppSlide, setDesktopAddAppSlide] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState(appIcons[0]);
  const [showProcess, setShowProcess]   = useState(false);
  const [processSlide, setProcessSlide] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [copied, setCopied] = useState<'email' | 'phone' | null>(null);

  // ── Abhiyantrik interactive demo state ─────────────────────────
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    setSliderPosition(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  };
  const [switchState, setSwitchState] = useState<SwitchState>({
    light1: false, light2: false, light3: false, light4: false,
    fan: false, tv: false, router: false,
  });
  const [fanSpeed, setFanSpeed] = useState(0);
  const [activeDemo, setActiveDemo] = useState<'switch' | 'mcb'>('switch');
  const [mcbState, setMCBState] = useState<MCBState>({ mcb: false });
  const toggleMCB = () => setMCBState(prev => ({ mcb: !prev.mcb }));
  const toggleSwitch = (switchName: keyof SwitchState) => {
    setSwitchState(prev => ({ ...prev, [switchName]: !prev[switchName] }));
  };
  const handleFanSpeedChange = (newSpeed: number) => {
    setFanSpeed(newSpeed);
    setSwitchState(prev => ({ ...prev, fan: newSpeed > 0 }));
  };
  const toggleAllDevices = (state: boolean) => {
    setSwitchState({ light1: state, light2: state, light3: state, light4: state, fan: state, tv: state, router: state });
    if (!state) setFanSpeed(0);
  };
  const mobileDevices = {
    fan: switchState.fan, tv: switchState.tv, router: switchState.router,
    light1: switchState.light1, light2: switchState.light2, light3: switchState.light3, light4: switchState.light4,
  };

  const handleCopy = (type: 'email' | 'phone', value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };
  useEffect(() => { setMounted(true); }, []);
  const [activeSection, setActiveSection] = useState('sn-brief');
  const clickSound = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    clickSound.current = new Audio('/images/WorkImages/abhiyantrikImages/AppMedia/touch-click.mp3');
    clickSound.current.volume = 0.7;
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

  const sections = [
    { id: 'sn-brief', label: 'Brief' },
    { id: 'sn-01',    label: 'App Experience' },
    { id: 'sn-02',    label: 'Provisioning' },
    { id: 'sn-03',    label: 'Onboarding' },
    { id: 'sn-04',    label: 'Automation' },
    { id: 'sn-05',    label: 'Design System' },
    { id: 'sn-07',    label: 'Packaging' },
    { id: 'sn-08',    label: 'Brochures' },
    { id: 'aby-01',   label: 'Landing Page' },
    { id: 'aby-02',   label: 'Flow' },
    { id: 'aby-03',   label: 'Interactive' },
    { id: 'aby-04',   label: '3D Mockups' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Sticky sidebar index — portalled to body so fixed positioning always works */}
      {mounted && createPortal(
        <>
          {/* Bracket shape: right edge aligns with + markers, curves hug nav items */}
          <div
            className="hidden xl:block fixed z-[9998] pointer-events-none"
            style={{
              top: 'calc(50% - 175px)',
              bottom: 'calc(50% - 175px)',
              left: 0,
              width: '32px',
              border: '1px solid #d1d5db',
              borderLeft: 'none',
              borderTopRightRadius: '16px',
              borderBottomRightRadius: '16px',
            }}
          />
          <nav
            className="hidden xl:flex fixed z-[9999]"
            style={{ top: '50%', transform: 'translateY(-50%)', left: '26px' }}
          >
          <div className="absolute" style={{ left: '5px', top: 0, bottom: 0, width: 0 }} />
          <div className="flex flex-col">
            {sections.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    const el = document.getElementById(s.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                  className="flex items-center gap-3 py-[6px] text-left group relative"
                >
                  {/* Marker: + for inactive, filled square for active */}
                  <span
                    className="shrink-0 flex items-center justify-center transition-all duration-300 relative z-10 bg-white"
                    style={{ width: '11px', height: '11px' }}
                  >
                    {isActive ? (
                      <span style={{ width: '7px', height: '7px', background: '#111827', display: 'block' }} />
                    ) : (
                      <span
                        style={{
                          fontFamily: 'monospace',
                          fontSize: '11px',
                          lineHeight: 1,
                          color: '#9ca3af',
                          display: 'block',
                        }}
                        className="group-hover:text-gray-500 transition-colors duration-200"
                      >+</span>
                    )}
                  </span>
                  <span
                    className={`text-[9px] uppercase tracking-[0.15em] transition-all duration-200 whitespace-nowrap ${
                      isActive ? 'text-gray-900 font-semibold' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
          </nav>
        </>,
        document.body
      )}
      <div className="relative overflow-visible max-w-5xl mx-auto border-l border-r border-t border-gray-200">
        <Plus h="left"  v="top" />
        <Plus h="right" v="top" />

        {/* ── Project Header ─────────────────────────────────────────── */}
        <div className="relative overflow-visible flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-200 bg-white">
          <Image src="/images/WorkImages/smartNationImages/sn-header-logo.png" alt="Smart Nation" width={48} height={48} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
          <h1 className="text-2xl md:text-4xl font-light tracking-tight" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
            Smart Nation
          </h1>
          <Image src="/images/common/sa26.svg" alt="SA" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-20" />
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── Project Meta ───────────────────────────────────────────── */}
        <div id="sn-brief" className="relative overflow-visible border-b border-gray-200">
          <div className="relative flex flex-wrap md:flex-nowrap items-stretch gap-0 border-b border-gray-200">
            {[
              { label: 'Company',     value: 'Abhiyantrik Solutions' },
              { label: 'Role',        value: 'Designer' },
              { label: 'Deliverable', value: 'Zero to V1' },
            ].map((item, i) => (
              <div key={item.label} className={`flex items-center gap-2 px-6 md:px-8 py-3 ${i === 1 ? 'border-l border-gray-200' : ''} ${i === 2 ? 'w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-200' : ''}`}>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 shrink-0" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{item.label}</span>
                <span className="text-[11px] text-gray-700" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{item.value}</span>
              </div>
            ))}
            {/* Scope marquee — full row on mobile, inline on desktop */}
            <div className="flex items-center gap-2 w-full md:w-auto pl-6 md:pl-8 pr-6 py-3 border-t md:border-t-0 md:border-l border-gray-200 overflow-hidden min-w-0 md:flex-1">
              <span className="text-[9px] uppercase tracking-widest text-gray-400 shrink-0" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Scope</span>
              <div className="overflow-hidden flex-1" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)' }}>
                <div className="flex gap-2 w-max" style={{ animation: 'marquee 12s linear infinite' }}>
                  {['Brand Identity', 'Motion', 'Web', 'Packaging', 'Brochures', 'User Research', 'Application UI/UX', 'Brand Identity', 'Motion', 'Web', 'Packaging', 'Brochures', 'User Research', 'Application UI/UX'].map((tag, i) => (
                    <span key={i} className="text-[9px] px-2 py-0.5 border border-gray-200 text-gray-500 whitespace-nowrap" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative overflow-visible border-b border-gray-200">
            <Image
              src="/images/HomeImages/SN-tumb-1.png"
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
            <div className="px-10 md:px-16 py-10 md:py-16 md:border-r border-gray-200 flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>The Brief</p>
              <h2 className="text-3xl md:text-4xl font-light leading-tight text-black mb-6" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                Your entire home, automated. Every switch controlled from one app.
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                In a typical Indian home there are 20–30 switches controlling lights, fans, and appliances. Instead of replacing every device, the idea was to make the switchboard smart.
                <br /><br />
                Smart Nation&apos;s hardware fits into existing switchboards, enabling control of any connected device through one app, no rewiring, no replacing appliances. The goal was to create a simple experience with full control, reliable automations, and technology that works effortlessly in everyday life.
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
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 shrink-0" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                    {processSessions[processSlide].label}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed shrink-0" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
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
                        className="hidden md:block w-full h-full object-cover"
                        style={{ transform: 'scale(1.12)', transformOrigin: 'center center' }}
                      />
                    )}
                    {/* Mobile image for all sessions on mobile; also session 1 & 2 on desktop */}
                    <Image
                      src={processSessions[processSlide].mobile}
                      alt={processSessions[processSlide].label}
                      width={600}
                      height={800}
                      className={`w-full h-full object-cover${processSlide === 2 ? ' md:hidden' : ''}`}
                      style={processSlide === 2 ? { transform: 'scale(1.12)', transformOrigin: 'center center' } : {}}
                    />
                  </div>
                </div>
              )}

              {/* Toggle button — bottom right always */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                {showProcess ? (
                  <div className="flex gap-1.5 items-center">
                    {processSessions.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setProcessSlide(i)}
                        className="w-1.5 h-1.5 rounded-full transition-colors"
                        style={{ background: i === processSlide ? '#374151' : '#d1d5db' }}
                      />
                    ))}
                  </div>
                ) : <span />}
                <div className="flex gap-2 items-center">
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
                  className="text-[10px] uppercase tracking-widest px-4 py-2 border border-gray-300 text-black bg-white hover:bg-gray-50 transition-colors"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
                >
                  {showProcess ? '✕ Close' : (
                    <span className="flex flex-row items-center gap-2">
                      <Image src="/images/WorkImages/smartNationImages/draw-icon.svg" alt="" width={16} height={16} className="w-4 h-4" style={{ filter: 'brightness(0)' }} />
                      Logo Making Process
                    </span>
                  )}
                </button>
                </div>
              </div>
            </div>
          </div>
          <PlusAt x="50%" />
        </div>

        {/* ── Impact Numbers ─────────────────────────────────────────── */}
        <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-3 border-b border-gray-200">
          <PlusAt x="33.33%" v="top" desktop />
          <PlusAt x="66.66%" v="top" desktop />
          <PlusAt x="33.33%" desktop />
          <PlusAt x="66.66%" desktop />
          {[
            { stat: '40+',  label: 'Installed across homes, offices & commercial spaces', hoverImg: '/images/WorkImages/smartNationImages/home-asset.png',   dir: 'top',    size: 80  },
            { stat: '280+', label: 'Smart switches live, every tile, state and icon designed', hoverImg: '/images/WorkImages/smartNationImages/swb-asset.png',    dir: 'right',  size: 100 },
            { stat: '3 mo', label: 'First sketch to live product',                             hoverImg: '/images/WorkImages/smartNationImages/rocket-asset.png', dir: 'bottom', size: 48  },
          ].map((item) => {
            const hovered = hoveredStat === item.stat;

            const imgStyle: React.CSSProperties = {
              position: 'absolute',
              pointerEvents: 'none',
              zIndex: 20,
              width: `${item.size}px`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.28s ease, top 0.28s ease, right 0.28s ease, bottom 0.28s ease',
              ...(item.dir === 'top'    && { top:    hovered ? '12px'  : '-40px', right:  '12px' }),
              ...(item.dir === 'right'  && { top: '12px', right: hovered ? '12px' : '-50px' }),
              ...(item.dir === 'bottom' && { bottom: hovered ? '0px' : '-60px', right: '12px' }),
            };

            return (
              <div
                key={item.stat}
                className="relative px-8 py-8 md:px-10 border-b border-gray-200 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 overflow-hidden"
                onMouseEnter={() => setHoveredStat(item.stat)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <p className="text-5xl font-light text-black mb-3" style={{ fontFamily: 'Garamond, Georgia, serif' }}>{item.stat}</p>
                <p className="text-sm text-gray-400 leading-snug max-w-[260px]" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{item.label}</p>
                <div style={imgStyle}>
                  <Image
                    src={item.hoverImg}
                    alt={item.stat}
                    width={item.size}
                    height={item.size}
                    className="w-full h-auto object-contain drop-shadow-md"
                  />
                </div>
              </div>
            );
          })}
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 01 · App Experience ────────────────────────────────────── */}
        <div id="sn-01" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>01</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Control, Simplified</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              A home has rooms, rooms have devices, devices have states. Most smart home apps bury this under layers of menus. I designed around how people actually think: room first, device second. One screen shows everything that matters. Tap once to control. A 10-year-old and a 70-year-old should both get it without anyone explaining anything.
            </p>
          </div>

          <div className="w-full">
            <Image src="/images/HomeImages/SN-tumb-2.png" alt="Smart Nation App — 3-screen mockup" width={1200} height={800} className="w-full h-auto" />
          </div>

          {/* Switch states — interactive */}
          <SwitchStatesSection />
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 02 · Device Provisioning ───────────────────────────────── */}
        <div id="sn-02" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>02</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Hardware in Hand, Online in Minutes</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              IoT setup is where trust breaks. Most users assume the product is broken the moment it takes more than five seconds. I redesigned provisioning into a linear flow: detect, connect, name, assign, confirm. Every step tells you exactly what's happening. The screen stays calm so the user does too.
            </p>
          </div>
          {/* ── Mobile: 1 image per slide, 4 slides ── */}
          <div className="md:hidden relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${setupSlide * 100}%)` }}
            >
              {['setup-slide-1', 'setup-slide-2', 'setup-slide-3', 'setup-slide-4'].map((slide) => (
                <div key={slide} className="w-full shrink-0">
                  <Image src={`/images/WorkImages/smartNationImages/${slide}.png`} alt={slide} width={800} height={1200} className="w-full h-auto block" />
                </div>
              ))}
            </div>
            {setupSlide > 0 && (
              <button onClick={() => setSetupSlide(s => s - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}
            {setupSlide < 3 && (
              <button onClick={() => setSetupSlide(s => s + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setSetupSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === setupSlide ? 'bg-gray-800 w-4' : 'bg-gray-300 w-1.5'}`} />
              ))}
            </div>
          </div>

          {/* ── Desktop: 2 images per slide, 2 slides ── */}
          <div className="hidden md:block relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${desktopSetupSlide * 100}%)` }}
            >
              {/* Slide 1: images 1 + 2 */}
              <div className="w-full shrink-0 flex">
                <div className="w-1/2">
                  <Image src="/images/WorkImages/smartNationImages/setup-slide-1.png" alt="Setup step 1" width={800} height={1200} className="w-full h-auto block" />
                </div>
                <div className="w-1/2">
                  <Image src="/images/WorkImages/smartNationImages/setup-slide-2.png" alt="Setup step 2" width={800} height={1200} className="w-full h-auto block" />
                </div>
              </div>
              {/* Slide 2: images 3 + 4 */}
              <div className="w-full shrink-0 flex">
                <div className="w-1/2">
                  <Image src="/images/WorkImages/smartNationImages/setup-slide-3.png" alt="Setup step 3" width={800} height={1200} className="w-full h-auto block" />
                </div>
                <div className="w-1/2">
                  <Image src="/images/WorkImages/smartNationImages/setup-slide-4.png" alt="Setup step 4" width={800} height={1200} className="w-full h-auto block" />
                </div>
              </div>
            </div>
            {desktopSetupSlide > 0 && (
              <button onClick={() => setDesktopSetupSlide(0)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}
            {desktopSetupSlide < 1 && (
              <button onClick={() => setDesktopSetupSlide(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {[0, 1].map(i => (
                <button key={i} onClick={() => setDesktopSetupSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === desktopSetupSlide ? 'bg-gray-800 w-4' : 'bg-gray-300 w-1.5'}`} />
              ))}
            </div>
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 03 · Adding an Appliance ───────────────────────────────── */}
        <div id="sn-03" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>03</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Switchboard to Dashboard in Four Taps</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              Once the hardware is in the wall, the homeowner should own it completely, no dependency on the installer after day one. I designed this flow to be fully self-serve: pick the board, pick the module, give it a name. Four taps and any family member can map a new switch themselves.
            </p>
          </div>
          {/* ── Mobile: 1 image per slide, 4 slides ── */}
          <div className="md:hidden relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${addAppSlide * 100}%)` }}>
              {['add-app-slide-1', 'add-app-slide-2', 'add-app-slide-3', 'add-app-slide-4'].map((slide) => (
                <div key={slide} className="w-full shrink-0">
                  <Image src={`/images/WorkImages/smartNationImages/${slide}.png`} alt={slide} width={800} height={1200} className="w-full h-auto block" />
                </div>
              ))}
            </div>
            {addAppSlide > 0 && (
              <button onClick={() => setAddAppSlide(s => s - 1)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}
            {addAppSlide < 3 && (
              <button onClick={() => setAddAppSlide(s => s + 1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setAddAppSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === addAppSlide ? 'bg-gray-800 w-4' : 'bg-gray-300 w-1.5'}`} />
              ))}
            </div>
          </div>

          {/* ── Desktop: 2 images per slide, 2 slides ── */}
          <div className="hidden md:block relative overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${desktopAddAppSlide * 100}%)` }}>
              <div className="w-full shrink-0 flex">
                <div className="w-1/2"><Image src="/images/WorkImages/smartNationImages/add-app-slide-1.png" alt="Add app step 1" width={800} height={1200} className="w-full h-auto block" /></div>
                <div className="w-1/2"><Image src="/images/WorkImages/smartNationImages/add-app-slide-2.png" alt="Add app step 2" width={800} height={1200} className="w-full h-auto block" /></div>
              </div>
              <div className="w-full shrink-0 flex">
                <div className="w-1/2"><Image src="/images/WorkImages/smartNationImages/add-app-slide-3.png" alt="Add app step 3" width={800} height={1200} className="w-full h-auto block" /></div>
                <div className="w-1/2"><Image src="/images/WorkImages/smartNationImages/add-app-slide-4.png" alt="Add app step 4" width={800} height={1200} className="w-full h-auto block" /></div>
              </div>
            </div>
            {desktopAddAppSlide > 0 && (
              <button onClick={() => setDesktopAddAppSlide(0)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}
            {desktopAddAppSlide < 1 && (
              <button onClick={() => setDesktopAddAppSlide(1)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-gray-200 shadow flex items-center justify-center z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {[0, 1].map(i => (
                <button key={i} onClick={() => setDesktopAddAppSlide(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === desktopAddAppSlide ? 'bg-gray-800 w-4' : 'bg-gray-300 w-1.5'}`} />
              ))}
            </div>
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 04 · Automation ────────────────────────────────────────── */}
        <div id="sn-04" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>04</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Set It Once, Live Freely</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              Two modes, not one, because the use cases are fundamentally different. <strong className="text-gray-700 font-medium">Routine</strong> handles fixed daily habits: lights on at 6am, geyser at 6:30, fans off at bedtime. <strong className="text-gray-700 font-medium">Timer</strong> handles spontaneous needs: run the AC for 90 minutes, then off. Merging them would have confused both. Kept visually separate, each with its own logic.
            </p>
          </div>
          <div className="px-0 md:px-10 pt-6 md:pt-10 pb-0 flex justify-center">
            <Image src="/images/WorkImages/smartNationImages/automation.png" alt="Automation Features" width={1400} height={800} className="w-full h-auto block" />
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 05 · Design System ─────────────────────────────────────── */}
        <div id="sn-05" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>05</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Design System</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>

          {/* Colour palette */}
          <div className="relative overflow-visible px-6 md:px-10 py-10 border-b border-gray-200">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-6" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Brand Colours</p>
            <div className="grid grid-cols-3 md:grid-cols-5">
              {brandColors.map((c) => (
                <div key={c.name}>
                  <div
                    className={`w-full mb-2${c.hex === '#FFFFFF' ? ' border border-gray-200' : ''}`}
                    style={{ background: c.hex, aspectRatio: '5 / 2' }}
                  />
                  <p className="text-[10px] text-gray-500 leading-snug" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{c.name}</p>
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
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-6" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Typography: Poppins</p>
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
                    <p className="text-[10px] text-gray-400 w-32 shrink-0" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{t.label}</p>
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

          {/* Appliance icons */}
          <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
            <PlusAt x="50%"  desktop />
            <div className="px-6 md:px-10 py-10 md:py-14 flex flex-col justify-center md:border-r border-gray-200 order-2 md:order-1">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Appliance Icons</p>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
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
            <p className="text-[10px] uppercase tracking-widest text-gray-400 px-6 md:px-10 pt-10 pb-8" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Navigation Icons, Idle to Active</p>

            {/* 4-col grid — label + idle + active all aligned */}
            <div className="grid grid-cols-4 px-6 md:px-10 pb-10 md:pb-14 gap-2 md:gap-4">
              {[
                { label: 'Home',       raw: '/images/WorkImages/smartNationImages/homeIcon-raw.png',    act: '/images/WorkImages/smartNationImages/homeIcon-act.png' },
                { label: 'MCB',        raw: '/images/WorkImages/smartNationImages/MCBicon-raw.png',     act: '/images/WorkImages/smartNationImages/MCBicon-act.png' },
                { label: 'Automation', raw: '/images/WorkImages/smartNationImages/autoIcon-raw.png',    act: '/images/WorkImages/smartNationImages/autoIcon-act.png' },
                { label: 'Profile',    raw: '/images/WorkImages/smartNationImages/profileIcon-raw.png', act: '/images/WorkImages/smartNationImages/profileIcon-act.png' },
              ].map((icon) => (
                <div key={icon.label} className="flex flex-col items-center gap-3">
                  <span className="text-xs text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{icon.label}</span>
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
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>App Icon</p>
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              The icon changes with context: festivals, launches, seasons. The brand stays recognisable, the moment feels considered. Tap to preview on device.
            </p>
            <Plus h="left" />
            <Plus h="right" />
            <PlusAt x="50%" desktop />
          </div>

          <div className="relative overflow-visible grid grid-cols-1 md:grid-cols-2 items-start">
            <PlusAt x="50%"  desktop />
            <div className="flex flex-col md:hidden px-6 pt-0 pb-8 items-center gap-6">
              <Image src={selectedIcon.mockup} alt={`${selectedIcon.name} mockup`} width={340} height={550} className="w-72 h-auto object-contain object-top" style={{ marginTop: '-2px' }} />
              <Image src={selectedIcon.src} alt="Selected icon" width={160} height={160} className="w-36 h-36 object-contain" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.2))' }} />
              <p className="text-sm text-gray-500" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{selectedIcon.name}</p>
            </div>
            <div className="hidden md:flex items-center justify-center py-14 md:border-r border-gray-200">
              <Image src={selectedIcon.src} alt="Selected icon" width={280} height={280} className="w-64 h-64 object-contain" style={{ filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.2))' }} />
            </div>
            <div className="hidden md:flex flex-col items-center justify-start pt-0 pb-6 gap-4 overflow-hidden">
              <Image src={selectedIcon.mockup} alt={`${selectedIcon.name} mockup`} width={400} height={650} className="w-full max-w-sm h-auto object-contain object-top" style={{ marginTop: '-2px' }} />
              <p className="text-sm text-gray-400 text-center" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{selectedIcon.name}</p>
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
                    <div className="relative">
                    {/* Orange selected dot */}
                    {isSelected && (
                      <span className="absolute left-1/2 -translate-x-1/2 rounded-full bg-orange-500" style={{ bottom: '-5px', width: '4px', height: '4px' }} />
                    )}
                    <button
                      onClick={() => {
                        if (clickSound.current) { clickSound.current.currentTime = 0; clickSound.current.play().catch(() => {}); }
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
        <div id="sn-07" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>07</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Packaging Design</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          <div className="px-6 md:px-10 pt-6 pb-3">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              Simple and minimal. The packaging stays out of its own way: clean surfaces, restrained typography, and just enough brand presence to feel intentional without being loud.
            </p>
          </div>
          <div className="overflow-hidden">
            <Image
              src="/images/WorkImages/smartNationImages/smartnation-box-package-design.png"
              alt="Smart Nation packaging design"
              width={1600}
              height={900}
              className="w-full h-auto block animate-slow-zoom"
            />
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── 08 · Brochures ─────────────────────────────────────────── */}
        <div id="sn-08" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>08</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Brochures & User Guides</h2>
            <Plus h="left" />
            <Plus h="right" />
          </div>
          {/* SWB brochure */}
          <div className="border-t border-gray-200">
            <p className="px-6 md:px-10 py-4 text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>SWB</p>
            {/* Mobile: live-drag pan */}
            <div
              className="md:hidden relative overflow-hidden w-full"
              onTouchStart={(e) => {
                swbTouchX.current = e.touches[0].clientX;
                if (swbWrapperRef.current) swbWrapperRef.current.style.transition = 'none';
              }}
              onTouchMove={(e) => {
                const diff = e.touches[0].clientX - swbTouchX.current;
                const cw = e.currentTarget.offsetWidth;
                const base = swbPan === 0 ? 0 : -cw;
                const offset = Math.max(-cw, Math.min(0, base + diff));
                if (swbWrapperRef.current) swbWrapperRef.current.style.transform = `translateX(${offset}px)`;
              }}
              onTouchEnd={(e) => {
                const diff = e.changedTouches[0].clientX - swbTouchX.current;
                const cw = e.currentTarget.offsetWidth;
                if (swbWrapperRef.current) swbWrapperRef.current.style.transition = 'transform 0.5s ease-in-out';
                if (diff < -cw * 0.25 && swbPan === 0) setSwbPan(1);
                else if (diff > cw * 0.25 && swbPan === 1) setSwbPan(0);
                else {
                  if (swbWrapperRef.current) swbWrapperRef.current.style.transform = swbPan === 0 ? 'translateX(0)' : 'translateX(-50%)';
                }
              }}
            >
              <div ref={swbWrapperRef} style={{ width: '200%' }}>
                <Image src="/images/WorkImages/smartNationImages/SWB-brousher.png" alt="SWB brochure" width={1600} height={1000} className="w-full h-auto block" />
              </div>
              {/* Bottom controls: arrows + dots in one row */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3">
                <button
                  onClick={() => setSwbPan(0)}
                  className={`w-9 h-9 bg-white border border-gray-200 shadow flex items-center justify-center transition-opacity ${swbPan === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div className="flex gap-2">
                  {[0, 1].map(i => (
                    <button key={i} onClick={() => setSwbPan(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === swbPan ? 'bg-gray-800 w-4' : 'bg-gray-300 w-1.5'}`} />
                  ))}
                </div>
                <button
                  onClick={() => setSwbPan(1)}
                  className={`w-9 h-9 bg-white border border-gray-200 shadow flex items-center justify-center transition-opacity ${swbPan === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            {/* Desktop: full image */}
            <div className="hidden md:block">
              <Image src="/images/WorkImages/smartNationImages/SWB-brousher.png" alt="SWB brochure design" width={1600} height={1000} className="w-full h-auto block" />
            </div>
          </div>

          {/* MCB brochure */}
          <div className="border-t border-gray-200">
            <p className="px-6 md:px-10 py-4 text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>MCB</p>
            {/* Mobile: live-drag pan */}
            <div
              className="md:hidden relative overflow-hidden w-full"
              onTouchStart={(e) => {
                mcbTouchX.current = e.touches[0].clientX;
                if (mcbWrapperRef.current) mcbWrapperRef.current.style.transition = 'none';
              }}
              onTouchMove={(e) => {
                const diff = e.touches[0].clientX - mcbTouchX.current;
                const cw = e.currentTarget.offsetWidth;
                const base = mcbPan === 0 ? 0 : -cw;
                const offset = Math.max(-cw, Math.min(0, base + diff));
                if (mcbWrapperRef.current) mcbWrapperRef.current.style.transform = `translateX(${offset}px)`;
              }}
              onTouchEnd={(e) => {
                const diff = e.changedTouches[0].clientX - mcbTouchX.current;
                const cw = e.currentTarget.offsetWidth;
                if (mcbWrapperRef.current) mcbWrapperRef.current.style.transition = 'transform 0.5s ease-in-out';
                if (diff < -cw * 0.25 && mcbPan === 0) setMcbPan(1);
                else if (diff > cw * 0.25 && mcbPan === 1) setMcbPan(0);
                else {
                  if (mcbWrapperRef.current) mcbWrapperRef.current.style.transform = mcbPan === 0 ? 'translateX(0)' : 'translateX(-50%)';
                }
              }}
            >
              <div ref={mcbWrapperRef} style={{ width: '200%' }}>
                <Image src="/images/WorkImages/smartNationImages/MCB-brousher.png" alt="MCB brochure" width={1600} height={1000} className="w-full h-auto block" />
              </div>
              {/* Bottom controls: arrows + dots in one row */}
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-between px-3">
                <button
                  onClick={() => setMcbPan(0)}
                  className={`w-9 h-9 bg-white border border-gray-200 shadow flex items-center justify-center transition-opacity ${mcbPan === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div className="flex gap-2">
                  {[0, 1].map(i => (
                    <button key={i} onClick={() => setMcbPan(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === mcbPan ? 'bg-gray-800 w-4' : 'bg-gray-300 w-1.5'}`} />
                  ))}
                </div>
                <button
                  onClick={() => setMcbPan(1)}
                  className={`w-9 h-9 bg-white border border-gray-200 shadow flex items-center justify-center transition-opacity ${mcbPan === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
            {/* Desktop: full image as-is */}
            <div className="hidden md:block">
              <Image src="/images/WorkImages/smartNationImages/MCB-brousher.png" alt="MCB brochure design" width={1600} height={1000} className="w-full h-auto block" />
            </div>
          </div>
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            ABHIYANTRIK WEBSITE — merged below brochures
        ══════════════════════════════════════════════════════════════ */}

        {/* ── Abhiyantrik · 01 · Landing Page ────────────────────────── */}
        <div id="aby-01" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>01</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Landing Page</h2>
            <Plus h="left" /><Plus h="right" />
          </div>

          {/* ── Hero image ────────────────────────────────── */}
          <div className="w-full border-b border-gray-200">
            <Image src="/images/WorkImages/abhiyantrikImages/Abhiyantrik-tumb-1.png" alt="Abhiyantrik Website Mockup" width={1200} height={800} className="w-full h-auto" />
          </div>

          <div className="relative overflow-visible px-6 md:px-10 py-8 flex flex-col gap-6">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              I designed and developed Abhiyantrik Solutions&apos; complete website experience, from initial sketches to a fully interactive platform. The site showcases Smart Nation&apos;s innovative home automation products through immersive product demonstrations, allowing visitors to experience the technology before they buy.
            </p>
            <a href="https://www.abhiyantriksolutions.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs text-black border border-gray-200 w-fit hover:bg-gray-50 transition-colors" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              <span className="px-4 py-2 border-r border-gray-200">Visit website ↗</span>
              <span className="px-4 py-2 text-gray-400">abhiyantriksolutions.in</span>
            </a>
            <Plus h="left" /><Plus h="right" />
          </div>
        </div>

        {/* ── Abhiyantrik · 02 · Flow ─────────────────────────────────── */}
        <div id="aby-02" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>02</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Flow</h2>
            <Plus h="left" /><Plus h="right" />
          </div>
          <div className="px-6 md:px-10 py-8 md:py-12">
            <div className="flex items-center justify-center mb-8">
              <Image src="/images/WorkImages/abhiyantrikImages/flow.png" alt="Development Flow" width={1400} height={600} className="w-full md:w-2/3 max-w-2xl h-auto mx-auto" />
            </div>
            <h3 className="text-xl md:text-2xl font-light mb-4" style={{ fontFamily: 'Garamond, Georgia, serif' }}>From Concept to Deployment</h3>
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              Started with the idea of bringing an interactive product experience into the website itself, so users could feel the product before they buy. Concept got confirmed, then moved into full Figma design for the entire site. Created all 3D assets and visuals in Blender and Photoshop. Moved into development using Claude AI to vibe-code and complete the build, then deployed live.
            </p>
          </div>
          <Plus h="left" /><Plus h="right" />
        </div>

        {/* ── Abhiyantrik · 03 · Interactive Product Experience ──────── */}
        <div id="aby-03" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>03</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>Interactive Product Experience</h2>
            <Plus h="left" /><Plus h="right" />
          </div>
          <div className="px-6 md:px-10 py-5 pb-10 md:pb-5">
            <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              Traditional product pages tell. Interactive experiences sell. I built two core product demonstrations that let users actually feel the Smart Nation ecosystem right in their browser.
            </p>
          </div>
          {/* Toggle — centered on the bottom border line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-10">
            <div style={{ background: 'linear-gradient(160deg,#e8e8e8 0%,#c8c8c8 20%,#d8d8d8 40%,#b0b0b0 60%,#d0d0d0 80%,#e4e4e4 100%)', borderRadius: '999px', padding: '5px', boxShadow: '0 6px 20px rgba(0,0,0,0.35),0 2px 6px rgba(0,0,0,0.25),inset 0 1px 1px rgba(255,255,255,0.9),inset 0 -1px 1px rgba(0,0,0,0.15)', border: '1px solid rgba(90,90,90,0.35)' }}>
              <div className="relative flex items-center" style={{ background: 'linear-gradient(180deg,#787878 0%,#929292 50%,#888888 100%)', borderRadius: '999px', boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.55),inset 0 1px 3px rgba(0,0,0,0.4),inset 0 -1px 2px rgba(255,255,255,0.08)', padding: '4px' }}>
                <div className="absolute transition-all duration-300 ease-in-out" style={{ top: '4px', bottom: '4px', width: 'calc(50% - 4px)', left: activeDemo === 'switch' ? '4px' : 'calc(50%)', borderRadius: '999px', background: 'linear-gradient(160deg,#f8f8f8 0%,#e0e0e0 30%,#f2f2f2 55%,#c8c8c8 80%,#dedede 100%)', boxShadow: '0 3px 8px rgba(0,0,0,0.45),0 1px 3px rgba(0,0,0,0.3),inset 0 1px 2px rgba(255,255,255,1),inset 0 -1px 2px rgba(0,0,0,0.1)', border: '1px solid rgba(100,100,100,0.2)' }} />
                <button onClick={() => setActiveDemo('switch')} className="relative z-10 flex-1 whitespace-nowrap transition-all duration-300" style={{ fontFamily: 'FunnelDisplay, sans-serif', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 20px', color: activeDemo === 'switch' ? '#1a1a1a' : 'rgba(230,230,230,0.9)', textShadow: activeDemo === 'switch' ? '0 1px 0 rgba(255,255,255,0.7)' : '0 1px 2px rgba(0,0,0,0.4)', fontWeight: activeDemo === 'switch' ? '600' : '500' }}>Smart Switch</button>
                <button onClick={() => setActiveDemo('mcb')} className="relative z-10 flex-1 whitespace-nowrap transition-all duration-300" style={{ fontFamily: 'FunnelDisplay, sans-serif', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '8px 20px', color: activeDemo === 'mcb' ? '#1a1a1a' : 'rgba(230,230,230,0.9)', textShadow: activeDemo === 'mcb' ? '0 1px 0 rgba(255,255,255,0.7)' : '0 1px 2px rgba(0,0,0,0.4)', fontWeight: activeDemo === 'mcb' ? '600' : '500' }}>Smart MCB</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Abhiyantrik · Interactive Demo (full-width within box) ── */}
        <div className="border-b border-gray-200">
          <div className="flex justify-center py-12 px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full">
              <div className="flex-1 w-full order-1 md:order-1 flex flex-col gap-3">
                {activeDemo === 'switch' ? (
                  <>
                    <p className="text-center text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Click any switch to toggle</p>
                    <SmartTouchSwitchBoard switchState={switchState} onSwitchToggle={toggleSwitch} fanSpeed={fanSpeed} onFanSpeedChange={handleFanSpeedChange} />
                  </>
                ) : (
                  <>
                    <p className="text-center text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Click the MCB to toggle power</p>
                    <SmartMCB mcbState={mcbState} onMCBToggle={toggleMCB} />
                  </>
                )}
              </div>
              <div className="shrink-0 order-2 md:order-2 flex flex-col gap-3 items-center">
                <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg>
                  Synced mobile app
                </p>
                <PhoneShell activeScreen={activeDemo} onNavigateTo={(screen) => setActiveDemo(screen)} devices={mobileDevices} toggleDevice={(id) => toggleSwitch(id as keyof SwitchState)} fanSpeed={fanSpeed} toggleAllDevices={toggleAllDevices} mcbState={mcbState.mcb} toggleMCB={toggleMCB} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Abhiyantrik · 04 · 3D Product Mockups ──────────────────── */}
        <div id="aby-04" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>04</span>
            <h2 className="text-2xl md:text-3xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>3D Product Mockups</h2>
            <Plus h="left" /><Plus h="right" />
          </div>
          <div className="flex flex-col">
            <div
              ref={sliderRef}
              className="relative w-full overflow-hidden cursor-pointer select-none touch-none border-t border-b border-gray-200 aspect-video"
              onMouseDown={() => setIsDragging(true)} onMouseUp={() => setIsDragging(false)}
              onMouseMove={(e) => { if (isDragging) handleSliderMove(e.clientX); }}
              onMouseLeave={() => setIsDragging(false)}
              onClick={(e) => handleSliderMove(e.clientX)}
              onTouchStart={(e) => { setIsDragging(true); e.preventDefault(); }}
              onTouchEnd={() => setIsDragging(false)}
              onTouchMove={(e) => { if (isDragging && e.touches.length > 0) { handleSliderMove(e.touches[0].clientX); e.preventDefault(); } }}
            >
              <div className="absolute inset-0">
                <Image src="/images/WorkImages/abhiyantrikImages/product-raw.png" alt="Product Raw" width={1000} height={600} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
                <Image src="/images/WorkImages/abhiyantrikImages/product-render.png" alt="Product Rendered" width={1000} height={600} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-0 bottom-0 w-px bg-white shadow-lg cursor-ew-resize" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white border border-gray-200 rounded-full shadow flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2"><path d="M9 18l-6-6 6-6M15 6l6 6-6 6"/></svg>
                </div>
              </div>
              <span className="absolute bottom-3 left-4 text-[9px] uppercase tracking-widest text-white border border-white px-2 py-0.5" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Rendered</span>
              <span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-widest text-white border border-white px-2 py-0.5" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Raw</span>
            </div>
          </div>
          <Plus h="left" /><Plus h="right" />
        </div>

        {/* ── 09 · From the Team ─────────────────────────────────────── */}
        <div id="sn-09" className="relative overflow-visible border-b border-gray-200">
          <div className="relative overflow-visible px-6 md:px-10 py-6 border-b border-gray-200 flex items-baseline gap-4">
            <span className="text-[10px] uppercase tracking-widest text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>09</span>
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
                quote: "The early prototype gave me a clear picture of the app architecture before I wrote a single line. Combined with a complete design system, the initial development moved faster than any project I've worked on.",
                name: 'App Developer',
                role: 'Abhiyantrik Solutions',
              },
              {
                quote: "Brainstorming with Satish in the early stages pushed the product to a different level. We mapped out features we didn't even think were possible at the start, and most of them made it in.",
                name: 'Hardware Engineer',
                role: 'Abhiyantrik Solutions',
              },
            ].map((t, i) => (
              <div key={i} className="px-6 md:px-10 py-10 md:border-r border-gray-200 last:border-r-0 border-b md:border-b-0 border-gray-200 flex flex-col justify-between gap-6">
                <p className="text-base md:text-lg font-light leading-relaxed text-gray-700" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-xs text-gray-700" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{t.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{t.role}</p>
                </div>
              </div>
            ))}

            <Plus h="left" />
            <Plus h="right" />
          </div>
        </div>



      </div>

      {/* ── Let's Talk CTA — outside project box ────────────────────── */}
      <div className="max-w-5xl mx-auto mt-10 mb-16 border border-gray-200 px-6 md:px-10 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-visible">
        <Plus h="left" v="top" />
        <Plus h="right" v="top" />
        <Plus h="left" />
        <Plus h="right" />
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Let's Work Together</p>
          <Image src="/images/common/sa26.svg" alt="Satish" width={56} height={56} className="w-12 h-12 mb-4" />
          <h3 className="text-3xl md:text-4xl font-light text-gray-900 leading-snug" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
            Great products happen<br />when the right people meet.
          </h3>
          <p className="text-sm text-gray-400 mt-3 max-w-md" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
            If you're building something and need a designer who goes all in, let's talk.
          </p>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          <button
            onClick={() => handleCopy('email', 'satishdezn@gmail.com')}
            className="w-full flex items-center gap-3 px-5 py-3 border border-gray-900 text-gray-900 text-xs tracking-wide hover:bg-gray-900 hover:text-white transition-colors duration-200"
            style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
            {copied === 'email' ? 'Copied!' : 'satishdezn@gmail.com'}
          </button>
          <button
            onClick={() => handleCopy('phone', '+918722519704')}
            className="w-full flex items-center gap-3 px-5 py-3 border border-gray-200 text-gray-500 text-xs tracking-wide hover:border-gray-400 hover:text-gray-700 transition-colors duration-200"
            style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.44 2 2 0 0 1 3.57 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            {copied === 'phone' ? 'Copied!' : '+91 87225 19704'}
          </button>
          <a
            href="https://www.linkedin.com/in/satish-hebbal/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-3 px-5 py-3 border border-gray-200 text-gray-500 text-xs tracking-wide hover:border-gray-400 hover:text-gray-700 transition-colors duration-200"
            style={{ fontFamily: 'FunnelDisplay, sans-serif' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default SmartNation;
