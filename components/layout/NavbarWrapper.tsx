import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'
import Navbar from './Navbar'

export default async function NavbarWrapper() {
  const settings: SiteSettings | null = await client.fetch(siteSettingsQuery).catch(() => null)

  const logoUrl = settings?.logo
    ? urlFor(settings.logo).width(80).height(80).url()
    : null

  return <Navbar logoUrl={logoUrl} />
}
