'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SubService } from '@/sanity/lib/types'

interface ServiceZigZagGalleryProps {
  subServices: SubService[]
}

export default function ServiceZigZagGallery({ subServices }: ServiceZigZagGalleryProps) {
  if (!subServices || subServices.length === 0) return null

  return (
    <section className="relative w-full bg-dark py-32 lg:py-48 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        
        <div className="mb-32 lg:mb-48 border-b border-white/10 pb-12">
          <h2 className="text-white font-[200] text-5xl lg:text-7xl leading-[1.1] mb-6">
            In-Depth<br />Capabilities
          </h2>
          <p className="text-white/50 text-[16px] max-w-xl font-light leading-relaxed">
            We don't just scratch the surface. Explore the specific disciplines and expertise we bring to every project.
          </p>
        </div>

        <div className="flex flex-col gap-32 lg:gap-48">
          {subServices.map((sub, index) => (
            <ZigZagRow key={sub._key || index} sub={sub} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ZigZagRow({ sub, index }: { sub: SubService; index: number }) {
  const isEven = index % 2 === 0
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Subtle parallax effect for the image
  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div ref={containerRef} className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 group">
      
      {/* Image Side */}
      <div className={`w-full lg:w-1/2 overflow-hidden rounded-[30px] h-[50vh] lg:h-[75vh] min-h-[400px] bg-[#111] relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
        <motion.div style={{ y: imageY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
          {sub.image ? (
            <Image
              src={urlFor(sub.image).width(1200).height(1400).url()}
              alt={sub.title}
              fill
              className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-[#151515] flex items-center justify-center">
               <span className="text-white/5 text-[100px]">✦</span>
            </div>
          )}
          <div className="absolute inset-0 bg-dark/20 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-0" />
        </motion.div>
      </div>

      {/* Text Side */}
      <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="text-orange text-[12px] font-bold uppercase tracking-widest">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="h-[1px] w-16 bg-white/20" />
          </div>

          <h3 className="text-white text-4xl lg:text-5xl xl:text-6xl font-[300] mb-8 leading-[1.1]">
            {sub.title}
          </h3>

          {sub.description && (
            <div className="text-white/60 text-[16px] lg:text-[18px] leading-[1.8] font-light max-w-xl">
              {sub.description}
            </div>
          )}
          
          <div className="mt-12 overflow-hidden h-0 group-hover:h-auto transition-all duration-700">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:text-white group-hover:bg-white/10 transition-colors">
              ↓
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
