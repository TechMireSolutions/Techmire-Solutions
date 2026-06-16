'use client'

import { motion } from 'framer-motion'

interface MarqueeTickerProps {
  text: string
  repeat?: number
  speed?: number
  dark?: boolean
}

export default function MarqueeTicker({ text, repeat = 6, speed = 30, dark = true }: MarqueeTickerProps) {
  const items = Array(repeat).fill(text)

  return (
    <div
      className={`overflow-hidden py-5 ${dark ? 'bg-dark border-y border-border' : 'bg-[#e8522a]'}`}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`text-[13px] uppercase tracking-[0.15em] font-medium flex items-center gap-8 ${
              dark ? 'text-light/40' : 'text-white/80'
            }`}
          >
            {item}
            <span className={dark ? 'text-[#e8522a]' : 'text-white/50'}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
