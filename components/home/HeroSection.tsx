'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { HomepageData, SanityImage } from '@/sanity/lib/types'

const FALLBACK_WORDS = ['Software Solutions', 'Digital Products', 'Creative Designs', 'Web Experiences', 'AI-Powered Apps']
const FALLBACK_HEADLINE = "Building Tomorrow's"

interface HeroProps {
  data: HomepageData | null
}

export default function HeroSection({ data }: HeroProps) {
  const words = data?.heroRotatingWords?.length ? data.heroRotatingWords : FALLBACK_WORDS
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 3000)
    return () => clearInterval(t)
  }, [words.length])

  return (
    <section className="relative bg-dark min-h-screen flex items-center overflow-hidden pt-16">
      {/* Decorative arc lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="720" cy="450" r="300" stroke="white" strokeWidth="1" />
        <circle cx="720" cy="450" r="500" stroke="white" strokeWidth="1" />
        <circle cx="720" cy="450" r="700" stroke="white" strokeWidth="1" />
        <line x1="0" y1="450" x2="1440" y2="450" stroke="white" strokeWidth="0.5" />
        <line x1="720" y1="0" x2="720" y2="900" stroke="white" strokeWidth="0.5" />
      </svg>

      <div className="max-w-[1400px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <h1
              className="text-light font-normal leading-[1.0] overflow-hidden"
              style={{ fontSize: 'clamp(52px, 7.5vw, 112px)' }}
            >
              <span className="block">{data?.heroHeadingLine1 || FALLBACK_HEADLINE}</span>
              <span className="block overflow-hidden h-[1.1em] relative">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={words[index]}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="block text-[#e8522a]"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-body text-lg mt-6 max-w-md leading-relaxed"
          >
            {data?.heroSubtitle ||
              "We're on a mission to redefine what a Software House can do. From napkin sketches to full-blown apps — we make magic happen."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-8 flex items-center gap-4"
          >
            <Link
              href={data?.heroCTALink || '/get-a-quote'}
              className="inline-flex items-center gap-2 bg-[#e8522a] hover:bg-[#d4471f] text-white text-[15px] font-medium px-7 py-3.5 rounded-pill transition-colors duration-300"
            >
              {data?.heroCTALabel || 'Start a Project'} <span>↗</span>
            </Link>
            <Link
              href="/about-us"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/60 text-light text-[15px] px-7 py-3.5 rounded-pill transition-colors duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Right — vertical image carousel */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-border">
            {data?.heroImages && data.heroImages.length > 0 ? (
              <HeroImageCarousel images={data.heroImages} />
            ) : (
              <div className="w-full h-full bg-card flex items-center justify-center">
                <span className="text-body text-sm">Hero images managed via Sanity CMS</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HeroImageCarousel({ images }: { images: SanityImage[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent((i) => (i + 1) % images.length), 4000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          src={urlFor(images[current]).width(700).height(600).url()}
          alt="Project showcase"
          fill
          className="object-cover"
          priority
        />
      </motion.div>
    </AnimatePresence>
  )
}
