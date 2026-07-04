import { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { teamMembersQuery } from '@/sanity/lib/queries'
import FadeUp from '@/components/ui/FadeUp'
import InnerPageHero from '@/components/ui/InnerPageHero'
import AnimatedText from '@/components/ui/AnimatedText'
import AnimatedTeamGrid from '@/components/ui/AnimatedTeamGrid'
import type { TeamMember } from '@/sanity/lib/types'
// If you want a cool background, we can import Lightfall or FloatingLines here, 
// assuming they exist in components/ui/. I saw them in components/ui earlier.
import Lightfall from '@/components/Lightfall'

export const revalidate = 60
export const metadata: Metadata = {
  title: 'Meet Our Team',
  description: 'The talented people behind TechmireSolutions.',
}

export default async function TeamPage() {
  const team: TeamMember[] = await client.fetch(teamMembersQuery).catch(() => [])

  return (
    <div className="relative min-h-screen bg-dark text-white overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <Lightfall colors={['#ffffff']} speed={0.5} density={0.3} className="" dpr={1} mixBlendMode="screen" />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <InnerPageHero
          title="Meet Our Team"
          subtitle="The talented designers, engineers, and strategists behind TechmireSolutions."
          overline="Our People"
        />

        {/* Team Section */}
        <section className="py-32 px-6 lg:px-10 relative">
          {/* subtle radial gradient for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="w-full max-w-[1400px] mx-auto relative z-10">
            <FadeUp>
              <div className="mb-20 text-center max-w-3xl mx-auto">
                <div style={{ fontSize: 'clamp(32px, 5vw, 56px)' }} className="mb-6 tracking-tight leading-tight">
                  <AnimatedText
                    el="h2"
                    text="The minds behind the magic."
                    type="word"
                    className="font-light text-white"
                  />
                </div>
                <p className="text-white/50 text-lg font-light leading-relaxed">
                  We are a collective of passionate creators, engineers, and strategists dedicated to turning bold ideas into digital reality.
                </p>
              </div>
            </FadeUp>

            <AnimatedTeamGrid team={team} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark/80 backdrop-blur-xl py-24 px-6 lg:px-10 border-t border-white/[0.04]">
          <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <FadeUp>
              <div className="max-w-xl">
                <h3 className="text-3xl font-light mb-4 text-white">Ready to join the revolution?</h3>
                <p className="text-white/40 text-lg font-light">We are always looking for exceptional talent to join our remote-first team.</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <a
                href="mailto:connect@techmiresolutions.com"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-8 font-medium text-dark bg-white hover:bg-transparent hover:text-white transition-all duration-300"
              >
                <span className="absolute inset-0 bg-transparent border border-white rounded-full scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300" />
                <span className="relative flex items-center gap-2">
                  Send your portfolio
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
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
