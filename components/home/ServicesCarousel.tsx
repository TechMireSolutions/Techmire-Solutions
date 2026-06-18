'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Globe, Code2, TrendingUp, Palette, Megaphone, Smartphone, Layers, Zap, ArrowUpRight } from 'lucide-react'
import FadeUp from '@/components/ui/FadeUp'
import MagneticButton from '@/components/ui/MagneticButton'
import type { Service } from '@/sanity/lib/types'

const FALLBACK: Service[] = [
  { _id: '1', title: 'Web Development', shortDescription: 'Fast, functional sites built for performance.', slug: { current: 'web-development' }, parentCategory: 'top-level', order: 1 },
  { _id: '2', title: 'Software Development', shortDescription: 'Custom apps and enterprise systems.', slug: { current: 'software-solution' }, parentCategory: 'top-level', order: 2 },
  { _id: '3', title: 'SEO Optimisation', shortDescription: 'Rank higher, stay visible, own your niche.', slug: { current: 'search-engine-optimization' }, parentCategory: 'top-level', order: 3 },
  { _id: '4', title: 'Graphic Design', shortDescription: 'Identities and visuals that convert.', slug: { current: 'graphic-design' }, parentCategory: 'top-level', order: 4 },
  { _id: '5', title: 'Digital Marketing', shortDescription: 'Data-driven campaigns that grow revenue.', slug: { current: 'digital-marketing' }, parentCategory: 'top-level', order: 5 },
  { _id: '6', title: 'App Development', shortDescription: 'Mobile apps users love to open.', slug: { current: 'app-development' }, parentCategory: 'top-level', order: 6 },
  { _id: '7', title: 'UI/UX Design', shortDescription: 'Interfaces that are intuitive and beautiful.', slug: { current: 'ui-ux-design' }, parentCategory: 'top-level', order: 7 },
  { _id: '8', title: 'Branding', shortDescription: 'Strategic identities built to last.', slug: { current: 'branding' }, parentCategory: 'top-level', order: 8 },
]

const ICON_MAP: Record<string, React.ElementType> = {
  'web-development': Globe,
  'software-solution': Code2,
  'search-engine-optimization': TrendingUp,
  'graphic-design': Palette,
  'digital-marketing': Megaphone,
  'app-development': Smartphone,
  'ui-ux-design': Layers,
  'branding': Zap,
}

export default function ServicesCarousel({ heading, services }: { heading: string; services: Service[] }) {
  const list = services.length > 0 ? services : FALLBACK
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="bg-light py-28 lg:py-40 px-8 lg:px-16">
      <FadeUp>
        <div className="flex items-end justify-between mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-4 h-px bg-dark/20" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-dark/30 font-medium">Our Services</span>
            </div>
            <h2
              className="font-[200] text-dark leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
            >
              {heading || 'What We Do'}
            </h2>
          </div>
          <MagneticButton
            href="/graphic-design"
            className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-dark/30 hover:text-dark transition-colors pb-1 border-b border-dark/10 hover:border-dark/30"
          >
            All services ↗
          </MagneticButton>
        </div>
      </FadeUp>

      <div className="border-t border-dark/[0.07]">
        {list.map((s, i) => {
          const href = s.parentCategory === 'top-level' ? `/${s.slug.current}` : `/services/${s.slug.current}`
          const isHov = hovered === s._id
          const dimmed = hovered !== null && !isHov
          const Icon = ICON_MAP[s.slug.current] || Globe

          return (
            <motion.div
              key={s._id}
              animate={{ opacity: dimmed ? 0.22 : 1 }}
              transition={{ duration: 0.2 }}
              onHoverStart={() => setHovered(s._id)}
              onHoverEnd={() => setHovered(null)}
              className="relative overflow-hidden"
            >
              {/* Dark sweep on hover */}
              <motion.div
                className="absolute inset-0 bg-dark pointer-events-none"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHov ? 1 : 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                style={{ originX: 0 }}
              />

              {/* Editorial number watermark */}
              <motion.span
                animate={{ opacity: isHov ? 0.05 : 0, x: isHov ? 0 : 24 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-20 top-1/2 -translate-y-1/2 font-[200] text-white pointer-events-none select-none"
                style={{ fontSize: 'clamp(80px, 12vw, 180px)', lineHeight: 1, letterSpacing: '-0.05em' }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </motion.span>

              <Link
                href={href}
                className="relative group flex items-center justify-between py-5 border-b border-dark/[0.07] min-h-[64px]"
              >
                <div className="flex items-center gap-6 lg:gap-12">
                  <span className={`text-[10px] font-medium tabular-nums w-4 shrink-0 transition-colors duration-300 ${isHov ? 'text-white/22' : 'text-dark/18'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-3.5">
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${isHov ? 'border-white/15 bg-white/5' : 'border-dark/10'}`}>
                      <Icon
                        aria-hidden
                        size={12}
                        className={`transition-colors duration-300 ${isHov ? 'text-white/50' : 'text-dark/22'}`}
                      />
                    </div>
                    <span
                      className={`font-[200] leading-none tracking-[-0.03em] transition-colors duration-300 ${isHov ? 'text-white' : 'text-dark'}`}
                      style={{ fontSize: 'clamp(22px, 2.8vw, 40px)' }}
                    >
                      {s.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-5 lg:gap-8">
                  <span className={`hidden lg:block text-[11.5px] font-light max-w-[220px] line-clamp-1 transition-colors duration-300 ${isHov ? 'text-white/32' : 'text-dark/22'}`}>
                    {s.shortDescription}
                  </span>
                  <motion.div
                    animate={{
                      scale: isHov ? 1.08 : 1,
                      backgroundColor: isHov ? '#EDEAE4' : 'transparent',
                      borderColor: isHov ? '#EDEAE4' : 'rgba(0,0,0,0.1)',
                      color: isHov ? '#080808' : 'rgba(0,0,0,0.18)',
                    }}
                    transition={{ duration: 0.28 }}
                    className="w-9 h-9 rounded-full border flex items-center justify-center shrink-0"
                  >
                    <ArrowUpRight aria-hidden size={13} />
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
