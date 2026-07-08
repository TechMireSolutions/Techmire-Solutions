import { client } from '@/sanity/lib/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { SiteSettings } from '@/sanity/lib/types'
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton'

export default async function WhatsAppWrapper() {
  const settings: SiteSettings | null = await client.fetch(siteSettingsQuery).catch(() => null)
  return <WhatsAppFloatingButton whatsappNumber={settings?.whatsapp} />
}
