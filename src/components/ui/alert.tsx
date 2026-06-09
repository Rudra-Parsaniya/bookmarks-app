import type { ReactNode } from 'react'

type AlertProps = {
  children: ReactNode
  variant?: 'error' | 'success'
}

const variants = {
  error: 'border-red-900/50 bg-red-950/30 text-red-300',
  success: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300',
}

export function Alert({ children, variant = 'error' }: AlertProps) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 text-sm ${variants[variant]}`}
      role="alert"
    >
      {children}
    </div>
  )
}
