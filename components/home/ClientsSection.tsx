'use client'

import { motion } from 'framer-motion'
import FadeUp from '@/components/ui/FadeUp'
import type { ClientLogo } from '@/sanity/lib/types'

const FALLBACK = ['Bilal Yaslobi Travel', 'Bronze Digitals', 'Zainab Foes', 'Sun Behind The Cloud', 'Herbanicm', 'Freeway Construction', 'Fitson Real Estate']

export default function ClientsSection({ heading, clients }: { heading: string; clients: ClientLogo[] }) {
  const names = clients.length > 0 ? clients.map(c => c.company) : FALLBACK
  const track = [...names, ...names, ...names, ...names]

  return (
    <section className="bg-dark border-t border-white/[0.05] border-b border-white/[0.05] py-20 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 mb-10">
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
          className="flex items-center gap-14 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {track.map((name, i) => (
            <div key={i} className="flex items-center gap-14 shrink-0">
              <span className="text-[14px] font-light text-white/18 hover:text-white/50 transition-colors duration-500">
                {name}
              </span>
              <span className="text-white/10 text-[8px]">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
