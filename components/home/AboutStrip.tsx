import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { HomepageData } from '@/sanity/lib/types'

interface AboutStripProps {
  data: HomepageData | null
}

export default function AboutStrip({ data }: AboutStripProps) {
  return (
    <section className="bg-dark py-24 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeUp>
            <h2
              className="text-light font-normal"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}
            >
              {data?.aboutHeading || "Believe In The Software House You Can Trust"}
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-body text-lg mt-6 leading-relaxed max-w-lg">
              {data?.aboutParagraph ||
                "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From turning napkin sketches into full-blown apps to spearheading the Digital Transformation Of Your Business, we've mastered the art of making magic happen."}
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <div className="flex gap-10 mt-10">
              <div>
                <p className="text-[#e8522a] font-normal" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                  {data?.statYears || '4+'}
                </p>
                <p className="text-body text-sm uppercase tracking-widest mt-1">Years</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-[#e8522a] font-normal" style={{ fontSize: 'clamp(36px, 4vw, 56px)' }}>
                  {data?.statPeople || '30+'}
                </p>
                <p className="text-body text-sm uppercase tracking-widest mt-1">People</p>
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2} className="relative h-[400px] lg:h-[500px]">
          {data?.aboutImage ? (
            <Image
              src={urlFor(data.aboutImage).width(700).height(500).url()}
              alt="About TechmireSolutions"
              fill
              className="object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-full bg-card rounded-2xl border border-border flex items-center justify-center">
              <span className="text-body text-sm">About image via Sanity CMS</span>
            </div>
          )}
        </FadeUp>
      </div>
    </section>
  )
}
