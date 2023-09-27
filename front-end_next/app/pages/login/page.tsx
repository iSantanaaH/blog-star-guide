"use client";
import Format from "@/layout/formatPages";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { SyntheticEvent, useRef } from "react";
import axios from "axios";

function FormLoginUser() {
  const refFormLogin = useRef<HTMLFormElement | null>(null);

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
        console.log(response.data.email)
        console.log(response.data.password)
        refFormLogin.current?.reset();

        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      }
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error.message);
    }
  }

  return (
    <Format>
      <section className="flex flex-col justify-center items-center">
        <Form
          onSubmit={handleSubmit}
          ref={refFormLogin}
          method="POST"
          className="flex flex-col justify-center items-center mt-32 py-5 bg-slate-200 rounded-2xl"
        >
          <div>
            <h2 className="font-bold text-4xl text-center pb-1">Login</h2>
          </div>
          <Form.Group className="mb-3 sm:px-8" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="email" required />
          </Form.Group>

          <Form.Group className="mb-3 sm:px-8" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" name="password" placeholder="senha" required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Logar
          </Button>
        </Form>
      </section>
    </Format>
  );
}

export default FormLoginUser;
