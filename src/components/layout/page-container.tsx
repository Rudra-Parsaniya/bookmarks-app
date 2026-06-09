import type { ReactNode } from 'react'

type PageContainerProps = {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'max-w-lg',
  md: 'max-w-3xl',
  lg: 'max-w-6xl',
}

export function PageContainer({
  children,
  size = 'lg',
  className = '',
}: PageContainerProps) {
  return (
    <div
      className={`mx-auto w-full flex-1 px-4 sm:px-6 ${sizes[size]} ${className}`.trim()}
    >
      {children}
    </div>
  )
}
