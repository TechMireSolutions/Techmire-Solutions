'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
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
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {footer}
    </>
  )
}
