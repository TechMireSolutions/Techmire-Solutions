'use client'

import { MouseEvent, useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagneticHoverCardProps {
  children: ReactNode
  className?: string
  delay?: number
  index?: number
}

export default function MagneticHoverCard({ children, className = '', delay = 0, index = 0 }: MagneticHoverCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: delay + (index * 0.05), ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden bg-dark transition-colors duration-500 ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: 'radial-gradient(circle 250px at var(--mouse-x, 0) var(--mouse-y, 0), rgba(232,82,42,0.06), transparent 80%)'
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  )
}
