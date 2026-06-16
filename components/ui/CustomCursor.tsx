'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ringX = 0, ringY = 0
    let mouseX = 0, mouseY = 0
    let raf: number

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
      }
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    const onEnterLink = () => {
      ringRef.current?.classList.add('scale-150', 'opacity-60')
      dotRef.current?.classList.add('opacity-0')
    }
    const onLeaveLink = () => {
      ringRef.current?.classList.remove('scale-150', 'opacity-60')
      dotRef.current?.classList.remove('opacity-0')
    }

    document.addEventListener('mousemove', move)
    raf = requestAnimationFrame(tick)

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLink)
      el.addEventListener('mouseleave', onLeaveLink)
    })

    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLink)
        el.removeEventListener('mouseleave', onLeaveLink)
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[99999] w-2 h-2 rounded-full bg-white transition-opacity duration-150"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[99998] w-10 h-10 rounded-full border border-white/30 transition-[transform,opacity] duration-300"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
