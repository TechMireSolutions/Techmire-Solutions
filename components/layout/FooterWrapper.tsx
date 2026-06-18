import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'
import Footer from './Footer'

export default async function FooterWrapper() {
  const settings: SiteSettings | null = await client.fetch(siteSettingsQuery).catch(() => null)

  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(120).height(120).url()
    : null

  return <Footer logoUrl={logoUrl} />
}
