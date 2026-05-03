import { registerAction } from "@/app/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>
          Ingresa tu información a continuación para crear tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={registerAction}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nombre(s)</FieldLabel>
              <Input name="name" id="name" type="text" placeholder="Tu nombre aquí" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Apellido paterno</FieldLabel>
              <Input name="lastName" id="lastName" type="text" required />
            </Field>
            <Field>
                <FieldLabel htmlFor="motherLastName">Apellido materno</FieldLabel>
              <Input name="motherLastName" id="motherLastName" type="text" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Contraseña</FieldLabel>
              <Input name="password" id="password" type="password" required />
              <FieldDescription>
                Mínimo 8 caracteres.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirmar Contraseña
              </FieldLabel>
              <Input name="confirmPassword" id="confirm-password" type="password" required />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Crear cuenta</Button>
                <FieldDescription className="px-6 text-center">
                  ¿Ya tienes una cuenta? <Link href="/login">Iniciar sesión</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
