import Link from 'next/link'
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

export default function WhyUsSection({ heading, pillars }: { heading: string; pillars: ValuePillar[] }) {
  const list = pillars.length > 0 ? pillars : FALLBACK

  return (
    <section className="bg-dark py-28 lg:py-40 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp>
          <div className="flex items-center gap-3 mb-16">
            <span className="w-4 h-px bg-orange/50" />
            <span className="text-[10.5px] uppercase tracking-[0.24em] text-white/20 font-medium">Why Us</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">
          <div>
            <FadeUp>
              <h2
                className="font-[200] text-white leading-[0.88] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(36px, 4.5vw, 60px)' }}
              >
                {heading || "Why the best choose us."}
              </h2>
            </FadeUp>
            <FadeUp delay={0.12}>
              <Link
                href="/about-us"
                className="group inline-flex items-center gap-2 mt-10 text-[12.5px] text-white/25 hover:text-white transition-colors duration-300"
              >
                About us
                <span className="w-5 h-px bg-white/20 group-hover:bg-white/60 transition-all duration-300 group-hover:w-7 inline-block" />
              </Link>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.04]">
            {list.slice(0, 6).map((p, i) => (
              <FadeUp key={p._id} delay={i * 0.05} className="group bg-dark hover:bg-[#0f0f0f] transition-colors duration-500 p-8 lg:p-9">
                <span className="text-[10px] text-white/15 uppercase tracking-[0.18em] font-medium">0{i + 1}</span>
                <h3 className="text-white font-light text-[17px] tracking-[-0.01em] mt-5 mb-3 group-hover:text-orange transition-colors duration-500">{p.title}</h3>
                <p className="text-white/25 text-[12.5px] leading-[1.75] font-light">{p.description}</p>
              </FadeUp>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
