"use client";
import Format from "@/layout/format";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "nookies";
import { SyntheticEvent, useContext, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

function FormLoginUser() {
  const refFormLogin = useRef<HTMLFormElement | null>(null);
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);

      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const response = await axios.post(
        "http://localhost:3333/login",
        formDataObject,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        const userName = response.data.userName;

        setCookie(undefined, "blogstarguide.token", token, {
          maxAge: 60 * 60 * 1, // 1 hour
        });

        const notifySucessLoginUserAccount = () =>
          toast(`Bem vindo ${userName}`);

        notifySucessLoginUserAccount();

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);

        refFormLogin.current?.reset();
      }
    } catch (error: any) {
      console.error("Email ou senha invalidos2", error.message);
    }
  }

  return (
    <Format>
      <section className="flex flex-col justify-center items-center lg:w-full">
        <div>
          <ToastContainer />
        </div>
        <form
          onSubmit={handleSubmit}
          ref={refFormLogin}
          method="POST"
          className="flex flex-col justify-center items-center mt-32 p-5 bg-slate-200 sml:w-64 rounded-2xl lg:w-2/6"
        >
          <div>
            <h2 className="font-bold text-4xl text-center pb-1">Login</h2>
          </div>
          <div className="mb-3 sm:px-8" id="formBasicEmail">
            <label>Email</label>
            <input type="email" name="email" placeholder="email" required />
          </div>

          <div className="mb-3 sm:px-8" id="formBasicPassword">
            <label>Senha</label>
            <input
              type="password"
              name="password"
              placeholder="senha"
              required
            />
          </div>
          <div
            className="mb-3 sm:px-8 sml:flex sml:flex-col sm639:flex sm639:flex-col md:flex md:flex-col"
            id="formBasicPassword"
          >
            <button type="submit">Logar</button>
            <span className="py-2">
              Não tem conta? <Link href={"/pages/register"}>Registre-se</Link>
            </span>
          </div>
        </form>
      </section>
    </Format>
  );
}

export default FormLoginUser;
