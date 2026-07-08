'use client'

import { motion } from 'framer-motion'
import { Diamond } from 'lucide-react'
import Image from 'next/image'
import FadeUp from '@/components/ui/FadeUp'
import { urlFor } from '@/sanity/lib/image'
import type { ClientLogo } from '@/sanity/lib/types'

const FALLBACK_NAMES = [
  'Bilal Yaslobi Travel',
  'Bronze Digitals',
  'Zainab Foes',
  'Sun Behind The Cloud',
  'Herbanicm',
  'Freeway Construction',
  'Fitson Real Estate',
]

export default function ClientsSection({ heading, clients }: { heading: string; clients: ClientLogo[] }) {
  const items: (ClientLogo | { company: string, dummy: true })[] = clients.length > 0 
    ? clients 
    : FALLBACK_NAMES.map(name => ({ company: name, dummy: true }))
    
  const track = [...items, ...items, ...items, ...items]

  return (
    <section className="bg-dark border-t border-white/[0.05] border-b border-white/[0.05] py-20 overflow-hidden">
      <div className="px-8 lg:px-16 mb-10">
        <FadeUp>
          <div className="flex items-center gap-3">
            <span className="w-4 h-px bg-orange/40" />
            <span className="text-[10.5px] uppercase tracking-[0.24em] text-white/20 font-medium">
              {heading || 'Trusted By'}
            </span>
          </div>
        </FadeUp>
      </div>

      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
        >
          {track.map((item, i) => {
            const hasLogo = 'logo' in item && !!item.logo;
            return (
              <div key={i} className="flex items-center gap-12 shrink-0">
                {hasLogo ? (
                  <div className="relative h-12 w-auto min-w-[100px] flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <Image 
                      src={urlFor((item as ClientLogo).logo).url()} 
                      alt={item.company} 
                      width={160}
                      height={60}
                      className="object-contain max-h-12 w-auto"
                    />
                  </div>
                ) : (
                  <span className="text-[13.5px] font-light text-white/16 hover:text-white/45 transition-colors duration-500 tracking-[-0.01em]">
                    {item.company}
                  </span>
                )}
                <Diamond
                  aria-hidden
                  size={6}
                  className="text-white/8 shrink-0"
                  fill="currentColor"
                />
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
