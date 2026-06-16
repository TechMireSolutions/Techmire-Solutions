import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { valuePillarsQuery } from '@/sanity/lib/queries'
import FadeUp from '@/components/ui/FadeUp'
import type { ValuePillar } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'About Us',
  description: 'TechmireSolutions — the software house and design studio on a mission to redefine digital.',
}

export default async function AboutPage() {
  const pillars: ValuePillar[] = await client.fetch(valuePillarsQuery).catch(() => [])

  const list = pillars.length > 0 ? pillars : [
    { _id: '1', title: 'We Listen', description: "Your ideas are our north star. No jargon, no ego.", order: 1 },
    { _id: '2', title: 'We Build to Last', description: "Solid, dependable, and deliciously efficient.", order: 2 },
    { _id: '3', title: 'We Are Young', description: "Agile, open to new ideas, relentlessly creative.", order: 3 },
    { _id: '4', title: "We're Fun", description: "More like collaborating with friends than a corporate team.", order: 4 },
    { _id: '5', title: 'We Care for Community', description: "Supporting the local community and collaborating within it.", order: 5 },
    { _id: '6', title: 'We Deliver On Time', description: "Deadlines are sacred. We plan, communicate, and deliver.", order: 6 },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-36 pb-20 px-6 lg:px-10 border-b border-white/[0.06]">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Who We Are</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-normal text-white leading-[0.95]" style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
              About Us
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-white/40 text-[17px] mt-6 max-w-lg leading-relaxed">The Software House You Can Trust.</p>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#f5f5f0] py-24 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <FadeUp>
            <h2 className="font-normal text-dark text-4xl mb-6">Our Story</h2>
            <p className="text-dark/50 text-[15px] leading-[1.8] mb-4">
              At Techmire Solutions, we're on a mission to redefine what a Software House can do. From turning napkin sketches into full-blown apps to spearheading the Digital Transformation of your business, we've mastered the art of making magic happen.
            </p>
            <p className="text-dark/50 text-[15px] leading-[1.8]">
              We're not here to sell you software or a digital transformation deal. We're here to help you build the future of your business — ditch the off-the-shelf and partner with a team that understands and values you like no one else.
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 gap-px bg-dark/10">
            {[
              { v: '4+', l: 'Years in business' }, { v: '30+', l: 'Team members' },
              { v: '50+', l: 'Projects delivered' }, { v: '20+', l: 'Happy clients' },
            ].map((s) => (
              <FadeUp key={s.l} className="bg-[#f5f5f0] p-8">
                <p className="font-normal text-dark" style={{ fontSize: 'clamp(36px, 3.5vw, 52px)', lineHeight: 1 }}>{s.v}</p>
                <p className="text-dark/40 text-[12px] uppercase tracking-[0.12em] mt-3">{s.l}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-dark py-24 px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-14">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Our Values</span>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {list.slice(0, 6).map((p, i) => (
              <FadeUp key={p._id} delay={i * 0.05} className="bg-dark p-8 lg:p-10">
                <span className="text-[11px] text-white/20 uppercase tracking-[0.15em]">0{i + 1}</span>
                <h3 className="text-white font-normal text-xl mt-4 mb-3">{p.title}</h3>
                <p className="text-white/30 text-[13px] leading-relaxed">{p.description}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="bg-[#f5f5f0] py-20 px-6 lg:px-10 border-t border-dark/10">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <FadeUp>
            <h2 className="font-normal text-dark text-3xl">The People Behind The Magic</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/meet-our-team" className="inline-flex items-center gap-2 bg-dark hover:bg-dark/80 text-white text-[13px] font-medium px-6 py-3 rounded-pill transition-colors shrink-0">
              Meet The Team ↗
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
