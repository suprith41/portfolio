"use client"
import Image from 'next/image'
import Link from 'next/link'
import GridDivider from '../ui/GridDivider'

export default function Unplugged() {
  return (
    <>
      <GridDivider />
      <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16">

        <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-4"
           style={{ fontFamily: 'Poppins, sans-serif' }}>
          Unplugged
        </p>
        <h2 className="text-4xl md:text-5xl font-light text-black mb-3"
            style={{ fontFamily: 'Garamond, Georgia, serif' }}>
          Beyond the pixels
        </h2>
        <p className="text-gray-400 text-sm max-w-md mb-10"
           style={{ fontFamily: 'Poppins, sans-serif' }}>
          Creative explorations in craftsmanship and personal expression.
        </p>

        <Link href="/unplugged/table/" className="group inline-block">
          <div className="overflow-hidden rounded-lg mb-3 max-w-xs">
            <Image
              src="/images/Unplugged/table/thumbnail.png"
              alt="The Corner Table"
              width={380}
              height={285}
              className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-light text-black group-hover:text-orange-500 transition-colors duration-300 mb-0.5"
              style={{ fontFamily: 'Garamond, Georgia, serif' }}>
            The Corner Table
          </h3>
          <p className="text-gray-400 text-xs"
             style={{ fontFamily: 'Poppins, sans-serif' }}>
            A weekend project
          </p>
        </Link>

      </div>
    </>
  )
}
