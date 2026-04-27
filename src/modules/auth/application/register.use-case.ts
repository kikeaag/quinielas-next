// modules/auth/application/register.use-case.ts

import { auth } from '@/lib/auth'

export async function registerUseCase(data: {
  email: string
  password: string
  name: string
}) {
  const res = await auth.api.signUpEmail({
    body: data
  })

  return res;
}