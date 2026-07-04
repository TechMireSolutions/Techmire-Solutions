import { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { teamMembersQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import InnerPageHero from '@/components/ui/InnerPageHero'
import MagneticHoverCard from '@/components/ui/MagneticHoverCard'
import AnimatedText from '@/components/ui/AnimatedText'
import type { TeamMember } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Meet Our Team',
  description: 'The talented people behind TechmireSolutions.',
}

export default async function TeamPage() {
  const team: TeamMember[] = await client.fetch(teamMembersQuery).catch(() => [])

  return (
    <>
      {/* Hero */}
      <InnerPageHero
        title="Meet Our Team"
        subtitle="The talented designers, engineers, and strategists behind TechmireSolutions."
        overline="Our People"
      />

      {/* Team grid */}
      <section className="bg-dark py-24 px-6 lg:px-10">
        <div className="w-full max-w-[1200px] mx-auto">
          <FadeUp>
            <div className="mb-14">
              <div style={{ fontSize: 'clamp(28px, 4vw, 42px)' }} className="mb-3">
                <AnimatedText
                  el="h2"
                  text="The people behind the magic"
                  type="word"
                  className="font-[200] text-white"
                />
              </div>
              <p className="text-white/40 text-[15px] font-light">Designers, engineers, and strategists who love turning ideas into reality.</p>
            </div>
          </FadeUp>

          {team.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <MagneticHoverCard key={member._id} delay={0.1} index={i} className="p-4 rounded-xl border border-white/[0.05]">
                  <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-white/5 mb-4 group-hover:scale-[1.02] transition-transform duration-500">
                    {member.photo ? (
                      <Image
                        src={urlFor(member.photo).width(400).height(533).url()}
                        alt={member.name}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 text-4xl font-light">{member.name[0]}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white font-medium text-[15px] group-hover:text-orange transition-colors duration-400">{member.name}</p>
                  <p className="text-white/40 text-[13px] mt-0.5 font-light">{member.role}</p>
                </MagneticHoverCard>
              ))}
            </div>
          ) : (
            <p className="text-white/40 font-light">Team members will appear here once added via Sanity CMS.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-16 px-6 lg:px-10 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <FadeUp>
            <p className="text-white/30 text-[14px]">Want to join us?</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <a
              href="mailto:connect@techmiresolutions.com"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/30 text-white text-[13px] px-6 py-3 rounded-pill transition-colors"
            >
              Send us your portfolio â†—
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  )
}
