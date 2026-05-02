// modules/auth/application/register.use-case.ts

import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export async function registerUseCase(data: {
  email: string
  password: string
  name: string
}) {
  console.log('el data', data)
  const res = await auth.api.signUpEmail({
    body: data,
    headers: await headers()
  })

  return res;
}