'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Pen, Code2, TrendingUp, Target } from 'lucide-react'

const DISCIPLINES = [
  {
    icon: Pen,
    title: 'Design',
    desc: 'UI/UX, Branding, Graphic Design',
    href: '/graphic-design',
  },
  {
    icon: Code2,
    title: 'Development',
    desc: 'Web, App & Software Engineering',
    href: '/web-development',
  },
  {
    icon: TrendingUp,
    title: 'Marketing',
    desc: 'SEO, Social Media & Campaigns',
    href: '/digital-marketing',
  },
  {
    icon: Target,
    title: 'Strategy',
    desc: 'Research, Planning & GTM',
    href: '/about-us',
  },
]

function ArrowLink({ href, label }: { href: string; label: string }) {
  return (
    <div className="group relative inline-flex pb-0.5">
      <Link
        href={href}
        className="flex items-center gap-1.5 text-[13.5px] font-normal text-[#fcfdff] leading-none no-underline min-h-[44px]"
      >
        <span>{label}</span>
        <span aria-hidden="true" className="relative overflow-hidden inline-flex w-[13px] h-[13px] self-center">
          <span className="absolute inset-0 flex items-center justify-center text-[11px] leading-none transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
          <span className="absolute inset-0 flex items-center justify-center text-[11px] leading-none -translate-x-2 translate-y-2 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">↗</span>
        </span>
      </Link>
      <span className="absolute bottom-0 left-0 block h-px bg-[#fcfdff]/40 w-0 group-hover:w-full transition-all duration-[350ms] ease-out" />
    </div>
  )
}

export default function ExpertiseSection() {
  return (
    <section className="bg-dark overflow-hidden">
      <div className="px-8 lg:px-16 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

          {/* ── Left — stadium pill ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[38%] flex-shrink-0"
          >
            <div
              className="relative overflow-hidden bg-[#0d0d0d] border border-white/[0.07]"
              style={{ borderRadius: '9999px', aspectRatio: '3 / 4.4' }}
            >
              {/* Interior grid */}
              <svg
                aria-hidden
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 420 620"
                fill="none"
                style={{ opacity: 0.06 }}
                preserveAspectRatio="xMidYMid slice"
              >
                {Array.from({ length: 19 }).map((_, i) => (
                  <line key={`h${i}`} x1={0} y1={i * 35} x2={420} y2={i * 35} stroke="white" strokeWidth="0.4" />
                ))}
                {Array.from({ length: 13 }).map((_, i) => (
                  <line key={`v${i}`} x1={i * 35} y1={0} x2={i * 35} y2={620} stroke="white" strokeWidth="0.4" />
                ))}
                {[70, 140, 210, 280, 350].map(r => (
                  <circle key={r} cx={210} cy={310} r={r} stroke="white" strokeWidth="0.5" fill="none" />
                ))}
              </svg>

              {/* Bottom gradient */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: '62%',
                  background: 'linear-gradient(to top, rgba(8,8,8,0.97) 20%, rgba(8,8,8,0.6) 60%, transparent 100%)',
                }}
              />

              {/* Text inside pill */}
              <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 lg:px-10 lg:pb-12">
                <p
                  className="text-white/42 leading-relaxed font-light mb-7"
                  style={{ fontSize: '13px', maxWidth: '280px' }}
                >
                  We're on a mission to redefine what a software house can do — from turning ideas into apps to spearheading full digital transformation.
                </p>
                <ArrowLink href="/contact-us" label="Work with us" />
              </div>
            </div>
          </motion.div>

          {/* ── Right — heading + disciplines ── */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col lg:pt-4"
          >
            <h2
              className="text-white font-normal leading-[1.18] tracking-[-0.025em] mb-12"
              style={{ fontSize: 'clamp(22px, 2.6vw, 40px)' }}
            >
              From ideas to impact — we craft digital products that grow your business.
            </h2>

            {/* 2×2 disciplines grid */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.05] border border-white/[0.05] mb-10">
              {DISCIPLINES.map((d, i) => {
                const Icon = d.icon
                return (
                  <motion.div
                    key={d.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="group bg-dark hover:bg-[#0f0f0f] transition-colors duration-500 p-6 lg:p-7"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center mb-4 group-hover:border-orange/30 transition-colors duration-500">
                      <Icon
                        aria-hidden
                        size={13}
                        className="text-white/30 group-hover:text-orange transition-colors duration-500"
                      />
                    </div>
                    <p className="text-white font-normal text-[14px] tracking-[-0.01em] mb-1.5 group-hover:text-orange transition-colors duration-400">
                      {d.title}
                    </p>
                    <p className="text-white/28 text-[11.5px] font-light leading-relaxed">
                      {d.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            <ArrowLink href="/graphic-design" label="View all services" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
