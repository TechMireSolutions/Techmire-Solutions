import { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import FadeUp from '@/components/ui/FadeUp'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with TechmireSolutions.",
}

export default function ContactPage() {
  return (
    <section className="bg-dark min-h-screen pt-36 pb-24 px-6 lg:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

        <div>
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">Say Hello</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h1 className="font-normal text-white leading-[0.95]" style={{ fontSize: 'clamp(44px, 6vw, 88px)' }}>
              Contact Us
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-white/40 text-[15px] mt-7 leading-relaxed max-w-sm">
              Whether you have a question, a project idea, or just want to say hi â€” we're all ears.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <div className="mt-12 space-y-5 border-t border-white/[0.06] pt-10">
              {[
                { label: 'Address', value: 'R-591, F.B Area Block 20, Karachi, Sindh' },
                { label: 'Phone', value: '(+92) 317 222 5152  Â·  (+44) 7724 697972' },
                { label: 'Email', value: 'connect@techmiresolutions.com' },
              ].map((item) => (
                <div key={item.label} className="flex gap-6">
                  <span className="text-[11px] uppercase tracking-[0.15em] text-white/20 w-16 shrink-0 pt-0.5">{item.label}</span>
                  <span className="text-white/50 text-[14px]">{item.value}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.1}>
          <ContactForm />
        </FadeUp>

      </div>
    </section>
  )
}
