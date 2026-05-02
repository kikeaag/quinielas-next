'use server'

import { registerUseCase } from '@/modules/auth/application/register.use-case'
import { redirect } from 'next/navigation'

export async function registerAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const name = formData.get('name') as string
  const lastName = formData.get('lastName') as string
  const motherLastName = formData.get('motherLastName') as string

  await registerUseCase({ email, password, name })

  redirect('/dashboard')
}