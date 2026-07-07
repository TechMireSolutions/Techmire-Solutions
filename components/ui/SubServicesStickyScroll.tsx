'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SubService } from '@/sanity/lib/types'

interface SubServicesStickyScrollProps {
  subServices: SubService[]
}

export default function SubServicesStickyScroll({ subServices }: SubServicesStickyScrollProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // This prevents layout jumps when there are no images
  const hasAnyImages = subServices.some(s => s.image)

  if (!subServices || subServices.length === 0) return null

  return (
    <div className="w-full bg-dark text-white rounded-3xl overflow-hidden relative">
      <div className="flex flex-col lg:flex-row relative">
        
        {/* Left Side: Scrolling Text */}
        <div className="w-full lg:w-1/2 py-20 lg:py-32 px-8 lg:px-16 flex flex-col gap-[30vh]">
          {subServices.map((sub, index) => (
            <TextSection 
              key={sub._key || index} 
              sub={sub} 
              index={index} 
              setActiveIndex={setActiveIndex} 
            />
          ))}
          {/* Spacer to allow the last item to scroll up */}
          <div className="h-[20vh]" />
        </div>

        {/* Right Side: Sticky Image */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 bg-[#0a0a0a]">
          {hasAnyImages ? (
            <AnimatePresence mode="wait">
              {subServices.map((sub, index) => {
                if (index === activeIndex && sub.image) {
                  return (
                    <motion.div
                      key={sub._key || index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 p-8 flex items-center justify-center"
                    >
                      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                          src={urlFor(sub.image).width(1000).height(1000).url()}
                          alt={sub.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-dark/20 mix-blend-multiply" />
                      </div>
                    </motion.div>
                  )
                }
                return null
              })}
            </AnimatePresence>
          ) : (
            <div className="w-full h-full flex items-center justify-center border-l border-white/5">
              <span className="text-white/10 text-[100px] font-thin">✦</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function TextSection({ 
  sub, 
  index, 
  setActiveIndex 
}: { 
  sub: SubService; 
  index: number; 
  setActiveIndex: (val: number) => void 
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveIndex(index)
        }
      },
      {
        root: null,
        rootMargin: '-40% 0px -40% 0px', // Triggers when item reaches middle of screen
        threshold: 0,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index, setActiveIndex])

  return (
    <div ref={ref} className="min-h-[30vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-orange text-[12px] font-bold uppercase tracking-widest mb-6 block">
          {String(index + 1).padStart(2, '0')} — Capability
        </span>
        <h3 className="text-3xl lg:text-5xl font-[300] leading-tight mb-6">
          {sub.title}
        </h3>
        {sub.description && (
          <p className="text-white/50 text-[15px] leading-relaxed max-w-md font-light">
            {sub.description}
          </p>
        )}
      </motion.div>
    </div>
  )
}
