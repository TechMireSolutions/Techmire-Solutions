'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import LogoMark from '@/components/ui/LogoMark'

const LEFT_NAV = [
  { label: 'Our Company', href: '/about-us' },
  { label: 'Our Expertise', href: '/graphic-design' },
  { label: 'Our Work', href: '/blogs' },
]

const MENU_ITEMS = [
  { label: 'Work', href: '/blogs' },
  { label: 'Services', href: '/graphic-design' },
  { label: 'About', href: '/about-us' },
  { label: 'Academy', href: '/techmire-academy' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Contact', href: '/contact-us' },
]

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/techmiresolutions' },
  { label: 'Twitter', href: 'https://twitter.com/techmiresolutions' },
  { label: 'Instagram', href: 'https://instagram.com/techmiresolutions' },
]

interface NavbarProps { logoUrl?: string | null }

export default function Navbar({ logoUrl }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── Fixed navbar bar ── */}
      <header className="fixed top-0 inset-x-0 z-50 h-[95px] px-8 lg:px-16 flex items-center justify-between bg-dark">

        {/* Left — 3 links, desktop only */}
        <nav className="hidden lg:flex items-center gap-12">
          {LEFT_NAV.map(item => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="text-base font-medium text-[#fcfdff] leading-[115%] no-underline normal-case transition-all duration-300 hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Center — logo mark only */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <LogoMark size={56} src={logoUrl} />
        </Link>

        {/* Right — "Start a project ↗" + hamburger */}
        <div className="flex items-center gap-10">
          <Link
            href="/get-a-quote"
            className="hidden sm:block text-base font-medium text-[#fcfdff] leading-[115%] no-underline normal-case transition-all duration-300 hover:opacity-70"
          >
            Start a project&nbsp;↗
          </Link>

          {/* Two-line hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex flex-col gap-[6px] items-end py-1 group"
          >
            <span className="block h-[2px] w-[32px] bg-white transition-all duration-300 group-hover:w-[36px]" />
            <span className="block h-[2px] w-[22px] bg-white transition-all duration-300 group-hover:w-[36px]" />
          </button>
        </div>
      </header>

      {/* ── Menu overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="fixed top-0 inset-x-0 z-[60] bg-white"
            style={{ height: '82vh', minHeight: '560px' }}
          >
            {/* Column-guide grid lines — large rectangles like the reference */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                `,
                backgroundSize: '30% 34%',
              }}
            />

            {/* Top bar */}
            <div className="relative z-10 h-[95px] px-8 lg:px-16 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" onClick={() => setOpen(false)}>
                <LogoMark size={56} src={logoUrl} />
              </Link>

              {/* Right side: Start a project + × */}
              <div className="flex items-center gap-8">
                <Link
                  href="/get-a-quote"
                  onClick={() => setOpen(false)}
                  className="hidden sm:block text-[15.5px] font-normal text-dark/60 hover:text-dark transition-colors"
                >
                  Start a project&nbsp;↗
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-dark/50 hover:text-dark transition-colors select-none"
                  style={{ fontSize: '28px', fontWeight: 300, lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Nav items — centered */}
            <nav className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-64px-72px)]">
              {MENU_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-center text-dark hover:text-dark/35 transition-colors duration-200"
                    style={{
                      fontSize: 'clamp(42px, 6.5vw, 84px)',
                      fontWeight: 500,
                      lineHeight: 1.08,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom bar */}
            <div
              className="relative z-10 px-8 lg:px-16 flex items-center justify-between"
              style={{ height: '72px' }}
            >
              <p className="text-[12px] text-dark/35 font-normal">© 2026 TechmireSolutions</p>
              <div className="flex items-center gap-7">
                {SOCIAL.map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="text-[13px] text-dark/50 hover:text-dark transition-colors"
                  >
                    {s.label}&nbsp;↗
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
