'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LEFT = [
  {
    label: 'Services',
    href: '#',
    children: [
      { label: 'Graphic Design', href: '/graphic-design' },
      { label: 'Digital Marketing', href: '/digital-marketing' },
      { label: 'Web Development', href: '/web-development' },
      { label: 'Software Development', href: '/software-solution' },
      { label: 'SEO', href: '/search-engine-optimization' },
    ],
  },
  { label: 'Work', href: '/blogs' },
  { label: 'About', href: '/about-us' },
  { label: 'Team', href: '/meet-our-team' },
]

const NAV_RIGHT = [
  { label: 'Academy', href: '/techmire-academy' },
  { label: 'Blog', href: '/blogs' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/95 backdrop-blur-2xl border-b border-white/[0.05]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">

        {/* Left nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LEFT.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="group text-[12.5px] text-white/40 hover:text-white transition-colors duration-200 tracking-[0.04em] flex items-center gap-1.5"
              >
                {item.label}
                {item.children && (
                  <motion.svg
                    animate={{ rotate: openDropdown === item.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    width="8" height="5" viewBox="0 0 8 5" fill="none"
                    className="opacity-30"
                  >
                    <path d="M1 1l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </motion.svg>
                )}
              </Link>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-4 bg-[#0f0f0f] border border-white/[0.07] rounded-2xl py-2 min-w-[220px] shadow-[0_24px_64px_rgba(0,0,0,0.6)]"
                  >
                    {item.children.map((child, i) => (
                      <motion.div
                        key={child.href}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                      >
                        <Link
                          href={child.href}
                          className="flex items-center justify-between px-5 py-2.5 text-[12.5px] text-white/40 hover:text-white hover:bg-white/[0.04] transition-all group rounded-lg mx-1"
                        >
                          {child.label}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] translate-x-0 group-hover:translate-x-0.5 transition-transform">↗</span>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Logo — center */}
        <Link
          href="/"
          className="flex items-center gap-3 lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <div className="relative w-9 h-9 shrink-0">
            <Image
              src="/logo.png"
              alt="TechmireSolutions"
              fill
              className="object-contain"
              priority
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement
                el.style.display = 'none'
                const fallback = el.nextElementSibling as HTMLElement
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div
              className="absolute inset-0 rounded-full bg-orange items-center justify-center text-white font-semibold text-[10px] tracking-tight hidden"
            >
              TMS
            </div>
          </div>
          <span className="text-white font-medium text-[13.5px] tracking-[-0.01em] hidden sm:block">
            TechmireSolutions
          </span>
        </Link>

        {/* Right nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_RIGHT.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[12.5px] text-white/40 hover:text-white transition-colors duration-200 tracking-[0.04em]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/get-a-quote"
            className="ml-1 group inline-flex items-center gap-2 bg-white hover:bg-orange text-dark hover:text-white text-[12.5px] font-medium px-5 py-2.5 rounded-full transition-all duration-300"
          >
            Get a Quote
            <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-white origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-px bg-white"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-5 h-px bg-white origin-center"
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/[0.05] bg-dark/98 backdrop-blur-2xl"
          >
            <div className="px-6 py-7 flex flex-col gap-1">
              {[...NAV_LEFT, ...NAV_RIGHT].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3.5 border-b border-white/[0.05] text-[15px] text-white/50 hover:text-white transition-colors"
                  >
                    {item.label} <span className="text-[10px] opacity-30">↗</span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
              >
                <Link
                  href="/get-a-quote"
                  onClick={() => setMobileOpen(false)}
                  className="mt-6 flex items-center justify-center gap-2 bg-white text-dark text-[14px] font-medium px-5 py-3.5 rounded-full"
                >
                  Get a Quote ↗
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
