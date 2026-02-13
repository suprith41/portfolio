"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image'

const AbhiyantrikWebsite = () => {
  // State for image comparison slider
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Enhanced slider movement handler that works for both mouse and touch
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // Mouse event handlers
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      handleSliderMove(e.clientX);
    }
  };

  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleSliderMove(e.clientX);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    // Prevent scrolling while dragging
    e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging && e.touches.length > 0) {
      handleSliderMove(e.touches[0].clientX);
      // Prevent scrolling while dragging
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] mt-16 md:mt-16 px-4 md:px-0">
      {/* Main Container with Grid Lines */}
      <div className="max-w-6xl mx-auto rounded-t-lg border-l border-r border-t border-gray-300 h-full">
        
        {/* Header Section */}
        <div className="border-gray-300">
          {/* Top Header with Logo and Title */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b bg-zinc-50 rounded-t-lg border-gray-300">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-between">
              <Image 
                src="/images/WorkImages/abhiyantrikImages/abhiyantrik-logo.png" 
                alt="Abhiyantrik Logo" 
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-5xl font-light" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                Abhiyantrik
              </h1>
            </div>
            
            <div className="w-10 h-10 md:w-12 md:h-12 flex opacity-25 items-center justify-center">
              <Image 
                src="/images/WorkImages/smartNationImages/sa-header-logo.svg" 
                alt="SA Logo" 
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
          </div> 
        </div>

        {/* Hero Image */}
        <div className="flex w-full align-top justify-center">
          <div className="max-w-full">
            <Image 
              src="/images/WorkImages/abhiyantrikImages/websiteMockup.png" 
              alt="Abhiyantrik Website Mockup" 
              width={1200}
              height={800}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Landing Page Section */}
        <div className="border-b border-gray-300">
          {/* Two Column Layout - Mobile: Single column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-4 md:pl-12 pt-8 md:pt-12">
            {/* Left Column - Text */}
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-8 text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                landing page
              </h2>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-4 md:mb-6 text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                I designed and developed <strong>Abhiyantrik Solutions</strong> complete website experience—from initial sketches to a fully interactive platform. The site showcases Smart Nation&apos;s innovative home automation products through immersive product demonstrations, allowing visitors to experience the technology before they buy.
              </p>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                Visit the website : <a href="https://www.abhiyantriksolutions.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://www.abhiyantriksolutions.in/</a>
              </p>
            </div>
            {/* Right Column - Image */}
            <div className="flex items-center align-baseline justify-center">
              <Image 
                src="/images/WorkImages/abhiyantrikImages/poster1.png" 
                alt="Abhiyantrik Poster" 
                width={350}
                height={440}
                className="max-h-[400px] md:max-h-[500px] object-contain rounded-t-xl"
              />
            </div>
          </div>
        </div>

        {/* Flow Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h2 className="text-3xl md:text-5xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Flow
            </h2>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 py-8 md:py-16">
            {/* Flow Image */}
            <div className="flex items-center justify-center mb-8 md:mb-12">
              <Image 
                src="/images/WorkImages/abhiyantrikImages/flow.png" 
                alt="Development Flow" 
                width={1400}
                height={600}
                className="w-full h-auto max-w-full md:max-w-5xl"
              />
            </div>

            {/* Description */}
            <div className="px-0 md:px-8 pt-6 md:pt-12">
              <h3 className="text-xl md:text-2xl font-light mb-4 md:mb-6 text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                From Concept to Code with AI
              </h3>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                My development process: Raw sketch → Figma → Next.js/React → Claude AI integration. I leveraged Claude AI to accelerate development, using it for code optimization, interactive features, and seamless product demonstrations. This AI-assisted approach enabled rapid prototyping and allowed me to focus on crafting the perfect user experience.
              </p>
            </div>
          </div>
        </div>

        {/* Product Experience Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h2 className="text-3xl md:text-5xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Product Experience
            </h2>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 pb-8 md:pb-16">
            {/* Introduction */}
            <div className="mb-8 md:mb-16 mt-6 md:mt-8">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                Why Interactive Demos Matter? Traditional product pages tell—interactive experiences sell. I built two core product demonstrations that let users actually feel the Smart Nation ecosystem
              </p>
            </div>

            {/* Smart Touch Switch Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-8 md:mb-16">
              {/* Left Column - Text */}
              <div className="order-2 md:order-1">
                <h4 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                  Smart Touch Switch Experience
                </h4>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                  Click any switch to see real-time synchronization between the physical panel and mobile app. Users experience the seamless control that makes Smart Nation special—right from their browser.
                </p>
              </div>
              {/* Right Column - Video */}
              <div className="flex items-center justify-center order-1 md:order-2">
                <video 
                  className="w-full h-auto rounded-md border border-zinc-300 max-w-sm md:max-w-none"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/images/WorkImages/abhiyantrikImages/touchSwitch-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Smart MCB Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Column - Video */}
              <div className="flex items-center justify-center order-1">
                <video 
                  className="w-full h-auto rounded-md border border-zinc-300 max-w-sm md:max-w-none"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/images/WorkImages/abhiyantrikImages/MCB-demo.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              {/* Right Column - Text */}
              <div className="order-2">
                <h4 className="text-lg md:text-xl font-medium mb-3 md:mb-4 text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                  Smart MCB Experience
                </h4>
                <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                  Toggle the MCB to witness the synchronized app response. This demo showcases the reliability and instant feedback that Smart Nation&apos;s electrical solutions provide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Product Mockup Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h2 className="text-3xl md:text-5xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              3D Product Mockup
            </h2>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 py-6 md:py-8">
            {/* Description */}
            <div className="mb-8 md:mb-12 text-center">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                I used Blender to create realistic 3D product mockups for the website
              </p>
            </div>

            {/* Image Comparison Slider */}
            <div className="rounded-md overflow-hidden">
              <div 
                ref={sliderRef}
                className="relative w-full h-60 md:h-150 bg-white rounded-lg overflow-hidden cursor-pointer select-none touch-none"
                // Mouse events
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setIsDragging(false)}
                onClick={handleMouseClick}
                // Touch events for mobile
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
              >
                {/* Before Image (Raw) */}
                <div className="absolute rounded-md inset-0">
                  <Image 
                    src="/images/WorkImages/abhiyantrikImages/product-raw.png" 
                    alt="Product Raw" 
                    width={1000}
                    height={600}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>

                {/* After Image (Rendered) */}
                <div 
                  className="absolute rounded-md inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <Image 
                    src="/images/WorkImages/abhiyantrikImages/product-render.png" 
                    alt="Product Rendered" 
                    width={1000}
                    height={600}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>

                {/* Slider Handle */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-gray-400 rounded-full bg-white"></div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-center mt-6 md:mt-8">
                <p className="text-gray-300 text-xs md:text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Drag the slider to compare raw and rendered images
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Collab Section (Footer) */}
        <div className="rounded-b-lg">
          {/* Content Layout */}
          <div className="px-4 md:px-6 py-8 md:py-16">
            {/* Two Column Layout - Mobile: Single column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Column - Text Content */}
              <div className="order-2 md:order-1 text-center md:text-left">
                <h3 className="text-3xl md:text-5xl font-light mb-6 md:mb-8" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                  Ready to Collab?
                </h3>
                
                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    Currently working at Abhiyantrik Solutions.
                  </p>
                  <p className="text-gray-500 text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    Always open to exciting projects, collaborations, and connecting with creative minds.
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <p className="text-black text-base md:text-lg font-medium" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                    satishdezn@gmail.com
                  </p>
                  <p className="text-black text-base md:text-lg font-medium" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '500' }}>
                    +91 8722519704
                  </p>
                </div>
              </div>

              {/* Right Column - Footer Logo */}
              <div className="flex items-center justify-center order-1 md:order-2 relative">
                <Image 
                  src="/images/WorkImages/smartNationImages/sa-footer-logo.svg" 
                  alt="SA Footer Logo" 
                  width={250}
                  height={250}
                  className="w-60 h-60 md:w-80 md:h-80 opacity-15"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>           
  );
};

export default AbhiyantrikWebsite;