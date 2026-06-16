'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function LogoMark({ size = 36 }: { size?: number }) {
  const [err, setErr] = useState(false)

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
        src="/logo.png"
        alt="TechmireSolutions"
        fill
        className="object-contain"
        onError={() => setErr(true)}
      />
    </div>
  )
}
