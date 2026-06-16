import FadeUp from './FadeUp'

interface PageHeroProps {
  label?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
}

export default function PageHero({ label, heading, subheading, align = 'center' }: PageHeroProps) {
  return (
    <section className="bg-dark pt-36 pb-20 px-6">
      <div className={`max-w-[1400px] mx-auto ${align === 'center' ? 'text-center' : ''}`}>
        {label && (
          <FadeUp>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a] font-medium">{label}</span>
          </FadeUp>
        )}
        <FadeUp delay={0.1}>
          <h1
            className="text-light font-normal mt-3"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)', lineHeight: 1.0 }}
          >
            {heading}
          </h1>
        </FadeUp>
        {subheading && (
          <FadeUp delay={0.2}>
            <p className="text-body text-lg mt-5 max-w-2xl mx-auto">{subheading}</p>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
