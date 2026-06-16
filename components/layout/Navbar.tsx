'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  {
    label: 'Graphic Design',
    href: '/graphic-design',
    children: [
      { label: 'Branding Concept', href: '/services/branding-concept' },
      { label: 'Character Design', href: '/services/character-design' },
      { label: 'Social Media Graphic', href: '/services/social-media-graphic' },
      { label: 'Print Material Graphic', href: '/services/print-material-graphic' },
      { label: 'Textile Designs', href: '/services/textile-designs' },
      { label: 'Tech Pack Designs', href: '/services/tech-pack-designs' },
      { label: 'Web UI/UX', href: '/services/web-ui-ux' },
      { label: 'App UI/UX', href: '/services/app-ui-ux' },
    ],
  },
  {
    label: 'Digital Marketing',
    href: '/digital-marketing',
    children: [
      { label: 'Social Media Strategy', href: '/services/social-media-strategy' },
      { label: 'Content Creation', href: '/services/content-creation' },
      { label: 'Community Management', href: '/services/community-management' },
      { label: 'Analytics & Reporting', href: '/services/analytics-reporting' },
    ],
  },
  {
    label: 'Web Development',
    href: '/web-development',
    children: [
      { label: 'Custom Website Development', href: '/services/custom-website-development' },
      { label: 'E-Commerce Solutions', href: '/services/ecommerce-solutions' },
      { label: 'WordPress Development', href: '/services/wordpress-development' },
      { label: 'Website Maintenance', href: '/services/website-maintenance' },
      { label: 'Shopify', href: '/services/shopify' },
    ],
  },
  {
    label: 'Software Development',
    href: '/software-solution',
    children: [
      { label: 'Web Apps', href: '/services/web-apps' },
      { label: 'Customized Solutions', href: '/services/customized-solutions' },
      { label: 'App Development', href: '/services/app-development' },
    ],
  },
  {
    label: 'SEO',
    href: '/search-engine-optimization',
    children: [
      { label: 'Keyword Research', href: '/services/keyword-research' },
      { label: 'On-Page SEO', href: '/services/on-page-seo' },
      { label: 'Technical SEO', href: '/services/technical-seo' },
      { label: 'Off-Page SEO', href: '/services/off-page-seo' },
      { label: 'Local SEO', href: '/services/local-seo' },
      { label: 'SEO Analytics', href: '/services/seo-analytics' },
    ],
  },
  { label: 'Our Team', href: '/meet-our-team' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Techmire Academy', href: '/techmire-academy' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="text-[13px] text-light/70 hover:text-light transition-colors duration-200 flex items-center gap-1"
              >
                {item.label}
                {item.children && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <path d="M5 7L1 3h8L5 7z" />
                  </svg>
                )}
              </Link>
              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 bg-card border border-border rounded-lg py-2 min-w-[220px] shadow-2xl"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-[13px] text-light/60 hover:text-light hover:bg-white/5 transition-colors"
                      >
                        {child.label} ↗
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Logo center */}
        <Link href="/" className="flex items-center gap-2 mx-auto lg:mx-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <div className="w-9 h-9 rounded-full bg-[#e8522a] flex items-center justify-center">
            <span className="text-white font-bold text-xs tracking-tight">TMS</span>
          </div>
          <span className="text-light font-medium text-sm hidden sm:block">TechmireSolutions</span>
        </Link>

        {/* Right nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_ITEMS.slice(5).map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] text-light/70 hover:text-light transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-a-quote"
            className="flex items-center gap-2 bg-[#e8522a] hover:bg-[#d4471f] text-white text-[13px] font-medium px-5 py-2 rounded-pill transition-colors duration-300"
          >
            Get a Quote <span>↗</span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden text-light p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-px bg-current mb-1.5" />
          <div className="w-6 h-px bg-current mb-1.5" />
          <div className="w-6 h-px bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-dark border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-3 text-[15px] text-light/70 hover:text-light border-b border-border/50 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label} ↗
                </Link>
              ))}
              <Link
                href="/get-a-quote"
                className="mt-4 flex items-center justify-center gap-2 bg-[#e8522a] text-white text-[14px] font-medium px-5 py-3 rounded-pill"
                onClick={() => setMobileOpen(false)}
              >
                Get a Quote ↗
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
