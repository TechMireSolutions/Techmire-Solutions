import { Metadata } from 'next'
import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { teamMembersQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
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
      <section className="bg-dark pt-36 pb-20 px-6 lg:px-10 border-b border-white/[0.06]">
        <div className="w-full">
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Our People</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-normal text-white leading-[0.95]" style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}>
              Meet Our Team
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-[#f5f5f0] py-24 px-6 lg:px-10">
        <div className="w-full">
          <FadeUp>
            <div className="mb-14">
              <h2 className="font-normal text-dark text-3xl mb-3">The people behind the magic</h2>
              <p className="text-dark/50 text-[14px]">Designers, engineers, and strategists who love turning ideas into reality.</p>
            </div>
          </FadeUp>

          {team.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <FadeUp key={member._id} delay={i * 0.05}>
                  <div className="group">
                    <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gray-200 mb-4">
                      {member.photo ? (
                        <Image
                          src={urlFor(member.photo).width(400).height(533).url()}
                          alt={member.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 text-4xl font-light">{member.name[0]}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-dark font-medium text-[15px]">{member.name}</p>
                    <p className="text-dark/40 text-[13px] mt-0.5">{member.role}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          ) : (
            <p className="text-dark/40">Team members will appear here once added via Sanity CMS.</p>
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
