import type { ReactNode } from 'react'
import { AdminHeader } from '@/components/admin/AdminHeader'

export default function AdminFooterLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background"><AdminHeader />{children}</div>
}
