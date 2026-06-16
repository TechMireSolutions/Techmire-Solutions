import Link from 'next/link'
import FadeUp from '@/components/ui/FadeUp'
import type { ValuePillar } from '@/sanity/lib/types'

interface WhyUsSectionProps {
  heading: string
  pillars: ValuePillar[]
}

const FALLBACK_PILLARS: ValuePillar[] = [
  { _id: '1', title: 'We Listen', description: "Your ideas are our north star. No jargon, no ego — just solutions that work for you.", order: 1 },
  { _id: '2', title: 'We Build to Last', description: "Our designs and code are solid, dependable, and deliciously efficient.", order: 2 },
  { _id: '3', title: 'We Are Young', description: "Young blood makes us agile, open to new ideas and relentlessly creative.", order: 3 },
  { _id: '4', title: "We're Fun", description: "Working with us feels more like collaborating with friends than a stiff corporate team.", order: 4 },
  { _id: '5', title: 'We Care for Community', description: "We strongly believe in supporting the local community and love to collaborate within it.", order: 5 },
  { _id: '6', title: 'We Deliver On Time', description: "Deadlines are sacred. We plan, communicate, and deliver — always on schedule.", order: 6 },
]

export default function WhyUsSection({ heading, pillars }: WhyUsSectionProps) {
  const list = pillars.length > 0 ? pillars : FALLBACK_PILLARS

  return (
    <section className="bg-dark py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp>
          <div className="flex items-center gap-3 mb-14">
            <span className="w-6 h-px bg-orange" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Why Us</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: heading + CTA */}
          <div>
            <FadeUp>
              <h2
                className="font-normal text-white leading-[1.0]"
                style={{ fontSize: 'clamp(36px, 4.5vw, 64px)' }}
              >
                {heading || "We Are On Our Way To Be The Best"}
              </h2>
            </FadeUp>
            <FadeUp delay={0.1}>
              <Link
                href="/about-us"
                className="inline-flex items-center gap-2 mt-10 bg-white hover:bg-white/90 text-dark text-[13px] font-medium px-6 py-3 rounded-pill transition-colors"
              >
                About us ↗
              </Link>
            </FadeUp>
          </div>

          {/* Right: pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.05]">
            {list.slice(0, 6).map((pillar, i) => (
              <FadeUp key={pillar._id} delay={i * 0.06} className="bg-dark p-8">
                <span className="text-[11px] text-white/20 uppercase tracking-[0.15em] font-medium">0{i + 1}</span>
                <h3 className="text-white font-normal text-[18px] mt-4 mb-3">{pillar.title}</h3>
                <p className="text-white/30 text-[13px] leading-relaxed">{pillar.description}</p>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
