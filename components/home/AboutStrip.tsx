'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { MoveRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import AnimatedText from '@/components/ui/AnimatedText'
import type { HomepageData } from '@/sanity/lib/types'

function Counter({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let frame = 0
    const timer = setInterval(() => {
      frame++
      setN(Math.floor((1 - Math.pow(1 - frame / 70, 3)) * to))
      if (frame >= 70) { setN(to); clearInterval(timer) }
    }, 16)
    return () => clearInterval(timer)
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
    <section className="bg-dark py-28 lg:py-40 px-8 lg:px-16">

      <FadeUp>
        <div className="flex items-center gap-3 mb-16">
          <span className="w-4 h-px bg-orange/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/18 font-medium">About Us</span>
        </div>
      </FadeUp>

      {/* Stat strip */}
      <FadeUp delay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/[0.05] mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`p-8 lg:p-10 group hover:bg-[#0f0f0f] transition-colors duration-500 ${
                i < stats.length - 1 ? 'border-b lg:border-b-0 border-r border-white/[0.05]' : ''
              }`}
            >
              <p
                className="font-[200] text-white group-hover:text-orange transition-colors duration-450 tracking-[-0.05em] tabular-nums"
                style={{ fontSize: 'clamp(48px, 5.5vw, 84px)', lineHeight: 1 }}
              >
                <Counter to={s.to} suffix={s.suffix} />
              </p>
              <p className="text-white/18 text-[9.5px] uppercase tracking-[0.24em] mt-3 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </FadeUp>

      {/* Image + Text + CTA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side: Image */}
        <FadeUp>
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={data?.aboutImage ? urlFor(data.aboutImage).url() : "/about-image.png"}
              alt="Techmire Solutions Team"
              fill
              quality={60}
              sizes="(max-width: 768px) 70vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-dark/60 via-transparent to-transparent pointer-events-none" />
          </div>
        </FadeUp>

        {/* Right Side: Text */}
        <div>
          <div className="mb-10" style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}>
            <AnimatedText
              el="h2"
              text={data?.aboutHeading || "The Software House You Can Trust"}
              type="word"
              delay={0.1}
              className="font-[200] text-white leading-[0.9] tracking-[-0.04em]"
            />
          </div>

          <FadeUp delay={0.2}>
            <p className="text-white/40 text-[15px] leading-[1.9] font-light mb-10">
              {data?.aboutParagraph || "At Techmire Solutions, we're on a mission to redefine what a software house can do. We're not here to just sell you software; we are here to partner with you and ensure your digital footprint is strong, fast, and scalable."}
            </p>
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-3 text-[13px] text-orange hover:text-white transition-colors duration-300 min-h-[44px]"
            >
              <span className="border-b border-orange/30 group-hover:border-white/50 pb-1 transition-colors">Read our story</span>
              <MoveRight
                aria-hidden
                size={16}
                className="group-hover:translate-x-2 transition-transform duration-350"
              />
            </Link>
          </FadeUp>
        </div>
      </div>

    </section>
  )
}
