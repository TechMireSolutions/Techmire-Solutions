'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { TeamMember } from '@/sanity/lib/types'

interface HorizontalTeamScrollProps {
  team: TeamMember[]
}

export default function HorizontalTeamScroll({ team }: HorizontalTeamScrollProps) {
  const targetRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [scrollRange, setScrollRange] = useState(0)

  useEffect(() => {
    const updateScrollRange = () => {
      if (carouselRef.current) {
        // scrollWidth is total width, innerWidth is viewport. We want to translate exactly the difference.
        // Adding a little extra buffer (e.g. 50) ensures the last item doesn't stick directly to the edge.
        setScrollRange(carouselRef.current.scrollWidth - window.innerWidth + 50)
      }
    }
    updateScrollRange()
    window.addEventListener('resize', updateScrollRange)
    return () => window.removeEventListener('resize', updateScrollRange)
  }, [team])
  
  // This will track the scroll position of the tall wrapper div
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  })

  // Smooth out the scroll for a premium feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // We translate exactly by -scrollRange.
  const x = useTransform(smoothProgress, [0, 1], [0, -scrollRange])

  if (!team || team.length === 0) {
    return null
  }

  return (
    <section 
      ref={targetRef} 
      className="relative bg-dark"
      style={{ height: `calc(100vh + ${scrollRange}px)` }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Background text that stays behind */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none whitespace-nowrap z-0">
          <h2 className="text-[20vw] font-bold text-white uppercase tracking-tighter">
            Our Minds
          </h2>
        </div>

        <motion.div 
          ref={carouselRef}
          style={{ x }} 
          className="flex gap-10 px-[10vw] z-10 items-center h-full w-max"
        >
          {/* Intro Slide */}
          <div className="flex-shrink-0 w-[40vw] md:w-[30vw] mr-10 flex flex-col justify-center">
            <h3 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-tighter leading-tight">
              The <br/> Collective.
            </h3>
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
              Scroll to explore the brilliant minds driving our digital innovations.
            </p>
          </div>

          {team.map((member, i) => (
            <Card key={member._id} member={member} index={i} />
          ))}
          
          {/* Outro spacer */}
          <div className="flex-shrink-0 w-[10vw]" />
        </motion.div>
      </div>
    </section>
  )
}

function Card({ member, index }: { member: TeamMember, index: number }) {
  // We can add micro-interactions to each card independently
  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative flex-shrink-0 w-[70vw] md:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/10 bg-white/5"
    >
      {member.photo ? (
        <motion.div 
          className="w-full h-full relative"
          initial={{ scale: 1.2, filter: 'grayscale(100%)' }}
          whileInView={{ scale: 1, filter: 'grayscale(100%)' }}
          whileHover={{ filter: 'grayscale(0%)', scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={urlFor(member.photo).width(600).height(800).url()}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 70vw, 400px"
          />
        </motion.div>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
          <span className="text-white/20 text-8xl font-light">{member.name[0]}</span>
        </div>
      )}

      {/* Dynamic Overlay & Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent pointer-events-none transition-opacity duration-500 opacity-80 group-hover:opacity-100" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <h4 className="text-3xl font-medium text-white mb-2 tracking-tight">{member.name}</h4>
        <p className="text-white/60 text-sm tracking-[0.2em] uppercase font-light">{member.role}</p>
        
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm font-light uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"
          >
            <span className="w-8 h-[1px] bg-white/40 group-hover:bg-white transition-colors" />
            LinkedIn
          </a>
        )}
      </div>
    </motion.div>
  )
}
