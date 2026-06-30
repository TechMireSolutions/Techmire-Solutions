'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, MoveRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import MagneticButton from '@/components/ui/MagneticButton'
import type { HomepageData } from '@/sanity/lib/types'

function Counter({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let frame = 0
    const timer = setInterval(() => {
      frame++
      setN(Math.floor((1 - Math.pow(1 - frame / 60, 3)) * to))
      if (frame >= 60) { setN(to); clearInterval(timer) }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

const STATS = [
  { to: 4, suffix: '+', label: 'Years Active' },
  { to: 30, suffix: '+', label: 'Team Members' },
  { to: 50, suffix: '+', label: 'Projects Done' },
]

interface HeroProps { data: HomepageData | null }

export default function HeroSection({ data }: HeroProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 800], [1, 0])

  return (
    <section className="relative min-h-screen bg-dark overflow-hidden">
      {/* ── Background Image ── */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <Image
          src={data?.heroBackgroundImage ? urlFor(data.heroBackgroundImage).url() : "/hero-bg.png"}
          alt="Abstract Digital Background"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
      </motion.div>

      {/* ── Subtle grid backdrop ── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Soft glow orb ── */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          top: '-15vw',
          right: '-18vw',
          background: 'radial-gradient(circle, rgba(232,82,42,0.1) 0%, transparent 70%)',
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080808 0%, transparent 100%)' }}
      />

      <div className="relative z-10 w-full px-8 lg:px-16 flex flex-col min-h-screen">

        {/* ── Overline bar ── */}
        <div className="pt-[108px] flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="w-5 h-px bg-orange/60" />
            <span className="text-[10.5px] uppercase tracking-[0.28em] text-white/28 font-medium">
              Software House{' '}&#183;{' '}Design Studio{' '}&#183;{' '}Karachi
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[10.5px] text-white/14 tracking-[0.2em] font-light hidden sm:block"
          >
            Est. 2020
          </motion.span>
        </div>

        {/* ── Three-line typographic heading ── */}
        <div className="flex-1 flex flex-col justify-center py-10">

          {/* Line 1 — small muted lead-in */}
          <div className="overflow-hidden mb-1">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="font-light text-white/28 leading-[1.15] tracking-[-0.01em]"
              style={{ fontSize: 'clamp(18px, 2.2vw, 32px)' }}
            >
              Believe in the
            </motion.p>
          </div>

          {/* Line 2 — GIANT primary statement */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-[200] leading-[0.86] tracking-[-0.045em]"
              style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}
            >
              Software House
            </motion.h1>
          </div>

          {/* Line 3 — muted echo */}
          <div className="overflow-hidden mb-14">
            <motion.p
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-[200] leading-[0.86] tracking-[-0.045em] text-white/16"
              style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}
            >
              You Can Trust
            </motion.p>
          </div>

          {/* ── Description + Stats row ── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68 }}
              className="text-white/40 font-light leading-[1.82] max-w-[420px]"
              style={{ fontSize: '15px' }}
            >
              {data?.heroSubtitle || "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From turning napkin sketches into full-blown apps to spearheading the Digital Transformation of your business, we’ve mastered the art of making magic happen."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.82 }}
              className="flex items-end gap-10 lg:gap-14"
            >
              {STATS.map(s => (
                <div key={s.label}>
                  <p
                    className="font-[200] text-white tracking-[-0.045em] tabular-nums"
                    style={{ fontSize: 'clamp(36px, 3.8vw, 56px)', lineHeight: 1 }}
                  >
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="text-white/18 text-[9.5px] uppercase tracking-[0.24em] mt-2 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.98 }}
          className="flex items-center justify-between pb-10 pt-6 border-t border-white/[0.06]"
        >
          <MagneticButton
            href={data?.heroCTALink || '/get-a-quote'}
            className="group inline-flex items-center gap-2.5 text-[13px] font-normal text-white px-6 py-3 min-h-[44px] rounded-full border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/[0.2] transition-all duration-250"
          >
            Get a Quote
            <ArrowUpRight
              aria-hidden
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </MagneticButton>

          <Link
            href="/about-us"
            className="group flex items-center gap-3 text-white/22 hover:text-white/55 text-[12px] font-light transition-colors duration-300"
          >
            <span>Our Story</span>
            <MoveRight
              aria-hidden
              size={14}
              className="text-white/20 group-hover:text-white/45 transition-all duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
