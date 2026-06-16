import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-border">
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo + description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#e8522a] flex items-center justify-center">
                <span className="text-white font-bold text-xs">TMS</span>
              </div>
              <span className="text-light font-medium">TechmireSolutions</span>
            </div>
            <p className="text-body text-[14px] leading-relaxed">
              Software House and Design Studio. Building tomorrow&apos;s digital experiences today.
            </p>
          </div>

          {/* Office */}
          <div>
            <h4 className="text-light text-[13px] uppercase tracking-widest mb-4">Office</h4>
            <address className="not-italic text-body text-[14px] leading-relaxed space-y-2">
              <p>R-591, F.B Area Block 20</p>
              <p>Karachi, Sindh, Pakistan</p>
              <a href="tel:+923172225152" className="block hover:text-light transition-colors">(+92) 317 222 5152</a>
              <a href="tel:+447724697972" className="block hover:text-light transition-colors">(+44) 7724 697972</a>
              <a href="mailto:connect@techmiresolutions.com" className="block hover:text-light transition-colors">connect@techmiresolutions.com</a>
            </address>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-light text-[13px] uppercase tracking-widest mb-4">Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about-us' },
                { label: 'Our Team', href: '/meet-our-team' },
                { label: 'Blogs', href: '/blogs' },
                { label: 'Techmire Academy', href: '/techmire-academy' },
                { label: 'Contact Us', href: '/contact-us' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-body text-[14px] hover:text-light transition-colors">
                    {l.label} ↗
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h4 className="text-light text-[13px] uppercase tracking-widest mb-4">Get In Touch</h4>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: 'FB', href: 'https://facebook.com/techmiresolutions' },
                { label: 'TW', href: 'https://twitter.com/techmiresolutions' },
                { label: 'LI', href: 'https://linkedin.com/company/techmiresolutions' },
                { label: 'IG', href: 'https://instagram.com/techmiresolutions' },
                { label: 'TK', href: 'https://tiktok.com/@techmiresolutions' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-border rounded-full flex items-center justify-center text-body text-[11px] font-medium hover:border-[#e8522a] hover:text-[#e8522a] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="mt-6">
              <Link
                href="/get-a-quote"
                className="inline-flex items-center gap-2 bg-[#e8522a] hover:bg-[#d4471f] text-white text-[13px] font-medium px-5 py-2.5 rounded-pill transition-colors"
              >
                Start a Project ↗
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-body text-[13px]">TechmireSolutions © 2026. All rights reserved.</p>
          <p className="text-body text-[13px]">Software House and Design Studio</p>
        </div>
      </div>
    </footer>
  )
}
