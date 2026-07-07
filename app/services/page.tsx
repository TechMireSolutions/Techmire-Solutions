import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { servicesQuery, servicesPageQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import InnerPageHero from '@/components/ui/InnerPageHero'
import FadeUp from '@/components/ui/FadeUp'
import AnimatedText from '@/components/ui/AnimatedText'
import ServicesCursorList from '@/components/ui/ServicesCursorList'
import MarqueeTicker from '@/components/ui/MarqueeTicker'
import MagneticButton from '@/components/ui/MagneticButton'
import type { Service, ServicesPageData } from '@/sanity/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Services',
  description: 'Explore all TechmireSolutions services, managed dynamically from Sanity CMS.',
}


export default async function ServicesPage() {
  const services: Service[] = await client.fetch(servicesQuery).catch(() => [])
  const pageData: ServicesPageData | null = await client.fetch(servicesPageQuery).catch(() => null)

  return (
    <>
      <InnerPageHero
        title={pageData?.hero?.title || "Services"}
        subtitle={pageData?.hero?.subtitle || "Explore our complete service lineup, managed from Sanity CMS and connected to dedicated detail pages."}
        overline={pageData?.hero?.overline || "Our Expertise"}
      />

      {/* Intro Text */}
      <section className="bg-light pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}>
              <AnimatedText
                el="h2"
                text={pageData?.cta?.title || "All Services"}
                type="word"
                className="font-[200] text-dark leading-[0.95]"
              />
            </div>
            <p className="text-dark/45 text-[14px] leading-[1.8] max-w-md font-light">
              {pageData?.cta?.subtitle || "Add, edit, reorder, or publish services in Sanity. This page updates from the same CMS data."}
            </p>
          </div>
        </div>
      </section>

      {/* FULL WIDTH Cursor List */}
      <section className="w-full bg-dark">
        {services.length > 0 ? (
          <ServicesCursorList services={services} />
        ) : (
          <div className="border border-dark/10 px-8 py-12 text-center max-w-[1200px] mx-auto my-20">
            <p className="text-white/45 text-[14px]">
              Services coming soon. Add service documents in Sanity CMS to populate this page.
            </p>
          </div>
        )}
      </section>

      {/* Process Section */}
      <section className="bg-light py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <FadeUp>
            <h2 className="text-dark font-[200] text-4xl lg:text-5xl mb-16">How We Work</h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { num: '01', title: 'Discovery', desc: 'We start by understanding your vision, target audience, and business goals.' },
              { num: '02', title: 'Strategy', desc: 'Crafting a roadmap and blueprint tailored to your specific project needs.' },
              { num: '03', title: 'Execution', desc: 'Our team designs and develops with precision, utilizing the latest tech.' },
              { num: '04', title: 'Delivery', desc: 'Rigorous testing and a smooth launch, followed by ongoing support.' },
            ].map((step, i) => (
              <FadeUp key={step.num} delay={i * 0.1}>
                <div className="border-t border-dark/10 pt-6 h-full flex flex-col">
                  <span className="text-orange text-sm font-bold tracking-widest mb-6 block">{step.num}</span>
                  <h3 className="text-dark text-xl font-medium mb-3">{step.title}</h3>
                  <p className="text-dark/50 text-[14.5px] leading-relaxed font-light">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Marquee */}
      <section className="bg-dark py-16">
        <div className="text-center mb-10">
          <span className="text-white/40 uppercase tracking-[0.2em] text-[11px] font-medium">Technologies & Expertise</span>
        </div>
        <MarqueeTicker 
          variant="dark" 
          speed={60} 
          text="React.js   |   Next.js   |   TailwindCSS   |   Node.js   |   Python   |   AWS   |   Figma   |   Sanity CMS   |   Framer Motion" 
        />
      </section>

      {/* Call to Action */}
      <section className="bg-orange py-32 px-6 lg:px-10 text-center flex flex-col items-center justify-center">
        <FadeUp>
          <h2 
            className="text-white font-[200] leading-[0.95] mb-8"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            Ready to start your project?
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-white/90 text-lg lg:text-xl font-light max-w-xl mx-auto mb-12">
            Let's discuss how we can help your business grow and succeed in the digital world.
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <MagneticButton
            href="/contact-us"
            className="inline-flex items-center gap-3 bg-white text-orange font-bold text-sm uppercase tracking-widest px-10 py-5 rounded-full hover:scale-105 transition-transform duration-300"
          >
            Let's Talk
            <ArrowUpRight size={18} />
          </MagneticButton>
        </FadeUp>
      </section>
    </>
  )
}
