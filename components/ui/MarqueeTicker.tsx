'use client'

import { motion } from 'framer-motion'

interface MarqueeTickerProps {
  text?: string
  repeat?: number
  speed?: number
  variant?: 'dark' | 'orange' | 'light'
}

const ITEMS = ['Software House', 'Web Development', 'Design Studio', 'Mobile Apps', 'Branding', 'SEO', 'Digital Marketing', 'UI/UX Design']

export default function MarqueeTicker({ text, repeat = 10, speed = 55, variant = 'orange' }: MarqueeTickerProps) {
  const items = text
    ? Array(repeat).fill(text)
    : [...ITEMS, ...ITEMS, ...ITEMS]

  const bg = variant === 'orange' ? 'bg-orange' : variant === 'light' ? 'bg-light' : 'bg-dark border-y border-white/[0.06]'
  const fg = variant === 'orange' ? 'text-white' : variant === 'light' ? 'text-dark/70' : 'text-white/50'
  const sep = variant === 'orange' ? 'text-white/60' : 'text-current opacity-60'

  return (
    <div className={`overflow-hidden py-5 ${bg}`}>
      <motion.div
        className="flex items-center gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`flex items-center gap-0 text-[13px] font-light tracking-[0.08em] uppercase ${fg}`}>
            <span className="px-7">{item}</span>
            <span className={`text-[10px] ${sep}`}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
