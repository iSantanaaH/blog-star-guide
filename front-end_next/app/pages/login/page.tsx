"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Format from "@/layout/formatPages";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { SyntheticEvent, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "@/app/contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { setCookie } from "nookies";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

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
      <section className="flex flex-col justify-center items-center">
        <div>
          <ToastContainer />
        </div>
        <Form
          onSubmit={handleSubmit}
          ref={refFormLogin}
          method="POST"
          className="flex flex-col justify-center items-center md:w-2/6 mt-32 p-5 bg-slate-200 sml:w-64 rounded-2xl"
        >
          <div>
            <h2 className="font-bold text-4xl text-center pb-1">Login</h2>
          </div>
          <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 sm:px-8" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="senha"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 sm:px-8 sml:flex sml:flex-col" controlId="formBasicPassword">
            <Button variant="primary" type="submit">
              Logar
            </Button>
            <span className="py-2">
              Não tem conta? <Link href={"/pages/register"}>Registre-se</Link>
            </span>
          </Form.Group>
        </Form>
      </section>
    </Format>
  );
}

export default FormLoginUser;
