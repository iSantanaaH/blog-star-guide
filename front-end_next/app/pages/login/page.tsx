"use client";
import Format from "@/layout/format";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "nookies";
import { SyntheticEvent, useContext, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";

function notifyErrorLogin(message: string) {
  toast.error(`Erro: ${message}`)
};

function FormLoginUser() {
  const refFormLogin = useRef<HTMLFormElement | null>(null);
  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const emailValue = (event.currentTarget as HTMLFormElement)["email"].value;
    const passwordValue = (event.currentTarget as HTMLFormElement)["password"]
      .value;

    const minLengthEmail = 10;
    const minLengthPassword = 8;

    if (
      emailValue === "" ||
      passwordValue === "" ||
      emailValue.length < minLengthEmail ||
      passwordValue.length < minLengthPassword
    ) {
      toast.error(
        "Alguns campos estão vazios ou não possuem a quantidade mínima de caracteres"
      );
      return;
    }

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);

      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const response = await axios.post(
        "http://localhost:3333/api/login",
        formDataObject,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        const userName = response.data.fullNameUser;

        setCookie(undefined, "blogstarguide.token", token, {
          maxAge: 60 * 60 * 1, // 1 hour
          path: "/",
        });

        const notifySucessLoginUserAccount = () =>
          toast(`Bem vindo ${userName}`);

        notifySucessLoginUserAccount();

        refFormLogin.current?.reset();
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        if (error.response.data && error.response.data.error) {
          const errroMessage = error.response.data.error;
          notifyErrorLogin(errroMessage);
        }
      }
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
          <div className="m-4 sm:px-8" id="formBasicEmail">
            <label>Email</label>
            <input
              className="input-forms"
              type="email"
              name="email"
              placeholder="email"
              required
            />
          </div>

          <div className="mb-3 sm:px-8" id="formBasicPassword">
            <label>Senha</label>
            <input
              className="input-forms"
              type="password"
              name="password"
              placeholder="senha"
              required
            />
          </div>
          <div
            className="mb-3 sm:px-8 pt-4 sml:flex sml:flex-col sm639:flex sm639:flex-col md:flex md:flex-col"
            id="formBasicPassword"
          >
            <button className="button-form" type="submit">
              Logar
            </button>
            <span className="py-4">
              Não tem conta?{" "}
              <Link
                className="text-base text-blue-800 hover:text-blue-700"
                href={"/pages/register"}
              >
                Registre-se
              </Link>
            </span>
          </div>
        </form>
      </section>
    </Format>
  );
}

export default FormLoginUser;
