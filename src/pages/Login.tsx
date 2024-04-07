import logoProfera from "../assets/logo_profera.png";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useAuthStore from '../store/authStore';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Senha obrigatória" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const Login = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema)
  });
  const navigation = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Erro no login');
      }
      const responseData = await response.json();
      setToken(responseData.user.token);
      navigation('/dashboard');
    } catch (error) {
      setErrorMessage('Erro no login, verifique seus dados e tente novamente.');
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logoProfera} alt="Logo Profera" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none"
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && <p className="mt-2 text-red-500">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none"
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            {errors.password && <p className="mt-2 text-red-500">{errors.password.message}</p>}
          </div>
            {errorMessage && <p className="mb-3 text-red-500">{errorMessage}</p>}
          <button type="submit" className="w-full px-4 py-2 font-bold text-white rounded-lg bg-custom-green hover:bg-light-green">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
};
