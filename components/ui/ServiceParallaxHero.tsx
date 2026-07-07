'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/sanity/lib/types'

interface ServiceParallaxHeroProps {
  title: string
  image?: SanityImage
}

export default function ServiceParallaxHero({ title, image }: ServiceParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  // Parallax effects
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 300])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 0.8])

  return (
    <div ref={containerRef} className="relative w-full h-[100vh] overflow-hidden bg-dark">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ scale: imageScale }}
      >
        {image ? (
          <Image
            src={urlFor(image).width(1920).height(1080).url()}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#111]" />
        )}
      </motion.div>

      {/* Dark Overlay that gets darker as you scroll */}
      <motion.div 
        className="absolute inset-0 bg-dark"
        style={{ opacity: overlayOpacity }}
      />

      {/* Hero Content */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block text-orange text-[12px] uppercase tracking-[0.3em] font-bold mb-6">
            Service Profile
          </span>
          <h1 className="text-white font-[200] leading-[0.9] tracking-tight" style={{ fontSize: 'clamp(60px, 10vw, 160px)' }}>
            {title}
          </h1>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-white/40 text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-white absolute top-0"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </div>
  )
}
