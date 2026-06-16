import FadeUp from '@/components/ui/FadeUp'
import type { ValuePillar } from '@/sanity/lib/types'

interface WhyUsSectionProps {
  heading: string
  pillars: ValuePillar[]
}

const FALLBACK_PILLARS = [
  { _id: '1', title: 'We Listen', description: "Your ideas are our north star. No jargon, no ego — just solutions that work for you.", iconName: '👂', order: 1 },
  { _id: '2', title: 'We Build to Last', description: "Our designs and code are solid, dependable, and deliciously efficient.", iconName: '🏗️', order: 2 },
  { _id: '3', title: 'We Are Young', description: "Young blood makes us agile, open to new ideas and creative.", iconName: '⚡', order: 3 },
  { _id: '4', title: "We're Fun", description: "Working with us feels more like collaborating with friends than a stiff corporate team.", iconName: '🎉', order: 4 },
  { _id: '5', title: 'We Take Care Of Community', description: "We strongly believe in supporting the local community and love to collaborate within it.", iconName: '🤝', order: 5 },
  { _id: '6', title: 'We Deliver On Time', description: "Deadlines are sacred. We plan, communicate, and deliver — always on schedule.", iconName: '⏰', order: 6 },
]

export default function WhyUsSection({ heading, pillars }: WhyUsSectionProps) {
  const displayPillars = pillars.length > 0 ? pillars : FALLBACK_PILLARS

  return (
    <section className="bg-dark py-24 px-6">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">Why Choose Us</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            className="text-light font-normal mt-3 mb-16"
            style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}
          >
            {heading || "We Are On Our Way To Be The Best"}
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPillars.slice(0, 6).map((pillar, i) => (
            <FadeUp key={pillar._id} delay={i * 0.08}>
              <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#e8522a]/40 transition-colors duration-300">
                <div className="text-3xl mb-4">{pillar.iconName || '●'}</div>
                <h3 className="text-light font-medium text-xl mb-3">{pillar.title}</h3>
                <p className="text-body text-[14px] leading-relaxed">{pillar.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
