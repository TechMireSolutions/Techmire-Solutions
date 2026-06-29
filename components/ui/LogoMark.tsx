'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoMarkProps {
  size?: number
  src?: string | null
}

export default function LogoMark({ size = 36, src }: LogoMarkProps) {
  const [err, setErr] = useState(false)
  const imgSrc = src || '/logo.png'

  if (err) {
    return (
      <div
        className="rounded-full bg-orange flex items-center justify-center text-white font-semibold shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.28 }}
      >
        TMS
      </div>
    )
  }

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <Image
        src={imgSrc}
        alt="TechmireSolutions"
        fill
        priority
        className="object-contain"
        onError={() => setErr(true)}
        unoptimized={!!src}
      />
    </div>
  )
}
