'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { authenticateAdmin, createAdminSession, deleteAdminSession } from '@/lib/admin-auth'

export interface AdminLoginState {
  error?: string
}

const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(1).max(1024),
})

export async function login(_state: AdminLoginState, formData: FormData): Promise<AdminLoginState> {
  const input = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!input.success) return { error: 'Escribe un correo y una contraseña válidos.' }

  try {
    const user = await authenticateAdmin(input.data.email, input.data.password)
    if (!user) return { error: 'El correo o la contraseña no son correctos.' }
    await createAdminSession(user.id)
  } catch {
    return { error: 'No fue posible validar el acceso. Inténtalo nuevamente.' }
  }

  redirect('/admin')
}

export async function logout() {
  await deleteAdminSession()
  redirect('/admin')
}
