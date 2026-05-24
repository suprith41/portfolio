import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Great_Vibes, Merriweather, Playfair_Display } from "next/font/google"
import "./globals.css"
import NavbarClient from "./components/layout/NavbarClient"
import SmoothScroll from "./components/layout/SmoothScroll"
import ScrollReset from "./components/layout/ScrollReset"
import Footer from "./components/layout/footer"

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-great-vibes",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-merriweather",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Suprith Rao - Portfolio",
  description: "Product designer crafting thoughtful digital experiences. Specialising in interface design, interaction, and design systems.",
  openGraph: {
    title: "Suprith Rao - Portfolio",
    description: "Product designer crafting thoughtful digital experiences. Specialising in interface design, interaction, and design systems.",
    url: siteUrl,
    siteName: "Suprith Rao",
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: "Suprith Rao - Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suprith Rao - Portfolio",
    description: "Product designer crafting thoughtful digital experiences. Specialising in interface design, interaction, and design systems.",
    images: ['/images/og.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${greatVibes.variable} ${playfairDisplay.variable} ${merriweather.variable}`}
        suppressHydrationWarning
      >
        <SmoothScroll />
        <ScrollReset />
        <NavbarClient />
        <main>
          {children}
          <Analytics />
        </main>
        <Footer />
      </body>
    </html>
  )
}
