import { useNavigate } from "react-router";
import { useState } from "react";
import type { Route } from "./+types/login";
import { useUser } from "../hooks/useUser";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login - Wallety" },
    { name: "description", content: "Login to your Wallety account" },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading, error } = useUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
            <img
              src="/logo-small.png"
              alt="logo Wallety"
              className="size-10 object-cover"
              width={400}
              height={400}
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Faça login no Wallety
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{" "}
            <a
              href="#"
              className="font-medium text-primary hover:text-primary-dark"
            >
              crie uma nova conta
            </a>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Endereço de email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="email@exemplo.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="********"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-dark"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="button w-full py-2"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
