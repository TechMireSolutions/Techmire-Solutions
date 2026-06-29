import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import FooterWrapper from '@/components/layout/FooterWrapper'
import LenisProvider from '@/components/providers/LenisProvider'
import Grain from '@/components/ui/Grain'

const inter = Inter({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: {
    template: '%s | TechmireSolutions',
    default: 'TechmireSolutions — Software House and Design Studio',
  },
  description:
    "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From web development to digital marketing, we build the future of your business.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://techmiresolutions.com'),
  openGraph: { siteName: 'TechmireSolutions', type: 'website' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <LenisProvider>
          <Grain />
          <NavbarWrapper />
          <main>{children}</main>
          <FooterWrapper />
        </LenisProvider>
      </body>
    </html>
  )
}
