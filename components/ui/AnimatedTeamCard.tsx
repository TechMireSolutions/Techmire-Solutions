'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { TeamMember } from '@/sanity/lib/types'

interface AnimatedTeamCardProps {
  member: TeamMember
  index: number
}

export default function AnimatedTeamCard({ member, index }: AnimatedTeamCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth out the mouse movement
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 })

  // Map mouse movement to rotation (max 10 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    // Mouse position relative to the center of the card (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left - width / 2) / width
    const mouseY = (e.clientY - rect.top - height / 2) / height
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      className="relative perspective-1000 w-full"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05] group"
      >
        {/* Photo Container */}
        <div className="relative w-full aspect-[3/4] overflow-hidden bg-white/5">
          {member.photo ? (
            <motion.div 
              className="w-full h-full relative"
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)'
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Image
                src={urlFor(member.photo).width(500).height(667).url()}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/10 to-transparent">
              <span className="text-white/20 text-6xl font-light tracking-tighter">{member.name[0]}</span>
            </div>
          )}

          {/* Glare effect */}
          <motion.div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              opacity: useTransform(
                useSpring(x, { stiffness: 100, damping: 20 }),
                [-0.5, 0.5],
                [0, 0.5]
              ),
              translateX: useTransform(x, [-0.5, 0.5], ['-50%', '50%']),
              translateY: useTransform(y, [-0.5, 0.5], ['-50%', '50%']),
            }}
          />

          {/* Dark gradient overlay at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent pointer-events-none" />

          {/* Info overlay */}
          <div 
            className="absolute bottom-0 left-0 w-full p-6"
            style={{ transform: 'translateZ(30px)' }}
          >
            <motion.div
              initial={false}
              animate={{ y: isHovered ? -5 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h3 className="text-white text-xl md:text-2xl font-medium tracking-tight mb-1">{member.name}</h3>
              <p className="text-white/60 text-sm font-light uppercase tracking-widest">{member.role}</p>
            </motion.div>
          </div>

          {/* Social Links on Hover */}
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                scale: isHovered ? 1 : 0.8,
                y: isHovered ? 0 : 10
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ transform: 'translateZ(40px)' }}
              className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all z-20 flex items-center justify-center text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
