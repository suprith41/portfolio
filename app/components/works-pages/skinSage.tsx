"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

const ACCENT = '#8B7355'; // warm earthy tone — update once brand color confirmed

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
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] uppercase tracking-widest mb-2" style={{ fontFamily: 'FunnelDisplay, sans-serif', color: '#9ca3af' }}>
    {children}
  </p>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-light leading-snug text-black mb-4" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
    {children}
  </h2>
);

// Placeholder for images not yet provided
const ImgSlot = ({ label, aspect = 'aspect-video' }: { label: string; aspect?: string }) => (
  <div
    className={`w-full ${aspect} flex items-center justify-center`}
    style={{ background: '#F5F4F2', border: '1.5px dashed #D1CFC9' }}
  >
    <span className="text-xs tracking-widest uppercase text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
      {label}
    </span>
  </div>
);

export default function SkinSage() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('ss-brief');
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const sections = [
    { id: 'ss-brief',    label: 'Overview' },
    { id: 'ss-02',       label: 'Skin Assessment' },
    { id: 'ss-03',       label: 'Recommendations' },
    { id: 'ss-04',       label: 'Routine Builder' },
    { id: 'ss-05',       label: 'Landing Page' },
    { id: 'ss-ds',       label: 'Design System' },
  ];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
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

  useEffect(() => {
    const prev = document.documentElement.style.background;
    document.documentElement.style.background = 'white';
    document.body.style.background = 'white';
    return () => {
      document.documentElement.style.background = prev;
      document.body.style.background = '';
    };
  }, []);

  const stats = [
    { value: '2 Weeks', label: 'Turnaround', sub: 'From kickoff to V1 live' },
    { value: '4.8',     label: 'Rating',     sub: 'Average user rating on launch' },
    { value: '73%',     label: 'Retention',  sub: 'Users returned after day 7' },
  ];

  return (
    <div className="bg-white min-h-screen mt-16 px-4 md:px-0">

      {/* ── Sticky sidebar ──────────────────────────────────────────── */}
      {mounted && createPortal(
        <>
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
                    <span
                      className="shrink-0 flex items-center justify-center transition-all duration-300 relative z-10 bg-white"
                      style={{ width: '11px', height: '11px' }}
                    >
                      {isActive ? (
                        <span style={{ width: '7px', height: '7px', background: ACCENT, display: 'block' }} />
                      ) : (
                        <span
                          style={{ fontFamily: 'monospace', fontSize: '11px', lineHeight: 1, color: '#9ca3af', display: 'block' }}
                          className="group-hover:text-gray-500 transition-colors duration-200"
                        >+</span>
                      )}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-[0.15em] transition-all duration-200 whitespace-nowrap ${
                        isActive ? 'font-semibold' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                      style={isActive ? { color: ACCENT } : {}}
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

        {/* ── Project Header ──────────────────────────────────────────── */}
        <div className="relative overflow-visible flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-200 bg-white">
          {/* App icon placeholder — replace with actual SkinSage logo when ready */}
          <div
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden"
            style={{ background: ACCENT, borderRadius: '10px' }}
          >
            <span className="text-white text-xs font-semibold" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>SS</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-light tracking-tight" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
            SkinSage
          </h1>
          <Image src="/images/common/sa26.svg" alt="SA" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-20" />
          <Plus h="left" />
          <Plus h="right" />
        </div>

        {/* ── Brief ───────────────────────────────────────────────────── */}
        <div id="ss-brief" className="relative overflow-visible border-b border-gray-200">

          {/* Meta strip */}
          <div className="relative flex flex-wrap md:flex-nowrap items-stretch border-b border-gray-200">
            {[
              { label: 'Company',     value: 'SkinSage' },
              { label: 'Role',        value: 'Product Designer' },
              { label: 'Deliverable', value: 'Zero to V1' },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-6 md:px-8 py-3 ${i === 1 ? 'border-l border-gray-200' : ''} ${i === 2 ? 'w-full md:w-auto border-t md:border-t-0 md:border-l border-gray-200' : ''}`}
              >
                <span className="text-[9px] uppercase tracking-widest text-gray-400 shrink-0" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{item.label}</span>
                <span className="text-[11px] text-gray-700" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Brief content */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200">
            <div className="px-6 md:px-10 py-8 md:py-12">
              <SectionLabel>The Brief</SectionLabel>
              <SectionHeading>Your skin, understood. Your routine, built for you.</SectionHeading>
              <p className="text-sm text-gray-500 leading-relaxed mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                Most skincare advice is generic. SkinSage set out to change that by asking the right questions upfront and building a fully personalised routine from the answers. The brief was to design an experience that felt expert, not clinical, and personal, not overwhelming.
              </p>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                Scope covered the onboarding assessment, personalised product recommendations, routine tracker, and the public-facing landing page. The focus was on clarity and trust at every step.
              </p>
            </div>
            <div className="relative border-t md:border-t-0 md:border-l border-gray-200">
              <ImgSlot label="Hero / Cover Image" aspect="aspect-square" />
            </div>
          </div>

          {/* KPI strip */}
          <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200">
            {stats.map((s, i) => (
              <div
                key={s.label}
                onMouseEnter={() => setHoveredStat(s.label)}
                onMouseLeave={() => setHoveredStat(null)}
                className={`flex-1 min-w-[33%] px-6 md:px-8 py-5 flex flex-col gap-1 transition-colors duration-200 ${i > 0 ? 'border-l border-gray-200' : ''}`}
                style={{ background: hoveredStat === s.label ? ACCENT : 'transparent' }}
              >
                <span
                  className="text-xl md:text-2xl font-light transition-colors duration-200"
                  style={{ fontFamily: 'Garamond, Georgia, serif', color: hoveredStat === s.label ? 'white' : 'black' }}
                >
                  {s.value}
                </span>
                <span
                  className="text-[10px] uppercase tracking-widest transition-colors duration-200"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif', color: hoveredStat === s.label ? 'rgba(255,255,255,0.85)' : '#9ca3af' }}
                >
                  {s.label}
                </span>
                <span
                  className="text-[10px] transition-colors duration-200"
                  style={{ fontFamily: 'FunnelDisplay, sans-serif', color: hoveredStat === s.label ? 'rgba(255,255,255,0.7)' : '#c4c4c4' }}
                >
                  {s.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Skin Assessment / Onboarding ────────────────────────────── */}
        <div id="ss-02" className="relative border-b border-gray-200">
          <Plus h="left" v="top" />
          <Plus h="right" v="top" />

          <div className="px-6 md:px-10 pt-10 pb-6">
            <SectionLabel>Skin Assessment</SectionLabel>
            <SectionHeading>Know your skin before building your routine.</SectionHeading>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              The assessment guides users through a short series of questions covering skin type, concerns, lifestyle, and goals. Each step is designed to feel conversational, not clinical. The answers power everything downstream.
            </p>
          </div>

          {/* Full-width image */}
          <div className="mx-6 md:mx-10 mb-8">
            <ImgSlot label="Onboarding / Assessment Screens" aspect="aspect-video" />
          </div>

          {/* Two-up detail images */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
            <div className="border-b md:border-b-0 md:border-r border-gray-200 p-6 md:p-10">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Question flow</p>
              <ImgSlot label="Step-by-step question UI" aspect="aspect-[4/3]" />
            </div>
            <div className="p-6 md:p-10">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Progress & completion</p>
              <ImgSlot label="Assessment completion screen" aspect="aspect-[4/3]" />
            </div>
          </div>
        </div>

        {/* ── Personalised Recommendations ───────────────────────────── */}
        <div id="ss-03" className="relative border-b border-gray-200">
          <Plus h="left" v="top" />
          <Plus h="right" v="top" />

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="px-6 md:px-10 pt-10 pb-6 md:border-r border-gray-200">
              <SectionLabel>Recommendations</SectionLabel>
              <SectionHeading>Products matched to your skin, not a category.</SectionHeading>
              <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                Based on the assessment output, SkinSage surfaces a curated product list with clear reasoning for each pick. Users see not just what, but why. Trust is built through transparency, not just a recommendation.
              </p>
            </div>
            <div className="border-t md:border-t-0 md:border-l border-gray-200">
              <ImgSlot label="Recommendations Screen" aspect="aspect-square" />
            </div>
          </div>

          <div className="border-t border-gray-200 mx-6 md:mx-10 py-8">
            <ImgSlot label="Product Detail Card" aspect="aspect-[16/6]" />
          </div>
        </div>

        {/* ── Routine Builder ─────────────────────────────────────────── */}
        <div id="ss-04" className="relative border-b border-gray-200">
          <Plus h="left" v="top" />
          <Plus h="right" v="top" />

          <div className="px-6 md:px-10 pt-10 pb-6">
            <SectionLabel>Routine Builder</SectionLabel>
            <SectionHeading>Morning and night. Every step in the right order.</SectionHeading>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              Once products are selected, SkinSage arranges them into an AM and PM routine automatically. Users can swap products, mark steps as done, and track their streak over time.
            </p>
          </div>

          {/* Full-width image */}
          <div className="mx-6 md:mx-10 mb-6">
            <ImgSlot label="Routine Overview Screen" aspect="aspect-video" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gray-200">
            {['AM Routine', 'PM Routine', 'Streak Tracker'].map((label, i) => (
              <div key={label} className={`p-6 md:p-8 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-gray-200' : ''}`}>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>{label}</p>
                <ImgSlot label={`${label} UI`} aspect="aspect-[3/4]" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Landing Page ────────────────────────────────────────────── */}
        <div id="ss-05" className="relative border-b border-gray-200">
          <Plus h="left" v="top" />
          <Plus h="right" v="top" />

          <div className="px-6 md:px-10 pt-10 pb-6">
            <SectionLabel>Landing Page</SectionLabel>
            <SectionHeading>Where the first impression earns the first tap.</SectionHeading>
            <p className="text-sm text-gray-500 leading-relaxed max-w-2xl" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
              The marketing site leads with the product promise and converts visitors through clarity. Every section is built to reduce doubt and move the reader toward downloading the app.
            </p>
          </div>

          <div className="mx-0 md:mx-0 border-t border-gray-200">
            <ImgSlot label="Landing Page Full View" aspect="aspect-[4/5]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-200">
            <div className="p-6 md:p-10 md:border-r border-gray-200">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Above the fold</p>
              <ImgSlot label="Hero Section" aspect="aspect-[4/3]" />
            </div>
            <div className="border-t md:border-t-0 p-6 md:p-10">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-4" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Social proof</p>
              <ImgSlot label="Testimonials / Trust Section" aspect="aspect-[4/3]" />
            </div>
          </div>
        </div>

        {/* ── Design System ───────────────────────────────────────────── */}
        <div id="ss-ds" className="relative border-b border-gray-200">
          <Plus h="left" v="top" />
          <Plus h="right" v="top" />

          <div className="px-6 md:px-10 pt-10 pb-6">
            <SectionLabel>Design System</SectionLabel>
          </div>

          {/* Color */}
          <div className="px-6 md:px-10 pb-8">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Color</p>
            <div className="flex flex-wrap gap-3">
              {[
                { name: 'Warm Brown',   hex: '#8B7355' },
                { name: 'Blush',        hex: '#E8D5C4' },
                { name: 'Cream',        hex: '#F7F3EF' },
                { name: 'Slate',        hex: '#4A4A4A' },
                { name: 'Stone',        hex: '#9CA3A0' },
              ].map((c) => (
                <div
                  key={c.hex}
                  className="flex items-center gap-3 px-3 py-2"
                  style={{ background: '#F9F9F7', border: '1px solid #E5E7EB', borderRadius: '999px' }}
                >
                  <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: c.hex, display: 'block', flexShrink: 0 }} />
                  <span className="text-[11px] text-gray-500" style={{ fontFamily: 'monospace' }}>{c.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div className="px-6 md:px-10 pb-10 border-t border-gray-200 pt-8">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Type</p>
            <div
              className="px-6 py-5"
              style={{ background: '#F9F9F7', border: '1px solid #E5E7EB', borderRadius: '8px' }}
            >
              <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>Primary Typeface</p>
              <p className="text-2xl md:text-3xl font-light text-gray-700 mb-3" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>
                FunnelDisplay
              </p>
              <p className="text-sm text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif', letterSpacing: '0.12em' }}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ &nbsp;&nbsp; abcdefghijklmnopqrstuvwxyz &nbsp;&nbsp; 0123456789
              </p>
            </div>
          </div>

          {/* Design system full image slot */}
          <div className="border-t border-gray-200">
            <ImgSlot label="Design System Overview" aspect="aspect-video" />
          </div>
        </div>

        {/* ── Footer ──────────────────────────────────────────────────── */}
        <div className="relative px-6 md:px-10 py-8 flex items-center justify-between">
          <Plus h="left" v="top" />
          <Plus h="right" v="top" />
          <span className="text-xs text-gray-400" style={{ fontFamily: 'FunnelDisplay, sans-serif' }}>SkinSage — 2025</span>
          <Image src="/images/common/sa26.svg" alt="SA" width={32} height={32} className="object-contain opacity-10" />
        </div>

      </div>
    </div>
  );
}
