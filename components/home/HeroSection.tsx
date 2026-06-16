'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/ui/MagneticButton'
import type { HomepageData } from '@/sanity/lib/types'

const WORDS = ['Software', 'Digital', 'Creative', 'Modern', 'AI-Powered']

interface HeroProps { data: HomepageData | null }

export default function HeroSection({ data }: HeroProps) {
  const words = data?.heroRotatingWords?.length ? data.heroRotatingWords : WORDS
  const [idx, setIdx] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -160])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 3000)
    return () => clearInterval(t)
  }, [words.length])

  const sz = 'clamp(66px, 15vw, 220px)'
  const lh = '0.83'
  const tr = '-0.045em'

  return (
    <section ref={ref} className="relative min-h-screen bg-dark flex flex-col justify-center overflow-hidden">

      {/* Single ambient glow — only one, centred */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(232,82,42,0.055) 0%, transparent 70%)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-10"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-medium mb-10 flex items-center gap-4"
        >
          Software House
          <span className="w-8 h-px bg-white/10 inline-block" />
          Design Studio
          <span className="w-8 h-px bg-white/10 inline-block" />
          Est. 2021
        </motion.p>

        {/* Ultra-large 3-line heading */}
        <h1
          aria-label="We Build [rotating word] Futures"
          style={{ fontSize: sz, lineHeight: lh, letterSpacing: tr }}
          className="font-[200] text-white select-none"
        >
          {/* Line 1 */}
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              We Build
            </motion.span>
          </div>

          {/* Line 2 — rotating orange word */}
          <div className="overflow-hidden" style={{ height: `calc(${sz} * ${lh})` }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[idx]}
                className="block text-orange"
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-105%' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {words[idx]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Line 3 */}
          <div className="overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Futures.
            </motion.span>
          </div>
        </h1>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-14 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="text-white/25 text-[13px] leading-[1.8] font-light max-w-sm">
            {data?.heroSubtitle || 'From napkin sketch to live product — we design and build software that scales.'}
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <MagneticButton
              href={data?.heroCTALink || '/get-a-quote'}
              className="group inline-flex items-center gap-2 bg-white hover:bg-orange text-dark hover:text-white text-[12px] font-medium px-6 py-3 rounded-full transition-all duration-300"
            >
              Start a Project
              <span className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[9px]">↗</span>
            </MagneticButton>
            <Link
              href="/about-us"
              className="text-[11.5px] text-white/20 hover:text-white/50 transition-colors tracking-wide"
            >
              Our story ↓
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Animated scroll line — right edge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute right-10 bottom-0 hidden lg:flex flex-col items-center gap-2 pb-8"
      >
        <motion.div
          className="w-px bg-gradient-to-b from-transparent via-white/15 to-transparent"
          animate={{ height: [0, 64, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
        />
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/12 mt-1">Scroll</span>
      </motion.div>
    </section>
  )
}
