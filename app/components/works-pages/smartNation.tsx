"use client";

import React, { useState } from 'react';
import Image from 'next/image'

const SmartNation = () => {
  // App icons data with corresponding mockups
  const appIcons = [
    { 
      name: 'Beta', 
      src: '/images/WorkImages/smartNationImages/app-occations/beta.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/beta-mockup.png'
    },
    { 
      name: 'Default', 
      src: '/images/WorkImages/smartNationImages/app-occations/default.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/default-mockup.png'
    },
    { 
      name: 'V2', 
      src: '/images/WorkImages/smartNationImages/app-occations/v2.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/V2-mockup.png'
    },
    { 
      name: 'National Festival', 
      src: '/images/WorkImages/smartNationImages/app-occations/national-fest.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/national-fest-mockup.png'
    },
    { 
      name: 'Product Launch', 
      src: '/images/WorkImages/smartNationImages/app-occations/product-launch.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/product-launch-mockup.png'
    },
    { 
      name: 'Deepawali', 
      src: '/images/WorkImages/smartNationImages/app-occations/deepawali.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/deepawali-mockup.png'
    },
    { 
      name: 'Save Energy', 
      src: '/images/WorkImages/smartNationImages/app-occations/save-energy.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/save-energy-mockup.png'
    },
    { 
      name: 'Christmas', 
      src: '/images/WorkImages/smartNationImages/app-occations/crismas.png',
      mockup: '/images/WorkImages/smartNationImages/mobileMockUP/crismas-mockup.png'
    }
  ];

  // State for selected icon
  const [selectedIcon, setSelectedIcon] = useState(appIcons[1]); // Default to 'Default' icon

  return (
    <div className="min-h-screen bg-[#f5f5f5] mt-16 md:mt-16 px-4 md:px-0">
      {/* Main Container with Grid Lines */}
      <div className="max-w-6xl mx-auto rounded-t-lg md:rounded-t-lg border-l border-r border-t border-gray-300 h-full">
        
        {/* Header Section */}
        <div className="pb-6 md:pb-8 border-b border-gray-300">
          {/* Top Header with Logo and Title */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b bg-zinc-50 rounded-t-lg border-gray-300">
            <div className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-between">
              <Image 
                src="/images/WorkImages/smartNationImages/sn-header-logo.png" 
                alt="Smart Nation Logo" 
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="text-center flex-1">
              <h1 className="text-3xl md:text-5xl font-light" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
                Smart Nation
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
          
          {/* Two Column Layout - Mobile: Single column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 px-4 md:px-6 py-8 md:py-16">
            {/* Left Column - Text */}
            <div className="md:pr-8 mb-6 md:mb-0">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                At Abiyantrik Solutions, I led the end-to-end design for Smart Nation, a home automation brand offering smart touch switches and smart MCBs. I worked across product branding, UI/UX design, and visual design—designing the complete mobile app experience along with custom icons, illustrations, micro-animations, and motion graphics. I also completely redesigned and developed the company&apos;s website using React and Next.js (thanks to AI), aligning it with the brand&apos;s modern and connected identity. Every element was crafted to reflect Smart Nation&apos;s vision of enabling a seamless and modern smart living experience.
              </p>
            </div>
            {/* Right Column - Video */}
            <div className="md:pl-8 flex items-center justify-center">
              <video 
                className="w-full h-auto max-w-sm md:max-w-md"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/images/WorkImages/smartNationImages/smart-nation-animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* App UI/UX Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h2 className="text-3xl md:text-4xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              App UI/UX
            </h2>
          </div>

          {/* App Mockup with Grid Background */}
          <div 
            className="px-4 md:px-6 py-8 md:py-16 flex items-center justify-center grid-bg-mobile" 
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, .05) .1em, transparent .1em), linear-gradient(90deg, rgba(0, 0, 0, .05) .1em, transparent .1em)',
              // backgroundSize: window.innerWidth >= 768 ? '3em 3em' : '2em 2em',
              // backgroundPosition: window.innerWidth >= 768 ? '1.5em 1.5em' : '1em 1em'
            }}
          >
            <div className="max-w-full md:max-w-4xl">
              <Image 
                src="/images/WorkImages/smartNationImages/AppMockups-3screens.png" 
                alt="Smart Nation App Mockups" 
                width={1200}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Switch States Section */}
          <div className="px-4 md:px-6 py-6 md:py-8 bg-white border-t border-gray-300">
            {/* Horizontal Layout - Description and Switch States */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              {/* Left Side - Description */}
              <div className="flex-shrink-0 max-w-lg">
                <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                  Switch states reflect device status—On is bold and active, Off is minimal, and Offline signals disconnection with alert cues.
                </p>
              </div>

              {/* Right Side - Switch States Grid */}
              <div className="flex gap-4 md:gap-8">
                {/* On State */}
                <div className="text-center">
                  <div className="mb-3 md:mb-4">
                    <Image 
                      src="/images/WorkImages/smartNationImages/switchOn.png" 
                      alt="Switch On State" 
                      width={128}
                      height={128}
                      className="h-16 md:h-24 mx-auto object-contain"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    On state
                  </p>
                </div>

                {/* Off State */}
                <div className="text-center">
                  <div className="mb-3 md:mb-4">
                    <Image 
                      src="/images/WorkImages/smartNationImages/switchOff.png" 
                      alt="Switch Off State" 
                      width={128}
                      height={128}
                      className="h-16 md:h-24 mx-auto object-contain"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    Off state
                  </p>
                </div>

                {/* Offline State */}
                <div className="text-center">
                  <div className="mb-3 md:mb-4">
                    <Image 
                      src="/images/WorkImages/smartNationImages/switchOffline.png" 
                      alt="Switch Offline State" 
                      width={128}
                      height={128}
                      className="h-16 md:h-24 mx-auto object-contain"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-gray-600" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    Offline state
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adding Appliance Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h3 className="text-2xl md:text-3xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Adding Appliance
            </h3>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 py-8 md:py-16">
            {/* Description */}
            <div className="mb-8 md:mb-12">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-4xl text-center md:text-left mx-auto md:mx-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                A simple interface to add appliances by selecting a configured switchboard (SWB), choosing a switch module, assigning an icon and name, and instantly controlling them from the dashboard.
              </p>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center">
              <Image 
                src="/images/WorkImages/smartNationImages/AddApp.png" 
                alt="Adding Appliance Flow" 
                width={1400}
                height={800}
                className="w-full h-auto max-w-full md:max-w-5xl"
              />
            </div>
          </div>
        </div>

        {/* Device Provisioning Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h3 className="text-2xl md:text-3xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Device Provisioning
            </h3>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 py-8 md:py-16">
            {/* Description */}
            <div className="mb-8 md:mb-12">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-4xl text-center md:text-left mx-auto md:mx-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                A seamless UX for configuring Smart Switchboards—select, discover, connect to Wi-Fi, assign, and save effortlessly.
              </p>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center">
              <Image 
                src="/images/WorkImages/smartNationImages/deviceProv.png" 
                alt="Device Provisioning Flow" 
                width={1400}
                height={800}
                className="w-full h-auto max-w-full md:max-w-5xl"
              />
            </div>
          </div>
        </div>

        {/* Automation Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h3 className="text-2xl md:text-3xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Automation
            </h3>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 pt-8 md:pt-16">
            {/* Description */}
            <div className="mb-8 md:mb-12">
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-4xl text-center md:text-left mx-auto md:mx-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                Automate your appliances with ease using Routine and Timer modes. Set fixed schedules to turn appliances on or off at specific times on selected days, or use countdown timers for temporary control — all from a clean, intuitive interface.
              </p>
            </div>

            {/* Image */}
            <div className="flex items-center  justify-center">
              <Image 
                src="/images/WorkImages/smartNationImages/automation.png" 
                alt="Automation Features" 
                width={1400}
                height={800}
                className="w-full h-auto max-w-full md:max-w-5xl"
              />
            </div>
          </div>
        </div>

        {/* Appliance Icons Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h3 className="text-2xl md:text-3xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Appliance Icons
            </h3>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 py-8 md:py-16">
            {/* Two Column Layout - Mobile: Single column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {/* Left Column - Description */}
              <div className="order-2 md:order-1">
                <p className="text-gray-500 text-base md:text-lg leading-relaxed text-center md:text-left" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                  I used Material Icons as a base and customized them by adding subtle roundness and designing a few from scratch to match specific appliances.
                </p>
              </div>

              {/* Right Column - Icons Grid */}
              <div className="flex items-center justify-center order-1 md:order-2">
                <Image 
                  src="/images/WorkImages/smartNationImages/applianceIcons.png" 
                  alt="Appliance Icons Grid" 
                  width={350}
                  height={260}
                  className="w-full h-auto max-w-sm md:max-w-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Icons Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h3 className="text-2xl md:text-3xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              Navigation Icons
            </h3>
          </div>

          {/* Content Layout */}
          <div className="px-4 md:px-6 py-8 md:py-16">
            {/* Icon States Grid */}
            <div className="space-y-8 md:space-y-12">
              {/* Icon Labels */}
              <div className="flex justify-center gap-8 md:gap-38">
                <span className="text-gray-400 text-sm md:text-md" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>Home</span>
                <span className="text-gray-400 text-sm md:text-md" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>MCB</span>
                <span className="text-gray-400 text-sm md:text-md" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>Automation</span>
                <span className="text-gray-400 text-sm md:text-md" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>Profile</span>
              </div>

              {/* Raw Icons Row */}
              <div className="flex justify-center items-center gap-6 md:gap-16">
                <Image src="/images/WorkImages/smartNationImages/homeIcon-raw.png" alt="Home Icon Raw" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
                <Image src="/images/WorkImages/smartNationImages/MCBicon-raw.png" alt="MCB Icon Raw" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
                <Image src="/images/WorkImages/smartNationImages/autoIcon-raw.png" alt="Automation Icon Raw" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
                <Image src="/images/WorkImages/smartNationImages/profileIcon-raw.png" alt="Profile Icon Raw" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
              </div>

              {/* Active Icons Row */}
              <div className="flex justify-center items-center gap-6 md:gap-16">
                <Image src="/images/WorkImages/smartNationImages/homeIcon-act.png" alt="Home Icon Active" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
                <Image src="/images/WorkImages/smartNationImages/MCBicon-act.png" alt="MCB Icon Active" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
                <Image src="/images/WorkImages/smartNationImages/autoIcon-act.png" alt="Automation Icon Active" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
                <Image src="/images/WorkImages/smartNationImages/profileIcon-act.png" alt="Profile Icon Active" width={80} height={80} className="w-16 h-16 md:w-36 md:h-36 object-contain" />
              </div>

              {/* Icon Animation Video */}
              <div className="flex justify-center mt-12 md:mt-16">
                <video 
                  className="w-full h-auto rounded-lg max-w-2xl md:max-w-full"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/images/WorkImages/smartNationImages/icon.mov" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>

        {/* App Icon That Dress for the Occasion Section */}
        <div className="border-b border-gray-300">
          {/* Section Header */}
          <div className="px-4 md:px-6 py-6 md:py-8 border-b border-gray-300 bg-zinc-50">
            <h3 className="text-xl md:text-3xl font-light text-center md:text-left" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
              App Icon That Dress for the Occasion
            </h3>
          </div>

          {/* Content Layout */}
          <div className="">
            {/* Two Column Layout - Mobile: Single column */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-start">
              {/* Mobile/Desktop - Large Selected Icon and Mobile Mockup stacked */}
              <div className="flex flex-col md:hidden px-4 pb-8 items-center space-y-6">
                
                
                {/* Mobile Mockup */}
                <Image 
                  src={selectedIcon.mockup}
                  alt={`${selectedIcon.name} Mobile Mockup`}
                  width={280}
                  height={450}
                  className="w-64 h-auto object-contain"
                />

                {/* Selected Icon */}
                <Image 
                  src={selectedIcon.src}
                  alt="Selected App Icon" 
                  width={200}
                  height={200}
                  className="w-48 h-48 object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25))',
                  }}
                />
                
                {/* Icon Name */}
                <h3>
                  <span className="text-gray-500 text-lg" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    {selectedIcon.name} Icon
                  </span>
                </h3>
              </div>

              {/* Desktop Layout - Hidden on mobile */}
              <div className="hidden md:flex items-center justify-center py-16 border-r border-gray-300">
                <Image 
                  src={selectedIcon.src}
                  alt="Selected App Icon" 
                  width={320}
                  height={320}
                  className="w-80 h-80 object-contain"
                  style={{ 
                    filter: 'drop-shadow(0 10px 20px rgba(0, 0, 0, 0.25))',
                  }}
                />
              </div>

              {/* Desktop Right Column - Hidden on mobile */}
              <div className="hidden md:flex flex-col gap-18 items-center justify-center">
                <Image 
                  src={selectedIcon.mockup}
                  alt={`${selectedIcon.name} Mobile Mockup`}
                  width={384}
                  height={600}
                  className="w-96 h-auto object-contain"
                />
                <h3>
                  <span className="text-gray-500 text-xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                    {selectedIcon.name} Icon
                  </span>
                </h3>
              </div>
            </div>

            {/* Icon Selection Row */}
            <div className="pt-4 md:pt-6 border-t border-gray-300">
              <div className="relative flex items-center justify-center gap-3 md:gap-6 flex-wrap px-4 md:px-0">
                {appIcons.map((icon, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-16 h-16 md:w-20 md:h-20 p-1 md:p-2 mb-4 md:mb-6 rounded-xl md:rounded-2xl transition-all duration-200 ${
                      selectedIcon.src === icon.src ? 'border-2 border-orange-400 md:border-0' : ''
                    }`}
                  >
                    <Image 
                      src={icon.src}
                      alt={icon.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain rounded-lg md:rounded-xl"
                      style={{ 
                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.25)',
                        cursor: 'pointer'
                      }}
                    />
                  </button>
                ))}
                
                {/* Moving Indicator - Desktop only */}
                <div 
                  className="hidden md:block absolute bottom-0 h-2 bg-zinc-300 rounded-t-md transition-all duration-500 ease-in-out"
                  style={{
                    width: '42px',
                    left: '50%',
                    transform: `translateX(calc(-50% + ${(appIcons.findIndex(icon => icon.src === selectedIcon.src) - (appIcons.length - 1) / 2) * (80 + 24)}px))`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ready to Collab Section */}
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

export default SmartNation;