'use server'

import { loginUseCase } from '@/modules/auth/application/login.use-case'
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

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const response = await loginUseCase({ email, password });

  return response;
}