import Link from 'next/link'
import { PageContainer } from '@/components/layout/page-container'
import { buttonClassName } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'

export default function ProfileNotFound() {
  return (
    <PageContainer size="md" className="flex flex-1 items-center py-20">
      <EmptyState
        title="Profile not found"
        description="No user exists with that handle. Check the URL or return home."
        action={
          <Link href="/" className={buttonClassName('primary')}>
            Go home
          </Link>
        }
      />
    </PageContainer>
  )
}
