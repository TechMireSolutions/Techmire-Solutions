import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 rounded-pill font-medium text-[14px] px-6 py-3 transition-colors duration-300 cursor-pointer'

  const variants = {
    primary: 'bg-[#e8522a] hover:bg-[#d4471f] text-white',
    secondary: 'bg-[#292929] hover:bg-[#333] text-white',
    outline: 'border border-white/30 hover:border-white text-white',
  }

  const classes = cn(base, variants[variant], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
