"use client";
import React, { useState } from 'react';
import Image from 'next/image'
import './heroAnimations.css'

const HeroSection = () => {
  const [showLogoText, setShowLogoText] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('satishdezn@gmail.com');
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch {
      // Fallback: open email client if clipboard fails
      window.location.href = 'mailto:satishdezn@gmail.com';
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-6">
      <div className="max-w-5xl mx-auto h-full">
        {/* Main Grid Container - Desktop: 2x2 grid, Mobile: 1 column */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-0 h-full min-h-[calc(100vh-8rem)] rounded-xl border border-gray-300">

          {/* Grid 1 - Introduction Text */}
          <div className="flex items-center justify-center rounded-t-xl md:rounded-tl-xl md:rounded-tr-none p-4 md:p-6 border-b border-gray-300 bg-zinc-50 md:border-r">
            <h1 className="text-2xl md:text-4xl leading-tight text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              <span className="text-gray-500">Hey,</span> I&apos;m{' '}
              <span className="text-black">Satish Hebbal</span>
              <br />
              <span className="text-gray-500">a</span>
              <Image
                src="/images/HomeImages/sa-silvery.png"
                alt="SA Silvery Icon"
                width={24}
                height={24}
                className="inline-block mx-2 align-middle wiggle-on-hover cursor-pointer md:w-8 md:h-8"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))',
                  marginTop: '-2px'
                }}
              />
              <span className="gradient-text">
                Product Designer
              </span>
              <br />
              <span className="text-gray-500">based in</span>{' '}
              <span className="text-black">Hubli, Karnataka.</span>
            </h1>
          </div>

          {/* Grid 2 - Logo */}
          <div className="flex items-center justify-center p-4 md:p-6 border-b border-gray-300">
            <div className="w-full h-20 md:h-28 relative">
              <Image
                src="/images/HomeImages/sa.svg"
                alt="SA Logo"
                width={200}
                height={112}
                className="w-full h-full object-contain cursor-pointer"
                onMouseEnter={() => setShowLogoText(true)}
                onMouseLeave={() => setShowLogoText(false)}
              />
            </div>
          </div>

          {/* Grid 3 - Profile Image */}
          <div className="flex flex-col justify-end items-center p-4 md:p-6 pb-0 md:pb-0 md:border-r md:border-b border-gray-300">
            <p className={`text-xs text-gray-400 text-center align-text-top leading-relaxed mb-4 md:mb-6 transition-opacity duration-300 ease-in-out ${showLogoText ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
              <q>
                A minimal symbol of the <span className="bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">Kannada</span> letter &apos;ಸ&apos; (Sã), rooted in tradition.
              </q>
            </p>
            <div className="w-60 h-72 md:w-80 md:h-96 rounded-lg relative">
              <Image
                src="/images/HomeImages/myImage.png"
                alt="Satish Hebbal"
                width={320}
                height={384}
                className="w-full h-full object-contain object-top"
                priority
              />
            </div>
          </div>

          {/* Grid 4 - Description and Let's Connect */}
          <div className="flex items-center justify-center p-6 md:p-10 rounded-b-xl md:rounded-br-xl bg-zinc-50 border-t md:border-t-0 border-gray-300">
            <div className="max-w-md flex flex-col items-center text-center justify-between h-full">

              {/* Description Text */}
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-4 text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                <q>Over time, I&apos;ve grown into a designer who cares deeply about how things feel, not just how they look. I thrive in crafting intuitive,
                  functional experiences across apps and digital products — always chasing that sweet spot between clarity and emotion.</q>
              </p>

              {/* Let's Connect Section */}
              <div className="w-full">
                <h3 className="text-lg font-medium text-gray-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                  Let&apos;s Connect
                </h3>
                <button
                  onClick={handleEmailClick}
                  className="inline-block bg-zinc-100 border border-gray-300 rounded-2xl px-4 md:px-6 py-3 hover:bg-gray-100 transition-colors duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-zinc-400 group-hover:text-zinc-500 transition-colors"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span className="text-zinc-400 font-medium group-hover:text-zinc-500 transition-colors text-sm md:text-base" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                      satishdezn@gmail.com
                    </span>
                  </div>
                </button>

                {/* Copied notification */}
                <div className={`mt-2 transition-opacity duration-300 ${showCopied ? 'opacity-100' : 'opacity-0'}`}>
                  <p className="text-gray-400 text-xs" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    copied
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;