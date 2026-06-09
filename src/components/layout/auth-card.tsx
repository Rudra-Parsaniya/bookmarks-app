import type { ReactNode } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

type AuthCardProps = {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthCard({ title, description, children, footer }: AuthCardProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16 sm:py-24">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardHeader>
            <h1 className="text-xl font-semibold tracking-tight text-zinc-50">
              {title}
            </h1>
            <p className="mt-1.5 text-sm text-zinc-500">{description}</p>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
        {footer}
      </div>
    </div>
  )
}
