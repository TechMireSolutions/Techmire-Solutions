'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { urlFor } from '@/sanity/lib/image'
import type { Service } from '@/sanity/lib/types'

interface ServicesCursorListProps {
  services: Service[]
}

export default function ServicesCursorList({ services }: ServicesCursorListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Mouse tracking values
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // Smooth spring physics for the floating image
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const imageX = useSpring(cursorX, springConfig)
  const imageY = useSpring(cursorY, springConfig)

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Center the image on the cursor (image is 400x300)
      cursorX.set(e.clientX - 200)
      cursorY.set(e.clientY - 150)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  if (!services || services.length === 0) return null

  return (
    <div 
      ref={containerRef}
      className="w-full bg-dark py-24 lg:py-40 overflow-hidden relative cursor-default"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col relative z-10">
        {/* Table Header */}
        <div className="hidden lg:grid grid-cols-12 gap-6 border-b border-white/10 pb-6 mb-10 text-white/30 text-[11px] uppercase tracking-widest font-medium">
          <div className="col-span-1">No.</div>
          <div className="col-span-4">Service</div>
          <div className="col-span-5">Description</div>
          <div className="col-span-2 text-right">Explore</div>
        </div>

        {/* List Items */}
        {services.map((service, i) => (
          <Link
            key={service._id}
            href={`/services/${service.slug?.current || ''}`}
            onMouseEnter={() => setHoveredIndex(i)}
            className={`group border-b border-white/5 py-10 lg:py-16 transition-colors duration-500 hover:border-white/20 relative z-10`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-center">
              {/* Number */}
              <div className="col-span-1 text-white/40 font-light text-xl lg:text-2xl group-hover:text-orange transition-colors duration-500">
                {String(i + 1).padStart(2, '0')}
              </div>
              
              {/* Title */}
              <div className="col-span-4 text-white text-3xl lg:text-5xl font-[300] leading-tight group-hover:translate-x-6 transition-transform duration-500 ease-out">
                {service.title}
              </div>
              
              {/* Description */}
              <div className="col-span-5 text-white/40 text-sm lg:text-[15px] font-light leading-relaxed max-w-md group-hover:text-white/70 transition-colors duration-500 mt-4 lg:mt-0">
                {service.shortDescription}
              </div>
              
              {/* Icon */}
              <div className="col-span-2 flex justify-start lg:justify-end mt-6 lg:mt-0">
                <span className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-dark transition-all duration-500">
                  <ArrowUpRight size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Image attached to cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-0 rounded-2xl overflow-hidden hidden lg:block"
        style={{
          x: imageX,
          y: imageY,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
        }}
        transition={{ opacity: { duration: 0.4 }, scale: { duration: 0.4 } }}
      >
        {services.map((service, i) => (
          <div 
            key={service._id} 
            className={`absolute inset-0 transition-opacity duration-500 ${hoveredIndex === i ? 'opacity-100' : 'opacity-0'}`}
          >
            {service.coverImage ? (
              <Image
                src={urlFor(service.coverImage).width(800).height(600).url()}
                alt={service.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#151515]" />
            )}
            <div className="absolute inset-0 bg-dark/30 mix-blend-multiply" />
          </div>
        ))}
      </motion.div>
    </div>
  )
}
