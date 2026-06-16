'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { HomepageData } from '@/sanity/lib/types'

const FALLBACK_WORDS = ['Software', 'Digital', 'Creative', 'AI-Powered', 'Web']
const FALLBACK_LINE1 = "Building Tomorrow's"

interface HeroProps { data: HomepageData | null }

function WordReveal({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const words = text.split(' ')
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function HeroSection({ data }: HeroProps) {
  const words = data?.heroRotatingWords?.length ? data.heroRotatingWords : FALLBACK_WORDS
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 3000)
    return () => clearInterval(t)
  }, [words.length])

  return (
    <section className="relative min-h-screen bg-dark flex flex-col justify-end overflow-hidden">

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Radial vignette to fade edges */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #0a0a0a 100%)',
        }}
      />

      {/* Orange glow — subtle */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(232,82,42,0.06) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-10 pb-20 pt-36">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="inline-block w-5 h-px bg-orange/70" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-white/30 font-medium">
            Software House &amp; Design Studio
          </span>
        </motion.div>

        {/* Main headline — word-by-word clip reveal */}
        <h1
          className="font-normal text-white leading-[0.93]"
          style={{ fontSize: 'clamp(60px, 9.5vw, 140px)' }}
        >
          <WordReveal text={data?.heroHeadingLine1 || FALLBACK_LINE1} delay={0.1} />
        </h1>

        {/* Rotating word line */}
        <div
          className="flex items-center gap-4 mt-0.5"
          style={{ height: 'clamp(64px, 9.8vw, 148px)' }}
        >
          <div className="overflow-hidden" style={{ height: 'clamp(64px, 9.8vw, 148px)' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: '105%' }}
                animate={{ y: '0%' }}
                exit={{ y: '-105%' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="block font-normal leading-[0.93] text-orange"
                style={{ fontSize: 'clamp(60px, 9.5vw, 140px)' }}
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="overflow-hidden" style={{ height: 'clamp(64px, 9.8vw, 148px)' }}>
            <motion.span
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block font-normal leading-[0.93] text-white"
              style={{ fontSize: 'clamp(60px, 9.5vw, 140px)' }}
            >
              Solutions
            </motion.span>
          </div>
        </div>

        {/* Bottom row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 border-t border-white/[0.06] pt-8"
        >
          <p className="text-white/35 text-[14.5px] leading-[1.9] max-w-xs">
            {data?.heroSubtitle || "From napkin sketches to full-blown digital products — we build, design, and grow businesses."}
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={data?.heroCTALink || '/get-a-quote'}
              className="group inline-flex items-center gap-2.5 bg-white hover:bg-orange text-dark hover:text-white text-[13px] font-medium px-7 py-3.5 rounded-full transition-all duration-300"
            >
              {data?.heroCTALabel || 'Start a Project'}
              <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </Link>
            <Link
              href="/about-us"
              className="text-[13px] text-white/30 hover:text-white/70 transition-colors"
            >
              Our story ↓
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-10 hidden lg:flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-white/20 origin-top"
        />
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 rotate-90 origin-center">Scroll</span>
      </motion.div>
    </section>
  )
}
