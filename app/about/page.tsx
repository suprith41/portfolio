"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Github } from "lucide-react";
import VariableProximity from "../components/layout/VariableProximity";
import TiltedCard from "../components/layout/TiltedCard";
import StarBorder from "../components/layout/StarBorder";

export default function About() {
  const [copied, setCopied] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('suprithraoj@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-12" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* ── Logo removed by request ───────────────────────────── */}

        {/* ── Section 1: intro + photo ─────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16 mb-10">
          <div className="flex-1 order-2 md:order-1">
            <p
              className="text-2xl md:text-3xl leading-snug text-gray-800 mb-6"
              style={{ fontFamily: "SuprithSans, serif", fontWeight: 400 }}
            >
              I work with early-stage teams and see things through from the problem to the decisions to what actually ships.
            </p>
            <p className="text-base text-gray-500 leading-relaxed">
              I&apos;m Suprith. I build things not because it looks good on a resume or makes for a great story, but because I genuinely cannot stop. There was no big moment, no defining realization. I just started one day and somewhere along the way it became the only thing I do outside of everything else I&apos;m supposed to be doing. I&apos;m not athletic. I don&apos;t have hobbies that make me sound interesting. Building is just what I keep coming back to. What I want is pretty simple to be part of an early-stage team where the work is real, the stakes actually matter, and the room is small enough that every person in it has to show up. Not a role. Not a title. The whole thing.
            </p>
          </div>

          <div
            className="flex-shrink-0 flex justify-center md:justify-end md:pt-4 order-1 md:order-2"
            style={{ position: "relative" }}
          >
            <TiltedCard
              imageSrc="/images/HomeImages/WhatsApp%20Image%202026-05-07%20at%2015.12.34%202.jpeg"
              altText="Suprith"
              captionText="Suprith Rao"
              containerHeight="320px"
              containerWidth="260px"
              imageHeight="320px"
              imageWidth="260px"
              rotateAmplitude={12}
              scaleOnHover={1.08}
              showMobileWarning={false}
              showTooltip={true}
            />
          </div>
        </div>

        {/* ── Toolkit ──────────────────────────────────────────── */}
        <div className="mb-20">
          <p
            className="text-xl md:text-2xl text-gray-700 leading-snug mb-2"
            style={{ fontFamily: "SuprithSans, serif", fontWeight: 400 }}
          >
            My Toolkit
          </p>
          <p className="text-sm text-gray-400 mb-10" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
            Tools I use to design, build, and ship every day.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

            {/* Design & Animations */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>Design & Animations</p>
              <div className="flex flex-col gap-4">
                {[
                  { name: "Figma", src: "/images/ToolsIcons/figma-icon.svg" },
                  { name: "Photoshop", src: "/images/ToolsIcons/adobe-photoshop-icon.svg" },
                  { name: "After Effects", src: "/images/ToolsIcons/adobe-after-effects-icon.svg" },
                  { name: "Blender", src: "/images/ToolsIcons/blender-icon.svg" },
                  { name: "LottieFiles", src: "/images/ToolsIcons/lottiefiles.svg" },
                ].map((tool) => (
                  <div key={tool.name} className="flex items-center gap-3">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                      <Image src={tool.src} alt={tool.name} width={36} height={36} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-sm text-gray-700" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{tool.name}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>
                  + dozens of online tools
                </p>
              </div>
            </div>

            {/* Development + AI combined on mobile */}
            <div className="flex flex-col gap-10 md:contents">

              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>Development</p>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Cursor", src: "/images/ToolsIcons/cursor-ai-code-icon.svg" },
                    { name: "GitHub", src: "/images/ToolsIcons/github-icon.svg" },
                  ].map((tool) => (
                    <div key={tool.name} className="flex items-center gap-3">
                      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                        <Image src={tool.src} alt={tool.name} width={36} height={36} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-sm text-gray-700" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI & Assistive */}
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-5" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>AI & Assistive Tools</p>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "Claude Code", src: "/images/ToolsIcons/claude-ai-icon.svg" },
                    { name: "ChatGPT", src: "/images/ToolsIcons/chatgpt-icon.svg" },
                    { name: "Google Gemini", src: "/images/ToolsIcons/google-gemini-icon.svg" },
                  ].map((tool) => (
                    <div key={tool.name} className="flex items-center gap-3">
                      <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center">
                        <Image src={tool.src} alt={tool.name} width={36} height={36} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-sm text-gray-700" style={{ fontFamily: "FunnelDisplay, sans-serif" }}>{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>{/* closes mobile wrapper */}

          </div>
        </div>

        {/* ── GitHub contributions ────────────────────────────── */}
        <div className="mb-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p
                className="text-xl md:text-2xl text-gray-700 leading-snug mb-2 flex items-center gap-2.5"
                style={{ fontFamily: "SuprithSans, serif", fontWeight: 400 }}
              >
                <Github className="w-5 h-5 md:w-6 md:h-6 text-gray-700 flex-shrink-0" />
                GitHub Contributions
              </p>
            </div>
            <a
              href="https://github.com/suprith41"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex text-xs text-gray-400 hover:text-orange-500 transition-colors duration-200"
              style={{ fontFamily: "FunnelDisplay, sans-serif", letterSpacing: "0.08em" }}
            >
              View profile
            </a>
          </div>

          <a
            href="https://github.com/suprith41"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="w-full rounded-[28px] bg-transparent py-2">
              <img
                src="https://www.dailygreen.xyz/suprith41"
                alt="GitHub contribution chart for suprith41"
                className="h-auto w-full rounded-[20px]"
              />
            </div>
          </a>
        </div>

        {/* ── Closing CTA ──────────────────────────────────────── */}
        <div ref={ctaRef} className="text-center" style={{ position: "relative" }}>
          <p
            className="text-2xl md:text-3xl text-gray-700 leading-snug mb-8"
          >
            <VariableProximity
              label="If you're building something real with a team where everyone in the room matters - I'm the engineer who just needs a problem worth solving."
              fromFontVariationSettings="'wght' 400, 'opsz' 9"
              toFontVariationSettings="'wght' 900, 'opsz' 40"
              containerRef={ctaRef}
              radius={120}
              falloff="exponential"
              style={{ lineHeight: "inherit" }}
            />
          </p>
          <div className="flex justify-center">
            <StarBorder
              as="div"
              color="#F97316"
              speed="3.5s"
              thickness={2}
              className="merged-cta-border"
            >
              <a
                href="mailto:suprithraoj@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm text-gray-500 hover:text-orange-500 transition-all duration-200"
                style={{ fontFamily: "FunnelDisplay, sans-serif", letterSpacing: "0.05em", textDecoration: 'none' }}
              >
                say hey!
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <div
                className="flex items-center px-6 py-3 border-l border-gray-200 text-sm text-gray-400 select-all cursor-pointer"
                style={{ fontFamily: "FunnelDisplay, sans-serif", letterSpacing: "0.03em" }}
              >
                suprithraoj@gmail.com
                <button
                  onClick={handleCopy}
                  className="ml-2 text-gray-400 hover:text-gray-700 transition-colors duration-200 flex-shrink-0 cursor-pointer"
                  title="Copy email"
                >
                  {copied ? (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="5" y="5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M9 5V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg>
                  )}
                </button>
              </div>
            </StarBorder>
          </div>
        </div>

      </div>
    </div>
  );
}
