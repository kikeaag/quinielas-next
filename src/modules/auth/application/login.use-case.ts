import { authClient } from "@/lib/auth-client";

export const loginUseCase = async (data: {
  email: string;
  password: string;
}) => {
   const { data: res, error } = await authClient.signIn.email({
        email: data.email, // required
        password: data.password, // required
        rememberMe: true,
    });

    if (error) {
        throw new Error(error.message || "Error al iniciar sesión");
    }

    return res;
}