'use client'

import { usePathname } from 'next/navigation'
import CustomCursor from '@/components/ui/CustomCursor'

interface ClientLayoutWrapperProps {
  navbar: React.ReactNode
  footer: React.ReactNode
  children: React.ReactNode
}

export default function ClientLayoutWrapper({ navbar, footer, children }: ClientLayoutWrapperProps) {
  const pathname = usePathname()
  
  // Do not render the frontend header/footer inside the Sanity Studio
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <CustomCursor />
      {navbar}
      {children}
      {footer}
    </>
  )
}
