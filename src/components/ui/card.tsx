import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-900/40 ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`border-b border-zinc-800 px-6 py-5 ${className}`.trim()}>
      {children}
    </div>
  )
}

export function CardContent({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return <div className={`px-6 py-5 ${className}`.trim()}>{children}</div>
}
