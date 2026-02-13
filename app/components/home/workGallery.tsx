"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './workGallery.css';

const WorkGallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const gallery = galleryRef.current;
    const wrapper = wrapperRef.current;

    if (!gallery || !wrapper || isMobile) return; // Skip mouse interaction on mobile

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const percent = mouseX / window.innerWidth; // from 0 (left) to 1 (right)
      const maxScroll = gallery.scrollWidth - wrapper.offsetWidth;
      const targetScrollX = maxScroll * percent;

      // Move right = scroll left (negative direction)
      // Start from 0 (left position) when mouse is at left edge
      setScrollX(-targetScrollX);
    };

    // Add event listener to the whole window for full screen interaction
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className="bg-[#f5f5f5] mt-8 md:mt-0">
      {/* Works Title */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-4xl md:text-6xl font-light text-black" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
          Works
        </h2>
      </div>

      {/* Full Width Gallery Container */}
      <div 
        ref={wrapperRef}
        className={`gallery-wrapper relative w-full ${
          isMobile ? 'overflow-x-auto overflow-y-hidden' : 'overflow-hidden'
        }`}
        style={{ height: isMobile ? '500px' : '700px' }}
      >
        <div 
          ref={galleryRef}
          className={`gallery flex items-start gap-12 md:gap-18 h-full ${
            isMobile ? 'pl-6 pt-4' : 'justify-center pl-16 pt-8'
          }`}
          style={{ 
            width: isMobile ? 'max-content' : 'max-content',
            transform: isMobile ? 'none' : `translateX(${scrollX}px)`,
            transition: isMobile ? 'none' : 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
        >
          {/* Text Info */}
          <div className="flex-shrink-0" style={{ width: isMobile ? '180px' : '320px' }}>
            <p
              className={`text-gray-300 ${isMobile ? 'text-2xl' : 'text-4xl'} leading-relaxed`}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}
            >
              <span className="text-orange-300">constantly</span>{' '}
              chasing that perfect{' '}
              <span className="text-orange-300">balance</span> between{' '}
              <span className="text-orange-300">form</span> and{' '}
              <span className="text-orange-300">function</span>,{' '}
              <span className="text-orange-300">one interface at a time.</span>
            </p>
          </div>

          {/* Frame 1 - Smart Nation */}
          <div className="flex-shrink-0">
            <Link href="/works/smartNation" className="block">
              <figure className={`cursor-pointer ${isMobile ? 'mobile-frame' : 'picture-frame'}`}>
                <div className="frame-content">
                  <Image
                    src="/images/HomeImages/smartNation-frame.png"
                    alt="Smart Nation Project"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-sm"
                  />
                  <span>Smart Nation</span>
                </div>
              </figure>
            </Link>
            <div className="mt-4 px-2" style={{ width: '280px' }}>
              <p className="text-gray-600 text-sm leading-relaxed" 
                 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                Worked on product brand creation, app design, animations and graphics
              </p>
            </div>
          </div>

          {/* Frame 2 - Abhiyantrik Website */}
          <div className="flex-shrink-0">
            <Link href="/works/abhiyantrikWebsite" className="block">
              <figure className={`cursor-pointer ${isMobile ? 'mobile-frame' : 'picture-frame'}`}>
                <div className="frame-content">
                  <Image
                    src="/images/HomeImages/abhiyantrik-frame.png"
                    alt="Abhiyantrik Website Project"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-sm"
                  />
                  <span>Abhiyantrik Website</span>
                </div>
              </figure>
            </Link>
            <div className="mt-4 px-2" style={{ width: '280px' }}>
              <p className="text-gray-600 text-sm leading-relaxed" 
                 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                Designed and developed a new company website with product experience deck
              </p>
            </div>
          </div>

          {/* Frame 3 - Project 3 (Coming Soon) */}
          <div className="flex-shrink-0">
            <figure className={`cursor-not-allowed ${isMobile ? 'mobile-frame' : 'picture-frame'}`}>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-white text-lg md:text-xl font-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Posting soon!
                  </span>
                </div>
              <div className="frame-content relative">
                <Image
                  src="/images/HomeImages/wagwan-frame.png"
                  alt="Project 3 Coming Soon"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-sm"
                />
                <div className="absolute inset-0 bg-transparent bg-opacity-30 backdrop-blur-md rounded-sm"></div>
              </div>
            </figure>
            <div className="mt-4 px-2" style={{ width: '280px' }}>
              <p className="text-gray-400 text-sm leading-relaxed" 
                 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                Coming soon
              </p>
            </div>
          </div>

          {/* Frame 4 - Project 4 (Coming Soon) */}
          <div className="flex-shrink-0">
            <figure className={`cursor-not-allowed ${isMobile ? 'mobile-frame' : 'picture-frame'}`}>
              <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-white text-lg md:text-xl font-md" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    cooking
                  </span>
                </div>
              <div className="frame-content relative">
                <Image
                  src="/images/HomeImages/wagwan-events-frame.png"
                  alt="Project 4 Coming Soon"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-sm"
                />
                <div className="absolute inset-0 bg-transparent bg-opacity-30 backdrop-blur-md rounded-sm"></div>
               
              </div>
            </figure>
            <div className="mt-4 px-2" style={{ width: '280px' }}>
              <p className="text-gray-400 text-sm leading-relaxed" 
                 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                Coming soon
              </p>
            </div>
          </div>

          {/* Extra spacing at the end */}
          <div style={{ width: isMobile ? '20px' : '100px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default WorkGallery;