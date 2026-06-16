import { Metadata } from 'next'
import ContactForm from '@/components/forms/ContactForm'
import FadeUp from '@/components/ui/FadeUp'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with TechmireSolutions. We'd love to hear about your project.",
}

export default function ContactPage() {
  return (
    <section className="bg-dark min-h-screen pt-36 pb-20 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <FadeUp>
            <span className="text-[11px] uppercase tracking-[0.15em] text-[#e8522a]">Say Hello</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1
              className="text-light font-normal mt-3"
              style={{ fontSize: 'clamp(40px, 6vw, 80px)', lineHeight: 1.0 }}
            >
              Contact Us
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-body text-lg mt-6 leading-relaxed max-w-lg">
              Whether you have a question, a project idea, or just want to say hi — we&apos;re all ears.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="mt-10 space-y-4">
              {[
                { icon: '📍', label: 'R-591, F.B Area Block 20, Karachi, Sindh, Pakistan' },
                { icon: '📞', label: '(+92) 317 222 5152 · (+44) 7724 697972' },
                { icon: '✉️', label: 'connect@techmiresolutions.com' },
              ].map((item) => (
                <div key={item.icon} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <p className="text-body text-[15px]">{item.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.15}>
          <ContactForm />
        </FadeUp>
      </div>
    </section>
  )
}
