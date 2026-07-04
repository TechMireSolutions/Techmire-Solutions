import { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import FadeUp from '@/components/ui/FadeUp'
import InnerPageHero from '@/components/ui/InnerPageHero'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with TechmireSolutions.",
}

export default function ContactPage() {
  return (
    <>
      <InnerPageHero
        title="Contact Us"
        subtitle="Whether you have a question, a project idea, or just want to say hi — we're all ears."
        overline="Say Hello"
      />
      <section className="bg-dark min-h-screen py-24 px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-[1200px] mx-auto">
          <div>
            <FadeUp delay={0.1}>
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
        <FadeUp delay={0.2}>
          <ContactForm />
        </FadeUp>

      </div>
    </section>
    </>
  )
}
