import FadeUp from './FadeUp'

interface PageHeroProps {
  label?: string
  heading: string
  subheading?: string
}

export default function PageHero({ label, heading, subheading }: PageHeroProps) {
  return (
    <section className="bg-dark pt-36 pb-20 px-6 lg:px-10 border-b border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto">
        {label && (
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">{label}</span>
            </div>
          </FadeUp>
        )}
        <FadeUp delay={0.05}>
          <h1
            className="font-normal text-white leading-[0.95]"
            style={{ fontSize: 'clamp(52px, 8vw, 120px)' }}
          >
            {heading}
          </h1>
        </FadeUp>
        {subheading && (
          <FadeUp delay={0.15}>
            <p className="text-white/40 text-[15px] mt-7 max-w-xl leading-relaxed">{subheading}</p>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
