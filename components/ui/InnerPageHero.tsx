'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import FadeUp from '@/components/ui/FadeUp'
import AnimatedText from '@/components/ui/AnimatedText'

interface InnerPageHeroProps {
  title: string
  subtitle?: string
  overline?: string
}

export default function InnerPageHero({ title, subtitle, overline }: InnerPageHeroProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Soft springs for background
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 100 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 100 })

  const gridX = useTransform(smoothX, [-1, 1], [-15, 15])
  const gridY = useTransform(smoothY, [-1, 1], [-15, 15])
  
  // Fast springs for spotlight
  const fastX = useSpring(mouseX, { damping: 30, stiffness: 200 })
  const fastY = useSpring(mouseY, { damping: 30, stiffness: 200 })
  
  const spotlightX = useTransform(fastX, [-1, 1], [-150, 150])
  const spotlightY = useTransform(fastY, [-1, 1], [-150, 150])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth) * 2 - 1
      const y = (e.clientY / innerHeight) * 2 - 1
      mouseX.set(x)
      mouseY.set(y)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <section className="relative bg-dark pt-40 pb-24 px-6 lg:px-10 border-b border-white/[0.06] overflow-hidden">
      
      {/* ── Background Effects ── */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 pointer-events-none z-0">
        
        {/* Subtle Ambient Aurora (Smaller and less intense than home page) */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-30%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full mix-blend-screen filter blur-[120px] opacity-30 bg-orange/30"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />
      </motion.div>

      {/* ── Grid ── */}
      <motion.div
        aria-hidden
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 z-0"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Spotlight ── */}
      <motion.div
        style={{
          x: spotlightX,
          y: spotlightY,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          left: 'calc(50% - 300px)',
          top: 'calc(50% - 300px)',
          background: 'radial-gradient(circle, rgba(232,82,42,0.15) 0%, rgba(232,82,42,0.05) 30%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        aria-hidden
        className="absolute pointer-events-none z-10"
      />

      {/* ── Content ── */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto">
        {overline && (
          <FadeUp>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-orange" />
              <span className="text-[11px] uppercase tracking-[0.18em] text-white/30 font-medium">
                {overline}
              </span>
            </div>
          </FadeUp>
        )}

        <div style={{ fontSize: 'clamp(44px, 7vw, 100px)' }}>
          <AnimatedText
            el="h1"
            text={title}
            type="word"
            delay={0.1}
            className="font-[200] text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 leading-[0.95] tracking-[-0.03em] pb-2"
          />
        </div>

        {subtitle && (
          <FadeUp delay={0.25}>
            <p className="text-white/40 text-[16px] lg:text-[18px] mt-6 max-w-lg leading-relaxed font-light">
              {subtitle}
            </p>
          </FadeUp>
        )}
      </div>
    </section>
  )
}
