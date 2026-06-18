'use client'

import { useState, useEffect } from 'react'
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

function NavLink({ href, children, light = false, onClick }: {
  href: string
  children: React.ReactNode
  light?: boolean  // true = on white/light background
  onClick?: () => void
}) {
  return (
    <div className="group relative pb-0.5">
      <Link
        href={href}
        onClick={onClick}
        className={`text-base font-medium leading-[115%] no-underline normal-case block transition-colors duration-200 ${
          light ? 'text-[#0a0a0a]' : 'text-[#fcfdff]'
        }`}
      >
        {children}
      </Link>
      <span
        className={`absolute bottom-0 left-0 block h-px w-0 group-hover:w-full transition-all duration-[350ms] ease-out ${
          light ? 'bg-[#0a0a0a]/40' : 'bg-[#fcfdff]/50'
        }`}
      />
    </div>
  )
}

function StartProjectLink({ light = false, onClick }: { light?: boolean; onClick?: () => void }) {
  return (
    <div className="group relative hidden sm:block pb-0.5">
      <Link
        href="/get-a-quote"
        onClick={onClick}
        className={`flex items-center gap-1.5 text-base font-medium leading-[115%] no-underline normal-case transition-colors duration-200 ${
          light ? 'text-[#0a0a0a]' : 'text-[#fcfdff]'
        }`}
      >
        <span>Start a project</span>
        <span className="relative overflow-hidden inline-flex w-[13px] h-[13px] self-center mb-[1px]">
          <span className="absolute inset-0 flex items-center justify-center text-[13px] leading-none transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-2">
            ↗
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[13px] leading-none -translate-x-2 translate-y-2 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">
            ↗
          </span>
        </span>
      </Link>
      <span
        className={`absolute bottom-0 left-0 block h-px w-0 group-hover:w-full transition-all duration-[350ms] ease-out ${
          light ? 'bg-[#0a0a0a]/40' : 'bg-[#fcfdff]/50'
        }`}
      />
    </div>
  )
}

export default function Navbar({ logoUrl }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* ── Fixed navbar bar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-[95px] px-8 lg:px-16 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[#fcfdff] shadow-[0_12px_20px_rgba(0,0,0,0.06)]'
            : 'bg-dark'
        }`}
      >
        {/* Left — 3 links, desktop only */}
        <nav className="hidden lg:flex items-center gap-12">
          {LEFT_NAV.map(item => (
            <NavLink key={item.href + item.label} href={item.href} light={scrolled}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Center — logo mark */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          {/* Invert logo when on white background */}
          <span style={{ filter: scrolled ? 'invert(1)' : 'none', transition: 'filter 0.3s' }}>
            <LogoMark size={56} src={logoUrl} />
          </span>
        </Link>

        {/* Right — "Start a project" + hamburger */}
        <div className="flex items-center gap-10">
          <StartProjectLink light={scrolled} />

          {/* Two-line hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="main-menu"
            className="flex flex-col gap-[6px] items-end justify-center min-h-[44px] min-w-[44px] group"
          >
            <span className={`block h-[2px] w-[32px] transition-all duration-300 group-hover:w-[36px] ${scrolled ? 'bg-[#0a0a0a]' : 'bg-white'}`} />
            <span className={`block h-[2px] w-[22px] transition-all duration-300 group-hover:w-[36px] ${scrolled ? 'bg-[#0a0a0a]' : 'bg-white'}`} />
          </button>
        </div>
      </header>

      {/* ── Menu overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            id="main-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="fixed top-0 inset-x-0 z-[60] bg-white"
            style={{ height: '82vh', minHeight: '560px' }}
          >
            {/* Column-guide grid lines */}
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
              <Link href="/" onClick={() => setOpen(false)}>
                <span style={{ filter: 'invert(1)' }}>
                  <LogoMark size={56} src={logoUrl} />
                </span>
              </Link>

              <div className="flex items-center gap-10">
                <StartProjectLink light onClick={() => setOpen(false)} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex items-center justify-center min-h-[44px] min-w-[44px] text-dark/50 hover:text-dark transition-colors select-none"
                  style={{ fontSize: '28px', fontWeight: 300, lineHeight: 1 }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Nav items — centered */}
            <nav className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-95px-72px)]">
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

            {/* Bottom bar — socials + copyright */}
            <div
              className="relative z-10 px-8 lg:px-16 flex items-center justify-between"
              style={{ height: '72px' }}
            >
              <p className="text-[12px] text-dark/35 font-light">© 2026 TechmireSolutions</p>

              <div className="flex items-center gap-6">
                {SOCIAL.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.04 }}
                    className="group relative flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="text-[13px] font-normal text-dark/50 group-hover:text-dark transition-colors duration-200">
                      {s.label}
                    </span>
                    <span className="relative overflow-hidden inline-flex w-3 h-3">
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-dark/50 group-hover:text-dark transition-all duration-300 ease-out group-hover:translate-x-2 group-hover:-translate-y-2">↗</span>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-dark/50 group-hover:text-dark -translate-x-2 translate-y-2 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0">↗</span>
                    </span>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0" aria-label={s.label} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
