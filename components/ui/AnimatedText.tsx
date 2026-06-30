'use client'

import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  el?: keyof JSX.IntrinsicElements
  once?: boolean
  type?: 'word' | 'character'
  delay?: number
}

export default function AnimatedText({
  text,
  className = '',
  el: Wrapper = 'p',
  once = true,
  type = 'word',
  delay = 0,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(textRef, { once, margin: '-20%' })

  const words = text.split(' ')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: type === 'word' ? 0.08 : 0.03, delayChildren: delay * i },
    }),
  }

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  const WrapperComponent = Wrapper as any

  return (
    <WrapperComponent className={className} ref={textRef}>
      <span className="sr-only">{text}</span>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        aria-hidden
        className="inline-block"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block whitespace-nowrap mr-[0.25em]">
            {type === 'word' ? (
              <motion.span variants={child} className="inline-block">
                {word}
              </motion.span>
            ) : (
              word.split('').map((char, charIndex) => (
                <motion.span variants={child} key={charIndex} className="inline-block">
                  {char}
                </motion.span>
              ))
            )}
          </span>
        ))}
      </motion.span>
    </WrapperComponent>
  )
}
