import { redirect } from 'next/navigation'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { getAdminSession } from '@/lib/admin-auth'

export default async function AdminGalleryLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  if (!session) redirect('/admin')

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      {children}
    </div>
  )
}
