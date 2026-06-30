'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface MagneticButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  onClick?: () => void
}

export default function MagneticButton({ href, children, className = '', external, onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [xy, setXY] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    setXY({
      x: (e.clientX - r.left - r.width / 2) * 0.28,
      y: (e.clientY - r.top - r.height / 2) * 0.28,
    })
  }

  const onLeave = () => setXY({ x: 0, y: 0 })

  const props = external ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <motion.div
        animate={xy}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.4 }}
      >
        <Link {...props} className={className} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    </div>
  )
}
