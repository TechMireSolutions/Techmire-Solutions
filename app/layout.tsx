import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarWrapper from '@/components/layout/NavbarWrapper'
import FooterWrapper from '@/components/layout/FooterWrapper'
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper'
import LenisProvider from '@/components/providers/LenisProvider'
import Grain from '@/components/ui/Grain'
import WhatsAppWrapper from '@/components/layout/WhatsAppWrapper'

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

export async function generateMetadata(): Promise<Metadata> {
  let settings = null
  try {
    const { client } = await import('@/sanity/lib/client')
    const { siteSettingsQuery } = await import('@/sanity/lib/queries')
    settings = await client.fetch(siteSettingsQuery)
  } catch (err) {
    console.error('Failed to fetch site settings for metadata:', err)
  }

  let icons = {}
  let ogImage = undefined

  if (settings?.favicon || settings?.ogImage) {
    const { urlFor } = await import('@/sanity/lib/image')
    if (settings.favicon) {
      icons = { icon: urlFor(settings.favicon).url() }
    }
    if (settings.ogImage) {
      ogImage = urlFor(settings.ogImage).width(1200).height(630).url()
    }
  }

  const siteName = settings?.siteName || 'TechmireSolutions'
  const defaultTitle = `${siteName} — Software House and Design Studio`
  const description = settings?.tagline || "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From web development to digital marketing, we build the future of your business."
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techmiresolutions.com'

  return {
    title: {
      template: `%s | ${siteName}`,
      default: defaultTitle,
    },
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: baseUrl,
    },
    openGraph: { 
      siteName, 
      type: 'website',
      images: ogImage ? [ogImage] : undefined,
    },
    verification: settings?.googleSiteVerification ? { google: settings.googleSiteVerification } : undefined,
    robots: { index: true, follow: true },
    icons,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <LenisProvider>
          <Grain />
          <ClientLayoutWrapper
            navbar={<NavbarWrapper />}
            footer={<FooterWrapper />}
          >
            <main>{children}</main>
          </ClientLayoutWrapper>
          <WhatsAppWrapper />
        </LenisProvider>
      </body>
    </html>
  )
}
