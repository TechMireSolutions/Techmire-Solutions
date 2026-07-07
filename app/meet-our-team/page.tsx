import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { teamMembersQuery } from '@/sanity/lib/queries'
import FadeUp from '@/components/ui/FadeUp'
import InnerPageHero from '@/components/ui/InnerPageHero'
import TeamScrollWrapper from '@/components/ui/TeamScrollWrapper'
import type { TeamMember } from '@/sanity/lib/types'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Meet Our Team',
  description: 'The brilliant minds driving digital innovation at TechmireSolutions.',
}

export default async function TeamPage() {
  const team: TeamMember[] = await client.fetch(teamMembersQuery).catch(() => [])

  return (
    <div className="relative min-h-screen bg-dark text-white">
      <div className="relative z-10">
        {/* Hero */}
        <InnerPageHero
          title="Meet Our Team"
          subtitle="The brilliant designers, engineers, and strategists behind TechmireSolutions."
          overline="Our People"
        />

        {/* Cinematic Horizontal Scroll Team Section */}
        <TeamScrollWrapper team={team} />

        {/* CTA */}
        <section className="bg-dark py-32 px-6 lg:px-10 border-t border-white/[0.04] relative z-20">
          <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <FadeUp>
              <div className="max-w-2xl">
                <h3 className="text-4xl md:text-6xl tracking-tighter font-light mb-6 text-white leading-tight">
                  Ready to join the <br className="hidden md:block"/> revolution?
                </h3>
                <p className="text-white/40 text-xl font-light">We are always looking for exceptional talent to join our remote-first team.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <a
                href="mailto:connect@techmiresolutions.com"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-6 px-10 font-medium text-dark bg-white hover:bg-transparent hover:text-white transition-all duration-300"
              >
                <span className="absolute inset-0 bg-transparent border border-white rounded-full scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out" />
                <span className="relative flex items-center gap-4 text-lg">
                  Send your portfolio
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500 ease-out" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </FadeUp>
          </div>
        </section>
      </div>
    </div>
  )
}
