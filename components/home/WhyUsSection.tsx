'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Ear, HardDriveUpload, Zap, Smile, Heart, Clock } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'
import type { ValuePillar } from '@/sanity/lib/types'

const FALLBACK: ValuePillar[] = [
  { _id: '1', title: 'We Listen', description: "Your ideas are our north star. No jargon, no ego — just solutions that work.", order: 1 },
  { _id: '2', title: 'We Build to Last', description: "Solid, dependable, and deliciously efficient code and design.", order: 2 },
  { _id: '3', title: 'We Are Young', description: "Young blood keeps us agile, open to new ideas, and relentlessly creative.", order: 3 },
  { _id: '4', title: "We're Fun", description: "Collaborating with us feels more like working with friends than a stiff agency.", order: 4 },
  { _id: '5', title: 'We Care for Community', description: "We believe in supporting the local community and love to collaborate within it.", order: 5 },
  { _id: '6', title: 'We Deliver On Time', description: "Deadlines are sacred. We plan, communicate, and deliver — always on schedule.", order: 6 },
]

const ICONS = [Ear, HardDriveUpload, Zap, Smile, Heart, Clock]

export default function WhyUsSection({ heading, pillars }: { heading: string; pillars: ValuePillar[] }) {
  const list = pillars.length > 0 ? pillars : FALLBACK

  return (
    <section className="bg-dark py-28 lg:py-40 px-8 lg:px-16">

      <FadeUp>
        <div className="flex items-center gap-3 mb-16">
          <span className="w-4 h-px bg-orange/50" />
          <span className="text-[10.5px] uppercase tracking-[0.24em] text-white/20 font-medium">Why Us</span>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">

        {/* Left — heading + CTA */}
        <div>
          <FadeUp>
            <h2
              className="font-[200] text-white leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}
            >
              {heading || "We are on our way to be the best."}
            </h2>
          </FadeUp>
          <FadeUp delay={0.12}>
            <p className="text-white/22 text-[13.5px] leading-[1.85] font-light mt-7 mb-10 max-w-[280px]">
              Five reasons our clients stay, grow, and bring their friends.
            </p>
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-2 text-[12.5px] text-white/25 hover:text-white transition-colors duration-300"
            >
              About us
              <span className="w-5 h-px bg-white/20 group-hover:bg-white/55 transition-all duration-350 group-hover:w-8 inline-block" />
            </Link>
          </FadeUp>
        </div>

        {/* Right — values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04]">
          {list.slice(0, 6).map((p, i) => {
            const Icon = ICONS[i] ?? Zap
            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-dark hover:bg-[#0f0f0f] transition-colors duration-500 p-8 lg:p-9"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-orange/25 transition-colors duration-500">
                    <Icon
                      aria-hidden
                      size={12}
                      className="text-white/22 group-hover:text-orange transition-colors duration-500"
                    />
                  </div>
                  <span className="text-[9.5px] text-white/14 uppercase tracking-[0.2em] font-medium">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-white font-light text-[16px] tracking-[-0.01em] mb-3 group-hover:text-orange transition-colors duration-400">
                  {p.title}
                </h3>
                <p className="text-white/22 text-[12px] leading-[1.78] font-light">{p.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
