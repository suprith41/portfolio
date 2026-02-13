"use client"
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Unplugged = () => {
  return (
    <div className="bg-[#f5f5f5] py-16 md:py-24">
      {/* Section Title */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-6xl font-light text-black mb-4" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
          Unplugged
        </h2>
        <p className="text-gray-800 text-sm md:text-lg max-w-3xl mx-auto px-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
          Beyond the pixels and wireframes—my creative explorations in art, craftsmanship, and personal expression
        </p>
      </div>

      {/* Project */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <Link href="/unplugged/table/" className="block group cursor-pointer">
          {/* Thumbnail Image */}
          <div className="mb-6 transition-transform duration-300 group-hover:scale-105">
            <Image 
              src="/images/Unplugged/table/thumbnail.png"
              alt="Corner Table Project"
              width={400}
              height={300}
              className="mx-auto rounded-lg border border-gray-200 transition-shadow duration-300 group-hover:shadow-lg"
            />
          </div>

          {/* Project Title */}
          <h3 className="text-2xl md:text-3xl font-light text-black mb-2 transition-colors duration-300 group-hover:text-orange-500" style={{ fontFamily: 'Garamond, Georgia, serif' }}>
            The Corner Table
          </h3>

          {/* Project Description */}
          <p className="text-gray-500 text-base md:text-lg transition-colors duration-300 group-hover:text-gray-600" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
            A weekend project
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Unplugged;