'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pen, Code2, TrendingUp, Target, ArrowUpRight } from 'lucide-react'
import AnimatedText from '@/components/ui/AnimatedText'
import { MouseEvent, useRef } from 'react'

const DISCIPLINES = [
  {
    num: '01',
    icon: Pen,
    title: 'Design',
    desc: 'UI/UX, Branding, Graphic Design',
    href: '/services',
  },
  {
    num: '02',
    icon: Code2,
    title: 'Development',
    desc: 'Web, App & Software Engineering',
    href: '/services',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'Marketing',
    desc: 'SEO, Social Media & Campaigns',
    href: '/services',
  },
  {
    num: '04',
    icon: Target,
    title: 'Strategy',
    desc: 'Research, Planning & GTM',
    href: '/about-us',
  },
]

const ease = [0.16, 1, 0.3, 1] as const

function DisciplineCard({ d, i }: { d: typeof DISCIPLINES[0], i: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  const Icon = d.icon
  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: i * 0.08, ease }}
      className={`group relative overflow-hidden px-8 lg:px-10 py-10 lg:py-12 transition-colors duration-500 ${
        i < DISCIPLINES.length - 1 ? 'border-b lg:border-b-0 border-r border-white/[0.06]' : ''
      }`}
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle 250px at var(--mouse-x, 0) var(--mouse-y, 0), rgba(232,82,42,0.06), transparent 80%)'
        }}
      />
      
      <div className="relative z-10 flex items-center justify-between mb-7">
        <span className="text-[9px] text-white/14 uppercase tracking-[0.22em] font-medium tabular-nums">
          {d.num}
        </span>
        <div className="w-7 h-7 rounded-full border border-white/[0.07] flex items-center justify-center group-hover:border-orange/25 transition-colors duration-400">
          <Icon
            aria-hidden
            size={11}
            className="text-white/22 group-hover:text-orange transition-colors duration-400"
          />
        </div>
      </div>
      <p className="relative z-10 text-white font-normal text-[15px] tracking-[-0.01em] mb-2 group-hover:text-orange transition-colors duration-400">
        {d.title}
      </p>
      <p className="relative z-10 text-white/22 text-[11.5px] font-light leading-relaxed">
        {d.desc}
      </p>
    </motion.div>
  )
}

export default function ExpertiseSection() {
  return (
    <section className="bg-dark">

      {/* ── Top rule ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
        className="h-px bg-white/[0.06] origin-left"
      />

      {/* ── Label bar ── */}
      <div className="px-8 lg:px-16 flex items-center justify-between py-5 border-b border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.15, ease }}
          className="flex items-center gap-3"
        >
          <span className="w-4 h-px bg-orange/50" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/22 font-medium">Our Studio</span>
        </motion.div>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="text-[10px] uppercase tracking-[0.28em] text-white/14 font-light"
        >
          Since 2020
        </motion.span>
      </div>

      {/* ── Main: stacked quote left + description right ── */}
      <div className="px-8 lg:px-16 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end">

        {/* Left — editorial stacked heading */}
        <div className="overflow-hidden">
          <div style={{ fontSize: 'clamp(52px, 7vw, 100px)' }}>
            <AnimatedText
              el="h2"
              text="From ideas to impact."
              type="word"
              delay={0.1}
              className="font-[200] text-white leading-[0.88] tracking-[-0.045em]"
            />
          </div>
        </div>

        {/* Right — description + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.75, delay: 0.18, ease }}
          className="flex flex-col justify-between gap-10 lg:pb-2"
        >
          <p className="text-white/30 font-light leading-[1.85]" style={{ fontSize: '14px' }}>
            We're on a mission to redefine what a software house can do — from turning ideas into apps to spearheading digital transformation for businesses that want to lead.
          </p>
          <div className="group relative inline-flex pb-0.5 self-start">
            <Link
              href="/contact-us"
              className="flex items-center gap-2 text-[13.5px] font-normal text-white/80 hover:text-white no-underline min-h-[44px] transition-colors duration-200"
            >
              <span>Work with us</span>
              <ArrowUpRight
                aria-hidden
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <span className="absolute bottom-0 left-0 block h-px bg-white/40 w-0 group-hover:w-full transition-all duration-[350ms] ease-out" />
          </div>
        </motion.div>
      </div>

      {/* ── Bottom: 4-column disciplines row ── */}
      <div className="border-t border-white/[0.06] grid grid-cols-2 lg:grid-cols-4">
        {DISCIPLINES.map((d, i) => (
          <DisciplineCard key={d.title} d={d} i={i} />
        ))}
      </div>

    </section>
  )
}
