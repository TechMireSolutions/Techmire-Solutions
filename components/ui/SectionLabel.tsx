import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: React.ReactNode
  light?: boolean
  className?: string
}

export default function SectionLabel({ children, light, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'text-overline uppercase tracking-[0.1em] text-[11px] font-medium',
        light ? 'text-body' : 'text-[#e8522a]',
        className
      )}
    >
      {children}
    </span>
  )
}
