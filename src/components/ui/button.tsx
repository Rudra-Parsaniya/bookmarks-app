import type { ButtonHTMLAttributes, ReactNode } from 'react'

const variants = {
  primary:
    'bg-zinc-50 text-zinc-950 hover:bg-zinc-200 border border-transparent',
  secondary:
    'bg-transparent text-zinc-300 hover:text-zinc-50 hover:bg-zinc-900 border border-zinc-800',
  ghost:
    'bg-transparent text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 border border-transparent',
  danger:
    'bg-transparent text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-transparent',
} as const

type Variant = keyof typeof variants

const base =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none'

export function buttonClassName(variant: Variant = 'primary', className = '') {
  return `${base} ${variants[variant]} ${className}`.trim()
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  children: ReactNode
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={buttonClassName(variant, className)} {...props}>
      {children}
    </button>
  )
}
