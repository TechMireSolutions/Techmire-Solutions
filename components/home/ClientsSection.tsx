'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { ClientLogo } from '@/sanity/lib/types'

interface ClientsSectionProps {
  heading: string
  clients: ClientLogo[]
}

const FALLBACK_CLIENTS = [
  'Bilal Yaslobi Travel & Tourism',
  'Bronze Digitals',
  'Zainab Foes',
  'Sun Behind The Cloud',
  'Herbanicm',
  'Freeway Construction',
  'Fitson Real Estate',
]

export default function ClientsSection({ heading, clients }: ClientsSectionProps) {
  const hasLogos = clients.length > 0 && clients.some((c) => c.logo)

  return (
    <section className="bg-dark py-24 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto mb-12">
        <FadeUp>
          <h2
            className="text-light font-normal text-center"
            style={{ fontSize: 'clamp(28px, 3vw, 42px)', lineHeight: 1.1 }}
          >
            {heading || 'Our Amazing Clients'}
          </h2>
        </FadeUp>
      </div>

      {/* Scrolling ticker */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-16 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {[...Array(2)].flatMap(() =>
            hasLogos
              ? clients.concat(clients).map((client, i) => (
                  <div key={i} className="flex items-center justify-center h-16 opacity-50 hover:opacity-100 transition-opacity">
                    {client.logo ? (
                      <Image
                        src={urlFor(client.logo).height(48).url()}
                        alt={client.company}
                        width={120}
                        height={48}
                        className="object-contain brightness-0 invert"
                      />
                    ) : (
                      <span className="text-light/40 text-lg font-medium whitespace-nowrap">{client.company}</span>
                    )}
                  </div>
                ))
              : FALLBACK_CLIENTS.concat(FALLBACK_CLIENTS).map((name, i) => (
                  <span
                    key={i}
                    className="text-light/30 text-lg font-medium whitespace-nowrap hover:text-light/70 transition-colors"
                  >
                    {name}
                  </span>
                ))
          )}
        </motion.div>
      </div>
    </section>
  )
}
