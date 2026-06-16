import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import FadeUp from '@/components/ui/FadeUp'
import type { HomepageData } from '@/sanity/lib/types'

interface CTABannerProps {
  data: HomepageData | null
}

export default function CTABanner({ data }: CTABannerProps) {
  const bullets = data?.ctaBannerBullets?.length
    ? data.ctaBannerBullets
    : ['Innovative ideas', 'Technical architecture', 'Custom designs']

  return (
    <section className="bg-dark py-0 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* Text side */}
        <div className="px-6 lg:px-16 py-24">
          <FadeUp>
            <h2
              className="text-light font-normal"
              style={{ fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1 }}
            >
              {data?.ctaBannerHeading || "Let's Build Something Awesome"}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-body text-[15px] leading-relaxed mt-6 max-w-lg">
              {data?.ctaBannerParagraph ||
                "We're not here to sell you software, digital design, or a digital transformation deal. At Techmire Solutions, we're here to help you build the future of your business."}
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <ul className="mt-6 space-y-2">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-light text-[15px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e8522a]" />
                  {b}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.3}>
            <Link
              href="/contact-us"
              className="mt-8 inline-flex items-center gap-2 bg-[#e8522a] hover:bg-[#d4471f] text-white text-[15px] font-medium px-7 py-3.5 rounded-pill transition-colors duration-300"
            >
              Contact Us ↗
            </Link>
          </FadeUp>
        </div>

        {/* Image side */}
        <div className="relative h-80 lg:h-auto min-h-[400px]">
          {data?.ctaBannerImage ? (
            <Image
              src={urlFor(data.ctaBannerImage).width(800).height(600).url()}
              alt="Build something awesome"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-card flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#e8522a] font-normal text-6xl">↗</p>
                <p className="text-body text-sm mt-2">CTA image via Sanity</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-dark/60 to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  )
}
