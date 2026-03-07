import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google"
import "./globals.css"
import NavbarClient from "./components/layout/NavbarClient"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Satish Hebbal - Portfolio",
  description: "Personal portfolio website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <NavbarClient />
        <main>
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  )
}
