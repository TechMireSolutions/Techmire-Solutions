'use client'

import { motion } from 'framer-motion'

interface MarqueeTickerProps {
  text: string
  repeat?: number
  speed?: number
  dark?: boolean
}

export default function MarqueeTicker({ text, repeat = 8, speed = 40, dark = true }: MarqueeTickerProps) {
  const items = Array(repeat).fill(text)

  return (
    <div className={`overflow-hidden py-4 border-y ${dark ? 'border-white/[0.07] bg-dark' : 'border-black/[0.07] bg-[#f5f5f0]'}`}>
      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`text-[11px] uppercase tracking-[0.25em] font-medium flex items-center ${
              dark ? 'text-white/20' : 'text-black/30'
            }`}
          >
            <span className="px-8">{item}</span>
            <span className={`text-[8px] ${dark ? 'text-white/15' : 'text-black/20'}`}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
