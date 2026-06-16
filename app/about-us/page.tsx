import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { valuePillarsQuery } from '@/sanity/lib/queries'
import FadeUp from '@/components/ui/FadeUp'
import type { ValuePillar } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TechmireSolutions — the software house and design studio on a mission to redefine what digital agencies can do.',
}

export default async function AboutPage() {
  const pillars: ValuePillar[] = await client.fetch(valuePillarsQuery).catch(() => [])

  const displayPillars = pillars.length > 0 ? pillars : [
    { _id: '1', title: 'We Listen', description: "Your ideas are our north star. No jargon, no ego — just solutions that work for you.", iconName: '👂', order: 1 },
    { _id: '2', title: 'We Build to Last', description: "Our designs and code are solid, dependable, and deliciously efficient.", iconName: '🏗️', order: 2 },
    { _id: '3', title: 'We Are Young', description: "Young blood makes us agile, open to new ideas and creative.", iconName: '⚡', order: 3 },
    { _id: '4', title: "We're Fun", description: "Working with us feels more like collaborating with friends than a stiff corporate team.", iconName: '🎉', order: 4 },
    { _id: '5', title: 'We Take Care Of Community', description: "We strongly believe in supporting the local community and love to collaborate within it.", iconName: '🤝', order: 5 },
    { _id: '6', title: 'We Deliver On Time', description: "Deadlines are sacred. We plan, communicate, and deliver — always on schedule.", iconName: '⏰', order: 6 },
  ]

  return (
    <>
      {/* Hero */}
      <section className="bg-dark pt-36 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">Who We Are</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-light font-normal mt-3"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0 }}
            >
              About Us
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-xl mt-4 max-w-xl">The Software House You Can Trust</p>
          </FadeUp>
        </div>
      </section>

      {/* Story */}
      <section className="bg-light py-20 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <FadeUp>
            <div>
              <h2 className="text-dark font-normal text-4xl mb-6">Our Story</h2>
              <p className="text-gray-600 text-[16px] leading-relaxed mb-4">
                At Techmire Solutions, we&apos;re on a mission to redefine what a Software House can do. From turning napkin sketches into full-blown apps to spearheading the Digital Transformation of your business, we&apos;ve mastered the art of making magic happen.
              </p>
              <p className="text-gray-600 text-[16px] leading-relaxed">
                We&apos;re not here to sell you software, digital design, or a digital transformation deal. We&apos;re here to help you build the future of your business. It&apos;s time to ditch the off-the-shelf solutions and partner with a team that understands and values you and your business like no one else.
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {[{ value: '4+', label: 'Years of Excellence' }, { value: '30+', label: 'Team Members' }, { value: '50+', label: 'Projects Delivered' }, { value: '20+', label: 'Happy Clients' }].map((stat) => (
                <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                  <p className="text-[#e8522a] font-normal text-5xl">{stat.value}</p>
                  <p className="text-gray-500 text-[13px] uppercase tracking-wider mt-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Values */}
      <section className="bg-dark py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <h2 className="text-light font-normal text-4xl mb-12">Our Values</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPillars.slice(0, 6).map((pillar, i) => (
              <FadeUp key={pillar._id} delay={i * 0.07}>
                <div className="bg-card border border-border rounded-2xl p-8 hover:border-[#e8522a]/40 transition-colors">
                  <div className="text-3xl mb-4">{pillar.iconName || '●'}</div>
                  <h3 className="text-light font-medium text-xl mb-3">{pillar.title}</h3>
                  <p className="text-body text-[14px] leading-relaxed">{pillar.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team teaser */}
      <section className="bg-warmgray py-20 px-6 text-center">
        <FadeUp>
          <h2 className="text-dark font-normal text-4xl mb-4">The People Behind The Magic</h2>
          <p className="text-gray-600 text-[15px] mb-8">
            Meet the talented team that makes it all happen.
          </p>
          <Link
            href="/meet-our-team"
            className="inline-flex items-center gap-2 bg-dark hover:bg-[#1a1a1a] text-white text-[14px] font-medium px-7 py-3.5 rounded-pill transition-colors"
          >
            Meet The Team ↗
          </Link>
        </FadeUp>
      </section>
    </>
  )
}
