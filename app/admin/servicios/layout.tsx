import { AdminHeader } from '@/components/admin/AdminHeader'

export default function AdminServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      {children}
    </div>
  )
}
