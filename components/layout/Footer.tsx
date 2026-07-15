import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import LogoMark from '@/components/ui/LogoMark'

interface FooterProps { logoUrl?: string | null }

const SERVICES = [
  { l: 'All Services',       h: '/services' },
  { l: 'Web Development',    h: '/services/web-development' },
  { l: 'Software Development', h: '/services/software-development' },
  { l: 'Graphic Design',     h: '/services/graphic-design' },
  { l: 'Digital Marketing',  h: '/services/digital-marketing' },
  { l: 'SEO',                h: '/services/seo' },
]
const COMPANY = [
  { l: 'About Us',   h: '/about-us' },
  { l: 'Our Team',   h: '/meet-our-team' },
  { l: 'Blogs',      h: '/blogs' },
  { l: 'Academy',    h: '/techmire-academy' },
  { l: 'Contact',    h: '/contact-us' },
]
const SOCIAL = [
  { l: 'LinkedIn',   h: 'https://linkedin.com/company/techmiresolutions' },
  { l: 'Instagram',  h: 'https://instagram.com/techmiresolutions' },
  { l: 'Facebook',   h: 'https://facebook.com/techmiresolutions' },
  { l: 'Twitter / X',h: 'https://twitter.com/techmiresolutions' },
]

export default function Footer({ logoUrl }: FooterProps) {
  return (
    <footer className="bg-dark border-t border-white/[0.05]">

      {/* Links grid */}
      <div className="px-8 lg:px-16 pt-20 pb-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pb-16 border-b border-white/[0.05]">

          {/* Office */}
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.3em] text-white/50 mb-7 font-medium">Office</p>
            <address className="not-italic space-y-2.5 text-white/60 text-[12.5px] leading-relaxed font-light">
              <p>R-591, F.B Area Block 20</p>
              <p>Karachi, Sindh, Pakistan</p>
              <a href="tel:+923172225152" className="block hover:text-white transition-colors mt-3">
                (+92) 317 222 5152
              </a>
              <a href="mailto:connect@techmiresolutions.com" className="block hover:text-white transition-colors">
                connect@techmiresolutions.com
              </a>
            </address>
          </div>

          {/* Services */}
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.3em] text-white/50 mb-7 font-medium">Services</p>
            <ul className="space-y-3">
              {SERVICES.map(i => (
                <li key={i.h}>
                  <Link href={i.h} className="text-white/60 text-[12.5px] hover:text-white transition-colors font-light">
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.3em] text-white/50 mb-7 font-medium">Company</p>
            <ul className="space-y-3">
              {COMPANY.map(i => (
                <li key={i.h}>
                  <Link href={i.h} className="text-white/60 text-[12.5px] hover:text-white transition-colors font-light">
                    {i.l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <p className="text-[9.5px] uppercase tracking-[0.3em] text-white/50 mb-7 font-medium">Follow</p>
            <ul className="space-y-3">
              {SOCIAL.map(i => (
                <li key={i.l}>
                  <a
                    href={i.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-white/60 text-[12.5px] hover:text-white transition-colors font-light"
                  >
                    {i.l}
                    <ArrowUpRight
                      aria-hidden
                      size={10}
                      className="opacity-0 group-hover:opacity-40 transition-opacity"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/get-a-quote"
                className="group inline-flex items-center gap-1.5 bg-white hover:bg-orange text-dark hover:text-white text-[11.5px] font-medium px-5 py-2.5 rounded-full transition-all duration-300 min-h-[44px]"
              >
                Start a Project
                <ArrowUpRight
                  aria-hidden
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="flex items-center justify-between py-5 text-white/50 text-[11px] font-light">
          <div className="flex items-center gap-3">
            <LogoMark size={22} src={logoUrl} />
            <span>&copy; 2026 TechmireSolutions</span>
          </div>
          <span className="hidden sm:block tracking-wide">
            Software House &middot; Design Studio &middot; Karachi
          </span>
        </div>
      </div>

      {/* Mega brand watermark */}
      <div className="overflow-hidden border-t border-white/[0.04]">
        <div
          className="font-[200] text-white/[0.06] leading-[0.82] tracking-[-0.05em] whitespace-nowrap px-2 pt-4 pb-6 select-none"
          style={{ fontSize: 'clamp(80px, 19vw, 300px)' }}
          aria-hidden="true"
          role="presentation"
        >
          TechmireSolutions
        </div>
      </div>

    </footer>
  )
}
