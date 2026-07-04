'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import AnimatedTeamCard from './AnimatedTeamCard'
import type { TeamMember } from '@/sanity/lib/types'

interface AnimatedTeamGridProps {
  team: TeamMember[]
}

export default function AnimatedTeamGrid({ team }: AnimatedTeamGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // We can create different transform speeds for odd and even columns for a parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150])
  
  if (!team || team.length === 0) {
    return (
      <div className="flex justify-center items-center py-20 text-white/40 font-light">
        Team members will appear here once added via Sanity CMS.
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-[1400px] mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
        {team.map((member, index) => {
          // Staggered Y offsets based on column index for a premium scattered look
          // This creates a subtle parallax on scroll based on position
          const column = index % 4
          let yOffset = y1
          if (column === 1) yOffset = y2
          if (column === 2) yOffset = y3
          if (column === 3) yOffset = y1

          // On mobile, we might not want intense parallax, but framer-motion handles it well usually.
          // For simplicity and performance, we'll apply a static staggered margin-top in CSS 
          // and let the scroll entrance handle the main animation.
          
          return (
            <motion.div 
              key={member._id}
              className="w-full h-full flex"
              style={{
                marginTop: column % 2 !== 0 ? '40px' : '0px',
              }}
            >
              <AnimatedTeamCard member={member} index={index} />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
