import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { valuePillarsQuery, aboutPageQuery } from '@/sanity/lib/queries'
import FadeUp from '@/components/ui/FadeUp'
import InnerPageHero from '@/components/ui/InnerPageHero'
import MagneticHoverCard from '@/components/ui/MagneticHoverCard'
import AnimatedText from '@/components/ui/AnimatedText'
import type { ValuePillar, AboutPageData } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'About Us',
  description: 'TechmireSolutions â€” the software house and design studio on a mission to redefine digital.',
}

export default async function AboutPage() {
  const pillars: ValuePillar[] = await client.fetch(valuePillarsQuery).catch(() => [])
  const pageData: AboutPageData | null = await client.fetch(aboutPageQuery).catch(() => null)

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
      <InnerPageHero 
        title={pageData?.hero?.title || "About Us"}
        subtitle={pageData?.hero?.subtitle || "The Software House You Can Trust."}
        overline={pageData?.hero?.overline || "Who We Are"}
      />

      {/* Story */}
      <section className="bg-light py-24 px-6 lg:px-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-[1200px] mx-auto">
          <div>
            <div style={{ fontSize: '36px' }} className="mb-8">
              <AnimatedText
                el="h2"
                text={pageData?.story?.title || "Our Story"}
                type="word"
                className="font-[200] text-dark leading-[0.9]"
              />
            </div>
            <FadeUp delay={0.2}>
              <p className="text-dark/50 text-[15px] leading-[1.8] mb-6">
                {pageData?.story?.paragraph1 || "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From turning napkin sketches into full-blown apps to spearheading the Digital Transformation of your business, we've mastered the art of making magic happen."}
              </p>
              <p className="text-dark/50 text-[15px] leading-[1.8]">
                {pageData?.story?.paragraph2 || "We're not here to sell you software or a digital transformation deal. We're here to help you build the future of your business — ditch the off-the-shelf and partner with a team that understands and values you like no one else."}
              </p>
            </FadeUp>
          </div>
          <div className="grid grid-cols-2 gap-px bg-dark/10">
            {(pageData?.stats || [
              { value: '4+', label: 'Years in business' }, { value: '30+', label: 'Team members' },
              { value: '50+', label: 'Projects delivered' }, { value: '20+', label: 'Happy clients' },
            ]).map((s) => (
              <FadeUp key={s.label} className="bg-light p-8 group hover:bg-[#e6e6e2] transition-colors duration-500">
                <p className="font-[200] text-dark group-hover:text-orange transition-colors duration-400" style={{ fontSize: 'clamp(36px, 3.5vw, 52px)', lineHeight: 1 }}>{s.value}</p>
                <p className="text-dark/40 text-[10px] uppercase tracking-[0.2em] mt-3 font-medium">{s.label}</p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-dark py-24 px-6 lg:px-10 border-t border-white/[0.05]">
        <div className="w-full max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="flex items-center gap-3 mb-14">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Our Values</span>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]">
            {list.slice(0, 6).map((p, i) => (
              <MagneticHoverCard key={p._id} delay={0.1} index={i} className="p-8 lg:p-10">
                <span className="text-[11px] text-white/20 uppercase tracking-[0.15em] font-medium">0{i + 1}</span>
                <h3 className="text-white font-[200] text-xl mt-4 mb-3 group-hover:text-orange transition-colors duration-400">{p.title}</h3>
                <p className="text-white/30 text-[13px] leading-relaxed font-light">{p.description}</p>
              </MagneticHoverCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="bg-light py-20 px-6 lg:px-10 border-t border-dark/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-[1200px] mx-auto">
          <div style={{ fontSize: 'clamp(24px, 4vw, 36px)' }}>
            <AnimatedText
              el="h2"
              text={pageData?.teamTeaser?.title || "The People Behind The Magic"}
              type="word"
              className="font-[200] text-dark"
            />
          </div>
          <FadeUp delay={0.2}>
            <Link href="/meet-our-team" className="group inline-flex items-center gap-2 bg-dark hover:bg-orange text-white text-[13px] font-medium px-7 py-3.5 rounded-full transition-all duration-300 shrink-0">
              {pageData?.teamTeaser?.buttonText || "Meet The Team"}
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">↗</span>
            </Link>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
