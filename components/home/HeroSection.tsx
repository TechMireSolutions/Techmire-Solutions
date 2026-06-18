'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import type { HomepageData } from '@/sanity/lib/types'

const WORDS = ['Software', 'Digital', 'Creative', 'Modern', 'Tech']

interface HeroProps { data: HomepageData | null }

export default function HeroSection({ data }: HeroProps) {
  const words = data?.heroRotatingWords?.length ? data.heroRotatingWords : WORDS
  const [idx, setIdx] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, -80])

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % words.length), 3000)
    return () => clearInterval(t)
  }, [words.length])

  return (
    <section ref={ref} className="relative min-h-screen bg-dark overflow-hidden">

      {/* Decorative arc lines — top right area, like reference */}
      <svg
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 w-[55%] h-full opacity-[0.12]"
        viewBox="0 0 800 700"
        fill="none"
        preserveAspectRatio="xMaxYMid meet"
      >
        {/* Rectangle outlines */}
        <rect x="200" y="80" width="580" height="340" stroke="white" strokeWidth="0.6" />
        <rect x="440" y="80" width="340" height="180" stroke="white" strokeWidth="0.6" />
        {/* Large arc */}
        <path d="M 800 420 Q 600 200 800 0" stroke="white" strokeWidth="0.6" fill="none" />
        <path d="M 820 500 Q 500 250 820 -20" stroke="white" strokeWidth="0.6" fill="none" />
      </svg>

      <motion.div
        style={{ y }}
        className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-10 pt-40 pb-24 flex flex-col h-screen justify-between"
      >
        <div>
          {/* Line 1 — bright white, bold */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-semibold leading-[1.0] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(52px, 7.5vw, 112px)' }}
            >
              {data?.heroHeadingLine1 || "Building Today's"}
            </motion.h1>
          </div>

          {/* Line 2 — muted gray, rotating word, same size */}
          <div className="overflow-hidden" style={{ height: 'clamp(56px, 8vw, 118px)' }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={words[idx]}
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-100%' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-semibold leading-[1.0] tracking-[-0.02em]"
                style={{
                  fontSize: 'clamp(52px, 7.5vw, 112px)',
                  color: 'rgba(255,255,255,0.28)',
                }}
              >
                {words[idx]} Ventures
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 text-white/40 text-[14px] leading-[1.7] font-light max-w-[360px]"
          >
            {data?.heroSubtitle || "TechmireSolutions crafts award-winning custom digital products driven by strategy, design and technology."}
          </motion.p>
        </div>

        {/* Bottom — CTA pill */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
        >
          <Link
            href={data?.heroCTALink || '/get-a-quote'}
            className="inline-flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white text-[14px] font-medium px-6 py-3.5 rounded-full border border-white/[0.08] transition-colors duration-200"
          >
            Work with us&nbsp;↗
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
