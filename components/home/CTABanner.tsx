import Link from 'next/link'
import FadeUp from '@/components/ui/FadeUp'
import type { HomepageData } from '@/sanity/lib/types'

interface CTABannerProps { data: HomepageData | null }

export default function CTABanner({ data }: CTABannerProps) {
  const bullets = data?.ctaBannerBullets?.length
    ? data.ctaBannerBullets
    : ['Innovative ideas', 'Technical architecture', 'Custom designs']

  return (
    <section className="bg-[#f5f5f0] py-28 lg:py-36 px-6 lg:px-10">
      <div className="max-w-[1440px] mx-auto">

        <FadeUp>
          <div className="flex items-center gap-3 mb-14">
            <span className="w-6 h-px bg-dark/40" />
            <span className="text-[11px] uppercase tracking-[0.18em] text-dark/40 font-medium">Let&apos;s Work Together</span>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-end">
          {/* Left */}
          <div>
            <FadeUp>
              <h2
                className="font-normal text-dark leading-[1.0]"
                style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
              >
                {data?.ctaBannerHeading || "Let's Build Something Awesome"}
              </h2>
            </FadeUp>
          </div>

          {/* Right */}
          <div>
            <FadeUp delay={0.1}>
              <p className="text-dark/50 text-[15px] leading-[1.8] max-w-md">
                {data?.ctaBannerParagraph || "We&apos;re not here to sell you a package — we&apos;re here to build the future of your business. Ditch the off-the-shelf and partner with a team that gets you."}
              </p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <ul className="mt-6 space-y-2">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-dark/50 text-[14px]">
                    <span className="w-1 h-1 rounded-full bg-orange" />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.3}>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 mt-10 bg-dark hover:bg-dark/80 text-white text-[14px] font-medium px-7 py-3.5 rounded-pill transition-colors"
              >
                Contact Us ↗
              </Link>
            </FadeUp>
          </div>
        </div>

      </div>
    </section>
  )
}
