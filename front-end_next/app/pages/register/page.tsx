"use client";
import Format from "@/layout/format";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, SyntheticEvent, useRef } from "react";
import axios from "axios";

function FormLoginUser() {
  const [messageSuccessCreateUser, setMessageSuccessCreateUser] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);

      const formDataObject: Record<string, any> = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });

      const response = await axios.post(
        "http://localhost:3333/register",
        formDataObject,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        setMessageSuccessCreateUser("Usuário cadastrado com sucesso!");
        formRef.current?.reset();

        window.location.href = 'http://localhost:3000/pages/login'
      } else {
        setMessageSuccessCreateUser(
          `Erro ao cadastrar usuário: ${response.data.mensagem}`
        );
      }
    } catch (error: any) {
      console.error("Erro ao registrar usuário:", error.message);
      setMessageSuccessCreateUser("Erro ao cadastrar usuário");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Format>
      <section className="container flex flex-col justify-center items-center">
        <Form
          method="POST"
          onSubmit={handleSubmit}
          className="grid mt-32 py-5 w-2/4 bg-slate-200 rounded-2xl"
        >
          <div className="">
            <h2 className="font-bold text-4xl text-center pb-1">Registrar</h2>
          </div>
          <div className="grid grid-cols-2 flex-wrap justify-center">
            <div className="col-span-1">
              <Form.Group className="mb-3 sm:px-8" controlId="controlName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="nome"
                  name="name"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-span-1">
              <Form.Group className="mb-3 sm:px-8" controlId="controlSurname">
                <Form.Label>Sobrenome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="sobrenome"
                  name="surname"
                  required
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3 sm:px-8" controlId="controlEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="email"
                name="email"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="controlPhone">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="tel"
                placeholder="telefone"
                name="phone"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="controlPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="senha"
                name="password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3 sm:px-8" controlId="controlBirthday">
              <Form.Label>Data de nascimento</Form.Label>
              <Form.Control type="date" name="birthday" required />
            </Form.Group>
          </div>

          <div className="flex justify-center">
            <Button className="px-5" variant="primary" type="submit">
              Criar Conta
            </Button>
          </div>
        </Form>
      </section>
    </Format>
  );
}

export default FormLoginUser;
