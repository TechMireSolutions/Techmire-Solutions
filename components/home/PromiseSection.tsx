'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, Shield, Cpu, Star, Coins, Clock, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import FadeUp from '@/components/ui/FadeUp'
import type { PromiseItem } from '@/sanity/lib/types'

const FALLBACK_ITEMS: PromiseItem[] = [
  { _id: '1', label: 'Client Support', order: 1 },
  { _id: '2', label: 'Integrity & Trust', order: 2 },
  { _id: '3', label: 'Modern Tech', order: 3 },
  { _id: '4', label: 'Quality', order: 4 },
  { _id: '5', label: 'Value For Money', order: 5 },
  { _id: '6', label: 'Time Keeping', order: 6 },
]

const DESCRIPTIONS: Record<string, string> = {
  'Client Support': "We're here when you need us — before, during, and long after launch.",
  'Integrity & Trust': "Your vision and data stay yours. We act with full transparency.",
  'Modern Tech': "Always using the latest, proven stack. No legacy code, no shortcuts.",
  'Quality': "No half-measures. Every pixel and every line of code is intentional.",
  'Value For Money': "Premium quality at honest pricing. You always know what you're paying for.",
  'Time Keeping': "Deadlines are sacred here. We plan, communicate, and always deliver.",
}

const ICONS = [HeartHandshake, Shield, Cpu, Star, Coins, Clock]

export default function PromiseSection({ heading, items }: { heading: string; items: PromiseItem[] }) {
  const list = items.length > 0 ? items : FALLBACK_ITEMS

  return (
    <section className="bg-dark border-t border-white/[0.05] py-28 lg:py-36 px-8 lg:px-16">

      {/* ── Header row ── */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-20">
        <div>
          <FadeUp>
            <div className="flex items-center gap-3 mb-7">
              <span className="w-5 h-px bg-orange/60" />
              <span className="text-[10.5px] uppercase tracking-[0.24em] text-white/22 font-medium">Our Commitment</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.06}>
            <h2
              className="font-[200] text-white leading-[0.9] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(36px, 4.8vw, 68px)' }}
            >
              {heading || 'Pinky Promise'}
            </h2>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <p className="text-white/22 text-[13.5px] leading-[1.85] font-light max-w-[300px] lg:text-right">
            Six non-negotiables we hold ourselves to on every single project.
          </p>
        </FadeUp>
      </div>

      {/* ── Commitment rows ── */}
      <div className="divide-y divide-white/[0.05]">
        {list.slice(0, 6).map((item, i) => {
          const Icon = ICONS[i] ?? Star
          const desc = DESCRIPTIONS[item.label] ?? 'A commitment we take seriously on every project.'
          return (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-start lg:items-center justify-between gap-6 py-7 hover:bg-[#0d0d0d] -mx-8 lg:-mx-16 px-8 lg:px-16 transition-colors duration-400"
            >
              <div className="flex items-start lg:items-center gap-5 lg:gap-8 flex-1">
                {/* Index */}
                <span className="text-[9.5px] text-white/14 uppercase tracking-[0.2em] font-medium tabular-nums shrink-0 pt-1 lg:pt-0 w-4">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon circle */}
                <div className="w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:border-orange/30 transition-colors duration-400">
                  <Icon
                    aria-hidden
                    size={14}
                    className="text-white/25 group-hover:text-orange transition-colors duration-400"
                  />
                </div>

                {/* Label + description */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-8 flex-1">
                  <p className="text-white font-normal text-[15px] lg:text-[17px] tracking-[-0.01em] shrink-0 group-hover:text-orange transition-colors duration-400">
                    {item.label}
                  </p>
                  <p className="text-white/20 text-[12px] font-light leading-relaxed lg:max-w-[380px]">
                    {desc}
                  </p>
                </div>
              </div>

              {/* Arrow */}
              <ArrowUpRight
                aria-hidden
                size={14}
                className="text-white/10 group-hover:text-orange/60 transition-all duration-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.div>
          )
        })}
      </div>

      {/* ── Bottom CTA ── */}
      <FadeUp delay={0.1}>
        <div className="flex items-center justify-between mt-16 pt-10 border-t border-white/[0.05]">
          <p className="text-white/18 text-[12px] font-light">Ready to work with a team that keeps its promises?</p>
          <Link
            href="/contact-us"
            className="group inline-flex items-center gap-2 text-[12px] text-white/30 hover:text-white transition-colors duration-300 min-h-[44px]"
          >
            Let's talk
            <ArrowUpRight
              aria-hidden
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </FadeUp>

    </section>
  )
}
