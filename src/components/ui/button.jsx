import { forwardRef } from 'react'
import { cn } from '../../lib/utils.js'

const variants = {
  default:
    'bg-gradient-to-br from-electric to-[#1d4ed8] text-white shadow-cta hover:-translate-y-0.5 hover:brightness-[1.08]',
  secondary:
    'border border-navy/15 bg-surface text-heading shadow-sm hover:-translate-y-0.5 hover:border-navy/25 hover:shadow-card',
  ghost: 'text-heading hover:bg-navy/5',
  'ghost-dark':
    'border border-white/15 bg-white/5 text-white backdrop-blur-sm hover:border-white/30 hover:bg-white/10',
}

const sizes = {
  default: 'px-7 py-3.5 text-base',
  sm: 'px-4 py-2 text-sm',
  lg: 'px-8 py-4 text-lg',
  icon: 'h-10 w-10',
}

export const Button = forwardRef(function Button(
  { className, variant = 'default', size = 'default', asChild, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-bold tracking-tight transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-electric/30 disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
})
