'use client'

import { motion } from 'framer-motion'
import FadeUp from '@/components/ui/FadeUp'
import type { ClientLogo } from '@/sanity/lib/types'

interface ClientsSectionProps {
  heading: string
  clients: ClientLogo[]
}

const FALLBACK = [
  'Bilal Yaslobi Travel', 'Bronze Digitals', 'Zainab Foes',
  'Sun Behind The Cloud', 'Herbanicm', 'Freeway Construction', 'Fitson Real Estate',
]

export default function ClientsSection({ heading, clients }: ClientsSectionProps) {
  const names = clients.length > 0 ? clients.map(c => c.company) : FALLBACK

  return (
    <section className="bg-dark py-20 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1440px] mx-auto mb-12">
        <FadeUp>
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-orange" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">
              {heading || 'Trusted By'}
            </span>
          </div>
        </FadeUp>
      </div>

      {/* Infinite scroll ticker */}
      <div className="overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {[...names, ...names, ...names, ...names].map((name, i) => (
            <span
              key={i}
              className="text-[15px] text-white/20 hover:text-white/60 transition-colors font-medium shrink-0 cursor-default"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
