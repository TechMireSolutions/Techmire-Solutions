'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import LogoMark from '@/components/ui/LogoMark'
import MagneticButton from '@/components/ui/MagneticButton'

const LEFT_NAV = [
  { label: 'Our Company',  href: '/about-us' },
  { label: 'Our Expertise', href: '/services' },
  { label: 'Blogs',     href: '/blogs' },
  { label: 'Our Team',     href: '/meet-our-team' },
]

const MENU_ITEMS = [
  { label: 'Work',     href: '/blogs' },
  { label: 'Services', href: '/services' },
  { label: 'About',    href: '/about-us' },
  { label: 'Team',     href: '/meet-our-team' },
  { label: 'Academy',  href: '/techmire-academy' },
  { label: 'Blog',     href: '/blogs' },
  { label: 'Contact',  href: '/contact-us' },
]

const SOCIAL = [
  { label: 'LinkedIn',   href: 'https://linkedin.com/company/techmiresolutions' },
  { label: 'Twitter',    href: 'https://twitter.com/techmiresolutions' },
  { label: 'Instagram',  href: 'https://instagram.com/techmiresolutions' },
]

interface NavbarProps { logoUrl?: string | null }

/* ── Reusable nav link with underline-grow ── */
function NavLink({ href, children, onClick }: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <div className="group relative">
      <Link
        href={href}
        onClick={onClick}
        className="text-[15px] font-medium tracking-wide text-white/70 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] leading-none no-underline block transition-all duration-300 min-h-[44px] flex items-center"
      >
        {children}
      </Link>
      <span className="absolute bottom-0 left-0 block h-[2px] w-0 group-hover:w-full bg-white transition-all duration-[360ms] ease-out rounded-full shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
    </div>
  )
}

/* ── "Start a project" CTA with dual-arrow ── */
function StartProjectBtn({ onClick }: { onClick?: () => void }) {
  return (
    <div className="hidden sm:block">
      <MagneticButton
        href="/get-a-quote"
        prefetch={true}
        onClick={onClick}
        className="group relative flex items-center gap-2.5 px-5 py-2.5 overflow-hidden rounded-full border border-white/10 bg-white/[0.02] transition-all duration-500 hover:border-white/30 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]"
      >
        {/* Sliding shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
        
        <span className="relative z-10 text-[14px] tracking-wide font-semibold text-white/80 group-hover:text-white transition-colors duration-300">
          Start a project
        </span>
        
        <span className="relative z-10 overflow-hidden inline-flex w-3.5 h-3.5 items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300">
          <ArrowUpRight
            aria-hidden size={12}
            className="absolute transition-transform duration-300 ease-out group-hover:translate-x-3 group-hover:-translate-y-3"
          />
          <ArrowUpRight
            aria-hidden size={12}
            className="absolute -translate-x-3 translate-y-3 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      </MagneticButton>
    </div>
  )
}

export default function Navbar({ logoUrl }: NavbarProps) {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
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
      {/* ──────────────── Fixed header ──────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 h-[80px] px-8 lg:px-16 flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? 'bg-[#080808]/90 backdrop-blur-md border-b border-white/[0.07]'
            : 'bg-transparent'
        }`}
      >
        {/* Left — logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          aria-label="TechmireSolutions home"
          className="shrink-0"
        >
          <LogoMark size={50} src={logoUrl} />
        </Link>

        {/* Center — nav links */}
        <nav
          className="hidden lg:flex items-center gap-9 absolute left-1/2 -translate-x-1/2"
          aria-label="Primary"
        >
          {LEFT_NAV.map(item => (
            <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
          ))}
        </nav>

        {/* Right — CTA + hamburger */}
        <div className="flex items-center gap-8">
          <StartProjectBtn />

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            aria-controls="main-menu"
            className="flex flex-col gap-[6px] items-end justify-center min-h-[44px] min-w-[44px] group"
          >
            <span className="block h-[2px] w-[28px] rounded-full bg-white/70 transition-all duration-300 group-hover:w-[32px] group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
            <span className="block h-[2px] w-[20px] rounded-full bg-white/70 transition-all duration-300 group-hover:w-[32px] group-hover:bg-white group-hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          </button>
        </div>
      </header>

      {/* ──────────────── Full-screen menu ──────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            id="main-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] flex flex-col"
            style={{ background: '#0a0a0a' }}
          >
            {/* Subtle grid */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
                `,
                backgroundSize: '80px 80px',
              }}
            />

            {/* Top bar */}
            <div className="relative z-10 h-[80px] px-8 lg:px-16 flex items-center justify-between border-b border-white/[0.06] flex-shrink-0">
              <Link href="/" onClick={() => setOpen(false)} aria-label="TechmireSolutions home">
                <LogoMark size={50} src={logoUrl} />
              </Link>
              <div className="flex items-center gap-8">
                <StartProjectBtn onClick={() => setOpen(false)} />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="flex items-center justify-center min-h-[44px] min-w-[44px] text-white/30 hover:text-white/70 transition-colors duration-200"
                >
                  <X aria-hidden size={20} strokeWidth={1.2} />
                </button>
              </div>
            </div>

            {/* Nav items — staggered */}
            <nav
              className="relative z-10 flex-1 flex flex-col items-center justify-center gap-1"
              aria-label="Menu"
            >
              {MENU_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ delay: i * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group block text-center text-white/60 hover:text-white transition-colors duration-200"
                    style={{
                      fontSize: 'clamp(36px, 6vw, 82px)',
                      fontWeight: 200,
                      lineHeight: 1.08,
                      letterSpacing: '-0.025em',
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom bar */}
            <div className="relative z-10 h-[64px] px-8 lg:px-16 flex items-center justify-between border-t border-white/[0.06] flex-shrink-0">
              <p className="text-[11px] text-white/20 font-light">&copy; 2026 TechmireSolutions</p>

              <div className="flex items-center gap-6">
                {SOCIAL.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="group relative flex items-center gap-1 cursor-pointer"
                  >
                    <span className="text-[11.5px] text-white/28 group-hover:text-white/65 transition-colors duration-200 font-light">
                      {s.label}
                    </span>
                    <span className="relative overflow-hidden inline-flex w-3 h-3 items-center justify-center">
                      <ArrowUpRight aria-hidden size={9} className="absolute text-white/28 group-hover:text-white/60 transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2" />
                      <ArrowUpRight aria-hidden size={9} className="absolute text-white/28 group-hover:text-white/60 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
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
