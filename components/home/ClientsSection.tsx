'use client'

import { motion } from 'framer-motion'
import { Diamond } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'
import type { ClientLogo } from '@/sanity/lib/types'

const FALLBACK = [
  'Bilal Yaslobi Travel',
  'Bronze Digitals',
  'Zainab Foes',
  'Sun Behind The Cloud',
  'Herbanicm',
  'Freeway Construction',
  'Fitson Real Estate',
]

export default function ClientsSection({ heading, clients }: { heading: string; clients: ClientLogo[] }) {
  const names = clients.length > 0 ? clients.map(c => c.company) : FALLBACK
  const track = [...names, ...names, ...names, ...names]

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
          {track.map((name, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span className="text-[13.5px] font-light text-white/16 hover:text-white/45 transition-colors duration-500 tracking-[-0.01em]">
                {name}
              </span>
              <Diamond
                aria-hidden
                size={6}
                className="text-white/8 shrink-0"
                fill="currentColor"
              />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
