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
  description: 'The talented people behind TechmireSolutions — a team of designers, developers, and strategists passionate about building great digital products.',
}

export default async function TeamPage() {
  const team: TeamMember[] = await client.fetch(teamMembersQuery).catch(() => [])

  return (
    <>
      {/* Dark hero */}
      <section className="bg-dark pt-36 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <FadeUp>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">Our People</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-light font-normal mt-3"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0 }}
            >
              Meet Our Team
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Team grid */}
      <section className="bg-warmgray py-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <FadeUp>
            <div className="mb-12 max-w-2xl">
              <h2 className="text-dark font-normal text-3xl mb-4">The people behind the magic</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                A passionate crew of designers, engineers, and strategists who love turning ideas into reality.
              </p>
            </div>
          </FadeUp>

          {team.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <FadeUp key={member._id} delay={i * 0.06}>
                  <div className="group text-center">
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-200 mb-4">
                      {member.photo ? (
                        <Image
                          src={urlFor(member.photo).width(400).height(400).url()}
                          alt={member.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <span className="text-gray-500 text-4xl font-light">{member.name[0]}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-dark font-medium text-base">{member.name}</h3>
                    <p className="text-gray-500 text-[13px] mt-1">{member.role}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Team members will appear here once added via Sanity CMS.</p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark py-16 px-6 text-center">
        <FadeUp>
          <p className="text-body mb-6">Want to join our team?</p>
          <a
            href="mailto:connect@techmiresolutions.com"
            className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-[14px] px-6 py-3 rounded-pill transition-colors"
          >
            Send us your portfolio ↗
          </a>
        </FadeUp>
      </section>
    </>
  )
}
