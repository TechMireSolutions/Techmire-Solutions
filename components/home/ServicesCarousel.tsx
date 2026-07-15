'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  Globe, Code2, TrendingUp, Palette,
  Megaphone, Smartphone, Layers, Zap, ArrowUpRight,
} from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { Service, SanityImage } from '@/sanity/lib/types'

const FALLBACK: Service[] = [
  { _id: '1', title: 'Web Development',     shortDescription: 'Fast, functional sites built for performance and conversion.',  slug: { current: 'web-development' },           parentCategory: 'top-level', order: 1 },
  { _id: '2', title: 'Software Development',shortDescription: 'Custom apps and enterprise systems, built to scale.',            slug: { current: 'software-solution' },         parentCategory: 'top-level', order: 2 },
  { _id: '3', title: 'SEO Optimisation',    shortDescription: 'Rank higher, stay visible, and own your niche on Google.',      slug: { current: 'search-engine-optimization' },parentCategory: 'top-level', order: 3 },
  { _id: '4', title: 'Graphic Design',      shortDescription: 'Bold visuals and brand identities that convert.',               slug: { current: 'graphic-design' },            parentCategory: 'top-level', order: 4 },
  { _id: '5', title: 'Digital Marketing',   shortDescription: 'Data-driven campaigns that turn clicks into customers.',        slug: { current: 'digital-marketing' },         parentCategory: 'top-level', order: 5 },
  { _id: '6', title: 'App Development',     shortDescription: 'Mobile apps users actually love to open.',                     slug: { current: 'app-development' },           parentCategory: 'top-level', order: 6 },
  { _id: '7', title: 'UI/UX Design',        shortDescription: 'Interfaces that are intuitive, beautiful and accessible.',     slug: { current: 'ui-ux-design' },              parentCategory: 'top-level', order: 7 },
  { _id: '8', title: 'Branding',            shortDescription: 'Strategic identities built to last decades, not seasons.',     slug: { current: 'branding' },                  parentCategory: 'top-level', order: 8 },
]

const ICON_MAP: Record<string, React.ElementType> = {
  'web-development':           Globe,
  'software-solution':         Code2,
  'search-engine-optimization':TrendingUp,
  'graphic-design':            Palette,
  'digital-marketing':         Megaphone,
  'app-development':           Smartphone,
  'ui-ux-design':              Layers,
  'branding':                  Zap,
}

const ease = [0.16, 1, 0.3, 1] as const

export default function ServicesCarousel({ heading, backgroundImage, services }: { heading: string; backgroundImage?: SanityImage; services: Service[] }) {
  const list = services.length > 0 ? services : FALLBACK
  const [activeId, setActiveId] = useState(list[0]._id)

  const activeIndex = list.findIndex(s => s._id === activeId)
  const active = list[activeIndex] ?? list[0]
  const ActiveIcon = ICON_MAP[active.slug.current] ?? Globe
  const activeHref = `/services/${active.slug.current}`

  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1", "0.5 1"]
  })
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1])

  return (
    <section ref={containerRef} className="bg-dark py-24 lg:py-36 px-8 lg:px-16 overflow-hidden">
      <motion.div style={{ scale, opacity }} className="origin-center">

      {/* ── Section header ── */}
      <FadeUp>
        <div className="flex items-end justify-between mb-14 lg:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-4 h-px bg-orange/50" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/22 font-medium">Our Services</span>
            </div>
            <h2
              className="font-[200] text-white leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(38px, 5vw, 68px)' }}
            >
              {heading || 'What We Do Best'}
            </h2>
          </div>
          <Link
            href="/services"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-white/25 hover:text-white transition-colors duration-300 min-h-[44px] pb-1 border-b border-white/10 hover:border-white/30"
          >
            All services
            <ArrowUpRight aria-hidden size={11} />
          </Link>
        </div>
      </FadeUp>

      {/* ── Split panel ── */}
      <div className="border border-white/[0.06] flex flex-col lg:flex-row">

        {/* Left — service list */}
        <div className="lg:w-[34%] border-b lg:border-b-0 lg:border-r border-white/[0.06] divide-y divide-white/[0.04]">
          {list.map((s, i) => {
            const isActive = s._id === activeId
            return (
              <button
                key={s._id}
                onClick={() => setActiveId(s._id)}
                className={`w-full flex items-center justify-between px-7 py-4 min-h-[56px] text-left transition-all duration-300 group ${
                  isActive ? 'bg-[#0e0e0e]' : 'hover:bg-[#0b0b0b]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-[9px] tabular-nums font-medium tracking-[0.12em] transition-colors duration-300 ${
                    isActive ? 'text-orange' : 'text-white/50'
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-[13.5px] font-light tracking-[-0.01em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/50 group-hover:text-white'
                  }`}>
                    {s.title}
                  </span>
                </div>

                {/* Active indicator */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="w-1.5 h-1.5 rounded-full bg-orange shrink-0"
                />
              </button>
            )
          })}
        </div>

        {/* Right — animated detail panel */}
        <div className="flex-1 relative overflow-hidden min-h-[400px] lg:min-h-[500px] group/panel">
          <Image
            src={backgroundImage ? urlFor(backgroundImage).url() : "/services-bg.png"}
            alt="Services Background"
            fill
            quality={40}
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover opacity-20 mix-blend-luminosity group-hover/panel:opacity-30 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-dark/90 to-dark/40" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease }}
              className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-between"
            >
              {/* Top row — icon + number */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center">
                  <ActiveIcon aria-hidden size={18} className="text-white/30" />
                </div>
                <span
                  className="font-[200] text-white/[0.04] select-none"
                  aria-hidden
                  style={{ fontSize: 'clamp(80px, 12vw, 160px)', lineHeight: 1, letterSpacing: '-0.05em' }}
                >
                  {String(activeIndex + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Body */}
              <div>
                <p className="text-[10px] text-white/18 uppercase tracking-[0.28em] font-medium mb-4">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(list.length).padStart(2, '0')}
                </p>
                <h3
                  className="text-white font-[200] leading-[0.9] tracking-[-0.04em] mb-6"
                  style={{ fontSize: 'clamp(28px, 3.8vw, 52px)' }}
                >
                  {active.title}
                </h3>
                <p className="text-white/30 font-light leading-[1.82] max-w-[400px]" style={{ fontSize: '13.5px' }}>
                  {active.shortDescription}
                </p>

                <div className="group relative inline-flex pb-0.5 mt-9 self-start">
                  <Link
                    href={activeHref}
                    className="flex items-center gap-2 text-[13px] font-normal text-white/60 hover:text-white no-underline min-h-[44px] transition-colors duration-200"
                  >
                    <span>Start a project</span>
                    <ArrowUpRight
                      aria-hidden
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                  <span className="absolute bottom-0 left-0 block h-px bg-white/35 w-0 group-hover:w-full transition-all duration-[350ms] ease-out" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      </motion.div>
    </section>
  )
}
