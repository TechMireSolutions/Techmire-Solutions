'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import FadeUp from '@/components/ui/FadeUp'
import type { HomepageData } from '@/sanity/lib/types'

function Counter({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let f = 0
    const t = setInterval(() => {
      f++
      setN(Math.floor((1 - Math.pow(1 - f / 70, 3)) * to))
      if (f >= 70) { setN(to); clearInterval(t) }
    }, 16)
    return () => clearInterval(t)
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

export default function AboutStrip({ data }: { data: HomepageData | null }) {
  const stats = [
    { to: 4, suffix: '+', label: 'Years in Business' },
    { to: 30, suffix: '+', label: 'Team Members' },
    { to: 50, suffix: '+', label: 'Projects Delivered' },
    { to: 20, suffix: '+', label: 'Happy Clients' },
  ]

  return (
    <section className="bg-dark py-28 lg:py-40 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <span className="w-4 h-px bg-orange/40" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/18 font-medium">About Us</span>
          </div>
        </FadeUp>

        {/* Full-width stat strip */}
        <FadeUp delay={0.05}>
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.05] mb-20">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`p-8 lg:p-10 group hover:bg-[#0f0f0f] transition-colors duration-500 ${i < 3 ? 'border-b lg:border-b-0 border-r border-white/[0.05]' : ''} ${i === 1 ? 'border-r lg:border-r' : ''}`}
              >
                <p
                  className="font-[200] text-white group-hover:text-orange transition-colors duration-500 tracking-[-0.05em]"
                  style={{ fontSize: 'clamp(52px, 5.5vw, 88px)', lineHeight: 1 }}
                >
                  <Counter to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-white/20 text-[10px] uppercase tracking-[0.22em] mt-3 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Text + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-end">
          <FadeUp>
            <h2
              className="font-[200] text-white leading-[0.9] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
            >
              {data?.aboutHeading || "The Software House You Can Trust"}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-white/25 text-[14px] leading-[1.9] font-light mb-8">
              {data?.aboutParagraph || "At Techmire Solutions, we're on a mission to redefine what a software house can do. From turning napkin sketches into full-blown apps to spearheading digital transformation."}
            </p>
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-3 text-[12px] text-white/25 hover:text-white transition-colors duration-300"
            >
              Read our story
              <span className="w-6 h-px bg-white/20 group-hover:w-10 group-hover:bg-white/50 transition-all duration-400 inline-block" />
            </Link>
          </FadeUp>
        </div>

      </div>
    </section>
  )
}
