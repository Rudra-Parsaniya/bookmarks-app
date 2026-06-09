import type { ReactNode } from 'react'

type BadgeProps = {
  children: ReactNode
  variant?: 'default' | 'public' | 'private'
}

const variants = {
  default: 'bg-zinc-800 text-zinc-300',
  public: 'bg-emerald-950/50 text-emerald-400 border-emerald-900/50',
  private: 'bg-zinc-800/80 text-zinc-400 border-zinc-700/50',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  )
}
