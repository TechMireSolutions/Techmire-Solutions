'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, MoveRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import MagneticButton from '@/components/ui/MagneticButton'
import AnimatedText from '@/components/ui/AnimatedText'
import dynamic from 'next/dynamic'
import type { HomepageData } from '@/sanity/lib/types'

const FloatingLines = dynamic(() => import('@/components/FloatingLines'), { 
  ssr: false, 
  loading: () => null 
})

function Counter({ to, suffix = '' }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    let frame = 0
    const timer = setInterval(() => {
      frame++
      setN(Math.floor((1 - Math.pow(1 - frame / 60, 3)) * to))
      if (frame >= 60) { setN(to); clearInterval(timer) }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])
  return <span ref={ref}>{n}{suffix}</span>
}

const STATS = [
  { to: 4, suffix: '+', label: 'Years Active' },
  { to: 30, suffix: '+', label: 'Team Members' },
  { to: 50, suffix: '+', label: 'Projects Done' },
]

interface HeroProps { data: HomepageData | null }

export default function HeroSection({ data }: HeroProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 1000], [0, 300])
  const opacity = useTransform(scrollY, [0, 800], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Use a softer spring for background elements
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 })

  // Use a snappier spring for the "spotlight" aura
  const fastX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const fastY = useSpring(mouseY, { damping: 30, stiffness: 200 })

  const orbX = useTransform(smoothX, [-1, 1], [-50, 50])
  const orbY = useTransform(smoothY, [-1, 1], [-50, 50])
  
  const spotlightX = useTransform(fastX, [-1, 1], [-200, 200])
  const spotlightY = useTransform(fastY, [-1, 1], [-200, 200])
  
  const gridX = useTransform(smoothX, [-1, 1], [-20, 20])
  const gridY = useTransform(smoothY, [-1, 1], [-20, 20])

  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      if (innerWidth < 768) return // Disable heavy mouse spring updates on mobile
      const x = (e.clientX / innerWidth) * 2 - 1
      const y = (e.clientY / innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen bg-dark overflow-hidden">
      {/* ── Dynamic Floating Lines Background ── */}
      {!isMobile && (
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute inset-0 overflow-hidden"
        >
          <FloatingLines 
            enabledWaves={["top","middle","bottom"]}
            topWavePosition={undefined as any}
            middleWavePosition={undefined as any}
            lineCount={[8, 8, 8]}
            lineDistance={[8, 8, 8]}
            bendRadius={8}
            bendStrength={-2}
            interactive
            parallax={true}
            animationSpeed={1}
            linesGradient={["#EF6525", "#6f6f6f", "#6a6a6a"]}
          />
        </motion.div>
      )}

      {/* ── Dynamic Grid backdrop ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Soft floating orb (background) ── */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{
          x: orbX,
          y: orbY,
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          top: '-20vw',
          right: '-20vw',
          background: 'radial-gradient(circle, rgba(232,82,42,0.15) 0%, transparent 60%)',
          filter: 'blur(40px)'
        }}
        aria-hidden
        className="absolute pointer-events-none"
      />

      {/* ── Snappy Spotlight (foreground) ── */}
      <motion.div
        style={{
          x: spotlightX,
          y: spotlightY,
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          left: 'calc(50% - 400px)',
          top: 'calc(50% - 400px)',
          background: 'radial-gradient(circle, rgba(232,82,42,0.4) 0%, rgba(232,82,42,0.15) 30%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        aria-hidden
        className="absolute pointer-events-none z-10"
      />

      {/* ── Bottom fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #080808 0%, transparent 100%)' }}
      />

      <div className="relative z-10 w-full px-8 lg:px-16 flex flex-col min-h-screen">

        {/* ── Overline bar ── */}
        <div className="pt-[108px] flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <span className="w-5 h-px bg-orange/60" />
            <span className="text-[10.5px] uppercase tracking-[0.28em] text-white/28 font-medium">
              Software House{' '}&#183;{' '}Design Studio{' '}&#183;{' '}Karachi
            </span>
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[10.5px] text-white/14 tracking-[0.2em] font-light hidden sm:block"
          >
            Est. 2020
          </motion.span>
        </div>

        {/* ── Three-line typographic heading ── */}
        <div className="flex-1 flex flex-col justify-center py-10">

          {/* Line 1 — small muted lead-in */}
          <div className="overflow-hidden mb-1">
            <div style={{ fontSize: 'clamp(18px, 2.2vw, 32px)' }}>
              <AnimatedText
                el="p"
                text="Believe in the"
                type="word"
                delay={0.1}
                className="font-light text-white/28 leading-[1.15] tracking-[-0.01em]"
              />
            </div>
          </div>

          {/* Line 2 — GIANT primary statement */}
          <div className="overflow-hidden">
            <div style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}>
              <AnimatedText
                el="h1"
                text="Software House"
                type="character"
                delay={0.3}
                className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50 font-[200] leading-[0.86] tracking-[-0.045em] pb-2"
              />
            </div>
          </div>

          {/* Line 3 — muted echo */}
          <div className="overflow-hidden mb-14">
            <div style={{ fontSize: 'clamp(60px, 10vw, 140px)' }}>
              <AnimatedText
                el="p"
                text="You Can Trust"
                type="word"
                delay={0.9}
                className="font-[200] leading-[0.86] tracking-[-0.045em] text-white/16"
              />
            </div>
          </div>

          {/* ── Description + Stats row ── */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.68 }}
              className="text-white/40 font-light leading-[1.82] max-w-[420px]"
              style={{ fontSize: '15px' }}
            >
              {data?.heroSubtitle || "At Techmire Solutions, we're on a mission to redefine what a Software House can do. From turning napkin sketches into full-blown apps to spearheading the Digital Transformation of your business, we’ve mastered the art of making magic happen."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.82 }}
              className="flex items-end gap-10 lg:gap-14"
            >
              {STATS.map(s => (
                <div key={s.label}>
                  <p
                    className="font-[200] text-white tracking-[-0.045em] tabular-nums"
                    style={{ fontSize: 'clamp(36px, 3.8vw, 56px)', lineHeight: 1 }}
                  >
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="text-white/18 text-[9.5px] uppercase tracking-[0.24em] mt-2 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── Bottom CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.98 }}
          className="flex items-center justify-between pb-10 pt-6 border-t border-white/[0.06]"
        >
          <MagneticButton
            href={data?.heroCTALink || '/get-a-quote'}
            className="group inline-flex items-center gap-2.5 text-[13px] font-normal text-white px-6 py-3 min-h-[44px] rounded-full border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/[0.2] transition-all duration-250"
          >
            Get a Quote
            <ArrowUpRight
              aria-hidden
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </MagneticButton>

          <Link
            href="/about-us"
            className="group flex items-center gap-3 text-white/22 hover:text-white/55 text-[12px] font-light transition-colors duration-300"
          >
            <span>Our Story</span>
            <MoveRight
              aria-hidden
              size={14}
              className="text-white/20 group-hover:text-white/45 transition-all duration-300 group-hover:translate-x-1.5"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
