import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-white/[0.06]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 pt-20 pb-10">

        {/* Top row: logo + tagline */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 pb-16 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange flex items-center justify-center">
                <span className="text-white font-semibold text-[10px]">TMS</span>
              </div>
              <span className="text-white font-medium text-[14px]">TechmireSolutions</span>
            </div>
            <p className="text-white/30 text-[13px] max-w-xs leading-relaxed">
              Software House and Design Studio — building tomorrow&apos;s digital experiences, today.
            </p>
          </div>
          <Link
            href="/get-a-quote"
            className="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-dark text-[13px] font-medium px-6 py-3 rounded-pill transition-colors shrink-0"
          >
            Start a Project ↗
          </Link>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16 border-b border-white/[0.06]">
          {/* Office */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/25 mb-5">Office</p>
            <address className="not-italic space-y-2 text-white/40 text-[13px] leading-relaxed">
              <p>R-591, F.B Area Block 20</p>
              <p>Karachi, Sindh, Pakistan</p>
              <a href="tel:+923172225152" className="block hover:text-white transition-colors">(+92) 317 222 5152</a>
              <a href="tel:+447724697972" className="block hover:text-white transition-colors">(+44) 7724 697972</a>
              <a href="mailto:connect@techmiresolutions.com" className="block hover:text-white transition-colors">connect@techmiresolutions.com</a>
            </address>
          </div>

          {/* Services */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/25 mb-5">Services</p>
            <ul className="space-y-2.5">
              {[
                { l: 'Web Development', h: '/web-development' },
                { l: 'Software Dev', h: '/software-solution' },
                { l: 'Graphic Design', h: '/graphic-design' },
                { l: 'Digital Marketing', h: '/digital-marketing' },
                { l: 'SEO', h: '/search-engine-optimization' },
              ].map((i) => (
                <li key={i.h}>
                  <Link href={i.h} className="text-white/40 text-[13px] hover:text-white transition-colors">{i.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/25 mb-5">Company</p>
            <ul className="space-y-2.5">
              {[
                { l: 'About Us', h: '/about-us' },
                { l: 'Our Team', h: '/meet-our-team' },
                { l: 'Blogs', h: '/blogs' },
                { l: 'Academy', h: '/techmire-academy' },
                { l: 'Contact', h: '/contact-us' },
              ].map((i) => (
                <li key={i.h}>
                  <Link href={i.h} className="text-white/40 text-[13px] hover:text-white transition-colors">{i.l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/25 mb-5">Follow</p>
            <ul className="space-y-2.5">
              {[
                { l: 'LinkedIn', h: 'https://linkedin.com/company/techmiresolutions' },
                { l: 'Instagram', h: 'https://instagram.com/techmiresolutions' },
                { l: 'Facebook', h: 'https://facebook.com/techmiresolutions' },
                { l: 'Twitter / X', h: 'https://twitter.com/techmiresolutions' },
                { l: 'TikTok', h: 'https://tiktok.com/@techmiresolutions' },
              ].map((i) => (
                <li key={i.l}>
                  <a href={i.h} target="_blank" rel="noopener noreferrer" className="text-white/40 text-[13px] hover:text-white transition-colors flex items-center gap-1.5">
                    {i.l} <span className="text-[10px] opacity-50">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-8 text-white/20 text-[12px]">
          <p>TechmireSolutions © 2026. All rights reserved.</p>
          <p>Software House and Design Studio</p>
        </div>

      </div>
    </footer>
  )
}
