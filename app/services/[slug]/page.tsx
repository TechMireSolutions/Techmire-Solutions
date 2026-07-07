import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import * as LucideIcons from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery, servicesQuery } from '@/sanity/lib/queries'
import FadeUp from '@/components/ui/FadeUp'
import AnimatedText from '@/components/ui/AnimatedText'
import ServiceParallaxHero from '@/components/ui/ServiceParallaxHero'
import ServiceZigZagGallery from '@/components/ui/ServiceZigZagGallery'
import type { Service } from '@/sanity/lib/types'

export const revalidate = 60

export async function generateStaticParams() {
  const services: Service[] = await client.fetch(servicesQuery).catch(() => [])
  return services.map((s) => ({ slug: s.slug.current }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service: Service = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!service) return { title: 'Service Not Found' }
  return {
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service: Service = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
  if (!service) notFound()

  return (
    <div className="bg-dark text-white selection:bg-orange selection:text-white">
      {/* Immersive Parallax Hero */}
      <ServiceParallaxHero 
        title={service.title} 
        image={service.coverImage} 
      />

      {/* Editorial Description Section */}
      <section className="py-32 px-6 lg:px-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Giant Manifesto Text */}
          <div className="lg:col-span-7">
            <FadeUp>
              <h2 className="text-3xl lg:text-5xl xl:text-6xl font-[200] leading-[1.1] tracking-tight mb-10">
                {service.shortDescription}
              </h2>
            </FadeUp>
          </div>

          {/* Detailed Editorial Text */}
          <div className="lg:col-span-5">
            <FadeUp delay={0.2}>
              <div className="prose prose-invert prose-lg prose-p:font-light prose-p:leading-relaxed prose-p:text-white/60 max-w-none">
                {service.fullDescription ? (
                  <PortableText value={service.fullDescription} />
                ) : (
                  <p>We blend strategy, design, and technology to create exceptional digital experiences that drive results and elevate your brand to the next level.</p>
                )}
              </div>
            </FadeUp>

          </div>
        </div>

        {/* Process Steps (Replaces Core Highlights) */}
        {service.processSteps && service.processSteps.length > 0 && (
          <FadeUp delay={0.3} className="mt-32 pt-20 border-t border-white/10">
            <div className="max-w-[1200px] mx-auto">
              <span className="text-orange text-[12px] font-bold uppercase tracking-widest block mb-12 text-center">
                Our Process
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 gap-x-16 lg:gap-x-32">
                {service.processSteps.map((step, i) => {
                  const IconName = step.icon || 'CheckCircle'
                  // @ts-ignore - Dynamic icon loading
                  const IconComponent = LucideIcons[IconName] || LucideIcons.CheckCircle
                  
                  return (
                    <div key={step._key || i} className="flex items-start gap-6 group">
                      <div className="shrink-0 w-16 h-16 rounded-full bg-orange/10 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white transition-colors duration-300 shadow-[0_0_30px_rgba(255,107,0,0.15)] group-hover:shadow-[0_0_40px_rgba(255,107,0,0.4)]">
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-white text-2xl font-[400] mb-3">{step.title}</h4>
                        <p className="text-white/60 text-[16px] leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeUp>
        )}
      </section>

      {/* Sub Services (Capabilities Zig-Zag Gallery) */}
      {service.subServices && service.subServices.length > 0 && (
        <ServiceZigZagGallery subServices={service.subServices} />
      )}

      {/* High-End CTA */}
      <section className="relative py-40 px-6 lg:px-10 overflow-hidden bg-orange text-center flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-dark opacity-10 mix-blend-multiply" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeUp>
            <h2 
              className="text-white font-[200] leading-[0.95] mb-12 tracking-tight"
              style={{ fontSize: 'clamp(50px, 8vw, 120px)' }}
            >
              Let's craft something extraordinary.
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link 
              href="/contact-us" 
              className="group inline-flex items-center gap-4 bg-dark text-white text-[12px] uppercase tracking-[0.2em] font-medium px-10 py-5 rounded-full hover:bg-white hover:text-dark transition-all duration-500"
            >
              Start a Project
              <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-dark/20 flex items-center justify-center transition-all duration-500 group-hover:rotate-45">
                ↗
              </span>
            </Link>
          </FadeUp>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'Service',
        name: service.title, description: service.shortDescription,
        provider: { '@type': 'Organization', name: 'TechmireSolutions', url: 'https://techmiresolutions.com' },
      }) }} />
    </div>
  )
}
